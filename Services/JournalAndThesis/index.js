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
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDjFID6_z3LDB6lYxv1SdT3z7y3DoKcSBs",
    authDomain: "chasetech-demo.firebaseapp.com",
    projectId: "chasetech-demo",
    storageBucket: "chasetech-demo.firebasestorage.app",
    messagingSenderId: "7511830280",
    appId: "1:7511830280:web:e0cb013de55b3a626c46bd",
    measurementId: "G-Q522F9Z03D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to fetch and display blog posts
function fetchBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    
    // Clear existing posts
    blogPostsContainer.innerHTML = '';
    
    // Fetch posts from Firebase
    database.ref('JournalAndThesis').once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                // Array to store posts
                const posts = [];
                
                snapshot.forEach((childSnapshot) => {
                    const postId = childSnapshot.key;
                    const post = childSnapshot.val();
                    
                    // Add key to post object
                    post.id = postId;
                    
                    // Add to posts array
                    posts.push(post);
                });
                
                // Sort by date (newest first)
                posts.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                // Display posts
                if (posts.length > 0) {
                    posts.forEach(displayBlogPost);
                } else {
                    blogPostsContainer.innerHTML = '<p class="text-center">No blog posts yet. Create your first one!</p>';
                }
            } else {
                blogPostsContainer.innerHTML = '<p class="text-center">No blog posts yet. Create your first one!</p>';
            }
        })
        .catch((error) => {
            console.error('Error fetching blog posts: ', error);
            blogPostsContainer.innerHTML = '<p class="text-center">Error loading blog posts. Please try again later.</p>';
        });
}

// Function to display a single blog post with new CSS classes
function displayBlogPost(post) {
    const blogPostsContainer = document.getElementById('blogPosts');
    
    // Create blog post element
    const postElement = document.createElement('div');
    postElement.className = 'blog-post';
    postElement.dataset.postId = post.id;
    
    // Format date
    const postDate = new Date(post.date);
    const formattedDate = postDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Construct image URL
    const imageUrl = `https://raw.githubusercontent.com/thozhilali/thozhilali/main/${post.image}`;
    
    // Set post content
    postElement.innerHTML = `
        <img src="${imageUrl}" alt="${post.title}" class="blog-image">
        <div class="blog-content">
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-text">${post.content}</p>
            <div class="blog-meta">
                <div class="blog-date-icon">📅</div>
                <span class="blog-date">${formattedDate}</span>
            </div>
        </div>
    `;
    
    // Add to container
    blogPostsContainer.appendChild(postElement);
}



// Load blog posts when page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchBlogPosts();
    // Uncomment below if you want delete functionality
    // setupDeleteButtons();
});