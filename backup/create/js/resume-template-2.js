
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
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
    var origin = obj.text();
    obj.text(origin + "a");
    var lines = Math.round(obj.height() / parseInt(obj.css('line-height')));
    obj.text(origin);
    moveCaretToEnd(obj);

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
        obj.text(obj.text().substr(0, lengthLimit-1));
        moveCaretToEnd(obj);
        return false;
    }
    return true;
}

// -----------------------------------------------------------------------------------------------------

$(".user_firstname").keypress(function(e) {
    return handleKeypress($(this), LENGTH_FIRST_NAME, e);
});

$(".user_firstname").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_FIRST_NAME, e);
});

// -----------------------------------------------------------------------------------------------------

$(".user_lastname").keypress(function(e) {
    return handleKeypress($(this), LENGTH_LAST_NAME, e);
});

$(".user_lastname").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_LAST_NAME, e);
});

// -----------------------------------------------------------------------------------------------------

$("#aboutme").keypress(function (e) {
    return limitLines($(this), LINE_ABOUT_ME, e);
});

$("#aboutme").keyup(function (e) {
    return preventCopyPaste($(this), LINE_ABOUT_ME, e);
});

// -----------------------------------------------------------------------------------------------------

// Work Experience

// -----------------------------------------------------------------------------------------------------

$(".exp-role").keypress(function (e) {
    return handleKeypress($(this), LENGTH_EXP_ROLE, e);
});

$(".exp-role").keyup(function (e) {
    return preventCopyPasteLength($(this), LENGTH_EXP_ROLE, e);
});

// -----------------------------------------------------------------------------------------------------

$(".exp-company").keypress(function (e) {
    return handleKeypress($(this), LENGTH_EXP_COMPANY, e);
});

$(".exp-company").keyup(function (e) {
    return preventCopyPasteLength($(this), LENGTH_EXP_COMPANY, e);
});

// -----------------------------------------------------------------------------------------------------

$(".exp-location").keypress(function (e) {
    return handleKeypress($(this), LENGTH_EXP_LOCATION, e);
});

$(".exp-location").keyup(function (e) {
    return preventCopyPasteLength($(this), LENGTH_EXP_LOCATION, e);
});

// -----------------------------------------------------------------------------------------------------

$(".exp-desc").keypress(function(e) {
    return limitLines($(this), LINE_EXP_DESC, e);
});

$(".exp-desc").keyup(function(e) {
    return preventCopyPaste($(this), LINE_EXP_DESC, e);
});

// -----------------------------------------------------------------------------------------------------

// Education history

// -----------------------------------------------------------------------------------------------------

$(".edu-field").keypress(function(e) {
    return handleKeypress($(this), LENGTH_EDU_FIELD_OF_STUDY, e);
});

$(".edu-field").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_EDU_FIELD_OF_STUDY, e);
});

// -----------------------------------------------------------------------------------------------------

$(".edu-degree").keypress(function(e) {
    return handleKeypress($(this), LENGTH_EDU_DEGREE, e);
});

$(".edu-degree").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_EDU_DEGREE, e);
});

// -----------------------------------------------------------------------------------------------------

$(".edu-school").keypress(function(e) {
    return handleKeypress($(this), LENGTH_EDU_SCHOOL, e);
});

$(".edu-school").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_EDU_SCHOOL, e);
});

// -----------------------------------------------------------------------------------------------------

$(".edu-location").keypress(function(e) {
    return handleKeypress($(this), LENGTH_EDU_LOCATION, e);
});

$(".edu-location").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_EDU_LOCATION, e);
});

// -----------------------------------------------------------------------------------------------------

$(".edu-desc").keypress(function(e) {
    return limitLines($(this), LINE_EDU_DESC, e);
});

$(".edu-desc").keyup(function(e) {
    return preventCopyPaste($(this), LINE_EDU_DESC, e);
});

// -----------------------------------------------------------------------------------------------------

// Academic projects

// -----------------------------------------------------------------------------------------------------

$(".project-title").keypress(function(e) {
    return handleKeypress($(this), LENGTH_PROJ_TITLE, e);
});

$(".project-title").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_PROJ_TITLE, e);
});

// -----------------------------------------------------------------------------------------------------

$(".project-role").keypress(function(e) {
    return handleKeypress($(this), LENGTH_PROJ_ROLE, e);
});

$(".project-role").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_PROJ_ROLE, e);
});

// -----------------------------------------------------------------------------------------------------

$(".university").keypress(function(e) {
    return handleKeypress($(this), LENGTH_PROJ_UNIVERSITY, e);
});

$(".university").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_PROJ_UNIVERSITY, e);
});

// -----------------------------------------------------------------------------------------------------

$(".uni-location").keypress(function(e) {
    return handleKeypress($(this), LENGTH_PROJ_LOCATION, e);
});

$(".uni-location").keyup(function(e) {
    return preventCopyPasteLength($(this), LENGTH_PROJ_LOCATION, e);
});

// -----------------------------------------------------------------------------------------------------

$(".project-desc").keypress(function(e) {
    return limitLines($(this), LINE_PROJ_DESC, e);
});

