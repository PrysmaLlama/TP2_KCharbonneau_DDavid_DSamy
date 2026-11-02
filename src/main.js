import './style.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PseudoRandom } from "./PseudoRandom";

gsap.registerPlugin(ScrollTrigger);


/*Dynamic hammers*/


/*Vars*/

  /*Hammers*/
const displayHolder = document.querySelectorAll(".displayHolder");
const hammers = document.querySelectorAll(".hammerElem");
const hammerNames = document.querySelectorAll(".hammerName");
const hammerPrices = document.querySelectorAll(".hammerPrice");
const hammerButtons = document.querySelectorAll(".hammerButton");
const tops = document.querySelectorAll(".top");
const middles = document.querySelectorAll(".middle");
const bottoms = document.querySelectorAll(".bottom");
let highestCurrentIndex = 16;
let hammersPerRow = 4;

  /*Gallery*/
const gallery = document.getElementById("gallery");
const galleryContainer = document.getElementById("galleryContainer");
const hammerElem = document.querySelector(".hammerElem");
const hammerElems = document.querySelectorAll(".hammerElem");
const galleryTitle = document.querySelector(".galleryTitle");

const topTrigger = document.getElementById("galleryTopTrigger");
const bottomTrigger = document.getElementById("galleryBottomTrigger");
const scroller = document.querySelector(".scroller");

  /*Filter*/
    /*Search*/
const hammerSearch = document.querySelector(".hammerSearch");
let hammerSearchValue = 0;
const resetSearchButton = document.getElementById("resetSearch");
let isFiltering = false;
  /*Price*/
const priceSearch = document.getElementById("priceRange");
let priceRangeValue = 0;
const resetPriceButton = document.getElementById("priceRange");
let isPriceRange = false;

let bottomTriggerCount = 0;


/*Hammer Anim*/

gsap.to(displayHolder, {
  y: 25,
  duration: 2,
  stagger: {
    duration: 5,
    amount: 2.5,
    repeat: -1,
    yoyo: true,
  },
  
  ease: "Power4.Out",
});


let generator = new PseudoRandom(1);

function SearchHammerByIndex(index) {
  hammerNames[0].textContent = `Marteau : ${index}`;
  const intIndex = parseInt(index);
  hammerPrices[0].textContent = `Prix : ${Math.round(generator.GetRandom(intIndex) / ((intIndex % 16) + 1))} $`;
  hammerButtons[0].textContent = `Ajouter au panier`;

  /*Update appearence*/

  /*Hide other hammers*/
  for (let i = 1; i < hammerNames.length; i++) {
    hammerElems[i].style.display = "none";
  }
}

let SHP_number = 1;
let SHP_triggered = false;
function SearchHammerByPrice(priceRange) {
  SHP_number = 1;
  for (let i = 1; i < hammerNames.length; i++) {
    if (SHP_number > 40000) {
      return;
    }

    SHP_triggered = false;

    while (SHP_triggered != true) {
      const price = FindHammerByNumber(SHP_number);

      if (price < (parseInt(priceRange) + 100) && price >= priceRange) {
        hammerNames[i].textContent = `Marteau : ${SHP_number}`;
        hammerPrices[i].textContent = `Prix : ${price} $`;
        hammerButtons[i].textContent = `Ajouter au panier`;

        SHP_triggered = true;
      }
      SHP_number++;
      
    }
  }
}

function FindHammerByNumber(number) {
  const price = Math.round(generator.GetRandom(number) / ((number % 16) + 1));
  return price;
}

function ShowAllHammers() {
  SearchHammerByIndex(1);
  for (let i = 1; i < hammerNames.length; i++) {
    hammerElems[i].style.display = "flex";
  }
}

function UpdateHammerInfo(count) {
  for (let i = 0; i < hammerNames.length; i++) {
    hammerNames[i].textContent = `Marteau : ${count * hammersPerRow + i + 1}`;
    hammerPrices[i].textContent = `Prix : ${Math.round(generator.GetRandom(i + 1) / (i + 1))} $`;
    hammerButtons[i].textContent = `Ajouter au panier`;

    if (i == hammerNames.length-1) {
      highestCurrentIndex = count * hammersPerRow + i + 1
      console.log(`Current highest index : ${highestCurrentIndex}`);
    }
  }
}

