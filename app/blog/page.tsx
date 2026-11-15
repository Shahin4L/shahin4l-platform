import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
export const dynamic="force-dynamic";
export const metadata={title:"Knowledge Hub",description:"Articles and practical notes on operations, logistics and leadership."};
async function getPosts(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key) return [];
 const supabase=createClient(url,key);
 const {data}=await supabase.from("posts").select("id,title,slug,excerpt,cover_url,published_at,created_at").eq("status","published").order("published_at",{ascending:false,nullsFirst:false});
 return data??[];
}
export default async function Blog(){
 const posts=await getPosts();
 return <main><header className="site-header"><div className="container nav-wrap"><Link className="brand" href="/"><span className="brand-mark">S4L</span><span>SHAHIN4L<small>Knowledge Hub</small></span></Link><nav className="nav-links"><Link href="/">Home</Link><Link href="/operations">Operations Lab</Link><Link href="/resources">Resources</Link></nav><Link className="button button-small" href="/contact">Contact</Link></div></header><section className="section section-tint"><div className="container"><p className="eyebrow eyebrow-light">KNOWLEDGE HUB</p><h1 style={{fontSize:"clamp(42px,6vw,68px)"}}>Ideas from the field.<br/>Shared with clarity.</h1><p className="body-copy">Practical perspectives on courier operations, logistics, process improvement and team leadership.</p>{posts.length?<div className="project-grid" style={{marginTop:45}}>{posts.map((post:any)=><article className="project-card" key={post.id}>{post.cover_url?<img src={post.cover_url} alt="" style={{width:"100%",height:180,objectFit:"cover"}}/>:<div className="project-visual"><span>SHAHIN4L / INSIGHT</span></div>}<div className="project-content"><span className="tag">ARTICLE</span><h3>{post.title}</h3><p>{post.excerpt??"Read the latest insight from SHAHIN4L."}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read article ↗</Link></div></article>)}</div>:<div className="project-card" style={{padding:32,marginTop:36}}><span className="tag">FIRST ARTICLES COMING SOON</span><h2 style={{fontSize:28}}>Knowledge worth sharing.</h2><p className="body-copy">নতুন লেখা প্রকাশিত হলে এখানে দেখা যাবে। Admin workspace থেকে তুমি নিজেই পোস্ট লিখে Publish করতে পারবে।</p><Link href="/admin/login" className="button">Write your first post ↗</Link></div>}</div></section><footer className="footer"><div className="container footer-row"><Link className="brand brand-footer" href="/">SHAHIN4L</Link><p>Building better operations.</p><span>© {new Date().getFullYear()}</span></div></footer></main>
}