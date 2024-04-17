let points = 0;
let toggle = true;
let pointsPerClick = 1;
let fivePerClick = 0;
let tenPerClick = 0;
let cookiePerSec = 0;
let intervalSet = false;

const cookieImg = document.querySelector('.cookie-img');

const pointsCounter = document.querySelector('.points');
const cookieImgBtn = document.querySelector('.change-cookie');
const bgBtn = document.querySelector('.change-bg');
const background = document.querySelector('.background');
const spinBtn = document.querySelector('.spin-cookie');
const addPointBtn = document.querySelector('.add-point');
const addFiveBtn = document.querySelector('.add-five');
const addTenBtn = document.querySelector('.add-ten');
const cookieSec = document.querySelector('.cookie-sec');

const addPoints = () => {
  points += pointsPerClick;
  points += fivePerClick;
  points += tenPerClick;
  pointsCounter.innerText = `${points} cookies`;

  localStorage.setItem('getPoints', points);
};

cookieImg.addEventListener('click', function () {
  shrinkCookie();
  addPoints();
  pointsCounter.innerText = `${points} cookies`;
});

const handleImg = () => {
  if (points >= 10) {
    points -= 10;
    pointsCounter.innerText = `${points} cookies`;

    if (toggle) {
      cookieImg.style.backgroundImage = "url('./assets/imgs/chip.jpg')";
    } else {
      cookieImg.style.backgroundImage =
        "url('./assets/imgs/chocolate-chip-cookie-16.jpg')";
    }
    toggle = !toggle;
  } else {
    console.log('not enough points');
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
  if (points >= 30) {
    points -= 30;
    pointsCounter.innerText = `${points} cookies`;

    cookieImg.style.animation = 'none';
    cookieImg.offsetHeight;

    cookieImg.style.animation = 'spin 2s linear 1';
  }
};

spinBtn.addEventListener('click', function () {
  spinCookie();
});

const addPoint = () => {
  if (points >= 5) {
    points -= 5;
    pointsCounter.innerText = `${points} cookies`;
    pointsPerClick += 1;
  }
};

addPointBtn.addEventListener('click', function () {
  addPoint();
});

const addFive = () => {
  if (points >= 10) {
    points -= 10;
    pointsCounter.innerText = `${points} cookies`;

    fivePerClick += 5;
  }
};

addFiveBtn.addEventListener('click', function () {
  addFive();
});

const addTen = () => {
  if (points >= 20) {
    points -= 20;
    pointsCounter.innerText = `${points} cookies`;

    tenPerClick += 10;
  }
};

addTenBtn.addEventListener('click', function () {
  addTen();
});

const cookieEverySec = () => {
  if (points >= 20) {
    points -= 20;
    cookiePerSec++;
    localStorage.setItem('cookiePerSec', cookiePerSec);
    pointsCounter.innerText = `${points} cookies`;

    if (!intervalSet) {
      setInterval(() => {
        points += cookiePerSec;
        console.log(cookiePerSec);
        pointsCounter.innerText = `${points} cookies`;
        localStorage.setItem('getPoints', points);
      }, `1000`);
      intervalSet = true;
    }
  }
};

cookieSec.addEventListener('click', function () {
  cookieEverySec();
  pointsCounter.innerText = `${points} cookies`;
});

document.addEventListener('DOMContentLoaded', (event) => {
  const savedPoints = localStorage.getItem('getPoints');
  const savedInterval = localStorage.getItem('cookiePerSec');

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
});
