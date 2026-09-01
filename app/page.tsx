'use client'

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Braces,
  Cloud,
  Code2,
  Globe2,
  Layers3,
  Menu,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import { useState } from 'react'

const services = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    text: 'Scalable, secure, and high-performance software tailored to your needs.',
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    text: 'Automate decisions, simplify operations, and power your product with AI.',
    featured: true,
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    text: 'Future-proof infrastructure with fast, reliable cloud deployments.',
  },
  {
    icon: Palette,
    title: 'Branding & UI/UX',
    text: 'Human-centered digital experiences and identities that drive engagement.',
  },
  {
    icon: Smartphone,
    title: 'Web & Mobile Apps',
    text: 'From MVPs to enterprise platforms — we code what you imagine.',
  },
  {
    icon: BarChart3,
    title: 'Social Media Growth',
    text: 'Strategy, content, and campaigns designed to turn attention into growth.',
  },
]

const trust = [
  ['01', '10+ Years of Tech Expertise'],
  ['02', 'Transparent Agile Process'],
  ['03', 'Dedicated Full-Stack Teams'],
  ['04', '24/7 Support & Maintenance'],
]

const projects = [
  ['FINTECH', 'Fintech Dashboard', 'Streamlined user analytics and real-time transactions.', 'fintech-dashboard', BarChart3],
  ['E-COMMERCE', 'E-commerce Platform', '300% increase in conversion through custom storefront.', 'ecommerce-platform', Layers3],
  ['AI', 'AI-Powered Tool', 'Reduced support tickets by 40% using predictive models.', 'ai-support-tool', Sparkles],
]

