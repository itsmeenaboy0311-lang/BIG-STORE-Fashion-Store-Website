import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, ChevronDown, Instagram, MapPin, Menu, Minus, Phone, Plus, Star, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const categories = [
  { number: '01', title: "Men's edit", copy: 'Easy layers, smart separates, and pieces that go from work to weekend.', tone: 'from-[#d9b58b] to-[#b56d48]' },
  { number: '02', title: "Women's edit", copy: 'Everyday favourites and statement pieces with a little more room to move.', tone: 'from-[#c7a7b8] to-[#9d6374]' },
  { number: '03', title: 'Traditional', copy: 'Modern silhouettes rooted in the colour and craft of Rajasthan.', tone: 'from-[#d8a847] to-[#b57325]' },
  { number: '04', title: 'Casual', copy: 'The soft, dependable rotation you will reach for again and again.', tone: 'from-[#97aeb0] to-[#55747b]' },
  { number: '05', title: 'New arrivals', copy: 'Fresh drops, seasonal colour, and the next thing worth trying on.', tone: 'from-[#b7a7cc] to-[#6f628c]' },
  { number: '06', title: 'Budget fashion', copy: 'Good-looking finds that keep the plan — and the price — sensible.', tone: 'from-[#dd9b73] to-[#be6748]' },
];

const reasons = [
  { title: 'Room to browse', copy: 'A spacious, easy-going floor where you can take your time, compare, and find your fit.' },
  { title: 'A little of everything', copy: 'Branded, traditional, casual and occasion-ready — all in one dependable Jodhpur stop.' },
  { title: 'Prices that make sense', copy: 'Style should feel exciting, not stressful. We keep the edit accessible for real wardrobes.' },
];

