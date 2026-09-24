import Head from 'next/head';
import {BarChart3,Boxes,Building2,MapPinned,Network,PackageCheck,ShieldCheck,Store,TrendingUp,Truck,UsersRound} from 'lucide-react';
import {CTA,InnerHero,PageShell,SectionHead} from '../components/Site';

export default function Investors(){return <PageShell><Head>
<title>Investor Relations | Ecoo Basket B2B</title>
<meta name='description' content='Ecoo Basket is building a Chennai-first B2B FMCG distribution platform and is open to strategic investment discussions to support disciplined growth.'/>
</Head><main>
<InnerHero eyebrow='INVESTOR RELATIONS' title='Seeking growth capital to build a stronger B2B FMCG distribution business.' body='Ecoo Hyper Retail Private Limited is building a Chennai-first wholesale platform for kirana stores and local retailers. We are open to conversations with strategic and financial investors who can support disciplined, execution-led growth.' aside={<div className='aside-stat'><b>Growth Capital</b><span>Strategic investment discussions</span></div>}/>

<section className='section wrap'><SectionHead eyebrow='COMPANY SNAPSHOT' title='A focused B2B FMCG platform built around local retail.'/><div className='facts-grid'>{[
['Legal entity','Ecoo Hyper Retail Private Limited'],['Headquarters','Vanagaram, Chennai'],['Current market','Chennai'],['Customer focus','Kirana & general trade'],['Business model','Multi-brand FMCG distribution'],['Digital order channel','EcooBasket.com']
].map(([k,v])=><div className='fact' key={k}><span>{k}</span><b>{v}</b></div>)}</div></section>

<section className='section soft'><div className='wrap'><SectionHead eyebrow='WHY ECOO BASKET' title='A practical opportunity in an essential retail supply chain.' body='Our model is designed around frequent FMCG demand, fragmented local sourcing and the need for dependable last-mile wholesale support.'/><div className='card-grid three'>
<article className='feature-card'><Store/><h3>Large local-retail base</h3><p>Kirana and neighbourhood stores remain important access points for everyday FMCG consumption.</p></article>
<article className='feature-card'><Network/><h3>Fragmented sourcing</h3><p>Retailers often coordinate across multiple suppliers. Better aggregation can reduce sourcing friction and improve replenishment.</p></article>
<article className='feature-card'><TrendingUp/><h3>Repeat-order potential</h3><p>FMCG is a recurring-demand category where service quality, route density and repeat purchasing can strengthen operating efficiency.</p></article>
</div></div></section>

<section className='section wrap'><SectionHead eyebrow='FUNDING PURPOSE' title='Where growth capital can help the business move faster.' body='Investment would be used to strengthen the operating foundation before wider geographic expansion.'/><div className='card-grid three'>
<article className='feature-card'><Boxes/><h3>Inventory depth</h3><p>Improve availability across fast-moving categories and support better retailer fulfilment.</p></article>
<article className='feature-card'><Truck/><h3>Distribution capacity</h3><p>Strengthen warehouse, route planning and local delivery capabilities across Chennai.</p></article>
<article className='feature-card'><PackageCheck/><h3>Supplier & category expansion</h3><p>Deepen multi-brand sourcing relationships and selectively expand high-potential categories.</p></article>
<article className='feature-card'><BarChart3/><h3>Technology & data</h3><p>Improve ordering, retailer insights, sales visibility, route productivity and management reporting.</p></article>
<article className='feature-card'><UsersRound/><h3>Sales execution</h3><p>Build a stronger field team to improve outlet coverage, repeat ordering and retailer relationships.</p></article>
<article className='feature-card'><MapPinned/><h3>Measured market expansion</h3><p>Prove the Chennai model, strengthen unit economics and expand selectively into additional Tamil Nadu markets.</p></article>
</div></section>

<section className='section soft'><div className='wrap'><SectionHead eyebrow='GROWTH ROADMAP' title='Build locally. Prove the model. Scale with discipline.'/><div className='roadmap'>{[
['Phase 01','Strengthen Chennai operations','Improve product availability, ordering discipline, delivery consistency and retailer service.'],
['Phase 02','Increase retail density','Grow repeat orders, route productivity and outlet coverage across Chennai clusters.'],
['Phase 03','Expand categories & partnerships','Deepen supplier relationships and selectively grow own-brand and partner-led opportunities.'],
['Phase 04','Enter selected Tamil Nadu markets','Replicate a proven operating model only after local execution and economics are validated.']
].map(([p,t,b])=><article key={p}><span>{p}</span><h3>{t}</h3><p>{b}</p></article>)}</div></div></section>

<section className='section wrap'><div className='story-grid'><div><span className='eyebrow'>WHO WE WANT TO SPEAK WITH</span><h2>Investors who can add more than capital.</h2><p>We welcome discussions with investors, family offices, strategic operators, FMCG ecosystem partners and business leaders who understand distribution, retail, supply chain, technology or growth-stage execution.</p><p>We value patient, commercially grounded partners who support strong governance, disciplined use of capital and measurable operating progress.</p></div><div className='principles'>
<div><ShieldCheck/><b>Disciplined governance</b><span>Clear reporting, accountable execution and responsible growth.</span></div>
<div><Building2/><b>Long-term company building</b><span>Focus on durable operating systems rather than growth at any cost.</span></div>
<div><BarChart3/><b>Evidence-led scaling</b><span>Measure service quality, repeat business and operating efficiency before expansion.</span></div>
</div></div></section>

<section className='section soft'><div className='wrap narrow'><SectionHead eyebrow='INVESTMENT CONVERSATION' title='Help us strengthen the next stage of Ecoo Basket.'/><p className='lead-sm'>If you are an investor or strategic partner interested in B2B FMCG distribution, local retail infrastructure and Chennai-first growth, we would be glad to share more about the business, operating plan and capital requirements in a direct conversation.</p><p style={{color:'var(--muted)',fontSize:'13px',marginTop:'20px'}}>This page is for general corporate information and discussion purposes only. It does not constitute a public offer, investment recommendation or promise of returns.</p></div></section>

<CTA title='Interested in supporting the next stage of Ecoo Basket?' body='Start a confidential conversation with our team about the business, growth plan and investment opportunity.' primary='Discuss Investment' primaryHref='/contact' secondary='Explore Our Business' secondaryHref='/business'/>
</main></PageShell>}
