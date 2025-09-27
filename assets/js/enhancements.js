/**
 * Website Enhancement JavaScript
 * Additional interactive features and optimizations
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeEnhancements();
    });

    function initializeEnhancements() {
        // Smooth scrolling for anchor links
        initSmoothScrolling();
        
        // Enhanced navbar behavior
        initNavbarEnhancements();
        
        // Lazy loading for images
        initLazyLoading();
        
        // Performance optimizations
        initPerformanceOptimizations();
        
        // Accessibility improvements
        initAccessibilityFeatures();
    }

    /**
     * Smooth scrolling for anchor links
     */
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Enhanced navbar behavior
     */
    function initNavbarEnhancements() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollTop = 0;
        let isScrolling = false;

        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Add/remove scrolled class for styling
                    if (scrollTop > 50) {
                        navbar.classList.add('navbar-scrolled');
                    } else {
                        navbar.classList.remove('navbar-scrolled');
                    }
                    
                    lastScrollTop = scrollTop;
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }

    /**
     * Lazy loading for images
     */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Performance optimizations
     */
    function initPerformanceOptimizations() {
        // Preload critical resources
        const criticalLinks = [
            'assets/css/enhancements.css',
            'assets/js/theme.js'
        ];

        criticalLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = href.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });

        // Optimize animations for better performance
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });

        // Clean up will-change after animations complete
        setTimeout(() => {
            animatedElements.forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 2000);
    }

    /**
     * Accessibility improvements
     */
    function initAccessibilityFeatures() {
        // Add skip link for keyboard navigation
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link sr-only sr-only-focusable';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            z-index: 9999;
            padding: 8px 16px;
            background: #000;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Improve focus management for dropdowns
        const dropdownToggles = document.querySelectorAll('[data-toggle="dropdown"]');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Add ARIA labels to social links
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            const icon = link.querySelector('i');
            if (icon) {
                const platform = icon.className.includes('twitter') ? 'Twitter' :
                               icon.className.includes('github') ? 'GitHub' :
                               icon.className.includes('linkedin') ? 'LinkedIn' :
                               icon.className.includes('graduation-cap') ? 'Google Scholar' :
                               'Social Media';
                link.setAttribute('aria-label', `Visit ${platform} profile`);
            }
        });
    }

    /**
     * Add CSS for enhanced navbar scrolling
     */
    function addNavbarScrollStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .navbar-scrolled {
                background: rgba(52, 58, 64, 0.98) !important;
                backdrop-filter: blur(25px);
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            }
            
            .skip-link:focus {
                top: 6px !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Add the navbar scroll styles
    addNavbarScrollStyles();

    // Export functions for potential external use
    window.WebsiteEnhancements = {
        initSmoothScrolling,
        initNavbarEnhancements,
        initLazyLoading,
        initPerformanceOptimizations,
        initAccessibilityFeatures
    };

})();
