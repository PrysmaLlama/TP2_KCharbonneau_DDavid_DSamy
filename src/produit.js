// Page entière fait par David Diaz

import './style.css';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Constantes pour l'image du produit

const imgProduit = document.getElementById('imgProduit');
const boutonChanger = document.getElementById('changerImage');

// Constantes pour l'information du produit

const nomProduit = document.querySelector('nomProduit');


// Constantes pour les produits similaires

const titreSimilaire = document.getElementById("#titreSimilaire");
const imgSimilaire = document.querySelector(".imgSimilaire");


// Alterner images du produit


let imageActuelle = 1;

boutonChanger.addEventListener('click', function() {

    if(imageActuelle === 1) {
        imgProduit.src = "./public/skullHammer2.png";
        imageActuelle = 2;
    } else {
        imgProduit.src = "./public/skullHammer.png";
        imageActuelle = 1;
    }
});

// Petite Animation de l'image du produit

gsap.from('#imgProduit', {
    opacity: 0,
    duration: 1,
})

// Animation des informations du produit




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



