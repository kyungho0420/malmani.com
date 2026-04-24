/**
 * Project: MALMANI (EXPRESS V4)
 * Author: Damso Universe
 */

const siteConfig = {
    meta: {
        framework: 'V4',
        type: 'screen',
        lang: 'ko',
        theme: 'dark',
        symbol: false
    },
    canvas: {
        target: '.damso-header',
        effect: 'digitalGlitch',
        overlay: 'dotted',
        image_path: './section/bg/',
        image_count: 6,
        image_slide: 7,
        image_format: 'webp',
        standalone: true
    },
    buttons: [
        { name: 'Contact', icon: 'mail', url: '#contact' },
        { name: 'Search', icon: 'search', url: '#search' },
        { name: 'Youtube', icon: 'play_arrow', url: 'https://www.youtube.com/@malmani' }
    ]
};

/**
 * Digital Glitch Effect Plugin for V4
 */
const digitalGlitchPlugin = {
    init(wrapper) {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'damso-canvas__effect';
        wrapper.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.glitches = [];
        this.lastGlitchTime = 0;
        this.glitchInterval = 100 + Math.random() * 200;

        this.updateColor();
        this.handleResize();
        this.animate(0);

        window.addEventListener('resize', () => this.handleResize());
    },

    updateColor() {
        this.color = getComputedStyle(document.documentElement).getPropertyValue('--dot-canvas-color').trim() || 'rgba(255,255,255,0.4)';
    },

    handleResize() {
        if (!this.canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.logicalWidth = rect.width;
        this.logicalHeight = rect.height;
    },

    createGlitches(count) {
        this.glitches = [];
        for (let i = 0; i < count; i++) {
            this.glitches.push({
                x: Math.random() * this.logicalWidth,
                y: Math.random() * this.logicalHeight,
                width: Math.random() * 250 + 50,
                height: Math.random() * 2.5 + 1,
                alpha: Math.random() * 0.4 + 0.1,
            });
        }
    },

    animate(timestamp) {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);

        if (timestamp - this.lastGlitchTime > this.glitchInterval) {
            this.lastGlitchTime = timestamp;
            this.glitchInterval = 200 + Math.random() * 800;
            const glitchCount = Math.floor(Math.random() * 6) + 2;
            this.createGlitches(glitchCount);
        }
        
        if (this.glitches.length > 0) {
            this.ctx.fillStyle = this.color;
            this.glitches.forEach(g => {
                this.ctx.globalAlpha = g.alpha;
                this.ctx.fillRect(g.x, g.y, g.width, g.height);
            });
        }
        
        this.ctx.globalAlpha = 1.0;
        requestAnimationFrame((t) => this.animate(t));
    }
};

/**
 * Initialize V4 Application
 */
window.addEventListener('DOMContentLoaded', async () => {
    if (!window.V4) return;

    // Register Effect
    window.V4.Effects = window.V4.Effects || {};
    window.V4.Effects.digitalGlitch = digitalGlitchPlugin;

    // Initialize Engine
    await window.V4.init(siteConfig);
});
