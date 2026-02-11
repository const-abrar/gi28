
        /* =========================================
           1. DATA CONFIGURATION & ICONS
           ========================================= */
        const termsData = [
            { t: "Acceptance of Terms", f: "By accessing or using this website, you agree to be bound by these Terms & Conditions.", b: "If you do not agree, strictly discontinue use. Continued use implies full acceptance." },
            { t: "Website Purpose", f: "This platform provides informational and utility-based tools related to social media.", b: "Tools assist in understanding online presence. We do not guarantee specific outcomes." },
            { t: "Eligibility", f: "Users must be at least 13 years of age to use this website.", b: "You confirm you meet the age requirement. Parents are responsible for minors." },
            { t: "User Responsibilities", f: "Users agree to use the website only for lawful purposes.", b: "Misuse, abuse, or disrupting services is prohibited. You are responsible for your actions." },
            { t: "No Professional Advice", f: "Content provided on this website is for informational purposes only.", b: "Not considered professional, legal, or financial advice. Make independent decisions." },
            { t: "Accuracy of Information", f: "We strive to keep all information accurate and up to date.", b: "We do not guarantee completeness. Content may be updated without notice." },
            { t: "Tool Usage Disclaimer", f: "Tools are provided “as-is” and “as-available.”", b: "No guarantee of error-free functionality. Results may vary based on input." },
            { t: "User-Submitted Data", f: "Any data submitted by users is provided voluntarily.", b: "You are responsible for your content. We do not validate user-submitted info." },
            { t: "Data Storage & Processing", f: "Submitted data may be temporarily stored for processing or functionality.", b: "We do not sell data. Data handling follows reasonable security practices." },
            { t: "Intellectual Property", f: "All website content, design, branding, and layout are owned by GI28.", b: "Unauthorized copying is prohibited. No commercial use without permission." },
            { t: "Third-Party Services", f: "The website may integrate third-party tools or services.", b: "We are not responsible for third-party content. You interact at your own risk." },
            { t: "External Links", f: "This website may contain links to external websites.", b: "We do not endorse external content. Visiting links is at your discretion." },
            { t: "Availability of Services", f: "Website features may be modified, suspended, or discontinued at any time.", b: "Not liable for interruptions. Maintenance or updates may cause downtime." },
            { t: "Limitation of Liability", f: "We are not liable for any direct or indirect damages arising from website use.", b: "Includes data loss or service interruptions. Use is entirely at your own risk." },
            { t: "Prohibited Activities", f: "Users must not attempt to hack, exploit, or reverse-engineer the platform.", b: "Automated abuse or scraping is forbidden. Violations result in access restriction." },
            { t: "Changes to Terms", f: "These Terms & Conditions may be updated periodically.", b: "Continued use implies acceptance. Please review this page regularly." },
            { t: "Fair Usage Policy", f: "Users must use the platform fairly and within reasonable limits.", b: "Excessive requests or abuse leads to bans. We monitor usage for stability." },
            { t: "Account & Tool Access", f: "Some features may require user input or interaction to function properly.", b: "No account required unless stated. Access is non-transferable and for personal use." },
            { t: "Automated Systems", f: "Certain features may use automated or algorithm-based processes.", b: "Systems use predefined logic/public data. No guarantee of error-free automation." },
            { t: "No Affiliation", f: "This website operates independently and is not connected to any social media company.", b: "Brand names are for identification only. No partnership or endorsement implied." },
            { t: "User-Generated Input", f: "Any information submitted by users is provided voluntarily.", b: "You ensure accuracy. We are not liable for misleading user inputs." },
            { t: "Security Measures", f: "We implement reasonable security practices to protect platform integrity.", b: "No system is 100% secure. Maintain safe browsing practices." },
            { t: "Abuse Handling", f: "Any attempt to exploit system vulnerabilities is strictly prohibited.", b: "Violations lead to termination. Serious issues may be reported to authorities." },
            { t: "Service Modifications", f: "Features and tools may be updated, improved, or removed over time.", b: "We aim to enhance experience. Continued use implies acceptance of changes." },
            { t: "Performance Disclaimer", f: "Website performance may vary based on device, network, or browser.", b: "Not responsible for delays by third-parties. Outages may occur for maintenance." },
            { t: "Content Availability", f: "Some content may be updated, replaced, or removed periodically.", b: "No guarantee of permanent availability. Outdated content may remain visible." },
            { t: "Advertising", f: "This website may display advertisements to support platform maintenance.", b: "Ads provided by third-parties (e.g., AdSense). We do not control ad content." },
            { t: "Policy Compliance", f: "Users agree to comply with all applicable laws and regulations.", b: "Must not violate third-party terms. Non-compliance results in restricted access." },
            { t: "Disclaimer of Warranties", f: "All services are provided without warranties of any kind.", b: "We disclaim implied warranties. Access is at your own discretion." },
            { t: "Indemnification", f: "Users agree to indemnify and hold harmless GI28 from any claims.", b: "Includes misuse or unlawful activity. Responsibility lies solely with the user." },
            { t: "Termination of Access", f: "We reserve the right to terminate or suspend access at any time.", b: "Due to violations or security. No prior notice required in severe cases." },
            { t: "Severability", f: "If any part of these terms is found unenforceable, remaining sections remain valid.", b: "Invalid clauses shall not affect overall agreement enforceability." },
            { t: "Entire Agreement", f: "These Terms constitute the entire agreement between users and GI28.", b: "No external agreements override these conditions unless explicitly stated." },
            { t: "Updates & Revisions", f: "Terms may be revised to reflect legal or operational changes.", b: "You are responsible for reviewing updates. The latest version always applies." },
            { t: "Contact & Support", f: "Questions or concerns may be addressed via the Contact page.", b: "We strive to respond professionally. Feedback is welcomed to improve quality." }
        ];

        const colors = ['#00f2ea', '#ff0050', '#a000ff', '#ffd700', '#00ff9d', '#ff4d4d'];
        const icons = [
            '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
            '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
            '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
            '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
            '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>'
        ];

        /* =========================================
           2. DYNAMIC CARD GENERATION WITH GLOW
           ========================================= */
        const grid = document.getElementById('grid-container');

        termsData.forEach((term, index) => {
            const num = index + 1;
            const displayNum = num < 10 ? `0${num}` : num;
            const color = colors[index % colors.length];
            const iconSvg = icons[index % icons.length];

            // Dynamic styles for GLOW based on color
            const frontStyle = `border: 1px solid ${color}; box-shadow: 0 0 15px ${color}40, inset 0 0 20px ${color}10;`;
            const backStyle = `border: 1px solid ${color}; box-shadow: 0 0 30px ${color}60;`;

            const html = `
            <div class="card-scene" id="card-${index}">
                <div class="card-object">
                    <div class="card-face face-front" style="${frontStyle}">
                        <span class="term-number">${displayNum}</span>
                        <div class="icon-box" style="color: ${color}; border-color: ${color}40;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconSvg}</svg>
                        </div>
                        <h3>${term.t}</h3>
                        <p>${term.f}</p>
                        <div class="drag-hint" style="color: ${color}">⟲ Swipe to flip</div>
                    </div>
                    <div class="card-face face-back" style="${backStyle}">
                        <h3 style="color: ${color}">Details</h3>
                        <p class="back-text">${term.b}</p>
                    </div>
                </div>
            </div>`;
            
            grid.insertAdjacentHTML('beforeend', html);
        });

        /* =========================================
           3. INTERACTION (DRAG/SWIPE)
           ========================================= */
        setTimeout(() => {
            document.querySelectorAll('.card-scene').forEach(card => {
                const object = card.querySelector('.card-object');
                let isDragging = false, startX, currentRotation = 0, previousRotation = 0;

                const startDrag = (e) => {
                    isDragging = true;
                    startX = (e.type === 'touchstart') ? e.touches[0].pageX : e.pageX;
                    card.style.cursor = 'grabbing';
                    object.style.transition = 'none';
                };

                const onDrag = (e) => {
                    if (!isDragging) return;
                    let x = (e.type === 'touchmove') ? e.touches[0].pageX : e.pageX;
                    if(e.type === 'touchmove' && Math.abs(x - startX) > 10) e.preventDefault();
                    
                    const diffX = x - startX;
                    currentRotation = previousRotation + (diffX * 0.5);
                    object.style.transform = `rotateY(${currentRotation}deg)`;
                };

                const stopDrag = () => {
                    if (!isDragging) return;
                    isDragging = false;
                    card.style.cursor = 'grab';
                    previousRotation = currentRotation;
                    
                    // Snap logic (Front 0 or Back 180)
                    const normalizedRot = currentRotation % 360;
                    let snapRot = (Math.abs(normalizedRot) > 90 && Math.abs(normalizedRot) < 270) ? 180 : 0;
                    if (currentRotation < 0 && snapRot === 180) snapRot = -180;
                    
                    object.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    object.style.transform = `rotateY(${snapRot}deg)`;
                    previousRotation = snapRot;
                    currentRotation = snapRot;
                };

                card.addEventListener('mousedown', startDrag);
                card.addEventListener('touchstart', startDrag, { passive: false });
                window.addEventListener('mousemove', onDrag);
                window.addEventListener('touchmove', onDrag, { passive: false });
                window.addEventListener('mouseup', stopDrag);
                window.addEventListener('touchend', stopDrag);
            });
        }, 100);

        /* =========================================
           4. GLOBAL SCRIPTS (Nav & 3D BG)
           ========================================= */
        
        // Navigation Toggle
        const menuToggle = document.getElementById('menuToggle');
        const menuOverlay = document.getElementById('menuOverlay');
        const burgerIcon = document.querySelector('.burger-icon');
        let isMenuOpen = false;

        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if(isMenuOpen) {
                menuOverlay.classList.add('active');
                burgerIcon.classList.remove('fa-bars');
                burgerIcon.classList.add('fa-xmark');
            } else {
                menuOverlay.classList.remove('active');
                burgerIcon.classList.remove('fa-xmark');
                burgerIcon.classList.add('fa-bars');
            }
        });

        // Custom Cursor (PC)
        if (window.matchMedia("(pointer: fine)").matches) {
            const cursorDot = document.querySelector('.cursor-dot');
            const cursorOutline = document.querySelector('.cursor-outline');
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;
                cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
            });
        }

        // 3D Background (Three.js)
        const canvas = document.querySelector('#canvas-bg');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvas.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 300;
        const posArray = new Float32Array(particlesCount * 3);
        for(let i = 0; i < particlesCount * 3; i++) { posArray[i] = (Math.random() - 0.5) * 15; }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const material = new THREE.PointsMaterial({ size: 0.03, color: 0x00f2ea, transparent: true, opacity: 0.8 });
        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        const geo2 = new THREE.TorusGeometry(3, 0.02, 16, 100);
        const mat2 = new THREE.MeshBasicMaterial({ color: 0xff0050, wireframe: true, transparent: true, opacity: 0.2 });
        const ring = new THREE.Mesh(geo2, mat2);
        scene.add(ring);

        camera.position.z = 5;
        let mouseX = 0; let mouseY = 0;
        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        });

        const clock = new THREE.Clock();
        const animate = () => {
            const elapsedTime = clock.getElapsedTime();
            particlesMesh.rotation.y = elapsedTime * 0.05;
            particlesMesh.rotation.x = mouseY * 0.5;
            particlesMesh.rotation.y += mouseX * 0.5;
            ring.rotation.x = elapsedTime * 0.1;
            ring.rotation.y = elapsedTime * 0.1;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    
