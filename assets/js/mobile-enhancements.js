/*!
 * Hanthana Kitchen - Mobile Enhancement JavaScript
 * Version: 1.0
 * Enhanced mobile interactions and touch optimizations
 */

(function($) {
    'use strict';

    // DOM Ready
    $(document).ready(function() {
        
        // ========================================
        // 1. TOUCH OPTIMIZATIONS
        // ========================================
        
        // Add touch classes for better styling
        if ('ontouchstart' in window) {
            $('body').addClass('touch-enabled');
        }
        
        // Prevent zoom on double tap for specific elements
        $('.theme-btn, .qty-btn, .arrow-btn').on('touchend', function(e) {
            e.preventDefault();
            $(this).trigger('click');
        });
        
        // ========================================
        // 2. MOBILE MENU ENHANCEMENTS
        // ========================================
        
        // Better mobile menu toggle
        $('.meanmenu-reveal').on('click', function(e) {
            e.preventDefault();
            $(this).toggleClass('active');
            $('.mean-nav').slideToggle(300);
        });
        
        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.mean-container').length) {
                $('.mean-nav').slideUp(300);
                $('.meanmenu-reveal').removeClass('active');
            }
        });
        
        // ========================================
        // 3. FORM ENHANCEMENTS
        // ========================================
        
        // Auto-resize textareas
        $('textarea').on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Form validation feedback
        $('form').on('submit', function(e) {
            var isValid = true;
            $(this).find('input[required], textarea[required]').each(function() {
                if (!$(this).val().trim()) {
                    $(this).addClass('error');
                    isValid = false;
                } else {
                    $(this).removeClass('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                $('<div class="alert alert-danger mobile-alert">Please fill in all required fields.</div>')
                    .insertBefore(this)
                    .delay(3000)
                    .fadeOut();
            }
        });
        
        // ========================================
        // 4. QUANTITY CONTROLS
        // ========================================
        
        // Enhanced quantity buttons
        $(document).on('click', '.quantity-plus', function(e) {
            e.preventDefault();
            var input = $(this).siblings('.qty-input');
            var currentVal = parseInt(input.val()) || 1;
            var maxVal = parseInt(input.attr('max')) || 99;
            
            if (currentVal < maxVal) {
                input.val(currentVal + 1).trigger('change');
            }
        });
        
        $(document).on('click', '.quantity-minus', function(e) {
            e.preventDefault();
            var input = $(this).siblings('.qty-input');
            var currentVal = parseInt(input.val()) || 1;
            var minVal = parseInt(input.attr('min')) || 1;
            
            if (currentVal > minVal) {
                input.val(currentVal - 1).trigger('change');
            }
        });
        
        // ========================================
        // 5. IMAGE LAZY LOADING
        // ========================================
        
        // Simple lazy loading for images
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
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // ========================================
        // 6. SWIPE GESTURES FOR GALLERY
        // ========================================
        
        let startX = 0;
        let startY = 0;
        
        $('.gallery-section').on('touchstart', function(e) {
            startX = e.originalEvent.touches[0].clientX;
            startY = e.originalEvent.touches[0].clientY;
        });
        
        $('.gallery-section').on('touchend', function(e) {
            if (!startX || !startY) return;
            
            let endX = e.originalEvent.changedTouches[0].clientX;
            let endY = e.originalEvent.changedTouches[0].clientY;
            
            let diffX = startX - endX;
            let diffY = startY - endY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swiped left - next image
                    $('.swiper-button-next').trigger('click');
                } else {
                    // Swiped right - previous image
                    $('.swiper-button-prev').trigger('click');
                }
            }
            
            startX = 0;
            startY = 0;
        });
        
        // ========================================
        // 7. SMOOTH SCROLL FOR MOBILE
        // ========================================
        
        $('a[href*="#"]:not([href="#"])').on('click', function(e) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
                location.hostname === this.hostname) {
                
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                
                if (target.length) {
                    e.preventDefault();
                    var offset = target.offset().top - 80; // Account for fixed header
                    
                    $('html, body').animate({
                        scrollTop: offset
                    }, 600, 'swing');
                }
            }
        });
        
        // ========================================
        // 8. FLOATING BUTTONS OPTIMIZATION
        // ========================================
        
        // Optimize floating button positions on scroll
        let lastScrollTop = 0;
        $(window).on('scroll', function() {
            let scrollTop = $(this).scrollTop();
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                $('.float, .back-to-top').addClass('hide-on-scroll');
            } else {
                // Scrolling up
                $('.float, .back-to-top').removeClass('hide-on-scroll');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // ========================================
        // 9. CART TABLE MOBILE OPTIMIZATION
        // ========================================
        
        // Transform cart table for mobile
        function mobileCartTable() {
            if ($(window).width() <= 767) {
                $('.cart_table').addClass('mobile-cart');
            } else {
                $('.cart_table').removeClass('mobile-cart');
            }
        }
        
        mobileCartTable();
        $(window).on('resize', mobileCartTable);
        
        // ========================================
        // 10. SEARCH ENHANCEMENT
        // ========================================
        
        // Better search functionality
        $('.search-field-holder input').on('focus', function() {
            $(this).closest('.search-wrap').addClass('search-focused');
        });
        
        $('.search-close').on('click', function() {
            $('.search-wrap').removeClass('search-focused');
        });
        
        // ========================================
        // 11. ORIENTATION CHANGE HANDLER
        // ========================================
        
        $(window).on('orientationchange', function() {
            // Slight delay to allow for orientation change
            setTimeout(function() {
                // Recalculate heights and positions
                $('.mean-nav').hide();
                $('.meanmenu-reveal').removeClass('active');
                
                // Trigger resize events
                $(window).trigger('resize');
            }, 100);
        });
        
        // ========================================
        // 12. ACCESSIBILITY IMPROVEMENTS
        // ========================================
        
        // Keyboard navigation for custom elements
        $('.qty-btn').on('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                $(this).trigger('click');
            }
        });
        
        // Focus management for modals
        $(document).on('shown.bs.modal', '.modal', function() {
            $(this).find('input, button, select, textarea').first().focus();
        });
        
        // ========================================
        // 13. PERFORMANCE OPTIMIZATIONS
        // ========================================
        
        // Debounce resize events
        let resizeTimer;
        $(window).on('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Trigger custom resize event
                $(window).trigger('optimizedResize');
            }, 250);
        });
        
        // ========================================
        // 14. ERROR HANDLING
        // ========================================
        
        // Global error handler for AJAX requests
        $(document).ajaxError(function(event, xhr, settings, error) {
            console.warn('AJAX Error:', error);
            
            if (xhr.status === 0) {
                $('<div class="alert alert-warning mobile-alert">Please check your internet connection.</div>')
                    .appendTo('body')
                    .delay(3000)
                    .fadeOut();
            }
        });
        
    });
    
    // ========================================
    // 15. WINDOW LOAD EVENTS
    // ========================================
    
    $(window).on('load', function() {
        // Remove loading states
        $('body').addClass('loaded');
        
        // Initialize any remaining components
        $('.lazy').removeClass('lazy');
        
        // Performance mark
        if (window.performance && window.performance.mark) {
            window.performance.mark('mobile-enhancements-loaded');
        }
    });
    
})(jQuery);

