<!-- ===================================================================================== -->
<!--                                   LAKSH PORTFOLIO — V2                                -->
<!-- ===================================================================================== -->

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=180&color=1a1a1a&text=Laksh%20Portfolio%20—%20Developer%20Edition&fontSize=42&fontColor=E50914&fontAlignY=35&desc=Crafted%20with%20Vite%2C%20React%2C%20Tailwind&descAlignY=53&descSize=18" />
</p>

<br>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-E50914?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Built%20With-React%20%7C%20Tailwind%20%7C%20Vite-black?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/github/last-commit/TheRealLaksh/laksh-portfolio?style=for-the-badge&color=E50914" />
  <img src="https://img.shields.io/github/repo-size/TheRealLaksh/laksh-portfolio?style=for-the-badge&color=red" />
</p>

<br><br>

<!-- ===================================================================================== -->
<!--                                DARK RED PULSE BANNER                                  -->
<!-- ===================================================================================== -->

<p align="center">
  <img src="https://img.shields.io/badge/Welcome%20to%20Laksh%27s%20Universe-Dark%20Red%20Pulse-E50914?style=for-the-badge&logo=netflix" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend%20Engineer-Developer%20Portfolio-E50914?style=flat-square" />
</p>

<br><br>

<!-- ===================================================================================== -->
<!--                                      OVERVIEW CARD                                    -->
<!-- ===================================================================================== -->

<div align="center">
<table><tr><td>

### 🚀 **Laksh Portfolio — V2 (Cinematic Developer Edition)**  
A fully modern, animated, interactive, and highly polished developer portfolio built using **React, Vite, Tailwind, and custom UI components**.

This project showcases a cinematic blend of performance, animation, and minimal design, featuring fluid scroll-triggered effects, dynamic text reveals, reusable hooks, and a modular architecture — all fine-tuned for a premium developer identity.

</td></tr></table>
</div>

<br><br>

<!-- ===================================================================================== -->
<!--                                      FEATURE CARDS                                    -->
<!-- ===================================================================================== -->

# 🔥 Features — Cinematic & Developer Focused

<div align="center">
<table>
<tr>

<td width="33%">

### 🎨 **Premium UI/UX**
- Dark theme with neon accents  
- Animated hero text  
- Soft parallax effects  
- Spotlight & reveal animations  
- Netflix-inspired polish  

</td>

<td width="33%">

### ⚛️ **Modular React Architecture**
- Component-based structure  
- Reusable animations  
- Global context management  
- Clean prop-driven sections  

</td>

<td width="33%">

### ⚡ **Custom Interaction Hooks**
- `useScrollSpy`  
- `useScramble`  
- `useGitHub`  
- `useSpotify`  
These power smooth animations & data fetching.

</td>

</tr>
</table>
</div>

<br>

<div align="center">
<table>
<tr>

<td width="33%">

### 📂 **Data-Driven Sections**
Dynamic rendering from:  
- `skillsData.js`  
- `sections.js`  
- `timelineData.js`

</td>

<td width="33%">

### 🎬 **UI Animation Suite**
Custom animations from:  
- `Reveal.jsx`  
- `Spotlight.jsx`  
- `TextReveal.jsx`  
- `Preloader.jsx`  
- `Parallax.jsx`

</td>

<td width="33%">

### 📱 **Fully Responsive**
- Tailwind grid scaling  
- Mobile navigation  
- Adaptive spacing & typography  

</td>

</tr>
</table>
</div>

<br><br>

<!-- ===================================================================================== -->
<!--                                 VISUAL PREVIEWS                                       -->
<!-- ===================================================================================== -->

# 🖼 Visual Previews

### 🧾 Resume Preview  
```
src/assets/resume/laksh.pradhwani.resume.pdf
```

### 🖼 Images  
```
src/assets/images/favicon.png
src/assets/images/laksh.pradhwani.webp
src/assets/images/react.svg
```

*(README does not embed them directly for performance—but paths are included for clarity.)*

