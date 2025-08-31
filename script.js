gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.showcase-section');
    const firstSection = sections[0];
    const firstVideo = firstSection.querySelector('video');
    const exploreButton = document.getElementById('explore-luxury');
    
    exploreButton.addEventListener('click', () => {
        window.location.href = './pages/luxury.html';
    });
    
    firstVideo.play().catch(error => {
        console.log("Video play failed:", error);
    });

    // Define different transition positions for each section
    const transitions = [
        { clipPath: "circle(0% at 50% 100%)" },    // First: bottom center
        { clipPath: "circle(0% at 0% 0%)" },       // Second: top left
        { clipPath: "circle(0% at 100% 50%)" },    // Third: right center
        { clipPath: "circle(0% at 50% 0%)" }       // Fourth: top center
    ];

    sections.forEach((section, index) => {
        const background = section.querySelector('.fixed-background');
        const content = section.querySelector('.content');
        const video = section.querySelector('video');

        if (index !== 0) {
            video.pause();
        }

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "center center",
                scrub: 0.5,
                toggleActions: "play reverse play reverse",
                onEnter: () => {
                    video.play();
                    if (index > 0) {
                        const prevContent = sections[index - 1].querySelector('.content');
                        gsap.to(prevContent, {
                            opacity: 0,
                            scale: 0.8,
                            duration: 0.5,
                            ease: "power2.out"
                        });
                    }
                },
                onLeaveBack: () => {
                    if (index !== 0) {
                        video.pause();
                    }
                    if (index > 0) {
                        const prevContent = sections[index - 1].querySelector('.content');
                        gsap.to(prevContent, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.5,
                            ease: "power2.in"
                        });
                    }
                }
            }
        });

        // Apply different transitions based on section index
        tl.fromTo(background, 
            { ...transitions[index] },
            { clipPath: "circle(150% at 50% 50%)", duration: 1 }
        )
        .fromTo(content,
            { opacity: 0, y: 100, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5 },
            "-=0.5"
        );
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.showcase-section');
    const dots = document.querySelectorAll('.section-nav li');

    const setActiveDot = () => {
        const currentScroll = window.scrollY;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (currentScroll >= sectionTop - sectionHeight / 3) {
                dots.forEach(dot => dot.classList.remove('active'));
                dots[index].classList.add('active');
            }
        });
    };

    // Update dots on scroll
    window.addEventListener('scroll', setActiveDot);
    
    // Click on dot to navigate to section
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionId = dot.getAttribute('data-section');
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Don't unobserve to keep the animation state
            }
        });
    }, {
        threshold: 0.2 // 20% of the section needs to be visible
    });

    // Observe all section content
    document.querySelectorAll('.content').forEach(content => {
        observer.observe(content);
    });
});


// Add to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuBtn?.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav?.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav?.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});
