import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Copy, Check, Send } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [selectedService, setSelectedService] = useState(initialService || 'Small Business Website');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(STUDIO_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`vha.lokh Inquiry: ${selectedService} (${name})`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone/Contact: ${contactInfo}\nService: ${selectedService}\n\nProject Details:\n${message}\n\n--- Sent from vha.lokh website`
    );
    window.location.href = `mailto:${STUDIO_CONFIG.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(STUDIO_CONFIG.whatsappMessage);
    window.open(`https://wa.me/${STUDIO_CONFIG.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encoded}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF9F5]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Outreach & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
                <span>Start a Project</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
                Let’s talk about your project or digital need.
              </h2>
              <p className="text-base text-stone-600 leading-relaxed font-normal">
                Whether you need a new responsive website for your business, an interactive wedding portal, marketing flyers, or IT assistance, reach out directly.
              </p>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">Direct WhatsApp Chat</h4>
                  <p className="text-xs text-stone-500">Fastest response for estimates & questions.</p>
                </div>
              </div>

              <button
                onClick={openWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 text-sm shadow-sm transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Us on WhatsApp</span>
              </button>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-500 uppercase">Direct Email</h4>
                  <p className="text-sm font-semibold text-stone-900 truncate">{STUDIO_CONFIG.email}</p>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <Check className="h-3 w-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="h-3 w-3" /> Copy
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Location Pill */}
            <div className="flex items-center gap-2.5 text-xs text-stone-600 font-medium">
              <MapPin className="h-4 w-4 text-brand-700 shrink-0" />
              <span>Independent Freelance Practice based in <strong>Mangalore, India</strong> (2023 – Present).</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-2">
              Send a Project Message
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Share a few details and we’ll respond within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <Check className="h-8 w-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900">Message Dispatched!</h4>
                <p className="text-xs text-emerald-800">
                  Your mail app has opened with your inquiry. We look forward to collaborating with you.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs font-semibold text-emerald-700 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul / Ananya"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Phone / WhatsApp Number or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="e.g. +91 98765 43210 or yourname@gmail.com"
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
                  >
                    <option value="Small Business Website">Small Business Website</option>
                    <option value="Wedding Portals & Cards">Wedding Portals & Cards</option>
                    <option value="Posters & Digital Marketing">Posters & Digital Marketing</option>
                    <option value="Digital Support & IT Services">Digital Support & IT Services</option>
                    <option value="Other / General Consultation">Other / General Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Project Overview or Questions
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your requirements, any reference links, or target deadlines..."
                    className="w-full rounded-xl border border-stone-300 p-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Inquiry & Get Quote</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
