import React from 'react';
import Link from 'next/link';
import { Cog, CheckCircle2, Send, Phone, ShieldCheck } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/utils';

export default function PalletMakingMachineryPage() {
  const whatsAppUrl = getWhatsAppLink('Hello Zahid, I want to inquire about Pallet-Making Machinery lines from China.');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest">
          Industrial Machinery • Category 01
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          PALLET-MAKING MACHINERY
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Industrial wooden pallet production equipment, molded sawdust pallet presses, automated block machines, and wood recycling lines from verified Chinese manufacturers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cog className="w-5 h-5 text-amber-400" />
            <span>Applications & Line Overview</span>
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Pallet-making machinery is used across logistics, warehousing, export packaging, and timber recycling. We assist international buyers with technical quotation comparisons and manufacturer engineering discussions.
          </p>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Available Machine Types:</div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Molded Wood Pallet Press Machine (Sawdust/Wood Waste)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Wooden Pallet Automated Nailing Machine Line</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Hot Press Compressed Wood Pallet Block Machine</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Wood Crusher & Chipper Auxiliary Units</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
          <h2 className="text-xl font-bold text-white">Technical Parameters & Specs</h2>

          <div className="space-y-3 text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Production Capacity</div>
              <div className="text-slate-300">200 to 1,200 finished pallets / 8-hour shift</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Raw Material Inputs</div>
              <div className="text-slate-300">Raw timber, recycled wood waste, sawdust, wood shavings</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="font-bold text-amber-400">Utility Requirements</div>
              <div className="text-slate-300">380V / 50Hz 3-Phase power, thermal oil or electric heating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Discuss Your Pallet Machinery Requirement</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Share your required daily capacity, raw material availability, and finished pallet dimensions. We will discuss specs with manufacturer engineers in China.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/contact?machinery=Pallet-Making"
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Discuss My Machinery Requirement</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
