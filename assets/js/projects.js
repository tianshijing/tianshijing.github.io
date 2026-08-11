/**
 * Projects page helpers
 */

(function() {
    'use strict';

    function formatStars(count) {
        if (!Number.isFinite(count)) return '';
        return count.toLocaleString('en-US');
    }

    function readFallback(card) {
        var countEl = card.querySelector('.project-star-count');
        if (!countEl) return 0;

        var fallback = countEl.getAttribute('data-fallback') || countEl.textContent || '0';
        return parseInt(fallback.replace(/,/g, ''), 10) || 0;
    }

    function updateTotalStars() {
        var total = 0;
        document.querySelectorAll('.project-star-count').forEach(function(el) {
            total += parseInt((el.textContent || '0').replace(/,/g, ''), 10) || 0;
        });

        document.querySelectorAll('[data-project-total-stars]').forEach(function(el) {
            el.textContent = formatStars(total);
        });
    }

    function updateCardStars(card, stars) {
        var countEl = card.querySelector('.project-star-count');
        if (!countEl) return;

        countEl.textContent = formatStars(stars);
        countEl.setAttribute('data-live-stars', String(stars));
        updateTotalStars();
    }

    function fetchStars(card) {
        var repo = card.getAttribute('data-github-repo');
        if (!repo || typeof fetch === 'undefined') return Promise.resolve();

        return fetch('https://api.github.com/repos/' + repo, {
            headers: {
                Accept: 'application/vnd.github+json'
            }
        })
            .then(function(response) {
                if (!response.ok) throw new Error('GitHub request failed');
                return response.json();
            })
            .then(function(data) {
                if (typeof data.stargazers_count === 'number') {
                    updateCardStars(card, data.stargazers_count);
                }
            })
            .catch(function() {
                updateCardStars(card, readFallback(card));
            });
    }

    function initProjectSidebar() {
        var sidebarLinks = Array.prototype.slice.call(document.querySelectorAll('.projects-page .pub-sidebar-link[href*="#"]'));
        if (!sidebarLinks.length) return;

        var sections = sidebarLinks
            .map(function(link) {
                var hash = link.getAttribute('href').split('#')[1];
                var target = hash ? document.getElementById(hash) : null;
                var sectionTarget = target ? target.closest('.project-section-heading') || target : null;
                return sectionTarget ? { id: hash, link: link, target: sectionTarget } : null;
            })
            .filter(Boolean);

        if (!sections.length) return;

        function setActive() {
            var scrollPosition = window.pageYOffset + 220;
            var activeSection = sections[0];

            sections.forEach(function(section) {
                if (section.target.offsetTop <= scrollPosition) {
                    activeSection = section;
                }
            });

            sidebarLinks.forEach(function(link) {
                link.classList.remove('active');
            });
            activeSection.link.classList.add('active');
        }

        window.addEventListener('scroll', setActive, { passive: true });
        setActive();
    }

    document.addEventListener('DOMContentLoaded', function() {
        var projectCards = document.querySelectorAll('[data-github-repo]');
        initProjectSidebar();
        if (!projectCards.length) return;

        updateTotalStars();
        projectCards.forEach(function(card) {
            fetchStars(card);
        });
    });
})();