const products = [
  { label: 'FEATURED / PLACEHOLDER', title: 'The everyday layer', kind: 'Placeholder product image', image: '/hero-fashion.jpg' },
  { label: 'NEW ARRIVAL / PLACEHOLDER', title: 'Colour, with restraint', kind: 'Placeholder product image', image: '/tradition-fashion.jpg' },
  { label: 'FEATURED / PLACEHOLDER', title: 'The occasion edit', kind: 'Placeholder product image', image: '/store-detail.jpg' },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Meta() {
  useEffect(() => {
    document.title = 'BIG STORE — Fashion for Every Style | Jodhpur';
    const description = 'Discover stylish, branded, traditional and everyday clothing at BIG STORE in Mohan Nagar, Jodhpur.';
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', 'description'); document.head.appendChild(tag); }
    tag.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.setAttribute('content', 'BIG STORE — Fashion for Every Style');
    document.head.appendChild(ogTitle);
    const ogDescription = document.querySelector('meta[property="og:description"]') ?? document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.setAttribute('content', description);
    document.head.appendChild(ogDescription);
  }, []);
  return null;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2 ${light ? 'text-[#f8f0df]' : 'text-[#1d2d4b]'}`} data-testid="link-logo">
      <span className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-bold tracking-[-.08em] transition-transform group-hover:rotate-[-12deg] ${light ? 'border-[#e9c67e]' : 'border-[#ee6d4b]'}`}>BS</span>
      <span className="font-mono-ui text-sm font-bold tracking-[-.05em]">BIG STORE</span>
    </a>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  useReveal();

  const closeMenu = () => setMenuOpen(false);

  return (
    <div id="top" className="noise overflow-hidden">
      <Meta />
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <Logo light />
          <nav className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[.14em] text-[#f8f0df]/80 md:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-[#f3c56d]" href="#collection" data-testid="link-collection">Collection</a>
            <a className="transition-colors hover:text-[#f3c56d]" href="#why-big-store" data-testid="link-why">Why us</a>
            <a className="transition-colors hover:text-[#f3c56d]" href="#visit" data-testid="link-visit">Visit</a>
            <a className="transition-colors hover:text-[#f3c56d]" href="https://www.instagram.com/bjg_store_bjs/" target="_blank" rel="noreferrer" data-testid="link-instagram-nav">Instagram</a>
          </nav>
          <a href="#visit" className="hidden items-center gap-2 rounded-full bg-[#f3c56d] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[.13em] text-[#1d2d4b] transition-transform hover:-translate-y-0.5 md:inline-flex" data-testid="button-find-us">
            Find us <ArrowUpRight size={14} />
          </a>
          <button type="button" className="rounded-full border border-[#f8f0df]/30 p-2 text-[#f8f0df] md:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu" data-testid="button-open-menu">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#1d2d4b] p-6 text-[#f8f0df] md:hidden">
          <div className="flex items-center justify-between"><Logo light /><button type="button" onClick={closeMenu} aria-label="Close menu" className="rounded-full border border-[#f8f0df]/30 p-2" data-testid="button-close-menu"><X size={20} /></button></div>
          <nav className="mt-20 flex flex-col gap-7 font-display text-5xl" aria-label="Mobile navigation">
            {['collection', 'why-big-store', 'visit'].map((item, index) => <a key={item} href={`#${item}`} onClick={closeMenu} data-testid={`link-mobile-${item}`}>{['Collection', 'Why us', 'Visit'][index]}</a>)}
            <a href="https://www.instagram.com/bjg_store_bjs/" target="_blank" rel="noreferrer" onClick={closeMenu} data-testid="link-mobile-instagram">Instagram</a>
          </nav>
          <p className="absolute bottom-8 font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#f3c56d]">Mohan Nagar · Jodhpur</p>
        </div>
      )}

      <main>
        <section className="relative min-h-[730px] bg-[#1d2d4b] text-[#f8f0df] sm:min-h-[790px]" aria-labelledby="hero-title">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(243,197,109,.18),transparent_32%),linear-gradient(115deg,rgba(29,45,75,.94)_18%,rgba(29,45,75,.52)_55%,rgba(29,45,75,.16))]" />
          <img src="/hero-fashion.jpg" alt="Fashion styling in a sunlit Jodhpur courtyard" className="absolute inset-0 h-full w-full object-cover object-[65%_center] mix-blend-luminosity opacity-80" />
          <div className="absolute inset-0 bg-[#1d2d4b]/30" />
          <div className="relative mx-auto flex min-h-[730px] max-w-[1440px] flex-col justify-end px-5 pb-14 pt-36 sm:min-h-[790px] sm:px-8 sm:pb-20 lg:px-12">
            <div className="max-w-[790px]">
              <p className="hero-in hero-in-1 mb-7 font-mono-ui text-[10px] font-bold uppercase tracking-[.27em] text-[#f3c56d]">Local fashion, Jodhpur / Est. for every day</p>
              <h1 id="hero-title" className="hero-in hero-in-2 text-balance font-display text-[clamp(4.5rem,10vw,9.5rem)] leading-[.79] tracking-[-.055em]">Fashion for<br /><em className="text-[#f3c56d]">Every Style.</em></h1>
              <p className="hero-in hero-in-3 mt-7 max-w-[440px] text-base leading-7 text-[#f8f0df]/75 sm:text-lg">Discover stylish, branded, and traditional clothing in Jodhpur — with prices that keep good style in reach.</p>
              <div className="hero-in hero-in-4 mt-9 flex flex-wrap items-center gap-3">
                <a href="#collection" className="inline-flex items-center gap-3 rounded-full bg-[#ee6d4b] px-6 py-3.5 text-xs font-bold uppercase tracking-[.12em] text-[#fff5e7] transition-transform hover:-translate-y-1" data-testid="button-browse-collection">Browse the collection <ArrowDownRight size={16} /></a>
                <a href="#visit" className="inline-flex items-center gap-3 rounded-full border border-[#f8f0df]/40 px-6 py-3.5 text-xs font-bold uppercase tracking-[.12em] text-[#f8f0df] transition-colors hover:border-[#f3c56d] hover:text-[#f3c56d]" data-testid="button-visit-store">Visit the store <MapPin size={15} /></a>
              </div>
            </div>
            <div className="mt-16 flex items-end justify-between border-t border-[#f8f0df]/20 pt-4 text-[#f8f0df]/60">
              <p className="font-mono-ui text-[9px] uppercase tracking-[.17em]">Plot No. 277 · 1st Floor<br />BJS, Jodhpur 342001</p>
              <p className="hidden max-w-[170px] text-right text-xs leading-5 sm:block">A welcoming floor for wardrobes in progress.</p>
            </div>
          </div>
        </section>

        <div className="overflow-hidden border-b border-[#d6cdb9] bg-[#f3c56d] py-3.5 text-[#1d2d4b]">
          <div className="marquee flex w-max items-center gap-8 font-mono-ui text-[10px] font-bold uppercase tracking-[.22em]">
            {[1, 2, 3, 4].map(item => <span key={item} className="flex items-center gap-8">Branded · Traditional · Everyday <span className="text-[#ee6d4b]">/</span> Jodhpur <span className="text-[#ee6d4b]">/</span></span>)}
          </div>
        </div>

        <section id="why-big-store" className="bg-[#f0e6d3] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="reveal grid gap-12 lg:grid-cols-[.8fr_1.4fr] lg:items-end">
              <div><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.23em] text-[#ee6d4b]">01 / The BIG STORE feeling</p></div>
              <div><h2 className="max-w-[850px] font-display text-[clamp(3.2rem,6vw,6.7rem)] leading-[.88] tracking-[-.05em] text-[#1d2d4b]">Style should feel <em className="text-[#ee6d4b]">easy.</em></h2><p className="mt-7 max-w-[580px] text-base leading-7 text-[#1d2d4b]/65">No pressure, no pretending. Just a generous edit of clothes that look good, feel right, and work for how Jodhpur actually lives.</p></div>
            </div>
            <div className="mt-20 grid gap-px border-y border-[#cfc1a9] bg-[#cfc1a9] sm:grid-cols-3">
              {reasons.map((reason, index) => <article key={reason.title} className={`reveal reveal-delay-${index + 1} bg-[#f0e6d3] py-8 pr-8 sm:py-10 sm:pr-10 ${index > 0 ? 'sm:pl-8' : ''}`}><span className="font-mono-ui text-[10px] text-[#ee6d4b]">0{index + 1}</span><h3 className="mt-12 font-display text-4xl tracking-[-.04em] text-[#1d2d4b]">{reason.title}</h3><p className="mt-4 max-w-[280px] text-sm leading-6 text-[#1d2d4b]/60">{reason.copy}</p></article>)}
            </div>
          </div>
        </section>

        <section id="collection" className="bg-[#f8f0df] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.23em] text-[#ee6d4b]">02 / Find your lane</p><h2 className="mt-5 font-display text-[clamp(3.4rem,7vw,7.8rem)] leading-[.82] tracking-[-.055em] text-[#1d2d4b]">The <em className="text-[#ee6d4b]">edit</em></h2></div><p className="max-w-[275px] text-sm leading-6 text-[#1d2d4b]/60">From the Monday uniform to the wedding-season yes, start wherever feels like you.</p></div>
            <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => <a href="#featured" key={category.title} className={`reveal reveal-delay-${(index % 3) + 1} group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[1.2rem] bg-gradient-to-br ${category.tone} p-6 text-[#fff5e7] transition-transform duration-500 hover:-translate-y-2 sm:min-h-[340px]`} data-testid={`link-category-${index + 1}`}><div className="flex items-start justify-between"><span className="font-mono-ui text-[10px] opacity-80">{category.number}</span><ArrowUpRight size={19} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div><h3 className="font-display text-4xl leading-none tracking-[-.04em]">{category.title}</h3><p className="mt-3 max-w-[250px] text-sm leading-5 text-white/75">{category.copy}</p></div></a>)}
            </div>
          </div>
        </section>

        <section id="featured" className="bg-[#dbe5e4] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="reveal flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.23em] text-[#1d2d4b]/60">03 / A glimpse, not a catalogue</p><h2 className="mt-5 max-w-[700px] font-display text-[clamp(3.2rem,6vw,6.4rem)] leading-[.84] tracking-[-.05em] text-[#1d2d4b]">Coming into<br /><em className="text-[#ee6d4b]">focus.</em></h2></div><p className="max-w-[280px] text-sm leading-6 text-[#1d2d4b]/60">A visual preview of the kind of mood you will find in store. Product details and prices are intentionally not listed here.</p></div>
            <div className="mt-16 grid gap-4 md:grid-cols-3">
              {products.map((product, index) => <article key={product.title} className={`reveal reveal-delay-${index + 1} group overflow-hidden rounded-[1rem] bg-[#f8f0df]`} data-testid={`card-placeholder-product-${index + 1}`}><div className="relative aspect-[.88] overflow-hidden bg-[#c4d1d0]"><img src={product.image} alt="" className="h-full w-full object-cover grayscale-[.15] transition-transform duration-700 group-hover:scale-105" /><div className="absolute left-4 top-4 rounded-full bg-[#f8f0df]/90 px-3 py-2 font-mono-ui text-[9px] font-bold tracking-[.13em] text-[#1d2d4b]">{product.label}</div></div><div className="p-5"><h3 className="font-display text-3xl tracking-[-.03em] text-[#1d2d4b]">{product.title}</h3><p className="mt-2 font-mono-ui text-[9px] uppercase tracking-[.15em] text-[#1d2d4b]/50">{product.kind} · Visit in store</p></div></article>)}
            </div>
            <p className="mt-7 font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#1d2d4b]/50">Note: These are illustrative placeholders, not actual BIG STORE products or prices.</p>
          </div>
        </section>

        <section className="bg-[#1d2d4b] px-5 py-24 text-[#f8f0df] sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="reveal"><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.23em] text-[#f3c56d]">04 / Made for this city</p><h2 className="mt-6 max-w-[690px] font-display text-[clamp(3.5rem,7vw,7.2rem)] leading-[.82] tracking-[-.055em]">A good store<br /><em className="text-[#f3c56d]">knows its people.</em></h2><p className="mt-8 max-w-[470px] text-base leading-7 text-[#f8f0df]/70">BIG STORE is your local answer to the “what do I wear?” question. A little more colour, a little more choice, and a floor that welcomes everyone — young shoppers, families, first jobs, big celebrations.</p><a href="#visit" className="mt-9 inline-flex items-center gap-2 border-b border-[#f3c56d] pb-2 text-xs font-bold uppercase tracking-[.14em] text-[#f3c56d]" data-testid="link-about-visit">Come say hello <ArrowDownRight size={15} /></a></div>
            <div className="reveal reveal-delay-2 relative"><div className="absolute -left-5 -top-5 h-28 w-28 rounded-full border border-[#ee6d4b]/60 sm:-left-10 sm:-top-10 sm:h-40 sm:w-40" /><img src="/store-detail.jpg" alt="The spacious interior of BIG STORE in Jodhpur" className="relative aspect-[.86] w-full rounded-[1rem] object-cover sm:aspect-[1/1.06]" /><div className="absolute -bottom-5 -left-4 rounded-[.8rem] bg-[#ee6d4b] p-5 text-[#fff5e7] sm:-left-8"><p className="font-mono-ui text-[9px] uppercase tracking-[.15em]">Open to your pace</p><p className="mt-1 font-display text-3xl">Take your time.</p></div></div>
          </div>
        </section>

        <section className="bg-[#f0e6d3] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="reveal grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><div><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.23em] text-[#ee6d4b]">05 / Heard around the floor</p><h2 className="mt-5 font-display text-[clamp(3.4rem,6vw,6.5rem)] leading-[.82] tracking-[-.05em] text-[#1d2d4b]">Worth the<br /><em className="text-[#ee6d4b]">visit.</em></h2></div><div><div className="flex items-center gap-3"><span className="font-display text-6xl text-[#1d2d4b]">4.7</span><div><div className="flex gap-1 text-[#ee6d4b]">{[1, 2, 3, 4, 5].map(star => <Star key={star} size={15} fill="currentColor" />)}</div><p className="mt-1 font-mono-ui text-[9px] uppercase tracking-[.15em] text-[#1d2d4b]/50">Google rating · 6 reviews</p></div></div><div className="mt-12 grid gap-4 sm:grid-cols-3">{['“Affordable, with enough variety to actually find something.”', '“Spacious store — browsing never feels rushed.”', '“A useful mix for the whole family, not just one kind of style.”'].map((quote, index) => <blockquote key={quote} className={`reveal reveal-delay-${index + 1} border-t border-[#cfc1a9] pt-5 text-sm leading-6 text-[#1d2d4b]/70`}><span className="font-mono-ui text-[10px] text-[#ee6d4b]">0{index + 1}</span><p className="mt-6">{quote}</p></blockquote>)}</div></div></div>
          </div>
        </section>

        <section id="visit" className="bg-[#ee6d4b] px-5 py-24 text-[#fff5e7] sm:px-8 sm:py-32 lg:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="reveal grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-end"><div><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.23em] text-[#1d2d4b]/65">06 / Put it on your route</p><h2 className="mt-6 max-w-[750px] font-display text-[clamp(4rem,9vw,9rem)] leading-[.77] tracking-[-.06em]">Come find<br /><em className="text-[#f3c56d]">your fit.</em></h2></div><p className="max-w-[310px] text-base leading-7 text-[#fff5e7]/80">Make a morning of it. We are on the first floor in Mohan Nagar, BJS — easy to reach, easier to stay awhile.</p></div>
            <div className="mt-20 grid gap-8 border-t border-[#fff5e7]/30 pt-8 sm:grid-cols-3"><div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#1d2d4b]/65">Address</p><address className="mt-4 not-italic text-lg leading-7">Plot No. 277, 1st Floor<br />Mohan Nagar, BJS<br />Jodhpur, Rajasthan 342001</address></div><div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#1d2d4b]/65">Open the map</p><a href="https://www.google.com/maps/search/?api=1&query=BIG+STORE+Mohan+Nagar+BJS+Jodhpur" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-lg underline decoration-[#f3c56d] decoration-2 underline-offset-4" data-testid="link-google-maps">Get directions <ArrowUpRight size={17} /></a></div><div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#1d2d4b]/65">Stay in the loop</p><a href="https://www.instagram.com/bjg_store_bjs/" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-lg underline decoration-[#f3c56d] decoration-2 underline-offset-4" data-testid="link-instagram-footer"><Instagram size={18} /> @bjg_store_bjs</a></div></div>
          </div>
        </section>

        <section className="bg-[#f8f0df] px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
          <div className="mx-auto max-w-[920px]">
            <div className="reveal mb-12"><p className="font-mono-ui text-[10px] font-bold uppercase tracking-[.23em] text-[#ee6d4b]">07 / Before you come by</p><h2 className="mt-5 font-display text-[clamp(3.2rem,6vw,6.2rem)] leading-[.83] tracking-[-.05em] text-[#1d2d4b]">The useful<br /><em className="text-[#ee6d4b]">bits.</em></h2></div>
            {[['Is BIG STORE only for one age group?', 'Not at all. Our edit moves from everyday basics to occasion-ready pieces, with something for young shoppers and families alike.'], ['Can I see the full collection online?', 'This page is a taste of the store, not a complete catalogue. Drop by to explore the current selection and try things on.'], ['Where exactly are you?', 'Plot No. 277, 1st Floor, Mohan Nagar, BJS, Jodhpur, Rajasthan 342001. Use the map link above for directions.']].map(([question, answer], index) => <div key={question} className="reveal border-t border-[#cfc1a9] last:border-b"><button type="button" onClick={() => setOpenQuestion(openQuestion === index ? null : index)} className="flex w-full items-center justify-between gap-5 py-6 text-left" aria-expanded={openQuestion === index} data-testid={`button-faq-${index + 1}`}><span className="font-display text-2xl text-[#1d2d4b] sm:text-3xl">{question}</span><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1d2d4b]/25 text-[#ee6d4b]">{openQuestion === index ? <Minus size={16} /> : <Plus size={16} />}</span></button>{openQuestion === index && <p className="max-w-[650px] pb-7 pr-12 text-sm leading-6 text-[#1d2d4b]/65">{answer}</p>}</div>)}
          </div>
        </section>
      </main>

      <footer className="bg-[#1d2d4b] px-5 pb-8 pt-16 text-[#f8f0df] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col justify-between gap-12 border-b border-[#f8f0df]/20 pb-14 md:flex-row"><div><Logo light /><p className="mt-7 max-w-[260px] text-sm leading-6 text-[#f8f0df]/60">Fashion for every style.<br />Prices for every budget.</p></div><div className="grid grid-cols-2 gap-x-16 gap-y-8 text-sm"><div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#f3c56d]">Explore</p><div className="mt-4 flex flex-col gap-3 text-[#f8f0df]/70"><a href="#collection" className="hover:text-[#f3c56d]" data-testid="link-footer-collection">Collection</a><a href="#why-big-store" className="hover:text-[#f3c56d]" data-testid="link-footer-why">Why BIG STORE</a><a href="#visit" className="hover:text-[#f3c56d]" data-testid="link-footer-visit">Visit us</a></div></div><div><p className="font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#f3c56d]">Say hello</p><div className="mt-4 flex flex-col gap-3 text-[#f8f0df]/70"><a href="tel:+919829123456" className="inline-flex items-center gap-2 hover:text-[#f3c56d]" data-testid="link-footer-phone"><Phone size={14} /> Call the store</a><a href="https://www.instagram.com/bjg_store_bjs/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#f3c56d]" data-testid="link-footer-social"><Instagram size={14} /> Instagram</a></div></div></div></div>
          <div className="flex flex-col justify-between gap-3 pt-5 font-mono-ui text-[9px] uppercase tracking-[.13em] text-[#f8f0df]/40 sm:flex-row"><p>© {new Date().getFullYear()} BIG STORE · JODHPUR</p><a href="#top" className="inline-flex items-center gap-2 hover:text-[#f3c56d]" data-testid="link-back-top">Back to top <ChevronDown size={13} className="rotate-180" /></a></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;