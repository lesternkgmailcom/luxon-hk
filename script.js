// Language Switching, Accordion FAQ, and Functionality

// Global variables
let currentLang = localStorage.getItem('luxon-lang') || 'en';

// Set active language button
function setActiveButton(lang) {
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });
}

// Set language function - defined globally
function setLanguage(lang) {
    currentLang = lang;
    setActiveButton(lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all translatable elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (window.translations && window.translations[lang] && window.translations[lang][key]) {
            if (element.namespaceURI === 'http://www.w3.org/2000/svg') {
                element.textContent = window.translations[lang][key];
            } else {
                element.innerHTML = window.translations[lang][key];
            }
        }
    });

    // Update page title based on language
    const titles = {
        'en': 'Luxon.hk — AI Assistant Installation Service',
        'zh-HK': 'Luxon.hk — AI 助理安裝服務',
        'zh-CN': 'Luxon.hk — AI 助理安装服务'
    };
    document.title = titles[lang] || titles['en'];

    // Save to localStorage
    localStorage.setItem('luxon-lang', lang);

    // Close language dropdown after selection
    const langSelector = document.getElementById('langSelector');
    if (langSelector) {
        langSelector.classList.remove('open');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    setLanguage(currentLang);

    // Language selector icon dropdown
    const langSelector = document.getElementById('langSelector');
    const langIconBtn = document.querySelector('.lang-icon-btn');
    const langOptions = document.querySelectorAll('.lang-option');

    if (langIconBtn && langSelector) {
        langIconBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langSelector.classList.toggle('open');
        });

        document.addEventListener('click', function(e) {
            if (!langSelector.contains(e.target)) {
                langSelector.classList.remove('open');
            }
        });
    }

    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');

    function openMobileMenu() {
        if (mobileMenu && mobileOverlay && hamburgerBtn) {
            mobileMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            hamburgerBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (mobileMenu && mobileOverlay && hamburgerBtn) {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMobileMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a, .mobile-menu-footer a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Smooth scroll for anchor links
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

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (header) {
            if (window.pageYOffset > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const isOpen = item.classList.contains('open');

            // Close all other items
            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            if (isOpen) {
                item.classList.remove('open');
                this.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // GA4: Track WhatsApp CTA clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag === 'function') {
                gtag('event', 'cta_click', {
                    event_category: 'engagement',
                    event_label: 'whatsapp_booking',
                    page_location: window.location.href
                });
            }
        });
    });
});
