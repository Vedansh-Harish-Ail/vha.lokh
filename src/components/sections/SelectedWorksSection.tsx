import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye } from 'lucide-react';
import { SELECTED_WORKS } from '../../config/brand';
import { Project } from '../../types';
import { soundEngine } from '../ui/AudioHaptic';

interface SelectedWorksSectionProps {
  onSelectProject: (project: Project) => void;
  onSetCursorMode?: (mode: 'default' | 'project' | 'link') => void;
}

export const SelectedWorksSection: React.FC<SelectedWorksSectionProps> = ({
  onSelectProject,
  onSetCursorMode,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Creative Engineering', 'Interactive Systems', 'Editorial Luxury', 'Web Application'];

  const filteredProjects =
    activeFilter === 'All'
      ? SELECTED_WORKS
      : SELECTED_WORKS.filter((p) => p.category === activeFilter);

  return (
    <section id="works" className="relative py-24 md:py-36 bg-obsidian-deep hairline-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 hairline-b mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent-acid uppercase tracking-widest">
              // Section 03
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/60">
              Selected Works & Architectural Systems
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveFilter(cat);
                }}
                className={`px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  activeFilter === cat
                    ? 'bg-bone text-obsidian font-semibold'
                    : 'bg-obsidian hairline-border text-bone/60 hover:text-bone'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-bone">
            Selected Work
          </h2>
          <p className="mt-3 text-base md:text-lg text-bone/60 max-w-2xl">
            A curated index of production digital systems, experimental web applications, and editorial architectures engineered with zero compromise.
          </p>
        </div>

        {/* Project Grid: Asymmetric Architectural Compositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onMouseEnter={() => {
                soundEngine.playHover();
                if (onSetCursorMode) onSetCursorMode('project');
              }}
              onMouseLeave={() => {
                if (onSetCursorMode) onSetCursorMode('default');
              }}
              onClick={() => {
                soundEngine.playClick();
                onSelectProject(project);
              }}
              className="group cursor-pointer flex flex-col bg-obsidian-surface hairline-border hover:border-bone/40 transition-all duration-300 overflow-hidden"
            >
              {/* Visual Showcase Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-card">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Top overlay metadata badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-obsidian/90 backdrop-blur-sm px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-acid hairline-border">
                    {project.category}
                  </span>
                  <span className="bg-obsidian/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] text-bone/80 hairline-border">
                    {project.year}
                  </span>
                </div>

                {/* Hover Action Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-obsidian/40 backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 bg-bone text-obsidian px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-bold shadow-2xl">
                    <Eye className="h-4 w-4" />
                    <span>View Architecture Spec</span>
                  </div>
                </div>
              </div>

              {/* Project Card Footer / Info */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-bone group-hover:text-accent-acid transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-bone/40 group-hover:text-accent-acid group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <p className="mt-2 text-sm text-bone/70 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                <div className="pt-4 hairline-t flex flex-wrap items-center justify-between gap-3">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[10px] uppercase text-bone/50 bg-obsidian px-2 py-0.5 hairline-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="font-mono text-[10px] text-bone/30 px-1">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-wider text-bone/40 group-hover:text-bone transition-colors">
                    Spec Details →
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
