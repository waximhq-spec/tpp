"use client";

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import LatestProjects from '../components/LatestProjects';
import TimelineAndTestimonials from '../components/TimelineAndTestimonials';
import InquiryModal from '../components/InquiryModal';
import Footer from '../components/Footer';
import { RooftopType } from '../types';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<'home' | 'contact' | 'installations'>('home');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryData, setInquiryData] = useState<{
    district: string;
    bill: number;
    roofType: RooftopType;
    systemSize: number;
    subsidy: number;
    newBill: number;
  }>({
    district: 'Srinagar',
    bill: 3500,
    roofType: 'tin',
    systemSize: 3.5,
    subsidy: 78000,
    newBill: 350
  });

  useEffect(() => {
    const mockLeads = [
      {
        id: 'KSL-408921',
        name: 'Bashir Ahmed Lone',
        phone: '+91 94190 XXXXX',
        email: 'bashir@loneorchards.com',
        district: 'Srinagar',
        bill: 3800,
        roofType: 'tin',
        systemSize: 4.0,
        subsidy: 78000,
        address: 'Nishat, Srinagar'
      },
      {
        id: 'KSL-912048',
        name: 'Gulzar Ahmad Wani',
        phone: '+91 99066 XXXXX',
        email: 'gulzar.wani@gmail.com',
        district: 'Anantnag',
        bill: 2500,
        roofType: 'concrete',
        systemSize: 2.5,
        subsidy: 69000,
        address: 'Khanabal, Anantnag'
      }
    ];

    const currentLeads = localStorage.getItem('kashmir_solar_leads');
    if (!currentLeads) {
      localStorage.setItem('kashmir_solar_leads', JSON.stringify(mockLeads));
    }
  }, []);

  const handleOpenInquiry = (data: typeof inquiryData) => {
    setInquiryData(data);
    setIsInquiryOpen(true);
  };

  const handleOpenDefaultInquiry = () => {
    handleOpenInquiry({
      district: 'Srinagar',
      bill: 3500,
      roofType: 'tin',
      systemSize: 3.5,
      subsidy: 78000,
      newBill: 350
    });
  };

  return (
    <div className="bg-background text-on-background min-h-screen font-sans flex flex-col selection:bg-secondary/20 selection:text-on-secondary-container pb-16 md:pb-0">
      {/* Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenQuote={handleOpenDefaultInquiry}
      />

      <main className="flex-grow">
        <Hero onGoToCalculator={handleOpenDefaultInquiry} />
        <Stats />
        <LatestProjects />
        <TimelineAndTestimonials />
      </main>

      <Footer />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialData={inquiryData}
      />

      {/* Floating Call Button */}
      <a
        href="tel:+917889880188"
        className="fixed bottom-22 right-4 md:right-6 z-40 bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer border border-white/10"
        aria-label="Call us directly"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27 11.36 11.36 0 0 0 4.25 1.21 1 1 0 0 1 .91 1v3.5a1 1 0 0 1-1 1A16 16 0 0 1 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 .91 11.36 11.36 0 0 0 1.21 4.25 1 1 0 0 1-.27 1.11z" />
        </svg>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917889880188?text=Hi,%20I'm%20interested%20in%20solar%20rooftop%20installations%20for%20my%20property%20in%20Kashmir."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 md:right-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.463h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
