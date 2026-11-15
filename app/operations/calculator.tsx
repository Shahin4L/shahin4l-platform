"use client";
import {useMemo,useState} from "react";
export default function Calculator(){
 const [volume,setVolume]=useState(50000),[hours,setHours]=useState(8),[rate,setRate]=useState(180),[util,setUtil]=useState(85);
 const result=useMemo(()=>{const productive=rate*hours*(util/100);return productive>0?Math.ceil(volume/productive):0},[volume,hours,rate,util]);
 const field=(label:string,value:number,set:(n:number)=>void,min:number,max:number,step=1)=><label style={{display:"grid",gap:7,color:"#fff",fontSize:13}}>{label}<input type="number" min={min} max={max} step={step} value={value} onChange={e=>set(Math.max(min,Math.min(max,Number(e.target.value)||min)))} style={{padding:12,borderRadius:8,border:"1px solid #52627d",background:"#fff",color:"#18243a",width:"100%"}}/></label>;
 return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:18,alignItems:"end",marginTop:30}}>
 {field("Daily parcel volume",volume,setVolume,1,10000000)}
 {field("Working hours per person",hours,setHours,1,24)}
 {field("Parcels handled per person / hour",rate,setRate,1,10000)}
 {field("Productive utilization (%)",util,setUtil,1,100)}
 <div style={{padding:18,border:"1px solid #ffffff30",borderRadius:12,background:"#ffffff12",color:"#fff"}}><small style={{color:"#b9c7df"}}>Estimated people required</small><div style={{fontSize:38,fontWeight:800,color:"#8ee4d8"}}>{result.toLocaleString()}</div><small style={{color:"#b9c7df"}}>Based on the assumptions entered</small></div>
 <p style={{gridColumn:"1/-1",fontSize:11,color:"#b9c7df"}}>Formula: daily volume ÷ (throughput per person per hour × working hours × utilization). Excludes breaks, shift overlap, skill mix, attendance, peak variability and process constraints. Add a locally validated buffer before operational use.</p>
 </div>
}