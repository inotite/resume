
var handleKeypress = function (obj, lengthLimit, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }

    console.log(obj.text());

    return obj.text().length < lengthLimit;
}

var handleKeypressInput = function (obj, lengthLimit, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }

    console.log(obj);
    return obj.val().length < lengthLimit;
}

$(".user_firstname").keypress(function(e) {
    return handleKeypress($(this), 18, e);
});

$(".user_lastname").keypress(function(e) {
    return handleKeypress($(this), 18, e);
});

$("#aboutme").keypress(function (e) {
    return handleKeypress($(this), 300, e);
});

// Work Experience

$(".exp-role").keypress(function (e) {
    return handleKeypress($(this), 40, e);
});

$(".exp-company").keypress(function (e) {
    return handleKeypress($(this), 40, e);
});

$(".exp-location").keypress(function (e) {
    return handleKeypress($(this), 40, e);
});

$(".exp-desc").keypress(function(e) {
    return handleKeypress($(this), 300, e);
});

// Education history

$(".edu-field").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".edu-degree").keypress(function(e) {
    return handleKeypress($(this), 50, e);
});

$(".edu-school").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".edu-location").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".edu-desc").keypress(function(e) {
    return handleKeypress($(this), 300, e);
});

// Academic projects

$(".project-title").keypress(function(e) {
    return handleKeypress($(this), 30, e);
});

$(".project-role").keypress(function(e) {
    return handleKeypress($(this), 30, e);
});

$(".university").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".uni-location").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".project-desc").keypress(function(e) {
    return handleKeypress($(this), 300, e);
});

// Skills

$(".skills").keypress(function(e) {
    return handleKeypressInput($(this), 48, e);
});

$(".info-location").keypress(function(e) {
    return handleKeypress($(this), 48, e);
});

$(".info-years").keypress(function(e) {
    return handleKeypress($(this), 10, e);
});

$(".info-designation").keypress(function(e) {
    return handleKeypress($(this), 48, e);
});

$(".social-phone").keypress(function(e) {
    return handleKeypress($(this), 14, e);
});

$(".social-linkedin").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".social-github").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".social-twitter").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".social-website").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".social-blog").keypress(function(e) {
    return handleKeypress($(this), 40, e);
});

$(".achieve").keypress(function(e) {
    return handleKeypress($(this), 500, e);
});

$(".certificate").keypress(function(e) {
    return handleKeypress($(this), 500, e);
});
