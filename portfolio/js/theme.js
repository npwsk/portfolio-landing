const toggleTheme = (theme) => {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    return;
  }
  if (theme === 'dark') {
    document.body.classList.remove('light-theme');
    return;
  }
};

export default toggleTheme;
