// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initMobileMenu();
    initDarkMode();
    initSmoothScrolling();
    initBackToTop();
    initSearchModal();
    initFeaturedSlider();
    initScrollAnimations();
    initHeaderScroll();
    initBreakingNewsTicker();
    updateDateTime();
    initLazyLoading();
    initNewsletterForm();
    initSearchForm();
    initNewsCardInteractions();
    initSocialShare();
    optimizePerformance();
    updateActiveNavigation();
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMobile = document.getElementById('navMobile');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && navMobile) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMobile.classList.contains('active');
            
            if (isActive) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close mobile menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMobile.classList.contains('active') && 
                !navMobile.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        function openMobileMenu() {
            navMobile.classList.add('active');
            mobileMenuBtn.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            navMobile.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Dark Mode Functionality
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle?.querySelector('i');

    if (!darkModeToggle) return;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateDarkModeIcon(icon, savedTheme);

    darkModeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(icon, newTheme);
        
        // Add smooth transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);

        showNotification(`Switched to ${newTheme} mode`, 'info');
    });
}

function updateDarkModeIcon(icon, theme) {
    if (!icon) return;
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    // Scroll to top functionality
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check
    toggleBackToTop();
}

// Search Modal
function initSearchModal() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const searchModalClose = document.getElementById('searchModalClose');
    const searchModalInput = document.getElementById('searchModalInput');

    if (!searchBtn || !searchModal) return;

    // Open search modal
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openSearchModal();
    });

    // Close search modal
    if (searchModalClose) {
        searchModalClose.addEventListener('click', function(e) {
            e.preventDefault();
            closeSearchModal();
        });
    }
    
    // Close modal when clicking outside
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });

    function openSearchModal() {
        searchModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            if (searchModalInput) {
                searchModalInput.focus();
            }
        }, 100);
    }

    function closeSearchModal() {
        searchModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Featured Slider
function initFeaturedSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (dots[i]) {
                dots[i].classList.remove('active');
            }
        });

        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            showSlide(index);
            stopAutoSlide();
            startAutoSlide(); // Restart auto slide
        });
    });

    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Initialize slider
    showSlide(0);
    startAutoSlide();

    // Pause auto-slide when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.news-card, .widget, .footer-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollTop = 0;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
}

// Breaking News Ticker
function initBreakingNewsTicker() {
    const tickerContent = document.getElementById('tickerContent');
    
    if (!tickerContent) return;

    // Ensure ticker animation works properly
    tickerContent.style.animation = 'ticker 60s linear infinite';
    
    // Pause/resume on hover
    const tickerWrapper = document.querySelector('.ticker-wrapper');
    if (tickerWrapper) {
        tickerWrapper.addEventListener('mouseenter', function() {
            tickerContent.style.animationPlayState = 'paused';
        });
        
        tickerWrapper.addEventListener('mouseleave', function() {
            tickerContent.style.animationPlayState = 'running';
        });
    }
}

// Update Date and Time
function updateDateTime() {
    const dateElement = document.getElementById('current-date');
    
    if (dateElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const dateString = now.toLocaleDateString('en-US', options);
        dateElement.textContent = dateString;
    }
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease-in-out';
                    
                    img.onload = function() {
                        img.style.opacity = '1';
                    };
                    
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('.newsletter-input')?.value;
        const button = this.querySelector('.newsletter-btn');
        
        if (!email || !button) return;

        if (isValidEmail(email)) {
            // Simulate API call
            const originalText = button.textContent;
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.backgroundColor = '#059669';
                this.querySelector('.newsletter-input').value = '';
                showNotification('Successfully subscribed to newsletter!', 'success');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    button.disabled = false;
                }, 2000);
            }, 1000);
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// Search Form
function initSearchForm() {
    const searchForms = document.querySelectorAll('.search-form, .search-modal-form');
    
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('input[type="text"]');
            const query = searchInput?.value.trim();
            
            if (query) {
                // Simulate search functionality
                showNotification(`Searching for: "${query}"`, 'info');
                
                // Close search modal if open
                const searchModal = document.getElementById('searchModal');
                if (searchModal?.classList.contains('active')) {
                    searchModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Clear search input
                searchInput.value = '';
            }
        });
    });
}

