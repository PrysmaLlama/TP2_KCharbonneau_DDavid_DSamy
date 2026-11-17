import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
 
gsap.registerPlugin(ScrollTrigger);
 
const hammer = document.querySelectorAll(".hammer");
 
gsap.to(".ham", {
    rotation: -45,
    duration: 1,
    repeat: -1,
    yoyo: true,
})

gsap.to(".hamR", {
    rotation: 1,
    duration: 1,
    repeat: -1,
    yoyo: true,
})