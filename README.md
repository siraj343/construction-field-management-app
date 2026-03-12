# 🏗️ SiteSync — Construction Field Management App

A responsive React web application for managing construction projects and filing Daily Progress Reports (DPR).

![React](https://img.shields.io/badge/React-18-61dafb?logo=react) 
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-6-ca4245?logo=reactrouter)

---

## ✨ Features

- **Login Page** — Mock authentication with email/password validation
- **Project List** — Browse 5 active construction projects with search & filter
- **DPR Form** — File daily progress reports with photo upload and full validation
- **Responsive** — Works on mobile, tablet, and desktop
- **Industrial Design** — Steel, amber, and concrete-inspired dark UI

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [VS Code](https://code.visualstudio.com/) (recommended)

### Steps to Run

**1. Clone or open the project folder in VS Code**
```bash
cd construction-field-management
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open your browser**
```
http://localhost:5173
```

---

## 🔑 Login Credentials

| Field    | Value           |
|----------|-----------------|
| Email    | test@test.com   |
| Password | 123456          |

---

## 📁 Project Structure

```
construction-field-management/
├── public/
├── src/
│   ├── assets/              # Static assets
│   ├── components/
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   └── ProjectCard.jsx  # Project list card
│   ├── data/
│   │   └── projects.js      # Static project data
│   ├── pages/
│   │   ├── LoginPage.jsx    # Authentication screen
│   │   ├── ProjectListPage.jsx  # Project browser
│   │   └── DPRFormPage.jsx  # Daily Progress Report form
│   ├── App.jsx              # Router & auth state
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI library |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| React Router 6 | Client-side routing |

---

## 📱 Pages Overview

### 1. Login Page (`/`)
- Email + password fields with show/hide toggle
- Mock authentication (test@test.com / 123456)
- Error message on wrong credentials
- Redirects to project list on success

### 2. Project List (`/projects`)
- Displays 5 construction projects as cards
- Search by name, location, or type
- Filter by status: Active / On Hold / Completed
- Progress bars and status badges
- Click any card to open DPR form

### 3. DPR Form (`/dpr/:projectId`)
- Project dropdown (pre-selected from list click)
- Date picker (defaults to today)
- Weather condition dropdown
- Worker count number input
- Work description textarea with character count
- Photo upload (1–3 images) with preview and remove
- Full form validation with inline error messages
- Success confirmation screen after submit

---

## 📝 Available Scripts

```bash
npm run dev      # Start dev server at localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 🎨 Design System

- **Font**: Barlow Condensed (headings) + Barlow (body) + Share Tech Mono (code)
- **Colors**: Steel dark palette + Amber 500 accent
- **Style**: Industrial / utilitarian with cut-corner motifs
- **Grid**: 3-column responsive grid on desktop, 1-column on mobile

---

## 🔮 Future Improvements

- [ ] Connect to a real backend API (Node.js/Django)
- [ ] Authentication with JWT tokens
- [ ] PDF export for DPR reports
- [ ] Push notifications for project updates
- [ ] Offline support with Service Workers
- [ ] Role-based access (Admin / Site Engineer / Viewer)

---

## 📄 License

MIT — Free to use and modify.
