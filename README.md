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
├── index.html              # Home page (generated)
├── about.html              # About page (generated)
├── works.html              # Portfolio/projects page (generated)
├── contact.html            # Contact form page (generated)
├── assets/
│   ├── css/
│   │   └── style.css       # Custom styles and animations
│   └── js/
│       └── main.js         # JavaScript functionality
├── content/
│   └── data.json           # 📝 All portfolio content (edit this!)
├── templates/
│   ├── index.template.html     # Home page template
│   ├── about.template.html     # About page template
│   ├── works.template.html     # Works page template
│   └── contact.template.html   # Contact page template
├── admin/
│   ├── index.html          # Admin panel UI
│   └── admin.js            # Admin panel JavaScript
├── scripts/
│   └── build.js            # Build script to generate pages
├── CNAME                   # Custom domain configuration
└── README.md               # This file
```

## 🚀 Quick Start

1. **Clone or fork this repository**
2. **Install Node.js** (for the build system)
3. **Edit content** - Use the Admin Panel or edit `content/data.json` directly
4. **Build the site** - Run `node scripts/build.js` to generate pages
5. **Push to GitHub** - Your portfolio will be live at `username.github.io`

## 📝 Content Management System (CMS)

This portfolio includes a simple CMS workflow for easy content updates without editing HTML directly.

### Option 1: Admin Panel (Recommended)

1. Open `admin/index.html` in your browser
2. Edit content using the visual forms
3. Click "Export Data" to download updated `data.json`
4. Replace `content/data.json` with the downloaded file
5. Run the build script: `node scripts/build.js`
6. Commit and push changes

### Option 2: Direct JSON Editing

1. Edit `content/data.json` directly with your content
2. Run the build script: `node scripts/build.js`
3. Commit and push changes

### Build Script Commands

```bash
# Generate all pages from templates
node scripts/build.js

# The script will:
# - Read content from content/data.json
# - Process each template in templates/
# - Generate final HTML pages in root directory
```

### Content Structure (data.json)

The `data.json` file contains all your portfolio content:

- **profile**: Name, title, bio, photo, email, location
- **stats**: Years of experience, projects count, clients, etc.
- **services**: List of services you offer
- **projects**: Portfolio items with title, category, image, links
- **experience**: Work history with dates and descriptions
- **education**: Educational background
- **skills**: Technical skills with proficiency percentages
- **social**: Social media links
- **contact**: Email, phone, location, availability
- **faqs**: Frequently asked questions

## 🎨 Customization

### Colors

The portfolio uses a purple-pink gradient theme. To change colors, update the Tailwind config in each template file (`templates/*.template.html`):

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

All content is managed through `content/data.json`. Use the Admin Panel or edit directly:

- **Personal Info**: Update `profile` section
- **Experience**: Edit `experience` array
- **Projects**: Add/edit items in `projects` array
- **Skills**: Update `skills` array with name and percentage
- **Contact**: Modify `contact` and `social` sections

After editing, run `node scripts/build.js` to regenerate the HTML pages.

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
