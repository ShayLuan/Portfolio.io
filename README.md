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

## Deployment on Railway

This project is configured for easy deployment on Railway.

### Prerequisites

- A Railway account (sign up at [railway.app](https://railway.app))
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

1. **Connect Your Repository**
   - Log in to Railway
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or your Git provider)
   - Choose your portfolio repository

2. **Configure Build Settings**
   - Railway will automatically detect the project
   - Build Command: `npm run build` (already configured)
   - Start Command: `npm start` (already configured)
   - Root Directory: `/` (default)

3. **Environment Variables**
   - No environment variables are required for this project
   - If you add any in the future, set them in Railway's dashboard

4. **Deploy**
   - Railway will automatically build and deploy your project
   - The build process will:
     - Install dependencies
     - Build the production bundle
     - Start the preview server

5. **Custom Domain (Optional)**
   - Go to your project settings in Railway
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Railway will provide DNS instructions

### Build Process

The deployment process:
1. Installs all dependencies (`npm ci`)
2. Builds the production bundle (`npm run build`)
3. Starts the preview server on the assigned port (`npm start`)

### Troubleshooting

- **Build fails**: Check the build logs in Railway dashboard
- **Port issues**: Railway automatically sets the `$PORT` environment variable
- **Static files not loading**: Ensure all assets are in the `public/` folder
- **404 errors**: Make sure your `vite.config.js` is properly configured

### Local Production Testing

Test the production build locally before deploying:

```bash
npm run build
npm start
```

This will build and serve your app exactly as it will run on Railway.

## License

This project is open source and available for personal use.

