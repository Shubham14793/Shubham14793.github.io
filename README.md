# Shubham's Portfolio

A beautiful, professional, and responsive multi-page portfolio website built with Tailwind CSS. Designed to be hosted on GitHub Pages.

## 🌟 Features

- **Modern Design** - Inspired by the Gridx theme with a bento-grid layout
- **Fully Responsive** - Looks great on all devices (mobile, tablet, desktop)
- **Multi-Page Structure** - Home, About, Works, and Contact pages
- **Dark Theme** - Elegant dark mode with gradient accents
- **Smooth Animations** - CSS animations and JavaScript interactivity
- **No Build Required** - Uses Tailwind CSS via CDN for easy deployment
- **SEO Friendly** - Proper meta tags and semantic HTML
- **Accessible** - WCAG compliant with keyboard navigation support

## 📁 Project Structure

```
├── index.html          # Home page with hero and overview
├── about.html          # About page with experience, skills, services
├── works.html          # Portfolio/projects page with filter
├── contact.html        # Contact form and information
├── assets/
│   ├── css/
│   │   └── style.css   # Custom styles and animations
│   └── js/
│       └── main.js     # JavaScript functionality
├── CNAME               # Custom domain configuration
└── README.md           # This file
```

## 🚀 Quick Start

1. **Clone or fork this repository**
2. **Customize the content** - Update the HTML files with your information
3. **Replace images** - Add your own profile picture and project screenshots
4. **Update links** - Add your social media and project links
5. **Push to GitHub** - Your portfolio will be live at `username.github.io`

## 🎨 Customization

### Colors

The portfolio uses a purple-pink gradient theme. To change colors, update the Tailwind config in each HTML file:

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED", // Change this
        secondary: "#EC4899", // And this
        // ...
      },
    },
  },
};
```

### Content

- **Personal Info**: Update name, title, and bio in all HTML files
- **Experience**: Edit the experience section in `about.html`
- **Projects**: Add your projects in `works.html` and `index.html`
- **Contact**: Update email and social links in `contact.html`

### Images

Replace the Unsplash placeholder images with your own:

1. Profile photo in hero sections
2. Project screenshots in works section
3. Any other images you want to personalize

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **JavaScript** - Vanilla JS for interactivity
- **Font Awesome** - Icon library
- **Google Fonts** - Inter & Poppins typography

## 📄 Pages Overview

### Home (`index.html`)

- Hero section with gradient background
- Bento grid layout with quick links
- Stats counters (animated)
- Featured projects preview
- Tech stack showcase
- Marquee animation

### About (`about.html`)

- Detailed bio section
- Work experience timeline
- Education background
- Skills with progress bars
- Services offered
- Certifications

### Works (`works.html`)

- Filterable project grid
- Project categories: Web, Mobile, UI/UX, Backend
- Project cards with hover effects
- Links to live demos and GitHub

### Contact (`contact.html`)

- Contact form
- Social media links
- FAQ accordion
- Location and availability info

## 🌐 Deployment

This portfolio is designed for GitHub Pages:

1. Push code to your `username.github.io` repository
2. Go to Settings > Pages
3. Select main branch as source
4. Your site will be live at `https://username.github.io`

### Custom Domain

The `CNAME` file is configured for `techwithshubham.me`. Update it with your domain or remove it to use the default GitHub Pages URL.

## 📧 Contact Form

The contact form currently shows a success message on submission. To make it functional:

1. **Formspree**: Add `action="https://formspree.io/f/YOUR_ID"` to the form
2. **Netlify Forms**: Add `data-netlify="true"` attribute
3. **Custom Backend**: Modify the form submission in `main.js`

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Shubham
