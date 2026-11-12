"use client";

import { useEffect, useRef, type CSSProperties } from "react";

export type FaqDrawerOptions = {
  /** Small caps line above the title. */
  label?: string;
  title?: string;
  lead?: string;
  /** The text on the drawer's label holder. */
  drawer?: string;
  /** How many cards, 3 to 7. */
  count?: number;
  /** Which card starts open: "1" to "7", or "none". */
  open?: "none" | "1" | "2" | "3" | "4" | "5" | "6" | "7";
  /** Opening one card closes the others. */
  single?: boolean;
  askNote?: string;
  askLabel?: string;
  /** http(s), mailto, tel or a path. Anything else falls back to the default. */
  askHref?: string;
  /** "auto" follows the page: prefers-color-scheme, a .dark ancestor, or a [data-finish] ancestor. */
  finish?: "auto" | "aluminium" | "graphite";
};

/** Dark when a .dark / [data-theme=dark] ancestor says so, light when .light says so, else the system's setting. */
const isDark = (host: Element, mq: MediaQueryList | null): boolean => {
  if (host.closest(".dark, [data-theme='dark']")) return true;
  if (host.closest(".light, [data-theme='light']")) return false;
  return !!mq?.matches;
};


/**
 * FAQ Index - TACTILE UI block, cut 4 (00.4).
 *
 * Questions about an agent-infrastructure product ("Lode") as a card-index
 * drawer: a slim recessed tray of warm-white index cards standing one behind
 * another, each question typed along a card's top edge with its subject on a
 * staggered tab. Open one and it is lifted out of the drawer and opens to
 * show the answer typed on the card's ruled face. The drawer's front plate
 * carries a label holder and a cup pull; after it, the "Ask us" key.
 *
 * Mechanism: native <details>/<summary> - one card is one disclosure, and
 * the cards share a `name` so only one opens at a time (optional). The card
 * lifts with a transform and a deeper shadow; its face opens by the
 * platform's own details-content transition (interpolate-size), so nothing
 * is measured and nothing runs at rest. Cards further back sit a shade darker
 * and a hair narrower, as they would a finger's depth into the drawer.
 *
 * Paper is paper in either finish; the drawer is aluminium or graphite. The
 * typing is Geist Mono (the card's own type, like a display's glyphs);
 * everything else is Instrument Sans.
 *
 * Accessibility: a section named by its h2; each question a summary (a
 * disclosure button with its expanded state), the answer its content;
 * keyboard: Tab to a card, Enter or Space to open or close. Reduced motion:
 * the card opens at once, lifted, with nothing in flight.
 */

/** The questions, written for this block. The product, its prices and its limits are invented. */
export type FaqCardItem = {
  id: string;
  tab: string;
  q: string;
  a: string;
};

