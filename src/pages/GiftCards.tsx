import { motion } from "framer-motion";
import { PHONE_NUMBER, EMAIL } from "@/constants";

const T="#113122",R="#a34d26",I="#e8e0cc",D="#0a1f15";

export default function GiftCards() {
  return (
    <div style={{background:T,minHeight:"100vh"}}>
      <div style={{background:D,paddingTop:"120px",paddingBottom:"64px",borderBottom:"1px solid rgba(163,77,38,0.15)"}}>
        <div className="container mx-auto px-6">
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
            style={{fontFamily:"Jost,sans-serif",fontSize:"10px",letterSpacing:"0.55em",color:R,textTransform:"uppercase",marginBottom:"1rem"}}>
            Give the gift of Raahi
          </motion.p>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:0.35}}
            style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.5rem,6vw,5rem)",color:I,lineHeight:0.95,marginBottom:"1rem"}}>
            Gift Cards
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}
            style={{fontFamily:"Jost,sans-serif",fontSize:"15px",color:"rgba(232,224,204,0.45)",maxWidth:"480px",lineHeight:1.85}}>
            The perfect gift for anyone who loves great Indian food. Redeemable for dining, drinks and catering at Raahi Indian Kitchen, Houston.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div style={{padding:"48px",background:"rgba(163,77,38,0.06)",border:"1px solid rgba(163,77,38,0.2)",textAlign:"center",marginBottom:"20px"}}>
              <div style={{width:"80px",height:"80px",border:"1px solid rgba(163,77,38,0.3)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
                <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.2rem",color:R}}>Raahi</p>
              </div>
              <p style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.6rem",color:I,marginBottom:"12px"}}>Raahi Indian Kitchen</p>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"11px",letterSpacing:"0.3em",color:"rgba(163,77,38,0.7)",textTransform:"uppercase",marginBottom:"8px"}}>Gift Card</p>
              <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.35)"}}>17695 Tomball Pkwy · Houston, TX 77064</p>
            </div>
            <p style={{fontFamily:"Jost,sans-serif",fontSize:"12px",color:"rgba(232,224,204,0.35)",textAlign:"center",lineHeight:1.7}}>
              Gift cards are available in any denomination. Valid for dine-in, takeout and catering orders. No expiry.
            </p>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            {[
              {title:"Purchase In-Restaurant",desc:"Visit us at 17695 Tomball Pkwy and ask any team member for a gift card. Available in any amount."},
              {title:"Purchase by Phone",desc:"Call us and we will arrange a gift card for you. We can also discuss bulk corporate gift cards.",link:"tel:+13467680068",linkLabel:PHONE_NUMBER},
              {title:"Purchase by Email",desc:"Email us with the amount and we will get back to you with options for digital or physical delivery.",link:"mailto:"+EMAIL,linkLabel:EMAIL},
            ].map((item,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                style={{padding:"28px",background:"rgba(111,133,102,0.06)",border:"1px solid rgba(163,77,38,0.12)"}}>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"9px",letterSpacing:"0.45em",color:R,textTransform:"uppercase",marginBottom:"10px"}}>0{i+1}</p>
                <h3 style={{fontFamily:"Cormorant Garamond,Georgia,serif",fontStyle:"italic",fontSize:"1.3rem",color:I,marginBottom:"10px"}}>{item.title}</h3>
                <p style={{fontFamily:"Jost,sans-serif",fontSize:"13px",color:"rgba(232,224,204,0.45)",lineHeight:1.8,marginBottom:item.link?"14px":0}}>{item.desc}</p>
                {item.link&&<a href={item.link} style={{fontFamily:"Jost,sans-serif",fontSize:"11px",letterSpacing:"0.2em",color:"rgba(163,77,38,0.7)",textTransform:"uppercase"}}>{item.linkLabel} →</a>}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
