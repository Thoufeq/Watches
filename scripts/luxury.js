// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    initializeAnimations();
    initializeInteractions();
});

function initializeAnimations() {
    // --- START: Hero Animation ---
    const heroContent = document.querySelector(".hero__content");

    // 1. Animate the hero content IN on page load (visible before scrolling)
    gsap.fromTo(heroContent, 
        { opacity: 0, y: 50 }, // Initial state (invisible)
        { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: 'power2.out', 
            delay: 0.3
        }
    );

    // --- END: Hero Animation ---


    // Collections Cards Animation
    gsap.fromTo(
        ".collection-card",
        {
            opacity: 0,
            y: 50,
        },
        {
            scrollTrigger: {
                trigger: ".collections",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
        },
    );

    // Timeline Items Animation
    gsap.fromTo(
        ".timeline__item",
        {
            opacity: 0,
            x: (index) => (index % 2 === 0 ? -50 : 50),
        },
        {
            scrollTrigger: {
                trigger: ".timeline",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "power2.out",
        },
    );

    // Timeline Line Progressive Animation
    gsap.fromTo(
        ".timeline__line",
        {
            scaleY: 0,
            transformOrigin: "top center",
        },
        {
            scrollTrigger: {
                trigger: ".timeline",
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
            },
            scaleY: 1,
            duration: 2,
            ease: "none",
        },
    );

    // Craftsmanship Section Animation
    gsap.fromTo(
        ".craftsmanship__content",
        {
            opacity: 0,
            x: -30,
        },
        {
            scrollTrigger: {
                trigger: ".craftsmanship",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
        },
    );

    gsap.fromTo(
        ".craftsmanship__video",
        {
            opacity: 0,
            x: 30,
        },
        {
            scrollTrigger: {
                trigger: ".craftsmanship",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
        },
    );

    // Counter Animation for Stats
    const counters = document.querySelectorAll(".stat__number");
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));

        gsap.fromTo(
            counter,
            {
                textContent: 0,
            },
            {
                scrollTrigger: {
                    trigger: counter,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                    counter.textContent = Math.ceil(
                        this.targets()[0].textContent
                    ).toLocaleString();
                },
            },
        );
    });

    // Testimonials Animation
    gsap.fromTo(
        ".testimonial-card",
        {
            opacity: 0,
            y: 30,
        },
        {
            scrollTrigger: {
                trigger: ".testimonials",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
        },
    );

    // Interactive Preview Animation
    gsap.fromTo(
        ".watch-preview",
        {
            opacity: 0,
            scale: 0.8,
        },
        {
            scrollTrigger: {
                trigger: ".interactive-preview",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
        },
    );

    // Shop Cards Animation
    gsap.fromTo(
        ".shop-card",
        {
            opacity: 0,
            y: 30,
        },
        {
            scrollTrigger: {
                trigger: ".shop",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "power2.out",
        },
    );

    // Parallax Effect for Hero Watch
    gsap.to(".hero__watch-image", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
        },
        y: -100,
        ease: "none",
    });

    // Navbar Background on Scroll
    ScrollTrigger.create({
        trigger: ".hero",
        start: "bottom top",
        onEnter: () => gsap.to(".navbar", { 
            backgroundColor: "rgba(13, 20, 33, 0.85)", 
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            duration: 0.3 
        }),
        onLeaveBack: () => gsap.to(".navbar", { 
            backgroundColor: "rgba(13, 20, 33, 0.95)",
            boxShadow: "none",
            duration: 0.3
        }),
    });
}

function initializeInteractions() {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll(".navbar__link, .mobile-nav-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80,
                    },
                    ease: "power2.inOut",
                });
            }
        });
    });

    // Hero CTA Button Click Effect
    const heroCTA = document.querySelector(".hero__cta");
    heroCTA.addEventListener("click", function () {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: ".collections",
                offsetY: 80,
            },
            ease: "power2.inOut",
        });
    });

    // Collection Card Hover Effects
    document.querySelectorAll(".collection-card").forEach((card) => {
        card.addEventListener("mouseenter", function () {
            gsap.to(this.querySelector(".collection-card__image"), {
                scale: 1.1,
                duration: 0.6,
                ease: "power2.out",
            });
        });

        card.addEventListener("mouseleave", function () {
            gsap.to(this.querySelector(".collection-card__image"), {
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
            });
        });
    });

    // Newsletter Form Animation
    const newsletterInput = document.querySelector(".newsletter__input");
    const newsletterBorder = document.querySelector(
        ".newsletter__input-border",
    );

    if (newsletterInput) {
        newsletterInput.addEventListener("focus", function () {
            gsap.to(newsletterBorder, {
                width: "100%",
                duration: 0.3,
                ease: "power2.out",
            });
        });

        newsletterInput.addEventListener("blur", function () {
            if (!this.value) {
                gsap.to(newsletterBorder, {
                    width: "0%",
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector(".newsletter__form");
    if(newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector(".newsletter__submit");
            const originalText = submitBtn.textContent;

            gsap.to(submitBtn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
            });

            // Simulate form submission
            submitBtn.textContent = "Subscribing...";
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = "Subscribed!";
                newsletterInput.value = "";

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector(".navbar__toggle");
    const navbarMenu = document.querySelector(".navbar__menu");
    let isMenuOpen = false;

    if (mobileToggle && navbarMenu) {
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        const mobileMenuContent = document.createElement('div');
        mobileMenuContent.classList.add('mobile-menu-content');
        
        const mobileNav = navbarMenu.cloneNode(true);
        mobileNav.style.display = 'flex';
        mobileNav.style.flexDirection = 'column';
        mobileNav.style.gap = '0';
        
        Array.from(mobileNav.children).forEach(item => {
            const link = item.querySelector('a');
            link.classList.remove('navbar__link');
            link.classList.add('mobile-nav-link');
            mobileMenuContent.appendChild(link);
        });

        mobileMenu.appendChild(mobileMenuContent);
        document.body.appendChild(mobileMenu);

        gsap.set(mobileMenu, { left: '-100%' });

        mobileToggle.addEventListener("click", function () {
            isMenuOpen = !isMenuOpen; // Corrected typo here
            this.classList.toggle('mobile-active');

            if (isMenuOpen) {
                gsap.to(mobileMenu, {
                    left: "0%",
                    duration: 0.4,
                    ease: "power2.out",
                });
            } else {
                gsap.to(mobileMenu, {
                    left: "-100%",
                    duration: 0.3,
                    ease: "power2.in",
                });
            }
        });
        
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                 if (isMenuOpen) {
                    isMenuOpen = false;
                    mobileToggle.classList.remove('mobile-active');
                    gsap.to(mobileMenu, {
                        left: "-100%",
                        duration: 0.3,
                        ease: "power2.in",
                    });
                }
            });
        });
    }
}
