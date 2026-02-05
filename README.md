# 🍰 Sweet Cake Shop

A premium, production-ready React e-commerce application for ordering delicious cakes and sweet treats. This project is built with a focus on high performance, professional design, and seamless user experience.

[![CI](https://github.com/arunk/sweet-cake-shop/actions/workflows/ci.yml/badge.svg)](https://github.com/arunk/sweet-cake-shop/actions)
[![License: MIT](https://img.sc.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vercel Deployment](https://img.sc.io/badge/Vercel-Deployed-black?logo=vercel)](https://sweet-cake-shop.vercel.app)

## 🌟 Live Demo

Check out the live application here: [sweet-cake-shop.vercel.app](https://sweet-cake-shop.vercel.app)

## ✨ Key Features

- **💎 Premium UI/UX**: Crafted with React, TypeScript, and Tailwind CSS for a smooth, high-end feel.
- **🧩 Accessible Components**: Built using Radix UI primitives ensuring the highest accessibility standards.
- **📱 Fully Responsive**: Optimized for every screen size, from mobile phones to ultra-wide monitors.
- **🛒 Dynamic Cart System**: Real-time cart management with quantity adjustments and persistent state.
- **🎨 Modern Animations**: fluid interface transitions utilizing Framer Motion.
- **🌗 Theme Support**: Native dark mode and light mode support with seamless switching.
- **✅ Robust Validation**: Type-safe forms and schema validation using React Hook Form and Zod.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler/Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

## 🚀 Professional Setup

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arunk/sweet-cake-shop.git
   cd sweet-cake-shop
   ```

2. Install dependencies with exact versions:

   ```bash
   npm ci
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory (refer to `.env.example` if available).

4. Launch Development Environment:
   ```bash
   npm run dev
   ```

## 🏗️ Deployment

### Deploy to Vercel

The project is optimized for Vercel. SPA routing is handled via `vercel.json` to prevent 404 errors on page refresh.

1. Connect your repository to Vercel.
2. The `vercel.json` configuration will automatically handle the routing rewrites.
3. Ensure the build command is `npm run build` and output directory is `dist`.

## 🧪 Testing & Quality Assurance

Maintain high code quality with our integrated suite:

- `npm run lint`: Static analysis and linting checks.
- `npm run test`: Execute the test suite with Vitest.
- `npm run build`: Production-grade build verification.

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on branch naming, commit messages, and the development workflow.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Arun K**

- GitHub: [@arunk](https://github.com/arunk)
- LinkedIn: [Your Profile Link Here]

---

Managed with ❤️ by the Sweet Cake Shop Team.