// News Card Interactions
function initNewsCardInteractions() {
    const newsCards = document.querySelectorAll('.news-card');
    const popularPosts = document.querySelectorAll('.popular-post');
    
    // Main news cards
    newsCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.news-title')?.textContent;
            if (title) {
                showNotification(`Opening article: "${title}"`, 'info');
            }
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Popular posts
    popularPosts.forEach(post => {
        post.addEventListener('click', function() {
            const title = this.querySelector('h4')?.textContent;
            if (title) {
                showNotification(`Opening article: "${title}"`, 'info');
            }
        });
        
        // Add keyboard accessibility
        post.setAttribute('tabindex', '0');
        post.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Social Share Functionality
function initSocialShare() {
    const socialLinks = document.querySelectorAll('[href*="facebook.com"], [href*="twitter.com"], [href*="instagram.com"], [href*="wa.me"], [href*="t.me"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.getAttribute('href');
            
            if (url && (url.includes('wa.me') || url.includes('t.me'))) {
                // For WhatsApp and Telegram, open directly
                // Don't prevent default, let it open normally
                return;
            } else if (url && (url.includes('facebook.com') || url.includes('twitter.com') || url.includes('instagram.com'))) {
                // For other social platforms, open in popup
                e.preventDefault();
                const width = 600;
                const height = 400;
                const left = (screen.width / 2) - (width / 2);
                const top = (screen.height / 2) - (height / 2);
                
                window.open(url, 'social-share', `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`);
            }
        });
    });
}

// Navigation Active State
function updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked link
            this.classList.add('active');
        });
    });
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const scrollHandlers = [];
    
    // Collect all scroll handlers
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            scrollHandlers.forEach(handler => handler());
        }, 10);
    });
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('.slide img:first-child, .news-card img');
    criticalImages.forEach(img => {
        const imageUrl = img.getAttribute('src');
        if (imageUrl) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = imageUrl;
            document.head.appendChild(preloadLink);
        }
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        error: '#DC2626',
        success: '#059669',
        info: '#2563EB',
        warning: '#EA580C'
    };
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 14px;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Roboto', sans-serif;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 4000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => removeNotification(notification));
        
        // Close button styles
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s ease;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    }
}

function removeNotification(notification) {
    if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    const tickerContent = document.getElementById('tickerContent');
    
    if (document.hidden) {
        // Pause animations when page is hidden
        if (tickerContent) {
            tickerContent.style.animationPlayState = 'paused';
        }
    } else {
        // Resume animations when page becomes visible
        if (tickerContent) {
            tickerContent.style.animationPlayState = 'running';
        }
        updateDateTime();
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navMobile = document.getElementById('navMobile');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        
        if (navMobile?.classList.contains('active')) {
            navMobile.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        console.log('News Bangla - Ready for Service Worker implementation');
    });
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('News Bangla Error:', e.error);
    showNotification('An error occurred. Please refresh the page.', 'error');
});

// Initialize date update interval
setInterval(updateDateTime, 60000); // Update every minute

// Console welcome message
console.log('%c News Bangla ', 'background: #DC2626; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
console.log('News Bangla - Modern Bengali News Portal');
console.log('Features: Responsive Design, Dark Mode, Smooth Animations, SEO Optimized');
console.log('Built with: HTML5, CSS3, Vanilla JavaScript');

// Initialize keyboard navigation
document.addEventListener('keydown', function(e) {
    // Global keyboard shortcuts
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.click();
        }
    }
    
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Add loading states
function addLoadingStates() {
    const buttons = document.querySelectorAll('button[type="submit"]');
    
    buttons.forEach(button => {
        const form = button.closest('form');
        if (form) {
            form.addEventListener('submit', function() {
                button.style.cursor = 'wait';
                button.disabled = true;
                
                setTimeout(() => {
                    button.style.cursor = '';
                    button.disabled = false;
                }, 2000);
            });
        }
    });
}

// Initialize loading states
addLoadingStates();
