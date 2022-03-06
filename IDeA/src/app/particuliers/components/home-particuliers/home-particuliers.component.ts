import { AfterViewInit, ElementRef, Input, Component, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";

@Component({
  selector: 'app-home-particuliers',
  templateUrl: './home-particuliers.component.html',
  styleUrls: ['./home-particuliers.component.css']
})
export class HomeParticuliersComponent implements OnInit, AfterViewInit{
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;
  @Input() public texture: string = "/assets/texture.jpg";


  @Input() public cameraZ: number = 200;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement{
    return this.canvasRef.nativeElement;
  }
  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1,1,1);
  // private geometry = new THREE.RingGeometry(1,2,32);

  private material = new THREE.MeshBasicMaterial({map:  this.loader.load(this.texture)})
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  private createScene(){
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.cube);

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPlane
    )
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio(){
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animateCube(){
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private startRenderingLoop(){
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: HomeParticuliersComponent = this;
    (function render(){
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngAfterViewInit(): void {
      this.createScene();
      this.startRenderingLoop();
  }

}
