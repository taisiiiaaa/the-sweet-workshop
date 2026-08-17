(() => {
  const refs = {
    hamMenu: document.querySelector('.menu-toggle'),
    navbar: document.querySelector('[data-navbar]'),
    mobLinks: document.querySelectorAll('.navbar-link'),
    navbarBtn: document.querySelector('.navbar-order'),
  };

  refs.mobLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  refs.hamMenu.addEventListener('click', toggleMenu);
  refs.navbarBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    const isOpen = refs.navbar.classList.toggle('is-open');
    refs.hamMenu.classList.toggle('active');

    document.body.classList.toggle('no-scroll', isOpen);
     document.documentElement.classList.toggle('no-scroll', isOpen);
  }
})();
