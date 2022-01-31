import i18 from './translate.js';
import { toggleNav, closeNav } from './nav.js';
import handleGalleryTabClick from './gallery.js';

// const app = () => {
//   const state = {
//     lang: localStorage.getItem('lang') || 'en',
//     theme: localStorage.getItem('theme') || 'dark',
//   };
// };

// function setLocalStorage() {
//   localStorage.setItem('lang', lang);
// }
// window.addEventListener('beforeunload', setLocalStorage);

// app();

const navToggle = document.querySelector('.header__nav-toggle');
navToggle.addEventListener('click', toggleNav);

const nav = document.querySelector('.header__nav');
nav.addEventListener('click', closeNav);

const portfolioTabs = document.querySelector('.portfolio__tabs');
portfolioTabs.addEventListener('click', handleGalleryTabClick);

const translate = (lang, i18n) => {
  if (!i18n[lang]) {
    return;
  }

  const items = document.querySelectorAll('[data-i18n]');
  items.forEach((item) => {
    if (item.dataset.i18n in i18n[lang]) {
      if (item.placeholder) {
        item.placeholder = i18n[lang][item.dataset.i18n];
        item.textContent = '';
        return;
      }
      if (item.value) {
        item.value = i18n[lang][item.dataset.i18n];
        return;
      }
      item.textContent = i18n[lang][item.dataset.i18n];
    }
  });
};

const handleLangeToggle = (e) => {
  if (e.target.classList.contains('header__lang-btn')) {
    const { lang } = e.target.dataset;
    translate(lang, i18);

    const langButtons = document.querySelectorAll('.header__lang-btn');
    langButtons.forEach((btn) => btn.classList.remove('header__lang-btn--active'));
    e.target.classList.add('header__lang-btn--active');
  }
};

const langToggle = document.querySelector('.header__lang-toggle');
langToggle.addEventListener('click', handleLangeToggle);

const themeToggle = document.querySelector('.header__theme-toggle');
themeToggle.addEventListener('input', (e) => {
  const isChecked = e.target.checked;

  if (isChecked) {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
});

const buttons = document.querySelectorAll('.button');
const tabs = document.querySelectorAll('.tab');

buttons.forEach((btn) => btn.addEventListener('click', (e) => addRippleCircle(e, 'button')));
tabs.forEach((tab) => tab.addEventListener('click', (e) => addRippleCircle(e, 'tab')));

function addRippleCircle(e, parentClass) {
  const x = e.clientX + window.pageXOffset;
  const y = e.clientY + window.pageYOffset;

  const buttonTop = e.target.offsetTop;
  const buttonLeft = e.target.offsetLeft;

  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  const circle = document.createElement('span');
  circle.classList.add(`${parentClass}__circle`);
  circle.style.top = yInside + 'px';
  circle.style.left = xInside + 'px';

  e.target.appendChild(circle);

  setTimeout(() => circle.remove(), 500);
}

console.log(`Самооценка: 85 / 85
1. Вёрстка соответствует макету. Ширина экрана 768px (48/48)
  - [x] блок <header> (6)
  - [x] секция hero (6)
  - [x] секция skills (6)
  - [x] секция portfolio (6)
  - [x] секция video (6)
  - [x] секция price (6)
  - [x] секция contacts (6)
  - [x] блок <footer> (6)
2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (15/15)
  - [x] нет полосы прокрутки при ширине страницы от 1440рх до 768рх (5)
  - [x] нет полосы прокрутки при ширине страницы от 768рх до 480рх (5)
  - [x] нет полосы прокрутки при ширине страницы от 480рх до 320рх (5)
3. На ширине экрана 768рх и меньше реализовано адаптивное меню (22/22)
  - [x] при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка (2)
  - [x] при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик (4)
  - [x] высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана (4)
  - [x] при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку (4)
  - [x] бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений (2)
  - [x] ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (2)
  - [x] при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку (4)
`);
