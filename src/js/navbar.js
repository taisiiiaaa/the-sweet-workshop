(() => {
  const refs = {
    hamMenu: document.querySelector('.header-menu-toggle'),
    navbar: document.querySelector('[data-navbar]'),
    mobLinks: document.querySelectorAll('.navbar-link'),
    navbarBtn: document.querySelector('.navbar-order'),
  };

  // Відкрити/закрити меню
  refs.hamMenu.addEventListener('click', toggleMenu);

  // Закрити меню при кліку на пункт
  refs.mobLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Закрити меню при кліку на кнопку "До покупок"
  if (refs.navbarBtn) {
    refs.navbarBtn.addEventListener('click', closeMenu);
  }

  function toggleMenu() {
    const isOpen = refs.navbar.classList.toggle('is-open');
    refs.hamMenu.classList.toggle('active');

    document.body.classList.toggle('no-scroll', isOpen);
    document.documentElement.classList.toggle('no-scroll', isOpen);
  }

  function closeMenu() {
    refs.navbar.classList.remove('is-open');
    refs.hamMenu.classList.remove('active');

    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  }
})();
