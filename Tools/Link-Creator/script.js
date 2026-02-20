/**
 * GENUINE INTELLIGENCE 28 (GI28) - IDENTITY ARCHITECT ENGINE
 * Version: 1.0.0 Stable
 * Author: Constant Abrar & GI28 Systems
 * Context: Core Logic for Username Link Generator
 * * --------------------------------------------------------------------------
 * ARCHITECTURE OVERVIEW
 * --------------------------------------------------------------------------
 * 1. CONFIGURATION ........ Global settings and DOM selectors.
 * 2. DATABASE ............. 60+ Platform definitions with regex patterns.
 * 3. STATE MANAGEMENT ..... Reactive state proxy for UI updates.
 * 4. UTILITIES ............ Helper functions (Sanitize, Debounce, Copy).
 * 5. BACKGROUND SYSTEM .... Three.js Particle Network (Neural Web).
 * 6. GENERATOR ENGINE ..... Core logic for URL construction.
 * 7. RENDERER ............. DOM manipulation and Component creation.
 * 8. PREVIEW SYSTEM ....... Sidebar logic for live link inspection.
 * 9. EXPORT ENGINE ........ TXT/JSON file generation logic.
 * 10. EVENTS .............. Event listeners and interaction handlers.
 * 11. INITIALIZATION ...... Boot sequence.
 */

'use strict';

/* ==========================================================================
   1. CONFIGURATION & CONSTANTS
   ========================================================================== */

const GI28_CONFIG = {
    // System Meta
    version: '1.0.0',
    appName: 'GI28 Link Generator',
    author: 'Constant Abrar',
    
    // Local Storage Keys
    storageKeys: {
        lastUsername: 'gi28_last_username',
        theme: 'gi28_theme',
        excludedPlatforms: 'gi28_excluded_ids'
    },

    // UI Animation Timings (ms)
    animation: {
        staggerDelay: 30,
        toastDuration: 4000,
        shimmerDuration: 1000
    },

    // DOM Selectors (Cached for performance)
    selectors: {
        input: '#usernameInput',
        generateBtn: '#generateBtn',
        inputStatus: '#inputStatus',
        grid: '#platformsGrid',
        search: '#platformSearch',
        filters: '.filter-btn',
        previewBody: '#previewBody',
        previewCard: '.preview-card',
        totalCount: '#totalCount',
        catCount: '#catCount',
        copyAllBtn: '#copyAllBtn',
        exportTxt: '#downloadTxt',
        exportJson: '#downloadJson',
        toastContainer: '#toast-container',
        preloader: '#preloader'
    },

    // Three.js Settings
    visuals: {
        particleCount: window.innerWidth < 768 ? 600 : 1400,
        particleColor: 0x00f0ff,
        connectionDistance: 100,
        mouseInfluence: 0.05
    }
};

/* ==========================================================================
   2. PLATFORM DATABASE (60+ ITEMS)
   ========================================================================== */

/**
 * The core knowledge base. 
 * Patterns use %s as the placeholder for the username.
 * Categories maps to CSS border colors.
 */
