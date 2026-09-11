import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { FolderOpen, Globe } from 'lucide-react';

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{ paddingTop: '60px', background: '#f5f5f4', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4', padding: '48px 0 44px' }}>
        <div className="container-xl" style={{ maxWidth: '800px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1d4ed8', display: 'block', marginBottom: '12px' }}>
            Verified Procurement Work
          </span>
          <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1c1917', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '12px' }}>
            Projects & Sourcing Results
          </h1>
          <p style={{ fontSize: '15px', color: '#78716c', lineHeight: 1.65 }}>
            Real case studies showing how we assist international buyers with supplier research, quotation comparison, sample coordination, and machinery procurement.
          </p>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '48px 1.5rem' }}>
        {projects.length === 0 ? (
          <div style={{
            padding: '64px', textAlign: 'center', background: '#fff',
            border: '1px dashed #d6d3d1', borderRadius: '12px', maxWidth: '560px', margin: '0 auto',
          }}>
            <FolderOpen size={40} style={{ color: '#d6d3d1', margin: '0 auto 16px' }} />
            <h2 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', marginBottom: '6px' }}>Case Studies Being Updated</h2>
            <p style={{ fontSize: '13px', color: '#a8a29e' }}>Verified client procurement case studies will be displayed here.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
            {projects.map((proj) => (
              <div key={proj.id} style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <Globe size={10} />
                    {proj.clientCountry}
                  </span>
                  <span style={{ fontSize: '11px', color: '#a8a29e', fontWeight: 500 }}>{proj.productType}</span>
                </div>
                <h2 style={{ fontWeight: 700, fontSize: '15px', color: '#1c1917', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{proj.title}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '8px', padding: '12px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#a8a29e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Buyer Requirement</div>
                    <div style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.5 }}>{proj.buyerRequirement}</div>
                  </div>
                  {proj.workPerformed && (
                    <div style={{ background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '8px', padding: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Work Performed</div>
                      <div style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.5 }}>{proj.workPerformed}</div>
                    </div>
                  )}
                  {proj.result && (
                    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Result Delivered</div>
                      <div style={{ fontSize: '13px', color: '#15803d', fontWeight: 500, lineHeight: 1.5 }}>{proj.result}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
