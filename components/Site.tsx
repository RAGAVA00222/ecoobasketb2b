import { ReactNode, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, MessageCircle, Phone, ShoppingCart, X } from 'lucide-react';

const nav = [
  ['Home', '/'], ['About', '/company'], ['Founders', '/founders'], ['Business', '/business'],
  ['Kirana Stores', '/kirana'], ['Partners', '/partners'], ['Investors', '/investors'], ['Contact', '/contact'],
];

export function PageShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className='site'><a className='skip-link' href='#site-content'>Skip to content</a>
    <div className='topbar'><div className='wrap topbar-inner'><span>Current delivery: Chennai · Growth strategy: selected Metro, Tier-2 & Tier-3 city clusters</span><a href='tel:+919342358226'><Phone size={14}/> +91 93423 58226</a></div></div>
    <header className='header'><div className='wrap nav-row'>
      <a href='/' className='brand'><img className='brand-logo' src='/assets/images/logo/04_Logo_Icon-96.webp' alt='' aria-hidden='true' width='96' height='96'/><span><b>ECOO BASKET</b><small>B2B · ECOO HYPER RETAIL</small></span></a>
      <nav className='desktop-nav'>{nav.map(([label,href])=><a href={href} key={href}>{label}</a>)}</nav>
      <div className='nav-actions'><a className='order-pill' href='https://www.ecoobasket.com' target='_blank' rel='noreferrer'><ShoppingCart size={17}/> Order Now</a><button className='menu-btn' aria-label='Toggle menu' aria-expanded={open} aria-controls='mobile-navigation' onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>
    </div>{open&&<div id='mobile-navigation' className='mobile-nav wrap'>{nav.map(([label,href])=><a href={href} key={href} onClick={()=>setOpen(false)}>{label}</a>)}<a className='mobile-order' href='https://www.ecoobasket.com' target='_blank' rel='noreferrer'>Order on EcooBasket.com <ArrowRight size={17}/></a></div>}</header>
    <div id='site-content' tabIndex={-1}>{children}</div>
    <div className='quick-actions' aria-label='Quick business actions'><a className='quick-order' href='https://www.ecoobasket.com' target='_blank' rel='noreferrer'><ShoppingCart size={17}/> Order Now</a><a className='quick-whatsapp' href='https://wa.me/919342358226' target='_blank' rel='noreferrer'><MessageCircle size={17}/> WhatsApp</a></div>
    <section className='global-growth'><div className='wrap global-growth-inner'><div><span className='eyebrow'>GROWTH STRATEGY</span><b>Chennai today. A repeatable city-cluster model for tomorrow.</b><p>Current delivery remains Chennai-only. Future expansion is planned selectively across metro, non-metro, Tier-2 and Tier-3 city clusters after local service quality and unit economics are proven.</p></div><a className='text-link' href='/investors'>Investor growth thesis <ArrowRight size={17}/></a></div></section>
    <footer className='footer'><div className='wrap footer-grid'><div className='footer-brand'><a href='/' className='brand brand-light'><span className='brand-logo-shell'><img className='brand-logo' src='/assets/images/logo/04_Logo_Icon-96.webp' alt='' aria-hidden='true' width='96' height='96'/></span><span><b>ECOO BASKET</b><small>B2B · ECOO HYPER RETAIL</small></span></a><p>Technology-enabled B2B FMCG distribution, headquartered in Chennai.</p><p className='footer-tagline'>Smart Supply. Stronger Stores. Better Tomorrow.</p></div><div><h3>Company</h3><a href='/company'>About Company</a><a href='/founders'>Founders & Leadership</a><a href='/investors'>Investor Relations</a><a href='/careers'>Careers</a></div><div><h3>Business</h3><a href='/business'>Services & Categories</a><a href='/kirana'>Kirana Stores</a><a href='/partners'>Partner With Us</a><a href='/resources'>Resources</a></div><div><h3>Support</h3><a href='/faq'>FAQs</a><a href='/contact'>Contact</a><a href='/privacy'>Privacy Policy</a><a href='/terms'>Website Terms</a><a href='https://www.ecoobasket.com' target='_blank' rel='noreferrer'>Order Online ↗</a></div></div><div className='wrap footer-bottom'><div>© 2026 Ecoo Hyper Retail Private Limited</div><div>CIN U47912TN2026PTC195420 · GSTIN 33AAJCE8472G1ZG · UDYAM-TN-24-0189186</div></div></footer>
  </div>;
}

export function SectionHead({eyebrow,title,body}:{eyebrow:string,title:string,body?:string}) {return <div className='section-head'><span className='eyebrow'>{eyebrow}</span><h2>{title}</h2>{body&&<p>{body}</p>}</div>}
export function Metric({value,label}:{value:string,label:string}) {return <div className='metric'><b>{value}</b><span>{label}</span></div>}
export function CTA({title,body,primary,primaryHref,secondary,secondaryHref}:{title:string,body:string,primary:string,primaryHref:string,secondary?:string,secondaryHref?:string}) {return <section className='cta'><div className='wrap cta-inner'><div><span className='eyebrow light'>NEXT STEP</span><h2>{title}</h2><p>{body}</p></div><div className='actions'><a className='btn btn-light' href={primaryHref} target={primaryHref.startsWith('http')?'_blank':undefined} rel={primaryHref.startsWith('http')?'noreferrer':undefined}>{primary} <ArrowRight size={18}/></a>{secondary&&secondaryHref&&<a className='btn btn-outline-light' href={secondaryHref}>{secondary}</a>}</div></div></section>}
export function InnerHero({eyebrow,title,body,tamil,aside}:{eyebrow:string,title:string,body:string,tamil?:string,aside?:ReactNode}) {return <section className='inner-hero'><div className='wrap inner-hero-grid'><div><span className='eyebrow light'>{eyebrow}</span><h1>{title}</h1><p>{body}</p>{tamil&&<p className='hero-tamil'>{tamil}</p>}</div>{aside&&<div className='hero-aside'>{aside}</div>}</div></section>}
export function Accordion({items}:{items:{q:string,a:string}[]}) {return <div className='faq-list'>{items.map((it,i)=><details key={it.q} open={i===0}><summary>{it.q}<ChevronDown size={19}/></summary><p>{it.a}</p></details>)}</div>}