<br><br>

<!-- ===================================================================================== -->
<!--                            COMPONENTS BREAKDOWN (BY CATEGORY)                         -->
<!-- ===================================================================================== -->

# 🧩 Components Overview

## 🏗 Layout Components  
```
src/components/layout/
│── Footer.jsx
│── Layout.jsx
│── Navbar.jsx
│── SocialSidebar.jsx
```

These govern global UI placement, navigation, and social link behavior.

---

## 🎬 Section Components  
```
src/components/sections/
│── Hero.jsx
│── About.jsx
│── Skills.jsx
│── Experience.jsx
│── Projects.jsx
│── Resume.jsx
│── Contact.jsx
```

Each handles a major structured area of the site with animations & data mapping.

---

## ✨ UI Components  
```
src/components/ui/
│── Parallax.jsx
│── Preloader.jsx
│── Reveal.jsx
│── Spotlight.jsx
│── TextReveal.jsx
```

These power your entire cinematic experience:  
Text scrambling, soft reveals, spotlight motion, scroll-based animations, animated loaders.

---

## 🧠 Data Files  
```
src/data/
│── skillsData.js
│── sections.js
│── timelineData.js
```

All skills, experiences, and timeline events are fully dynamic.

---

## 🪝 Hooks  
```
src/hooks/
│── useGitHub.js
│── useScramble.js
│── useScrollSpy.js
│── useSpotify.js
```

- **useGitHub** → fetch public repo stats  
- **useScramble** → glitch/scramble title animations  
- **useScrollSpy** → dynamic nav highlight  
- **useSpotify** → live music status integration

---

## 🧰 Utils  
```
src/utils/
│── cn.js
│── triggerWarp.js
```

Utility functions for class merging & warp animations.

<br><br>

<!-- ===================================================================================== -->
<!--                                   FILE STRUCTURE TREE                                  -->
<!-- ===================================================================================== -->

# 📁 Project Structure

```
laksh-portfolio/
│── public/
│     ├── favicon.png
│     ├── manifest.json
│     ├── sw.js
│     └── vite.svg
│
│── src/
│     ├── assets/
│     │     ├── images/
│     │     └── resume/
│     ├── components/
│     │     ├── 3d/
│     │     ├── layout/
│     │     ├── sections/
│     │     └── ui/
│     ├── context/
│     ├── data/
│     ├── hooks/
│     ├── utils/
│     ├── App.jsx
│     ├── App.css
│     ├── index.css
│     └── main.jsx
│
│── package.json
│── tailwind.config.js
│── vite.config.js
│── postcss.config.js
│── README.md
```

<br><br>

<!-- ===================================================================================== -->
<!--                                   TECH STACK BADGES                                    -->
<!-- ===================================================================================== -->

# 🛠 Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,html,css&theme=dark" />

</div>

<br><br>

<!-- ===================================================================================== -->
<!--                                      INSTALLATION                                      -->
<!-- ===================================================================================== -->

# 🚀 Installation

```bash
git clone https://github.com/TheRealLaksh/laksh-portfolio
cd laksh-portfolio
npm install
npm run dev
```

Then open:

```
http://localhost:5173/
```

<br><br>

<!-- ===================================================================================== -->
<!--                                       CONTACT                                          -->
<!-- ===================================================================================== -->

# 🔗 Connect

<div align="center">
<a href="https://github.com/TheRealLaksh"><img src="https://img.shields.io/badge/GitHub-TheRealLaksh-24292F?style=for-the-badge&logo=github"></a>
<a href="mailto:laksh.pradhwani@gmail.com"><img src="https://img.shields.io/badge/Email-Contact-E50914?style=for-the-badge&logo=gmail"></a>
<a href="https://linkedin.com/in/laksh-pradhwani"><img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin"></a>
</div>

<br>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=wave&height=140&color=1a1a1a&section=footer&text=Crafted%20With%20Precision.&fontColor=E50914&fontSize=26" />
</p>

