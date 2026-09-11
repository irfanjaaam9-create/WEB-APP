import React from 'react';
import Link from 'next/link';
import { Cog, CheckCircle2, Send, Phone } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function BiomassPelletMachineryPage() {
  const whatsAppUrl = getWhatsAppLink('Hello Zahid, I want to inquire about Biomass Pellet Equipment from China.');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
          Industrial Machinery • Category 02
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          BIOMASS PELLET EQUIPMENT
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          High-efficiency biomass wood pellet mills, agricultural waste pelletizers, drying systems, and complete bio-fuel production lines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cog className="w-5 h-5 text-amber-400" />
            <span>Applications & Equipment Line</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Biomass pellet equipment converts sawdust, rice husk, straw, wood chips, and agricultural residue into renewable bio-energy heating pellets.
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Available Equipment:</div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Heavy Duty Ring Die Wood Pellet Mill</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Flat Die Biomass Pelletizer Machine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Rotary Drum Dryer & Wood Hammer Mill Units</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Pellet Counterflow Cooler & Packaging Machine</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-white">Technical Parameters & Specs</h2>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Line Capacity Range</div>
              <div className="text-slate-300">1 ton/hour to 10 tons/hour full production line</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Raw Material Moisture Requirement</div>
              <div className="text-slate-300">Strict 12% to 15% moisture content required before pelletizing</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Pellet Specs Produced</div>
              <div className="text-slate-300">6mm, 8mm, 10mm, 12mm high-density bio-energy pellets</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Discuss Your Biomass Equipment Requirement</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Tell us about your raw material input (sawdust, wood chips, straw) and target output capacity in tons/hour.
        </p>
        <div className="flex justify-center">
          <Link
            href="/contact?machinery=Biomass-Pellet"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Discuss My Machinery Requirement</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
