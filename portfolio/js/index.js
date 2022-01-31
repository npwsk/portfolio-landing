import { i18Obj, translateContent, updateActiveLang } from './translate.js';
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
    updateActiveLang(state.lang);
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

const langToggle = document.querySelector('.header__lang-toggle');
langToggle.addEventListener('click', (e) => {
  if (e.target.classList.contains('header__lang-btn')) {
    const { lang } = e.target.dataset;
    state.lang = lang;
    translateContent(lang, i18Obj);
    updateActiveLang(lang);
  }
});

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
1. Смена изображений в секции portfolio (25/25)
  - [x] при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
  - [x] кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
2. Перевод страницы на два языка (25/25)
  - [x] при клике по надписи ru англоязычная страница переводится на русский язык +10
  - [x] при клике по надписи en русскоязычная страница переводится на английский язык +10
  - [x] надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5
3. Переключение светлой и тёмной темы (25/25)
  На страницу добавлен переключатель при клике по которому:
  - [x] тёмная тема приложения сменяется светлой +10
  - [x] светлая тема приложения сменяется тёмной +10
  - [x] после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5
4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы (5/5)
5. Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике (5/5)
  - Ripple Button
`);
