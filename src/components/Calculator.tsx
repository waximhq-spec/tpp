import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CheckCircle2, History, Trash2, ArrowRight, Sun, Leaf, Flame, Shield, HelpCircle, TrendingUp } from 'lucide-react';
import { KASHMIRI_DISTRICTS, ROOFTOP_TYPES, calculateSolarPotential } from '../constants';
import { RooftopType } from '../types';

interface CalculatorProps {
  onOpenInquiry: (data: {
    district: string;
    bill: number;
    roofType: RooftopType;
    systemSize: number;
    subsidy: number;
    newBill: number;
  }) => void;
}

export default function Calculator({ onOpenInquiry }: CalculatorProps) {
  const [district, setDistrict] = useState('srinagar');
  const [bill, setBill] = useState(3500);
  const [roofType, setRoofType] = useState<RooftopType>('tin');
  
  // Local list of submitted inquiries to display "Persistent community log"
  const [localSubmissionList, setLocalSubmissionList] = useState<any[]>([]);

  const fetchLeads = () => {
    const list = JSON.parse(localStorage.getItem('kashmir_solar_leads') || '[]');
    setLocalSubmissionList(list);
  };

  useEffect(() => {
    fetchLeads();
    window.addEventListener('new_lead_submitted', fetchLeads);
    return () => {
      window.removeEventListener('new_lead_submitted', fetchLeads);
    };
  }, []);

  const results = calculateSolarPotential(bill, district, roofType);
  const selectedDistrictName = KASHMIRI_DISTRICTS.find(d => d.id === district)?.name || 'Srinagar';

  // Fintech additional metrics
  const monthlySavings = Math.max(0, bill - results.newBill);
  const annualSavings = monthlySavings * 12;
  const lifetimeSavings = annualSavings * 25; // 25-year solar warranty lifespan
  
  // Dynamic Payback calculation
  const paybackYears = bill > 1000 ? Math.min(5.5, Math.max(3.2, (results.netInvestment / (annualSavings || 1)))).toFixed(1) : '4.5';
  
  // Tree offset equivalent (1 tree absorbs ~22kg of CO2 per year)
  const equivalentTrees = Math.round(results.co2Offset / 22);

  const clearHistory = () => {
    localStorage.removeItem('kashmir_solar_leads');
    setLocalSubmissionList([]);
  };

  return (
    <section id="solar-calculator" className="py-16 md:py-24 bg-[#fafbfa] relative overflow-hidden">
      {/* Background visual detail */}
      <div className="absolute top-1/4 right-0 -z-10 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Section Header */}
        <div className="mb-10 max-w-2xl">
          <p className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2">Savings Calculator</p>
          <h2 className="text-2xl md:text-4xl text-primary font-extrabold tracking-tight leading-tight">
            Estimate Your Savings &amp; Subsidy
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Adjust the slider to calculate your estimated rooftop capacity, approved grants, and payback timeframe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.015)] p-6 md:p-10 space-y-8">
            
            {/* Input 1: District Select */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block" htmlFor="district-select">
                Select Your Region
              </label>
              <div className="relative">
                <select
                  id="district-select"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full appearance-none bg-slate-50 hover:bg-slate-100/50 border border-slate-200/70 rounded-2xl px-5 py-4 font-bold text-primary outline-none focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer pr-12 text-sm duration-200"
                >
                  {KASHMIRI_DISTRICTS.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name} Valley (Peak Sun: {dist.sunHours} hours/day)
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Input 2: Interactive Bill Slider (Fintech style) */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block" htmlFor="monthly-bill-slider">
                  Average Monthly Electricity Bill
                </label>
                <div className="flex items-baseline gap-1 bg-primary/5 text-primary px-3 py-1.5 rounded-xl border border-primary/10">
                  <span className="text-xs font-bold">₹</span>
                  <span className="text-lg font-black tracking-tight">{bill.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 font-semibold ml-0.5">/mo</span>
                </div>
              </div>

              <div className="relative pt-2">
                <input
                  id="monthly-bill-slider"
                  type="range"
                  min="1000"
                  max="25000"
                  step="500"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold pt-2">
                  <span>₹1,000</span>
                  <span>₹10,000</span>
                  <span>₹18,000</span>
                  <span>₹25,000+</span>
                </div>
              </div>
            </div>

            {/* Input 3: Rooftop Structure */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Rooftop Structure Type
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ROOFTOP_TYPES.map((type) => {
                  const isChecked = roofType === type.id;
                  return (
                    <label key={type.id} className="cursor-pointer select-none">
                      <input
                        type="radio"
                        name="rooftop_choice"
                        checked={isChecked}
                        onChange={() => setRoofType(type.id as RooftopType)}
                        className="sr-only"
                      />
                      <div className={`h-full min-h-[130px] bg-slate-50 border rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 ${
                        isChecked 
                          ? 'border-primary bg-primary-fixed/15 ring-1 ring-primary shadow-sm' 
                          : 'border-slate-200/70 hover:bg-slate-100/50'
                      }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${isChecked ? 'bg-primary text-white scale-105' : 'bg-slate-200/50 text-slate-500'}`}>
                          {type.id === 'tin' && <span className="font-bold text-[10px]">TIN</span>}
                          {type.id === 'concrete' && <span className="font-bold text-[10px]">FLAT</span>}
                          {type.id === 'wooden' && <span className="font-bold text-[10px]">WOOD</span>}
                        </div>
                        <span className="font-extrabold text-xs text-primary">{type.name}</span>
                        <span className="text-[9px] text-slate-400 leading-tight">
                          {type.description.split('.')[0]}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Fintech Telemetry Output Card (5 cols) */}
          <div className="lg:col-span-5" id="solar-estimate-card">
            <div className="bg-primary text-white rounded-3xl shadow-xl p-6 md:p-8 space-y-6 relative overflow-hidden border border-primary-container">
              {/* Glow accent decoration */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

              {/* Estimate Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold">Estimated Potential</h3>
                  <p className="text-[9px] uppercase font-bold tracking-widest text-[#4CAF50] mt-0.5">PM Surya Ghar Portal</p>
                </div>
                <div className="bg-white/10 border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 backdrop-blur-xs">
                  <span>{selectedDistrictName}</span>
                </div>
              </div>

              {/* Main Financial Outputs */}
              <div className="space-y-4">
                
                {/* Metric 1: System Size */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                    <span className="block text-[9px] text-primary-fixed-dim uppercase font-bold tracking-wider">Required Size</span>
                    <span className="text-xl md:text-2xl font-black mt-1 block">
                      {results.estimatedSize} <span className="text-[10px] font-semibold text-primary-fixed-dim">kWp</span>
                    </span>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                    <span className="block text-[9px] text-primary-fixed-dim uppercase font-bold tracking-wider">Payback Time</span>
                    <span className="text-xl md:text-2xl font-black text-secondary mt-1 block flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 shrink-0 text-secondary" />
                      <span>{paybackYears} <span className="text-[10px] font-semibold">Yrs</span></span>
                    </span>
                  </div>
                </div>

                {/* Metric 2: Government Subsidy */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] text-primary-fixed-dim uppercase font-bold tracking-wider">Approved Government Grant</span>
                    <span className="text-2xl font-black text-[#4CAF50] mt-1 block">
                      ₹{results.subsidy.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-[#4CAF50]/15 text-[#4CAF50] border border-[#4CAF50]/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Pre-Approved</span>
                  </div>
                </div>

                {/* Metric 3: Financial savings telemetry */}
                <div className="border-t border-white/10 pt-4 space-y-3">
                  <div className="flex justify-between text-xs text-primary-fixed-dim">
                    <span>New Monthly Bill:</span>
                    <span className="font-extrabold text-white">₹{results.newBill}/mo</span>
                  </div>
                  <div className="flex justify-between text-xs text-primary-fixed-dim">
                    <span>Immediate Monthly Savings:</span>
                    <span className="font-extrabold text-[#4CAF50]">₹{monthlySavings.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <div className="flex justify-between text-xs text-primary-fixed-dim">
                    <span>Estimated 25-Yr Lifetime Savings:</span>
                    <span className="font-extrabold text-secondary">₹{lifetimeSavings.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Carbon offset visualization */}
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4CAF50]/10 text-[#4CAF50] flex items-center justify-center shrink-0">
                    <Leaf className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-primary-fixed-dim uppercase font-bold tracking-wider">Environmental Impact</p>
                    <p className="text-xs text-white mt-0.5 leading-snug">
                      Offset <strong>{results.co2Offset.toLocaleString()} kg</strong> of CO2 per year, equivalent to planting <strong>{equivalentTrees} trees</strong> annually.
                    </p>
                  </div>
                </div>

              </div>

              {/* Call to action */}
              <button
                onClick={() => onOpenInquiry({
                  district: selectedDistrictName,
                  bill,
                  roofType,
                  systemSize: results.estimatedSize,
                  subsidy: results.subsidy,
                  newBill: results.newBill
                })}
                id="apply-subsidy-btn"
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 group cursor-pointer duration-200"
              >
                <span>File Subsidy Application</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <p className="text-center text-[10px] text-primary-fixed-dim leading-relaxed">
                Applying reserves your central subsidy slot. Complete engineering inspection is 100% free with no commitment.
              </p>

            </div>
          </div>

        </div>

        {/* History Log registry */}
        <AnimatePresence>
          {localSubmissionList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-20 bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-3xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <History className="w-4.5 h-4.5 text-primary" />
                  <h3 className="font-extrabold text-xs text-slate-700 uppercase tracking-widest">Active Subsidy Applications Log</h3>
                </div>
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-500 hover:text-red-700 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear History</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {localSubmissionList.map((lead, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-3 right-3 bg-[#4CAF50]/15 text-[#4CAF50] text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                      Logged
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{lead.id || 'LEAD'}</p>
                      <p className="text-sm font-bold text-slate-800 mt-1">{lead.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{lead.district} valley region</p>
                    </div>
                    <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">System Size</p>
                        <p className="text-xs font-bold text-primary mt-0.5">{lead.systemSize} kWp</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Grant Secured</p>
                        <p className="text-xs font-bold text-secondary mt-0.5">₹{lead.subsidy.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