export const DEFAULT_VHA_CARDS: readonly FaqCardItem[] = Object.freeze([
  Object.freeze({
    id: 'turnaround',
    tab: 'Timeline',
    q: 'How long does a website or wedding portal take to build?',
    a: 'Small business websites and interactive wedding portals take 4 to 7 business days from kickoff to live deployment. Standalone wedding cards, promotional posters, and emergency bug fixes can be delivered within 24 to 48 hours.',
  }),
  Object.freeze({
    id: 'pricing',
    tab: 'Pricing',
    q: 'What are your rates, and are there any hidden fees?',
    a: 'We offer upfront, transparent flat-rate pricing per project. No surprise recurring charges or lock-in contracts. You own 100% of your source code, domain, and web assets upon completion.',
  }),
  Object.freeze({
    id: 'wedding-portal',
    tab: 'Weddings',
    q: 'What is included in the Wedding Portal & Digital Card service?',
    a: 'You get a complete celebration portal featuring live online RSVP tracking, interactive ceremony countdowns, clickable Google Maps venue pins, and high-res photo archives, plus WhatsApp-ready digital invite cards.',
  }),
  Object.freeze({
    id: 'business-sites',
    tab: 'Websites',
    q: 'Can our website integrate 1-tap WhatsApp booking and Google Maps?',
    a: 'Yes, every business site we build is mobile-first and optimized for local customer conversions with instant WhatsApp booking, click-to-call, interactive Google Maps directions, and sub-2-second load times.',
  }),
  Object.freeze({
    id: 'posters-marketing',
    tab: 'Creative',
    q: 'Do you design standalone marketing flyers, posters, and invitations?',
    a: 'Yes. We design high-resolution promotional posters, festive discount banners, social media creatives (Instagram stories/posts), and digital invitations ready for WhatsApp sharing or commercial print.',
  }),
  Object.freeze({
    id: 'it-support',
    tab: 'IT Support',
    q: 'What digital support & IT services do you provide?',
    a: 'We handle custom domain registration (.com, .in), DNS records, SSL certification, cloud hosting setup (Vercel, AWS, Cloudflare), site speed optimization, and ongoing technical maintenance.',
  }),
  Object.freeze({
    id: 'getting-started',
    tab: 'Process',
    q: 'How do we get started and review drafts?',
    a: 'Message us directly on WhatsApp or email with your idea. We confirm scope and timeline, then share live interactive drafts for your feedback until you are completely satisfied before launch.',
  }),
]);

const CARDS = DEFAULT_VHA_CARDS;

const FINISHES: readonly string[] = Object.freeze(['auto', 'aluminium', 'graphite']);
const OPEN_AT = Object.freeze(['none', '1', '2', '3', '4', '5', '6', '7']);

const DEFAULTS: Required<FaqDrawerOptions> = Object.freeze({
  label: 'Questions',
  title: 'Asked before you sign.',
  lead: 'The questions every platform team asks in its first week, filed where you can find them. Pull a card to read it.',
  drawer: 'Lode · Q–Z',
  count: 7,
  open: '1',
  single: true,
  askNote: 'Not in the drawer? A person answers, usually within the hour.',
  askLabel: 'Ask us',
  askHref: 'mailto:hello@lode.example',
  finish: 'auto',
});

/** Tabs sit at three stations along the top edge, as a filing clerk staggers them. */
const TAB_STATIONS = Object.freeze([0.04, 0.37, 0.7]);
const tabStation = (i: any) => TAB_STATIONS[i % TAB_STATIONS.length];

/** How far into the drawer a card stands: 0 at the front, 1 at the back. */
const depthOf = (i: any, n: any) => (n <= 1 ? 0 : (n - 1 - i) / (n - 1));

/** The index printed on a card: Q.01, Q.02… */
const cardNumber = (i: any) => `Q.${String(i + 1).padStart(2, '0')}`;

