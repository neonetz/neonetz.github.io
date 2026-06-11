/**
 * Main Bundle - All modules combined for direct script loading
 * This version works without ES modules (no server required)
 */

(function() {
    'use strict';

    // ==========================================================================
    // Particle System
    // ==========================================================================
    class ParticleSystem {
        constructor(canvas, options = {}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.animationId = null;

            this.options = {
                particleCount: options.particleCount || 80,
                particleColor: options.particleColor || '#6366f1',
                speed: options.speed || 0.5,
                size: options.size || 2,
                connectDistance: options.connectDistance || 150,
                ...options
            };

            this.resize();
            this.init();
            window.addEventListener('resize', () => {
                this.resize();
                this.init();
            });
        }

        init() {
            this.particles = [];
            for (let i = 0; i < this.options.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * this.options.speed,
                    vy: (Math.random() - 0.5) * this.options.speed,
                    size: Math.random() * this.options.size + 1,
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        update() {
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0) particle.x = this.canvas.width;
                if (particle.x > this.canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = this.canvas.height;
                if (particle.y > this.canvas.height) particle.y = 0;
            });
        }

        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach(particle => {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fillStyle = this.options.particleColor;
                this.ctx.globalAlpha = particle.opacity;
                this.ctx.fill();
                this.ctx.globalAlpha = 1;
            });

            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dx = this.particles[i].x - this.particles[j].x;
                    const dy = this.particles[i].y - this.particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.options.connectDistance) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.strokeStyle = this.options.particleColor;
                        this.ctx.globalAlpha = 1 - (distance / this.options.connectDistance);
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                        this.ctx.globalAlpha = 1;
                    }
                }
            }
        }

        animate() {
            this.update();
            this.draw();
            this.animationId = requestAnimationFrame(() => this.animate());
        }

        start() {
            if (!this.animationId) this.animate();
        }
    }

    // ==========================================================================
    // Scroll Animator
    // ==========================================================================
    class ScrollAnimator {
        constructor(options = {}) {
            this.observer = null;
            this.animatedElements = [];
            this.options = {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px'
            };
        }

        init(selector = '.animate-on-scroll') {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
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
    }

    // ==========================================================================
    // Typing Effect
    // ==========================================================================
    class TypingEffect {
        constructor(element, texts, options = {}) {
            this.element = element;
            this.texts = texts;
            this.currentTextIndex = 0;
            this.currentCharIndex = 0;
            this.isDeleting = false;
            this.typingSpeed = options.typingSpeed || 100;
            this.deletingSpeed = options.deletingSpeed || 50;
            this.pauseDuration = options.pauseDuration || 2000;
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

    // ==========================================================================
    // Navigation
    // ==========================================================================
    class Navigation {
        constructor(options = {}) {
            this.header = options.header;
            this.mobileNav = options.mobileNav;
            this.menuToggle = options.menuToggle;
            this.overlay = options.overlay;
            this.navLinks = options.navLinks || [];
            this.sections = options.sections || [];
            this.scrollThreshold = options.scrollThreshold || 100;
            this.isOpen = false;
            this.init();
        }

        init() {
            if (this.menuToggle) {
                this.menuToggle.addEventListener('click', () => this.toggle());
            }
            if (this.overlay) {
                this.overlay.addEventListener('click', () => this.close());
            }
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => this.close());
            });
            window.addEventListener('scroll', () => this.handleScroll());
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) this.close();
            });
        }

        toggle() {
            this.isOpen ? this.close() : this.open();
        }

        open() {
            this.isOpen = true;
            this.mobileNav?.classList.add('open');
            this.overlay?.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        close() {
            this.isOpen = false;
            this.mobileNav?.classList.remove('open');
            this.overlay?.classList.remove('active');
            document.body.style.overflow = '';
        }

        handleScroll() {
            if (this.header) {
                this.header.classList.toggle('scrolled', window.scrollY > this.scrollThreshold);
            }
            this.highlightActiveSection();
        }

        highlightActiveSection() {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    }

    // ==========================================================================
    // Music Controller
    // ==========================================================================
    class MusicController {
        constructor(options = {}) {
            this.audio = options.audio;
            this.toggle = options.toggle;
            this.audioSrc = options.src || '/mp3/WWBGM.mp3';
            this.isPlaying = false;
            this.rememberState = options.rememberState !== false;

            if (this.audio) {
                this.audio.src = this.audioSrc;
                this.audio.volume = 0.3;

                if (this.rememberState && localStorage.getItem('musicPlaying') === 'true') {
                    this.play();
                }
            }

            if (this.toggle) {
                this.toggle.addEventListener('click', () => this.toggle());
            }
        }

        play() {
            if (this.audio) {
                this.audio.play().then(() => {
                    this.isPlaying = true;
                    this.updateUI();
                    if (this.rememberState) localStorage.setItem('musicPlaying', 'true');
                }).catch(() => {});
            }
        }

        pause() {
            if (this.audio) {
                this.audio.pause();
                this.isPlaying = false;
                this.updateUI();
                if (this.rememberState) localStorage.setItem('musicPlaying', 'false');
            }
        }

        toggle() {
            this.isPlaying ? this.pause() : this.play();
        }

        updateUI() {
            if (this.toggle) {
                this.toggle.classList.toggle('playing', this.isPlaying);
            }
        }
    }

    // ==========================================================================
    // Gallery
    // ==========================================================================
    class Gallery {
        constructor(container, options = {}) {
            this.container = container;
            this.options = {
                autoplay: options.autoplay || false,
                autoplayInterval: options.autoplayInterval || 5000
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

            this.prevBtn?.addEventListener('click', () => this.prev());
            this.nextBtn?.addEventListener('click', () => this.next());

            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goTo(index));
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });

            let touchStartX = 0;
            this.container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                this.stopAutoplay();
            }, { passive: true });

            this.container.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? this.next() : this.prev();
                }
                if (this.options.autoplay) this.startAutoplay();
            }, { passive: true });

            if (this.options.autoplay) this.startAutoplay();
        }

        goTo(index) {
            this.currentIndex = index;
            if (this.currentIndex < 0) this.currentIndex = this.slides.length - 1;
            else if (this.currentIndex >= this.slides.length) this.currentIndex = 0;
            this.updateUI();
        }

        prev() { this.goTo(this.currentIndex - 1); }
        next() { this.goTo(this.currentIndex + 1); }

        updateUI() {
            if (this.slidesContainer) {
                this.slidesContainer.style.transform = `translateX(-${this.currentIndex * 100}%)`;
            }
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

    // ==========================================================================
    // App Initialization
    // ==========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        // Particle System
        const canvas = document.querySelector('.hero-canvas');
        if (canvas) {
            const particles = new ParticleSystem(canvas, {
                particleCount: 80,
                particleColor: '#6366f1',
                speed: 0.5,
                connectDistance: 150
            });
            particles.start();
        }

        // Scroll Animations
        const scrollAnimator = new ScrollAnimator({ threshold: 0.1 });
        scrollAnimator.init();

        // Typing Effect
        const typingElement = document.querySelector('.hero-subtitle');
        if (typingElement) {
            new TypingEffect(typingElement, [
                'A passionate developer',
                'Building digital experiences',
                'Turning ideas into reality',
                'Coding with purpose'
            ], {
                typingSpeed: 80,
                deletingSpeed: 40,
                pauseDuration: 2000
            });
        }

        // Navigation
        const header = document.querySelector('.header');
        const mobileNav = document.querySelector('.mobile-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const overlay = document.querySelector('.overlay');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        new Navigation({
            header, mobileNav, menuToggle, overlay, navLinks, sections, scrollThreshold: 50
        });

        // Music
        const audio = document.querySelector('#bg-audio');
        const musicToggle = document.querySelector('.music-toggle');
        if (audio && musicToggle) {
            new MusicController({ audio, toggle: musicToggle, src: '/mp3/WWBGM.mp3' });
        }

        // Gallery
        const galleryContainer = document.querySelector('.gallery-slider');
        if (galleryContainer) {
            new Gallery(galleryContainer, { autoplay: true, autoplayInterval: 5000 });
        }
    });

})();