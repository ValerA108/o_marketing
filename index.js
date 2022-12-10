import "normalize.css";
import "./styles/main.css";
const mixitup = require("mixitup");

const mixer = mixitup(".portfolio__content", {
  animation: {
    duration: 900,
    // effectsOut: "fade translateY(-100%)",
    animateResizeContainer: false,
  },
});

const videoBtn = document.querySelector(".portfolio__video-link");
const darkBg = document.querySelector(".popup__body-video");
const clip = document.querySelector(".clip");

const clipStop = document.querySelector("iframe");

const body = document.querySelector("body");

videoBtn.onclick = function () {
  videoBtn.classList.add("active");
  darkBg.classList.add("active");
  clip.classList.add("active");
  body.classList.add("lock");
  clipStop.setAttribute("src", "https://www.youtube.com/embed/79KAKX1nnwU");

  document
    .querySelector(".popup__body-video")
    .addEventListener("click", (event) => {
      darkBg.classList.remove("active");
      clip.classList.remove("active");
      body.classList.remove("lock");

      const clipStop = document.querySelector("iframe");
      clipStop.setAttribute("src", " ");
    });
};

//slider//

let items = document.querySelectorAll(".item");
let currentItem = 0;
let isEnabled = true;

let dot = document.querySelectorAll(".dot");

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function changeCurrentDot(n) {
  currentItem = (n + dot.length) % dot.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("item__active", direction);
  });

  dot[currentItem].classList.add(direction);
  dot[currentItem].addEventListener("animationend", function () {
    this.classList.remove("dot__active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);

  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("item__active");
    isEnabled = true;
  });

  dot[currentItem].classList.add("next", direction);

  dot[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("dot__active");
    isEnabled = true;
  });
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

document.querySelector(".btn__left").addEventListener("click", function () {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector(".btn__right").addEventListener("click", function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

dot.addEventListener("click", function () {
  if (isEnabled) {
    currentItem;
  }
});

const swipeDetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 300;

  surface.addEventListener(
    "mousedown",
    function (e) {
      dist = 0;
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    },
    false
  );

  surface.addEventListener(
    "mouseup",
    function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime();

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            if (isEnabled) {
              previousItem(currentItem);
            }
          } else {
            if (isEnabled) {
              nextItem(currentItem);
            }
          }
        }
      }
      e.preventDefault();
    },
    false
  );
};
let el = document.querySelector(".carousel");
swipeDetect(el);

// end slider //

// slider 2022//

// const BTN_LEFT = document.querySelector(".btn__left");
// const BTN_RIGHT = document.querySelector(".btn__right");
// const CAROUSEL = document.querySelector(".carousel");
// const ITEM_LEFT = document.querySelector(".item__left");
// const ITEM_RIGHT = document.querySelector(".item__right");

// const createCardTemplate = () => {
//   const card = document.createElement("div");
//   card.classList.add("card");
//   return card;
// };

// const moveLeft = () => {
//   CAROUSEL.classList.add("transition-left");
//   BTN_LEFT.removeEventListener("click", moveLeft);
//   BTN_RIGHT.removeEventListener("click", moveRight);
// };

// const moveRight = () => {
//   CAROUSEL.classList.add("transition-right");
//   BTN_RIGHT.removeEventListener("click", moveRight);
//   BTN_LEFT.removeEventListener("click", moveLeft);
// };

// BTN_LEFT.addEventListener("click", moveLeft);
// BTN_RIGHT.addEventListener("click", moveRight);

// CAROUSEL.addEventListener("animationend", (animationEvent) => {
//   let changedItem;
//   if (animationEvent.animationName === "move-left") {
//     CAROUSEL.classList.remove("transition-left");
//     changedItem = ITEM_LEFT;

//     document.querySelector(".item__active").innerHTML = ITEM_LEFT.innerHTML;
//   } else {
//     CAROUSEL.classList.remove("transition-right");

//     changedItem = ITEM_RIGHT;

//     document.querySelector(".item__active").innerHTML = ITEM_RIGHT.innerHTML;
//   }

//   changedItem.innerHTML = "";
//   for (let i = 0; i < 3; i++) {
//     const card = createCardTemplate();
//     card.innerText = Math.floor(Math.random() * 5);
//     changedItem.appendChild(card);
//   }

//   BTN_LEFT.addEventListener("click", moveLeft);
//   BTN_RIGHT.addEventListener("click", moveRight);
// });

// end slider 2022//

// import "./assets/favicon.ico";
// import monitorIcon from './assets/monitor-icon.svg';
// require('svg-url-loader?prefix=assets/!./monitor-icon.svg');
// require('svg-url-loader!./monitor-icon.svg');
// require('svg-url-loader!./monitor-icon.svg');

// const logoSvg = document.getElementById('logoSvg');
// logoSvg.src = logo;

// import img from './assets/logo.svg';

// document.body.innerHTML = `<img src="${img}" alt="logo"`;
