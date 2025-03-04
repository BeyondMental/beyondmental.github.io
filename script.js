// Main JavaScript functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
            // Hide header when scrolling down, show when scrolling up
            if (window.scrollY > lastScrollY) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('header-scrolled');
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Project hover effects with preloading
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const projectLink = project.querySelector('.project-link');
        const projectImage = project.querySelector('.project-image');
        const projectVideo = project.querySelector('.project-video');
        const projectOverlay = project.querySelector('.project-overlay');

        // Preload videos
        if (projectVideo) {
            projectVideo.preload = 'metadata';
            
            // Load full video after metadata loaded
            projectVideo.addEventListener('loadedmetadata', function() {
                projectVideo.preload = 'auto';
            });
        }

        project.addEventListener('mouseenter', () => {
            if (projectVideo) {
                projectVideo.style.display = 'block';
                projectVideo.play().catch(error => {
                    console.log('Video autoplay not allowed', error);
                });
            }
            if (projectOverlay) {
                projectOverlay.style.opacity = '1';
                projectOverlay.style.transform = 'translateY(0)';
            }
        });

        project.addEventListener('mouseleave', () => {
            if (projectVideo) {
                projectVideo.style.display = 'none';
                projectVideo.pause();
                projectVideo.currentTime = 0;
            }
            if (projectOverlay) {
                projectOverlay.style.opacity = '0';
                projectOverlay.style.transform = 'translateY(20px)';
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile navigation
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('.right-content ul');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && 
                !e.target.closest('.right-content') && 
                !e.target.closest('.hamburger-menu')) {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-in');
    
    function checkScroll() {
        animateElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    
    // Run once on page load
    checkScroll();
    
    // Then on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                checkScroll();
                scrollTimeout = null;
            }, 100);
        }
    });

    // Lazy loading for images and videos
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('.lazy');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Active link highlighting
    function setActiveLink() {
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            
            if (currentLocation.endsWith(linkPath) || 
                (linkPath === 'index.html' && (currentLocation === '/' || currentLocation.endsWith('/')))) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveLink();

    // Background video optimization
    const backgroundVideo = document.getElementById('background-video');
    if (backgroundVideo) {
        // Pause the video when not in viewport to save resources
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                backgroundVideo.pause();
            } else {
                backgroundVideo.play().catch(error => {
                    console.log('Background video autoplay not allowed', error);
                });
            }
        });

        // Reduce quality on mobile devices
        if (window.innerWidth < 768) {
            backgroundVideo.setAttribute('playbackRate', '0.5');
        }
    }

    // Skills bar animation with marquee effect
    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        const skills = skillsContainer.querySelectorAll('.skill-tag');
        
        // Clone skills for continuous flow
        [...skills].forEach(skill => {
            const clone = skill.cloneNode(true);
            skillsContainer.appendChild(clone);
        });
    }
});

// Optimize loading of the page
window.addEventListener('load', () => {
    // Remove loading indicator if exists
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
});

// Add resize handler for responsive adjustments
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Adjust video background size
        const backgroundVideo = document.getElementById('background-video');
        if (backgroundVideo && window.innerWidth < 768) {
            backgroundVideo.setAttribute('playbackRate', '0.5');
        } else if (backgroundVideo) {
            backgroundVideo.setAttribute('playbackRate', '1');
        }
    }, 250);
});