const PLATFORM_DB = [
    /* --- SOCIAL MEDIA --- */
    {
        id: 'instagram',
        name: 'Instagram',
        pattern: 'https://instagram.com/%s',
        category: 'social',
        icon: 'icon-instagram',
        description: 'Photo and video sharing social networking service.'
    },
    {
        id: 'twitter',
        name: 'X (Twitter)',
        pattern: 'https://twitter.com/%s',
        category: 'social',
        icon: 'icon-twitter',
        description: 'Microblogging and social networking service.'
    },
    {
        id: 'facebook',
        name: 'Facebook',
        pattern: 'https://facebook.com/%s',
        category: 'social',
        icon: 'icon-facebook',
        description: 'Online social media and social networking service.'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        pattern: 'https://tiktok.com/@%s',
        category: 'social',
        icon: 'icon-link', // Fallback generic
        description: 'Short-form video hosting service.'
    },
    {
        id: 'pinterest',
        name: 'Pinterest',
        pattern: 'https://pinterest.com/%s',
        category: 'social',
        icon: 'icon-link',
        description: 'Image sharing and social media service.'
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        pattern: 'https://snapchat.com/add/%s',
        category: 'social',
        icon: 'icon-link',
        description: 'multimedia instant messaging app.'
    },
    {
        id: 'tumblr',
        name: 'Tumblr',
        pattern: 'https://%s.tumblr.com',
        category: 'social',
        icon: 'icon-link',
        description: 'Microblogging and social networking website.'
    },
    {
        id: 'flickr',
        name: 'Flickr',
        pattern: 'https://flickr.com/people/%s',
        category: 'social',
        icon: 'icon-link',
        description: 'Image hosting and video hosting service.'
    },
    {
        id: 'mastodon',
        name: 'Mastodon (Social)',
        pattern: 'https://mastodon.social/@%s',
        category: 'social',
        icon: 'icon-link',
        description: 'Self-hosted social networking service.'
    },
    {
        id: 'threads',
        name: 'Threads',
        pattern: 'https://www.threads.net/@%s',
        category: 'social',
        icon: 'icon-link',
        description: 'Text-based conversation app by Instagram.'
    },

    /* --- VIDEO & STREAMING --- */
    {
        id: 'youtube',
        name: 'YouTube',
        pattern: 'https://youtube.com/@%s',
        category: 'video',
        icon: 'icon-youtube',
        description: 'Online video sharing and social media platform.'
    },
    {
        id: 'twitch',
        name: 'Twitch',
        pattern: 'https://twitch.tv/%s',
        category: 'video',
        icon: 'icon-twitch',
        description: 'Video live streaming service.'
    },
    {
        id: 'vimeo',
        name: 'Vimeo',
        pattern: 'https://vimeo.com/%s',
        category: 'video',
        icon: 'icon-link',
        description: 'Video hosting, sharing, and services platform.'
    },
    {
        id: 'dailymotion',
        name: 'Dailymotion',
        pattern: 'https://dailymotion.com/%s',
        category: 'video',
        icon: 'icon-link',
        description: 'French video-sharing technology platform.'
    },

    /* --- DEVELOPER & TECH --- */
    {
        id: 'github',
        name: 'GitHub',
        pattern: 'https://github.com/%s',
        category: 'dev',
        icon: 'icon-github',
        description: 'Platform for software development and version control.'
    },
    {
        id: 'gitlab',
        name: 'GitLab',
        pattern: 'https://gitlab.com/%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'DevOps software package.'
    },
    {
        id: 'bitbucket',
        name: 'Bitbucket',
        pattern: 'https://bitbucket.org/%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'Git-based source code repository hosting.'
    },
    {
        id: 'stackoverflow',
        name: 'Stack Overflow',
        pattern: 'https://stackoverflow.com/users/%s', // Note: Usually requires ID, implies username search might fail without ID
        category: 'dev',
        icon: 'icon-dev',
        description: 'Question and answer website for professional programmers.'
    },
    {
        id: 'devto',
        name: 'Dev.to',
        pattern: 'https://dev.to/%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'Online community for software developers.'
    },
    {
        id: 'codepen',
        name: 'CodePen',
        pattern: 'https://codepen.io/%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'Social development environment for front-end designers.'
    },
    {
        id: 'replit',
        name: 'Replit',
        pattern: 'https://replit.com/@%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'Online integrated development environment.'
    },
    {
        id: 'npm',
        name: 'npm',
        pattern: 'https://www.npmjs.com/~%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'Package manager for the JavaScript programming language.'
    },
    {
        id: 'codesandbox',
        name: 'CodeSandbox',
        pattern: 'https://codesandbox.io/u/%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'Online code editor and prototyping tool.'
    },
    {
        id: 'producthunt',
        name: 'Product Hunt',
        pattern: 'https://www.producthunt.com/@%s',
        category: 'dev',
        icon: 'icon-link',
        description: 'Website to share and discover new products.'
    },

    /* --- PROFESSIONAL & CREATIVE --- */
    {
        id: 'linkedin',
        name: 'LinkedIn',
        pattern: 'https://linkedin.com/in/%s',
        category: 'business',
        icon: 'icon-linkedin',
        description: 'Business and employment-focused social media platform.'
    },
    {
        id: 'dribbble',
        name: 'Dribbble',
        pattern: 'https://dribbble.com/%s',
        category: 'business',
        icon: 'icon-dribbble',
        description: 'Self-promotion and social networking platform for digital designers.'
    },
    {
        id: 'behance',
        name: 'Behance',
        pattern: 'https://behance.net/%s',
        category: 'business',
        icon: 'icon-behance',
        description: 'Social media platform to showcase and discover creative work.'
    },
    {
        id: 'medium',
        name: 'Medium',
        pattern: 'https://medium.com/@%s',
        category: 'blogging',
        icon: 'icon-medium',
        description: 'Online publishing platform.'
    },
    {
        id: 'fiverr',
        name: 'Fiverr',
        pattern: 'https://www.fiverr.com/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Freelance services marketplace.'
    },
    {
        id: 'upwork',
        name: 'Upwork',
        pattern: 'https://www.upwork.com/freelancers/~%s', // Note: Often erratic URL structure
        category: 'business',
        icon: 'icon-link',
        description: 'Freelancing platform.'
    },
    {
        id: 'about_me',
        name: 'About.me',
        pattern: 'https://about.me/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Personal web hosting service.'
    },
    {
        id: 'linktree',
        name: 'Linktree',
        pattern: 'https://linktr.ee/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Freemium social media reference landing page.'
    },
    {
        id: 'carrd',
        name: 'Carrd',
        pattern: 'https://%s.carrd.co',
        category: 'business',
        icon: 'icon-link',
        description: 'Simple, free, fully responsive one-page sites.'
    },
    {
        id: 'gumroad',
        name: 'Gumroad',
        pattern: 'https://gumroad.com/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Self-publishing digital marketplace.'
    },

    /* --- GAMING --- */
    {
        id: 'steam',
        name: 'Steam',
        pattern: 'https://steamcommunity.com/id/%s',
        category: 'gaming',
        icon: 'icon-link',
        description: 'Video game digital distribution service.'
    },
    {
        id: 'roblox',
        name: 'Roblox',
        pattern: 'https://www.roblox.com/user.aspx?username=%s',
        category: 'gaming',
        icon: 'icon-link',
        description: 'Online game platform and game creation system.'
    },
    {
        id: 'itchio',
        name: 'Itch.io',
        pattern: 'https://%s.itch.io',
        category: 'gaming',
        icon: 'icon-link',
        description: 'Website for users to host, sell and download indie video games.'
    },
    {
        id: 'minecraft',
        name: 'Minecraft (NameMC)',
        pattern: 'https://namemc.com/profile/%s',
        category: 'gaming',
        icon: 'icon-link',
        description: 'Minecraft username lookup.'
    },

    /* --- MUSIC & AUDIO --- */
    {
        id: 'soundcloud',
        name: 'SoundCloud',
        pattern: 'https://soundcloud.com/%s',
        category: 'music',
        icon: 'icon-link',
        description: 'Online audio distribution platform.'
    },
    {
        id: 'spotify',
        name: 'Spotify (User)',
        pattern: 'https://open.spotify.com/user/%s',
        category: 'music',
        icon: 'icon-link',
        description: 'Audio streaming and media services provider.'
    },
    {
        id: 'bandcamp',
        name: 'Bandcamp',
        pattern: 'https://bandcamp.com/%s',
        category: 'music',
        icon: 'icon-link',
        description: 'Online record store and music community.'
    },
    {
        id: 'lastfm',
        name: 'Last.fm',
        pattern: 'https://www.last.fm/user/%s',
        category: 'music',
        icon: 'icon-link',
        description: 'Music website.'
    },
    {
        id: 'mixcloud',
        name: 'Mixcloud',
        pattern: 'https://www.mixcloud.com/%s',
        category: 'music',
        icon: 'icon-link',
        description: 'British online music streaming service.'
    },

    /* --- COMMUNITY & FORUMS --- */
    {
        id: 'reddit',
        name: 'Reddit',
        pattern: 'https://www.reddit.com/user/%s',
        category: 'social',
        icon: 'icon-reddit',
        description: 'Social news aggregation, content rating, and discussion website.'
    },
    {
        id: 'quora',
        name: 'Quora',
        pattern: 'https://www.quora.com/profile/%s',
        category: 'social',
        icon: 'icon-link',
        description: 'Question-and-answer website.'
    },
    {
        id: 'wikipedia',
        name: 'Wikipedia',
        pattern: 'https://en.wikipedia.org/wiki/User:%s',
        category: 'blogging',
        icon: 'icon-link',
        description: 'Free online encyclopedia.'
    },
    {
        id: 'hackernews',
        name: 'Hacker News',
        pattern: 'https://news.ycombinator.com/user?id=%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'Social news website focusing on computer science and entrepreneurship.'
    },
    {
        id: 'wattpad',
        name: 'Wattpad',
        pattern: 'https://www.wattpad.com/user/%s',
        category: 'blogging',
        icon: 'icon-link',
        description: 'Website and app for writers to publish new user-generated stories.'
    },
    {
        id: 'goodreads',
        name: 'Goodreads',
        pattern: 'https://www.goodreads.com/user/show/%s', // Note: Often requires ID
        category: 'blogging',
        icon: 'icon-link',
        description: 'Social cataloging website for books.'
    },
    {
        id: 'deviantart',
        name: 'DeviantArt',
        pattern: 'https://www.deviantart.com/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Online art community.'
    },
    {
        id: 'artstation',
        name: 'ArtStation',
        pattern: 'https://www.artstation.com/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Showcase platform for game, film, media & entertainment artists.'
    },
    {
        id: 'unsplash',
        name: 'Unsplash',
        pattern: 'https://unsplash.com/@%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Stock photography website.'
    },
    {
        id: '9gag',
        name: '9GAG',
        pattern: 'https://9gag.com/u/%s',
        category: 'social',
        icon: 'icon-link',
        description: 'Online platform and social media website.'
    },
    {
        id: 'giphy',
        name: 'GIPHY',
        pattern: 'https://giphy.com/channel/%s',
        category: 'social',
        icon: 'icon-link',
        description: 'Online database and search engine that allows users to search for GIFs.'
    },
    {
        id: 'gravatar',
        name: 'Gravatar',
        pattern: 'https://en.gravatar.com/%s',
        category: 'dev',
        icon: 'icon-link',
        description: 'Globally Recognized Avatar.'
    },
    {
        id: 'keybase',
        name: 'Keybase',
        pattern: 'https://keybase.io/%s',
        category: 'dev',
        icon: 'icon-dev',
        description: 'Secure messaging and file-sharing.'
    },
    {
        id: 'patreon',
        name: 'Patreon',
        pattern: 'https://www.patreon.com/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Membership platform for content creators.'
    },
    {
        id: 'ko-fi',
        name: 'Ko-fi',
        pattern: 'https://ko-fi.com/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Platform for creators to receive donations.'
    },
    {
        id: 'buymeacoffee',
        name: 'Buy Me a Coffee',
        pattern: 'https://www.buymeacoffee.com/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Service for content creators to accept donations.'
    },
    {
        id: 'substack',
        name: 'Substack',
        pattern: 'https://%s.substack.com',
        category: 'blogging',
        icon: 'icon-link',
        description: 'Online platform that provides publishing, payment, analytics, and design infrastructure.'
    },
    {
        id: 'telegram',
        name: 'Telegram',
        pattern: 'https://t.me/%s',
        category: 'social',
        icon: 'icon-link',
        description: 'Cloud-based instant messaging service.'
    },
    {
        id: 'paypal',
        name: 'PayPal',
        pattern: 'https://paypal.me/%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Online payments system.'
    },
    {
        id: 'cashapp',
        name: 'Cash App',
        pattern: 'https://cash.app/$%s',
        category: 'business',
        icon: 'icon-link',
        description: 'Mobile payment service.'
    }
];

