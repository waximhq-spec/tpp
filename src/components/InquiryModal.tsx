import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Send, ArrowRight } from 'lucide-react';
import { RooftopType } from '../types';
import { calculateSolarPotential } from '../constants';

const getBillRangeLabel = (billValue: number) => {
  if (billValue <= 2000) return 'Under ₹2,000';
  if (billValue <= 5000) return '₹2,000 - ₹5,000';
  if (billValue <= 8000) return '₹5,000 - ₹8,000';
  if (billValue <= 12000) return '₹8,000 - ₹12,000';
  return 'Above ₹12,000';
};

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: {
    district: string;
    bill: number;
    roofType: RooftopType;
    systemSize: number;
    subsidy: number;
    newBill: number;
  };
}

export default function InquiryModal({ isOpen, onClose, initialData }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bill: 3500,
    roofType: 'tin' as RooftopType,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      let initialBill = initialData?.bill || 3500;
      if (initialBill < 2000) {
        initialBill = 1500;
      } else if (initialBill >= 2000 && initialBill < 5000) {
        initialBill = 3500;
      } else if (initialBill >= 5000 && initialBill < 8000) {
        initialBill = 6500;
      } else if (initialBill >= 8000 && initialBill < 12000) {
        initialBill = 10000;
      } else {
        initialBill = 15000;
      }

      setFormData({
        name: '',
        phone: '',
        bill: initialBill,
        roofType: (initialData?.roofType as RooftopType) || 'tin',
        message: ''
      });
      setIsSuccess(false);
    }
  }, [isOpen, initialData]);

  const districtId = (initialData?.district || 'Srinagar').toLowerCase();
  const results = calculateSolarPotential(formData.bill, districtId, formData.roofType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const lead = {
      id: `KSL-${Math.floor(100000 + Math.random() * 900000)}`,
      name: formData.name,
      phone: formData.phone,
      district: initialData?.district || 'Srinagar',
      bill: formData.bill,
      roofType: formData.roofType,
      systemSize: results.estimatedSize,
      subsidy: results.subsidy,
      address: 'Modal Submission',
      message: formData.message,
      date: new Date().toISOString()
    };

    setTimeout(() => {
      const existingLeads = JSON.parse(localStorage.getItem('kashmir_solar_leads') || '[]');
      existingLeads.unshift(lead);
      localStorage.setItem('kashmir_solar_leads', JSON.stringify(existingLeads));
      
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger standard event to refresh log lists
      window.dispatchEvent(new Event('new_lead_submitted'));

      // Construct and open WhatsApp pre-filled message
      const text = `Hi, I have filled out the solar inquiry form on the website with the following details:
- *Name:* ${formData.name}
- *Phone:* ${formData.phone}
- *Monthly Bill:* ${getBillRangeLabel(formData.bill)}
- *Roof Type:* ${formData.roofType.toUpperCase()}
- *Message:* ${formData.message || 'None'}`;
      
      const whatsappUrl = `https://wa.me/919541831565?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="inquiry-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-slate-100 p-6 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <h3 className="text-lg font-bold text-primary tracking-tight">Send a Message</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Bashir Ahmed"
                        className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 94190 XXXXX"
                        className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label htmlFor="bill" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Bill: {getBillRangeLabel(formData.bill)}</label>
                      <select
                        id="bill"
                        value={formData.bill}
                        onChange={(e) => setFormData({ ...formData, bill: Number(e.target.value) })}
                        className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200 cursor-pointer"
                      >
                        <option value={1500}>Under ₹2,000</option>
                        <option value={3500}>₹2,000 - ₹5,000</option>
                        <option value={6500}>₹5,000 - ₹8,000</option>
                        <option value={10000}>₹8,000 - ₹12,000</option>
                        <option value={15000}>Above ₹12,000</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="roofType" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rooftop Roof Type</label>
                      <select
                        id="roofType"
                        value={formData.roofType}
                        onChange={(e) => setFormData({ ...formData, roofType: e.target.value as RooftopType })}
                        className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200 cursor-pointer"
                      >
                        <option value="tin">Tin Sheet Roof (Sloped)</option>
                        <option value="concrete">Concrete Flat Roof</option>
                        <option value="wooden">Wooden Roof (Sloped)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Message / Property Details</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your property roof size or specific energy requirements..."
                      className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting Lead...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <Send className="w-3.5 h-3.5 text-secondary" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="text-center py-8 space-y-5"
                >
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-accent border border-emerald-100">
                    <CheckCircle className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-primary">Inquiry Sent Successfully!</h3>
                    <p className="text-slate-500 text-xs max-w-sm mx-auto leading-relaxed">
                      Thank you, {formData.name}. Gulzar Ahmad Ganaie&apos;s MNRE certified engineering team will contact you within 24 hours to schedule your free site assessment.
                    </p>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-2xl max-w-sm mx-auto border border-primary/10 space-y-3">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Calculated Central Subsidy</p>
                    
                    <div className="flex justify-between items-center px-2">
                      <span className="text-xs text-slate-500">Estimated Target Size</span>
                      <span className="text-xs font-bold text-primary">{results.estimatedSize} kWp</span>
                    </div>
                    
                    <div className="flex justify-between items-center px-2">
                      <span className="text-xs text-slate-500">Pre-Approved Grant</span>
                      <span className="text-xs font-bold text-accent">
                        ₹{results.subsidy.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      onClose();
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Done / Back to Home</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
