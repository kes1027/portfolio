$(function () {
  // 변수저장
  // AOS.init();
  const $header = $('header');
  const $btnTop = $('.btn-top');
  // 각 영역별 aos.js를 적용할 대상
  const $aniEl = $('[data-aos]');

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
    afterLoad: function (anchorLink) {
      // section4 영역에 진입하면 탑 버튼이 보이게
      if (anchorLink === 'section4') {
        $btnTop.fadeIn();
      }

      AOS.init();
      $aniEl.addClass('aos-animate');
    },

    // 영역을 떠나갈 때
    onLeave: function (index, nextIndex, direction) {
      // 4번 영역을 떠나가거나 마우스 휠을 올렸을 때
      if (index === 4 || direction === 'up') {
        $btnTop.fadeOut();
      }
      $aniEl.removeClass('aos-animate');
    },
  });

  // 슬라이더
  // 3. 초기화 실행
  const projectSlider = new Swiper('.project-slider', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 40,

    autoplay: {
      delay: 3000 /* 3초 기다렸다가 실행 */,
    },
    speed: 1000, //슬라이드 되는 속도 : 기본값 300ms (0.3초)
    effect: 'slide', // 기본값(slide), fade, cube, coverflow, flip, card 등
  });

  //end
});
