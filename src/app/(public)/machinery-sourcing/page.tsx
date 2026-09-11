import React from 'react';
import Link from 'next/link';
import { Cog, ChevronRight, AlertTriangle, Send } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const revalidate = 60;

export default async function MachinerySourcingPage() {
  const machineryCategories = await prisma.machineryCategory.findMany({
    include: { machinery: true },
  });

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '48px 0 44px' }}>
        <div className="container-xl" style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#b45309', display: 'block', marginBottom: '12px' }}>
            Industrial Procurement Support
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
            China Machinery Sourcing & Equipment
          </h1>
          <p style={{ fontSize: '15px', color: '#78716c', lineHeight: 1.65, maxWidth: '600px' }}>
            Technical machinery procurement requires engineering clarification, output capacity verification, component matching, and direct manufacturer discussion in Mandarin.
          </p>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '56px 1.5rem' }}>

        {/* Categories Grid */}
        {machineryCategories.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {machineryCategories.map((mcat) => (
              <div key={mcat.id} style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    <Cog size={18} style={{ color: '#b45309' }} />
                  </div>
                  <h2 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', marginBottom: '8px', letterSpacing: '-0.01em' }}>{mcat.name}</h2>
                  <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.6, margin: 0 }}>{mcat.overview}</p>
                  {mcat.technicalSpecs && (
                    <div style={{ marginTop: '12px', background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '8px', padding: '12px 14px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Technical Summary</div>
                      <div style={{ fontSize: '12px', color: '#57534e', lineHeight: 1.5 }}>{mcat.technicalSpecs}</div>
                    </div>
                  )}
                </div>
                <Link
                  href={`/machinery/${mcat.slug}`}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#b45309', textDecoration: 'none' }}
                >
                  View Machinery Details
                  <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback when no DB data */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
            {[
              { title: 'Pallet-Making Machinery', slug: 'pallet-making', body: 'Wooden pallet nailing lines, molded sawdust block presses, and automated timber pallet manufacturing lines.' },
              { title: 'Biomass Pellet Equipment', slug: 'biomass-pellet', body: 'Ring die wood pellet mills, biomass pelletizers, wood chippers, and complete bio-fuel processing equipment.' },
              { title: 'Roll-Forming Machines', slug: 'roll-forming', body: 'Metal roof sheet roll forming machines, C/Z purlin interchangeable equipment, drywall stud forming lines.' },
            ].map((item) => (
              <div key={item.slug} style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
                <div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                    <Cog size={18} style={{ color: '#b45309' }} />
                  </div>
                  <h2 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', marginBottom: '8px', letterSpacing: '-0.01em' }}>{item.title}</h2>
                  <p style={{ fontSize: '13px', color: '#78716c', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                </div>
                <Link href={`/machinery/${item.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#b45309', textDecoration: 'none' }}>
                  View Specifications <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Technical Notice */}
        <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '20px 22px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '32px' }}>
          <AlertTriangle size={16} style={{ color: '#b45309', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: '13px', color: '#1c1917', marginBottom: '4px' }}>Manufacturer Technical Confirmation Policy</div>
            <p style={{ fontSize: '12px', color: '#78716c', lineHeight: 1.65, margin: 0 }}>
              Technical suitability, electrical voltage (380V 3-Phase vs 220V Single Phase), raw material input specs, hydraulic configuration, and production capacity must be confirmed directly with the machinery manufacturer before order execution.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#1c1917', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: '10px' }}>
            Discuss Your Machinery Requirement
          </h2>
          <p style={{ fontSize: '14px', color: '#a8a29e', maxWidth: '460px', margin: '0 auto 24px', lineHeight: 1.65 }}>
            Tell us what machinery you need, your required capacity, and site location. We'll guide you through technical options.
          </p>
          <Link href="/contact?machinery=industrial" className="btn btn-lg" style={{ background: '#d97706', color: '#fff', border: '1px solid #d97706' }}>
            <Send size={15} />
            Discuss Machinery Requirement
          </Link>
        </div>
      </div>
    </div>
  );
}
