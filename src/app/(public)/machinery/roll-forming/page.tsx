import React from 'react';
import Link from 'next/link';
import { Cog, CheckCircle2, Send } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function RollFormingMachineryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
          Industrial Machinery • Category 03
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          ROLL-FORMING MACHINES
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Precision cold roll forming equipment for metal roofing sheets, C/Z steel purlins, drywall studs, and structural steel profiles from Chinese manufacturers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cog className="w-5 h-5 text-amber-400" />
            <span>Applications & Line Overview</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Roll forming machines are essential for construction material suppliers, steel building contractors, and metal roof manufacturers.
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Available Machine Types:</div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Corrugated Roof Sheet Roll Forming Machine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>CZ Purlin Fast-Interchangeable Machine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Highway Guardrail Cold Roll Forming Line</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Shutter Door Frame & Decking Sheet Unit</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-white">Technical Parameters & Specs</h2>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Forming Speed</div>
              <div className="text-slate-300">10 to 25 meters/minute with PLC hydraulic flying cut</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Coil Material Specs</div>
              <div className="text-slate-300">0.3mm to 3.0mm thickness GI, GL, PPGI steel coils</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Control System</div>
              <div className="text-slate-300">Siemens / Mitsubishi PLC with Touch Screen interface</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Discuss Your Roll-Forming Requirement</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Send us your profile drawing, coil thickness, or target production speed.
        </p>
        <div className="flex justify-center">
          <Link
            href="/contact?machinery=Roll-Forming"
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
