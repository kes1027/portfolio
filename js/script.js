$(function () {
  // s: 애니메이션
  const tl = gsap.timeline();

  tl.from('.logo', { y: -100, autoAlpha: 0 });
  tl.from('.menu li', { y: -100, autoAlpha: 0, duration: 1, stagger: 0.1 });
  tl.from('.gnb', { y: -100, autoAlpha: 0 }, '-=0.3');
  tl.from('.design-info p', { y: -100, autoAlpha: 0 });
  tl.from('.design-info h2', { y: -100, autoAlpha: 0 });
  tl.from('.scroll-btn', { y: -100, autoAlpha: 0 }, '-=0.3');
  tl.from('.design-info strong', { y: -100, autoAlpha: 0 }, '-=0.3');
  tl.from('.go-portfolio', { y: -100, autoAlpha: 0 });
  // e: 애니메이션

  // 변수저장
  // AOS.init();
  const $btnTop = $('.btn-top');
  // 각 영역별 aos.js를 적용할 대상
  const $aniEl = $('[data-aos]');

  // s: 서브 메뉴 버튼
  const $btnMenu = $('.btn-menu');
  const $dim = $('.dim');
  const $menuWrap = $('.submenu-wrap');

  // s: cursor events
  const $window = $(window);
  const $cursor = $('.custom-cursor');

  // s: 서브 메뉴 버튼
  // 메뉴 버튼을 클릭했을 때 메뉴창이 보이게
  $btnMenu.on('click', function () {
    $menuWrap.toggleClass('active');
    $dim.fadeToggle();

    // 햄버거 버튼에 on클래스 토글
    $btnMenu.toggleClass('on');
  });

  // 클릭 했을때 메뉴창이 숨겨지게
  $('.submenu-list li').on('click', function () {
    $menuWrap.removeClass('active');
    $dim.fadeToggle();

    // 햄버거 버튼에 on클래스 토글
    $btnMenu.removeClass('on');
  });

  // e: 서브 메뉴 버튼

  // 탑버튼
  // 탑버튼이 처음에는 안 보이게
  $btnTop.hide();
  // 탑버튼을 클릭하면 화면 상단으로 (첫 번재 섹션으로 이동)
  $btnTop.on('click', function () {
    $.fn.fullpage.moveTo('section1');
  });

  //풀 페이지
  $('#fullpage').fullpage({
    // 1. 사용할 요소의 이름을 지정
    menu: '.indicator',
    // 2. 앵커(영역)의 이름 설정
    anchors: ['section1', 'section2', 'section3', 'section4'],
    // 3. 실제 링크에 data-menuanchor="영역이름" 적용
    //* 속도 조절하기
    scrollingSpeed: 1000,
    // * 섹션 영역의 콘텐츠 세로 정렬
    verticalCentered: false,
    // 영역에 진입한 후

    // s: 애니메이션
    afterLoad: function (anchorLink, index) {
      $('section h2')
        .eq(index - 1)
        .css('opacity', 1)
        .attr('data-splitting', '');
      Splitting();

      if (anchorLink === 'section4') {
        $btnTop.fadeIn();
      }

      // AOS.init();
      // $aniEl.addClass('aos-animate');
    },

    // 영역을 떠나갈 때

    onLeave: function (index, nextIndex, direction) {
      if (index === 1) {
      }
      if (index === 2) {
        // $('.section2 h2').css('opacity', 0);
      }
      if (index === 3) {
        // $('.section3 h2').css('opacity', 0);
      }
      // 4번 영역을 떠나가거나 마우스 휠을 올렸을 때
      if (index === 4 || direction === 'up') {
        // $('.section4 h2').css('opacity', 0);
        $btnTop.fadeOut();
      }
      $aniEl.removeClass('aos-animate');
    },
  });
  // e: 애니메이션

  // 슬라이더
  // s: 3. 초기화 실행
  const projectSlider = new Swiper('.project-slider', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 40,

    autoplay: {
      delay: 3000 /* 3초 기다렸다가 실행 */,
    },
    speed: 1000, //슬라이드 되는 속도 : 기본값 300ms (0.3초)
    effect: 'slide', // 기본값(slide), fade, cube, coverflow, flip, card 등

    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },

    // 원으로 진행률 표시
    on: {
      autoplayTimeLeft(swiper, timeLeft, percentage) {
        document.querySelector('.autoplay-progress svg').style.setProperty('--progress', 1 - percentage);
      },
      // 원으로 진행률 표시
    },
  });

  // s: cursor events

  // 브라우저 창에서 마우스가 움직일 때
  $window.on('mousemove', function (e) {
    // console.log(e);

    // 마우스의 x, y 좌표값을 받아서
    const mouseX = e.pageX;
    const mouseY = e.pageY;

    // 가짜 마우스의 left, top 값으로 적용
    $cursor.css({
      left: mouseX,
      top: mouseY,
    });
  });

  // s: 마우스 크기 및 색 바꾸기
  $('a').each((index, link) => {
    $(link).hover(
      () => {
        $cursor.addClass('hover');
      },
      () => {
        $cursor.removeClass('hover');
      }
    );
  });

  $('.tiles li').each((index, link) => {
    $(link).hover(
      () => {
        $cursor.addClass('light');
      },
      () => {
        $cursor.removeClass('light');
      }
    );
  });
  // e: 마우스 크기 및 색 바꾸기

  // s: popup slide
  let swiper;
  // s: swiper_button_연결
  document.querySelector('.education').addEventListener('click', () => goToSlide(0));

  document.querySelector('.achievement').addEventListener('click', () => goToSlide(1));

  document.querySelector('.activities').addEventListener('click', () => goToSlide(2));

  document.querySelector('.training').addEventListener('click', () => goToSlide(4));

  document.querySelector('.career').addEventListener('click', () => goToSlide(5));

  document.querySelector('.skills').addEventListener('click', () => goToSlide(6));

  document.querySelector('.close-btn').addEventListener('click', closePopup);
  // e: swiper_button_연결

  function openPopup() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';

    if (!swiper) {
      swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,

        navigation: {
          prevEl: '.popup_btn_prev',
          nextEl: '.popup_btn_next',
        },
      });
    } else {
      // 이미 초기화된 경우에는 swiper.update()를 호출하여 Swiper 인스턴스를 업데이트
      swiper.update();
    }
  }

  function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
  }

  function goToSlide(index) {
    openPopup();
    setTimeout(function () {
      swiper.slideToLoop(index, 1000); // 1000ms 동안 원하는 슬라이드(의 인덱스로) 이동
    }, 100);
  }
  // //e: popup slide
}); // end: jQuery