/** A link the Ask key may carry: a page, a path, mail or a phone - never a script. */
const safeHref = (h: any, fallback = DEFAULTS.askHref) => {
  const s = String(h ?? '').trim();
  return /^(https?:\/\/|mailto:|tel:|\/|#|\.\/|\.\.\/)/i.test(s) ? s : fallback;
};

function normalise(opts: FaqDrawerOptions = {}, prev: Required<FaqDrawerOptions> = DEFAULTS): Required<FaqDrawerOptions> {
  const o: any = { ...prev, ...opts };
  for (const k of ['label', 'title', 'lead', 'drawer', 'askNote', 'askLabel']) o[k] = String(o[k] ?? '');
  o.askHref = safeHref(o.askHref);
  o.count = Math.min(CARDS.length, Math.max(3, Math.round(Number(o.count)) || DEFAULTS.count));
  o.open = OPEN_AT.includes(String(o.open)) ? String(o.open) : DEFAULTS.open;
  if (o.open !== 'none' && Number(o.open) > o.count) o.open = 'none';
  o.single = o.single !== false && o.single !== 'false';
  if (!FINISHES.includes(o.finish)) o.finish = 'auto';
  return o;
}

function resolveFinish(own: string, around: string | undefined, prefersDark: boolean, tone: string | undefined) {
  if (own === 'aluminium' || own === 'graphite') return own;
  if (around === 'aluminium' || around === 'graphite') return around;
  // Any other finish around it (another family's: porcelain, black) by its tone.
  if (tone === 'light' || tone === 'dark') return tone === 'dark' ? 'graphite' : 'aluminium';
  return prefersDark ? 'graphite' : 'aluminium';
}

const esc = (s: any) => String(s).replace(/[&<>"']/g, (c) => (({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }) as Record<string, string>)[c] as string);

let seq = 0;

/**
 * @param {HTMLElement} host
 * @param {object} opts see DEFAULTS
 * @returns {{ root: HTMLElement, update(opts: object): void, destroy(): void, open(i: number): void }}
 */
function mount(host: HTMLElement, opts: FaqDrawerOptions = {}) {
  let o = normalise(opts);
  const uid = `fq${(seq += 1)}`;
  const root = document.createElement('section');
  root.className = 'fq';
  root.dataset.block = 'faq-drawer';
  root.setAttribute('aria-labelledby', `${uid}-title`);
  host.append(root);

  const render = () => {
    const n = o.count;
    const cards = CARDS.slice(0, n).map((c, i) => `<details class="fq-card"${o.single ? ` name="${uid}"` : ''}${o.open === String(i + 1) ? ' open' : ''} style="--k: ${i}; --depth: ${depthOf(i, n).toFixed(3)}; --tab-at: ${tabStation(i)}">
      <summary class="fq-edge">
        <span class="fq-tab" aria-hidden="true">${esc(c.tab)}</span>
        <span class="fq-no" aria-hidden="true">${cardNumber(i)}</span>
        <span class="fq-q">${esc(c.q)}</span>
        <span class="fq-mark" aria-hidden="true"></span>
      </summary>
      <div class="fq-face"><p class="fq-a">${esc(c.a)}</p><p class="fq-filed" aria-hidden="true">Filed under ${esc(c.tab)} · ${cardNumber(i)}</p></div>
    </details>`).join('');
    root.innerHTML = `<div class="fq-wrap">
  <header class="fq-head">
    <p class="fq-label"></p>
    <h2 class="fq-title" id="${uid}-title"></h2>
    <p class="fq-lead"></p>
  </header>
  <div class="fq-cabinet">
    <div class="fq-drawer">
      <div class="fq-tray">${cards}</div>
      <div class="fq-front" aria-hidden="true">
        <span class="fq-holder"><span class="fq-holder-card"></span></span>
        <span class="fq-pull"></span>
      </div>
    </div>
    <div class="fq-ask">
      <p class="fq-note"></p>
      <a class="fq-key" href="${esc(o.askHref)}"></a>
    </div>
  </div>
</div>`;
    root.querySelector('.fq-label')!.textContent = o.label;
    root.querySelector('.fq-title')!.textContent = o.title;
    root.querySelector('.fq-lead')!.textContent = o.lead;
    root.querySelector('.fq-holder-card')!.textContent = o.drawer;
    root.querySelector('.fq-note')!.textContent = o.askNote;
    root.querySelector('.fq-key')!.textContent = o.askLabel;
  };

  const dark = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
  const applyFinish = () => {
    const f = resolveFinish(o.finish, (host.closest('[data-finish]') as HTMLElement | null)?.dataset.finish, isDark(host, dark), (host.closest('[data-tone="light"], [data-tone="dark"]') as HTMLElement | null)?.dataset.tone);
    if (root.dataset.finish !== f) root.dataset.finish = f;
  };
  const finishObs = new MutationObserver(applyFinish);
  finishObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-finish', 'class', 'data-theme'], subtree: true });
  dark?.addEventListener('change', applyFinish);

  render();
  applyFinish();

  return {
    root,
    /** Open card i (0-based), as a click would. */
    open(i: number) {
      const d = root.querySelectorAll('.fq-card')[i] as HTMLDetailsElement | undefined;
      if (d) d.open = true;
    },
    update(next = {}) {
      o = normalise(next, o);
      render();
      applyFinish();
    },
    destroy() {
      finishObs.disconnect();
      dark?.removeEventListener('change', applyFinish);
      root.remove();
    },
  };
}

export type FaqDrawerProps = FaqDrawerOptions & { className?: string; style?: CSSProperties };

/** An FAQ as a card-index drawer: each question typed along a card edge on a staggered tab, pull one to read it. */
export function FaqDrawer({ className, style, ...options }: FaqDrawerProps) {
  const host = useRef<HTMLDivElement>(null);
  const key = JSON.stringify(options);

  useEffect(() => {
    if (!host.current) return;
    const block = mount(host.current, JSON.parse(key) as FaqDrawerOptions);
    return () => block.destroy();
  }, [key]);

  return (
    <>
      <style>{CSS}</style>
      <div ref={host} className={className} style={{ width: "100%", ...style }} />
    </>
  );
}

export default FaqDrawer;

// Clean web font imports
const CSS = `/* FAQ Index - TACTILE UI block */
@import url("https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&family=Instrument+Sans:wght@400;700&display=swap");

/* ------------------------------------------------------------------ tokens */
.fq {
  color-scheme: light;
  --tui-desk: #F8FAFC;
  --tui-face: #f1f2f5;
  --tui-face-hi: #ffffff;
  --tui-face-lo: #e2e4e9;
  --tui-well: #e5e7eb;
  --tui-skirt: #cbd5e1;
  --tui-ink: #0f172a;
  --tui-ink-2: #64748b;
  --tui-rule: rgb(27 28 30 / 0.16);
  --tui-cap: #1e1f21;
  --tui-cap-hi: #2d2e31;
  --tui-cap-skirt: #070708;
  --tui-cap-ink: #efede8;
  --tui-cap-hl: rgb(255 255 255 / 0.14);
  --tui-hl: rgb(255 255 255 / 0.9);
  --tui-sh: 24 25 28;
  --tui-sh-a: 0.24;
  --tui-grain: 0.5;
  --tui-focus: #1b1c1e;
  --tui-ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  --tui-well-fill: linear-gradient(to bottom, color-mix(in oklab, var(--tui-well) 86%, rgb(var(--tui-sh))), var(--tui-well) 55%);
  --tui-raised:
    inset 0 1px 0 var(--tui-hl),
    0 0 0 1px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.35)),
    0 1px 1.5px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.2)),
    0 5px 12px -5px rgb(var(--tui-sh) / var(--tui-sh-a));
  --tui-inset:
    inset 0 3px 3px -2px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 2.6)),
    inset 0 9px 12px -9px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.8)),
    inset 0 0 0 1px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.45)),
    inset 0 -1px 0 color-mix(in oklab, var(--tui-hl) 60%, transparent),
    0 1px 0 var(--tui-hl),
    0 -1px 0 rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.35));
  --tui-pressed:
    inset 0 5px 5px -4px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 3)),
    inset 4px 0 4px -4px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.4)),
    inset -4px 0 4px -4px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.4)),
    0 -1px 0 rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.3)),
    0 1px 0 var(--tui-hl);
  --tui-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0.28 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

  /* Index-card stock and typewriter ribbon: the same in both finishes. */
  --fq-paper: #f3f0e7;
  --fq-type: #26251f;
  --fq-type-2: #5d5b53;
  --fq-rule: rgb(38 37 31 / 0.13);
  --fq-rule-2: rgb(38 37 31 / 0.34);
  --fq-fibre: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='3' seed='9' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .42 0 0 0 0 .35 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E");
  --fq-drop: rgb(24 25 28 / 0.3);
  --fq-sans: 'FQ Instrument Sans', 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
  --fq-type-face: 'FQ Geist Mono', 'Geist Mono', ui-monospace, monospace;

  position: relative;
  container: fq / inline-size;
  interpolate-size: allow-keywords;
  background: transparent;
  color: var(--tui-ink);
  font: 400 15px/1.55 var(--fq-sans);
  -webkit-font-smoothing: antialiased;
}
.fq[data-finish='graphite'] {
  color-scheme: dark;
  --tui-desk: #0e0f10;
  --tui-face: #1b1c1e;
  --tui-face-hi: #28292c;
  --tui-face-lo: #141516;
  --tui-well: #121315;
  --tui-skirt: #09090a;
  --tui-ink: #e8e6e1;
  --tui-ink-2: #a6a7a9;
  --tui-rule: rgb(232 230 225 / 0.11);
  --tui-cap: #e9e7e2;
  --tui-cap-hi: #f6f4ef;
  --tui-cap-skirt: #a8a7a3;
  --tui-cap-ink: #17181a;
  --tui-cap-hl: rgb(255 255 255 / 0.8);
  --tui-hl: rgb(255 255 255 / 0.11);
  --tui-well-fill: linear-gradient(to bottom, #070808, var(--tui-well) 45%, #17181a);
  --tui-sh: 0 0 0;
  --tui-sh-a: 0.55;
  --tui-grain: 0.35;
  --tui-focus: #e8e6e1;
  --fq-drop: rgb(0 0 0 / 0.55);
}
.fq *, .fq *::before, .fq *::after { box-sizing: border-box; }
.fq-head > *, .fq-card p, .fq-ask p { margin: 0; }

/* ------------------------------------------------------------------ layout */
.fq-wrap {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.35fr);
  gap: 40px clamp(40px, 6cqi, 104px);
  align-items: start;
  width: min(100% - 2 * clamp(20px, 5cqi, 64px), 1240px);
  margin-inline: auto;
  padding-block: clamp(56px, 8cqi, 120px);
}
/* The head stays in view while cards are pulled on a wide container. */
.fq-head { position: sticky; top: 24px; padding-top: 34px; }
.fq-head .fq-label {
  margin-bottom: 16px;
  font: 700 10.5px/1.2 var(--fq-sans);
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--tui-ink-2);
}
.fq-title {
  font: 700 clamp(32px, 4cqi, 52px)/1.02 var(--fq-sans);
  letter-spacing: -0.035em;
  text-wrap: balance;
}
.fq-head .fq-lead { margin-top: 20px; max-width: 36ch; font-size: clamp(15px, 1.3cqi, 17px); color: var(--tui-ink-2); text-wrap: pretty; }

/* ------------------------------------------------------------------ the drawer */
/* The drawer's box: its metal sides frame the tray the cards stand in. */
.fq-drawer {
  position: relative;
  isolation: isolate;
  padding: 12px 12px 0;
  border-radius: 14px;
  background: var(--tui-face);
  box-shadow: var(--tui-raised);
}
.fq-drawer::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: var(--tui-noise), linear-gradient(170deg, rgb(255 255 255 / 0.06), transparent 40%);
  opacity: var(--tui-grain);
  pointer-events: none;
}
/* The tray: a slim recess, dark under its back wall. */
.fq-tray {
  display: grid;
  padding: 40px 12px 16px;
  border-radius: 9px 9px 4px 4px;
  background: var(--tui-well-fill) var(--tui-well);
  box-shadow: var(--tui-inset);
}

/* ------------------------------------------------------------------ a card */
.fq-card {
  --shade: calc(var(--depth, 0) * 0.11);
  position: relative;
  margin-inline: calc(var(--depth, 0) * 5px);
  border-radius: 4px 4px 1px 1px;
  background:
    linear-gradient(rgb(40 36 26 / var(--shade)), rgb(40 36 26 / var(--shade))),
    var(--fq-fibre),
    var(--fq-paper);
  color: var(--fq-type);
  /* The card in front throws a shadow back onto the one behind; its top edge catches the lamp. */
  /* The top edge is the card's thickness catching the lamp: a bright line, a
     duller one under it. */
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.95),
    inset 0 2px 0 rgb(0 0 0 / 0.05),
    0 -1px 0 rgb(0 0 0 / 0.1),
    0 -7px 10px -5px var(--fq-drop);
  transition: transform 220ms var(--tui-ease), box-shadow 220ms var(--tui-ease);
}
.fq-card:first-child { box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.95), 0 -1px 0 rgb(0 0 0 / 0.08); }
/* A finger along the edges: the card under it rises a little, as cards do. */
.fq-card:not([open]):hover { transform: translateY(-3px); }
/* Pulled: out of the drawer, above the rest, its shadow deeper. The drawer
   makes room below it (margin) so its tab still clears the question behind. */
.fq-card[open] {
  z-index: 2;
  margin-top: 9px;
  transform: translateY(-12px);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.95),
    0 -5px 9px -5px var(--fq-drop),
    0 22px 30px -16px var(--fq-drop),
    0 2px 3px rgb(0 0 0 / 0.12);
}

/* The top edge: the tab, the index, the question typed along it. */
.fq-edge {
  display: grid;
  grid-template-columns: 5.2ch minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: 12px;
  padding: 16px 18px 22px;
  list-style: none;
  cursor: pointer;
  font: 400 15px/22px var(--fq-type-face);
  border-radius: inherit;
  -webkit-tap-highlight-color: transparent;
}
.fq-edge::-webkit-details-marker { display: none; }
.fq-edge::marker { content: ''; }
/* Focus is ringed in the ribbon's ink: the card is paper in either finish. */
.fq-edge:focus-visible { outline: 2px solid var(--fq-type); outline-offset: -5px; }
.fq-no { font-size: 11.5px; letter-spacing: 0.04em; color: var(--fq-type-2); }
.fq-q { text-wrap: pretty; }
.fq-mark { width: 12px; height: 12px; align-self: center; position: relative; }
.fq-mark::before, .fq-mark::after { content: ''; position: absolute; left: 1px; right: 1px; top: 5.25px; height: 1.5px; background: var(--fq-type-2); }
.fq-mark::after { transform: rotate(90deg); transition: transform 220ms var(--tui-ease); }
.fq-card[open] .fq-mark::after { transform: rotate(0deg); }

/* The tab stands up from the card's top edge at its station. */
.fq-tab {
  position: absolute;
  bottom: 100%;
  left: calc(var(--tab-at, 0) * 100%);
  height: 19px;
  padding: 3px 11px 0;
  border-radius: 5px 5px 0 0;
  background:
    linear-gradient(rgb(40 36 26 / var(--shade)), rgb(40 36 26 / var(--shade))),
    var(--fq-fibre),
    var(--fq-paper);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.95), 0 -4px 7px -4px var(--fq-drop);
  font: 400 10.5px/16px var(--fq-type-face);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--fq-type-2);
  white-space: nowrap;
  pointer-events: none;
}

/* The face: the answer typed on ruled stock, under a double heading rule. */
.fq-card::details-content {
  block-size: 0;
  overflow: clip;
  transition: block-size 320ms var(--tui-ease), content-visibility 320ms allow-discrete;
}
.fq-card[open]::details-content { block-size: auto; }
.fq-face {
  margin: -8px 18px 0;
  padding: 16px 0 22px calc(5.2ch + 12px);
  border-top: 3px double var(--fq-rule-2);
  font: 400 14px/26px var(--fq-type-face);
  background: repeating-linear-gradient(to bottom, transparent 0 25px, var(--fq-rule) 25px 26px) 0 20px / 100% calc(100% - 42px) no-repeat;
}
.fq-a { max-width: 60ch; }
.fq-filed { margin-top: 26px; font-size: 11px; letter-spacing: 0.06em; color: var(--fq-type-2); text-align: right; }

/* ------------------------------------------------------------------ the drawer front */
.fq-front {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 10px;
  margin: 0 -12px;
  padding: 16px 0 18px;
  border-radius: 0 0 14px 14px;
  background: linear-gradient(to bottom, color-mix(in oklab, var(--tui-face-hi) 70%, var(--tui-face)), var(--tui-face));
  box-shadow: inset 0 1px 0 var(--tui-hl), inset 0 2px 0 rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.6)), 0 -1px 0 rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.9));
}
/* A label holder: a pressed frame with a card slid into it. */
.fq-holder {
  display: block;
  padding: 3px;
  border-radius: 3px;
  background: linear-gradient(var(--tui-face-lo), var(--tui-face-hi));
  box-shadow: 0 0 0 1px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.2)), 0 1px 0 var(--tui-hl), inset 0 1px 1px rgb(0 0 0 / 0.25);
}
.fq-holder-card {
  display: block;
  min-width: 132px;
  padding: 3px 12px 2px;
  border-radius: 1px;
  background: var(--fq-fibre), var(--fq-paper);
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.25);
  font: 400 11px/16px var(--fq-type-face);
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  color: var(--fq-type);
}
/* A cup pull: a half-round recess the fingers go into. */
.fq-pull {
  display: block;
  width: 108px;
  height: 22px;
  border-radius: 3px 3px 54px 54px / 3px 3px 22px 22px;
  background: var(--tui-well-fill) var(--tui-well);
  box-shadow: var(--tui-inset);
}

/* ------------------------------------------------------------------ ask */
.fq-ask {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px 24px;
  margin-top: 28px;
  padding-inline: 4px;
}
.fq-note { font-size: 14.5px; color: var(--tui-ink-2); max-width: 44ch; }
/* The one contrast key on the section. */
.fq-key {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 22px;
  border-radius: 9px;
  font: 700 14px/1 var(--fq-sans);
  color: var(--tui-cap-ink);
  text-decoration: none;
  background:
    radial-gradient(120% 90% at 50% 0%, rgb(255 255 255 / 0.1), transparent 60%),
    linear-gradient(var(--tui-cap-hi), var(--tui-cap));
  box-shadow:
    inset 0 1px 0 var(--tui-cap-hl),
    0 3px 0 var(--tui-cap-skirt),
    0 4px 2px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.4)),
    0 9px 14px -6px rgb(var(--tui-sh) / var(--tui-sh-a));
  transition: transform 70ms var(--tui-ease), box-shadow 70ms var(--tui-ease);
}
.fq-key:active { transform: translateY(3px); box-shadow: var(--tui-pressed); }
.fq-key:focus-visible { outline: 2px solid var(--tui-focus); outline-offset: 3px; }

/* ------------------------------------------------------------------ re-composed by the width it is given */
@container fq (max-width: 959px) {
  .fq-wrap { grid-template-columns: minmax(0, 1fr); }
  .fq-head { position: static; padding-top: 0; max-width: 640px; }
}
@container fq (max-width: 559px) {
  .fq-drawer { padding: 8px 8px 0; }
  .fq-tray { padding: 34px 6px 12px; }
  .fq-card { margin-inline: calc(var(--depth, 0) * 3px); }
  .fq-edge { grid-template-columns: minmax(0, 1fr) auto; padding: 14px 14px 20px; font-size: 14px; line-height: 21px; }
  .fq-no { display: none; }
  .fq-tab { font-size: 9.5px; padding-inline: 8px; }
  .fq-face { margin-inline: 14px; padding-left: 0; font-size: 13.5px; }
  .fq-front { margin-inline: -8px; }
  .fq-ask { flex-direction: column; align-items: stretch; }
  .fq-key { justify-content: center; }
}

@media (prefers-reduced-motion: reduce) {
  .fq-card, .fq-mark::after, .fq-key, .fq-card::details-content { transition: none; }
  .fq-card:not([open]):hover { transform: none; }
}
`;
