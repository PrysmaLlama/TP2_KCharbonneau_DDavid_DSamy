import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const titreSimilaire = document.getElementById("#titreSimilaire");
const imgSimilaire = document.querySelector(".imgSimilaire");

// Animation des produits similaires

gsap.from(".imgSimilaire", {

    y:200,
    duration: 1,
    opacity: 0,
    ease: 'power2.inOut',

    stagger: {
        each: 0.1,
        from: 'start',
    },

    scrollTrigger: {
        trigger: '#titreSimilaire',
        start: 'top center',
        end: 'bottom center',
        markers: true,
        scrub: 4,   
    }  
})

