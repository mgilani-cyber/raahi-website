import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AmbientSound() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const bassRef = useRef<OscillatorNode | null>(null);

  const stop = useCallback(() => {
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.8);
    }
    setTimeout(() => {
      try { sourceRef.current?.stop(); bassRef.current?.stop(); } catch (_) {}
      sourceRef.current = null;
      bassRef.current = null;
      gainRef.current = null;
    }, 900);
  }, []);

  const start = useCallback(() => {
    const ctx = new AudioContext();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    // Brown noise (warm, low rumble — like a bar)
    const bufLen = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(2, bufLen, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = buffer.getChannelData(ch);
      let last = 0;
      for (let i = 0; i < bufLen; i++) {
        const w = Math.random() * 2 - 1;
        data[i] = (last + 0.02 * w) / 1.02;
        last = data[i];
        data[i] *= 3.5;
      }
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Low-pass to keep it warm, not hissy
    const lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 400;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.2);

    source.connect(lpf);
    lpf.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    // Very subtle bass hum (like a subwoofer in a bar)
    const bass = ctx.createOscillator();
    bass.type = "sine";
    bass.frequency.value = 48;
    const bassGain = ctx.createGain();
    bassGain.gain.setValueAtTime(0, ctx.currentTime);
    bassGain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 1.5);
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start();

    sourceRef.current = source;
    bassRef.current = bass;
    gainRef.current = gain;
  }, []);

  const toggle = useCallback(() => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      start();
      setPlaying(true);
    }
  }, [playing, start, stop]);

  return (
    <button
      onClick={toggle}
      title={playing ? "Mute ambient sound" : "Enable ambient sound"}
      className="fixed bottom-6 left-6 z-[99995] flex items-center gap-2 bg-background/80 backdrop-blur-md border border-border/60 rounded-full px-3 py-2 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
    >
      <div className="flex items-end gap-[2px] h-4">
        {[1, 2, 3, 2, 1].map((h, i) => (
          <motion.div
            key={i}
            className="w-[2px] rounded-full bg-current"
            animate={playing ? {
              height: [h * 3, h * 8, h * 3],
            } : { height: 3 }}
            transition={{ duration: 0.6, delay: i * 0.1, repeat: playing ? Infinity : 0, ease: "easeInOut" }}
            style={{ height: 3 }}
          />
        ))}
      </div>
      <span className="text-[10px] font-body tracking-widest">
        {playing ? "SOUND ON" : "SOUND OFF"}
      </span>
    </button>
  );
}
