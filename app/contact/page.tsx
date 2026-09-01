'use client'

import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Mail, MapPin, Phone } from 'lucide-react'
import { FormEvent, useState } from 'react'

const projectTypes = ['Website', 'Custom software', 'Branding & UI/UX', 'Social media', 'Other']

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] font-sans text-[#f7f5ff] selection:bg-[#7727ff]">
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
        <a href="/" aria-label="DS Softwares home" className="text-xl font-black tracking-[-0.04em] sm:text-2xl"><span className="text-[#7727ff]">DS</span>Softwares<span className="text-[#7727ff]">.</span></a>
        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#aaa6b5] transition-colors hover:text-[#f7f5ff]"><ArrowLeft size={17} /> Back home</a>
      </header>

      <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-48 top-0 h-[560px] w-[560px] rounded-full bg-[#5014b8] opacity-30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#a77aff]">Start a project</p>
            <h1 className="mt-5 text-balance text-4xl font-black leading-[1.08] tracking-[-0.045em] min-[380px]:text-5xl sm:mt-6 sm:text-6xl">Tell us what you want to build.</h1>
            <p className="mt-7 max-w-lg text-pretty text-lg leading-relaxed text-[#c2becb]">Share the challenge, the idea, or the goal. We&apos;ll help you find the right way forward.</p>

            <div className="mt-12 flex flex-col gap-4">
              <a href="mailto:hello@dssoftwares.in" className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#514d57] bg-[#111013] p-4 transition-colors hover:border-[#7727ff] sm:gap-4 sm:p-5"><span className="flex size-11 items-center justify-center rounded-xl bg-[#6417ed]"><Mail size={20} /></span><span className="min-w-0"><span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#77727f]">Email</span><span className="mt-1 block break-all font-bold">hello@dssoftwares.in</span></span></a>
              <a href="tel:+919956688553" className="flex items-center gap-4 rounded-2xl border border-[#514d57] bg-[#111013] p-5 transition-colors hover:border-[#7727ff]"><span className="flex size-11 items-center justify-center rounded-xl bg-[#6417ed]"><Phone size={20} /></span><span><span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#77727f]">Phone</span><span className="mt-1 block font-bold">+91 99566 88553</span></span></a>
              <div className="flex items-center gap-4 rounded-2xl border border-[#514d57] bg-[#111013] p-5"><span className="flex size-11 items-center justify-center rounded-xl bg-[#6417ed]"><Clock3 size={20} /></span><span><span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#77727f]">Response time</span><span className="mt-1 block font-bold">Within one business day</span></span></div>
              <div className="flex items-center gap-4 rounded-2xl border border-[#514d57] bg-[#111013] p-5"><span className="flex size-11 items-center justify-center rounded-xl bg-[#6417ed]"><MapPin size={20} /></span><span><span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#77727f]">Location</span><span className="mt-1 block font-bold">Working with clients worldwide</span></span></div>
            </div>

            <div className="mt-10 border-l-2 border-[#7727ff] pl-5">
              <p className="text-sm font-bold">What happens next?</p>
              <p className="mt-2 text-sm leading-relaxed text-[#aaa6b5]">We&apos;ll review your brief, follow up with any questions, and arrange a focused discovery call.</p>
            </div>
          </div>

          <div className="min-w-0 rounded-3xl border border-[#514d57] bg-[#111013] p-4 min-[380px]:p-5 sm:p-9">
            {submitted ? (
              <div role="status" className="flex min-h-[620px] flex-col items-center justify-center text-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-[#6417ed]"><CheckCircle2 size={32} /></span>
                <h2 className="mt-7 text-3xl font-black tracking-tight">Your inquiry is ready.</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#aaa6b5]">This demo form doesn&apos;t send data yet. Please email your project details to <a className="font-bold text-[#a77aff] hover:text-[#f7f5ff]" href="mailto:hello@dssoftwares.in">hello@dssoftwares.in</a>.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-8 rounded-lg border border-[#716d78] px-6 py-3 text-sm font-bold hover:border-[#f7f5ff]">Create another inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-end min-[420px]:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a5cff]">Project inquiry</p><h2 className="mt-2 text-xl font-black min-[380px]:text-2xl">A few details to get started.</h2></div><span className="text-xs text-[#77727f]">All fields required</span></div>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm font-bold">Your name<input required name="name" autoComplete="name" className="rounded-xl border border-[#514d57] bg-[#09080b] px-4 py-3.5 text-base font-normal outline-none transition-colors placeholder:text-[#77727f] focus:border-[#9a5cff]" placeholder="Jane Smith" /></label>
                  <label className="flex flex-col gap-2 text-sm font-bold">Work email<input required type="email" name="email" autoComplete="email" className="rounded-xl border border-[#514d57] bg-[#09080b] px-4 py-3.5 text-base font-normal outline-none transition-colors placeholder:text-[#77727f] focus:border-[#9a5cff]" placeholder="jane@company.com" /></label>
                </div>
                <label className="mt-5 flex flex-col gap-2 text-sm font-bold">Company name<input required name="company" autoComplete="organization" className="rounded-xl border border-[#514d57] bg-[#09080b] px-4 py-3.5 text-base font-normal outline-none transition-colors placeholder:text-[#77727f] focus:border-[#9a5cff]" placeholder="Your company" /></label>
                <fieldset className="mt-6"><legend className="text-sm font-bold">What can we help with?</legend><div className="mt-3 flex flex-wrap gap-2">{projectTypes.map((type) => <label key={type} className="cursor-pointer"><input required type="radio" name="projectType" value={type} className="peer sr-only" /><span className="block rounded-full border border-[#514d57] px-4 py-2.5 text-sm font-medium text-[#aaa6b5] transition-colors peer-checked:border-[#9a5cff] peer-checked:bg-[#6417ed] peer-checked:text-[#f7f5ff]">{type}</span></label>)}</div></fieldset>
                <label className="mt-6 flex flex-col gap-2 text-sm font-bold">Estimated budget<select required name="budget" defaultValue="" className="rounded-xl border border-[#514d57] bg-[#09080b] px-4 py-3.5 text-base font-normal outline-none transition-colors focus:border-[#9a5cff]"><option value="" disabled>Select a range</option><option>$2,000–$5,000</option><option>$5,000–$15,000</option><option>$15,000–$30,000</option><option>$30,000+</option><option>Not sure yet</option></select></label>
                <label className="mt-5 flex flex-col gap-2 text-sm font-bold">Tell us about your project<textarea required name="message" rows={5} className="resize-y rounded-xl border border-[#514d57] bg-[#09080b] px-4 py-3.5 text-base font-normal leading-relaxed outline-none transition-colors placeholder:text-[#77727f] focus:border-[#9a5cff]" placeholder="What are you building, who is it for, and what does success look like?" /></label>
                <button type="submit" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6417ed] px-7 py-4 text-sm font-bold transition-colors hover:bg-[#7727ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9a5cff]">Prepare inquiry <ArrowRight size={18} /></button>
                <p className="mt-4 text-center text-xs leading-relaxed text-[#77727f]">Demo form only. Your information is not transmitted or stored.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