/* ==========================================================================
   3. STATE MANAGEMENT SYSTEM
   ========================================================================== */

/**
 * A lightweight reactive state manager.
 * Publishes events when data changes to trigger UI updates.
 */
class StateManager {
    constructor() {
        this.data = {
            username: '',
            filterCategory: 'all',
            searchQuery: '',
            generatedLinks: [],
            selectedPlatforms: new Set(), // For inclusion/exclusion
            isGenerating: false
        };
        
        this.subscribers = [];
        this.init();
    }

    init() {
        // Load last username from local storage
        const lastUser = localStorage.getItem(GI28_CONFIG.storageKeys.lastUsername);
        if (lastUser) {
            this.data.username = lastUser;
        }
    }

    /**
     * Subscribe a function to state changes
     * @param {Function} callback 
     */
    subscribe(callback) {
        this.subscribers.push(callback);
    }

    /**
     * Update state and notify subscribers
     * @param {Object} partialState 
     */
    setState(partialState) {
        this.data = { ...this.data, ...partialState };
        this.notify();
    }

    /**
     * Specific setter for username to handle side effects (storage)
     * @param {string} username 
     */
    setUsername(username) {
        this.data.username = username;
        localStorage.setItem(GI28_CONFIG.storageKeys.lastUsername, username);
        this.notify();
    }

