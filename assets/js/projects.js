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

    function updateTotalPageviews() {
        var total = 0;
        document.querySelectorAll('.project-pageview-count').forEach(function(el) {
            total += parseInt((el.textContent || '0').replace(/,/g, ''), 10) || 0;
        });

        document.querySelectorAll('[data-project-total-pageviews]').forEach(function(el) {
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

    function readPageviewsFallback(card) {
        var countEl = card.querySelector('.project-pageview-count');
        if (!countEl) return 0;

        var fallback = card.getAttribute('data-pageviews-fallback') || countEl.getAttribute('data-fallback') || countEl.textContent || '0';
        return parseInt(fallback.replace(/,/g, ''), 10) || 0;
    }

    function updateCardPageviews(card, pageviews) {
        var countEl = card.querySelector('.project-pageview-count');
        if (!countEl) return;

        countEl.textContent = formatStars(pageviews);
        countEl.setAttribute('data-live-pageviews', String(pageviews));
        updateTotalPageviews();
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

    function fetchPageviews(card) {
        var endpoint = card.getAttribute('data-pageviews-endpoint');
        var countEl = card.querySelector('.project-pageview-count');
        if (!endpoint || !countEl || typeof fetch === 'undefined') return Promise.resolve();

        var fallback = readPageviewsFallback(card);
        updateCardPageviews(card, fallback);

        var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        var timeout = controller ? window.setTimeout(function() {
            controller.abort();
        }, 7000) : null;
        var proxyEndpoint = 'https://api.codetabs.com/v1/proxy/?quest=';
        var targetUrl = endpoint + (endpoint.indexOf('?') >= 0 ? '&' : '?') + '_=' + Date.now();

        return fetch(proxyEndpoint + encodeURIComponent(targetUrl), {
            cache: 'no-store',
            signal: controller ? controller.signal : undefined
        })
            .then(function(response) {
                if (!response.ok) throw new Error('Pageview request failed');
                return response.json();
            })
            .then(function(stats) {
                var livePageviews = parseInt(stats.total_hits || stats.visits_count, 10);
                if (Number.isFinite(livePageviews) && livePageviews >= fallback) {
                    updateCardPageviews(card, livePageviews);
                }
            })
            .catch(function() {
                updateCardPageviews(card, fallback);
            })
            .finally(function() {
                if (timeout) window.clearTimeout(timeout);
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
        updateTotalPageviews();
        projectCards.forEach(function(card) {
            fetchStars(card);
            fetchPageviews(card);
        });
    });
})();
