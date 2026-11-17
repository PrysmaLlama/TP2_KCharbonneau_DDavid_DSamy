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

gsap.fromTo(".hamR",
    {
        scaleX: -1,
        scaleY: 1,
        rotation: 0,
    },
    {
    rotation: 45,
    scaleX: -1,
    scaleY: 1,
    duration: 1,
    repeat: -1,
    yoyo: true,
})