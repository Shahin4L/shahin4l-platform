import Link from "next/link";
import Calculator from "./calculator";

const teams = [
  "Sort Operations","Central Inbound","Central Pickup","Central Return","Return Parcel Validation","Investigation & Reconciliation","Issue Resolution","Reprocessing & Resolution","Data Entry","Inventory Management","Regional Sub-Sort"
];
const kpis = [
  ["On-time dispatch rate","Parcels dispatched within the planned cut-off ÷ total parcels due × 100","Service"],
  ["First-attempt delivery rate","Successful first delivery attempts ÷ total delivery attempts × 100","Last mile"],
  ["Sort accuracy","Correctly sorted parcels ÷ total parcels sorted × 100","Sort"],
  ["Return processing TAT","Time from return receipt to validated return completion","Returns"],
  ["Pending ageing","Open parcels grouped by time since last operational scan","Control"],
  ["Cost per parcel","Total attributable operating cost ÷ parcels processed","Finance"]
];
export const metadata = { title: "Operations Lab", description: "Practical operations frameworks, KPI definitions and planning calculators." };
export default function OperationsPage(){
 return <main><header className="site-header"><div className="container nav-wrap"><Link className="brand" href="/"><span className="brand-mark">S4L</span><span>SHAHIN4L<small>Operations Lab</small></span></Link><nav className="nav-links"><Link href="/">Home</Link><Link href="/blog">Knowledge Hub</Link><Link href="/resources">Resources</Link></nav><Link className="button button-small" href="/contact">Let’s connect</Link></div></header>
 <section className="section section-tint"><div className="container"><p className="eyebrow eyebrow-light">PRACTICAL KNOWLEDGE BASE</p><h1 style={{fontSize:"clamp(42px,6vw,68px)"}}>Operations, made measurable.</h1><p className="body-copy">A practical library for teams working in courier, logistics and service operations. Definitions are starting points—adapt them to your own process, data quality and service promise.</p><div className="lab-grid">{teams.map((t,i)=><article className="lab-card" key={t} style={{background:"#fff",border:"1px solid #e4e9f1"}}><span style={{color:"#4366e8"}}>{String(i+1).padStart(2,"0")}</span><h3 style={{color:"#18243a",marginTop:16}}>{t}</h3><p style={{color:"#68758b"}}>Ownership, daily controls, exception handling and measurable service outcomes.</p></article>)}</div></div></section>
 <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow-light">KPI LIBRARY</p><h2>Definitions before dashboards.</h2><p className="body-copy">Use consistent definitions before comparing performance. Set a clear owner, time window, exclusions and source system for every metric.</p></div><div className="project-grid">{kpis.map(([name,formula,tag])=><article className="project-card" key={name}><div className="project-content"><span className="tag">{tag}</span><h3>{name}</h3><p>{formula}</p></div></article>)}</div></div></section>
 <section className="section section-dark"><div className="container"><p className="eyebrow">PLANNING TOOL</p><h2>Parcel capacity estimator.</h2><p className="dark-copy">Estimate staffing needs using your own throughput assumptions. This is a planning aid, not a staffing standard.</p><Calculator/></div></section>
 <section className="section"><div className="container"><h2>How to use this lab responsibly</h2><p className="body-copy">These are general educational frameworks, not internal company SOPs or confidential operating data. Validate formulas against your process, define exclusions, and avoid using customer-identifiable information.</p><Link className="button" href="/contact">Discuss an operations project</Link></div></section>
 <footer className="footer"><div className="container footer-row"><Link className="brand brand-footer" href="/">SHAHIN4L</Link><p>People · Process · Technology</p><span>© {new Date().getFullYear()} SHAHIN4L</span></div></footer></main>
}