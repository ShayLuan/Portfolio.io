# Portfolio Website

My personal portfolio built with React, Tailwind CSS, and Framer Motion.

## Project Structure

```
Portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.jsx   # Navigation bar with mobile menu
│   │   ├── Hero.jsx         # Hero section
│   │   ├── About.jsx        # About section
│   │   ├── Projects.jsx     # Projects showcase
│   │   ├── Skills.jsx       # Skills section
│   │   ├── Connect.jsx      # Contact/Connect section
│   │   └── Footer.jsx        # Footer component
│   ├── data/                # Data files
│   │   ├── projects.js      # Project data
│   │   └── skills.js         # Skills data
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles with Tailwind
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Component-Based**: Well-organized, reusable React components
- **Scroll Spy**: Active section highlighting in navigation

## Getting Started

### Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### Update Personal Information

1. **About Section**: Edit `src/components/About.jsx`
2. **Projects**: Update `src/data/projects.js`
3. **Skills**: Modify `src/data/skills.js`
4. **Contact Links**: Update URLs in `src/components/Connect.jsx` and `src/components/Footer.jsx`
5. **Hero Section**: Edit name and description in `src/components/Hero.jsx`

### Styling

- Global styles: `src/index.css`
- Tailwind configuration: `tailwind.config.js`
- Component-specific styles are inline using Tailwind classes

## Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **PostCSS**: CSS processing

## License

This project is open source and available for personal use.

