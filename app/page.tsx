use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Factory,
  Gauge,
  HardHat,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
  Wrench,
  Zap
} from "lucide-react";

const services = [
  {
    title: "High-Pressure Hydro Jetting",
    tag: "150–1100 BAR",
    icon: Gauge,
    copy:
      "Precision cleaning for condensers, boilers, heat exchangers and critical industrial blockages.",
    points: [
      "150–400 bar light / medium cleaning",
      "600–800 bar heavy-duty descaling",
      "1000–1100 bar critical cleaning",
      "Condenser & evaporator jetting",
      "Boiler & superheater tube descaling",
      "Condenser oil-cooler de-chocking"
    ]
  },
  {
    title: "Chemical Cleaning",
    tag: "CONTROLLED PROCESS",
    icon: Sparkles,
    copy:
      "Controlled chemical cleaning and descaling for industrial systems, supported by defined safety procedures.",
    points: [
      "Industrial system chemical cleaning",
      "Descaling chemical supply",
      "Foam cleaning operations",
      "MSDS-led handling",
      "Neutralization & rinsing",
      "Activity-specific PPE controls"
    ]
  },
  {
    title: "Retubing & Repair",
    tag: "MECHANICAL",
    icon: Wrench,
    copy:
      "Tube replacement and expansion work for condensers, boilers and heat exchangers.",
    points: [
      "Tube insertion & replacement",
      "Torque-controlled expansion",
      "Leak testing",
      "Condenser retubing",
      "Boiler retubing",
      "Heat-exchanger retubing"
    ]
  },
  {
    title: "Testing & Inspection",
    tag: "VERIFICATION",
    icon: ShieldCheck,
    copy:
      "Testing services focused on pressure integrity and industrial equipment verification.",
    points: [
      "Hydro testing",
      "Leak testing",
      "Eddy Current Testing",
      "Helium testing",
      "Calibrated pressure gauges",
      "Documented test reports"
    ]
  },
  {
    title: "Industrial Maintenance",
    tag: "FIELD SUPPORT",
    icon: Factory,
    copy:
      "Practical maintenance support across mechanical, process and industrial environments.",
    points: [
      "Pump servicing",
      "Hose inspection",
      "Machine lubrication",
      "Radiator repair & cleaning",
      "Shutdown maintenance support",
      "General industrial maintenance"
    ]
  }
];

const industries = [
  "Thermal Power",
  "Steel",
  "Cement",
  "Paper",
  "Sugar",
  "Chemical",
  "Oil Pressing",
  "Textile & Synthetics"
];

const projects = [
  ["Tata Power Plant, Mauda", "Thermal plant maintenance & jetting"],
  ["Koradi Thermal Power Station", "Shutdown support & cleaning"],
  ["CSTPS, Chandrapur", "High-pressure operations"],
  ["Ambuja Cement, Chandrapur", "Heavy equipment descaling"],
  ["ACC Cement, Wadi", "Pipe maintenance & descaling"],
  ["JSW", "High-pressure jet cleaning & descaling"],
  ["BGPL Paper Mill", "Equipment cleaning"],
  ["Indorama Synthetics", "Process equipment maintenance"]
];

