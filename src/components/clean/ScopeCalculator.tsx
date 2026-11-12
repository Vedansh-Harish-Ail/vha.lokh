import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Copy, Check, Sparkles, ArrowUpRight, Send } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

interface ScopeCalculatorProps {
  initialService?: string;
}

export const ScopeCalculator: React.FC<ScopeCalculatorProps> = ({ initialService }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || 'Small Business Website');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const services = [
    { id: 'small-business-website', label: 'Small Business Website' },
    { id: 'wedding-portal', label: 'Wedding Portal & Digital Cards' },
    { id: 'custom-solution', label: 'Custom Requirement' },
    { id: 'posters-marketing', label: 'Posters & Digital Marketing Collateral' },
    { id: 'digital-support', label: 'Digital Support & IT Consultation' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`vha.lokh Inquiry: ${selectedService} (${name || 'Client'})`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone/Contact: ${contactInfo}\nService: ${selectedService}\n\nProject Details:\n${message}\n\n--- Sent from vha.lokh website`
    );
    window.location.href = `mailto:${STUDIO_CONFIG.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(
      `Hi vha.lokh, I would like to discuss a project:\n\nService: ${selectedService}\nName: ${name || 'Prospective Client'}`
    );
    window.open(`https://wa.me/${STUDIO_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-10 md:py-14 bg-[#FBF9F4] text-[#1E1E1E] overflow-hidden border-b border-[#E9E4D8]">
      {/* Background Dot Matrix Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          backgroundImage: 'radial-gradient(#C8C2B3 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ================= LEFT COLUMN: Typography & Tactile Cards ================= */}
          <div className="lg:col-span-5 space-y-5">
            {/* Header / Sub-badge */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.14em] uppercase text-[#6E6B64]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]" />
                <span>START A PROJECT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-serif font-normal text-[#1A1A1A] leading-[1.14] tracking-tight">
                Let's talk about your project or digital need.
              </h2>
              <p className="text-xs sm:text-[13px] text-[#5C5952] leading-relaxed max-w-md pt-0.5">
                Whether you need a new responsive website for your business, an interactive wedding portal, marketing flyers, or IT assistance, reach out directly.
              </p>
            </div>

            {/* Tactile "Instant Dispatch" Card */}
            <div className="relative pt-2.5">
              <span className="absolute top-0 left-5 z-10 px-2.5 py-0.5 rounded bg-[#EDE8DC] border border-[#DDD6C5] text-[9.5px] font-medium tracking-wide text-[#59554C] shadow-2xs">
                "Instant Dispatch" Card
              </span>
              <div className="bg-[#FAF7F0] border border-[#E0D9C8] rounded-xl p-4 pt-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#E5EFE6] border border-[#BCD4BE] flex items-center justify-center text-[#1E4D2B] shrink-0">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1F1E1B]">Direct WhatsApp Chat</h4>
                    <p className="text-[11px] text-[#736F66]">Fastest response for estimates & questions.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#234E35] hover:bg-[#1A3D29] text-white font-medium py-2.5 text-xs tracking-wide shadow-xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>Chat with Us on WhatsApp</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Tactile "Copy & Write" Card */}
            <div className="relative pt-2.5">
              <span className="absolute top-0 left-5 z-10 px-2.5 py-0.5 rounded bg-[#EDE8DC] border border-[#DDD6C5] text-[9.5px] font-medium tracking-wide text-[#59554C] shadow-2xs">
                "Copy & Write" Card
              </span>
              <div className="bg-[#FAF7F0] border border-[#E0D9C8] rounded-xl p-3.5 pt-4.5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-full bg-[#EAE7DC] border border-[#DDD6C5] flex items-center justify-center text-[#55524A] shrink-0">
                    <Mail className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9.5px] font-bold tracking-wider uppercase text-[#8A857A]">
                      DIRECT EMAIL
                    </span>
                    <span className="block text-xs sm:text-[13px] font-semibold text-[#1F1E1B] truncate">
                      {STUDIO_CONFIG.email}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D5CEC0] bg-[#F3EFE6] hover:bg-[#EBE5D8] text-xs font-medium text-[#403E38] transition-all active:scale-95 shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#234E35]" />
                      <span className="text-[#234E35] font-semibold text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location Capsule */}
            <div className="flex items-center gap-2 text-[11px] text-[#6B675E] pt-0.5">
              <MapPin className="h-3.5 w-3.5 text-[#736F66] shrink-0" />
              <span>
                Independent Freelance Practice based in <strong className="text-[#1F1E1B] font-semibold">Mangaluru, India</strong> (2023 – Present).
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Warm Editorial Dossier Card ================= */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F0] rounded-2xl border border-[#DCD5C3] shadow-[0_8px_30px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.03)] overflow-hidden">
              
              {/* Card Header (compact) */}
              <div className="px-5 py-4 sm:px-6 sm:py-4.5 border-b border-[#EFE9DC]">
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#1A1A1A]">
                  <Sparkles className="h-4 w-4 text-[#1A1A1A]" />
                  <span>Send a Project Message</span>
                </div>
                <p className="text-[11px] text-[#736F66] mt-0.5">
                  Share a few details and we’ll respond within 24 hours.
                </p>
              </div>

              {/* Form Content (compacted padding & gaps) */}
              <div className="px-5 py-4 sm:px-6 sm:py-5">
                {submitted ? (
                  <div className="p-6 text-center space-y-2.5 rounded-xl bg-[#E8EFE8] border border-[#BCD4BE]">
                    <Check className="h-7 w-7 text-[#234E35] mx-auto" />
                    <h4 className="font-bold text-[#1F4129] text-sm">Inquiry Dispatched!</h4>
                    <p className="text-xs text-[#2A5237]">
                      Your mail client has been opened with your inquiry details. We will respond promptly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-xs font-semibold text-[#1F4129] underline hover:text-[#142C1B] cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4">
                    {/* 01. Name */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono tracking-wider uppercase font-semibold text-[#545149]">
                        01. YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul / Ananya"
                        className="w-full rounded-lg border border-[#D9D2BF] bg-[#FDFBF7] px-3.5 py-2 text-xs sm:text-sm font-sans italic text-[#1A1A1A] placeholder:text-[#9C9688] focus:outline-none focus:border-[#736F66] transition-colors shadow-2xs"
                      />
                    </div>

                    {/* 02. Contact */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono tracking-wider uppercase font-semibold text-[#545149]">
                        02. PHONE / WHATSAPP OR EMAIL
                      </label>
                      <input
                        type="text"
                        required
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="e.g. +91 98765 43210 or yourname@gmail.com"
                        className="w-full rounded-lg border border-[#D9D2BF] bg-[#FDFBF7] px-3.5 py-2 text-xs sm:text-sm font-sans italic text-[#1A1A1A] placeholder:text-[#9C9688] focus:outline-none focus:border-[#736F66] transition-colors shadow-2xs"
                      />
                    </div>

                    {/* 03. Service Selector Pills */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-wider uppercase font-semibold text-[#545149]">
                        03. SERVICE REQUIRED
                      </label>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {services.map((srv) => {
                          const isSelected = selectedService === srv.label;
                          return (
                            <button
                              key={srv.id}
                              type="button"
                              onClick={() => setSelectedService(srv.label)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-sans transition-all cursor-pointer ${
                                isSelected
                                  ? 'text-[#222] font-semibold border shadow-2xs'
                                  : 'bg-[#F2ECE0]/70 text-[#615D54] border border-[#DBD3C1] hover:bg-[#EAE3D4]'
                              }`}
                              style={isSelected ? { backgroundColor: '#E4DDD0', borderColor: '#B5AC97' } : undefined}
                            >
                              <span
                                className={`h-2.5 w-2.5 rounded-full flex items-center justify-center border text-[8px] ${
                                  isSelected
                                    ? 'border-[#2E2C28] text-[#2E2C28] bg-transparent font-bold'
                                    : 'border-[#948F83] text-transparent'
                                }`}
                              >
                                {isSelected ? '✓' : ''}
                              </span>
                              <span>{srv.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 04. Ruled Project Overview Area */}
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono tracking-wider uppercase font-semibold text-[#545149]">
                        04. PROJECT OVERVIEW OR QUESTIONS
                      </label>
                      <div className="relative rounded-lg border border-[#D9D2BF] bg-[#FDFBF7] overflow-hidden shadow-2xs">
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Describe your requirements, any reference links, or target deadlines..."
                          className="w-full p-3 text-xs sm:text-sm font-sans italic text-[#1A1A1A] placeholder:text-[#9C9688] focus:outline-none resize-none bg-transparent"
                          style={{
                            lineHeight: '24px',
                            backgroundImage:
                              'repeating-linear-gradient(to bottom, transparent 0 23px, rgba(160, 150, 130, 0.22) 23px 24px)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Bottom Status & Dispatch Button Bar */}
                    <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-left w-full sm:w-auto">
                        <span className="block text-[9px] font-mono uppercase tracking-wider text-[#7A7569]">
                          Dossier Draft
                        </span>
                        <span className="text-[11px] sm:text-xs font-sans font-semibold text-[#2E2C28]">
                          [{selectedService}] <span className="font-normal text-[#57534B]">Ready for dispatch ✈</span>
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#2E2C28] hover:bg-[#1A1917] text-white px-5 py-2.5 text-xs font-semibold tracking-wide shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Seal & Dispatch Inquiry ↗</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