    /**
     * Trigger updates
     */
    notify() {
        this.subscribers.forEach(cb => cb(this.data));
    }

    /**
     * Toggle a platform selection (for export)
     * @param {string} platformId 
     */
    togglePlatform(platformId) {
        if (this.data.selectedPlatforms.has(platformId)) {
            this.data.selectedPlatforms.delete(platformId);
        } else {
            this.data.selectedPlatforms.add(platformId);
        }
        // No full notify needed for simple toggle, maybe specific UI update?
        // keeping it simple for now
    }

    get() {
        return this.data;
    }
}

// Initialize State
const store = new StateManager();

/* ==========================================================================
   4. UTILITY FUNCTIONS
   ========================================================================== */

const Utils = {
    /**
     * Sanitize input username (remove spaces, special chars that break URLs)
     * @param {string} input 
     * @returns {string}
     */
    sanitizeInput: (input) => {
        return input.trim().replace(/[^a-zA-Z0-9._-]/g, '');
    },

    /**
     * Copy text to clipboard with fallback
     * @param {string} text 
     * @returns {Promise}
     */
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy: ', err);
            // Fallback
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    },

    /**
     * Debounce function for search input
     * @param {Function} func 
     * @param {number} wait 
     */
    debounce: (func, wait) => {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    },

    /**
     * Download content as a file
     * @param {string} filename 
     * @param {string} text 
     */
    downloadFile: (filename, text) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    },

    /**
     * Create formatted timestamp
     */
    getTimestamp: () => {
        return new Date().toISOString().split('T')[0];
    }
};

