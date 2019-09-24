// Function to 'load JSON' data
function load() {
  var someData_notJSON = JSON.parse(data);
  console.log("someData_notJSON", someData_notJSON[0].red);
}

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '../../environment.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function loadEnvironment() {
  loadJSON(function (response) {
    var actual_JSON = JSON.parse(response);
    sessionStorage.setItem("environment", response);
  });
}
loadEnvironment();


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
  $('.footer-nav li a[href^="/' + window.location.pathname.split("/")[1] + '"]').addClass('footer__active');
});
// autoplay vide on anroid devices
var video = document.getElementById('video');
video.addEventListener('click', function () {
  video.play();
}, false);
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
