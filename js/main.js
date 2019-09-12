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
    $("#header").addClass("on-scroll");
    $("header.on-scroll .resume-logo").attr('src', 'images/workruit-resume-logo-color.svg')
  } else {
    $("#header").removeClass("on-scroll");
    $("header .resume-logo").attr('src', 'images/workruit-resume-logo-white.svg')
  }
});

// footer link active
$(function() {
  $('.footer-nav li a[href^="/' + window.location.pathname.split("/")[1] + '"]').addClass('footer__active');
});
