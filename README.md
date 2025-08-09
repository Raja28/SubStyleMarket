# SubStyle Market Store 🎬

A responsive React-based marketplace for purchasing and applying subtitle styling templates to video content.

## 📌 Overview

This application simulates a virtual marketplace where users can browse, purchase, and apply subtitle styling templates using a credit-based system. It's designed for video editor applications where users need attractive subtitle styles for their auto-generated captions.

## Demo Link
Visit the website: [ModernMobiles](https://modern-mobiles.vercel.app/)

## Demo Video
Watch the short video (5 mins): [Loom Video](https://www.loom.com/share/704f6558ec294d14936c3a08c6e7c0a5?sid=6fb5a8ef-a03a-4fa8-8b1c-33a6766d5c2d)

## ✨ Features

### Core Functionality
- **Template Gallery**: Browse 5 unique subtitle styling templates
- **Credit System**: Virtual currency system with 500 starting credits
- **Shopping Cart**: Add/remove templates with real-time cost calculation
- **Purchase Flow**: Complete checkout process with credit deduction

### Enhanced Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Toast Notifications**: Real-time feedback for user actions
- **Persistent Storage**: Save purchases and cart state in localStorage
- **Smooth Animations**: Credit deduction and cart transition animations

## 🛠 Tech Stack

- **Frontend**: ReactJS (Functional Components + Hooks)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Storage**: localStorage for persistence
- **Animations**: CSS transitions and transforms

## 🚀 Getting Started

### Prerequisites
- Node.js
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raja28/SubStyleMarket.git
   cd subStyle
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn start
   ```

### Build for Production
```bash
npm run build
# or
yarn build
```

## 🎨 Template Styles

The application includes 5 distinct subtitle templates:

1. **Classic** (Free) - Clean, simple white text
2. **Backdrop** (200 credits) - Text with dark background overlay  
3. **Highlight** (250 credits) - Colored background with rounded corners
4. **Glow** (300 credits) - Text with neon glow effect
5. **Cinematic** (400 credits) - Movie-style with elegant typography

## 💡 Key Components

### Template Grid
- Responsive grid layout (1-4 columns based on screen size)
- Hover effects and smooth transitions
- Preview subtitle text with live styling

### Shopping Cart
- Floating cart icon with item count badge
- Real-time total calculation
- Item management (add/remove)

### Credit System
- Credit balance display in profile
- Real-time balance updates
- Purchase validation

### Toast Notifications
- Success/error feedback
- Auto-dismiss functionality
- Smooth slide animations
- Non-blocking UI overlay

## 📄 License

This project is created for educational purposes as part of the DripLink Front End Intern Assignment.

