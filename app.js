// Enhanced Portfolio JavaScript - Updated for New Skills Layout

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeContactForm();
    initializeBackToTop();
    initializeScrollAnimations();
    initializeHeroButtons();
    
    console.log('Enhanced portfolio website initialized successfully!');

    // Fixed Navigation System
    function initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Fixed navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close mobile menu
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                
                // Get target section and scroll to it
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar ? navbar.offsetHeight : 80;
                    const offsetTop = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: Math.max(0, offsetTop),
                        behavior: 'smooth'
                    });
                    
                    // Update active link immediately
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Handle logo click
        const navBrand = document.querySelector('.nav-brand a');
        if (navBrand) {
            navBrand.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Update active nav
                navLinks.forEach(link => link.classList.remove('active'));
                const homeLink = document.querySelector('.nav-link[href="#home"]');
                if (homeLink) homeLink.classList.add('active');
            });
        }

        // Scroll effects
        let isScrolling = false;
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                requestAnimationFrame(function() {
                    updateNavOnScroll();
                    updateActiveNavLink();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        function updateNavOnScroll() {
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }

        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 150;

            sections.forEach(section => {
                const top = section.offsetTop - 100;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

                if (scrollPos >= top && scrollPos <= bottom) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        }
    }

    // Fixed Hero Section Buttons
    function initializeHeroButtons() {
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const href = this.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        const navbar = document.getElementById('navbar');
                        const navbarHeight = navbar ? navbar.offsetHeight : 80;
                        const offsetTop = targetSection.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: Math.max(0, offsetTop),
                            behavior: 'smooth'
                        });
                        
                        // Update active nav link
                        const navLinks = document.querySelectorAll('.nav-link');
                        navLinks.forEach(link => link.classList.remove('active'));
                        const correspondingNavLink = document.querySelector(`.nav-link[href="${href}"]`);
                        if (correspondingNavLink) correspondingNavLink.classList.add('active');
                    }
                }
            });
        });
    }

    // Fixed Contact Form Handler
    function initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleFormSubmission();
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });

        function validateField(field) {
            const fieldName = field.name || field.id;
            const value = field.value.trim();
            const errorElement = document.getElementById(fieldName + '-error');
            
            if (!errorElement) return true;

            let isValid = true;
            let errorMessage = '';

            switch (fieldName) {
                case 'name':
                    if (!value) {
                        errorMessage = 'Name is required';
                        isValid = false;
                    } else if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters';
                        isValid = false;
                    }
                    break;
                    
                case 'email':
                    if (!value) {
                        errorMessage = 'Email is required';
                        isValid = false;
                    } else if (!isValidEmail(value)) {
                        errorMessage = 'Please enter a valid email address';
                        isValid = false;
                    }
                    break;
                    
                case 'subject':
                    if (!value) {
                        errorMessage = 'Please select a subject';
                        isValid = false;
                    }
                    break;
                    
                case 'message':
                    if (!value) {
                        errorMessage = 'Message is required';
                        isValid = false;
                    } else if (value.length < 10) {
                        errorMessage = 'Message must be at least 10 characters';
                        isValid = false;
                    }
                    break;
            }

            errorElement.textContent = errorMessage;
            field.style.borderColor = isValid ? '' : 'var(--color-error)';
            
            return isValid;
        }

        function clearError(field) {
            const fieldName = field.name || field.id;
            const errorElement = document.getElementById(fieldName + '-error');
            if (errorElement) {
                errorElement.textContent = '';
            }
            field.style.borderColor = '';
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function handleFormSubmission() {
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            let isFormValid = true;

            // Validate all fields first
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                showNotification('Please correct the errors above', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('span');
            const btnLoading = submitBtn.querySelector('.btn-loading');

            // Show loading state
            if (btnText && btnLoading) {
                btnText.style.display = 'none';
                btnLoading.style.display = 'flex';
            }
            submitBtn.disabled = true;

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Simulate form processing
            setTimeout(() => {
                try {
                    // Create mailto link
                    const subject = encodeURIComponent(`Portfolio Contact: ${data.subject}`);
                    const body = encodeURIComponent(
                        `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
                    );
                    const mailtoLink = `mailto:kandalajayanth401@gmail.com?subject=${subject}&body=${body}`;
                    
                    // Open email client
                    window.location.href = mailtoLink;
                    
                    // Reset form and show success
                    contactForm.reset();
                    showNotification('✅ Message prepared successfully! Your email client should open.', 'success');
                    
                    // Clear all error messages
                    const errorElements = contactForm.querySelectorAll('.error-message');
                    errorElements.forEach(element => element.textContent = '');
                    
                    // Reset field styles
                    inputs.forEach(input => input.style.borderColor = '');
                    
                } catch (error) {
                    console.error('Error:', error);
                    showNotification('❌ Error preparing message. Please try again.', 'error');
                }

                // Reset button state
                if (btnText && btnLoading) {
                    btnText.style.display = 'block';
                    btnLoading.style.display = 'none';
                }
                submitBtn.disabled = false;
            }, 1000);
        }
    }

    // Fixed Back to Top Button
    function initializeBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        
        if (!backToTop) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
                backToTop.style.display = 'block';
            } else {
                backToTop.classList.remove('show');
                if (!backToTop.classList.contains('show')) {
                    setTimeout(() => {
                        if (!backToTop.classList.contains('show')) {
                            backToTop.style.display = 'none';
                        }
                    }, 300);
                }
            }
        });

        // Fixed scroll to top functionality
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth' 
            });
            
            // Update active nav to home
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
            
            // Visual feedback
            this.style.transform = 'translateY(-5px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }

    // Enhanced Scroll Animations
    function initializeScrollAnimations() {
        // Fade in animation for sections
        const sections = document.querySelectorAll('.section');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Enhanced skill bars animation for new layout
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkillBars();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            skillsObserver.observe(skillsSection);
        }

        function animateSkillBars() {
            const skillCategories = document.querySelectorAll('.skill-category');
            
            skillCategories.forEach((category, categoryIndex) => {
                const skillBars = category.querySelectorAll('.skill-progress');
                
                skillBars.forEach((bar, skillIndex) => {
                    // Reset width first
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        if (width) {
                            bar.style.width = width + '%';
                        }
                    }, (categoryIndex * 200) + (skillIndex * 150) + 500);
                });
            });
        }

        // Enhanced photo hover animation
        const photoContainer = document.querySelector('.photo-container');
        if (photoContainer) {
            photoContainer.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-0.75rem) scale(1.03) rotate(1deg)';
            });
            
            photoContainer.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            });
        }
    }

    // Enhanced notification system
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);

        // Allow manual close
        notification.addEventListener('click', function() {
            this.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => {
                if (this.parentNode) {
                    this.remove();
                }
            }, 300);
        });
    }

    // Handle browser resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768) {
                const navToggle = document.getElementById('nav-toggle');
                const navMenu = document.getElementById('nav-menu');
                
                if (navToggle && navMenu) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        }, 250);
    });

    // Enhanced interactivity for skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-0.75rem)';
            this.style.boxShadow = '0 12px 40px rgba(31, 184, 205, 0.15)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-0.5rem) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced button interactions with ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                z-index: 1;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Enhanced skill item interactions
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const skillProgress = this.querySelector('.skill-progress');
            if (skillProgress) {
                skillProgress.style.filter = 'brightness(1.2) saturate(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const skillProgress = this.querySelector('.skill-progress');
            if (skillProgress) {
                skillProgress.style.filter = '';
            }
        });
    });

    // Add required animations CSS
    if (!document.getElementById('dynamic-animations')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animations';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            @keyframes slideOutRight {
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            .notification {
                cursor: pointer;
                user-select: none;
            }
            .notification:hover {
                transform: translateX(-5px);
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize page load
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        // Set initial active nav link
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
        
        console.log('✅ Enhanced portfolio loaded successfully with improved skills section and photo integration!');
        showNotification('🚀 Enhanced portfolio loaded! New skills layout and photo section are ready.', 'success');
    });

    console.log('🔧 All enhanced features initialized successfully!');
});