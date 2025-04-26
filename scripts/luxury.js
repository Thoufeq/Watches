gsap.registerPlugin(ScrollTrigger);
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000;
    function updateCarousel() {
        carousel.style.transition = 'transform 0.5s ease-in-out';
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;  

        dots.forEach((dot, index) => {
            dot.classList.remove('active', 'dot-timer');
            if (index === currentSlide) {
                requestAnimationFrame(() => {
                    dot.classList.add('active');
                    void dot.offsetWidth;
                    dot.classList.add('dot-timer');
                });
            }
        });
    }
    function nextSlide() {
        if (currentSlide === slides.length - 1) {
            // When at last slide, prepare to loop to first
        carousel.style.transition = 'transform 0.5s ease-in-out';
            currentSlide = 0;
            carousel.style.transform = 'translateX(0)';
            void carousel.offsetWidth; // Force reflow
            carousel.style.transition = 'transform 0.5s ease-in-out';
        } else {
            currentSlide++;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentSlide === 0) {
            // When at first slide, prepare to loop to last
            carousel.style.transition = 'transform 0.5s ease-in-out';
            currentSlide = slides.length - 1;
            carousel.style.transform = `translateX(-${(slides.length - 1) * 100}%)`;
            void carousel.offsetWidth; // Force reflow
            carousel.style.transition = 'transform 0.5s ease-in-out';
        } else {
            currentSlide--;
        }
        updateCarousel();
    }

    function startSlideShow() {
        stopSlideShow();
        updateCarousel();
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    // Navigation handlers
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideShow();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            startSlideShow();
        });
    });

    // Initialize slideshow
    updateCarousel();
    startSlideShow();

    // Fix: Correct parallax effect for all slides
    window.addEventListener('mousemove', (e) => {
        slides.forEach(slide => {
            const parallaxImage = slide.querySelector('.parallax-img');
            const content = slide.querySelector('.content');
            
            const xPos = (e.clientX * -0.3 / 8);
            const yPos = (e.clientY * -0.3 / 8);

            if (parallaxImage && content) {
                parallaxImage.style.transform = `translate(${xPos}px, ${yPos}px)`;
                content.style.transform = `translate(${xPos * 0.5}px, calc(-50% + ${yPos * 0.5}px))`;
            }
        });
    });

    // Watch card animations (matching class names from luxury.html)
    const cards = document.querySelectorAll('.watch-card');
    
    cards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const xPos = (e.clientX - rect.left) / rect.width - 0.5;
            const yPos = (e.clientY - rect.top) / rect.height - 0.5;
            
            gsap.to(card, {
                rotateY: xPos * 20,
                rotateX: -yPos * 20,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
});

// GSAP animations for section3 theory heading
gsap.utils.toArray("#section3 .theory h1").forEach((heading) => {
    gsap.fromTo(
        heading,
        {
            x: "100vw",
            color: "gray",
            filter: "blur(50px)",
            opacity: 1,
        },
        {
            x: "0vw",
            color: "black",
            filter: "blur(0px)",
            opacity: 1,
            duration: 1.2,
            scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
            },
        }
    );
});

// GSAP timeline for about section
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".about-container",
        start: "top center",
        end: "bottom center",
        scrub: true,
    }
});

tl.fromTo(".about-text-box",
    {
        y: 100,
        opacity: 1
    },
    {
        y: 0,
        opacity: 1,
        ease: "power1.out"
    }
).to(".about-text-box",
    {
        y: -50,
        opacity: 1,
        ease: "power1.in"
    }
);

// Add brand grid animations
const brandCards = document.querySelectorAll('.brand-card');

brandCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power1.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power1.out"
        });
    });
});

// Contact form animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-us',
            start: "top 70%",
            end: "bottom bottom",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8
    });
}