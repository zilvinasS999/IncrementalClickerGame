let points = 0;

let pointsPerClick = 1;
let fivePerClick = 0;
let tenPerClick = 0;
let cookiePerSec = 0;
let intervalSet = false;
let currentUrl;
let toggle;

const cookieImg = document.querySelector('.cookie-img');
const gameDiv = document.querySelector('.game');
const msg = document.createElement('h3');
const msgContainer = document.querySelector('.message-container');
const pointsCounter = document.querySelector('.points');
const cookieImgBtn = document.querySelector('.change-cookie');
const bgBtn = document.querySelector('.change-bg');
const background = document.querySelector('.background');
const spinBtn = document.querySelector('.spin-cookie');
const addPointBtn = document.querySelector('.add-point');
const addFiveBtn = document.querySelector('.add-five');
const addTenBtn = document.querySelector('.add-ten');
const cookieSec = document.querySelector('.cookie-sec');
const cookieImgOne = './assets/imgs/cookiepng1.webp';
const cookieImgTwo = './assets/imgs/cookiepng2.jpg';

const addPoints = () => {
  points += pointsPerClick;
  points += fivePerClick;
  points += tenPerClick;
  pointsCounter.innerText = `${points} cookies`;

  localStorage.setItem('getPoints', points);

  msg.remove();
};

cookieImg.addEventListener('click', function () {
  shrinkCookie();
  addPoints();
  pointsCounter.innerText = `${points} cookies`;
});

const handleImg = () => {
  if (points >= 20) {
    points -= 20;
    pointsCounter.innerText = `${points} cookies`;
    localStorage.setItem('getPoints', points);
    toggle = !toggle;

    localStorage.setItem('toggle', toggle);

    if (toggle) {
      cookieImg.style.backgroundImage = `url(${cookieImgOne})`;
      currentUrl = cookieImgOne;
      localStorage.setItem('currentImg', currentUrl);
    } else {
      cookieImg.style.backgroundImage = `url(${cookieImgTwo})`;
      currentUrl = cookieImgTwo;
      localStorage.setItem('currentImg', currentUrl);
    }

    msg.remove();
  } else {
    console.log('not enough points');
    msg.innerText = 'Not enough Cookies!';
    msgContainer.append(msg);
  }
};

cookieImgBtn.addEventListener('click', function () {
  handleImg();
});

const shrinkCookie = () => {
  cookieImg.style.animation = 'none'; // resets animations and let's other animations to trigger if the first didn't finish
  cookieImg.offsetHeight; // also lets animations to restart
  cookieImg.style.animation = 'shrink 0.2s'; // triggers the animation from css file
};

const spinCookie = () => {
  if (points >= 50) {
    points -= 50;
    pointsCounter.innerText = `${points} cookies`;

    cookieImg.style.animation = 'none'; // clears any existing animations
    cookieImg.offsetHeight;
    localStorage.setItem('getPoints', points);
    cookieImg.style.animation = 'spin 2s linear 1'; // triggers the animation from css file
    msg.remove();
  } else {
    msg.innerText = 'Not enough Cookies!';
    msgContainer.append(msg);
  }
};

spinBtn.addEventListener('click', function () {
  spinCookie();
});

const addPoint = () => {
  if (points >= 100) {
    points -= 100;
    pointsCounter.innerText = `${points} cookies`;
    pointsPerClick += 1;
    msg.remove();
  } else {
    msg.innerText = 'Not enough Cookies!';
    msgContainer.append(msg);
  }
};

addPointBtn.addEventListener('click', function () {
  addPoint();
});

const addFive = () => {
  if (points >= 300) {
    points -= 300;
    pointsCounter.innerText = `${points} cookies`;

    fivePerClick += 5;
    msg.remove();
  } else {
    msg.innerText = 'Not enough Cookies!';
    msgContainer.append(msg);
  }
};

addFiveBtn.addEventListener('click', function () {
  addFive();
});

const addTen = () => {
  if (points >= 500) {
    points -= 500;
    pointsCounter.innerText = `${points} cookies`;

    tenPerClick += 10;
    msg.remove();
  } else {
    msg.innerText = 'Not enough Cookies!';
    msgContainer.append(msg);
  }
};

addTenBtn.addEventListener('click', function () {
  addTen();
});

const cookieEverySec = () => {
  if (points >= 1000) {
    points -= 1000;
    cookiePerSec++;
    localStorage.setItem('cookiePerSec', cookiePerSec);
    pointsCounter.innerText = `${points} cookies`;
    msg.remove();
    if (!intervalSet) {
      setInterval(() => {
        // Interval triggers only if intervalSet if false
        points += cookiePerSec;
        console.log(cookiePerSec);
        pointsCounter.innerText = `${points} cookies`;
        localStorage.setItem('getPoints', points);
      }, `1000`);
      intervalSet = true; // Makes interval set only once
    }
  } else {
    msg.innerText = 'Not enough Cookies!';
    msgContainer.append(msg);
  }
};

cookieSec.addEventListener('click', function () {
  cookieEverySec();
  pointsCounter.innerText = `${points} cookies`;
});

document.addEventListener('DOMContentLoaded', () => {
  const savedPoints = localStorage.getItem('getPoints');
  const savedInterval = localStorage.getItem('cookiePerSec');
  const savedImg = localStorage.getItem('currentImg');
  const savedToggle = localStorage.getItem('toggle');

  if (savedPoints) {
    points = parseInt(savedPoints, 10); // Convert a stored string to a decimal integer
    pointsCounter.innerText = `${points} cookies`;
  }
  if (savedInterval) {
    cookiePerSec = parseInt(savedInterval, 10);
    if (cookiePerSec > 0 && !intervalSet) {
      // only runs if the app is reopened to avoid multiple intervals
      setInterval(() => {
        points += cookiePerSec;
        pointsCounter.innerText = `${points} cookies`;
        localStorage.setItem('getPoints', points);
      }, 1000);
      intervalSet = true;
    }
  }
  if (savedImg) {
    cookieImg.style.backgroundImage = `url(${savedImg})`;
  }
  // if (savedToggle) {
  //   toggle = savedToggle === 'true'; // Converts stored value's(which is always stored as string) value as a boolean
  // }
  if (savedToggle) {
    toggle = JSON.parse(savedToggle); // Unstrings the value which is a boolean
  } else {
    toggle = true; // Default value if not set in localStorage
  }
});