const specialties = [
  ['Logo Design', 'Distinctive marks built for recognition.', Braces],
  ['Brand Guidelines', 'A consistent visual language for every channel.', Palette],
  ['Visual Identity Systems', 'Flexible systems made to grow with you.', Layers3],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] font-sans text-[#f7f5ff] selection:bg-[#7428ff] selection:text-[#f7f5ff]">
      <style jsx global>{`
        html { scroll-behavior: smooth; background: #050506; }
        body { margin: 0; background: #050506; }
        @keyframes rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes halo-breathe { 0%, 100% { transform: scale(.98); filter: blur(1px); opacity: .88; } 50% { transform: scale(1.025); filter: blur(3px); opacity: 1; } }
        @keyframes halo-drift { 0%, 100% { background-position: 50% 50%; } 50% { background-position: 58% 44%; } }
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        @keyframes hero-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes button-pulse { 0%, 100% { box-shadow: 0 0 20px #6417ed66; } 50% { box-shadow: 0 0 42px #8b4cffaa; } }
        @keyframes panel-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .hero-halo { translate: -50% 0; transform-origin: center; animation: halo-breathe 4s ease-in-out infinite, halo-drift 7s ease-in-out infinite; background-size: 130% 130%; }
        .hero-copy { animation: hero-float 5s ease-in-out 1.3s infinite; }
        .hero-primary-button { animation: button-pulse 2.5s ease-in-out infinite; }
        .hero-panel { animation: panel-float 4s ease-in-out 1.5s infinite; }
        .hero-reveal { animation: rise .9s cubic-bezier(.2,.8,.2,1) both; }
        .hero-panel.hero-reveal { animation: rise .9s cubic-bezier(.2,.8,.2,1) .55s both, panel-float 4s ease-in-out 1.5s infinite; }
        .hero-delay-1 { animation-delay: .12s; }
        .hero-delay-2 { animation-delay: .26s; }
        .hero-delay-3 { animation-delay: .4s; }
        .hero-delay-4 { animation-delay: .55s; }
        .hero-gradient-text { color: transparent; background: linear-gradient(90deg,#a77aff 0%,#f7f5ff 45%,#7727ff 75%,#a77aff 100%); background-size: 200% auto; background-clip: text; -webkit-background-clip: text; animation: shimmer 5s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-halo, .hero-copy, .hero-primary-button, .hero-panel, .hero-reveal, .hero-gradient-text { animation: none; } .hero-reveal { opacity: 1; transform: none; } }
      `}</style>

      <header className="absolute inset-x-0 top-0 z-50 mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
        <a href="#home" aria-label="DS Softwares home" className="text-xl font-black tracking-[-0.04em] sm:text-2xl">
          <span className="text-[#7727ff]">DS</span>Softwares<span className="text-[#7727ff]">.</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-9 text-sm font-medium text-[#aaa6b5] md:flex">
          <a className="transition-colors hover:text-[#f7f5ff]" href="#home">Home</a>
          <a className="transition-colors hover:text-[#f7f5ff]" href="#services">Services</a>
          <a className="transition-colors hover:text-[#f7f5ff]" href="#work">Work</a>
          <a className="transition-colors hover:text-[#f7f5ff]" href="/about">About</a>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="/contact" className="rounded-lg border border-[#6d6877] px-5 py-3 text-sm font-semibold transition-colors hover:border-[#f7f5ff]">Request a Demo</a>
          <a href="/contact" className="rounded-lg bg-[#6417ed] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#7727ff]">Get Started</a>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-[#6d6877] p-2 md:hidden" aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen && (
          <nav className="absolute left-4 right-4 top-16 flex flex-col gap-1 rounded-xl border border-[#3f3b49] bg-[#111013] p-3 text-sm shadow-2xl sm:left-6 sm:right-6 sm:top-20 md:hidden">
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/contact" onClick={() => setMenuOpen(false)} className="font-bold text-[#9a5cff]">Start a project</a>
          </nav>
        )}
      </header>

      <section id="home" className="relative flex min-h-[900px] flex-col items-center px-4 pt-36 text-center min-[380px]:pt-40 sm:min-h-[860px] sm:px-6 sm:pt-48 lg:pt-52">
        <div aria-hidden="true" className="hero-halo pointer-events-none absolute left-1/2 top-28 h-[500px] w-[760px] rounded-[50%] border-[16px] border-[#efe9ff] bg-[radial-gradient(ellipse_at_center,#6d1fff_0%,#251047_46%,#09080b_70%)] shadow-[0_0_65px_20px_#7727ff,0_0_26px_8px_#f1e9ff] sm:top-32 sm:h-[570px] sm:w-[1000px] sm:border-[20px] lg:top-36 lg:h-[610px] lg:w-[1180px] lg:border-[24px]" />
        <div className="hero-copy relative z-10 max-w-4xl">
          <p className="hero-reveal mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[#a77aff]">Digital products. Real growth.</p>
          <h1 className="hero-reveal hero-delay-1 text-balance text-4xl font-black leading-[1.08] tracking-[-0.045em] min-[380px]:text-5xl sm:text-6xl lg:text-7xl">
            Innovating Tomorrow.<br />Building <span className="hero-gradient-text">Today.</span>
          </h1>
          <p className="hero-reveal hero-delay-2 mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[#c2becb] sm:text-lg">
            DS Softwares helps ambitious businesses win online through custom websites, powerful software, social media, and smart automation.
          </p>
          <div className="hero-reveal hero-delay-3 mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/contact" className="hero-primary-button rounded-lg bg-[#6417ed] px-7 py-4 text-sm font-bold transition-transform hover:-translate-y-0.5">Get a Free Consultation</a>
            <a href="#work" className="rounded-lg border border-[#817b89] bg-[#111013]/70 px-7 py-4 text-sm font-bold transition-colors hover:border-[#f7f5ff]">See Our Work</a>
          </div>
        </div>
        <div className="hero-panel hero-reveal hero-delay-4 absolute bottom-6 z-20 grid w-[calc(100%-2rem)] max-w-5xl grid-cols-2 items-center gap-4 rounded-2xl border border-[#716d78] bg-[#111013]/95 px-4 py-5 text-left shadow-2xl sm:bottom-8 sm:w-[calc(100%-3rem)] sm:grid-cols-4 sm:gap-6 sm:px-7 sm:py-6 lg:grid-cols-5">
          <div className="col-span-2 flex items-center gap-5 border-[#5b5662] lg:col-span-1 lg:border-r">
            <div><div className="flex text-[#f6ce46]">{[1,2,3,4,5].map(n => <Star key={n} size={11} fill="currentColor" />)}</div><p className="mt-1 text-xs text-[#aaa6b5]">Rated 4.9/5 by</p><strong className="text-3xl">1,200+</strong></div>
          </div>
          {['Trustpilot', 'Clutch', 'DesignRush', 'Capterra'].map((name) => <div key={name} className="flex items-center gap-2 text-lg font-bold text-[#d7d3de]"><ArrowUpRight className="text-[#9a5cff]" size={20} />{name}</div>)}
        </div>
      </section>

      <section id="services" className="relative px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div aria-hidden="true" className="absolute -left-52 top-0 h-full w-96 bg-[#3b0c85] opacity-30 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">Everything your brand needs. <span className="text-[#7727ff]">One team.</span></h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#aaa6b5]">From the first idea to launch and ongoing growth, we handle your complete digital journey.</p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, text, featured }) => (
              <article key={title} className={`group flex min-h-52 flex-col justify-between rounded-2xl border p-7 transition-transform hover:-translate-y-1 ${featured ? 'border-[#8b4cff] bg-[linear-gradient(135deg,#4c0bc7,#7a18f5)] shadow-[0_18px_60px_#6417ed35]' : 'border-[#514d57] bg-[#111013]'}`}>
                <div className="flex items-start justify-between"><Icon size={38} strokeWidth={1.8} className={featured ? 'text-[#f7f5ff]' : 'text-[#7727ff]'} /><ArrowUpRight size={22} className={featured ? 'text-[#f7f5ff]' : 'text-[#7727ff]'} /></div>
                <div><h3 className="max-w-52 text-lg font-bold leading-tight">{title}</h3><p className={`mt-3 text-sm leading-relaxed ${featured ? 'text-[#e7dcff]' : 'text-[#aaa6b5]'}`}>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[linear-gradient(110deg,#1f075c,#40109a)] px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Built on Trust. Driven by Results.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[#c9bee1]">We don&apos;t just deliver work — we build long-term partnerships grounded in speed, clarity, and outcomes.</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map(([number, label]) => <article key={number} className="min-h-56 rounded-2xl border border-[#8970bd] bg-[#2d0c75]/45 p-6 text-left"><div className="flex items-start justify-between"><span className="text-5xl font-extrabold">{number}</span><ArrowUpRight size={22} /></div><h3 className="mt-8 text-xl font-bold leading-snug">{label}</h3></article>)}
          </div>
        </div>
      </section>

      <section id="work" className="relative px-4 py-20 sm:px-6 sm:py-24 lg:py-28">
        <div aria-hidden="true" className="absolute -right-44 inset-y-0 w-96 bg-[#3b0c85] opacity-25 blur-3xl" />
        <div className="relative mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Real Impact. <span className="text-[#7727ff]">Proven Results.</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-[#aaa6b5]">Explore how we&apos;ve helped startups and established businesses launch, scale, and stand out.</p>
          <div className="mt-14 grid gap-4 text-left md:grid-cols-3">
            {projects.map(([tag, title, text, slug, Icon]) => {
              const ProjectIcon = Icon as typeof BarChart3
              return <a aria-label={`View ${title as string} case study`} href={`/projects/${slug as string}`} key={title as string} className="group rounded-2xl border border-[#514d57] bg-[#111013] p-7 transition-all hover:-translate-y-1 hover:border-[#7727ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9a5cff]"><div className="mb-10 flex items-start justify-between"><ProjectIcon size={28} className="text-[#7727ff]" /><ArrowUpRight size={22} className="text-[#716d78] transition-colors group-hover:text-[#9a5cff]" /></div><p className="text-xs font-bold tracking-[0.18em] text-[#7727ff]">{tag as string}</p><h3 className="mt-5 text-xl font-bold">{title as string}</h3><p className="mt-3 text-sm leading-relaxed text-[#aaa6b5]">{text as string}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#d7d3de]">View case study <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span></a>
            })}
          </div>
          <a href="/projects/fintech-dashboard" className="mt-12 inline-flex items-center gap-2 rounded-lg bg-[#6417ed] px-8 py-4 text-sm font-bold transition-colors hover:bg-[#7727ff]">Explore Case Studies <ArrowUpRight size={17} /></a>
        </div>
      </section>

      <section className="border-y border-[#211d27] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div><p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9a5cff]">Our services</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Branding & Identity</h2><p className="mt-5 max-w-md text-[#aaa6b5]">We build strong brand identities that tell your story and leave a lasting impression.</p></div>
            <div className="flex gap-3"><button aria-label="Previous service" className="rounded-full border border-[#716d78] p-3 hover:border-[#f7f5ff]"><ArrowLeft size={20} /></button><button aria-label="Next service" className="rounded-full border border-[#716d78] p-3 hover:border-[#f7f5ff]"><ArrowRight size={20} /></button></div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {specialties.map(([title, text, Icon], index) => {
              const SpecialtyIcon = Icon as typeof Braces
              return <article key={title as string} className="flex min-h-72 flex-col justify-between rounded-2xl border border-[#7727ff] bg-[linear-gradient(145deg,#26104e,#6b14dc_55%,#db15dd)] p-7 shadow-[inset_0_1px_0_#ffffff22]"><div className="flex items-start justify-between"><SpecialtyIcon size={44} /><ArrowUpRight size={22} /></div><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#eadcff]">0{index + 1}</p><h3 className="text-2xl font-bold">{title as string}</h3><p className="mt-2 text-sm text-[#e7dcff]">{text as string}</p></div></article>
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-28 text-center">
        <Globe2 className="mx-auto text-[#7727ff]" size={36} />
        <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-black tracking-tight sm:text-6xl">Have an idea? Let&apos;s make it impossible to ignore.</h2>
        <p className="mx-auto mt-5 max-w-xl text-[#aaa6b5]">Tell us what you&apos;re building. We&apos;ll bring the strategy, design, development, and growth expertise.</p>
        <a href="/contact" className="mt-9 inline-flex items-center gap-2 rounded-lg bg-[#6417ed] px-8 py-4 font-bold hover:bg-[#7727ff]">Start a Project <ArrowUpRight size={19} /></a>
      </section>

    </main>
  )
}
