import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Calendar, Phone, Mail, User, ShieldAlert, ArrowRight, Sun, Loader2 } from 'lucide-react';
import { RooftopType } from '../types';

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
    email: '',
    address: '',
    agreedToTerms: true,
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] // 2 days in future
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid Indian mobile number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API registration to Kashmir Solar Board
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Save lead payload locally to demonstrate persistent records
      const savedLeads = JSON.parse(localStorage.getItem('kashmir_solar_leads') || '[]');
      const newLead = {
        id: 'KSL-' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toISOString(),
        ...formData,
        ...initialData
      };
      savedLeads.unshift(newLead);
      localStorage.setItem('kashmir_solar_leads', JSON.stringify(savedLeads));

      // Trigger standard event to refresh log lists
      window.dispatchEvent(new Event('new_lead_submitted'));

      // Construct and open WhatsApp pre-filled message
      const text = `Hi, I have submitted my solar subsidy inquiry on the website with the following details:
- *Name:* ${formData.name}
- *Phone:* ${formData.phone}
- *Email:* ${formData.email}
- *Address:* ${formData.address || 'Not specified'}
- *Preferred Visit Date:* ${formData.preferredDate}
- *Estimated System Size:* ${initialData.systemSize} kW
- *Estimated Subsidy:* ₹${initialData.subsidy.toLocaleString('en-IN')}
- *Estimated Post-Solar Bill:* ₹${initialData.newBill}/month`;

      const whatsappUrl = `https://wa.me/917889880188?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }, 1500);
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
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto z-10 border border-slate-100 flex flex-col"
          >
            {/* Header banner */}
            <div className="bg-primary px-6 py-5 text-white relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
                id="close-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Sun className="w-5 h-5 text-secondary-container fill-secondary-container animate-pulse" />
                <span className="text-xs uppercase tracking-wider font-semibold text-secondary-container">Government Subsidy Application</span>
              </div>
              <h3 className="text-xl font-bold tracking-tight">Get Your Government Subsidy</h3>
              <p className="text-sm text-white/80 mt-1">Submit your details to schedule a free home mapping visit and get an exact quote.</p>
            </div>

            <div className="p-6 flex-grow">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="inquiry-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {/* Selected System details summary */}
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl flex justify-between items-center text-sm mb-2">
                      <div>
                        <p className="text-xs text-slate-500 font-semibold uppercase">Est. System Size</p>
                        <p className="text-lg font-bold text-primary">{initialData.systemSize} kW</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 font-semibold uppercase">Subsidy Amount</p>
                        <p className="text-lg font-bold text-secondary">₹{initialData.subsidy.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="text-right border-l pl-4 border-slate-200">
                        <p className="text-xs text-slate-500 font-semibold uppercase">Post-Solar Bill</p>
                        <p className="text-lg font-bold text-slate-800">₹{initialData.newBill}/mo</p>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="fullName">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Mohammad Abdullah"
                          className={`w-full bg-slate-50 border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-primary transition-colors`}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="phone">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 94190 XXXXX"
                            className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-primary transition-colors`}
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="email">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200'} rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-primary transition-colors`}
                          />
                        </div>
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="address">
                        Installation/Rooftop Address <span className="text-slate-400">(Optional)</span>
                      </label>
                      <textarea
                        id="address"
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g., Nigeen Lake Road, Near Hazratbal, Srinagar"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:bg-white focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1" htmlFor="preferredDate">
                        Preferred Free Site Visit Date
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                          id="preferredDate"
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    {/* Terms Checklist */}
                    <div className="flex items-start gap-2 pt-2">
                      <input
                        id="agree-checkbox"
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 text-primary bg-slate-50 border-slate-200 rounded focus:ring-primary"
                      />
                      <label htmlFor="agree-checkbox" className="text-xs text-slate-500 leading-snug cursor-pointer select-none">
                        I authorize The Power Planet to schedule a free rooftop assessment and consent to receive updates regarding my Central subsidy application.
                      </label>
                    </div>

                     {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.agreedToTerms}
                      id="submit-subsidy-btn"
                      className="w-full mt-4 bg-secondary hover:bg-secondary/95 text-white disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Book Free Consultation</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1.5 justify-center text-xs text-slate-400 pt-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Your details are safe with us. We are a Government approved partner.</span>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="text-center py-8 px-4 flex flex-col items-center"
                    id="modal-success-screen"
                  >
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4 ring-8 ring-emerald-50/50">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Feasibility Request Registered!</h4>
                    <p className="text-sm text-slate-600 mt-2 max-w-sm">
                      Congratulations, <span className="font-semibold text-slate-800">{formData.name}</span>! Your application for a <span className="font-semibold text-primary">{initialData.systemSize} kW solar system</span> has been queued.
                    </p>

                    <div className="my-6 bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-left text-xs max-w-sm w-full space-y-2">
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>Application ID:</span>
                        <span className="text-primary select-all">PPS-{Math.floor(200000 + Math.random() * 800000)}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>District Grid:</span>
                        <span>{initialData.district}</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Designated Subsidizer:</span>
                        <span>PM Surya Ghar Board J&K</span>
                      </div>
                      <div className="flex justify-between text-slate-800 font-medium border-t border-emerald-100 pt-2">
                        <span>Est. Subsidy Pre-Approved:</span>
                        <span className="text-secondary">₹{initialData.subsidy.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 mb-6">
                      A local Kashmir grid certified engineer will call you shortly at <span className="font-semibold text-slate-600">{formData.phone}</span> to confirm the free rooftop inspection on <span className="font-semibold">{formData.preferredDate}</span>.
                    </p>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: '',
                          phone: '',
                          email: '',
                          address: '',
                          agreedToTerms: true,
                          preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
                        });
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Done / Back to Calculator
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
