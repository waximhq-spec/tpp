"use client";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function InstallationsPage() {
  return (
    <div className="bg-background text-on-background min-h-screen font-sans flex flex-col selection:bg-secondary/20 selection:text-on-secondary-container pb-16 md:pb-0">
      <Header
        currentTab="installations"
        onOpenQuote={() => {}}
      />

      <main className="flex-grow py-24 px-4 md:px-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
          Completed Installations
        </h1>
        <p className="text-slate-500 text-sm mt-3">
          This page is under construction. Check back soon for detailed project case studies.
        </p>
      </main>

      <Footer />
    </div>
  );
}
