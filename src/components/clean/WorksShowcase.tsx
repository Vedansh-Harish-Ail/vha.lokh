import React, { useState } from 'react';
import { ExternalLink, Check, Eye, X } from 'lucide-react';
import { PROJECTS } from '../../config/brand';
import { Project } from '../../types';

export const WorksShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-20 md:py-28 bg-white border-b border-stone-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700">
            <span>Portfolio & Real Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            Real Websites Built for Real Businesses
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Take a look at actual live websites we've engineered. Every project is built to make the client look professional, trustworthy, and easy to contact.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-16">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="bg-[#FAF9F5] border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
                {/* Browser Mockup Image Preview */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="rounded-xl overflow-hidden border border-stone-300 bg-white shadow-sm">
                    {/* Fake Browser Top Bar */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-stone-100 border-b border-stone-200 text-xs text-stone-500">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      </div>
                      <div className="rounded bg-white px-3 py-0.5 text-[11px] font-mono text-stone-500 border border-stone-200 max-w-[220px] truncate">
                        {project.liveUrl.replace('https://', '')}
                      </div>
                      <div className="w-10" />
                    </div>

                    {/* Screenshot */}
                    <div className="relative group overflow-hidden bg-stone-100 aspect-[16/10]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-stone-900 shadow-md hover:bg-stone-50 transition-colors"
                        >
                          <span>Visit Live Website</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Description Details */}
                <div className="lg:col-span-5 order-1 lg:order-2 space-y-5">
                  <div className="flex items-center gap-2.5">
                    <span className="rounded-md bg-brand-50 border border-brand-100 px-2.5 py-1 text-xs font-bold text-brand-800">
                      {project.category}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">#{idx + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-900">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-stone-500">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-800 block">
                      What We Delivered:
                    </span>
                    <ul className="grid grid-cols-1 gap-1.5 text-xs text-stone-600">
                      {project.whatWeDid.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-wrap gap-3 items-center">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Read Overview</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overview Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
              <div>
                <span className="text-xs font-bold text-brand-700 uppercase">{selectedProject.category}</span>
                <h3 className="text-xl font-bold text-stone-900">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-stone-500 hover:bg-stone-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full rounded-xl border border-stone-200 object-cover"
              />

              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-1">Project Purpose</h4>
                <p className="text-sm text-stone-600 leading-relaxed">{selectedProject.description}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-2">Key Features Included</h4>
                <ul className="space-y-1.5 text-xs text-stone-600">
                  {selectedProject.whatWeDid.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
              >
                Close
              </button>
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-5 py-2 text-xs font-semibold text-white hover:bg-brand-800"
              >
                <span>Open Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