/* ==========================================================================
   5. THREE.JS BACKGROUND SYSTEM (NEURAL NETWORK)
   ========================================================================== */

const ThreeBackground = {
    scene: null,
    camera: null,
    renderer: null,
    particles: null,
    lines: null,
    animationId: null,

    init: () => {
        const container = document.getElementById('canvas-bg');
        if (!container) return;

        // Scene
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.002);

        // Camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 100;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particles
        const particleCount = GI28_CONFIG.visuals.particleCount;
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            const z = Math.random() * 200 - 100;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            velocities.push({
                x: (Math.random() - 0.5) * 0.1,
                y: (Math.random() - 0.5) * 0.1,
                z: (Math.random() - 0.5) * 0.1
            });
        }

        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particleMat = new THREE.PointsMaterial({
            color: GI28_CONFIG.visuals.particleColor,
            size: 0.5,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Lines (Network Connections)
        // We will create a line system that updates dynamically
        const lineMat = new THREE.LineBasicMaterial({
            color: GI28_CONFIG.visuals.particleColor,
            transparent: true,
            opacity: 0.15
        });

        // Store refs
        ThreeBackground.scene = scene;
        ThreeBackground.camera = camera;
        ThreeBackground.renderer = renderer;
        ThreeBackground.particles = particles;
        ThreeBackground.velocities = velocities;

        // Handle Resize
        window.addEventListener('resize', ThreeBackground.onResize);

        // Start Loop
        ThreeBackground.animate();
    },

    animate: () => {
        ThreeBackground.animationId = requestAnimationFrame(ThreeBackground.animate);
        
        const particles = ThreeBackground.particles;
        const velocities = ThreeBackground.velocities;
        const positions = particles.geometry.attributes.position.array;
        
        // Update positions
        for (let i = 0; i < GI28_CONFIG.visuals.particleCount; i++) {
            positions[i * 3] += velocities[i].x;
            positions[i * 3 + 1] += velocities[i].y;
            positions[i * 3 + 2] += velocities[i].z;

            // Boundary Check (Bounce)
            if (positions[i * 3] < -100 || positions[i * 3] > 100) velocities[i].x *= -1;
            if (positions[i * 3 + 1] < -100 || positions[i * 3 + 1] > 100) velocities[i].y *= -1;
            if (positions[i * 3 + 2] < -100 || positions[i * 3 + 2] > 100) velocities[i].z *= -1;
        }

        particles.geometry.attributes.position.needsUpdate = true;
        
        // Slow rotation of entire system
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        ThreeBackground.renderer.render(ThreeBackground.scene, ThreeBackground.camera);
    },

    onResize: () => {
        if (!ThreeBackground.camera) return;
        ThreeBackground.camera.aspect = window.innerWidth / window.innerHeight;
        ThreeBackground.camera.updateProjectionMatrix();
        ThreeBackground.renderer.setSize(window.innerWidth, window.innerHeight);
    }
};

/* ==========================================================================
   6. GENERATOR ENGINE
   ========================================================================== */

