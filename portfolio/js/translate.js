const i18Obj = {
  en: {
    skills: 'Skills',
    portfolio: 'Portfolio',
    video: 'Video',
    price: 'Price',
    contacts: 'Contacts',
    'hero-title': 'Alexa Rise',
    'hero-text':
      'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
    hire: 'Hire me',
    'skill-title-1': 'Digital photography',
    'skill-text-1': 'High-quality photos in the studio and on the nature',
    'skill-title-2': 'Video shooting',
    'skill-text-2': 'Capture your moments so that they always stay with you',
    'skill-title-3': 'Rotouch',
    'skill-text-3': 'I strive to make photography surpass reality',
    'skill-title-4': 'Audio',
    'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
    winter: 'Winter',
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    'price-description-1-item-1': 'One location',
    'price-description-1-item-2': '120 photos in color',
    'price-description-1-item-3': '12 photos in retouch',
    'price-description-1-item-4': 'Readiness 2-3 weeks',
    'price-description-1-item-5': 'Make up, visage',
    'price-description-2-item-1': 'One or two locations',
    'price-description-2-item-2': '200 photos in color',
    'price-description-2-item-3': '20 photos in retouch',
    'price-description-2-item-4': 'Readiness 1-2 weeks',
    'price-description-2-item-5': 'Make up, visage',
    'price-description-3-item-1': 'Three locations or more',
    'price-description-3-item-2': '300 photos in color',
    'price-description-3-item-3': '50 photos in retouch',
    'price-description-3-item-4': 'Readiness 1 week',
    'price-description-3-item-5': 'Make up, visage, hairstyle',
    order: 'Order shooting',
    'contact-me': 'Contact me',
    phone: 'Phone',
    message: 'Message',
    'send-message': 'Send message',
  },
  ru: {
    skills: 'Навыки',
    portfolio: 'Портфолио',
    video: 'Видео',
    price: 'Цены',
    contacts: 'Контакты',
    'hero-title': 'Алекса Райс',
    'hero-text':
      'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
    hire: 'Пригласить',
    'skill-title-1': 'Фотография',
    'skill-text-1': 'Высококачественные фото в студии и на природе',
    'skill-title-2': 'Видеосъемка',
    'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
    'skill-title-3': 'Ретушь',
    'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
    'skill-title-4': 'Звук',
    'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
    winter: 'Зима',
    spring: 'Весна',
    summer: 'Лето',
    autumn: 'Осень',
    'price-description-1-item-1': 'Одна локация',
    'price-description-1-item-2': '120 цветных фото',
    'price-description-1-item-3': '12 отретушированных фото',
    'price-description-1-item-4': 'Готовность через 2-3 недели',
    'price-description-1-item-5': 'Макияж, визаж',
    'price-description-2-item-1': 'Одна-две локации',
    'price-description-2-item-2': '200 цветных фото',
    'price-description-2-item-3': '20 отретушированных фото',
    'price-description-2-item-4': 'Готовность через 1-2 недели',
    'price-description-2-item-5': 'Макияж, визаж',
    'price-description-3-item-1': 'Три локации и больше',
    'price-description-3-item-2': '300 цветных фото',
    'price-description-3-item-3': '50 отретушированных фото',
    'price-description-3-item-4': 'Готовность через 1 неделю',
    'price-description-3-item-5': 'Макияж, визаж, прическа',
    order: 'Заказать съемку',
    'contact-me': 'Свяжитесь со мной',
    phone: 'Телефон',
    message: 'Сообщение',
    'send-message': 'Отправить',
  },
};

const translateContent = (lang, i18n) => {
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

const updateActiveLang = (lang) => {
  const langButtons = document.querySelectorAll('.header__lang-btn');
  langButtons.forEach((btn) => btn.classList.remove('header__lang-btn--active'));

  const targetButton = [...langButtons].find((btn) => btn.dataset.lang === lang);
  targetButton.classList.add('header__lang-btn--active');
};

export { i18Obj, translateContent, updateActiveLang };
