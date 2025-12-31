/**
 * Portfolio Build Script
 * Generates static HTML pages from JSON content data
 * 
 * Usage: node scripts/build.js
 */

const fs = require('fs');
const path = require('path');

// Paths
const CONTENT_FILE = path.join(__dirname, '../content/data.json');
const TEMPLATES_DIR = path.join(__dirname, '../templates');
const OUTPUT_DIR = path.join(__dirname, '..');

// Load content data
function loadContent() {
    try {
        const data = fs.readFileSync(CONTENT_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('❌ Error loading content data:', error.message);
        process.exit(1);
    }
}

// Template helpers
const helpers = {
    // Generate skill bars HTML
    skillBars: (skills) => skills.map(skill => `
                            <div>
                                <div class="flex justify-between mb-2">
                                    <span class="text-sm font-medium">${skill.name}</span>
                                    <span class="text-primary text-sm">${skill.level}%</span>
                                </div>
                                <div class="h-2 bg-dark-200 rounded-full overflow-hidden">
                                    <div class="h-full bg-gradient-to-r from-primary to-secondary rounded-full skill-bar" style="width: ${skill.level}%"></div>
                                </div>
                            </div>`).join('\n'),

    // Generate experience timeline
    experienceTimeline: (experience) => experience.map((exp, index) => `
                            <div class="relative pl-8 ${index < experience.length - 1 ? 'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-secondary' : ''}">
                                <div class="absolute left-0 top-0 w-2 h-2 ${index % 2 === 0 ? 'bg-primary' : 'bg-secondary'} rounded-full -translate-x-[3px]"></div>
                                <div class="bg-dark-200 rounded-2xl p-5">
                                    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                        <h4 class="font-display font-semibold text-lg">${exp.title}</h4>
                                        <span class="text-primary text-sm">${exp.period}</span>
                                    </div>
                                    <p class="text-light-300 text-sm mb-2">${exp.company}</p>
                                    <p class="text-light-300 text-sm">${exp.description}</p>
                                </div>
                            </div>`).join('\n'),

    // Generate education cards
    educationCards: (education) => education.map(edu => `
                            <div class="bg-dark-200 rounded-2xl p-5">
                                <h4 class="font-display font-semibold text-lg mb-1">${edu.degree}</h4>
                                <p class="text-primary text-sm mb-2">${edu.institution}</p>
                                <p class="text-light-300 text-sm">${edu.period}</p>
                            </div>`).join('\n'),

    // Generate project cards
    projectCards: (projects, featured = false) => {
        const items = featured ? projects.filter(p => p.featured) : projects;
        return items.map(project => `
                    <div class="project-card bg-dark-100 rounded-3xl overflow-hidden group" data-category="${project.category}">
                        <div class="aspect-video overflow-hidden relative">
                            <img src="${project.image}" 
                                 alt="${project.title}" 
                                 class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-dark-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <div class="flex gap-3">
                                    ${project.liveUrl ? `<a href="${project.liveUrl}" class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary transition-colors"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                    ${project.githubUrl ? `<a href="${project.githubUrl}" class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary transition-colors"><i class="fab fa-github"></i></a>` : ''}
                                </div>
                            </div>
                        </div>
                        <div class="p-6">
                            <div class="flex flex-wrap gap-2 mb-3">
                                ${project.tags.map((tag, i) => `<span class="px-3 py-1 ${i % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'} text-xs rounded-full">${tag}</span>`).join('')}
                            </div>
                            <h3 class="font-display text-xl font-bold mb-2">${project.title}</h3>
                            <p class="text-light-300 text-sm">${project.description}</p>
                        </div>
                    </div>`).join('\n');
    },

    // Generate service cards
    serviceCards: (services) => services.map(service => `
                    <div class="bg-dark-100 rounded-3xl p-6 group hover-card">
                        <div class="w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <i class="${service.icon} text-2xl"></i>
                        </div>
                        <h3 class="font-display text-xl font-bold mb-2">${service.title}</h3>
                        <p class="text-light-300 text-sm">${service.description}</p>
                    </div>`).join('\n'),

    // Generate certification cards
    certificationCards: (certifications) => certifications.map(cert => `
                    <div class="bg-dark-200 rounded-2xl p-5 flex items-start gap-4">
                        <div class="w-12 h-12 bg-gradient-to-br ${cert.color || 'from-primary to-secondary'} rounded-xl flex items-center justify-center flex-shrink-0">
                            <i class="${cert.icon || 'fas fa-certificate'} text-xl"></i>
                        </div>
                        <div>
                            <h4 class="font-display font-semibold mb-1">${cert.name}</h4>
                            <p class="text-light-300 text-sm">${cert.issuer}</p>
                        </div>
                    </div>`).join('\n'),

    // Generate FAQ items
    faqItems: (faq) => faq.map(item => `
                            <div class="faq-item bg-dark-200 rounded-2xl overflow-hidden">
                                <button class="faq-toggle w-full p-4 text-left flex items-center justify-between gap-4">
                                    <span class="font-medium">${item.question}</span>
                                    <i class="fas fa-chevron-down text-primary transition-transform"></i>
                                </button>
                                <div class="faq-content px-4 pb-4 hidden">
                                    <p class="text-light-300 text-sm">${item.answer}</p>
                                </div>
                            </div>`).join('\n'),

    // Generate tech stack icons
    techStackIcons: (techStack) => techStack.map(tech => `
                    <div class="tech-icon group">
                        <i class="${tech.icon} text-3xl" style="color: ${tech.color}" title="${tech.name}"></i>
                    </div>`).join('\n'),

    // Generate social links
    socialLinks: (social) => {
        const links = [];
        if (social.github) links.push(`<a href="${social.github}" class="w-11 h-11 bg-dark-200 rounded-xl flex items-center justify-center hover:bg-primary transition-colors group"><i class="fab fa-github text-light-300 group-hover:text-white"></i></a>`);
        if (social.linkedin) links.push(`<a href="${social.linkedin}" class="w-11 h-11 bg-dark-200 rounded-xl flex items-center justify-center hover:bg-[#0077B5] transition-colors group"><i class="fab fa-linkedin-in text-light-300 group-hover:text-white"></i></a>`);
        if (social.twitter) links.push(`<a href="${social.twitter}" class="w-11 h-11 bg-dark-200 rounded-xl flex items-center justify-center hover:bg-[#1DA1F2] transition-colors group"><i class="fab fa-twitter text-light-300 group-hover:text-white"></i></a>`);
        if (social.instagram) links.push(`<a href="${social.instagram}" class="w-11 h-11 bg-dark-200 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-colors group"><i class="fab fa-instagram text-light-300 group-hover:text-white"></i></a>`);
        return links.join('\n                        ');
    },

    // Generate social links grid (for contact page)
    socialLinksGrid: (social) => {
        const links = [];
        if (social.github) links.push(`<a href="${social.github}" class="flex items-center gap-3 p-3 bg-dark-200 rounded-xl hover:bg-white/10 transition-colors group"><i class="fab fa-github text-xl text-light-300 group-hover:text-white"></i><span class="text-sm">GitHub</span></a>`);
        if (social.linkedin) links.push(`<a href="${social.linkedin}" class="flex items-center gap-3 p-3 bg-dark-200 rounded-xl hover:bg-[#0077B5]/20 transition-colors group"><i class="fab fa-linkedin-in text-xl text-light-300 group-hover:text-[#0077B5]"></i><span class="text-sm">LinkedIn</span></a>`);
        if (social.twitter) links.push(`<a href="${social.twitter}" class="flex items-center gap-3 p-3 bg-dark-200 rounded-xl hover:bg-[#1DA1F2]/20 transition-colors group"><i class="fab fa-twitter text-xl text-light-300 group-hover:text-[#1DA1F2]"></i><span class="text-sm">Twitter</span></a>`);
        if (social.instagram) links.push(`<a href="${social.instagram}" class="flex items-center gap-3 p-3 bg-dark-200 rounded-xl hover:bg-pink-500/20 transition-colors group"><i class="fab fa-instagram text-xl text-light-300 group-hover:text-pink-500"></i><span class="text-sm">Instagram</span></a>`);
        if (social.youtube) links.push(`<a href="${social.youtube}" class="flex items-center gap-3 p-3 bg-dark-200 rounded-xl hover:bg-[#FF0000]/20 transition-colors group"><i class="fab fa-youtube text-xl text-light-300 group-hover:text-[#FF0000]"></i><span class="text-sm">YouTube</span></a>`);
        if (social.discord) links.push(`<a href="${social.discord}" class="flex items-center gap-3 p-3 bg-dark-200 rounded-xl hover:bg-[#5865F2]/20 transition-colors group"><i class="fab fa-discord text-xl text-light-300 group-hover:text-[#5865F2]"></i><span class="text-sm">Discord</span></a>`);
        return links.join('\n                            ');
    },

    // Generate language dots
    languageDots: (languages) => languages.map(lang => `
                            <div class="flex justify-between items-center">
                                <span>${lang.name}</span>
                                <div class="flex gap-1">
                                    ${Array(5).fill(0).map((_, i) => `<span class="w-3 h-3 ${i < lang.level ? 'bg-primary' : 'bg-dark-200'} rounded-full"></span>`).join('')}
                                </div>
                            </div>`).join('\n')
};

// Process template and replace placeholders
function processTemplate(template, data) {
    let result = template;
    
    // Simple replacements
    const replacements = {
        '{{name}}': data.profile.name,
        '{{title}}': data.profile.title,
        '{{tagline}}': data.profile.tagline,
        '{{bio}}': data.profile.bio,
        '{{bioExtended}}': data.profile.bioExtended,
        '{{avatar}}': data.profile.avatar,
        '{{location}}': data.profile.location,
        '{{email}}': data.profile.email,
        '{{website}}': data.profile.website,
        '{{resumeUrl}}': data.profile.resumeUrl,
        '{{availability}}': data.profile.availability ? 'Available for work' : 'Not available',
        '{{availabilityClass}}': data.profile.availability ? 'text-green-400' : 'text-red-400',
        '{{yearsExperience}}': data.stats.yearsExperience,
        '{{projectsCompleted}}': data.stats.projectsCompleted,
        '{{happyClients}}': data.stats.happyClients,
        '{{skillBars}}': helpers.skillBars(data.skills),
        '{{experienceTimeline}}': helpers.experienceTimeline(data.experience),
        '{{educationCards}}': helpers.educationCards(data.education),
        '{{allProjects}}': helpers.projectCards(data.projects, false),
        '{{featuredProjects}}': helpers.projectCards(data.projects, true),
        '{{serviceCards}}': helpers.serviceCards(data.services),
        '{{certificationCards}}': helpers.certificationCards(data.certifications),
        '{{faqItems}}': helpers.faqItems(data.faq),
        '{{techStackIcons}}': helpers.techStackIcons(data.techStack),
        '{{socialLinks}}': helpers.socialLinks(data.social),
        '{{socialLinksGrid}}': helpers.socialLinksGrid(data.social),
        '{{languageDots}}': helpers.languageDots(data.languages || []),
        '{{year}}': new Date().getFullYear()
    };
    
    for (const [placeholder, value] of Object.entries(replacements)) {
        result = result.split(placeholder).join(value);
    }
    
    return result;
}

// Build a single page
function buildPage(templateName, outputName, data) {
    const templatePath = path.join(TEMPLATES_DIR, templateName);
    const outputPath = path.join(OUTPUT_DIR, outputName);
    
    try {
        const template = fs.readFileSync(templatePath, 'utf8');
        const html = processTemplate(template, data);
        fs.writeFileSync(outputPath, html);
        console.log(`✅ Built: ${outputName}`);
    } catch (error) {
        console.error(`❌ Error building ${outputName}:`, error.message);
    }
}

// Main build function
function build() {
    console.log('\n🚀 Building portfolio...\n');
    
    // Check if templates exist
    if (!fs.existsSync(TEMPLATES_DIR)) {
        console.log('📁 Templates directory not found. Creating from existing HTML files...');
        createTemplatesFromHtml();
    }
    
    const data = loadContent();
    
    // Build all pages
    buildPage('index.template.html', 'index.html', data);
    buildPage('about.template.html', 'about.html', data);
    buildPage('works.template.html', 'works.html', data);
    buildPage('contact.template.html', 'contact.html', data);
    
    console.log('\n✨ Build complete!\n');
}

// Create templates directory with template files
function createTemplatesFromHtml() {
    fs.mkdirSync(TEMPLATES_DIR, { recursive: true });
    console.log('📁 Created templates directory');
    console.log('⚠️  Please create template files in the templates/ directory');
    console.log('   See README.md for template format instructions\n');
}

// Run build
build();