const LinkEngine = {
    /**
     * Generates links for a given username across all platforms
     * @param {string} username 
     * @returns {Array} Array of objects with platform data and generated URL
     */
    generateAll: (username) => {
        if (!username) return [];

        const sanitized = Utils.sanitizeInput(username);
        
        return PLATFORM_DB.map(platform => {
            return {
                ...platform,
                generatedUrl: platform.pattern.replace('%s', sanitized),
                username: sanitized
            };
        });
    },

    /**
     * Filter links based on category and search query
     * @param {Array} links 
     * @param {string} category 
     * @param {string} query 
     * @returns {Array}
     */
    filterLinks: (links, category, query) => {
        let filtered = links;

        // Category Filter
        if (category !== 'all') {
            filtered = filtered.filter(link => link.category === category);
        }

        // Search Query Filter
        if (query) {
            const lowerQuery = query.toLowerCase();
            filtered = filtered.filter(link => 
                link.name.toLowerCase().includes(lowerQuery) || 
                link.category.toLowerCase().includes(lowerQuery)
            );
        }

        return filtered;
    }
};

/* ==========================================================================
   7. UI RENDERER
   ========================================================================== */

const Renderer = {
    /**
     * Render the grid of platforms
     * @param {Object} state 
     */
    renderGrid: (state) => {
        const grid = document.querySelector(GI28_CONFIG.selectors.grid);
        if (!grid) return;

        // Clear Grid
        grid.innerHTML = '';

        if (!state.username) {
            Renderer.renderEmptyState(grid);
            Renderer.updateStats(0, 0);
            return;
        }

        // Get processed links
        const allLinks = LinkEngine.generateAll(state.username);
        const filteredLinks = LinkEngine.filterLinks(allLinks, state.filterCategory, state.searchQuery);

        if (filteredLinks.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon"><i class="fa-solid fa-filter-circle-xmark"></i></div>
                    <h3>No Results Found</h3>
                    <p>Try changing your filters or search query.</p>
                </div>
            `;
            Renderer.updateStats(0, 0);
            return;
        }

        // Update Stats
        const uniqueCats = new Set(filteredLinks.map(l => l.category)).size;
        Renderer.updateStats(filteredLinks.length, uniqueCats);

        // Fragment for performance
        const fragment = document.createDocumentFragment();

        // Staggered Animation Delay Counter
        let delayIndex = 0;

        filteredLinks.forEach(link => {
            const card = Renderer.createCard(link, delayIndex);
            fragment.appendChild(card);
            delayIndex++;
        });

        grid.appendChild(fragment);
    },

    /**
     * Create individual platform card DOM element
     * @param {Object} linkData 
     * @param {number} index 
     * @returns {HTMLElement}
     */
    createCard: (linkData, index) => {
        const card = document.createElement('article');
        card.className = 'platform-card';
        card.setAttribute('data-category', linkData.category);
        card.style.animationDelay = `${index * 50}ms`; // Stagger effect

        // SVG Icon Logic
        let iconHtml = `<svg><use href="#${linkData.icon}"></use></svg>`;

        // Construct Inner HTML
        card.innerHTML = `
            <div class="card-header">
                <div class="platform-icon">
                    ${iconHtml}
                </div>
                <div class="platform-name">${linkData.name}</div>
                <label class="card-toggle" title="Include in Export">
                    <input type="checkbox" checked data-id="${linkData.id}">
                    <span class="checkmark"></span>
                </label>
            </div>
            
            <div class="link-display" title="${linkData.generatedUrl}">
                ${linkData.generatedUrl}
            </div>

            <div class="card-actions">
                <button class="btn-card btn-copy" data-clipboard-text="${linkData.generatedUrl}">
                    <svg><use href="#icon-copy"></use></svg>
                    <span>Copy</span>
                </button>
                <button class="btn-card btn-open" data-url="${linkData.generatedUrl}" data-platform="${linkData.name}">
                    <svg><use href="#icon-link"></use></svg>
                    <span>Check</span>
                </button>
            </div>
        `;

        // Add specific event listeners for this card
        const copyBtn = card.querySelector('.btn-copy');
        copyBtn.addEventListener('click', () => {
            Utils.copyToClipboard(linkData.generatedUrl).then(() => {
                Renderer.showToast('Link Copied', `${linkData.name} URL copied to clipboard.`);
                copyBtn.innerHTML = `<svg><use href="#icon-check"></use></svg><span>Copied</span>`;
                setTimeout(() => {
                    copyBtn.innerHTML = `<svg><use href="#icon-copy"></use></svg><span>Copy</span>`;
                }, 2000);
            });
        });

        const openBtn = card.querySelector('.btn-open');
        openBtn.addEventListener('click', () => {
            Renderer.updatePreview(linkData);
        });

        return card;
    },

    /**
     * Render the initial empty state
     */
    renderEmptyState: (container) => {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="fa-solid fa-fingerprint"></i>
                </div>
                <h3>Ready to Generate</h3>
                <p>Enter a username above to see potential profile links across the web.</p>
            </div>
        `;
    },

    /**
     * Update the numbers in the sidebar
     */
    updateStats: (total, cats) => {
        const totalEl = document.querySelector(GI28_CONFIG.selectors.totalCount);
        const catEl = document.querySelector(GI28_CONFIG.selectors.catCount);
        
        // Simple counter animation
        if(totalEl) totalEl.innerText = total;
        if(catEl) catEl.innerText = cats;
    },

    /**
     * Update the Live Preview Panel
     * @param {Object} linkData 
     */
    updatePreview: (linkData) => {
        const body = document.querySelector(GI28_CONFIG.selectors.previewBody);
        if (!body) return;

        // Clear placeholder
        body.innerHTML = '';

        const container = document.createElement('div');
        container.style.padding = '2rem';
        container.style.color = '#fff';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';
        container.style.height = '100%';
        container.style.textAlign = 'center';

        container.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--neon-cyan);">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </div>
            <h3 style="margin-bottom: 0.5rem;">${linkData.name}</h3>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem;">
                ${linkData.description || 'Click below to verify this profile.'}
            </p>
            <a href="${linkData.generatedUrl}" target="_blank" class="btn btn-glow btn-full" style="justify-content:center;">
                Open Profile
            </a>
            <div style="margin-top: 1rem; font-size: 0.8rem; color: #555; word-break: break-all;">
                ${linkData.generatedUrl}
            </div>
        `;

        body.appendChild(container);

        // Visual feedback on the panel
        const card = document.querySelector(GI28_CONFIG.selectors.previewCard);
        if(card) {
            card.animate([
                { borderColor: 'var(--neon-cyan)' },
                { borderColor: 'var(--glass-border)' }
            ], { duration: 1000 });
        }
    },

    /**
     * Show a toast notification
     * @param {string} title 
     * @param {string} message 
     */
    showToast: (title, message) => {
        const container = document.querySelector(GI28_CONFIG.selectors.toastContainer);
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon"><i class="fa-solid fa-circle-info"></i></div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-msg">${message}</div>
            </div>
        `;

        container.appendChild(toast);

        // Animate In
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after duration
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500); // Wait for transition
        }, GI28_CONFIG.animation.toastDuration);
    }
};