function SectionHeading({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [fallback, setFallback] = useState("");
  const [error, setError] = useState("");

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 100]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");
    setSubmitted(false);
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Submission failed");
      setFallback(data.fallbackWhatsAppUrl || "");
      setSubmitted(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Vidarbha Industrial Associates">
          <span className="brand-mark">VIA</span>
          <span>
            <b>VIDARBHA</b>
            <small>INDUSTRIAL ASSOCIATES</small>
          </span>
        </a>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? "nav-links open" : "nav-links"}>
          {["services", "capability", "projects", "safety", "contact"].map((x) => (
            <a key={x} href={`#${x}`} onClick={() => setOpen(false)}>
              {x}
            </a>
          ))}
          <a className="nav-cta" href="#quote" onClick={() => setOpen(false)}>
            Get a Quote <ArrowRight size={16} />
          </a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-grid" />
        <motion.div className="hero-glow" style={{ y: heroY }} />
        <div className="container hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="hero-copy"
          >
            <div className="eyebrow"><span /> INDUSTRIAL SERVICES • SINCE 1997</div>
            <h1>
              Built for the
              <em>pressure.</em>
              <br />
              Trusted for the job.
            </h1>
            <p>
              High-pressure hydro jetting, chemical cleaning, retubing, testing and
              industrial maintenance for demanding plants across India.
            </p>
            <div className="hero-actions">
              <a href="#quote" className="btn btn-primary">
                Request a Quote <ArrowRight size={18} />
              </a>
              <a href="#services" className="btn btn-ghost">Explore Services</a>
            </div>
            <div className="hero-trust">
              <div><strong>0–1100</strong><span>BAR CAPABILITY</span></div>
              <div><strong>9</strong><span>ADVANCED MACHINES</span></div>
              <div><strong>25+</strong><span>YEARS IN THE FIELD</span></div>
            </div>
          </motion.div>

          <motion.div
            className="hero-machine"
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="machine-orbit orbit-1" />
            <div className="machine-orbit orbit-2" />
            <div className="machine-core">
              <Gauge size={56} strokeWidth={1.3} />
              <span>1100</span>
              <small>BAR MAX</small>
            </div>
            <div className="machine-label label-a">HP JETTING</div>
            <div className="machine-label label-b">FIELD READY</div>
            <div className="machine-label label-c">SAFETY FIRST</div>
          </motion.div>
        </div>
        <a className="scroll-cue" href="#services"><span /> SCROLL TO EXPLORE <ChevronDown size={16} /></a>
      </section>

      <section className="ticker" aria-label="Industries served">
        <div className="ticker-track">
          {[...industries, ...industries].map((x, i) => <span key={i}>{x} <b>•</b></span>)}
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="01 / WHAT WE DO"
            title="Industrial work that doesn't leave room for guesswork."
            copy="A focused service portfolio backed by defined operating procedures, trained personnel and equipment built for demanding environments."
          />
          <div className="service-grid">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.article
                  className="service-card"
                  key={s.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="service-top">
                    <div className="icon-box"><Icon size={25} /></div>
                    <span>{s.tag}</span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                  <ul>
                    {s.points.map((p) => <li key={p}><CheckCircle2 size={15} />{p}</li>)}
                  </ul>
                  <a href="#quote">Discuss this job <ArrowRight size={15} /></a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="capability" className="dark-section">
        <div className="container capability">
          <div>
            <div className="eyebrow"><span /> TECHNICAL CAPABILITY</div>
            <h2>Pressure is a number.<br /><em>Control is a system.</em></h2>
            <p>
              VIA operates a fleet of 9 advanced machines covering pressure capability
              from 0 to 1100 bar, supported by specialized nozzles, flexible and rigid
              lances, foot-operated valves, protected control panels and glycerin-filled
              gauges.
            </p>
            <div className="cap-list">
              {[
                "Conventional & rotating tube-cleaning nozzles",
                "Flexible & rigid lances for difficult access",
                "Foot Operated Valves for operator control",
                "Overload & voltage-protected control panels",
                "Glycerin-filled pressure gauges"
              ].map(x => <div key={x}><Zap size={16} />{x}</div>)}
            </div>
          </div>
          <div className="pressure-card">
            <div className="pressure-ring"><span>1100</span><small>BAR</small></div>
            <div className="pressure-scale"><i /><i /><i /><i /><i /><i /></div>
            <p>MAXIMUM OPERATING CAPABILITY</p>
          </div>
        </div>
      </section>

      <section id="safety" className="section safety-section">
        <div className="container">
          <SectionHeading
            eyebrow="02 / SAFETY + QUALITY"
            title="Safety isn't a paragraph in the proposal. It's how the job runs."
            copy="The supplied VIA management material describes 11 SOPs integrated with ISO 9001:2015 and ISO 45001:2018 practices, covering execution, risk control, PPE, permits, calibration and emergency response."
          />
          <div className="safety-grid">
            {[
              ["01", "Two-man HP jetting", "Mandatory operating control for high-pressure jetting."],
              ["02", "No PPE = No work", "Activity-specific PPE and subcontractor compliance."],
              ["03", "Permit before risk", "Work permits for chemical cleaning, HP jetting, confined space and hot work."],
              ["04", "Measured & recorded", "Job reports, chemical registers and test reports support traceability."],
              ["05", "Calibrated equipment", "Testing and pressure gauges carry identification and calibration controls."],
              ["06", "Emergency response", "Defined response for hose failure, chemical splash, injury and fire."]
            ].map(([n, t, c]) => (
              <motion.div
                className="safety-card"
                key={n}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span>{n}</span><h3>{t}</h3><p>{c}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section projects-section">
        <div className="container">
          <SectionHeading
            eyebrow="03 / FIELD EXPERIENCE"
            title="Experience across the industries where downtime costs money."
            copy="Selected project and industry references from the supplied company profile."
          />
          <div className="project-grid">
            {projects.map(([name, desc], i) => (
              <motion.div
                className="project-card"
                key={name}
                initial={{ opacity: 0, x: i % 2 ? 25 : -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span>0{i + 1}</span>
                <div><h3>{name}</h3><p>{desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="industries-band">
        <div className="container">
          <div className="eyebrow"><span /> INDUSTRIES SERVED</div>
          <div className="industry-pills">{industries.map(x => <span key={x}>{x}</span>)}</div>
        </div>
      </section>

      <section id="quote" className="quote-section">
        <div className="container quote-wrap">
          <div className="quote-intro">
            <div className="eyebrow"><span /> 04 / START A PROJECT</div>
            <h2>Have a shutdown, cleaning job or tender?</h2>
            <p>
              Tell us what needs to be done. We’ll route your request to the VIA team.
              Name, phone, email and job details are required so the team can respond.
            </p>
            <div className="direct-contact">
              <a href="tel:+919422837904"><Phone size={17} /> +91 94228 37904</a>
              <a href="mailto:vidarbha.industrial.associates@gmail.com"><Mail size={17} /> Email VIA</a>
              <a href="https://wa.me/919422837904" target="_blank" rel="noreferrer"><Sparkles size={17} /> WhatsApp</a>
            </div>
          </div>

          <form className="quote-form" onSubmit={submit}>
            <div className="form-head"><span>QUOTE REQUEST</span><small>REFERRAL-READY</small></div>
            <div className="form-grid">
              <label>Name*<input name="name" required placeholder="Your full name" /></label>
              <label>Phone*<input name="phone" required placeholder="+91..." /></label>
              <label>Email*<input name="email" type="email" required placeholder="you@company.com" /></label>
              <label>Company<label className="sr-only">Company</label><input name="company" placeholder="Company / plant" /></label>
              <label>Work required*<select name="jobType" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(s => <option key={s.title}>{s.title}</option>)}<option>Other / Tender Enquiry</option></select></label>
              <label>Plant / Location<input name="location" placeholder="City / plant location" /></label>
              <label>Timeline<select name="timeline" defaultValue=""><option value="">Select timeline</option><option>Urgent / Shutdown</option><option>Within 7 days</option><option>Within 30 days</option><option>Planning stage</option></select></label>
              <label>Budget range<select name="budget" defaultValue=""><option value="">Prefer not to say</option><option>Under ₹1 lakh</option><option>₹1–5 lakh</option><option>₹5–25 lakh</option><option>₹25 lakh+</option><option>To be discussed</option></select></label>
            </div>
            <label>Requirement / tender details<textarea name="message" rows={5} placeholder="Equipment, scope, pressure requirement, shutdown date, tender reference, drawings, etc." /></label>
            <button className="btn btn-primary submit" disabled={sending}>
              {sending ? "Sending request..." : "Send Quote Request"} <ArrowRight size={18} />
            </button>
            {submitted && (
              <div className="success">
                <CheckCircle2 size={18} />
                Request saved successfully. Reference: <b>{fallback ? "generated" : "received"}</b>.
                {fallback && <a href={fallback}>Open WhatsApp fallback</a>}
              </div>
            )}
            {error && <div className="error">{error}</div>}
            <small className="privacy">Your information is used only to respond to this business enquiry.</small>
          </form>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#top">
              <span className="brand-mark">VIA</span>
              <span><b>VIDARBHA</b><small>INDUSTRIAL ASSOCIATES</small></span>
            </a>
            <p>Your satisfaction isn’t our goal — it’s our guarantee. We work until it’s done right.</p>
          </div>
          <div>
            <h4>HEAD OFFICE</h4>
            <p><MapPin size={15} /> Maya Decoration, Nr Durga Mandir,<br />Bye Pass Road, Bengali Camp,<br />Chandrapur – 442401, Maharashtra</p>
          </div>
          <div>
            <h4>CONTACT</h4>
            <p><Phone size={15} /> +91 94228 37904<br />+91 97702 15590</p>
            <p><Mail size={15} /> vidarbha.industrial.associates@gmail.com</p>
          </div>
          <div>
            <h4>BUSINESS</h4>
            <p>GST: 27AHTPM2150M1ZUGST</p>
            <p>Serving industries across India.</p>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>© {new Date().getFullYear()} Vidarbha Industrial Associates. All rights reserved.</span>
          <span>Chandrapur, Maharashtra • Since 1997</span>
        </div>
      </footer>
    </main>
  );
}