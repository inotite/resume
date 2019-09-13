
var handleKeypress = function (obj, lengthLimit, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }

    return obj.text().length < lengthLimit;
}

var handleKeypressInput = function (obj, lengthLimit, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }

    return obj.val().length < lengthLimit;
}

var moveCaretToEnd = function(nodeRef) {
    range = document.createRange();//Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(nodeRef[0]);//Select the entire contents of the element with the range
    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection();//get the selection object (allows you to change selection)
    selection.removeAllRanges();//remove any selections already made
    selection.addRange(range);//make the range you have just created the visible selection
}

var limitLines = function(obj, lineLimit, e) {
    var origin = obj.text();
    obj.text(origin + "a");
    var lines = Math.round(obj.height() / parseInt(obj.css('line-height')));
    obj.text(origin);
    moveCaretToEnd(obj);

    console.log(obj.height());
    console.log(lines);

    if (lines > lineLimit)
        return false;
    return true;
}

var preventCopyPaste = function(obj, lineLimit, e) {
    var lineHeight = parseInt(obj.css('line-height'));
    var lines = Math.round(obj.height() / lineHeight);

    if (lines > lineLimit) {
        var origin = obj.text();
        for ( var i = origin.length - 1 ; i >= 0 ; --i ) {
            obj.text(origin.substr(0, i));
            var ln = Math.round(obj.height() / lineHeight);
            if (lineLimit == ln) break;
        }
        moveCaretToEnd(obj);
        return false;
    }

    return true;
}

var preventCopyPasteLength = function(obj, lengthLimit, e) {
    if (obj.text().length > lengthLimit) {
        obj.text(0, lengthLimit-1);
        return false;
    }
    return true;
}

$(".user_firstname").keypress(function(e) {
    // return limitLines($(this), 1, e);
    return handleKeypress($(this), 18, e);
});

$(".user_firstname").keyup(function(e) {
    return preventCopyPasteLength($(this), 18, e);
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
    return limitLines($(this), 2, e);
});

$(".info-designation").keyup(function(e) {
    return preventCopyPaste($(this), 2, e);
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
