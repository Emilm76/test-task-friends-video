$(document).ready(() => {
  // Parallax
  $(document).on('scroll', function () {
    const $imgSection = $('[data-parallax-image-wrapper]');
    const $img = $imgSection.find('[data-parallax-image]');
    const imgSectionHeight = $imgSection.outerHeight();
    const imgHeight = $img.outerHeight();

    // Координата Y элемента
    const imgSectionY = $imgSection.offset().top;
    // Координата Y до нижней части окна браузера
    const windowBottomY = $(window).scrollTop() + $(window).height();

    const maxParallaxLength = imgHeight - imgSectionHeight;
    let parallaxEffect = (imgSectionY - windowBottomY) * 0.15;
    if (parallaxEffect + maxParallaxLength <= 0) parallaxEffect = -maxParallaxLength;

    $img.css('transform', `translate(-50%,${parallaxEffect}px)`);
  });

  // Header
  const header = document.querySelector('.header');
  const callback = (ent, obs) => {
    if (ent[0].isIntersecting) header.classList.remove('_scroll');
    else header.classList.add('_scroll');
  };
  const headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(header);

  // Открытие burger меню
  $('.burger-menu__open-button').on('click', () => {
    $('.burger-menu__wrapper').addClass('open');
    $('body').css('overflow', 'hidden');
  });
  // Закрытие burger меню
  $('.burger-menu__close-button').on('click', () => {
    $('.burger-menu__wrapper').removeClass('open');
    $('body').css('overflow', '');
  });

  // Swiper
  const getSlidesPerView = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) return 1.2;
    else return 2.5;
  };
  const getSpaceBetween = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) return 10;
    else if (screenWidth < 1024) return 30;
    else return 80;
  };
  const setSwiperMargin = () => {
    const screenWidth = window.innerWidth;
    const swiperWidth = $('.details-section__content').innerWidth();
    const margin = (screenWidth - swiperWidth) / 2;

    $('.swiper').css({
      margin: `0 -${margin}px`,
      padding: `0 ${margin}px`,
      width: `calc(100% + ${margin * 2}px)`,
    });
  };

  const swiper = new Swiper('.swiper', {
    slidesPerView: getSlidesPerView(),
    spaceBetween: getSpaceBetween(),
    loop: true,

    pagination: {
      el: '.swiper__pagination',
      clickable: true,
    },

    navigation: {
      nextEl: '.swiper__button-next',
      prevEl: '.swiper__button-prev',
    },
  });

  window.addEventListener('resize', () => {
    swiper.params.slidesPerView = getSlidesPerView();
    swiper.params.spaceBetween = getSpaceBetween();
    setSwiperMargin();
    swiper.update();
  });

  swiper.on('slideChange', updateSwiperPagCounters);
  function updateSwiperPagCounters() {
    const slideNumber = swiper.realIndex + 1;
    const uniqueSlideCount = swiper.slides.length;
    $('.swiper__pagination-counter--current').text(slideNumber.toString().padStart(2, '0'));
    $('.swiper__pagination-counter--total').text(uniqueSlideCount.toString().padStart(2, '0'));
  }

  setSwiperMargin();
  updateSwiperPagCounters();
});
