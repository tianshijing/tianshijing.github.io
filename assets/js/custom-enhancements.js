/* Small, accessible interactions for the shared minimal design. */
(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', function () {
        const menuButton = document.querySelector('.site-menu-toggle');
        const navigation = document.querySelector('.site-navigation');
        const links = document.querySelector('.site-links');
        function closeMenu() {
            if (navigation) navigation.classList.remove('is-open');
            if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
            if (links) links.open = false;
        }
        if (menuButton && navigation) {
            menuButton.addEventListener('click', function () {
                const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
                menuButton.setAttribute('aria-expanded', String(expanded));
                navigation.classList.toggle('is-open', expanded);
            });
            navigation.querySelectorAll('a').forEach(function (link) {
                link.addEventListener('click', closeMenu);
            });
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    const wasOpen = menuButton.getAttribute('aria-expanded') === 'true';
                    const linksOpen = links && links.open;
                    closeMenu();
                    if (wasOpen) menuButton.focus();
                    else if (linksOpen) links.querySelector('summary').focus();
                }
            });
            document.addEventListener('click', function (event) {
                if (!event.target.closest('.site-header')) closeMenu();
            });
            window.matchMedia('(min-width: 992px)').addEventListener('change', closeMenu);
        }
        const newsList = document.getElementById('latest-news-list');
        const listToggle = document.getElementById('news-list-toggle');
        if (newsList && listToggle) {
            listToggle.hidden = newsList.children.length <= 4;
            listToggle.addEventListener('click', function () {
                const expanded = listToggle.getAttribute('aria-expanded') !== 'true';
                newsList.setAttribute('data-collapsed', String(!expanded));
                listToggle.setAttribute('aria-expanded', String(expanded));
                listToggle.querySelector('.news-list-toggle-label').textContent = expanded ? 'Show less' : 'Show more';
                if (!expanded) listToggle.scrollIntoView({block: 'nearest'});
            });
        }
        document.querySelectorAll('.news-header').forEach(function (header) {
            function toggleNews() {
                const content = document.getElementById(header.getAttribute('aria-controls'));
                if (!content) return;
                const expanded = header.getAttribute('aria-expanded') !== 'true';
                header.setAttribute('aria-expanded', String(expanded));
                content.classList.toggle('show', expanded);
            }
            header.addEventListener('click', toggleNews);
            header.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleNews();
                }
            });
        });
    });
}());
