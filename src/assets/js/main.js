/**
 * Main Entry Point
 * Initializes all modules and handles app startup
 * High Cohesion: Orchestrates all modules
 * Low Coupling: Modules are independent, communicate via events
 */

import { ParticleSystem } from './modules/particles.js';
import { ScrollAnimator, TypingEffect } from './modules/animations.js';
import { Navigation } from './modules/navigation.js';
import { MusicController } from './modules/music.js';
import { Gallery } from './modules/gallery.js';

class App {
    constructor() {
        this.modules = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initParticleSystem();
        this.initScrollAnimations();
        this.initTypingEffect();
        this.initNavigation();
        this.initMusic();
        this.initGallery();
        this.initHeaderScroll();
    }

    initParticleSystem() {
        const canvas = document.querySelector('.hero-canvas');
        if (canvas) {
            this.modules.particles = new ParticleSystem(canvas, {
                particleCount: 80,
                particleColor: '#6366f1',
                speed: 0.5,
                connectDistance: 150
            });
            this.modules.particles.start();
        }
    }

    initScrollAnimations() {
        this.modules.scrollAnimator = new ScrollAnimator({
            threshold: 0.1
        });
        this.modules.scrollAnimator.init();
    }

    initTypingEffect() {
        const typingElement = document.querySelector('.hero-subtitle');
        if (typingElement) {
            const texts = [
                'A passionate developer',
                'Building digital experiences',
                'Turning ideas into reality',
                'Coding with purpose'
            ];

            this.modules.typingEffect = new TypingEffect(typingElement, texts, {
                typingSpeed: 80,
                deletingSpeed: 40,
                pauseDuration: 2000
            });
        }
    }

    initNavigation() {
        const header = document.querySelector('.header');
        const mobileNav = document.querySelector('.mobile-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        const overlay = document.querySelector('.overlay');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        this.modules.navigation = new Navigation({
            header,
            mobileNav,
            menuToggle,
            overlay,
            navLinks,
            sections,
            scrollThreshold: 50
        });
    }

    initMusic() {
        const audio = document.querySelector('#bg-audio');
        const toggle = document.querySelector('.music-toggle');

        if (audio && toggle) {
            this.modules.music = new MusicController({
                audio,
                toggle,
                src: '/mp3/WWBGM.mp3'
            });
        }
    }

    initGallery() {
        const galleryContainer = document.querySelector('.gallery-slider');
        if (galleryContainer) {
            this.modules.gallery = new Gallery(galleryContainer, {
                autoplay: true,
                autoplayInterval: 5000
            });
        }
    }

    initHeaderScroll() {
        const header = document.querySelector('.header');
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('hide');
            } else {
                header.classList.remove('hide');
            }

            lastScroll = currentScroll;
        });
    }
}

// Initialize app
const app = new App();

// Export for debugging
window.app = app;

export default App;