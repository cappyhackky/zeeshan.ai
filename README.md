# Mohd Zishan Saifi — Portfolio

Personal portfolio website for a Computer Vision Engineer. Built with React + Vite and Tailwind CSS.

**Live stack:** InsightFace · TensorRT · Milvus · Docker · NVIDIA DGX A100

---

## Tech

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion
- Lucide React

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
npm run build    # production build
npm run preview  # preview build locally
```

---

## Structure

```
src/
├── components/    # Navbar, Hero, About, Skills, Experience,
│                  # Projects, Education, Contact, Footer
├── data/
│   └── resume.js  # all content lives here — edit this to update the site
└── hooks/
```

---

## Customization

**Content** — edit `src/data/resume.js`

**Profile photo** — drop `profile.jpg` in `public/`, then in `Hero.jsx` replace the `MZ` initials div with:
```jsx
<img src="/profile.jpg" alt="Mohd Zishan Saifi" className="w-full h-full object-cover rounded-full" />
```

**Contact form** — wire up `handleSubmit` in `Contact.jsx` to Formspree, EmailJS, or your own API.

**Colors** — three CSS variables in `src/index.css`:
```css
--electric: #00D9FF;
--plasma:   #FF6B35;
--violet:   #7B2FBE;
```