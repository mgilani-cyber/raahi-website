import { useRef, useState, useCallback } from "react";

export function useAudioPour() {
  const ctxRef = useRef<AudioContext | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const playChime = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g);
    g.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  }, [getCtx]);

  const startPour = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = getCtx();
    if (ctx.state === "suspended") ctx.resume();

    // Create brown noise buffer
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    // LFO to modulate filter freq — creates glugging
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(3, ctx.currentTime);
    lfoGain.gain.setValueAtTime(200, ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.3);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();

    noiseSourceRef.current = source;
    gainRef.current = gain;
    filterRef.current = filter;
    lfoRef.current = lfo;
  }, [getCtx]);

  const stopPour = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !gainRef.current) return;
    const g = gainRef.current;
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    setTimeout(() => {
      try {
        noiseSourceRef.current?.stop();
        lfoRef.current?.stop();
      } catch (_) {}
      noiseSourceRef.current = null;
      gainRef.current = null;
      filterRef.current = null;
      lfoRef.current = null;
    }, 600);
  }, []);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    if (mutedRef.current && gainRef.current && ctxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.2);
    }
  }, []);

  return { startPour, stopPour, playChime, toggleMute, muted };
}
