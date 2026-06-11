/**
 * Animations Module
 * Handles scroll-triggered animations and entrance effects
 * Low Coupling: No DOM dependencies, uses Intersection Observer
 */
export class ScrollAnimator {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px',
            ...options
        };

        this.observer = null;
        this.animatedElements = [];
    }

    init(selector = '.animate-on-scroll') {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after animation
                    // this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: this.options.threshold,
            rootMargin: this.options.rootMargin
        });

        document.querySelectorAll(selector).forEach(el => {
            this.observer.observe(el);
            this.animatedElements.push(el);
        });
    }

    destroy() {
        if (this.observer) {
            this.animatedElements.forEach(el => {
                this.observer.unobserve(el);
            });
            this.observer.disconnect();
        }
    }
}

/**
 * Typing Effect
 * Creates typewriter animation for text
 */
export class TypingEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = options.typingSpeed || 100;
        this.deletingSpeed = options.deletingSpeed || 50;
        this.pauseDuration = options.pauseDuration || 2000;
        this.cursorChar = options.cursorChar || '|';

        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            delay = this.pauseDuration;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            delay = 500;
        }

        setTimeout(() => this.type(), delay);
    }
}

/**
 * Parallax Effect
 * Creates subtle parallax scrolling
 */
export class ParallaxEffect {
    constructor(elements, options = {}) {
        this.elements = elements;
        this.speed = options.speed || 0.5;
        this ticking = false;

        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.update();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    update() {
        const scrollY = window.pageYOffset;

        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const offsetTop = rect.top + scrollY;
            const distance = scrollY - offsetTop;

            el.style.transform = `translateY(${distance * this.speed}px)`;
        });
    }
}

export default { ScrollAnimator, TypingEffect, ParallaxEffect };