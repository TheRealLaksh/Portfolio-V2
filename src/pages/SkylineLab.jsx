import React from 'react';
import ContributionSkyline from '../components/world/ContributionSkyline';
import contributions from '../data/contributions.json';

// Unlinked development page for the 3D world. Not part of the public navigation.
const themeVars = {
  '--color-background': '#0a0a0a',
  '--color-foreground': '#f5f5f5',
  '--color-border': '#262626',
  '--color-muted-foreground': '#a3a3a3',
};

const SkylineLab = () => (
  <main className="min-h-screen w-full px-4 py-24 sm:px-8" style={themeVars}>
    <div className="mx-auto w-full max-w-[980px]">
      <ContributionSkyline data={contributions.days} />
    </div>
  </main>
);

export default SkylineLab;
