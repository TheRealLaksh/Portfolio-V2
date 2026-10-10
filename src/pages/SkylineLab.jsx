import React, { useEffect, useRef, useState } from 'react';
import ContributionSkyline from '../components/world/ContributionSkyline';
import contributions from '../data/contributions.json';
import { milestones } from '../data/milestones';

// Unlinked development page for the 3D world. Not part of the public navigation.
const themeVars = {
  '--color-background': '#0a0a0a',
  '--color-foreground': '#f5f5f5',
  '--color-border': '#262626',
  '--color-muted-foreground': '#a3a3a3',
};

const DAY = 86400000;
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Week column of a date, using the same grid rule as the component: the grid ends on the
// last day of data and starts on the Sunday on or before the day 364 days earlier.
const utc = (s) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
const endMs = utc(contributions.days[contributions.days.length - 1].date);
let startMs = endMs - 364 * DAY;
startMs -= new Date(startMs).getUTCDay() * DAY;
const weekOf = (date) => (utc(date) - startMs) / DAY / 7;

// Only milestones inside the shown year can be pinned.
const stops = milestones
  .map((m, i) => ({ ...m, index: i, week: Math.floor(weekOf(m.date)) }))
  .filter((m) => utc(m.date) >= startMs && utc(m.date) <= endMs)
  .sort((a, b) => a.week - b.week);

// Camera path for the travel phase u in [0, 1]: stop on each milestone, then glide to the next.
const travel = (u) => {
  const n = stops.length;
  const x = Math.min(0.9999, Math.max(0, u)) * n;
  const k = Math.floor(x);
  const local = x - k;
  const dwell = 0.5;
  if (local < dwell || k === n - 1) return { week: stops[k].week + 0.5, active: stops[k].index };
  const t = smooth(dwell, 1, local);
  return { week: stops[k].week + 0.5 + (stops[k + 1].week - stops[k].week) * t, active: -1 };
};

// Scene preview: a tall scroll track with a sticky full-height stage. Scroll position
// maps to the morph progress, which is how the real film chapters will work.
const ScenePreview = () => {
  const trackRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      // One scroll track, three moves: the skyline rises, the camera drops in, then it
      // travels along the weeks from the oldest to the newest.
      const cam = travel((p - 0.45) / 0.55);
      sceneRef.current?.set({
        progress: smooth(0, 0.3, p),
        fly: smooth(0.25, 0.45, p),
        focusWeek: cam.week,
        activeMarker: p > 0.45 ? cam.active : -1,
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={trackRef} className="relative w-full" style={{ height: '700vh' }}>
      <div className="sticky top-0 h-screen w-full">
        <ContributionSkyline bare data={contributions.days} markers={milestones} sceneRef={sceneRef} progress={0} />
      </div>
    </div>
  );
};

const SkylineLab = () => {
  const sceneRef = useRef(null);
  const [driven, setDriven] = useState(false);
  const [progress, setProgress] = useState(0);

  const onSlide = (e) => {
    const v = Number(e.target.value) / 100;
    setProgress(v);
    setDriven(true);
    sceneRef.current?.set({ progress: v });
  };

  const onTimer = () => {
    setDriven(false);
    sceneRef.current?.set({ progress: undefined });
  };

  return (
    <main className="min-h-screen w-full px-4 py-24 sm:px-8" style={themeVars}>
      <div className="mx-auto flex w-full max-w-[980px] flex-col gap-6">
        <ContributionSkyline data={contributions.days} sceneRef={sceneRef} defaultView="2d" />
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300">
          <label className="flex min-w-0 flex-1 items-center gap-3">
            Scroll
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={Math.round(progress * 1000) / 10}
              onChange={onSlide}
              className="min-w-0 flex-1"
              aria-label="Scroll position"
            />
          </label>
          <button
            type="button"
            onClick={onTimer}
            className="rounded-md border border-neutral-700 px-3 py-1.5 hover:bg-neutral-800"
          >
            {driven ? 'Hand back to timer' : 'Timer mode'}
          </button>
        </div>
      </div>
      <ScenePreview />
    </main>
  );
};

export default SkylineLab;
