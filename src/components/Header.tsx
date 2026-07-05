import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span>Kurikulum Merdeka • Mindful, Meaningful, Joyful Learning</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 uppercase font-sans">
            PEMBUAT MODUL PEMBELAJARAN DEEP LEARNING
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">By. Admin Esstu</p>
        </div>

        <div className="flex items-center gap-3 text-right">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 block">System Status</span>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Ready to Generate
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

