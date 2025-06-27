# Prithiv Raj - Windows 95 Portfolio

A retro-styled portfolio website built with React and TypeScript, featuring a Windows 95-inspired interface and user experience.

## About

This is a portfolio website for Prithiv Raj, presented as an interactive Windows 95 desktop environment. The project showcases technical skills, work experience, and projects through a nostalgic yet functional interface.

## Features

- **Windows 95 UI/UX**: Authentic retro interface with classic Windows 95 styling
- **Interactive Desktop**: Clickable icons, windows, and applications
- **Portfolio Applications**: 
  - My Computer (Technical Skills)
  - My Documents (Work Experience)
  - Internet Explorer (Blog/Articles)
  - Recycle Bin (Archived Roles)
  - Contact (Contact Information)
- **Customizable Background**: Multiple background options including videos
- **Responsive Design**: Works on various screen sizes

## Technologies Used

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **State Management**: Zustand
- **Icons**: Custom Windows 95-style icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pixel-desktop-remastered
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── applications/    # Portfolio applications
│   └── ui/             # Reusable UI components
├── config/             # Configuration files
├── data/               # Static data and content
├── hooks/              # Custom React hooks
└── pages/              # Page components
```

## Deployment

The project can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service

## License

This project is part of Prithiv Raj's portfolio. All rights reserved.

## Contact

For questions or collaboration opportunities, please reach out through the Contact application in the portfolio.
