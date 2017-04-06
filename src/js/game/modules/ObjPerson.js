/**
 * Created by Denis on 05.04.2017.
 */
import * as THREE from 'three';
export default class ObjPerson {
    constructor(scene, sceneContext) {
        this.scene = scene;
        this.sceneContext = sceneContext;
        this.material = new THREE.MeshLambertMaterial(
            {color: 0x7777ff /*shading: THREE.FlatShading,*/ /*skinning: true*/});
    }

    render() {
        this._renderHead();
        this._renderBody();
        this._renderLeftLegTop();
        this._renderLeftLegBottom();
        this._renderRightLegTop();
        this._renderRightLegBottom();
        this._renderRightArmBottom();
        this._renderRightArmTop();
        this._renderLeftArmTop();
        this._renderLeftArmBottom();
    }

    _renderHead() {
        let elemG = new THREE.SphereGeometry(2, 20, 20);
        this.head = new THREE.SkinnedMesh(elemG, this.material);
        this.head.position.x = 15;
        this.head.position.y = 5;
        this.head.position.z = 0;
        this.scene.add(this.head);
    }

    _renderBody() {
        let elemG = new THREE.BoxGeometry(1, 8, 1);
        this.body = new THREE.SkinnedMesh(elemG, this.material);
        this.body.position.x = 15;
        this.body.position.y = 0;
        this.body.position.z = 0;
        this.scene.add(this.body);
    }

    _renderLeftLegTop() {
        let elemG = new THREE.BoxGeometry(1, 4, 1);
        this.legLT = new THREE.SkinnedMesh(elemG, this.material);
        this.legLT.position.x = 13;
        this.legLT.position.y = -5.5;
        this.legLT.position.z = 0;

        this.legLT.rotation.z = Math.PI / -4;
        this.scene.add(this.legLT);
    }

    _renderRightLegTop() {
        let elemG = new THREE.BoxGeometry(1, 4, 1);
        this.legRT = new THREE.SkinnedMesh(elemG, this.material);
        this.legRT.position.x = 17;
        this.legRT.position.y = -5.5;
        this.legRT.position.z = 0;

        this.legRT.rotation.z = Math.PI / 4;
        this.scene.add(this.legRT);
    }

    _renderLeftLegBottom() {
        let elemG = new THREE.BoxGeometry(1, 4, 1);
        this.legLB = new THREE.SkinnedMesh(elemG, this.material);
        this.legLB.position.x = 13 - Math.PI / 4 - 0.5;
        this.legLB.position.y = -8.5;
        this.legLB.position.z = 0;

        this.scene.add(this.legLB);
    }

    _renderRightLegBottom() {
        let elemG = new THREE.BoxGeometry(1, 4, 1);
        this.legRB = new THREE.SkinnedMesh(elemG, this.material);
        this.legRB.position.x = 17 + Math.PI / 4 + 0.5;
        this.legRB.position.y = -8.5;
        this.legRB.position.z = 0;

        this.scene.add(this.legRB);
    }

    /*testRender(geometry, materials) {
        this.armRT = geometry.children[0];
        // this.armRT = new THREE.SkinnedMesh(geometry.children[0], this.material);
        console.log(this.armRT);

        this.scene.add(this.armRT);
        let help = new THREE.SkeletonHelper(this.armRT);
        this.scene.add(help);
    }*/

    _renderRightArmTop() {
        /*let loader = new THREE.ObjectLoader();
        loader.load('/src/js/geometryResources/arm.json', this.testRender.bind(this));*/
        let elemG = new THREE.BoxGeometry(1, 9, 1);

         for (let i = 0; i < elemG.vertices.length; i++) {
         let skinIndex = i;
         let skinWeight = i;

         elemG.skinIndices.push(new THREE.Vector4(skinIndex, skinIndex + 1, 0, 0));
         elemG.skinWeights.push(new THREE.Vector4(1 - skinWeight, skinWeight, 0, 0));
         }

         this.armRT = new THREE.SkinnedMesh(elemG, this.material);
         this.armRT.position.x = -10 ;
         this.armRT.position.y = 0;
         this.armRT.position.z = 0;

         let bones = [];

         let shoulder = new THREE.Bone();
         let elbow = new THREE.Bone();
         let hand = new THREE.Bone();

         shoulder.add(elbow);
         elbow.add(hand);

         bones.push(shoulder);
         bones.push(elbow);
         bones.push(hand);

         shoulder.position.y = -5;
         elbow.position.y = 0;
         hand.position.y = 10;

         let armSkeleton = new THREE.Skeleton(bones);

         let rootBone = armSkeleton.bones[0];
         this.armRT.add(rootBone);

         this.armRT.bind(armSkeleton);

         this.scene.add(this.armRT);
         let help = new THREE.SkeletonHelper(this.armRT);
         this.scene.add(help);
         console.log(this.armRT);
    }

    _renderLeftArmTop() {
        let elemG = new THREE.BoxGeometry(1, 4, 1);
        this.armLT = new THREE.SkinnedMesh(elemG, this.material);
        this.armLT.position.x = 13 - Math.PI / 4 - 0.5;
        this.armLT.position.y = 2 + Math.PI / 4 + 2;
        this.armLT.position.z = 0;

        this.armLT.rotation.z = Math.PI;
        this.scene.add(this.armLT);
    }

    _renderRightArmBottom() {
        let elemG = new THREE.BoxGeometry(1, 4, 1);
        this.armRB = new THREE.SkinnedMesh(elemG, this.material);
        this.armRB.position.x = 17;
        this.armRB.position.y = 2;
        this.armRB.position.z = 0;

        this.armRB.rotation.z = Math.PI / -4;
        this.scene.add(this.armRB);
    }

    _renderLeftArmBottom() {
        let elemG = new THREE.BoxGeometry(1, 4, 1);
        this.armLB = new THREE.SkinnedMesh(elemG, this.material);
        this.armLB.position.x = 13;
        this.armLB.position.y = 2;
        this.armLB.position.z = 0;

        this.armLB.rotation.z = Math.PI / 4;
        this.scene.add(this.armLB);
    }

    depnut() {
        let step = 0;
        //console.log(this.armRT.skeleton.bones);
        let render = () => {
            window.requestAnimationFrame(render);
            step = 0.01;
            if (this.armRT) {
                this.armRT.skeleton.bones[2].rotation.x += step;
                this.armRT.skeleton.bones[2].rotation.y += step;
                this.armRT.skeleton.bones[2].rotation.z += step;

                //console.log(this.scene.children[15].skeleton.bones[1].rotation.x);
                //this.armRT.skeleton.bones[1].rotation.z += step;
                /*    this.armRT.skeleton.bones[0].rotation.y += step;
                 this.armRT.skeleton.bones[0].rotation.z += step;*/
            }

            //console.log(this.armRT.skeleton.bones[0].rotation.x);

        };
        render();
        /* let step = 0;
         let render = () => {
         step += 0.02;
         window.requestAnimationFrame(render);
         this.armRT.skeleton.bones[0].rotation.x += 0.02;
         this.armRT.skeleton.bones[1].rotation.y += 0.02;
         this.armRT.skeleton.bones[2].rotation.z += 0.02;
         this.sceneContext.refreshScene();
         };
         render();*/
    }
}