$(".project-desc").keyup(function(e) {
    return preventCopyPaste($(this), LINE_PROJ_DESC, e);
});

// -----------------------------------------------------------------------------------------------------

// Skills

// $(".skills").keypress(function(e) {
//     return limitLines($(this), LINE_SKILL_NAME, e);
// });

// $(".skills").keyup(function(e) {
//     return preventCopyPaste($(this), LINE_SKILL_NAME, e);
// });

// -----------------------------------------------------------------------------------------------------

$(".info-location").keypress(function(e) {
    return limitLines($(this), LINE_LOCATION, e);
});

$(".info-location").keyup(function(e) {
    return preventCopyPaste($(this), LINE_LOCATION, e);
});

// -----------------------------------------------------------------------------------------------------

$(".info-years").keypress(function(e) {
    return limitLines($(this), LINE_YEAR_EXPERIENCE, e);
});

$(".info-years").keyup(function(e) {
    return preventCopyPaste($(this), LINE_YEAR_EXPERIENCE, e);
});

// -----------------------------------------------------------------------------------------------------

$(".info-language").keypress(function(e) {
    return limitLines($(this), LINE_LANGUAGES, e);
});

$(".info-language").keyup(function(e) {
    return preventCopyPaste($(this), LINE_LANGUAGES, e);
});

// -----------------------------------------------------------------------------------------------------

$(".info-designation").keypress(function(e) {
    return limitLines($(this), LINE_DESIGNATION, e);
});

$(".info-designation").keyup(function(e) {
    return preventCopyPaste($(this), LINE_DESIGNATION, e);
});

// -----------------------------------------------------------------------------------------------------

$(".social-phone").keypress(function(e) {
    if (e.key != '+' && e.key != ' ' && (isNaN(Number(e.key)) || e.key === null)) {
        e.preventDefault();
        return false;
    }
    var obj = $(this);
    var origin = obj.text();
    obj.text(origin + "a");
    var lines = Math.round(obj.height() / parseInt(obj.css('line-height')));
    obj.text(origin);
    moveCaretToEnd(obj);

    if (lines > LINE_PHONE)
        return false;
    return true;
});

$(".social-phone").keyup(function(e) {
    var txt = $(this).text();
    var c;
    for (var i = txt.length - 1 ; i >= 0 ; --i ) {
        c = txt[i];
        if (c != '+' && c != ' ' && isNaN(Number(c))) {
            e.preventDefault();
            $(this).text("");
            return false;
        }
    }
    var obj = $(this);
    var lineHeight = parseInt(obj.css('line-height'));
    var lines = Math.round(obj.height() / lineHeight);

    if (lines > LINE_PHONE) {
        var origin = obj.text();
        for ( var i = origin.length - 1 ; i >= 0 ; --i ) {
            obj.text(origin.substr(0, i));
            var ln = Math.round(obj.height() / lineHeight);
            if (LINE_PHONE == ln) break;
        }
        moveCaretToEnd(obj);
        return false;
    }

    return true;
});

// -----------------------------------------------------------------------------------------------------

$(".social-linkedin").keypress(function(e) {
    return limitLines($(this), LINE_LINKEDIN, e);
});

$(".social-linkedin").keyup(function(e) {
    return preventCopyPaste($(this), LINE_LINKEDIN, e);
});

// -----------------------------------------------------------------------------------------------------

$(".social-github").keypress(function(e) {
    return limitLines($(this), LINE_GITHUB, e);
});

$(".social-github").keyup(function(e) {
    return preventCopyPaste($(this), LINE_GITHUB, e);
});

// -----------------------------------------------------------------------------------------------------

$(".social-twitter").keypress(function(e) {
    return limitLines($(this), LINE_TWITTER, e);
});

$(".social-twitter").keyup(function(e) {
    return preventCopyPaste($(this), LINE_TWITTER, e);
});

// -----------------------------------------------------------------------------------------------------

$(".social-website").keypress(function(e) {
    return limitLines($(this), LINE_WEBSITE, e);
});

$(".social-website").keyup(function(e) {
    return preventCopyPaste($(this), LINE_WEBSITE, e);
});

// -----------------------------------------------------------------------------------------------------

$(".social-blog").keypress(function(e) {
    return limitLines($(this), LINE_BLOG, e);
});

$(".social-blog").keyup(function(e) {
    return preventCopyPaste($(this), LINE_BLOG, e);
});

// -----------------------------------------------------------------------------------------------------

$(".achieve").keypress(function(e) {
    return limitLines($(this), LINE_ACHIEVEMENTS, e);
});

$(".achieve").keyup(function(e) {
    return preventCopyPaste($(this), LINE_ACHIEVEMENTS, e);
});

// -----------------------------------------------------------------------------------------------------

$(".certificate").keypress(function(e) {
    return limitLines($(this), LINE_CERTIFICATIONS, e);
});

$(".certificate").keyup(function(e) {
    return preventCopyPaste($(this), LINE_CERTIFICATIONS, e);
});

// -----------------------------------------------------------------------------------------------------
