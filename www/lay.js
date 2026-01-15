/*
    Project: Canvas Express V1
    Last Modified: 2025-10-17
    Author: Maxim (www.maxim.pe.kr)
 */
const siteConfig = {
    TURNSTILE_SITE_KEY: '0x4AAAAAAB1Gk9ll6ulH4ZDi',
    icon_buttons: [
        { name: 'Youtube', icon: 'youtube_activity', url: 'https://www.youtube.com/@malmani' },
    ],
    canvas_effect: 'digitalGlitch',
    
    // Updated canvas image settings
    canvas_image_type: 'cover', // 'none', 'cover', or 'repeat'
    canvas_image_count: 6,
    canvas_image_path: './section/bg/',
    canvas_image_format: 'webp',
};

const digitalGlitchEffect = {
    init() {
        this.canvas = document.getElementById('bg-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.glitches = [];
        this.animationFrameId = null;
        this.lastGlitchTime = 0;
        this.glitchInterval = 100 + Math.random() * 200; // Randomize interval

        window.addEventListener('resize', () => this.handleResize(), false);
        
        this.handleResize();
        this.animate(0);
    },
    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.updateColor();
    },
    updateColor() {
        this.color = getComputedStyle(document.documentElement).getPropertyValue('--dot-canvas-color').trim();
    },
    createGlitches(count) {
        this.glitches = [];
        for (let i = 0; i < count; i++) {
            this.glitches.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                width: Math.random() * 250 + 50,
                height: Math.random() * 2.5 + 1,
                alpha: Math.random() * 0.4 + 0.1,
            });
        }
    },
    animate(timestamp) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
        this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    CanvasExpress.registerEffect('digitalGlitch', digitalGlitchEffect);
    CanvasExpress.init(siteConfig);
});

