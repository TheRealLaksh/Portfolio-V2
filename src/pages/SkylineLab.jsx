import React, { useEffect, useRef, useState } from 'react';
import ContributionSkyline from '../components/world/ContributionSkyline';
import contributions from '../data/contributions.json';

// Unlinked development page for the 3D world. Not part of the public navigation.
const themeVars = {
  '--color-background': '#0a0a0a',
  '--color-foreground': '#f5f5f5',
  '--color-border': '#262626',
  '--color-muted-foreground': '#a3a3a3',
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
      sceneRef.current?.set({ progress: p });
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
    <div ref={trackRef} className="relative w-full" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full">
        <ContributionSkyline bare data={contributions.days} sceneRef={sceneRef} progress={0} />
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
