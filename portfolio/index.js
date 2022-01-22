const navToggle = document.querySelector('.header__nav-toggle');
const headerNav = document.querySelector('.header__nav');
const navList = document.querySelector('.header__nav-list');

navToggle.addEventListener('click', () => {
  headerNav.classList.toggle('header__nav--active');
  navToggle.classList.toggle('header__nav-toggle--active');
  navList.classList.toggle('header__nav-list--active');
});

const navLinks = document.querySelectorAll('.header__nav-link');
navLinks.forEach((link) =>
  link.addEventListener('click', () => {
    headerNav.classList.remove('header__nav--active');
    navToggle.classList.remove('header__nav-toggle--active');
    navList.classList.remove('header__nav-list--active');
  })
);

console.log(`Score: 110 / 110
1. Вёрстка валидная (10/10)
2. Вёрстка семантическая (20/20)
    - [x] <header>, <main>, <footer> (2)
    - [x] шесть элементов <section> (по количеству секций) (2)
    - [x] только один заголовок <h1> (2)
    - [x] пять заголовков <h2> (количество секций минус одна, у которой заголовок <h1>) (2)
    - [x] один элемент <nav> (панель навигации) (2)
    - [x] два списка ul > li > a (панель навигации, ссылки на соцсети) (2)
    - [x] десять кнопок <button> (2)
    - [x] два инпута: <input type="email"> и <input type="tel"> (2)
    - [x] один элемент <textarea> (2)
    - [x] три атрибута placeholder (2)
3. Вёрстка соответствует макету (48/48)
    - [x] блок <header> (6)
    - [x] секция hero (6)
    - [x] секция skills (6)
    - [x] секция portfolio (6)
    - [x] секция video (6)
    - [x] секция price (6)
    - [x] секция contacts (6)
    - [x] блок <footer> (6)
4. Требования к css (12/12)
    - [x] для построения сетки используются флексы или гриды (2)
    - [x] при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону (2)
    - [x] фоновый цвет тянется на всю ширину страницы (2)
    - [x] иконки добавлены в формате .svg (2)
    - [x] изображения добавлены в формате .jpg (2)
    - [x] есть favicon (2)
5. Интерактивность, реализуемая через css (20/20)
    - [x] плавная прокрутка по якорям (5)
    - [x] ссылки в футере ведут на гитхаб автора проекта и на страницу курса https://rs.school/js-stage0/ (5)
    - [x] интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты, например, изменение цвета фона или цвета шрифта (5)
    - [x] плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы (5)
`);