/* ==========================================================================
   8. EVENT HANDLERS
   ========================================================================== */

const EventHandler = {
    init: () => {
        // Input Handling
        const input = document.querySelector(GI28_CONFIG.selectors.input);
        const generateBtn = document.querySelector(GI28_CONFIG.selectors.generateBtn);
        const status = document.querySelector(GI28_CONFIG.selectors.inputStatus);

        const handleInput = () => {
            const val = input.value;
            if (val.length > 0) {
                status.innerText = `Generating for: @${Utils.sanitizeInput(val)}`;
                status.classList.add('active');
            } else {
                status.innerText = 'Waiting for input...';
                status.classList.remove('active');
            }
        };

        const handleGenerate = () => {
            const val = input.value;
            if (!val) {
                Renderer.showToast('Error', 'Please enter a username first.');
                status.innerText = 'Error: Username required';
                status.classList.add('error');
                return;
            }
            status.classList.remove('error');
            store.setUsername(val);
            
            // Scroll to results
            document.getElementById('tool-interface').scrollIntoView({ behavior: 'smooth' });
        };

        input.addEventListener('input', handleInput);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleGenerate();
        });
        generateBtn.addEventListener('click', handleGenerate);

        // Filter Buttons
        const filters = document.querySelectorAll(GI28_CONFIG.selectors.filters);
        filters.forEach(btn => {
            btn.addEventListener('click', () => {
                // UI Update
                filters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // State Update
                const cat = btn.getAttribute('data-category');
                store.setState({ filterCategory: cat });
            });
        });

        // Search Input (Debounced)
        const searchInput = document.querySelector(GI28_CONFIG.selectors.search);
        searchInput.addEventListener('input', Utils.debounce((e) => {
            store.setState({ searchQuery: e.target.value });
        }, 300));

        // Copy All Button
        const copyAllBtn = document.querySelector(GI28_CONFIG.selectors.copyAllBtn);
        if (copyAllBtn) {
            copyAllBtn.addEventListener('click', () => {
                const state = store.get();
                if (!state.username) return;
                
                const links = LinkEngine.generateAll(state.username);
                const text = links.map(l => `${l.name}: ${l.generatedUrl}`).join('\n');
                
                Utils.copyToClipboard(text).then(() => {
                    Renderer.showToast('Bulk Copy', 'All generated links copied to clipboard.');
                });
            });
        }

        // Export Actions
        const dlTxt = document.querySelector(GI28_CONFIG.selectors.exportTxt);
        const dlJson = document.querySelector(GI28_CONFIG.selectors.exportJson);

        if (dlTxt) dlTxt.addEventListener('click', () => Exporter.exportTXT());
        if (dlJson) dlJson.addEventListener('click', () => Exporter.exportJSON());

        // State Subscription -> Render
        store.subscribe((state) => {
            Renderer.renderGrid(state);
        });
    }
};

