const toggleNav = (e) => {
  const toggle = document.querySelector('.header__nav-toggle');
  const nav = document.querySelector('.header__nav');
  const html = document.documentElement;
  const body = document.body;

  nav.classList.toggle('header__nav--active');
  toggle.classList.toggle('header__nav-toggle--active');

  if (nav.classList.contains('header__nav--active')) {
    body.style.overflow = 'hidden';
    html.style.overflow = 'hidden';
  } else {
    body.style.overflow = 'auto';
    html.style.overflow = 'auto';
  }
};

export default toggleNav;