function UpdateHammerDisplay(count) {
  for (let i = 0; i < hammerNames.length; i++) {
    let [tr, tg, tb] = window.getComputedStyle(tops[i]).backgroundColor.match(/\d+/g).map(Number);
    let [mr, mg, mb] = window.getComputedStyle(middles[i]).backgroundColor.match(/\d+/g).map(Number);
    let [br, bg, bb] = window.getComputedStyle(bottoms[i]).backgroundColor.match(/\d+/g).map(Number);

    /*Top*/
    let tRandNum = generator.GetRandom(count * hammersPerRow + i + 1) % 255;
    tr = (tr + tRandNum) > 255 ? (tr + tRandNum) - 255 : (tr + tRandNum);
    tg = (tg + tRandNum * 1.25) > 255 ? (tg + tRandNum * 2) - 255 : (tg + tRandNum * 1.25);
    tb = (tb + tRandNum * 2) > 255 ? (tb + tRandNum * 1.25) - 255 : (tb + tRandNum * 2);

    tops[i].style.backgroundColor = `rgb(${tr / 2}, ${tg / 4}, ${tb / 2})`

    /*Middle*/
    let mRandNum = generator.GetRandom(count * hammersPerRow + i + 1) % 255;
    mr = (mr + mRandNum) > 255 ? (mr + mRandNum) - 255 : (mr + mRandNum);
    mg = (mg + mRandNum * 5) > 255 ? (mg + mRandNum * 4) - 255 : (mg + mRandNum * 5);
    mb = (mb + mRandNum * 4) > 255 ? (mb + mRandNum * 5) - 255 : (mb + mRandNum * 4);

    middles[i].style.backgroundColor = `rgb(${mr / 2}, ${mg / 4}, ${mb / 2})`

    /*Bottom*/
    let bRandNum = generator.GetRandom(count * hammersPerRow + i + 1) % 255;
    br = (br + bRandNum) > 255 ? (br + bRandNum) - 255 : (br + bRandNum);
    bg = (bg + bRandNum * 3) > 255 ? (bg + bRandNum * 6) - 255 : (bg + bRandNum * 3);
    bb = (bb + bRandNum * 6) > 255 ? (bb + bRandNum * 3) - 255 : (bb + bRandNum * 6);

    bottoms[i].style.backgroundColor = `rgb(${br / 2}, ${bg / 4}, ${bb / 2})`

    console.log(`tRandNum : ${generator.GetRandom(count * 16 + i + 1)}, mRandNum : ${mRandNum}, bRandNum : ${bRandNum}`);
    console.log(`TOP - r : ${tr}, mg : ${tr}, b : ${tr} | MIDDLE - r : ${mr}, g : ${mr}, b : ${mr} | BOTTOM - r : ${br}, g : ${br}, b : ${br}`);
  }
}

UpdateHammerInfo(bottomTriggerCount);
UpdateHammerDisplay(bottomTriggerCount);


/*Gallery*/

/*Setups*/

  /*need to refresh these*/
let topTriggerPos = () => topTrigger.getBoundingClientRect().bottom;
let bottomTriggerPos = () => bottomTrigger.getBoundingClientRect().bottom;
let scrollerPos = () => scroller.getBoundingClientRect().bottom;
let totalOffset = (b) => {
  if (!hammerElem || !galleryContainer) return 0;

  const elemHeight = hammerElem.offsetHeight;
  const computedStyles = window.getComputedStyle(galleryContainer);
  const rowGap = parseFloat(computedStyles.rowGap) || 0;

  /*(b == true ? bottomTriggerCount : 1)*/
  return (elemHeight + rowGap) * b;
};
//set trigger pos using gallery elems height + gallery gap + galleryTitles height;
topTrigger.style.top = `${totalOffset(1) + parseFloat(window.getComputedStyle(gallery).rowGap) + galleryTitle.offsetHeight}px`;
//set trigger pos using gallery elems height;
bottomTrigger.style.bottom = `${150 + totalOffset(1)}px`;


/*Gallery Functions*/

function printInfo() {
  console.log(`Top: ${topTriggerPos()}, Bottom ${bottomTriggerPos()}, Scroller: ${scrollerPos()}`);
};

function CompareTopTrigger() {
  /*if scroller above top -> gallery should move up*/
  if (topTriggerPos() - scrollerPos() > 0) {
    return true;
  }
  return false;
};
function CompareBottomTrigger() {
  /*if scroller below bottom -> gallery should move down*/
  if (bottomTriggerPos() - scrollerPos() < 0) {
    return true; 
  }
  return false;
};

function HandleGallery() {
  if (CompareBottomTrigger() && !(highestCurrentIndex >= 40000)) { //Check Bottom Trigger
    bottomTriggerCount++;
    gallery.style.marginTop = `${totalOffset(bottomTriggerCount)}px`;

    console.log(`BOTTOM - MarginTop: ${gallery.style.marginTop}, Offset: ${totalOffset(bottomTriggerCount)}, BottomCount: ${bottomTriggerCount}`);

    return true;
  }
  else if (CompareTopTrigger() && bottomTriggerCount != 0) { //Check Top Trigger
    bottomTriggerCount--;
    gallery.style.marginTop = `${totalOffset(bottomTriggerCount)}px`;

    console.log(`TOP - MarginTop: ${gallery.style.marginTop}, Offset: ${totalOffset(bottomTriggerCount)}, BottomCount: ${bottomTriggerCount}`);

    return true;
  }
  return false;
};


/*Events*/

const eventTimerMax = 0.1;
const eventTimerInt = 10;
let eventTimer = 0.0;
let lastTime = performance.now();

const Timer = setInterval(() => {
  const currentTime = performance.now();
  const delta = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  eventTimer += delta;
}, eventTimerInt);

window.addEventListener("scroll", () => {
  if (!isFiltering && HandleGallery()) {
    UpdateHammerInfo(bottomTriggerCount);
    UpdateHammerDisplay(bottomTriggerCount);
  }
});

 /*Filters*/
  /*Search*/
hammerSearch.addEventListener("input", () => {
  hammerSearchValue = hammerSearch.value;

  if (hammerSearchValue == 0 || hammerSearchValue > 40000) {
    ShowAllHammers();
  } else {
    isFiltering = true;

    SearchHammerByIndex(hammerSearchValue);
  }

  console.log(hammerSearchValue);
});

resetSearchButton.addEventListener("click", () => {
  hammerSearch.value = 0;
  hammerSearchValue = 0;

  isFiltering = false;
  ShowAllHammers();
});

  /*Price*/
priceSearch.addEventListener("input", () => {
  priceRangeValue = priceSearch.value;

  if (priceRangeValue == 0) {
    ShowAllHammers();
  } else {
    isPriceRange = true;

    SearchHammerByPrice(priceRangeValue);
  }

  console.log(priceRangeValue);
});

resetPriceButton.addEventListener("click", () => {
  priceSearch.value = 0;
  priceRangeValue = 0;

  isPriceRange = false;
  ShowAllHammers();
});