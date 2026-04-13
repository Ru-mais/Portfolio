import * as THREE from 'three';
import gsap from 'gsap';

export class Scene3D {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.camera.position.z = 6;

        // Lights for God-Tier Adaptive Environment
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0x38bdf8, 15);
        this.pointLight.position.set(5, 5, 5);
        this.scene.add(this.pointLight);

        this.secondaryLight = new THREE.PointLight(0x8b5cf6, 10);
        this.secondaryLight.position.set(-5, -5, 2);
        this.scene.add(this.secondaryLight);

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // God-Tier Adaptive Lighting Method
    updateSceneAtmosphere(primaryColor, secondaryColor) {
        gsap.to(this.pointLight.color, {
            r: new THREE.Color(primaryColor).r,
            g: new THREE.Color(primaryColor).g,
            b: new THREE.Color(primaryColor).b,
            duration: 2,
            ease: "power2.inOut"
        });

        gsap.to(this.secondaryLight.color, {
            r: new THREE.Color(secondaryColor).r,
            g: new THREE.Color(secondaryColor).g,
            b: new THREE.Color(secondaryColor).b,
            duration: 2,
            ease: "power2.inOut"
        });
    }

    render(updateCallback) {
        const animate = () => {
            requestAnimationFrame(animate);
            if (updateCallback) updateCallback();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}
