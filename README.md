# Summore E-Commerce

A modern, high-performance e-commerce application built with React, Vite, and Supabase. This project features a seamless shopping experience with smooth animations, secure authentication, and a robust cart system.

[**Live Demo**](https://summore.arpitray.me/)

## 🚀 Features

- **Modern User Interface**: Built with Tailwind CSS for a responsive and sleek design.
- **Smooth Animations**: Utilizes GSAP and Lenis for premium scrolling and interaction effects.
- **Secure Authentication**: Integrated with Supabase Auth for secure user management and protected routes.
- **Dynamic Product Catalog**: Browse products by categories, view detailed product pages, and discover trending items.
- **Persistent Shopping Cart**: Real-time cart management synchronized with Supabase database.
- **Optimized Performance**: Lazy loading images and code splitting for fast load times.

## 🛠️ Tech Stack

**Frontend:**
- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [GSAP](https://greensock.com/gsap/) - Animations
- [Lenis](https://github.com/studio-freight/lenis) - Smooth Scrolling

**Backend & Services:**
- [Supabase](https://supabase.com/) - Database, Auth, and Real-time subscriptions
- [Stripe](https://stripe.com/) - Payment Processing (Integration ready)

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Arpitray/commerce.git
   cd commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

This project uses Supabase for data persistence. You can find the database schema setup in `database_setup.sql`.

1. Create a new project on Supabase.
2. Run the SQL commands from `database_setup.sql` in your Supabase SQL Editor to set up the necessary tables (products, cart_items, etc.) and security policies.

## 📝 License

This project is licensed under the MIT License.
