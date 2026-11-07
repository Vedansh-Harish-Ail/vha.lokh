import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Calendar } from 'lucide-react';
import { STUDIO_CONFIG } from '../../config/brand';
import { soundEngine } from '../ui/AudioHaptic';
import { MagneticButton } from '../ui/MagneticButton';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedScope, setSelectedScope] = useState<string>('Brand Experience');
  const [userEmail, setUserEmail] = useState('');
  const [userNote, setUserNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const scopes = [
    'Brand Experience',
    'Creative Engineering',
    'Web Application',
    'Design System',
    'Advisory / Retainer'
  ];

  const handleCopyEmail = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(STUDIO_CONFIG.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmitBrief = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playClick();
    const subject = encodeURIComponent(`Studio Commission Inquiry: ${selectedScope}`);
    const body = encodeURIComponent(
      `From: ${userEmail}\nScope: ${selectedScope}\n\nProject Overview:\n${userNote}\n\n--- Sent via vha.lokh Brief Portal`
    );
    window.location.href = `mailto:${STUDIO_CONFIG.contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-obsidian hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center justify-between pb-8 hairline-b mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-acid uppercase tracking-widest">
              // Section 06
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/60">
              Initiate Collaboration
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-accent-acid">
            <span className="h-2 w-2 rounded-full bg-accent-acid animate-pulse" />
            <span>{STUDIO_CONFIG.status.availability}</span>
          </div>
        </div>

        {/* Asymmetric Contact Portal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Address & Studio Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-bone leading-none">
                Let’s Build Something Enduring.
              </h2>
              <p className="mt-4 text-base md:text-lg text-bone/70 leading-relaxed font-normal">
                We accept a limited number of commissions each quarter to preserve uncompromising craftsmanship.
              </p>
            </div>

            {/* Direct Email Clipboard Box */}
            <div className="p-6 bg-obsidian-surface hairline-border space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-bone/40 block">
                Direct Electronic Mail
              </span>

              <div className="flex items-center justify-between gap-4">
                <a
                  href={`mailto:${STUDIO_CONFIG.contact.email}`}
                  className="font-mono text-sm sm:text-base font-semibold text-bone hover:text-accent-acid transition-colors truncate"
                >
                  {STUDIO_CONFIG.contact.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs uppercase bg-obsidian hairline-border hover:border-bone text-bone/80 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-accent-acid" />
                      <span className="text-accent-acid">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Availability Spec */}
            <div className="p-6 bg-obsidian-card hairline-border space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 hairline-b text-bone/60">
                <span>COMMISSION STATUS</span>
                <span className="text-bone font-medium">{STUDIO_CONFIG.status.availability}</span>
              </div>
              <div className="flex items-center justify-between pb-2 hairline-b text-bone/60">
                <span>NEXT OPEN SLOT</span>
                <span className="text-accent-acid font-medium">{STUDIO_CONFIG.status.quarter}</span>
              </div>
              <div className="flex items-center justify-between text-bone/60">
                <span>STUDIO HUB</span>
                <span className="text-bone">{STUDIO_CONFIG.contact.locationCity}, {STUDIO_CONFIG.contact.country}</span>
              </div>
            </div>

            {/* Direct Instant Action Links */}
            <div className="flex flex-wrap gap-3 font-mono text-xs">
              {STUDIO_CONFIG.contact.calendly && (
                <a
                  href={STUDIO_CONFIG.contact.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-obsidian hairline-border text-bone hover:text-accent-acid hover:border-accent-acid transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5 text-accent-acid" />
                  <span>Schedule Architectural Diagnostic</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Studio Brief Form */}
          <div className="lg:col-span-7 bg-obsidian-surface hairline-border p-8 sm:p-10">
            <div className="mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-acid block">
                Direct Dispatch // Brief Transmitter
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-bone mt-1">
                Project Parameters
              </h3>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-12 w-12 bg-accent-acid/10 border border-accent-acid mx-auto flex items-center justify-center">
                  <Check className="h-6 w-6 text-accent-acid" />
                </div>
                <h4 className="font-display text-xl font-bold uppercase text-bone">
                  Brief Dispatched
                </h4>
                <p className="text-sm text-bone/60 max-w-md mx-auto">
                  Your mail client has been opened with your structured brief parameters. We review inquiries within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 font-mono text-xs uppercase text-accent-acid underline"
                >
                  Send another dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBrief} className="space-y-6">
                {/* Scope selector */}
                <div>
                  <label className="font-mono text-xs uppercase text-bone/60 block mb-2.5">
                    Select Scope of Engagement
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {scopes.map((scope) => (
                      <button
                        type="button"
                        key={scope}
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedScope(scope);
                        }}
                        className={`px-3 py-1.5 font-mono text-xs uppercase transition-colors hairline-border ${
                          selectedScope === scope
                            ? 'bg-bone text-obsidian font-bold'
                            : 'bg-obsidian text-bone/60 hover:text-bone'
                        }`}
                      >
                        {scope}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sender Email */}
                <div>
                  <label className="font-mono text-xs uppercase text-bone/60 block mb-2">
                    Your Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="name@organization.com"
                    className="w-full bg-obsidian hairline-border px-4 py-3 font-mono text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-accent-acid transition-colors"
                  />
                </div>

                {/* Brief Note */}
                <div>
                  <label className="font-mono text-xs uppercase text-bone/60 block mb-2">
                    Project Overview & Ambition
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="Describe your architectural ambition, timeline expectations, and core challenges..."
                    className="w-full bg-obsidian hairline-border p-4 font-sans text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-accent-acid transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <MagneticButton
                  type="submit"
                  variant="brutalist"
                  className="w-full py-4 text-sm font-mono font-bold"
                >
                  <span>Transmit Studio Brief</span>
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
