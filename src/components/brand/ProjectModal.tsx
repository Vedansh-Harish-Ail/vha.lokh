import React, { useEffect } from 'react';
import { X, ExternalLink, Code2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../../types';
import { soundEngine } from '../ui/AudioHaptic';
import { MagneticButton } from '../ui/MagneticButton';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenCommission: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenCommission,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-obsidian/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer content */}
      <div className="relative z-10 flex h-full w-full max-w-3xl flex-col bg-obsidian-surface hairline-l shadow-2xl overflow-y-auto">
        {/* Header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-bone/10 bg-obsidian-surface/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase text-accent-acid">
              Case Study Spec // {project.year}
            </span>
            <span className="text-bone/20">|</span>
            <span className="font-mono text-xs uppercase text-bone/50">{project.category}</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="flex h-9 w-9 items-center justify-center border border-bone/20 text-bone hover:border-accent-acid hover:text-accent-acid transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Title & Subtitle */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-bone uppercase">
              {project.title}
            </h2>
            <p className="mt-3 text-lg text-bone-muted font-normal leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Project Image */}
          <div className="relative overflow-hidden aspect-[16/9] hairline-border bg-obsidian-deep">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute bottom-3 left-3 bg-obsidian/90 px-3 py-1 font-mono text-[10px] uppercase text-bone/80 hairline-border">
              Context: {project.clientOrContext}
            </div>
          </div>

          {/* Metrics Callout */}
          {project.metrics && (
            <div className="p-4 bg-obsidian-card hairline-border border-l-4 border-l-accent-acid">
              <span className="font-mono text-[10px] uppercase tracking-wider text-accent-acid block">
                // System Metrics & Impact
              </span>
              <p className="mt-1 font-mono text-sm text-bone font-medium">
                {project.metrics}
              </p>
            </div>
          )}

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 bg-obsidian-card/50 hairline-border">
              <span className="font-mono text-xs uppercase tracking-wider text-bone/50 block mb-2">
                01. The Challenge
              </span>
              <p className="text-sm text-bone/80 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 bg-obsidian-card/50 hairline-border">
              <span className="font-mono text-xs uppercase tracking-wider text-accent-acid block mb-2">
                02. The Architecture & Solution
              </span>
              <p className="text-sm text-bone/80 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/50 block mb-3">
              Technology Architecture
            </span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 font-mono text-xs bg-obsidian hairline-border text-bone/90"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Deliverables */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-bone/50 block mb-3">
              Deliverables Engineered
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-bone/80">
                  <CheckCircle2 className="h-4 w-4 text-accent-acid shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 hairline-t flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-wider bg-bone text-obsidian hover:bg-accent-acid transition-colors"
                >
                  <span>Launch Live Work</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider hairline-border hover:border-bone text-bone/80 transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Source Repository</span>
                </a>
              )}
            </div>

            <MagneticButton
              variant="outline"
              onClick={() => {
                onClose();
                onOpenCommission();
              }}
              className="py-2.5 px-4 text-xs font-mono"
            >
              <span>Commission Similar System</span>
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
};

