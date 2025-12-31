/**
 * Shubham Portfolio - Main JavaScript
 * Handles all interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // Page Loader
    // ==========================================
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ==========================================
    // Counter Animation
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ==========================================
    // Project Filter (Works Page)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ==========================================
    // FAQ Accordion (Contact Page)
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');

        if (toggle && content) {
            toggle.addEventListener('click', function() {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.faq-content');
                        if (otherContent) {
                            otherContent.classList.add('hidden');
                        }
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                content.classList.toggle('hidden');
            });
        }
    });

    // ==========================================
    // Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    // Formspree endpoint
    const FORMSPREE_URL = 'https://formspree.io/f/meeoqjkq';

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Get submit button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(FORMSPREE_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // Show success message
                    if (successMessage) {
                        successMessage.classList.remove('hidden');
                        contactForm.reset();
                        setTimeout(() => {
                            successMessage.classList.add('hidden');
                        }, 5000);
                    }
                    successMessage?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Sorry, there was an error sending your message. Please try again or email me directly.');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // Scroll Animations
    // ==========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // ==========================================
    // Navbar Background on Scroll
    // ==========================================
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav?.classList.add('nav-hidden');
        } else {
            nav?.classList.remove('nav-hidden');
        }

        lastScrollY = currentScrollY;
    });

    // ==========================================
    // Typing Effect (Optional)
    // ==========================================
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = ['Web Developer', 'UI/UX Designer', 'Full Stack Developer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        };

        type();
    }

    // ==========================================
    // Lazy Loading Images
    // ==========================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ==========================================
    // Parallax Effect (Subtle)
    // ==========================================
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ==========================================
    // Copy to Clipboard (for email)
    // ==========================================
    const copyBtns = document.querySelectorAll('[data-copy]');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.dataset.copy;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show copied feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });

    // ==========================================
    // Cursor Glow Effect (Optional)
    // ==========================================
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // ==========================================
    // Initialize Tooltips (if any)
    // ==========================================
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });

        el.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });

    console.log('✨ Portfolio initialized successfully!');
});

// ==========================================
// Utility Functions
// ==========================================

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
