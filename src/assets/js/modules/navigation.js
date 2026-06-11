/**
 * Navigation Module
 * Handles navigation behavior, smooth scroll, and mobile menu
 * Low Coupling: Accepts DOM elements as dependencies
 */
export class Navigation {
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
        this.bindEvents();
        this.highlightActiveSection();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggle());
        }

        // Overlay click to close
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Close on nav link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Header scroll effect
        window.addEventListener('scroll', () => this.handleScroll());

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.mobileNav?.classList.add('open');
        this.overlay?.classList.add('active');
        this.menuToggle?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.mobileNav?.classList.remove('open');
        this.overlay?.classList.remove('active');
        this.menuToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        const scrolled = window.scrollY > this.scrollThreshold;

        if (scrolled) {
            this.header?.classList.add('scrolled');
        } else {
            this.header?.classList.remove('scrolled');
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

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = this.header?.offsetHeight || 0;
            const offsetTop = section.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

export default Navigation;