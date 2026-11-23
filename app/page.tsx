'use client';

import Image from 'next/image';
import { useMemo, useState, type FormEvent } from 'react';
import { galleryItems } from '@/data/gallery';

const PHONE = '917679752047';
const waLink = (message = 'Hello SHUBHSAJ! I would like to enquire about your decoration services.') => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
const categories = ['All', 'Gift Hampers', 'Wedding Trays', 'Floral Decor', 'Car Decor', 'Celebrations'] as const;
const services = [
  { icon: '✧', title: 'Luxury Floral Decorations', text: 'Fresh-looking floral details that make every space feel special.' },
  { icon: '🎁', title: 'Premium Gift Hampers', text: 'Thoughtful gifts, beautifully curated and wrapped with care.' },
  { icon: '❀', title: 'Beautifully Decorated Trays', text: 'Traditional tattwa and modern tray styling for meaningful moments.' },
  { icon: '♡', title: 'Wedding & Engagement', text: 'Personalised details for the celebrations you will always remember.' },
  { icon: '🍼', title: 'Baby Shower & Annaprashan', text: 'Sweet, joyful arrangements for your little one’s milestones.' },
  { icon: '✦', title: 'Birthday & Special Occasions', text: 'A little extra magic for birthdays, festivities and surprises.' },
];
const values = [
  { n: '01', title: 'Made just for you', text: 'Every arrangement can be customised to your occasion, colour palette and budget.' },
  { n: '02', title: 'Luxury within reach', text: 'Beautiful presentation and thoughtful details at budget-friendly prices.' },
  { n: '03', title: 'Care in every detail', text: 'From the first idea to the final ribbon, we make every element count.' },
];

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}<span className="heading-flourish">✦　❧　✦</span></div>;
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus('sending'); setError('');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send your enquiry.');
      setStatus('success'); form.reset();
    } catch (err) { setError(err instanceof Error ? err.message : 'Something went wrong.'); setStatus('error'); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Your name *<input name="name" placeholder="e.g. Priya Sharma" required maxLength={90} /></label>
      <label>Phone number *<input name="phone" type="tel" placeholder="Your contact number" required maxLength={18} /></label>
      <label>Email address<input name="email" type="email" placeholder="you@example.com" maxLength={120} /></label>
      <label>What are you looking for? *<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}</select></label>
    </div>
    <label className="message-label">Tell us a little about your occasion<textarea name="message" rows={4} placeholder="Date, occasion, preferred colours, budget or any ideas you have…" maxLength={1500} /></label>
    <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <button className="button button-primary submit-button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending enquiry…' : 'Send enquiry'} <span>↗</span></button>
    {status === 'success' && <p className="form-success" role="status">Thank you! Your enquiry has been sent. We’ll be in touch soon.</p>}
    {status === 'error' && <p className="form-error" role="alert">{error}</p>}
    <p className="form-note">Prefer a quick conversation? <a href={waLink('Hello SHUBHSAJ! I would like to discuss an order.')} target="_blank" rel="noreferrer">Chat with us on WhatsApp.</a></p>
  </form>;
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = useMemo(() => activeCategory === 'All' ? galleryItems : galleryItems.filter(item => item.category === activeCategory), [activeCategory]);
  return <main>
    <div className="announcement"><span>✦</span> Thoughtful details. Beautiful celebrations. <span>✦</span> <a href={waLink()} target="_blank" rel="noreferrer">Enquire on WhatsApp ↗</a></div>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="SHUBHSAJ home"><Image src="/images/logo.webp" alt="SHUBHSAJ logo" width={66} height={66} priority /><span><b>SHUBHSAJ</b><small>TRAY · GIFT · FLORAL DECORATION</small></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>{[['Home','#home'],['Our story','#about'],['Services','#services'],['Gallery','#gallery'],['Contact','#contact']].map(([label,href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-cta" href={waLink()} target="_blank" rel="noreferrer">Let’s talk <span>↗</span></a></nav>
    </header>

    <section className="hero" id="home">
      <div className="hero-pattern" />
      <div className="hero-copy"><span className="eyebrow light">THE ART OF THOUGHTFUL CELEBRATING</span><h1>Every celebration<br />deserves a <em>beautiful</em><br />beginning.</h1><p>From beautifully dressed gift trays to dreamy floral details, we add a little wonder to your most meaningful moments.</p><div className="hero-actions"><a className="button button-gold" href="#gallery">Explore our work <span>↗</span></a><a className="text-link light-link" href={waLink()} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a></div><div className="hero-footnote"><span className="gold-line" /> Made with love in Durgapur, West Bengal</div></div>
      <div className="hero-visual"><div className="hero-image-frame"><Image src="/images/car-decoration.webp" alt="Wedding car decorated with a festive floral garland by SHUBHSAJ" fill priority sizes="(max-width: 800px) 90vw, 48vw" /></div><div className="hero-stamp"><span>✧</span><b>YOUR MOMENT</b><small>OUR CREATIVE TOUCH</small><span>❧</span></div><div className="hero-caption">A little more beauty<br />in every little detail.</div></div>
      <div className="hero-bottom-mark">SHUBHSAJ <span>✦</span> সাজে থাকুক প্রতিটি শুভ মুহূর্ত</div>
    </section>

    <section className="intro section-pad" id="about"><div className="intro-mark">S<span>✧</span></div><div className="intro-copy"><span className="eyebrow">A LITTLE ABOUT US</span><h2>Where every celebration<br /><em>gets a royal touch.</em></h2><p className="intro-lead">Welcome to SHUBHSAJ — where beautiful details turn special occasions into lasting memories.</p><p>We believe every special moment deserves a beautiful presentation. From thoughtful little gifts to grand celebrations, we bring creativity, care and a touch of Bengali elegance to every detail.</p><a className="text-link" href="#services">Discover what we create <span>↗</span></a></div><div className="intro-note"><span>✧</span><p>Luxury looks<br />at affordable<br /><em>prices.</em></p><small>THE SHUBHSAJ PROMISE</small></div></section>

    <section className="services section-pad" id="services"><SectionHeading eyebrow="MADE FOR YOUR MOMENTS" title="A beautiful detail for every occasion" text="Thoughtfully styled, lovingly customised and always made to feel special." /><div className="service-grid">{services.map((service,i) => <article className="service-card" key={service.title}><span className="service-number">0{i+1}</span><div className="service-icon">{service.icon}</div><h3>{service.title}</h3><p>{service.text}</p><a href={waLink(`Hello SHUBHSAJ! I am interested in ${service.title}. Please share the details.`)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${service.title}`}>Enquire <span>↗</span></a></article>)}</div></section>

    <section className="gallery section-pad" id="gallery"><SectionHeading eyebrow="A FEW THINGS WE’VE MADE" title="Little details. Lasting memories." text="A glimpse of our work — every piece can be tailored to your celebration." /><div className="gallery-filters" role="group" aria-label="Filter gallery">{categories.map(category => <button key={category} className={activeCategory === category ? 'filter active' : 'filter'} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="gallery-grid">{filtered.map((item,index) => <article className={`gallery-card gallery-card-${index%3}`} key={item.id}>{item.type === 'video' ? <video src={item.src} poster={item.poster} controls muted playsInline preload="metadata" aria-label={item.title} /> : <Image src={item.src} alt={item.title} fill sizes="(max-width: 700px) 90vw, 33vw" /> }<div className="gallery-info"><span>{item.category}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div><p className="gallery-note">Have a reference or a colour palette in mind? <a href={waLink('Hello SHUBHSAJ! I have a design reference to discuss.')} target="_blank" rel="noreferrer">Share it with us on WhatsApp ↗</a></p></section>

    <section className="promise section-pad"><div className="promise-heading"><span className="eyebrow light">WHY SHUBHSAJ</span><h2>Because the little things<br /><em>mean everything.</em></h2><p>We bring your ideas to life with a personal touch, a creative eye and a whole lot of heart.</p></div><div className="promise-list">{values.map(v => <div className="promise-item" key={v.n}><span>{v.n}</span><div><h3>{v.title}</h3><p>{v.text}</p></div><b>↗</b></div>)}</div><div className="promise-watermark">SHUBHSAJ</div></section>

    <section className="kind-words section-pad"><SectionHeading eyebrow="KIND WORDS, HAPPY MOMENTS" title="Our favourite part is making you smile." text="We’re looking forward to sharing notes from the lovely people who celebrate with SHUBHSAJ." /><div className="quote-row"><div className="quote-mark">“</div><blockquote>Your celebration could be the next story we get to be a part of.</blockquote><span className="quote-flower">✿</span></div><p className="quote-caption">CUSTOMER STORIES COMING SOON · WE’D LOVE TO HEAR FROM YOU</p></section>

    <section className="contact section-pad" id="contact"><div className="contact-intro"><span className="eyebrow light">LET’S MAKE IT BEAUTIFUL</span><h2>Tell us what<br />you’re <em>celebrating.</em></h2><p>Share a few details and let’s create something that feels just right for your special day.</p><div className="contact-direct"><span>✆</span><div><small>CALL / WHATSAPP</small><a href="tel:+917679752047">7679752047</a></div></div><div className="contact-direct"><span>⌖</span><div><small>OUR SERVICE AREA</small><p>Durgapur & nearby areas, West Bengal</p></div></div><a className="button button-gold contact-whatsapp" href={waLink()} target="_blank" rel="noreferrer">Chat with us on WhatsApp ↗</a></div><div className="form-panel"><div className="form-heading"><span className="eyebrow">A NOTE TO SHUBHSAJ</span><h3>Let’s start with a hello.</h3><p>Fill in the details below. We’ll get back to you soon.</p></div><ContactForm /></div></section>

    <footer className="footer"><a className="footer-brand" href="#home"><Image src="/images/logo.webp" alt="SHUBHSAJ" width={54} height={54} /><span><b>SHUBHSAJ</b><small>TRAY · GIFT · FLORAL DECORATION</small></span></a><p>Dream. Decorate. Celebrate.</p><div className="footer-links"><a href="#about">Our story</a><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#contact">Contact</a><a href={waLink()} target="_blank" rel="noreferrer">WhatsApp ↗</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SHUBHSAJ. Made with ♥ in Durgapur.</span><span>সাজে থাকুক প্রতিটি শুভ মুহূর্ত।</span></div></footer>
    <a className="floating-whatsapp" href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat with SHUBHSAJ on WhatsApp"><span>◉</span><b>WhatsApp us</b></a>
  </main>;
}
