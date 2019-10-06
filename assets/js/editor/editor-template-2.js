
var validateStyleCopy = function() {
    $('[contenteditable="true"]').on('paste', preventStyleCopyPate);
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
var validateWorkExp = function() {

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

}


// -----------------------------------------------------------------------------------------------------

// Education history

// -----------------------------------------------------------------------------------------------------

var validateEduHistory = function() {

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

}


// -----------------------------------------------------------------------------------------------------

// Academic projects

// -----------------------------------------------------------------------------------------------------

var validateAcaProj = function() {

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

}

// -----------------------------------------------------------------------------------------------------

// Skills

var validateSkills = function() {

    $(".skills").keypress(function(e) {
        return limitLines($(this), LINE_SKILL_NAME, e);
    });

    $(".skills").keyup(function(e) {
        return preventCopyPaste($(this), LINE_SKILL_NAME, e);
    });

}


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

var validateLanguages = function() {

    $(".info-language").keypress(function(e) {
        return limitLines($(this), LINE_LANGUAGES, e);
    });

    $(".info-language").keyup(function(e) {
        return preventCopyPaste($(this), LINE_LANGUAGES, e);
    });

}

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
    var cloned = obj.clone();
    obj.after(cloned);
    cloned.text(origin + "1");
    var lines = Math.round(cloned.height() / parseInt(obj.css('line-height')));
    cloned.remove();

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
        var cloned = obj.clone();
        obj.after(cloned);
        for ( var i = origin.length - 1 ; i >= 0 ; --i ) {
            cloned.text(origin.substr(0, i));
            var ln = Math.round(obj.height() / lineHeight);
            if (LINE_PHONE == ln) {
                obj.text(cloned.text());
                break;
            } 
        }
        cloned.remove();
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
