import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Check, Eye, X, ArrowUpRight, Smartphone, Monitor } from 'lucide-react';
import { PROJECTS } from '../../config/brand';
import { Project } from '../../types';

export const WorksShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cardDeviceMode, setCardDeviceMode] = useState<Record<string, 'desktop' | 'mobile'>>({});

  const categories = ['All', 'Small Business Website', 'B2B & Industrial Website', 'Wedding Portal & Card'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const toggleDevice = (id: string, mode: 'desktop' | 'mobile') => {
    setCardDeviceMode((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <section id="work" className="py-20 md:py-28 bg-white border-b border-slate-200">
      {/* Widen container: max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16 */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl space-y-3"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
              <span>Portfolio & Real Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Real Websites Built for Real Businesses
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Take a look at actual live websites we've engineered. Every project is built to make the client look professional, trustworthy, and easy to contact.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
            {categories.map((cat) => {
              const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-category-pill"
                      className="absolute inset-0 bg-slate-900 rounded-lg shadow-xs"
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span>{cat === 'All' ? 'All Projects' : cat.replace(' Website', 's')}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        isActive ? 'bg-slate-800 text-indigo-200' : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid Layout of Two Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const currentMode = cardDeviceMode[project.id] || 'desktop';
            const displayImage = currentMode === 'mobile' && project.mobileImage ? project.mobileImage : project.image;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: 'spring', damping: 24, stiffness: 220 }}
                className="bg-[#F8FAFC] border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Browser Mockup Image Preview */}
                  <div className="p-4 sm:p-6 pb-0">
                    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
                      {/* Browser Chrome Header */}
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-100 border-b border-slate-200 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-red-400" />
                          <span className="h-2 w-2 rounded-full bg-amber-400" />
                          <span className="h-2 w-2 rounded-full bg-green-400" />
                        </div>
                        <div className="rounded-md bg-white px-2.5 py-0.5 text-[11px] font-mono text-slate-600 border border-slate-200/80 max-w-[190px] truncate shadow-2xs flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="truncate">{project.liveUrl.replace('https://', '')}</span>
                        </div>

                        {/* Desktop / Mobile view toggle on each card */}
                        <div className="flex items-center gap-1 bg-slate-200/60 p-0.5 rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() => toggleDevice(project.id, 'desktop')}
                            title="Desktop View"
                            className={`p-1 rounded-md transition-colors ${
                              currentMode === 'desktop' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <Monitor className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleDevice(project.id, 'mobile')}
                            title="Mobile Phone View"
                            className={`p-1 rounded-md transition-colors ${
                              currentMode === 'mobile' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            <Smartphone className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Project Screenshot */}
                      <div className="relative group/shot overflow-hidden bg-slate-100 aspect-[16/10] flex items-center justify-center">
                        <img
                          src={displayImage}
                          alt={project.title}
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover/shot:scale-105 ${
                            currentMode === 'mobile' ? 'object-top' : 'object-center'
                          }`}
                          loading="lazy"
                        />

                        <div className="absolute inset-0 bg-slate-900/35 opacity-0 group-hover/shot:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-lg hover:bg-slate-50 transition-colors"
                          >
                            <span>Open Live Website</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">#{idx + 1}</span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-slate-500 line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="pt-1 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                        Delivered Highlights:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                        {project.whatWeDid.slice(0, 4).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5 truncate">
                            <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-6 pt-0 border-t border-slate-200/60 mt-4 flex items-center justify-between gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-600 transition-colors"
                  >
                    <span>Visit Live Website</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Read Overview</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Overview Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col z-10"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">{selectedProject.category}</span>
                  <h3 className="text-xl font-bold text-slate-900">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                />

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Project Purpose</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Key Features Included</h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {selectedProject.whatWeDid.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-600 transition-colors shadow-sm"
                >
                  <span>Open Live Site</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
