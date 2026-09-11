import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Search,
  Scale,
  PackageCheck,
  MessageSquare,
  Handshake,
  Truck,
  Cog,
  Building2,
  Globe,
  Phone,
  Send,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getWhatsAppLink } from '@/lib/utils';

export const revalidate = 60;

export default async function HomePage() {
  const whatsapp = getWhatsAppLink();

  const [servicePackages, productCategories, faqs] = await Promise.all([
    prisma.servicePackage.findMany({ orderBy: { orderIndex: 'asc' }, take: 3 }),
    prisma.productCategory.findMany({ take: 3 }),
    prisma.fAQ.findMany({ take: 4 }),
  ]);

  return (
    <div style={{ paddingTop: '60px' }}>

      {/* ═══════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)',
        borderBottom: '1px solid #e7e5e4',
        padding: '72px 0 80px',
      }}>
        <div className="container-xl" style={{ textAlign: 'center' }}>

          {/* Eyebrow */}
          <div style={{ marginBottom: '20px' }}>
            <span className="badge badge-blue">
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
              Based in China · Available for enquiries
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#1c1917',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            maxWidth: '820px',
            margin: '0 auto 20px',
          }}>
            Source Products From China With a Partner on the Ground.
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: '#78716c',
            maxWidth: '600px',
            margin: '0 auto 36px',
            lineHeight: 1.65,
            fontWeight: 400,
          }}>
            Source by Zahid helps international buyers research suppliers, compare quotations, coordinate samples, and communicate with Chinese factories — for products and industrial machinery.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '56px' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              <Send size={16} />
              Send Your Product Request
            </Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Visual Bridge Diagram */}
          <div style={{
            maxWidth: '720px', margin: '0 auto',
            background: '#fff', border: '1px solid #e7e5e4',
            borderRadius: '12px', padding: '24px 32px',
          }}>
            <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a8a29e', marginBottom: '20px' }}>
              Direct procurement channel
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Buyer */}
              <div style={{
                textAlign: 'center', padding: '14px 20px',
                background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '10px', minWidth: '130px',
              }}>
                <Globe size={20} style={{ color: '#78716c', margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#1c1917' }}>International Buyer</div>
                <div style={{ fontSize: '11px', color: '#a8a29e', marginTop: '2px' }}>AU · US · EU · PK</div>
              </div>

              <div style={{ color: '#d6d3d1', fontSize: '18px', fontWeight: 300 }}>→</div>

              {/* Source by Zahid */}
              <div style={{
                textAlign: 'center', padding: '14px 20px',
                background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', minWidth: '160px',
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: '#1d4ed8', margin: '0 auto 8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 800, fontSize: '14px',
                }}>Z</div>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e3a8a' }}>Source by Zahid</div>
                <div style={{ fontSize: '11px', color: '#3b82f6', marginTop: '2px' }}>Guangzhou & Yiwu, China</div>
              </div>

              <div style={{ color: '#d6d3d1', fontSize: '18px', fontWeight: 300 }}>→</div>

              {/* Factories */}
              <div style={{
                textAlign: 'center', padding: '14px 20px',
                background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '10px', minWidth: '130px',
              }}>
                <Building2 size={20} style={{ color: '#78716c', margin: '0 auto 6px' }} />
                <div style={{ fontWeight: 600, fontSize: '13px', color: '#1c1917' }}>Chinese Factories</div>
                <div style={{ fontSize: '11px', color: '#a8a29e', marginTop: '2px' }}>Direct Manufacturers</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e7e5e4' }}>
        <div className="container-xl">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0',
            textAlign: 'center',
          }}>
            {[
              { value: '7+', label: 'Years in China', sub: 'On-ground presence' },
              { value: '12+', label: 'Countries Served', sub: 'Global B2B buyers' },
              { value: '3', label: 'Machinery Lines', sub: 'Specialist sectors' },
              { value: '100%', label: 'Transparent Fees', sub: 'No hidden commissions' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '24px 16px',
                  borderRight: i < 3 ? '1px solid #e7e5e4' : 'none',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#1c1917', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#57534e', marginTop: '6px' }}>{stat.label}</div>
                <div style={{ fontSize: '11px', color: '#a8a29e', marginTop: '2px' }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS (4 STEPS)
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-eyebrow" style={{ marginBottom: '10px' }}>Simple Process</span>
            <h2 className="section-title" style={{ marginBottom: '12px' }}>
              How Sourcing With Zahid Works
            </h2>
            <p className="section-body" style={{ maxWidth: '520px', margin: '0 auto' }}>
              Four straightforward steps from your initial requirement to supplier options in your inbox.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: '#e7e5e4', border: '1px solid #e7e5e4', borderRadius: '12px', overflow: 'hidden' }}>
            {[
              { n: '01', title: 'Send Your Requirement', body: 'Share your product link, photo, target budget, quantity, or technical parameters — via the form or WhatsApp.' },
              { n: '02', title: 'We Research Suppliers', body: 'We contact Chinese factories in Mandarin to verify capabilities, unit prices, MOQs, and lead times.' },
              { n: '03', title: 'Receive Supplier Info', body: 'You receive structured supplier options, pricing breakdowns, and lead times — in plain English.' },
              { n: '04', title: 'You Decide Next Steps', body: 'Proceed with samples, a supplier call, negotiation, or order coordination — at your own pace.' },
            ].map((step, i) => (
              <div key={i} style={{ background: '#fff', padding: '28px 24px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '12px', color: '#1d4ed8', marginBottom: '14px',
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#1c1917', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.6, margin: 0 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES GRID
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: '#fafaf9', borderTop: '1px solid #e7e5e4', borderBottom: '1px solid #e7e5e4' }}>
        <div className="container-xl">
          <div style={{ marginBottom: '40px' }}>
            <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'block' }}>What We Do</span>
            <h2 className="section-title">How We Help International Buyers</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
            {[
              { icon: Search, title: 'Supplier Research', body: 'Identify Chinese manufacturers matching your specs, quality standards, and budget.' },
              { icon: Scale, title: 'Quotation Comparison', body: 'Compare direct factory prices, MOQs, lead times, and packaging fees across multiple suppliers.' },
              { icon: PackageCheck, title: 'Sample Coordination', body: 'Coordinate prototype samples, inspect locally, and organize consolidated dispatch.' },
              { icon: MessageSquare, title: 'Factory Communication', body: 'Bridge language barriers with fluent English-Mandarin communication with factory engineers.' },
              { icon: Handshake, title: 'Price Negotiation', body: 'Negotiate order volumes, unit pricing, payment terms, and custom packaging requirements.' },
              { icon: Truck, title: 'Order Coordination', body: 'Track production milestones, photo updates, and export shipping arrangements.' },
              { icon: Cog, title: 'Machinery Sourcing', body: 'Technical review and supplier comparison for industrial machinery lines. Specialist focus.' },
              { icon: Building2, title: 'Factory Visit Support', body: 'On-ground factory visits, facility photography, and full translation support in China.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="card card-hover" style={{ padding: '22px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: '#f5f5f4', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '14px',
                }}>
                  <Icon size={18} style={{ color: '#57534e' }} />
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '14px', color: '#1c1917', marginBottom: '6px', letterSpacing: '-0.01em' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.6, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRODUCT CATEGORIES
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0' }}>
        <div className="container-xl">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
            <div>
              <span className="section-eyebrow" style={{ marginBottom: '8px', display: 'block' }}>Product Catalog</span>
              <h2 className="section-title">Products & Machinery We Source</h2>
            </div>
            <Link
              href="/products"
              style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}
            >
              Browse full catalog <ChevronRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {productCategories.length > 0 ? productCategories.map((cat) => (
              <div key={cat.id} className="card card-hover" style={{ overflow: 'hidden' }}>
                {cat.featuredImage && (
                  <div style={{ height: '180px', background: '#f5f5f4', overflow: 'hidden' }}>
                    <img src={cat.featuredImage} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '15px', color: '#1c1917', marginBottom: '6px', letterSpacing: '-0.01em' }}>{cat.name}</h3>
                  <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.6, marginBottom: '14px' }}>{cat.description}</p>
                  <Link
                    href={`/products/${cat.slug}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}
                  >
                    Explore <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            )) : (
              /* Placeholder cards when no categories in DB yet */
              ['Bags & Luggage', 'Outdoor Products', 'Home & Hardware'].map((name) => (
                <div key={name} className="card" style={{ padding: '24px' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f5f5f4', borderRadius: '8px', marginBottom: '14px' }} />
                  <h3 style={{ fontWeight: 600, fontSize: '15px', color: '#1c1917', marginBottom: '6px' }}>{name}</h3>
                  <p style={{ fontSize: '13px', color: '#a8a29e', lineHeight: 1.6 }}>Factory-direct sourcing from verified Chinese manufacturers.</p>
                </div>
              ))
            )}
          </div>

          {/* Custom Item Callout */}
          <div style={{
            background: '#fafaf9', border: '1px solid #e7e5e4',
            borderRadius: '10px', padding: '20px 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px', color: '#1c1917', marginBottom: '4px' }}>
                Looking for something not listed?
              </div>
              <div style={{ fontSize: '13px', color: '#78716c' }}>
                We source custom items, specialty goods, and hardware across all categories.
              </div>
            </div>
            <Link href="/contact" className="btn btn-secondary btn-sm">
              Ask About Your Product
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          MACHINERY SECTION
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: '#fafaf9', borderTop: '1px solid #e7e5e4', borderBottom: '1px solid #e7e5e4' }}>
        <div className="container-xl">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
            <div style={{ maxWidth: '560px' }}>
              <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'block', color: '#b45309' }}>Industrial Machinery</span>
              <h2 className="section-title" style={{ marginBottom: '10px' }}>Machinery Sourcing & Equipment Projects</h2>
              <p className="section-body">
                Industrial machinery requires technical evaluation, component configuration, power utility matching, and direct factory engineering discussions.
              </p>
            </div>
            <Link href="/machinery-sourcing" className="btn btn-secondary" style={{ borderColor: '#fde68a', color: '#b45309', background: '#fffbeb', flexShrink: 0 }}>
              <Cog size={14} />
              Discuss Machinery Requirement
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {[
              {
                cat: '01',
                title: 'Pallet-Making Machinery',
                body: 'Wooden pallet nailing lines, molded sawdust block presses, and automated timber pallet manufacturing lines.',
                href: '/machinery/pallet-making',
              },
              {
                cat: '02',
                title: 'Biomass Pellet Equipment',
                body: 'Ring die wood pellet mills, biomass pelletizers, wood chippers, and complete bio-fuel processing equipment.',
                href: '/machinery/biomass-pellet',
              },
              {
                cat: '03',
                title: 'Roll-Forming Machines',
                body: 'Metal roof sheet roll forming machines, C/Z purlin interchangeable equipment, drywall stud forming lines.',
                href: '/machinery/roll-forming',
              },
            ].map((item) => (
              <div key={item.cat} className="card" style={{ padding: '22px', background: '#fff' }}>
                <span className="badge badge-amber" style={{ marginBottom: '14px', display: 'inline-flex' }}>
                  Category {item.cat}
                </span>
                <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#1c1917', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.6, marginBottom: '16px' }}>
                  {item.body}
                </p>
                <Link
                  href={item.href}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600, color: '#b45309', textDecoration: 'none' }}
                >
                  View Specifications <ChevronRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICE PACKAGES
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'block' }}>Transparent Pricing</span>
            <h2 className="section-title" style={{ marginBottom: '12px' }}>Service Packages & Fees</h2>
            <p className="section-body" style={{ maxWidth: '480px', margin: '0 auto' }}>
              Clear, fixed service fees. Scope and pricing confirmed before any work begins.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {servicePackages.length > 0 ? servicePackages.map((pkg) => {
              let features: string[] = [];
              try {
                features = typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features || [];
              } catch { features = []; }

              return (
                <div
                  key={pkg.id}
                  className="card"
                  style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
                >
                  {pkg.badge && (
                    <span className="badge badge-blue" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                      {pkg.badge}
                    </span>
                  )}
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 600, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                      {pkg.title}
                    </p>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#1c1917', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '18px' }}>
                      {pkg.priceSuffix || `US$${pkg.priceUsd}`}
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      {features.map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#57534e' }}>
                          <CheckCircle size={14} style={{ color: '#16a34a', flexShrink: 0, marginTop: '1px' }} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/contact?service=${encodeURIComponent(pkg.title)}`}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'center', width: '100%' }}
                  >
                    {pkg.ctaText}
                  </Link>
                </div>
              );
            }) : (
              /* Placeholder pricing cards */
              [
                { name: 'Starter Research', price: 'US$149', desc: 'Supplier research for one product', features: ['3–5 supplier options', 'Price comparison table', 'English report'] },
                { name: 'Full Sourcing', price: 'US$349', desc: 'End-to-end sourcing support', features: ['Supplier research', 'Sample coordination', 'Negotiation support', 'Order tracking'] },
                { name: 'Machinery Project', price: 'Custom', desc: 'Industrial machinery procurement', features: ['Technical evaluation', 'Factory visits', 'Mandarin negotiation', 'Install coordination'] },
              ].map((pkg) => (
                <div key={pkg.name} className="card" style={{ padding: '24px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{pkg.name}</p>
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#1c1917', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px' }}>{pkg.price}</div>
                  <p style={{ fontSize: '13px', color: '#78716c', marginBottom: '18px' }}>{pkg.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    {pkg.features.map((f) => (
                      <li key={f} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: '#57534e', alignItems: 'flex-start' }}>
                        <CheckCircle size={14} style={{ color: '#16a34a', flexShrink: 0, marginTop: '1px' }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn btn-secondary" style={{ justifyContent: 'center' }}>Get Started</Link>
                </div>
              ))
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/services/pricing"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}
            >
              View all service packages & custom project options <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TRUST / WHY ZAHID
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0', background: '#fafaf9', borderTop: '1px solid #e7e5e4', borderBottom: '1px solid #e7e5e4' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'block' }}>Why Work With Us</span>
            <h2 className="section-title">Practical On-Ground Support in China</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              {
                icon: Building2,
                title: 'Direct Presence in China',
                body: 'Based in China\'s industrial manufacturing hubs. Rapid, practical communication and local coordination without time-zone delays.',
              },
              {
                icon: MessageSquare,
                title: 'English-Mandarin Fluency',
                body: 'Your product specs and commercial terms translated fluently into factory technical discussions in Mandarin.',
              },
              {
                icon: ShieldCheck,
                title: 'Transparent Service Scope',
                body: 'No hidden commissions. No exaggerated promises. Clear fees and honest supplier research parameters from day one.',
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <div key={i} className="card" style={{ padding: '24px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: '#eff6ff', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', marginBottom: '16px',
                }}>
                  <Icon size={20} style={{ color: '#1d4ed8' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.65, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════ */}
      {faqs.length > 0 && (
        <section style={{ padding: '72px 0' }}>
          <div className="container-xl" style={{ maxWidth: '760px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'block' }}>Common Questions</span>
              <h2 className="section-title">Frequently Asked Questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {faqs.map((faq) => (
                <div key={faq.id} className="card" style={{ padding: '20px 22px' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '14px', color: '#1c1917', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.65, margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link href="/faq" style={{ fontSize: '13px', fontWeight: 600, color: '#1d4ed8', textDecoration: 'none' }}>
                View all frequently asked questions →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA BANNER
      ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: '#1c1917', padding: '72px 0' }}>
        <div className="container-xl" style={{ textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            maxWidth: '600px',
            margin: '0 auto 16px',
          }}>
            Ready to Source From China With Real On-Ground Support?
          </h2>
          <p style={{ fontSize: '15px', color: '#a8a29e', maxWidth: '480px', margin: '0 auto 36px', lineHeight: 1.65 }}>
            Tell us what you need. We review your requirement and confirm how we can help before requesting any payment.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              <Send size={16} />
              Send Your Product Request
            </Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-lg" style={{ background: '#292524', color: '#e7e5e4', border: '1px solid #44403c' }}>
              <Phone size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
