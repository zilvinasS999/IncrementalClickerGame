let points = 0;
let toggle = true;
let pointsPerClick = 1;
let fivePerClick = 0;
let tenPerClick = 0;
let cookiePerSec = 0;
let intervalSet = false;

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
const cookieImgOne = 'assets/imgs/cookiepng1.webp';
const cookieImgTwo = 'assets/imgs/cookiepng2.jpg';

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
  let currentUrl;
  if (points >= 20) {
    points -= 20;
    pointsCounter.innerText = `${points} cookies`;
    localStorage.setItem('getPoints', points);
    if (toggle) {
      currentUrl = cookieImgTwo;
    } else {
      currentUrl = cookieImgOne;
    }
    cookieImg.style.backgroundImage = `url(${currentUrl})`;
    localStorage.setItem('currentImg', currentUrl);
    toggle = !toggle;
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
  cookieImg.style.animation = 'none';
  cookieImg.offsetHeight;
  cookieImg.style.animation = 'shrink 0.2s';
};

const spinCookie = () => {
  if (points >= 50) {
    points -= 50;
    pointsCounter.innerText = `${points} cookies`;

    cookieImg.style.animation = 'none';
    cookieImg.offsetHeight;

    cookieImg.style.animation = 'spin 2s linear 1';
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
        points += cookiePerSec;
        console.log(cookiePerSec);
        pointsCounter.innerText = `${points} cookies`;
        localStorage.setItem('getPoints', points);
      }, `1000`);
      intervalSet = true;
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

document.addEventListener('DOMContentLoaded', (event) => {
  const savedPoints = localStorage.getItem('getPoints');
  const savedInterval = localStorage.getItem('cookiePerSec');
  const savedImg = localStorage.getItem('currentImg');

  if (savedPoints) {
    points = parseInt(savedPoints, 10);
    pointsCounter.innerText = `${points} cookies`;
  }
  if (savedInterval) {
    cookiePerSec = parseInt(savedInterval, 10);
    if (cookiePerSec > 0 && !intervalSet) {
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
});
