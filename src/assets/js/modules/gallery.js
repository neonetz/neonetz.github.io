/**
 * Gallery Module
 * Handles image gallery slider and lightbox
 * Low Coupling: Accepts container element as dependency
 */
export class Gallery {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            autoplay: options.autoplay || false,
            autoplayInterval: options.autoplayInterval || 5000,
            ...options
        };

        this.slides = container.querySelectorAll('.gallery-slide');
        this.prevBtn = container.querySelector('.gallery-nav.prev');
        this.nextBtn = container.querySelector('.gallery-nav.next');
        this.dots = container.querySelectorAll('.gallery-dot');
        this.slidesContainer = container.querySelector('.gallery-slides');

        this.currentIndex = 0;
        this.autoplayTimer = null;

        this.init();
    }

    init() {
        if (this.slides.length === 0) return;

        this.bindEvents();

        if (this.options.autoplay) {
            this.startAutoplay();
        }
    }

    bindEvents() {
        // Navigation buttons
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Dot indicators
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goTo(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.stopAutoplay();
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }

            if (this.options.autoplay) {
                this.startAutoplay();
            }
        }, { passive: true });
    }

    goTo(index) {
        this.currentIndex = index;

        if (this.currentIndex < 0) {
            this.currentIndex = this.slides.length - 1;
        } else if (this.currentIndex >= this.slides.length) {
            this.currentIndex = 0;
        }

        this.updateUI();
    }

    prev() {
        this.goTo(this.currentIndex - 1);
    }

    next() {
        this.goTo(this.currentIndex + 1);
    }

    updateUI() {
        // Update slides position
        if (this.slidesContainer) {
            this.slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }

        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayTimer = setInterval(() => this.next(), this.options.autoplayInterval);
    }

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }
}

export default Gallery;