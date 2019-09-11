
function handleKeypress(obj, lengthLimit, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }

    return obj.text().length < lengthLimit;
}

$("#aboutme").keypress(function (e) {
    return handleKeypress($(this), 300, e);
});

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

$(".skill-name").keypress(function(e) {
    return handleKeypress($(this), 48, e);
});