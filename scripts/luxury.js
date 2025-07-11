// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Set initial states for elements that should be visible
    gsap.set(".hero__logo", { opacity: 1 });
    gsap.set(".hero__tagline-line", { opacity: 1 });
    gsap.set(".hero__cta", { opacity: 1 });
    gsap.set(".hero__watch", { opacity: 1 });
    gsap.set(".hero__scroll-indicator", { opacity: 1 });

    initializeAnimations();
    initializeInteractions();
});

function initializeAnimations() {
    // Hero Section Animations
    const heroTimeline = gsap.timeline();

    // Hero logo fade in
    heroTimeline.from(".hero__logo", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
    });

    // Hero tagline lines stagger
    heroTimeline.from(
        ".hero__tagline-line",
        {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.3,
            ease: "power2.out",
        },
        "-=0.5",
    );

    // Hero CTA button
    heroTimeline.from(
        ".hero__cta",
        {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
        },
        "-=0.3",
    );

    // Hero watch image
    heroTimeline.from(
        ".hero__watch",
        {
            opacity: 0,
            scale: 0.8,
            duration: 1.2,
            ease: "power2.out",
        },
        "-=1",
    );

    // Hero scroll indicator
    heroTimeline.from(
        ".hero__scroll-indicator",
        {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
        },
        "-=0.5",
    );

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
                        counter.textContent,
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
        end: "bottom top",
        onToggle: (self) => {
            if (self.isActive) {
                gsap.to(".navbar", {
                    background: "rgba(13, 20, 33, 0.98)",
                    duration: 0.3,
                });
            } else {
                gsap.to(".navbar", {
                    background: "rgba(13, 20, 33, 0.95)",
                    duration: 0.3,
                });
            }
        },
    });
}

function initializeInteractions() {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll(".navbar__link").forEach((link) => {
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

    // Newsletter Form Submission
    const newsletterForm = document.querySelector(".newsletter__form");
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

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector(".navbar__toggle");
    const navbarMenu = document.querySelector(".navbar__menu");
    let isMenuOpen = false;

    if (mobileToggle) {
        mobileToggle.addEventListener("click", function () {
            isMenuOpen = !isMenuOpen;

            if (isMenuOpen) {
                gsap.to(navbarMenu, {
                    display: "flex",
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            } else {
                gsap.to(navbarMenu, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        navbarMenu.style.display = "none";
                    },
                });
            }
        });
    }

    // Interactive Watch Preview
    const detailPoints = document.querySelectorAll(".detail-point");
    detailPoints.forEach((point) => {
        point.addEventListener("mouseenter", function () {
            gsap.to(this.querySelector(".detail-point__info"), {
                opacity: 1,
                visibility: "visible",
                y: -10,
                duration: 0.3,
                ease: "power2.out",
            });
        });

        point.addEventListener("mouseleave", function () {
            gsap.to(this.querySelector(".detail-point__info"), {
                opacity: 0,
                visibility: "hidden",
                y: 0,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    });

    // Footer Social Links Hover Effect
    document.querySelectorAll(".footer__social-link").forEach((link) => {
        link.addEventListener("mouseenter", function () {
            gsap.to(this, {
                scale: 1.1,
                rotationY: 180,
                duration: 0.3,
                ease: "power2.out",
            });
        });

        link.addEventListener("mouseleave", function () {
            gsap.to(this, {
                scale: 1,
                rotationY: 0,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    });

    // Scroll-triggered Watch Rotation (Interactive Preview)
    if (document.querySelector(".watch-preview__image")) {
        gsap.to(".watch-preview__image", {
            scrollTrigger: {
                trigger: ".interactive-preview",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            rotation: 15,
            ease: "none",
        });
    }

    // Background Color Transitions Between Sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onToggle: (self) => {
                if (self.isActive) {
                    // Add any section-specific animations or effects here
                    console.log(`Section ${index + 1} is active`);
                }
            },
        });
    });
}

// Utility function for number animation
function animateNumber(element, target, duration = 2) {
    const obj = { value: 0 };
    gsap.to(obj, {
        value: target,
        duration: duration,
        ease: "power2.out",
        onUpdate: function () {
            element.textContent = Math.ceil(obj.value).toLocaleString();
        },
    });
}

// Refresh ScrollTrigger on window resize
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});

// Preloader (optional)
window.addEventListener("load", function () {
    gsap.to(".preloader", {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
            const preloader = document.querySelector(".preloader");
            if (preloader) {
                preloader.style.display = "none";
            }
        },
    });
});
