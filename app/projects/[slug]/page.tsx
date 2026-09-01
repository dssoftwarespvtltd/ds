import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Bot, Check, Layers3, Quote, Sparkles } from 'lucide-react'
import { notFound } from 'next/navigation'

const projects = [
  {
    slug: 'fintech-dashboard',
    tag: 'FINTECH · PRODUCT DESIGN & DEVELOPMENT',
    client: 'Northstar Capital',
    title: 'A financial command center built for faster decisions.',
    summary: 'We transformed fragmented portfolio data into a focused, real-time dashboard used by investment teams every day.',
    description: 'Northstar Capital had outgrown spreadsheets and disconnected reporting tools. Their analysts needed one secure workspace that surfaced portfolio performance, transactions, risk, and client reporting without slowing down decision-making.',
    solution: 'DS Softwares designed and built a modular analytics platform with role-based views, live transaction monitoring, intelligent alerts, and an accessible reporting system. The new experience gives every team member the right depth of information without overwhelming them.',
    services: ['Product strategy', 'UX research', 'Dashboard design', 'Full-stack development', 'Data visualization', 'Cloud deployment'],
    metrics: [['62%', 'faster reporting'], ['3.4×', 'more active users'], ['99.98%', 'platform uptime']],
    quote: 'DS Softwares turned a complex operating problem into a product our team actually enjoys using.',
    person: 'Maya Chen, COO at Northstar Capital',
    accent: '#7727ff',
    icon: BarChart3,
    visualTitle: 'Portfolio overview',
    visualItems: [['Assets tracked', '$84.2M'], ['Monthly return', '+12.8%'], ['Risk score', 'Low']],
    liveUrl: 'https://example.com',
  },
  {
    slug: 'ecommerce-platform',
    tag: 'E-COMMERCE · GROWTH PLATFORM',
    client: 'Aster & Oak',
    title: 'A storefront engineered to convert attention into growth.',
    summary: 'A refined commerce experience, flexible content system, and high-speed checkout helped this lifestyle brand scale confidently.',
    description: 'Aster & Oak had a loyal audience, but its legacy storefront was slow, difficult to manage, and inconsistent across devices. New campaigns created traffic without producing the conversion growth the team expected.',
    solution: 'We rebuilt the customer journey around editorial discovery and frictionless purchasing. A reusable merchandising system lets the internal team launch campaigns quickly, while improved performance, search, and checkout make buying effortless.',
    services: ['Commerce strategy', 'Art direction', 'Responsive UX', 'Storefront development', 'CMS integration', 'Conversion optimization'],
    metrics: [['300%', 'conversion increase'], ['48%', 'faster page loads'], ['41%', 'higher order value']],
    quote: 'The new experience finally feels like our brand—and the commercial results exceeded every target.',
    person: 'Nora Bennett, Founder of Aster & Oak',
    accent: '#d815dc',
    icon: Layers3,
    visualTitle: 'Commerce performance',
    visualItems: [['Conversion', '8.4%'], ['Avg. order', '$186'], ['Returning', '64%']],
    liveUrl: 'https://example.com',
  },
  {
    slug: 'ai-support-tool',
    tag: 'ARTIFICIAL INTELLIGENCE · SAAS',
    client: 'Resolve AI',
    title: 'Customer support that gets smarter with every conversation.',
    summary: 'We created an AI-assisted support workspace that resolves routine requests and gives human teams sharper context.',
    description: 'Resolve AI wanted to reduce repetitive support work without losing the human quality its customers valued. Existing automation tools were rigid, difficult to audit, and disconnected from the team’s knowledge base.',
    solution: 'DS Softwares developed a transparent AI workflow that classifies requests, retrieves trusted answers, drafts responses, and routes sensitive cases to specialists. A clear review interface keeps agents in control while learning from accepted edits.',
    services: ['AI product strategy', 'Conversation design', 'UX/UI design', 'Application development', 'Knowledge retrieval', 'Analytics'],
    metrics: [['40%', 'fewer support tickets'], ['71%', 'faster first response'], ['92%', 'draft acceptance']],
    quote: 'We gained the speed of automation without giving up the judgment and empathy our customers expect.',
    person: 'Jon Bell, VP Customer Experience at Resolve AI',
    accent: '#9a5cff',
    icon: Bot,
    visualTitle: 'Support intelligence',
    visualItems: [['Resolved today', '1,284'], ['First response', '38 sec'], ['Satisfaction', '96%']],
    liveUrl: 'https://example.com',
  },
] as const

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) return { title: 'Project Not Found | DS Softwares' }
  return { title: `${project.client} Case Study | DS Softwares`, description: project.summary }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const projectIndex = projects.findIndex((item) => item.slug === slug)
  if (projectIndex === -1) notFound()

  const project = projects[projectIndex]
  const nextProject = projects[(projectIndex + 1) % projects.length]
  const Icon = project.icon

  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] font-sans text-[#f7f5ff] selection:bg-[#7727ff]">
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
        <a href="/" aria-label="DS Softwares home" className="text-xl font-black tracking-[-0.04em] sm:text-2xl"><span className="text-[#7727ff]">DS</span>Softwares<span className="text-[#7727ff]">.</span></a>
        <a href="/#work" className="inline-flex items-center gap-2 text-sm font-bold text-[#aaa6b5] transition-colors hover:text-[#f7f5ff]"><ArrowLeft size={17} /> All projects</a>
      </header>

      <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-96 w-3/4 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,#7727ff55,transparent_68%)] blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold tracking-[0.18em] text-[#9a5cff]">{project.tag}</p>
          <div className="mt-8 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="min-w-0 max-w-4xl"><p className="mb-4 text-base font-bold text-[#aaa6b5] sm:mb-5 sm:text-lg">{project.client}</p><h1 className="break-words text-balance text-4xl font-black leading-[1.08] tracking-[-0.045em] min-[380px]:text-5xl sm:text-6xl lg:text-7xl">{project.title}</h1></div>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#6417ed] px-7 py-4 text-sm font-bold hover:bg-[#7727ff] sm:w-fit">Visit project <ArrowUpRight size={18} /></a>
          </div>
          <p className="mt-10 max-w-3xl text-pretty text-lg leading-relaxed text-[#c2becb] sm:text-xl">{project.summary}</p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {project.metrics.map(([value, label]) => <article key={label} className="rounded-2xl border border-[#514d57] bg-[#111013] p-7"><strong className="text-4xl font-black" style={{ color: project.accent }}>{value}</strong><p className="mt-2 text-sm text-[#aaa6b5]">{label}</p></article>)}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a5cff]">The challenge</p><h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Complexity was getting in the way of growth.</h2></div>
          <p className="text-lg leading-relaxed text-[#aaa6b5]">{project.description}</p>
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a5cff]">Our solution</p><h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">One clear system, designed around real work.</h2></div>
          <p className="text-lg leading-relaxed text-[#aaa6b5]">{project.solution}</p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#514d57] bg-[#111013] p-6 sm:p-10">
          <div className="flex items-center justify-between border-b border-[#302c35] pb-7"><div><p className="text-xs font-bold tracking-[0.18em] text-[#9a5cff]">LIVE PRODUCT VIEW</p><h2 className="mt-2 text-2xl font-bold">{project.visualTitle}</h2></div><Icon size={34} style={{ color: project.accent }} /></div>
          <div className="mt-8 grid gap-5 md:grid-cols-[1.5fr_1fr]">
            <div className="min-h-64 rounded-2xl border border-[#514d57] bg-[linear-gradient(145deg,#17131d,#0b0910)] p-4 sm:min-h-80 sm:p-6"><div className="flex h-full flex-col justify-end rounded-xl p-4 sm:p-6" style={{ background: `linear-gradient(145deg, ${project.accent}22, ${project.accent}88)` }}><Sparkles size={30} /><p className="mt-5 max-w-md text-3xl font-black">A focused interface built around the decisions that matter.</p></div></div>
            <div className="flex flex-col gap-4">{project.visualItems.map(([label, value]) => <div key={label} className="flex flex-1 items-center justify-between rounded-2xl border border-[#514d57] bg-[#0b0a0d] p-6"><span className="text-sm text-[#aaa6b5]">{label}</span><strong className="text-2xl">{value}</strong></div>)}</div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a5cff]">Services delivered</p><h2 className="mt-5 text-4xl font-black tracking-tight">From first workshop to successful launch.</h2></div>
          <ul className="grid gap-3 sm:grid-cols-2">{project.services.map((service) => <li key={service} className="flex items-center gap-3 rounded-xl border border-[#514d57] bg-[#111013] p-4 text-sm font-bold"><span className="flex size-7 items-center justify-center rounded-full bg-[#6417ed]"><Check size={15} /></span>{service}</li>)}</ul>
        </div>
      </section>

      <section className="bg-[linear-gradient(110deg,#1f075c,#40109a)] px-6 py-24">
        <figure className="mx-auto max-w-4xl text-center"><Quote className="mx-auto text-[#b58cff]" size={40} /><blockquote className="mt-8 text-balance text-3xl font-black leading-tight sm:text-5xl">“{project.quote}”</blockquote><figcaption className="mt-7 text-[#d0c5e7]">{project.person}</figcaption></figure>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 rounded-3xl border border-[#514d57] bg-[#111013] p-8 sm:p-12 lg:flex-row lg:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9a5cff]">Next case study</p><h2 className="mt-4 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">{nextProject.title}</h2></div><a href={`/projects/${nextProject.slug}`} className="inline-flex shrink-0 items-center gap-3 rounded-lg bg-[#6417ed] px-7 py-4 text-sm font-bold hover:bg-[#7727ff]">View {nextProject.client} <ArrowRight size={18} /></a></div>
      </section>

    </main>
  )
}
