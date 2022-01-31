import { i18Obj, translateContent } from './translate.js';
import { toggleNav, closeNav } from './nav.js';
import handleGalleryTabClick from './gallery.js';
import toggleTheme from './theme.js';

const state = {
  lang: 'en',
  theme: 'dark',
};

const setLocalStorage = () => {
  localStorage.setItem('lang', state.lang);
  localStorage.setItem('theme', state.theme);
};

const getLocalStorage = () => {
  if (localStorage.getItem('lang')) {
    state.lang = localStorage.getItem('lang');
    translateContent(state.lang, i18Obj);
  }
  if (localStorage.getItem('theme')) {
    state.theme = localStorage.getItem('theme');
    document.getElementById('theme-checkbox').checked = state.theme === 'light';
    toggleTheme(state.theme);
  }
};

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

const navToggle = document.querySelector('.header__nav-toggle');
navToggle.addEventListener('click', toggleNav);

const nav = document.querySelector('.header__nav');
nav.addEventListener('click', closeNav);

const portfolioTabs = document.querySelector('.portfolio__tabs');
portfolioTabs.addEventListener('click', handleGalleryTabClick);

const handleLangToggle = (e) => {
  if (e.target.classList.contains('header__lang-btn')) {
    const { lang } = e.target.dataset;
    translateContent(lang, i18Obj);

    const langButtons = document.querySelectorAll('.header__lang-btn');
    langButtons.forEach((btn) => btn.classList.remove('header__lang-btn--active'));
    e.target.classList.add('header__lang-btn--active');
  }
};

const langToggle = document.querySelector('.header__lang-toggle');
langToggle.addEventListener('click', handleLangToggle);

const themeCheckbox = document.querySelector('.header__theme-toggle');

themeCheckbox.addEventListener('input', (e) => {
  const isChecked = e.target.checked;
  const targetTheme = isChecked ? 'light' : 'dark';
  state.theme = targetTheme;
  toggleTheme(targetTheme);
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
