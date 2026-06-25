"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import InquiryModal from '../../components/InquiryModal';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Award, 
  ShieldCheck, 
  Zap, 
  Users, 
  Send, 
  CheckCircle,
  Building,
  ArrowRight
} from 'lucide-react';
import { RooftopType } from '../../types';

export default function ContactPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bill: 3500,
    roofType: 'tin' as RooftopType,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'bill' ? Number(value) : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calculate subsidy stats
    const systemSize = Number((formData.bill / 1000).toFixed(1));
    const subsidy = systemSize >= 3 ? 78000 : systemSize * 18000 + 18000;

    // Simulate lead capture
    const lead = {
      id: `KSL-${Math.floor(100000 + Math.random() * 900000)}`,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      district: 'Srinagar',
      bill: formData.bill,
      roofType: formData.roofType,
      systemSize,
      subsidy,
      address: 'Contact Page Submission',
      message: formData.message,
      date: new Date().toISOString()
    };

    setTimeout(() => {
      const existingLeads = JSON.parse(localStorage.getItem('kashmir_solar_leads') || '[]');
      existingLeads.unshift(lead);
      localStorage.setItem('kashmir_solar_leads', JSON.stringify(existingLeads));
      
      setIsSubmitting(false);
      setIsSuccess(true);

      // Construct and open WhatsApp pre-filled message
      const text = `Hi, I have filled out the solar inquiry form on the website with the following details:
- *Name:* ${formData.name}
- *Phone:* ${formData.phone}
- *Email:* ${formData.email}
- *Monthly Bill:* ₹${formData.bill.toLocaleString('en-IN')}
- *Roof Type:* ${formData.roofType.toUpperCase()}
- *Estimated System Size:* ${systemSize} kW
- *Estimated Subsidy:* ₹${subsidy.toLocaleString('en-IN')}
- *Message:* ${formData.message || 'None'}`;
      
      const whatsappUrl = `https://wa.me/917889880188?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  const handleOpenDefaultInquiry = () => {
    setIsInquiryOpen(true);
  };

  return (
    <div className="bg-[#fafbfa] text-on-background min-h-screen font-sans flex flex-col selection:bg-secondary/20 selection:text-on-secondary-container pb-16 md:pb-0">
      <Header
        currentTab="contact"
        onOpenQuote={handleOpenDefaultInquiry}
      />

      <main className="flex-grow py-12 md:py-20 px-4 md:px-10 max-w-7xl mx-auto w-full">
        {/* Page Title & Intro */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 max-w-fit mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">Official MNRE Vendor ID: JK-2024-SOLAR</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-primary tracking-tight leading-none">
            Get in Touch with our Solar Experts
          </h1>
          <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
            Have questions about solar installation, subsidy pre-approval, or grid integration? Contact our Srinagar office to consult with our certified team.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Official MNRE Verified Credentials Card & Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* MNRE Verification Card */}
            <div className="bg-white border border-slate-200/80 shadow-md rounded-2xl p-6 relative overflow-hidden">
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none" />

              {/* MNRE Banner Emblem Representation */}
              <div className="border-b border-slate-100 pb-5 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary shrink-0">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-extrabold text-slate-400 tracking-widest leading-none">Ministry of New &amp; Renewable Energy</p>
                    <p className="text-xs font-bold text-primary mt-1">Government of India Registered</p>
                  </div>
                </div>
              </div>

              {/* Vendor Information */}
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Registered Partner Name</span>
                  <h3 className="text-lg font-black text-primary leading-tight mt-0.5">GULZAR AHMAD GANAIE</h3>
                  <div className="inline-flex items-center gap-1 mt-1 bg-emerald-50 text-accent px-2 py-0.5 rounded text-[10px] font-semibold border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>MNRE Certified Vendor</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="pt-2">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Portal Rating</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-sm font-extrabold text-primary">5/5</span>
                    <span className="text-xs text-slate-400 font-medium">(327 Verified Reviews)</span>
                  </div>
                </div>

                {/* Credibility Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100/50">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Zap className="w-4 h-4 text-secondary" />
                      <span className="text-[9px] font-bold uppercase text-slate-500">Power Output</span>
                    </div>
                    <p className="text-xl font-extrabold text-primary tracking-tight leading-none">1,000 kW+</p>
                    <p className="text-[9px] text-slate-400 mt-1">Clean energy active</p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100/50">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-[9px] font-bold uppercase text-slate-500">Total Projects</span>
                    </div>
                    <p className="text-xl font-extrabold text-primary tracking-tight leading-none">240+</p>
                    <p className="text-[9px] text-slate-400 mt-1">Completed setups in J&K</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Methods */}
            <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Contact Details</h4>
              
              <div className="space-y-4">
                <a 
                  href="tel:+917889880188" 
                  className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50/50 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-primary transition-all shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-slate-400">Contact Number</p>
                    <p className="text-sm font-bold text-primary mt-0.5">+91 78898 80188</p>
                    <p className="text-[10px] text-slate-400">Tap to call our office directly</p>
                  </div>
                </a>

                <a 
                  href="mailto:tppkashmir@gmail.com" 
                  className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50/50 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-primary transition-all shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-slate-400">Email Address</p>
                    <p className="text-sm font-bold text-primary mt-0.5">tppkashmir@gmail.com</p>
                    <p className="text-[10px] text-slate-400">Send us a direct inquiry anytime</p>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-xl border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-slate-400">Office Address</p>
                    <p className="text-sm font-bold text-primary mt-0.5">Sanat Nagar, Srinagar, J&amp;K 190005</p>
                    <p className="text-[10px] text-slate-400">Open Mon - Sat (10:00 AM - 6:00 PM)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact/Quote Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/80 shadow-md rounded-2xl p-6 md:p-8">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleFormSubmit}
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
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Bashir Ahmed"
                          className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 94190 XXXXX"
                          className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@domain.com"
                        className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 placeholder-slate-400 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label htmlFor="bill" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Monthly Bill (₹): ₹{formData.bill.toLocaleString()}</label>
                        <select
                          id="bill"
                          name="bill"
                          value={formData.bill}
                          onChange={handleInputChange}
                          className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200"
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
                          name="roofType"
                          value={formData.roofType}
                          onChange={handleInputChange}
                          className="w-full bg-[#fafbfa] border border-slate-200 hover:border-slate-300 focus:border-primary focus:bg-white text-slate-800 text-xs rounded-xl px-4 py-3 focus:outline-none transition-all duration-200"
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
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
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
                        <span className="text-xs font-bold text-primary">{(formData.bill / 1000).toFixed(1)} kWp</span>
                      </div>
                      
                      <div className="flex justify-between items-center px-2">
                        <span className="text-xs text-slate-500">Pre-Approved Grant</span>
                        <span className="text-xs font-bold text-accent">
                          ₹{(formData.bill / 1000 >= 3 ? 78000 : (formData.bill / 1000) * 18000 + 18000).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Submit another inquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </main>

      <Footer />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialData={{
          district: 'Srinagar',
          bill: 3500,
          roofType: 'tin',
          systemSize: 3.5,
          subsidy: 78000,
          newBill: 350
        }}
      />
    </div>
  );
}