/* ==========================================================================
   9. EXPORT ENGINE
   ========================================================================== */

const Exporter = {
    /**
     * Generate content based on current filtered state
     */
    getData: () => {
        const state = store.get();
        if (!state.username) return null;
        
        // We export ALL links, not just filtered view, unless logic changes.
        // For now, let's export all generated links for the username.
        return LinkEngine.generateAll(state.username);
    },

    exportTXT: () => {
        const data = Exporter.getData();
        if (!data) return Renderer.showToast('Export Failed', 'No data to export.');

        let content = `GI28 IDENTITY EXPORT\n`;
        content += `Target Username: ${data[0].username}\n`;
        content += `Date: ${Utils.getTimestamp()}\n`;
        content += `----------------------------\n\n`;

        data.forEach(item => {
            content += `[${item.category.toUpperCase()}] ${item.name}\n`;
            content += `${item.generatedUrl}\n\n`;
        });

        content += `Generated by GI28 (https://gi28.in)`;

        Utils.downloadFile(`gi28-${data[0].username}.txt`, content);
        Renderer.showToast('Export Success', 'TXT file downloaded.');
    },

    exportJSON: () => {
        const data = Exporter.getData();
        if (!data) return Renderer.showToast('Export Failed', 'No data to export.');

        const exportObj = {
            meta: {
                tool: 'GI28 Link Generator',
                username: data[0].username,
                date: Utils.getTimestamp(),
                count: data.length
            },
            links: data
        };

        const content = JSON.stringify(exportObj, null, 2);
        Utils.downloadFile(`gi28-${data[0].username}.json`, content);
        Renderer.showToast('Export Success', 'JSON file downloaded.');
    }
};

/* ==========================================================================
   10. CUSTOM CURSOR & INTERACTION (Reused from Core)
   ========================================================================== */

const Interaction = {
    initCursor: () => {
        if (!window.matchMedia("(pointer: fine)").matches) return;

        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        
        if (!cursorDot || !cursorOutline) return;

        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    },

    initMobileMenu: () => {
        const menuToggle = document.getElementById('menuToggle');
        const menuOverlay = document.getElementById('menuOverlay');
        const icon = document.querySelector('.burger-icon');
        let isOpen = false;

        if(!menuToggle) return;

        menuToggle.addEventListener('click', () => {
            isOpen = !isOpen;
            if(isOpen) {
                menuOverlay.classList.add('active');
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                menuOverlay.classList.remove('active');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
};

/* ==========================================================================
   11. INITIALIZATION SEQUENCE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    try {
        console.log(`%c GI28 LINK GENERATOR %c v${GI28_CONFIG.version} `, 
            'background: #00f0ff; color: #000; font-weight: bold; padding: 2px;', 
            'background: #111; color: #fff; padding: 2px;');

        // 1. Initialize Visuals
        ThreeBackground.init();
        Interaction.initCursor();
        Interaction.initMobileMenu();

        // 2. Initialize VanillaTilt
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2
            });
        }

        // 3. Initialize Logic
        EventHandler.init();

        // 4. Preload State (if localStorage has data)
        const savedUser = localStorage.getItem(GI28_CONFIG.storageKeys.lastUsername);
        if (savedUser) {
            document.querySelector(GI28_CONFIG.selectors.input).value = savedUser;
            // We don't auto-generate to avoid jarring page jumps, 
            // but we populate the field.
        }

        // 5. Hide Preloader
        setTimeout(() => {
            const preloader = document.querySelector(GI28_CONFIG.selectors.preloader);
            if (preloader) preloader.classList.add('fade-out');
        }, 1000);

    } catch (error) {
        console.error('GI28 Critical Error:', error);
        // Fallback UI could go here
    }
});

/* END OF SCRIPT 
   Genuine Intelligence 28
*/
