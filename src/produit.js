// Page fait par David Diaz

import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const titreSimilaire = document.getElementById("#titreSimilaire");
const imgSimilaire = document.querySelector(".imgSimilaire");


// Alterner images du produit

const imgProduit = document.getElementById('imgProduit');
const boutonChanger = document.getElementById('changerImage');

let imageActuelle = 1;

boutonChanger.addEventListener('click', function() {

    if(imageActuelle === 1) {
        imgProduit.src = "src/assets/javascript.svg";
        imageActuelle = 2;
    } else {
        imgProduit.src = "src/assets/hero.png";
        imageActuelle = 1;
    }
});


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
        end: 'bottom bottom',
        markers: true,
        scrub: 4,   
    }  
})



