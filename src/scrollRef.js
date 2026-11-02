import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const logo = document.querySelector(".logo");
const hammer = document.querySelectorAll(".hammer");

gsap.to(logo, {
  x: 100,
  duration: 1,
  backgroundColor: "yellow",
  repeat: -1,
  yoyo: true,
  
  ease: "Power4.inOut",
});

const number = document.querySelectorAll(".number");

const timeline = gsap.timeline();

timeline.from(".hammer", {
  scale: 0,
  duration: .5,

  ease: "Power4.out",

  scrollTrigger: {
    trigger: ".number",
    start: "-50px center",
    end: "150 center",

    scrub: true,
    markers: true,
  }
})

timeline.to(".hammer", {
  scale: 0.33,
  repeat: 1,
  yoyo: true,
  borderRadius: 25,

  stagger: {
    grid: [1, 5],
    from: "center",
    amount: .75,
  },

  backgroundColor: "yellow",

  duration: 1,

  ease: "power2.in"
});

timeline.to(".hammer", {
  y: 0,

  ease: "Power4.inOut",
});

timeline.to(".hammer", {
  backgroundColor: "yellow",
}, "<25%");

document.addEventListener("click", () => {
  timeline.seek(0);
});