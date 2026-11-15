import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
export const dynamic="force-dynamic";
export default async function Article({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 if(!url||!key) notFound();
 const supabase=createClient(url,key);
 const {data:post}=await supabase.from("posts").select("title,excerpt,content,cover_url,published_at").eq("slug",slug).eq("status","published").maybeSingle();
 if(!post) notFound();
 return <main><header className="site-header"><div className="container nav-wrap"><Link className="brand" href="/">SHAHIN4L</Link><Link className="button button-small" href="/blog">All articles</Link></div></header><article className="section"><div className="container" style={{maxWidth:820}}><p className="eyebrow eyebrow-light">SHAHIN4L / KNOWLEDGE HUB</p><h1 style={{fontSize:"clamp(38px,6vw,64px)",lineHeight:1.1}}>{post.title}</h1>{post.excerpt?<p className="lead">{post.excerpt}</p>:null}{post.cover_url?<img src={post.cover_url} alt="" style={{width:"100%",maxHeight:440,objectFit:"cover",borderRadius:18,margin:"25px 0"}}/>:null}<div className="article-body">{post.content}</div><Link className="button" href="/blog" style={{marginTop:35}}>← Back to Knowledge Hub</Link></div></article></main>
}