// ========================================
// 16. VANILLA JS ENHANCEMENTS
// ========================================

// Service Worker Registration (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment below if you have a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Passive event listeners for better performance
document.addEventListener('touchstart', function() {}, { passive: true });
document.addEventListener('touchmove', function() {}, { passive: true });

// CSS Custom Properties for dynamic values
function setCSSCustomProperties() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setCSSCustomProperties();
window.addEventListener('resize', setCSSCustomProperties);
window.addEventListener('orientationchange', setCSSCustomProperties);

// ========================================
// 17. UTILITY FUNCTIONS
// ========================================

// Throttle function for performance
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

// Debounce function for performance
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
}

// Device detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
const isAndroid = /Android/.test(navigator.userAgent);

// Add device classes to body
if (isMobile) document.body.classList.add('mobile-device');
if (isIOS) document.body.classList.add('ios-device');
if (isAndroid) document.body.classList.add('android-device');

// ===============================
// FLOATING BUTTONS MANAGEMENT
// ===============================

// Optimize floating buttons positioning and behavior
function initFloatingButtons() {
    const messengerBtn = document.querySelector('.float');
    const whatsappLauncher = document.querySelector('.delightchat-whatsapp-launcher');
    const backToTopBtn = document.querySelector('#back-top');
    
    // Ensure proper z-index stacking
    if (messengerBtn) {
        messengerBtn.style.zIndex = '999998';
        
        // Add touch optimization for iOS
        if (isIOS) {
            messengerBtn.style.webkitTapHighlightColor = 'transparent';
            messengerBtn.style.webkitTouchCallout = 'none';
        }
        
        // Add accessibility
        messengerBtn.setAttribute('role', 'button');
        messengerBtn.setAttribute('aria-label', 'Contact us on Facebook Messenger');
        
        // Optimize touch interaction
        messengerBtn.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        messengerBtn.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    }
    
    // Optimize WhatsApp button when it loads
    function optimizeWhatsAppButton() {
        const whatsappBtn = document.querySelector('.delightchat-whatsapp-launcher');
        if (whatsappBtn) {
            whatsappBtn.style.zIndex = '999997';
            
            // Add accessibility
            whatsappBtn.setAttribute('role', 'button');
            whatsappBtn.setAttribute('aria-label', 'Contact us on WhatsApp');
            
            // iOS optimization
            if (isIOS) {
                whatsappBtn.style.webkitTapHighlightColor = 'transparent';
                whatsappBtn.style.webkitTouchCallout = 'none';
            }
            
            console.log('✅ WhatsApp button optimized');
        }
    }
    
    // Wait for WhatsApp widget to load and then optimize
    setTimeout(optimizeWhatsAppButton, 1000);
    setTimeout(optimizeWhatsAppButton, 3000); // Backup check
    
    // Back to top button optimization
    if (backToTopBtn) {
        backToTopBtn.style.zIndex = '999996';
        
        // Ensure proper display and styling
        backToTopBtn.style.display = 'inline-flex';
        backToTopBtn.style.alignItems = 'center';
        backToTopBtn.style.justifyContent = 'center';
        
        // Use the existing show/hide logic but improve it
        const handleScroll = throttle(() => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }, 100);
        
        // Remove any existing scroll listeners to avoid conflicts
        window.removeEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Add touch optimization for mobile
        if (isMobile) {
            backToTopBtn.addEventListener('touchstart', function(e) {
                this.style.transform = 'translateY(-2px) scale(0.95)';
            }, { passive: true });
            
            backToTopBtn.addEventListener('touchend', function(e) {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, { passive: true });
        }
        
        console.log('✅ Back-to-top button optimized');
    }
    
    console.log('✅ Floating buttons initialized');
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingButtons);
} else {
    initFloatingButtons();
}

// Console info
console.log('🍽️ Hanthana Kitchen Mobile Enhancements Loaded - v1.0');