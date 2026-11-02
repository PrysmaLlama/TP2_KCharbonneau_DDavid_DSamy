import './style.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


/*Gallery*/
// const gallery = document.querySelector(".gallery");

// const hammerElem = document.querySelector('.hammerElem');
// const galleryContainer = document.querySelector('.galleryContainer');

// let getTotalOffset = () => {
//   if (!hammerElem || !galleryContainer) return 0;

//   const elemHeight = hammerElem.offsetHeight;
//   const computedStyles = window.getComputedStyle(galleryContainer);
//   const rowGap = parseFloat(computedStyles.rowGap) || 0;

//   return (elemHeight + rowGap) * bottomCount;
// };

// if (hammerElem && galleryContainer) {

// }

// /*Bottom trigger*/
// const galleryBT = document.querySelector(".galleryBottomTrigger");
// let bottomCount = 1;

// const timelineBottom = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".galleryBottomTrigger",
//     invalidateOnRefresh: true,
//     start: () => `top-=${getTotalOffset() / (bottomCount==1 ? 1 : bottomCount * 2)}px center`, 
//     end: () => `+=10px`, 

//     markers: true,
//   }
// });

// timelineBottom.to(".gallery", {
//   y: getTotalOffset(),
//   duration: 0,

//   onComplete: () => {
//     bottomCount += 1;
//     console.log(bottomCount);

//     ScrollTrigger.refresh();
//   },
// });

// const gallery = document.querySelector(".gallery");
// const hammerElem = document.querySelector('.hammerElem');
// const galleryContainer = document.querySelector('.galleryContainer');

/*BottomTrigger*/

// let bottomCount = 0;

// let getTotalOffset = () => {
//   if (!hammerElem || !galleryContainer) return 0;

//   const elemHeight = hammerElem.offsetHeight;
//   const computedStyles = window.getComputedStyle(galleryContainer);
//   const rowGap = parseFloat(computedStyles.rowGap) || 0;

//   return (elemHeight + rowGap) * bottomCount;
// };

// const bottomTrigger = ScrollTrigger.create({
//   trigger: ".galleryBottomTrigger",
//   invalidateOnRefresh: true,
//   start: () => `top-=${500}px center`,
//   end: () => `+=10px`,
//   markers: false,
  
//   onEnter: () => {
//     bottomTrigger.disable(false);

//     bottomCount += 1;
//     console.log(`Stepping down safely. Current count: ${bottomCount}`);

//     gsap.to(".galleryContainer", {
//       marginTop: getTotalOffset(), 
//       duration: 0,
//       onComplete: () => {
//         ScrollTrigger.refresh();
//         bottomTrigger.enable(false);
//       }
//     });
//   }
// });

// /*Top trigger*/

// const galleryTT = document.querySelector(".galleryTopTrigger");

// const topTrigger = ScrollTrigger.create({
//   trigger: ".galleryTopTrigger",
//   invalidateOnRefresh: true,
//   start: () => `bottom+=${500}px center`,
//   end: () => `+=10px`,
//   markers: true,
  
//   onEnter: () => {
//     topTrigger.disable(false);

//     bottomCount == 0 ? 0 : bottomCount - 1;
//     console.log(`Stepping up safely. Current count: ${bottomCount}`);

//     gsap.to(".galleryContainer", {
//       marginTop: getTotalOffset(), 
//       duration: 0,
//       onComplete: () => {
//         ScrollTrigger.refresh();
//         topTrigger.enable(false);
//       }
//     });
//   }
// });

const galleryContainer = document.querySelector('.galleryContainer');
const hammerElem = document.querySelector('.hammerElem');

// 1. Calculate a single step distance
let getStepSize = () => {
  if (!hammerElem || !galleryContainer) return 0;
  const elemHeight = hammerElem.offsetHeight;
  const computedStyles = window.getComputedStyle(galleryContainer);
  const rowGap = parseFloat(computedStyles.rowGap) || 0;
  return elemHeight + rowGap;
};

// 2. Pin the gallery container so it never physically leaves the screen
ScrollTrigger.create({
  trigger: ".galleryContainer",
  start: "top top",
  end: "+=17000000px",  // 6000px = 14 hammers : 40000/14 * 6000
  markers: true,
  pin: true,        // Locks the element visually in the viewport
  pinSpacing: true, // Creates actual scrolling space beneath it
  
  onUpdate: (self) => {
    const step = getStepSize();
    if (step === 0) return;

    // self.scroll() gives us the exact total pixels scrolled inside our 6000px track
    const totalPixelsScrolled = self.scroll();

    // Map pixel scroll value into a layout multiplier step (e.g., 0, 1, 2, 3...)
    const currentStepIndex = Math.floor(totalPixelsScrolled / step);

    // GSAP Wrap utility cleanly loops the index so it cycles infinitely
    // Example: If you have 4 items, step index 5 wraps around to index 1 seamlessly
    const wrappedYValue = (totalPixelsScrolled % step); 

    // Move your items vertically synchronized directly to the user's mouse wheel
    gsap.set(".galleryContainer", {
      y: -wrappedYValue
    });
  },
  
  // Clean up and reset positions when leaving the infinite zone
  onLeave: () => gsap.set(".galleryContainer", { y: 0 }),
  onLeaveBack: () => gsap.set(".galleryContainer", { y: 0 })
});


