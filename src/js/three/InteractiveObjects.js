import * as THREE from 'three';

export class InteractiveObjects {
    constructor(scene) {
        this.scene = scene;
        this.nodes = null;
        this.lines = null;
        this.particles = null;
        this.nodeCount = 400;
        this.maxDistance = 2.5;
    }

    createHeroObject() {
        const group = new THREE.Group();
        
        // 1. Create Nodes (Points)
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.nodeCount * 3);
        
        for (let i = 0; i < this.nodeCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const nodeMaterial = new THREE.PointsMaterial({
            color: 0x38bdf8,
            size: 0.1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.nodes = new THREE.Points(geometry, nodeMaterial);
        group.add(this.nodes);

        // 2. Create Connections (Lines)
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });

        this.updateConnections(lineMaterial, group);
        
        this.mainObject = group;
        this.scene.add(this.mainObject);
        return this.mainObject;
    }

    updateConnections(material, group) {
        const positions = this.nodes.geometry.attributes.position.array;
        const linePositions = [];
        
        for (let i = 0; i < this.nodeCount; i++) {
            for (let j = i + 1; j < this.nodeCount; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (dist < this.maxDistance) {
                    linePositions.push(
                        positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );
                }
            }
        }
        
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        
        if (this.lines) group.remove(this.lines);
        this.lines = new THREE.LineSegments(lineGeometry, material);
        group.add(this.lines);
    }

    createParticles(count = 2000) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 30;
            positions[i + 1] = (Math.random() - 0.5) * 30;
            positions[i + 2] = (Math.random() - 0.5) * 30;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        return this.particles;
    }

    update(time, mouseX, mouseY) {
        if (this.mainObject) {
            this.mainObject.rotation.y = time * 0.1;
            this.mainObject.rotation.x = time * 0.05;
            
            // Pulse opacity
            if (this.lines) {
                this.lines.material.opacity = 0.1 + Math.sin(time * 2) * 0.1;
            }

            // Mouse reaction
            this.mainObject.position.x = THREE.MathUtils.lerp(this.mainObject.position.x, mouseX * 2, 0.05);
            this.mainObject.position.y = THREE.MathUtils.lerp(this.mainObject.position.y, -mouseY * 2, 0.05);
        }

        if (this.particles) {
            this.particles.rotation.y = time * 0.02;
        }
    }
}
