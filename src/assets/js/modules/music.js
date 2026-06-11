/**
 * Music Controller Module
 * Handles background music playback
 * Low Coupling: Accepts audio element and toggle button as dependencies
 */
export class MusicController {
    constructor(options = {}) {
        this.audio = options.audio;
        this.toggle = options.toggle;
        this.audioSrc = options.src || '/mp3/WWBGM.mp3';

        this.isPlaying = false;
        this.rememberState = options.rememberState !== false;

        this.init();
    }

    init() {
        if (this.audio) {
            this.audio.src = this.audioSrc;
            this.audio.volume = 0.3;

            // Restore state from localStorage
            if (this.rememberState) {
                const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
                if (wasPlaying) {
                    this.play();
                }
            }
        }

        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggle());
        }
    }

    play() {
        if (this.audio) {
            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    this.updateUI();
                    if (this.rememberState) {
                        localStorage.setItem('musicPlaying', 'true');
                    }
                })
                .catch(err => {
                    console.warn('Audio playback failed:', err);
                });
        }
    }

    pause() {
        if (this.audio) {
            this.audio.pause();
            this.isPlaying = false;
            this.updateUI();
            if (this.rememberState) {
                localStorage.setItem('musicPlaying', 'false');
            }
        }
    }

    toggle() {
        this.isPlaying ? this.pause() : this.play();
    }

    updateUI() {
        if (this.toggle) {
            if (this.isPlaying) {
                this.toggle.classList.add('playing');
            } else {
                this.toggle.classList.remove('playing');
            }
        }
    }

    setVolume(value) {
        if (this.audio) {
            this.audio.volume = Math.max(0, Math.min(1, value));
        }
    }
}

export default MusicController;