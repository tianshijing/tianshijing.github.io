/**
 * Advanced Website Features
 * Premium interactions and functionality
 */

class AdvancedWebsiteFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollProgress();
        this.initParallaxEffects();
        this.initTypewriterEffect();
        this.initFloatingActionButton();
        this.initAdvancedAnimations();
        this.initPerformanceMonitoring();
        this.initDarkModeToggle();
        this.initSearchFunctionality();
        this.initLazyLoadingEnhancements();
    }

    /**
     * Scroll Progress Indicator
     */
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        document.body.appendChild(progressBar);

        const progressBarFill = progressBar.querySelector('.scroll-progress-bar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBarFill.style.width = scrollPercent + '%';
        });
    }

    /**
     * Advanced Parallax Effects
     */
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        const handleParallax = () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', this.throttle(handleParallax, 16));
    }

    /**
     * Typewriter Effect for Hero Text
     */
    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typewriterSpeed) || 100;
            element.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                }
            };
            
            // Start typewriter effect when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    /**
     * Floating Action Button
     */
    initFloatingActionButton() {
        const fab = document.createElement('button');
        fab.className = 'fab';
        fab.innerHTML = '<i class="fas fa-arrow-up"></i>';
        fab.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(fab);

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                fab.style.opacity = '1';
                fab.style.visibility = 'visible';
            } else {
                fab.style.opacity = '0';
                fab.style.visibility = 'hidden';
            }
        });

        // Smooth scroll to top
        fab.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /**
     * Advanced Animations
     */
    initAdvancedAnimations() {
        // Stagger animations for cards
        const cards = document.querySelectorAll('.research-card, .news-item, .blog-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('card-hover-lift');
        });

        // Add micro-interactions
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.classList.add('btn-glow');
            
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });

        // Add tooltips to social links
        const socialLinks = document.querySelectorAll('.social-links a');
        socialLinks.forEach(link => {
            link.classList.add('tooltip-enhanced');
            const icon = link.querySelector('i');
            if (icon) {
                const platform = this.getSocialPlatform(icon.className);
                link.setAttribute('data-tooltip', `Visit ${platform}`);
            }
        });
    }

    /**
     * Performance Monitoring
     */
    initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('web-vital' in window) {
            import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(console.log);
                getFID(console.log);
                getFCP(console.log);
                getLCP(console.log);
                getTTFB(console.log);
            });
        }

        // Monitor page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }

    /**
     * Dark Mode Toggle
     */
    initDarkModeToggle() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        
        // Add to navbar
        const navbar = document.querySelector('.navbar .container');
        if (navbar) {
            darkModeToggle.style.cssText = `
                position: absolute;
                right: 60px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 8px;
                border-radius: 50%;
                transition: var(--transition-smooth);
            `;
            navbar.appendChild(darkModeToggle);
        }

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    /**
     * Search Functionality
     */
    initSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-overlay">
                <div class="search-box">
                    <input type="text" placeholder="Search..." class="search-input">
                    <button class="search-close">&times;</button>
                </div>
                <div class="search-results"></div>
            </div>
        `;
        
        document.body.appendChild(searchContainer);

        // Add search trigger (Ctrl+K or Cmd+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggleSearch();
            }
        });

        // Add search styles
        const searchStyles = document.createElement('style');
        searchStyles.textContent = `
            .search-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
            }
            
            .search-box {
                background: white;
                border-radius: 12px;
                padding: 20px;
                width: 90%;
                max-width: 600px;
                position: relative;
            }
            
            .search-input {
                width: 100%;
                border: none;
                outline: none;
                font-size: 18px;
                padding: 15px;
                border-radius: 8px;
                background: #f8f9fa;
            }
            
            .search-close {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(searchStyles);
    }

    /**
     * Enhanced Lazy Loading
     */
    initLazyLoadingEnhancements() {
        // Lazy load background images
        const bgElements = document.querySelectorAll('[data-bg]');
        
        if ('IntersectionObserver' in window) {
            const bgObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.style.backgroundImage = `url(${element.dataset.bg})`;
                        element.classList.add('loaded');
                        bgObserver.unobserve(element);
                    }
                });
            });

            bgElements.forEach(el => bgObserver.observe(el));
        }
    }

    /**
     * Utility Functions
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    getSocialPlatform(className) {
        if (className.includes('twitter')) return 'Twitter';
        if (className.includes('github')) return 'GitHub';
        if (className.includes('linkedin')) return 'LinkedIn';
        if (className.includes('graduation-cap')) return 'Google Scholar';
        return 'Social Media';
    }

    toggleSearch() {
        const searchContainer = document.querySelector('.search-container');
        const isVisible = searchContainer.style.display === 'flex';
        
        searchContainer.style.display = isVisible ? 'none' : 'flex';
        
        if (!isVisible) {
            const searchInput = searchContainer.querySelector('.search-input');
            setTimeout(() => searchInput.focus(), 100);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedWebsiteFeatures();
});

// Export for potential external use
window.AdvancedWebsiteFeatures = AdvancedWebsiteFeatures;
