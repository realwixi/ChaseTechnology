document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Change icon based on menu state
        const icon = mobileMenuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Handle Dropdown Menus on Mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        // For mobile view only
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Update chevron icon
                const icon = this.querySelector('i');
                if (dropdown.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    });
    
    // NEW CODE: Handle regular nav links in mobile view
    const regularNavLinks = document.querySelectorAll('#nav-links > li:not(.dropdown) > a');
    
    regularNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // If it's a same-page link (like an anchor)
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    // Get the target element and scroll to it
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({behavior: 'smooth'});
                    }
                }
                
                // Close the mobile menu after clicking
                navLinks.classList.remove('active');
                
                // Reset the menu toggle icon
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Also handle links inside dropdown menus
    const dropdownLinks = document.querySelectorAll('.dropdown-menu a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Close the mobile menu after clicking a dropdown item
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    
                    // Reset the menu toggle icon
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    
                    // Reset all dropdown menus to closed state
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove('active');
                        const dropdownIcon = dropdown.querySelector('a i');
                        if (dropdownIcon) {
                            dropdownIcon.classList.remove('fa-chevron-up');
                            dropdownIcon.classList.add('fa-chevron-down');
                        }
                    });
                }, 100); // Small delay to allow the click to register
            }
        });
    });
});

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Testimonial Slider (for mobile view)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    function showTestimonial(index) {
        // Only activate for mobile views
        if (window.innerWidth <= 768) {
            testimonials.forEach(card => {
                card.style.display = 'none';
            });
            testimonials[index].style.display = 'block';
        } else {
            testimonials.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
    
    // Initialize testimonial display based on screen size
    function initTestimonials() {
        if (window.innerWidth <= 768) {
            showTestimonial(currentTestimonial);
        } else {
            testimonials.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
    
    // Add navigation buttons for testimonials on mobile
    function setupTestimonialNav() {
        if (document.querySelector('.testimonial-nav')) return;
        
        const testimonialsSection = document.querySelector('.testimonials .container');
        const navDiv = document.createElement('div');
        navDiv.className = 'testimonial-nav';
        navDiv.innerHTML = `
            <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
            <div class="dots-container"></div>
            <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        testimonialsSection.appendChild(navDiv);
        
        // Add dots
        const dotsContainer = document.querySelector('.dots-container');
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.className = i === currentTestimonial ? 'dot active' : 'dot';
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
        }
        
        // Add event listeners for navigation
        document.querySelector('.prev-btn').addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            showTestimonial(currentTestimonial);
            updateDots();
        });
        
        document.querySelector('.next-btn').addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
            updateDots();
        });
        
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                currentTestimonial = parseInt(dot.dataset.index);
                showTestimonial(currentTestimonial);
                updateDots();
            });
        });
    }
    
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.className = index === currentTestimonial ? 'dot active' : 'dot';
        });
    }
    
    // Check if we're on mobile and setup accordingly
    if (window.innerWidth <= 768) {
        setupTestimonialNav();
    }
    
    initTestimonials();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.testimonial-nav')) {
                setupTestimonialNav();
            }
            showTestimonial(currentTestimonial);
        } else {
            initTestimonials();
        }
    });

    // Add animations when elements come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .about-content, .testimonial-card, .cta');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check on page load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Form validation for contact form (if exists)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Here you would typically send the form data to your server
                // For now, we'll just show a success message
                const formContainer = contactForm.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank you for contacting us!</h3>
                        <p>We've received your message and will get back to you shortly.</p>
                    </div>
                `;
            }
        });
        
        // Remove error class on input focus
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        });
    }

    // Add "Back to Top" button when scrolled down
    const createBackToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.className = 'back-to-top';
        document.body.appendChild(button);
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        });
    };
    
    createBackToTopButton();

    // Add CSS for new dynamic elements
    const addDynamicStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .scrolled {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                background: rgba(255, 255, 255, 0.95);
            }
            
            .testimonial-nav {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 30px;
            }
            
            .prev-btn, .next-btn {
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .prev-btn:hover, .next-btn:hover {
                background: var(--secondary-color);
            }
            
            .dots-container {
                display: flex;
                margin: 0 15px;
            }
            
            .dot {
                width: 10px;
                height: 10px;
                background: #ccc;
                border-radius: 50%;
                margin: 0 5px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .dot.active {
                background: var(--primary-color);
            }
            
            .animate {
                animation: fadeInUp 0.8s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .error {
                border-color: #ff3860 !important;
            }
            
            .success-message {
                text-align: center;
                padding: 40px;
            }
            
            .success-message i {
                color: #23d160;
                font-size: 3rem;
                margin-bottom: 20px;
            }
            
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                border: none;
                box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .back-to-top.show {
                opacity: 1;
                visibility: visible;
            }
            
            .back-to-top:hover {
                background: var(--secondary-color);
                transform: translateY(-3px);
            }
            
            @media (max-width: 768px) {
                .testimonial-card {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    addDynamicStyles();


// marquee
document.addEventListener('DOMContentLoaded', function() {
    // Get the marquee content element
    const marqueeContent = document.querySelector('.marquee-content');
    
    // Adjust animation speed based on screen width
    function adjustMarqueeSpeed() {
        const windowWidth = window.innerWidth;
        let duration;
        
        if (windowWidth <= 576) {
            // Mobile devices
            duration = '20s';
        } else if (windowWidth <= 992) {
            // Tablets
            duration = '25s';
        } else {
            // Desktops
            duration = '30s';
        }
        
        marqueeContent.style.animationDuration = duration;
    }
    
    // Run on page load
    adjustMarqueeSpeed();
    
    // Run on window resize
    window.addEventListener('resize', adjustMarqueeSpeed);
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Create an observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Pause animation when not in viewport to improve performance
                if (entry.isIntersecting) {
                    marqueeContent.style.animationPlayState = 'running';
                } else {
                    marqueeContent.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0.1 });
        
        // Observe the marquee
        observer.observe(document.querySelector('.journal-logos-marquee'));
    }
    
    // Function to handle touch events for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }
    
    function handleTouchMove(event) {
        touchEndX = event.touches[0].clientX;
    }
    
    function handleTouchEnd() {
        const touchDiff = touchStartX - touchEndX;
        
        // If swiped left, speed up marquee temporarily
        if (touchDiff > 50) {
            marqueeContent.style.animationDuration = '10s';
            setTimeout(() => adjustMarqueeSpeed(), 5000);
        }
        
        // If swiped right, slow down marquee temporarily
        if (touchDiff < -50) {
            marqueeContent.style.animationDuration = '50s';
            setTimeout(() => adjustMarqueeSpeed(), 5000);
        }
    }
    
    // Add touch event listeners
    const marqueeContainer = document.querySelector('.journal-logos-marquee');
    marqueeContainer.addEventListener('touchstart', handleTouchStart);
    marqueeContainer.addEventListener('touchmove', handleTouchMove);
    marqueeContainer.addEventListener('touchend', handleTouchEnd);
    
    // Preload images for smooth animation
    function preloadImages() {
        const images = document.querySelectorAll('.marquee-item img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src) {
                const newImg = new Image();
                newImg.src = src;
            }
        });
    }
    
    preloadImages();
});