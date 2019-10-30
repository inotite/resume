$('.loading-container').delay(1000).fadeOut();
AOS.init({
  offset: 100,
  duration: 800,
  disable: 'mobile',
  //easing: 'ease-in',
  //delay: 100,
});
// Mobile Navigation
function togNav() {
  var nav = document.getElementById("sidenav");
  if (nav.style.width == '100vw') {
    nav.style.width = '0';
    nav.style.opacity = 0;
    $("#header").removeClass("-opened");
  } else {
    nav.style.width = "100vw";
    nav.style.opacity = 1;
    $("#header").addClass("-opened");
  }
}
//Show Menu on Scroll
var topBlock = $("#topBlock").offset().top;
$(window).scroll(function () {
  if (($(window).scrollTop() > topBlock)) {
    $(".header").addClass("on-scroll");
    $("header.on-scroll .resume-logo").attr('src', 'assets/images/workruit-resume-logo-color.svg')
  } else {
    $(".header").removeClass("on-scroll");
    $("header .resume-logo").attr('src', 'assets/images/workruit-resume-logo-white.svg')
  }
});

// footer link active
$(function () {
  setTimeout(function () {
    var redirectLinks = ['about.html', 'contact.html', 'careers.html', 'faq.html', 'privacy.html', 'terms.html'];
    var locationOrgin = location.origin === 'https://devresume.workruit.com' ? 'https://dev.workruit.com/' :
      'https://www.workruit.com/';
    for (let index = 1; index <= redirectLinks.length; index++) {
      // const element = array[index];
      $('.footer-nav li:nth-child(' + index + ') a').attr('href', locationOrgin + redirectLinks[index-1]);

    }
  }, 1000)
  $('.footer-nav li a[href^="/' + window.location.pathname.split("/")[1] + '"]').addClass('footer__active');
});
// autoplay vide on anroid devices
var video = document.getElementById('video');
// video.addEventListener('click', function () {
//   video.play();
// }, false);
// animation effect
var botOfTheF1 = $(".feature-1").offset().top + $(".feature-1").outerHeight(true);
var botOfTheF2 = $(".feature-2").offset().top + $(".feature-2").outerHeight(true);
var botOfTheF3 = $(".feature-3").offset().top + $(".feature-3").outerHeight(true);
var botOfTheF4 = $(".feature-4").offset().top + $(".feature-4").outerHeight(true);

var topOfTheF1 = $(".feature-1").offset().top;
var topOfTheF2 = $(".feature-2").offset().top;
var topOfTheF3 = $(".feature-3").offset().top;
var topOfTheF4 = $(".feature-4").offset().top;


if ($(window).width() > 1024) {
  $(window).scroll(function () {
    if ($(window).scrollTop() > (topOfTheF4 - 35)) {
      $(".device__phone , .device__browser").addClass("stucked");
    } else {
      $(".device__phone, .device__browser").removeClass("stucked");
    }
  });
} else if ($(window).width() > 768) {
  $(window).scroll(function () {
    if ($(window).scrollTop() > (topOfTheF4)) {
      $(".device__phone, .device__browser").addClass("stucked");
    } else {
      $(".device__phone").removeClass("stucked");
    }
  });
} else {
  $(window).scroll(function () {
    if ($(window).scrollTop() > (topOfTheF4 + 40)) {
      $(".device__phone, .device__browser").addClass("stucked");
    } else {
      $(".device__phone, .device__browser").removeClass("stucked");
    }
  });
}

if ($(window).height() < 650) {
  $(window).scroll(function () {
    if ($(window).scrollTop() > (topOfTheF4 + 1)) {
      $(".device__phon, .device__browsere").addClass("stucked");
    } else {
      $(".device__phone, .device__browser").removeClass("stucked");
    }
  });
}



$(window).scroll(function () {
  if (($(window).scrollTop() > (botOfTheF1 - 275)) && ($(window).scrollTop() < (topOfTheF3 - 275))) {
    $("#phone-in-2, #browser-in-2").addClass("active");
    $("#phone-in-2, #browser-in-2").removeClass("past");
    $("#phone-in-1, #browser-in-1").removeClass("active");
    $("#phone-in-1, #browser-in-1").addClass("past");
    $("#phone-in-3, #browser-in-3").removeClass("active");
    $("#phone-in-3, #browser-in-3").removeClass("past");
    $("#phone-in-4, #browser-in-4").removeClass("active");
    $("#phone-in-4, #browser-in-4").removeClass("past");
  } else if (($(window).scrollTop() > (botOfTheF2 - 275)) && ($(window).scrollTop() < (topOfTheF4 -
      275))) {
    $("#phone-in-3, #browser-in-3").addClass("active");
    $("#phone-in-3, #browser-in-3").removeClass("past");
    $("#phone-in-1, #browser-in-1").removeClass("active");
    $("#phone-in-1, #browser-in-1").removeClass("past");
    $("#phone-in-2, #browser-in-2").removeClass("active");
    $("#phone-in-2, #browser-in-2").addClass("past");
    $("#phone-in-4, #browser-in-4").removeClass("active");
    $("#phone-in-4, #browser-in-4").removeClass("past");
  } else if ($(window).scrollTop() > (botOfTheF3 - 275)) {
    $("#phone-in-4, #browser-in-4").addClass("active");
    $("#phone-in-4, #browser-in-4").removeClass("past");
    $("#phone-in-1, #browser-in-1").removeClass("active");
    $("#phone-in-1, #browser-in-1").removeClass("past");
    $("#phone-in-2, #browser-in-2").removeClass("active");
    //$("#phone-in-2").removeClass("past");
    $("#phone-in-3, #browser-in-3").removeClass("active");
    $("#phone-in-3, #browser-in-3").addClass("past");
  } else {
    $("#phone-in-1, #browser-in-1").addClass("active");
    $("#phone-in-1, #browser-in-1").removeClass("past");
    $("#phone-in-2, #browser-in-2").removeClass("active");
    $("#phone-in-2, #browser-in-2").removeClass("past");
    $("#phone-in-3, #browser-in-3").removeClass("active");
    $("#phone-in-3, #browser-in-3").removeClass("past");
    $("#phone-in-4, #browser-in-4").removeClass("active");
    $("#phone-in-4, #browser-in-4").removeClass("past");
  }
});

$(window).ready(function () {
  var shareParameter = window.location.href.split(location.origin + "/")[1];
  var origin = window.origin;
  console.log(shareParameter);
  if (shareParameter && (shareParameter.indexOf('#') !== -1 && shareParameter.length > 4)) {
    $('.mainPage').remove();
    $('.resume-pdf-view').removeClass('d-none');
    var googleDocsUrl = "https://docs.google.com/viewer?url=";
    var baseUrl = baseApiUrl + "user/getShareFile?name=" + shareParameter.slice(1)
    shareParameter ? true : window.location = location.origin + '/404.html'
    console.log(shareParameter ? true : false);
    $.get(baseUrl, function (data) {

      if (data.status === "failed") {
        $('#resume-error-view p').text(data.msg.description);
        $('#resume-error-view').removeClass('d-none');
      } else {
        var pdfViewUrl = googleDocsUrl + data.data + "&embedded=true";
        console.log(pdfViewUrl);
        $('#pdfViewer').removeClass('d-none').attr('src', pdfViewUrl);
      }
    });
    // window.location.href = origin == "http://127.0.0.1:5501" ? origin +
    //     '/workruit-site/resume/resume-preview.html?@' +
    //     shareParameter : origin + '/resume-preview.html?@' +
    //     shareParameter
  } else {
    $('.resume-pdf-view').remove();
  }
});