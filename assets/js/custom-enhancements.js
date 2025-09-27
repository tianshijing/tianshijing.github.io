/**
 * Custom Enhancements JavaScript
 * Modern interactions and animations for Juanxi Tian's Personal Website
 */

(function($) {
    'use strict';

    // Initialize when document is ready
    $(document).ready(function() {
        initializeEnhancements();
    });

    function initializeEnhancements() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                delay: 0
            });
        }

        // Initialize smooth scrolling
        initSmoothScrolling();
        
        // Initialize navigation enhancements
        initNavigationEnhancements();
        
        // Initialize hero animations
        initHeroAnimations();
        
        // Initialize timeline animations
        initTimelineAnimations();
        
        // Initialize news section
        initNewsSection();
        
        // Initialize footer animations
        initFooterAnimations();
        
        // Initialize performance optimizations
        initPerformanceOptimizations();
    }

    /**
     * Smooth Scrolling Enhancement
     */
    function initSmoothScrolling() {
        // Enhanced smooth scrolling for anchor links
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            
            const target = $(this.getAttribute('href'));
            if (target.length) {
                const offset = $('.spyre-navbar').outerHeight() || 80;
                
                $('html, body').animate({
                    scrollTop: target.offset().top - offset
                }, {
                    duration: 800,
                    easing: 'easeInOutCubic'
                });
            }
        });

        // Add easing function if not available
        if (!$.easing.easeInOutCubic) {
            $.easing.easeInOutCubic = function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            };
        }
    }

    /**
     * Navigation Enhancements
     */
    function initNavigationEnhancements() {
        const navbar = $('.spyre-navbar');
        let lastScrollTop = 0;

        // Enhanced navbar behavior on scroll
        $(window).on('scroll', function() {
            const scrollTop = $(this).scrollTop();
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                navbar.addClass('navbar-scrolled');
            } else {
                navbar.removeClass('navbar-scrolled');
            }

            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.addClass('navbar-hidden');
            } else {
                navbar.removeClass('navbar-hidden');
            }
            
            lastScrollTop = scrollTop;
        });

        // Active section highlighting
        const sections = $('section[id]');
        const navLinks = $('.navbar-nav a[href^="#"]');

        $(window).on('scroll', function() {
            const scrollPos = $(window).scrollTop() + 100;

            sections.each(function() {
                const section = $(this);
                const sectionTop = section.offset().top;
                const sectionHeight = section.outerHeight();

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    const sectionId = section.attr('id');
                    navLinks.removeClass('active');
                    navLinks.filter(`[href="#${sectionId}"]`).addClass('active');
                }
            });
        });
    }

    /**
     * Hero Section Animations
     */
    function initHeroAnimations() {
        // Parallax effect for hero background
        $(window).on('scroll', function() {
            const scrolled = $(window).scrollTop();
            const parallaxElements = $('.parallax');
            
            parallaxElements.each(function() {
                const element = $(this);
                const speed = element.data('rellax-percentage') || 0.5;
                const yPos = -(scrolled * speed);
                element.css('transform', `translateY(${yPos}px)`);
            });
        });

        // Typing effect for hero subtitle (optional)
        const heroSubtitle = $('.hero-subtitle');
        if (heroSubtitle.length && heroSubtitle.data('typing')) {
            typeWriter(heroSubtitle[0], heroSubtitle.text(), 50);
        }

        // Hero tags hover effects
        $('.hero-tag').on('mouseenter', function() {
            $(this).addClass('tag-hover');
        }).on('mouseleave', function() {
            $(this).removeClass('tag-hover');
        });
    }

    /**
     * Timeline Animations
     */
    function initTimelineAnimations() {
        // Timeline items intersection observer
        if ('IntersectionObserver' in window) {
            const timelineObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('timeline-item-visible');
                        
                        // Animate timeline marker
                        const marker = entry.target.querySelector('.timeline-marker-inner');
                        if (marker) {
                            setTimeout(() => {
                                marker.style.transform = 'scale(1.1)';
                                setTimeout(() => {
                                    marker.style.transform = 'scale(1)';
                                }, 200);
                            }, 300);
                        }
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.timeline-item').forEach(item => {
                timelineObserver.observe(item);
            });
        }

        // Timeline card hover effects
        $('.timeline-card').on('mouseenter', function() {
            $(this).addClass('card-hover');
        }).on('mouseleave', function() {
            $(this).removeClass('card-hover');
        });
    }

    /**
     * News Section Interactions
     */
    function initNewsSection() {
        // Manual collapse functionality - no auto-closing
        $('.news-header').on('click', function() {
            const target = $(this).data('target');
            const isExpanded = $(this).attr('aria-expanded') === 'true';
            
            // Only toggle current item - don't close others
            $(this).attr('aria-expanded', !isExpanded);
            $(target).toggleClass('show');
        });

        // News items intersection observer for animations
        if ('IntersectionObserver' in window) {
            const newsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('news-item-visible');
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.news-item').forEach(item => {
                newsObserver.observe(item);
            });
        }

        // News tags hover effects
        $('.news-tag').on('mouseenter', function() {
            $(this).addClass('tag-hover');
        }).on('mouseleave', function() {
            $(this).removeClass('tag-hover');
        });
    }

    /**
     * Footer Animations
     */
    function initFooterAnimations() {
        // Footer stats counter animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !statNumber.classList.contains('counted')) {
                        animateCounter(statNumber);
                        statNumber.classList.add('counted');
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-item').forEach(item => {
            statsObserver.observe(item);
        });

        // Social icons hover effects
        $('.social-icon').on('mouseenter', function() {
            $(this).addClass('social-hover');
        }).on('mouseleave', function() {
            $(this).removeClass('social-hover');
        });
    }

    /**
     * Performance Optimizations
     */
    function initPerformanceOptimizations() {
        // Lazy loading for images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Preload critical resources
        preloadCriticalResources();

        // Optimize scroll events
        let ticking = false;
        function updateScrollEffects() {
            // Batch scroll-based updates here
            ticking = false;
        }

        $(window).on('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    /**
     * Utility Functions
     */

    // Typing effect
    function typeWriter(element, text, speed) {
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Counter animation
    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.replace(/\d/g, '').replace(/\+/g, '');
            element.textContent = Math.floor(current) + (target >= 10 ? '+' : '') + suffix;
        }, 16);
    }

    // Preload critical resources
    function preloadCriticalResources() {
        const criticalImages = [
            'assets/img/images/avatar.jpg',
            'assets/img/photos/20250327.JPG'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Debounce function
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Throttle function
    function throttle(func, limit) {
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

    // Add CSS classes for enhanced animations
    const style = document.createElement('style');
    style.textContent = `
        .navbar-scrolled {
            background: rgba(31, 39, 73, 0.95) !important;
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-hidden {
            transform: translateY(-100%);
        }
        
        .timeline-item-visible .timeline-card {
            animation: slideInUp 0.6s ease-out;
        }
        
        .news-item-visible {
            animation: fadeInUp 0.6s ease-out;
        }
        
        .tag-hover {
            transform: translateY(-3px) scale(1.05);
        }
        
        .card-hover {
            transform: translateY(-8px);
        }
        
        .social-hover {
            transform: translateY(-5px) scale(1.1);
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        img.loaded {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        img[data-src] {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);

})(jQuery);
