const userId = JSON.parse(sessionStorage.getItem('userData')).userId;
const userStatus = sessionStorage.getItem('isPremiumUser');
let resumeObj = JSON.parse(sessionStorage.getItem('userData'));
let themeOptions = typeof (resumeObj.themeOptions) == "string" ? JSON.parse(resumeObj.themeOptions) : resumeObj.themeOptions;
const exp_total_count = 10;
const edu_total_count = 10;
const proj_total_count = 10;
const planInfo = resumeObj.planDetails;
const waterMarkCss = {
    "background": 'url("' + window.location.origin + '/assets/images/resume/watermarkworkruit.png' + '") #fff repeat-y',
    "background-position": 'center 0',
    "background-size": '40%'
};
const pdfWaterMarkCss = {
    "background": 'url("' + window.location.origin + '/assets/images/resume/watermarkworkruit.png' + '") #fff no-repeat',
    "background-position": 'center'
}
console.log(resumeObj);
// 'Source_Sans_Pro', 'Merriweather', 'Roboto', 'Saira Semi Condensed'
// var twitterIcon = import('img/twitter.svg');
// console.log("twitterIcon", twitterIcon);
// $('#twitter').prepend(twitterIcon);

$.fn.textWidth = function(text, font) {
    
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));
    
    // console.log(this.val() || this.text() || this.attr('placeholder'));
    // console.log(this.css('font'));
    return $.fn.textWidth.fakeEl.width() + 0.2;
};

const fonts = [{
        fontFamily: 'Lato',
        fontInfo: 'lato'
    },
    {
        fontFamily: 'Source Sans Pro',
        fontInfo: 'Source_Sans_Pro'
    },
    {
        fontFamily: 'Merriweather',
        fontInfo: 'merriweather'
    },
    {
        fontFamily: 'Roboto',
        fontInfo: 'roboto'
    },
    {
        fontFamily: 'Saira Semi Condensed',
        fontInfo: 'Saira_Semi_Condensed'
    }

];
var defaultSettings = [{
    status: false,
    text: 'Academic Projects',
    dataText: 's-academic'
}, {
    status: false,
    text: 'Achievements',
    dataText: 's-achievements'
}, {
    status: false,
    text: 'Certifications',
    dataText: 's-certifications'
}, {
    status: false,
    text: 'Github',
    dataText: 's-github'
}, {
    status: false,
    text: 'Twitter',
    dataText: 's-twitter'
}, {
    status: false,
    text: 'Website',
    dataText: 's-website'
}, {
    status: false,
    text: 'Blog',
    dataText: 's-blog'
}];
let degreesAll = [];
/* Job Functions Autocomplete */
var jobFunctionsSettings = {
    "async": true,
    "crossDomain": true,
    "url": apiAdminUrl + "/allJobFunctions",
    "method": "GET",
    "headers": {
        "token": "911ca088ab824095b82d3c98b32332e7",
    }
}
// console.log(apiAdminUrl + "/allJobFunctions");
var jobFunctionsAll = new Array();
$.ajax(jobFunctionsSettings).done(function (response) {

    $.each(response.categoryArray, function (i1, object) {
        $.each(object.categoryValues, function (i3, region) {
            jobFunctionsAll.push({
                "value": region.value,
                "id": region.id
            });
        });
    });

    $("#allJobFunctions").autocomplete({
        minLength: 0,
        source: function (request, response) {
            var results = $.ui.autocomplete.filter(jobFunctionsAll, request
                .term);
            response(results.slice(0, 10));
            if (results.length <= 0) {
                $('#allJobFunctions').attr('data-item-id', '');
            }
        },
        select: function (event, ui) {
            //console.log(ui.item)
            $('#allJobFunctions').attr('data-item-id', ui.item.id);
        }
    }).focus(function () {
        $(this).autocomplete("search");
    });

});
/* Degrees Autocomplete */
var degreesSettings = {
    "async": true,
    "crossDomain": true,
    "url": apiAdminUrl + "/allDegrees",
    "method": "GET",
    "headers": {
        "token": "911ca088ab824095b82d3c98b32332e7",
    }
}
$.ajax(degreesSettings).done(function (response) {
    //console.log(response.degrees[0].title);

    $(response.degrees).each(function (k, object) {
        degreesAll.push({
            'id': response.degrees[k].degreeId,
            'label': response.degrees[k].title,
            'value': response.degrees[k].title,
            'shortTitle': response.degrees[k].shortTitle
        });
    });

    $(".degrees").autocomplete({
        source: jobFunctionsAll,
        minLength: 0,
        source: function (request, response) {
            var results = $.ui.autocomplete.filter(degreesAll, request.term);
            response(results.slice(0, 10));
        },
        select: function (event, ui) {
            $(this).attr({
                'data-id': ui.item.id,
                'data-shortTitle': ui.item.shortTitle
            });
        }
    }).focus(function () {
        $(this).autocomplete("search");
    });

    $(".degrees").each(function (idx, obj) {
        var degree = 0;
        var dataId = $(this).attr('data-id');
        if (dataId === undefined) {
            $(this).val("");
            return;
        }
        for (; degree < degreesAll.length && dataId != degreesAll[degree].id; ++degree);
        $(this).val(degreesAll[degree].label);
    });

});
var settings = themeOptions ? themeOptions.settings : defaultSettings;
$(window).ready(function () {
    $('.gender').niceSelect();
    if (!planInfo.subscribedUser || planInfo.planId === 1) {
        // $('#resume-body').css({
        //     'background-image': 'url("watermarkworkruit.svg")',
        //     'background-position': 'center',
        //     'background-repeat': 'no-repeat',
        //     'background-size': 'contain'
        // });
        addWaterMarkImage('#resume-body, .watermark')
    }
    var selectedFont = themeOptions ? themeOptions.font : fonts[0].fontFamily;
    var selectedTitleFont = themeOptions ? themeOptions.fontTitle : fonts[0].fontFamily;
    if (!selectedTitleFont)
        selectedTitleFont = fonts[0].fontFamily;
    var selectedcolor = themeOptions ? themeOptions.color : 'theme-black';
    if (planInfo.subscribedUser && planInfo.planId !== 1) {
        $('.theme-picker > a , #saveResume > a, #downloadResume > a').attr("data-toggle", "modal").attr('data-target', '#upgrade-popup');
    }
    $('.selected-font').text(selectedFont).attr('data-font', selectedFont);
    $('.title-headers .selected-font').text(selectedTitleFont).attr('data-font', selectedTitleFont);
    $('.selected-color').removeClass('theme-black').removeClass('theme-blue').removeClass('theme-green').addClass(selectedcolor).attr('data-color', selectedcolor);
    $('.dropdown-menu.actions').removeClass('theme-black').removeClass('theme-blue').removeClass('theme-green').addClass(selectedcolor);
    $('.resume-container').attr('data-oldcolor', selectedcolor).removeClass('theme-black').addClass(selectedcolor);
    $('.theme-color-picker a').removeClass('active');
    $('.theme-color-picker span.'+selectedcolor).parent().addClass('active');
    $('body').css('font-family', selectedFont);
    $('.sub-header').css('font-family', selectedTitleFont);
    $('.title-headers').css('font-family', selectedTitleFont);
    // Declare some global variables for later use:
    for (let index = 0; index < fonts.length; index++) {
        const fontItem = fonts[index];
        const fontLink = '<a class="dropdown-item cursor-pointer font-item" data-font=' + fontItem
            .fontInfo +
            ' style="font-family:' + fontItem.fontFamily + '">' +
            fontItem.fontFamily + '</a>';
        $('.font-items').append(fontLink);
    }
    $('.page-font .font-items .font-item').on('click', function () {
        var selectedFont = $(this).attr('data-font');
        fonts.filter(item => {
            if (selectedFont == item.fontInfo) {
                $('.page-font .selected-font').text(item.fontFamily).attr('data-font', item.fontFamily);
                $('body').css('font-family', item.fontFamily);
                $('.ui-autocomplete').css('font-family', item.fontFamily);
                $('.month-picker').trigger('change');
                return;
            };
        });
    });
    $('.title-headers .font-items .font-item').on('click', function () {
        var selectedFont = $(this).attr('data-font');
        fonts.filter(item => {
            if (selectedFont == item.fontInfo) {
                $('.title-headers .selected-font').text(item.fontFamily).attr('data-font', item.fontFamily);
                $('.sub-header').css('font-family', item.fontFamily);
                $('.title-headers').css('font-family', item.fontFamily);
                return;
            };
        });
    });
    $('.b-datepicker').datepicker({
        format: "dd-mm-yyyy",
        endDate: moment(appDate).subtract(14, 'years').format('DD-MM-YYYY')
    });
    $('.month-picker').datepicker({
        format: "M yyyy",
        endDate: moment(appDate).format('MMM YYYY'),
        startView: "months",
        minViewMode: "months"
    });

    for (let index = 0; index < settings.length; index++) {
        const settingItem = settings[index];
        const settingLink = `<a class="dropdown-item action-item mt-0 font-10pt" href="#" data-setting="${settingItem.dataText}">
                            <label for="${settingItem.dataText}"><input type="checkbox" id="${settingItem.dataText}" checked="${settingItem.status}" data-checked="${settingItem.status}" class="switch ml-3"><label class="switch-label ${settingItem.dataText}"></label> 
                            ${settingItem.text} </label>
                        </a>`;
        $('.actions').append(settingLink)
    }

    $('.action-item').on('click', function () {
        // console.log($('.action-item').index(this));
        var actionItemIndex = $('.action-item').index(this);
        var settingId = $(this).attr("data-setting");
        var currentStatus = $('#' + settingId).attr('data-checked');
        var newStatus = currentStatus == 'true' ? 'false' : 'true';
        settings[actionItemIndex].status = newStatus;
        $('#' + settingId).attr('data-checked', newStatus).attr('checked', newStatus);
        $('.' + settingId).addClass(newStatus).removeClass(currentStatus);
        // console.log(settingId);
        settingStatus(settingId, newStatus);
    });

    function settingStatus(settingId, setStatus) {
        switch (settingId) {
            case 's-academic':
                if (setStatus == 'true') {
                    $('#academic-section').addClass('d-none');
                } else {
                    $('#academic-section').removeClass('d-none');
                }
                break;
            case 's-achievements':
                if (setStatus == 'true') {
                    $('#achievements-section').addClass('d-none');
                } else {
                    $('#achievements-section').removeClass('d-none');
                }
                break;
            case 's-certifications':
                if (setStatus == 'true') {
                    $('#certifications-section').addClass('d-none');
                } else {
                    $('#certifications-section').removeClass('d-none');
                }
                break;
            case 's-github':
                if (setStatus == 'true') {
                    $('.github').addClass('d-none');
                } else {
                    $('.github').removeClass('d-none');
                }
                break;
            case 's-twitter':
                if (setStatus == 'true') {
                    $('.twitter').addClass('d-none');
                } else {
                    $('.twitter').removeClass('d-none');
                }
                break;
            case 's-website':
                if (setStatus == 'true') {
                    $('.website').addClass('d-none');
                } else {
                    $('.website').removeClass('d-none');
                }
                break;
            case 's-blog':
                if (setStatus == 'true') {
                    $('.blog').addClass('d-none');
                } else {
                    $('.blog').removeClass('d-none');
                }
                break;
            default:
                break;
        }
    }
    $('.clr_btn').on('click', function () {
        var newColor = $(this).attr('data-color');
        var oldColor = $('.resume-container').attr('data-oldcolor');
        $(this).parent().addClass('active').siblings().removeClass('active');
        // console.log($(this).siblings());
        $('.selected-color').addClass(newColor).removeClass(oldColor).attr('data-color', newColor);
        $('.actions').addClass(newColor).removeClass(oldColor);
        $('.resume-container').addClass(newColor).removeClass(oldColor);
        $('.resume-container').attr('data-oldcolor', newColor);
    });
    $('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
    $('.actions').click(function (e) {
        e.stopPropagation();
    });
    // bind userData to Resume

    var addPdfWaterMark = function() {
        $('page').css( pdfWaterMarkCss );
    }

    var showMultiplePages = function () {
        renderPages();

        $('#resume-body').hide();
        if (!planInfo.subscribedUser || planInfo.planId === 1) {
            console.log("Watermark");
            addPdfWaterMark();
        }
    }

    var hideMultiplePages = function () {

        var length = $('page').length;

        console.log(length);

        for (var i = 1; i < length; ++i) {
            $($('page')[1]).remove();
        }

        $('#resume-body').show();
        if (!planInfo.subscribedUser || planInfo.planId === 1) {
            addWaterMarkImage('page')
        }
    }

    $('#previewResume').on('click', function () {
        $('.resume-preview').removeClass('d-none');
        $('#previewResume').addClass('d-none');
        $('#previewBack').removeClass('d-none');
        $('.editorNav').addClass('d-none');
        $('.previewNav').css('z-index', '2');
        $('#saveResume').addClass('d-none');
        if (!planInfo.subscribedUser || planInfo.planId === 1) {
            $('.watermark').css('display', 'block!important');
        }

        bindUserDataForSave();
        saveUserProfile(postObj, 'preview');

        showMultiplePages();
    });
    $('#previewBack').on('click', function () {
        $('.resume-preview').addClass('d-none');
        $('#previewResume').removeClass('d-none');
        $('#previewBack').addClass('d-none');
        $('.editorNav').removeClass('d-none');
        $('#saveResume').removeClass('d-none');
        hideMultiplePages();
    });


    function ratingCircle() {
        var container = $("#rating-container");
        var index = -1;
        // 1.  Capture the hover event over the div (circle)

        $(".rating-circle").hover(
            // When the mouse hover over any circle. All the circles to the left change color to yellow
            function () {
                $(this).removeClass("rating-chosen").addClass("rating-hover");
                $(this).prevAll().removeClass("rating-chosen").addClass("rating-hover");
                $(this).nextAll().removeClass("rating-chosen");
            },
            //When the mouse move away, the color yellow disappears:	
            function () {
                $(this).removeClass("rating-hover");
                $(this).prevAll().removeClass("rating-hover");

                index = parseInt($(this).parent().parent().attr('data-langpercentage')) / 25;

                var itr = $(this).parent().children().first();

                for ( var i = 0 ; i < index ; ++i ) {
                    itr.addClass("rating-chosen");
                    itr = itr.next();
                }

                // if (index >= 0) {
                //     //Return the previously chosen choice (if any) back in green
                //     // Recall the choice using its index
                //     // "get" returns a DOM element, NOT a jQuery object
                //     var chosenCircle = container.children().get(index);
                //     //Convert to jQuery object
                //     var $rating = $(chosenCircle);

                //     //Make them green again
                //     $rating.addClass("rating-chosen");
                //     $rating.prevAll().addClass("rating-chosen");
                // }
                
            }
        );


        // 2. Capture the click event when the user click on a circle.
        // All the circles to the left change color to green 
        // The color stays green as the mouse move away

        $(".rating-circle").click(
            function () {
                $(this).addClass("rating-chosen");
                $(this).prevAll().addClass("rating-chosen");
                // Remember the position of the click so it can be retrieved later
                index = $(this).index();
                $(this).parent().parent().attr('data-langpercentage', (index + 1) * 25);
            }
        );
    }


    $("body").on("click", ".skills-bar", function (e) {
        var skillDataValue = $(this).attr('data-border');
        switch (skillDataValue) {
            case '25':
                $(this).addClass('at-50').removeClass('at-25');
                $(this).attr('data-border', '50');
                $(this).parent().find('.skill-value').attr('data-skill', '50%').text('50%');
                break;
            case '50':
                $(this).addClass('at-75').removeClass('at-50');
                $(this).attr('data-border', '75');
                $(this).parent().find('.skill-value').attr('data-skill', '75%').text('75%');
                break;
            case '75':
                $(this).addClass('at-100').removeClass('at-75');
                $(this).attr('data-border', '100');
                $(this).parent().find('.skill-value').attr('data-skill', '100%').text('100%');
                break;
            case '100':
                $(this).addClass('at-25').removeClass('at-100');
                $(this).attr('data-border', '25');
                $(this).parent().find('.skill-value').attr('data-skill', '25%').text('25%');
                break;
            default:
                break;
        }
    });
    //experience add new start
    $("body").on("click", ".add_exp", function (e) {
        if ($('.professional-experience').length < exp_total_count) {
            // console.log('i am add_exp')
            var $div = $('div[id^="proExp"]:last');
            var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
            var $klon = $div.clone().prop('id', 'proExp_' + num);
            $div.after($klon);
            $('#proExp_' + num + ' [data-content="exp_jobTitle"]').text('').attr('placeholder',
                'Role');
            $('#proExp_' + num + ' [data-content="exp_company"]').text('').attr('placeholder',
                'Company');
            $('#proExp_' + num + ' [data-content="exp_startDate"]').val('').attr('placeholder',
                'Start Date');
            $('#proExp_' + num + ' [data-content="exp_endDate"]').val('').attr('placeholder',
                'End Date');
            $('#proExp_' + num + ' [data-content="exp_location"]').text('').attr('placeholder',
                'Location');
            $('#proExp_' + num + ' [data-content="exp_description"]').text('').attr(
                'placeholder',
                'Enter details about your work responsibilities here.');
            $('.month-picker').datepicker({
                format: "M yyyy",
                endDate: moment(appDate).format('MMM YYYY'),
                startView: "months",
                minViewMode: "months"
            });

            $("#proExp_" + num + " .exp-role").keypress(function (e) {
                return handleKeypress($(this), LENGTH_EXP_ROLE, e);
            });

            $("#proExp_" + num + " .exp-role").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_EXP_ROLE, e);
            });

            $("#proExp_" + num + " .exp-company").keypress(function (e) {
                return handleKeypress($(this), LENGTH_EXP_COMPANY, e);
            });

            $("#proExp_" + num + " .exp-company").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_EXP_COMPANY, e);
            });

            $("#proExp_" + num + " .exp-location").keypress(function (e) {
                return handleKeypress($(this), LENGTH_EXP_LOCATION, e);
            });

            $("#proExp_" + num + " .exp-location").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_EXP_LOCATION, e);
            });

            $("#proExp_" + num + " .exp-desc").keypress(function (e) {
                return limitLines($(this), LINE_EXP_DESC, e);
            });

            $("#proExp_" + num + " .exp-desc").keyup(function (e) {
                return preventCopyPaste($(this), LINE_EXP_DESC, e);
            });

            $("#proExp_" + num + ' [contenteditable="true"]').on('paste', preventStyleCopyPate);

            setTimeout(function() {
                $('#proExp_' + num + ' .month-picker').on('change', function() {
                    var inputWidth = $(this).textWidth();
                    $(this).css({
                        width: inputWidth
                    })
                }).trigger('change');
            }, 500);
        }
        if ($('.professional-experience').length == exp_total_count) {
            $('.professional-experience .add_exp').addClass('d-none');
        }
        if ($('.professional-experience').length > 1) {
            $('.professional-experience .remove_exp').removeClass('d-none');
        }
    })
    $("body").on("click", ".remove_exp", function () {
        var $div = $(this);
        $div.parent().parent().remove();
        if ($('.professional-experience').length < 2) {
            // console.log('i am remove_exp');
            $('.professional-experience .remove_exp').addClass('d-none').removeClass('d-block');
        }
        if ($('.professional-experience').length < exp_total_count) {
            $('.professional-experience .add_exp').addClass('d-block').removeClass('d-none');
        }
    });
    //experience add new end
    //education add new start
    $("body").on("click", ".add_edu", function (e) {
        if ($('.education-details').length < edu_total_count) {
            // console.log('i am add_edu')
            var $div = $('div[id^="education_"]:last');
            var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
            var $klon = $div.clone().prop('id', 'education_' + num);
            $div.after($klon);
            $('#education_' + num + ' [data-content="fieldOfStudy"]').text('').attr(
                'placeholder',
                'Field of study');
            $('#education_' + num + ' [data-content="edu_startDate"]').val('').attr(
                'placeholder',
                'Start Date');
            $('#education_' + num + ' [data-content="edu_endDate"]').val('').attr('placeholder',
                'End Date');
            $('#education_' + num + ' [data-content="degree_title"]').val('').attr(
                'placeholder',
                'Degree').attr('data-id', '');
            $('#education_' + num + ' [data-content="edu_institution"]').text('').attr(
                'placeholder',
                'School');
            $('#education_' + num + ' [data-content="edu_location"]').text('').attr(
                'placeholder',
                'Location');
            $('#education_' + num + ' [data-content="edu_description"]').text('').attr(
                'placeholder',
                'Enter details about your education here');
            $('.month-picker').datepicker({
                format: "M yyyy",
                endDate: moment(appDate).format('MMM-YYYY'),
                startView: "months",
                minViewMode: "months"
            });
            $(".degrees").autocomplete({
                source: jobFunctionsAll,
                minLength: 0,
                source: function (request, response) {
                    var results = $.ui.autocomplete.filter(degreesAll, request
                        .term);
                    response(results.slice(0, 10));
                },
                select: function (event, ui) {
                    $(this).attr({
                        'data-id': ui.item.id,
                        'data-shortTitle': ui.item.shortTitle
                    });
                }
            }).focus(function () {
                $(this).autocomplete("search");
            });
            $(".ui-autocomplete").css("font-family", selectedFont);

            $("#education_" + num + " .edu-field").keypress(function (e) {
                return handleKeypress($(this), LENGTH_EDU_FIELD_OF_STUDY, e);
            });

            $("#education_" + num + " .edu-field").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_EDU_FIELD_OF_STUDY, e);
            });

            $("#education_" + num + " .edu-degree").keypress(function (e) {
                return handleKeypress($(this), LENGTH_EDU_DEGREE, e);
            });

            $("#education_" + num + " .edu-degree").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_EDU_DEGREE, e);
            });

            $("#education_" + num + " .edu-school").keypress(function (e) {
                return handleKeypress($(this), LENGTH_EDU_SCHOOL, e);
            });

            $("#education_" + num + " .edu-school").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_EDU_SCHOOL, e);
            });

            $("#education_" + num + " .edu-location").keypress(function (e) {
                return handleKeypress($(this), LENGTH_EDU_LOCATION, e);
            });

            $("#education_" + num + " .edu-location").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_EDU_LOCATION, e);
            });

            $("#education_" + num + " .edu-desc").keypress(function (e) {
                return limitLines($(this), LINE_EDU_DESC, e);
            });

            $("#education_" + num + " .edu-desc").keyup(function (e) {
                return preventCopyPaste($(this), LINE_EDU_DESC, e);
            });

            $("#education_" + num + ' [contenteditable="true"]').on('paste', preventStyleCopyPate);

            setTimeout(function() {
                $('#education_' + num + ' .month-picker').on('change', function() {
                    var inputWidth = $(this).textWidth();
                    $(this).css({
                        width: inputWidth
                    })
                }).trigger('change');
            }, 500);
        }
        if ($('.education-details').length == edu_total_count) {
            $('.education-details .add_edu').addClass('d-none');
        }
        if ($('.education-details').length > 1) {
            $('.education-details .remove_edu').removeClass('d-none');
        }

    })
    $("body").on("click", ".remove_edu", function () {
        var $div = $(this);
        $div.parent().parent().remove();
        if ($('.education-details').length < 2) {
            // console.log('i am remove_edu');
            $('.education-details .remove_edu').addClass('d-none').removeClass('d-block');
        }
        if ($('.education-details').length < edu_total_count) {
            $('.education-details .add_edu').addClass('d-block').removeClass('d-none');
        }
    });
    //education add new end
    //academic add new start
    $("body").on("click", ".add_acad", function () {
        if ($('.academic-project').length < proj_total_count) {
            // console.log('i am add_exp')
            var $div = $('div[id^="academic_projects_"]:last');
            var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
            var $klon = $div.clone().prop('id', 'academic_projects_' + num);
            $div.after($klon);
            $('#academic_projects_' + num + ' [data-content="acd_projectTitle"]').text('').attr(
                'placeholder',
                'Project Title');
            $('#academic_projects_' + num + ' [data-content="acd_startDate"]').val('').attr(
                'placeholder',
                'Start Date');
            $('#academic_projects_' + num + ' [data-content="acd_endDate"]').val('').attr(
                'placeholder',
                'End Date');
            $('#academic_projects_' + num + ' [data-content="acd_institution"]').text('').attr(
                'placeholder',
                'University');
            $('#academic_projects_' + num + ' [data-content="acd_location"]').text('').attr(
                'placeholder',
                'location');
            $('#academic_projects_' + num + ' [data-content="acd_description"]').text('').attr(
                'placeholder',
                'Enter details about your project here.   ');
            $('#academic_projects_' + num + ' [data-content="acd_role"]').text('').attr(
                'placeholder',
                'Role');
            $('.month-picker').datepicker({
                format: "M yyyy",
                endDate: moment(appDate).format('MMM-YYYY'),
                startView: "months",
                minViewMode: "months"
            });


            $("#academic_projects_" + num + " .project-title").keypress(function (e) {
                return handleKeypress($(this), LENGTH_PROJ_TITLE, e);
            });

            $("#academic_projects_" + num + " .project-title").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_PROJ_TITLE, e);
            });

            $("#academic_projects_" + num + " .project-role").keypress(function (e) {
                return handleKeypress($(this), LENGTH_PROJ_ROLE, e);
            });

            $("#academic_projects_" + num + " .project-role").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_PROJ_ROLE, e);
            });

            $("#academic_projects_" + num + " .university").keypress(function (e) {
                return handleKeypress($(this), LENGTH_PROJ_UNIVERSITY, e);
            });

            $("#academic_projects_" + num + " .university").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_PROJ_UNIVERSITY, e);
            });

            $("#academic_projects_" + num + " .uni-location").keypress(function (e) {
                return handleKeypress($(this), LENGTH_PROJ_LOCATION, e);
            });

            $("#academic_projects_" + num + " .uni-location").keyup(function (e) {
                return preventCopyPasteLength($(this), LENGTH_PROJ_LOCATION, e);
            });

            $("#academic_projects_" + num + " .project-desc").keypress(function (e) {
                return limitLines($(this), LINE_PROJ_DESC, e);
            });

            $("#academic_projects_" + num + " .project-desc").keyup(function (e) {
                return preventCopyPaste($(this), LINE_PROJ_DESC, e);
            });

            $("#academic_projects_" + num + ' [contenteditable="true"]').on('paste', preventStyleCopyPate);

            setTimeout(function() {
                $('#academic_projects_' + num + ' .month-picker').on('change', function() {
                    var inputWidth = $(this).textWidth();
                    $(this).css({
                        width: inputWidth
                    })
                }).trigger('change');
            }, 500);
        }
        if ($('.academic-project').length == proj_total_count) {
            $('.academic-project .add_acad').addClass('d-none');
        }
        if ($('.academic-project').length > 1) {
            $('.academic-project .remove_acad').removeClass('d-none');
        }
    })
    $("body").on("click", ".remove_acad", function () {
        var $div = $(this);
        $div.parent().parent().remove();
        if ($('.academic-project').length < 2) {
            $('.academic-project .remove_acad').addClass('d-none').removeClass('d-block');
        }
        if ($('.academic-project').length < proj_total_count) {
            $('.academic-project .add_acad').addClass('d-block').removeClass('d-none');
        }
    });
    //academic end new start
    //skills add new start
    // console.log($('.skills-item'));
    if ($('.skills-item').length <= 5) {
        $('.skills-item .remove_skills').addClass('d-none');
    }
    var minSkill = '75%';
    var minSkillValue = "75";
    var skillsLength = 5;
    for (let index = 1; index < skillsLength; index++) {
        var $div = $('li[id^="skills_item_"]:last');
        var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
        var $klon = $div.clone().prop('id', 'skills_item_' + num)
        $div.after($klon);
        var minSkill = '75%';
        $('#skills_item_' + num + ' .skills-bar .skill-value').attr('data-skill', minSkill);
        $('#skills_item_' + num + ' .skills-bar .skill-value').text(minSkill);
        $('#skills_item_' + num + ' .skills-bar').attr('data-border', minSkillValue);
        $('#skills_item_' + num + ' .skills-bar').attr('class', '').attr('class',
            'skills-bar color-blue at-75');
        $('#skills_item_' + num + ' .skill').attr('data-content', '').text('');
        $('#skills_item_' + num + ' .skill-name').keypress(function (e) {
            return limitLines($(this), LINE_SKILL_NAME, e);
        });
        $('#skills_item_' + num + ' .skill-name').keyup(function (e) {
            return preventCopyPaste($(this), LINE_SKILL_NAME, e);
        });
    }
    $("body").on("click", ".add_skills", function () {
        if ($('.skills-item').length < 16) {
            var $div = $('li[id^="skills_item_"]:last');
            var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
            var $klon = $div.clone().prop('id', 'skills_item_' + num)
            $div.after($klon);

            $('#skills_item_' + num + ' .skills-bar .skill-value').attr('data-skill', minSkill);
            $('#skills_item_' + num + ' .skills-bar .skill-value').text(minSkill);
            $('#skills_item_' + num + ' .skills-bar').attr('data-border', minSkillValue);
            $('#skills_item_' + num + ' .skills-bar').attr('class', '').attr('class',
                'skills-bar color-blue at-75');
            $('#skills_item_' + num + ' .skill').attr('data-content', '').text('');
            $('#skills_item_' + num + ' [data-content="skillText"]').text('');
            // console.log('i am add_exp')
            $('#skills_item_' + num + ' .skill-name').keypress(function (e) {
                return limitLines($(this), LINE_SKILL_NAME, e);
            });
            $('#skills_item_' + num + ' .skill-name').keyup(function (e) {
                return preventCopyPaste($(this), LINE_SKILL_NAME, e);
            });

            $("#skills_item_" + num + ' [contenteditable="true"]').on('paste', preventStyleCopyPate);
        }
        if ($('.skills-item').length == 16) {
            $('.skills-item .add_skills').addClass('d-none');
        }
        if ($('.skills-item ').length > 5) {
            $('.skills-item .remove_skills').removeClass('d-none');
        }
        $('.skills').on('keydown', function () {
            var fieldVal = $(this).text();
            var skillsSettings = {
                "async": true,
                "crossDomain": true,
                "url": apiAdminUrl + "/skills?skillName=" + fieldVal,
                "method": "GET",
                "headers": {
                    "token": "911ca088ab824095b82d3c98b32332e7",
                }
            }
            var skillsAll = new Array();
            var dom = $(this);
            $.ajax(skillsSettings).done(function (response) {
                // console.log(fieldVal, response)
                if (response !== null)
                    $(response.content).each(function (k, v) {
                        skillsAll.push(response.content[k].skillName);
                    });
                // var results = $.ui.autocomplete.filter(skillsAll, request.term);
                var skillsArray = [];
                $('.skills').each(function (index) {
                    skillsArray.push($(this).text());
                });
                dom.autocomplete({
                    source: skillsAll.filter(function (item, index) {
                        return skillsArray.indexOf(item) == -1;
                    }),
                    minLength: 0,
                }).focus(function () {
                    $(this).autocomplete("search", $(this).val());
                });
            });
        });


    })
    $("body").on("click", ".remove_skills", function () {
        var $div = $(this);
        if ($('.skills-item').length <= 16) {
            $('.skills-item .add_skills').removeClass('d-none');
        }
        $div.parent().parent().remove();
        if ($('.skills-item  .skills-data-container').length <= 5) {
            $('.skills-item .remove_skills').addClass('d-none');
        }
        if ($('.skills-item ').length > 5) {
            $('.skills-item .remove_skills').removeClass('d-none');
        }
    });
    //skills add new end

    // Language new added
    $("body").on("click", ".add_lang", function (e) {
        if ($('.lang_details').length < 3) {
            // console.log('i am add_lang')
            var $div = $('li[id^="lang_"]:last');
            var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
            var $klon = $div.clone().prop('id', 'lang_' + num);
            $div.after($klon);
            $('#lang_' + num + ' [data-content="languageName"]').text('').attr(
                'placeholder',
                'Language');

            $('#lang_' + num + ' .rating-container').attr('data-langpercentage', '50');
            $('#lang_' + num + ' .rating-container li').removeClass('rating-chosen');
            $('#lang_' + num + ' .rating-container li:first').addClass('rating-chosen')
                .next().addClass('rating-chosen');

            $(".info-language").keypress(function (e) {
                return limitLines($(this), LINE_LANGUAGES, e);
            });

            $(".info-language").keyup(function (e) {
                return preventCopyPaste($(this), LINE_LANGUAGES, e);
            });

            $("#lang_" + num + ' [contenteditable="true"]').on('paste', preventStyleCopyPate);

            ratingCircle();

        }

        if ($('.lang_details').length == 3) {
            $('.lang_details .add_lang').addClass('d-none');
        }
        if ($('.lang_details').length > 1) {
            $('.lang_details .remove_lang').removeClass('d-none');
        }

    })
    $("body").on("click", ".remove_lang", function () {
        var $div = $(this);
        $div.parent().parent().remove();
        if ($('.lang_details').length < 2) {
            // console.log('i am remove_lang');
            $('.lang_details .remove_lang').addClass('d-none').removeClass('d-block');
        }
        if ($('.lang_details').length < 3) {
            $('.lang_details .add_lang').addClass('d-block').removeClass('d-none');
        }
    });
    // End Language ================

    //Save resume....................
    let postObj = {
        "firstname": '',
        "pic": '',
        "user_website": '',
        "userJobTitle": '',
        "user_twitter": '',
        "coverLetter": '',
        "email": '',
        "deviceType": 'NA',
        "user_blog": '',
        "joining_info": "10-09-2017",
        "user_linkdin": '',
        "telephone": '',
        "current_salary": 0,
        "user_github": '',
        "lastname": '',
        "user_behance": '',
        "expDisplay": '',
        "location": '',
        "gender": '',
        "date_of_birth": '',
        "interests": '',
        "certifications": '',
        "refferences": '',
        "jobfunctions": [],
        "academic": [],
        "experience": [],
        "education": [],
        "languages": [],
        "skill": [],
        "themeOptions": null
    }

    $('#saveResume').on('click', function () {
        if (planInfo.subscribedUser || planInfo.planId === 1) {
            bindUserDataForSave();
            saveUserProfile(postObj, "save");
        }

    });

    $('#downloadResume').on('click', async function () {
        // if (planInfo.subscribedUser) {
            if (!$('.editorNav').hasClass('d-none')) {
                bindUserDataForSave();
                saveUserProfile(postObj, "download");
                showMultiplePages();
                await savePdf();
                hideMultiplePages();
            } else {
                console.log("hey, here!");
                await savePdf();
            }
        // } else {
        //     $('#downloadResume a').attr('href', location.origin + '/pricing.html');
        // }
    });

    function bindUserDataForSave() {
        const jobfunctions = $('#resume-body input[data-content="jobfunctions"]').attr('data-item-id') ? [JSON.parse(
            $('#resume-body input[data-content="jobfunctions"]').attr('data-item-id'))] : []
        postObj.pic = sessionStorage.getItem('imageStore');
        postObj.firstname = $('#resume-body [data-content="firstname"]').text();
        postObj.lastname = $('#resume-body [data-content="lastname"]').text();
        postObj.jobfunctions = jobfunctions;
        postObj.coverLetter = $('#resume-body [data-content="coverLetter"]').text();
        postObj.userJobTitle = $('#resume-body [data-content="userJobTitle"]').text();
        postObj.expDisplay = $('#resume-body [data-content="totalexperience"]').text();
        postObj.location = $('#resume-body [data-content="location"]').text();
        postObj.date_of_birth = $('#resume-body [data-content="dob"]').val();
        postObj.gender = $('#resume-body .gender .current').text();

        postObj.email = $('#resume-body [data-content="email"]').text();
        postObj.telephone = $('#resume-body [data-content="phone"]').text();
        postObj.user_linkdin = $('#resume-body [data-content="linkedin"]').text();
        // postObj.user_github = !$('.social-github').hasClass('d-none') ? '' : $('[data-content="github"]').text();
        // postObj.user_twitter = !$('.social-twitter').hasClass('d-none') ? '' : $('[data-content="twitter"]').text();
        // postObj.user_website = !$('.social-website').hasClass('d-none') ? '' : $('[data-content="website"]').text();
        // postObj.user_blog = !$('.social-blog').hasClass('d-none') ? '' : $('[data-content="blog"]').text();
        postObj.user_github = $('#resume-body [data-content="github"]').text();
        postObj.user_twitter = $('#resume-body [data-content="twitter"]').text();
        postObj.user_website = $('#resume-body [data-content="website"]').text();
        postObj.user_blog = $('#resume-body [data-content="blog"]').text();

        postObj.interests = $('#resume-body [data-content="achivements"]').text();
        postObj.certifications = $('#resume-body [data-content="certifications"]').text();
        // console.log("resumeObj", resumeObj)
        GetThemeOptions();
        getExperinceDetails();
        getEducationDetails();
        getAcademicDetails();
        getSkillsDetails();
        getLanguageDetails();
    }

    function getExperinceDetails() {
        postObj.experience = [];
        $('#resume-body .professional-experience').each(function (i, v) {
            var id = $(this).attr('id');
            var exp_endDate = $('#resume-body #' + id).find('input[data-content="exp_endDate"]').val();
            var exp_startDate = $('#resume-body #' + id).find('input[data-content="exp_startDate"]')
                .val();
            var exp_jobTitle = ($('#resume-body #' + id).find('span[data-content="exp_jobTitle"]').attr(
                        'placeholder') != $('#resume-body #' + id).find('span[data-content="exp_jobTitle"]')
                    .text()) ?
                $('#resume-body #' + id).find('span[data-content="exp_jobTitle"]').text() : '';
            var exp_location = ($('#resume-body #' + id).find('div[data-content="exp_location"]').attr(
                        'placeholder') != $('#resume-body #' + id).find('div[data-content="exp_location"]')
                    .text()) ?
                $('#resume-body #' + id).find('div[data-content="exp_location"]').text() : '';
            var exp_company = ($('#resume-body #' + id).find('div[data-content="exp_company"]').attr(
                    'placeholder') != $('#resume-body #' + id).find('div[data-content="exp_company"]')
                .text()) ? $(
                '#resume-body #' + id).find('div[data-content="exp_company"]').text() : '';
            var exp_description = ($('#resume-body #' + id).find('p[data-content="exp_description"]')
                .attr('placeholder') != $('#resume-body #' + id).find(
                    'p[data-content="exp_description"]')
                .text()) ? $('#resume-body #' + id).find('p[data-content="exp_description"]').text() : '';

            postObj.experience.push({
                "endDate": exp_endDate,
                "startDate": exp_startDate,
                "jobTitle": exp_jobTitle.trim(),
                "isPresent": 0,
                "location": exp_location,
                "company": exp_company,
                "description": exp_description.trim()
            });

            console.log("Experience Data", postObj.experience);
        });
    }

    function getAcademicDetails() {
        postObj.academic = [];
        if (!$('#resume-body #academic-section').hasClass('d-none')) {
            $('#resume-body .academic-project').each(function (i, v) {
                var id = $(this).attr('id');
                var acd_endDate = $('#resume-body #' + id).find(
                    'input[data-content="acd_endDate"]').val();
                var acd_startDate = $('#resume-body #' + id).find(
                        'input[data-content="acd_startDate"]')
                    .val();
                var institution = ($('#resume-body #' + id).find(
                            'div[data-content="acd_institution"]')
                        .attr(
                            'placeholder') != $('#resume-body #' + id).find(
                            'div[data-content="acd_institution"]')
                        .text()) ?
                    $('#resume-body #' + id).find(
                        'div[data-content="acd_institution"]')
                    .text() : '';
                var location = ($('#resume-body #' + id).find(
                            'div[data-content="acd_location"]').attr(
                            'placeholder') != $('#resume-body #' + id).find(
                            'div[data-content="acd_location"]')
                        .text()) ?
                    $('#resume-body #' + id).find(
                        'div[data-content="acd_location"]').text() :
                    '';
                var project = ($('#resume-body #' + id).find(
                            'span[data-content="acd_projectTitle"]')
                        .attr(
                            'placeholder') != $('#resume-body #' + id).find(
                            'span[data-content="acd_projectTitle"]')
                        .text()) ? $(
                        '#' + id).find(
                        'span[data-content="acd_projectTitle"]')
                    .text() : '';
                var description = ($('#resume-body #' + id).find(
                            'p[data-content="acd_description"]')
                        .attr('placeholder') != $('#resume-body #' + id).find(
                            'p[data-content="acd_description"]')
                        .text()) ? $('#resume-body #' + id).find(
                        'p[data-content="acd_description"]')
                    .text() : '';
                var role = ($('#resume-body #' + id).find(
                            'span[data-content="acd_role"]')
                        .attr('placeholder') != $('#resume-body #' + id).find(
                            'span[data-content="acd_role"]')
                        .text()) ? $('#resume-body #' + id).find(
                        'span[data-content="acd_role"]')
                    .text() : ''
                postObj.academic.push({
                    "endDate": acd_endDate,
                    "startDate": acd_startDate,
                    "institution": institution.trim(),
                    "isPresent": 0,
                    "role": role,
                    "location": location,
                    "projectTitle": project,
                    "description": description.trim()
                });
            });
        }
    }

    function getEducationDetails() {
        postObj.education = [];
        $('#resume-body .education-details').each(function (i, v) {
            // console.log(v);
            var id = $(this).attr('id');
            var endDate = $('#resume-body #' + id).find(
                'input[data-content="edu_endDate"]').val();
            var startDate = $('#resume-body #' + id).find(
                    'input[data-content="edu_startDate"]')
                .val();
            var fieldOfStudy = ($('#resume-body #' + id).find('span[data-content="fieldOfStudy"]')
                .attr(
                    'placeholder') != $('#resume-body #' + id).find(
                    'span[data-content="fieldOfStudy"]').text()) ? $(
                '#' + id).find('span[data-content="fieldOfStudy"]').text() : '';
            var institution = ($('#resume-body #' + id).find(
                    'div[data-content="edu_institution"]').attr(
                    'placeholder') != $('#resume-body #' + id).find(
                    'div[data-content="edu_institution"]').text()) ?
                $('#resume-body #' + id).find('div[data-content="edu_institution"]').text() :
                '';
            var location = ($('#resume-body #' + id).find('div[data-content="edu_location"]')
                    .attr(
                        'placeholder') != $('#resume-body #' + id).find(
                        'div[data-content="edu_location"]').text()) ?
                $('#resume-body #' + id).find('div[data-content="edu_location"]').text() : '';
            // var degree = {
            //     title: $('#resume-body #' + id).find('input[data-content="degree_title"]').val(),
            //     degreeId: $('#resume-body #' + id).find('input[data-content="degree_title"]').attr(
            //         'data-id'),
            //     shortTitle: $('#resume-body #' + id).find('input[data-content="degree_title"]').attr(
            //         'data-shorttitle'),
            // };
            var degree = $('#resume-body #' + id).find('input[data-content="degree_title"]').attr('data-id');
            var description = ($('#resume-body #' + id).find(
                    'p[data-content="edu_description"]')
                .attr('placeholder') != $('#resume-body #' + id).find(
                    'p[data-content="edu_description"]')
                .text()) ? $('#resume-body #' + id).find(
                'p[data-content="edu_description"]').text() : '';

            if (endDate != '' || startDate != '' || institution != '' ||
                location != '' || degree != '' || description != '' || fieldOfStudy != '') {
                postObj.education.push({
                    "endDate": endDate,
                    "startDate": startDate,
                    "fieldOfStudy": fieldOfStudy,
                    "institution": institution.trim(),
                    "isPresent": 0,
                    "location": location,
                    "degree": degree,
                    "description": description.trim()
                });
            }
        });
    }

    function getLanguageDetails() {
        postObj.languages = [];
        $('#resume-body .lang_details').each(function (i, v) {
            // console.log(v);
            var id = $(this).attr('id');
            $(".rating-chosen").length * 25;
            var lng_percentage = $('#resume-body #' + id + ' li.rating-chosen').length;
            var lngName = $('#' + id + ' [data-content="languageName"]').text();
            // var title = $('#resume-body #' + id).find(
            //         '[data-content="languageName"]')
            //     .val();
            // var percentage = ($('#resume-body #' + id).find('[data-langpercentage]')
            //     .attr(
            //         'placeholder') != $('#resume-body #' + id).find(
            //         'span[data-content="fieldOfStudy"]').text()) ? $(
            //     '#' + id).find('span[data-content="fieldOfStudy"]').text() : '';
            postObj.languages.push({
                "lng_percentage": lng_percentage * 25,
                "lngName": lngName
            });
        });
    }

    function getSkillsDetails() {
        postObj.skill = []
        $('#resume-body .skills-item').each(function (i, v) {
            var id = $(this).attr('id');
            var skill_name = $('#' + id + ' .skill-input-value').text();
            var skill_value = parseInt($('#resume-body #' + id).find('.skill-value').attr('data-skill'));
            console.log(i, skill_name, skill_value, "skill_value");
            postObj.skill.push({
                "skillName": skill_name,
                "skill_percentage": skill_value
            });
        });
    }

    function GetThemeOptions() {
        const themeOptions = {
            color: $('.selected-color').attr('data-color'),
            font: $('.page-font .selected-font').attr('data-font'),
            fontTitle: $('.title-headers .selected-font').attr('data-font'),
            settings: settings
        }
        postObj.themeOptions = themeOptions;
        console.log("Theme Options", postObj.themeOptions);
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#user_pic').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    // $("#user-picture").change(function () {
    //     console.log("Here");
    //     readURL(this);
    // });

    bindUserData();

    function bindUserData() {
        if (!resumeObj.pic)
            resumeObj.pic = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAFYUlEQVR4nO2d7W3bMBCGr0EHUCeoM0HUCWpP0HSC2BM0naDOBHEmsDtB3QniThB1groTRD/6vwWNlwYtyhJF3lFUqgcwEsgfol7d8eN4pF49P/+hRJjgNUVx3rcU6wf+7ohoj1fv9CloTkTXEE79n1mf6EZJRAWE3uL/6MQWVFnfDYQMFbCNEsJ+hRVHIYagSrg5EX2CS/eBqg4eiGgDocWQFFQJeQshpa3RlRLCrqSElRJ0mZiQVbSwS+udQLgFVXXkukfX7oqqChacdeyFdcQPZYn3RPQ4IDEJZX1E2Vm8icNCVZfn28CErENZ68fQ7laoharW++kFiEm4hidckzchgt6jvnxprHFtXvgKukaX6KVy62ssPoKuQ91iIMx9RO0qaCwxVQNxR0Qz1XBWXjO8FyMY0lnULq38fQQ3Vy3s5w79winKlVvv8LJCuVpxtdB5BDFVod917GTv8J2V9Q4vt66e6WKhOboTkiwQuAjBq87ryLu2fmqbhWbotEtyxyAm4TfurKO8fGsbUbUJ+kW4075jDlAshWOfE2hyliaXn2KcK8mlQGutLvqXdZSX2bkb12Sh0vXRRqjrs2eqQpo4q805QZcRxuffrSPD+G2CNrVVVZ3LZ3CZxsqXgVfCv//XOsJLiSrrJPJfZ6G3EcSsrX8Gdo6srm9eFTTD1MWIG9Y0T1XQecLzQCmSVUdQVUFH6+zOiWamoNOIkfcYXhDL08z0oRNBb6yPysGRetNEFiECZXLUzhT02vqYLJLn6+1atKDSFlOHpEfEbguOHqEFjX1HCfWOxHmvI7u7ed6joG25mFKsmT0jaxpnC3PQ0HT5PuCOt7bGKwU5uvyk5878lEEIfWOm1jvxUGWYXCSS9XGN2KuPp+T4bh/tQJWDoH3eVRM9d+WavTfBZ596rLKqTF9bh/pnjleBiNFvY2JMCfcWRpCKiCcoQa+so2mQpypaA1cXY3SJlawuwDwSwCgoM6OgzIyCMjMKyswoKC/layw2TWG0tEMH/ieyP4qG1W46/jhBPzpP5Bp+9jlSKpA9svOYQy/PfGeK14e+BgUqcyRGUpimwOrgbYSU7gkCJjcRxZ0pQWNkq22wtrIxWVWQHNMi0usDLnVu07PQEHQTcYGBCzq/U0JYVQ290a08t+XskUO5SEhMMhbLzgTKddBQC/rDetufrcfig9joxQ5bxvMeNNSCcv3wBgtQz3V3UqJEWbmScw8amvmhofWouusz6+gweAzsxx7qT6qMlEKsVN/toRLqVUftTEG/Wh9zR3xzFGHKQNc/amcKugto+aRz2mPgew17swGuBkcerI+78RKmUXyv4USz6qIF3wULBRqkobp95pkXYC1cqFpo6WmlecguCAngu6L5oWpE3MtqOBbBxsZ30a1lnVRjoRRgpYqh7fYQsoLZsk46Y6GaXwF5T0Ow1BAx97BOizoL1SysI+6kbqmha+vPatMk6C5wp4S1QEJtKJlRLl9WTYGfJpcnFCB0o6sCd7Sv4LImh5Ah0fs9olRW3alpslBiGqPrNMVlT9aa4dwcaY+tY36XaeSiqc7owBeOrdA6oreSa9yFwREnL+trm6E9AgoSG6PqVcI3jNnZztsMdd2dUaL13hrTyb7BmYkxfcydGr7p4qE+211Kdon2RrJDNdGhNOpgnehwZSQ8SNBJTArYP/R/2P+us5gUkNu0iLCbV5+sfBvikGSxz0ytf2osXBugOkKz7zbo6KY09+6L7rQHxSA40hmLSBv6SbJy2dfOhXHb9US3XdfsENa6S3w6pEQZL7kzXMZHVzAzPlyFmfHxP8yMD6hiJuVHqKlxepPI6T1CjYj+Af7+dGpiAOSrAAAAAElFTkSuQmCC';
        else {
            // var xhr = new XMLHttpRequest();
            // xhr.onload = function () {
            //     var reader = new FileReader();
            //     reader.onloadend = function () {
            //         resumeObj.pic = reader.result;
            //     }
            //     reader.readAsDataURL(xhr.response);
            // };
            // xhr.open('GET', resumeObj.pic);
            // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            // xhr.setRequestHeader("Access-Control-Allow-Methods", "GET");
            // xhr.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
            // xhr.withCredentials = true;
            // xhr.responseType = 'blob';
            // xhr.send();
            // function getBase64FromImageUrl(url) {
            //     var img = new Image();
            //     img.crossOrigin = "anonymous";
            //     img.onload = function () {
            //         var canvas = document.createElement("canvas");
            //         canvas.width =this.width;
            //         canvas.height =this.height;
            //         var ctx = canvas.getContext("2d");
            //         ctx.drawImage(this, 0, 0);
            //         var dataURL = canvas.toDataURL("image/png");
            //         console.log(dataURL);
            //     };
            //     img.src = url;
            // }

            // //function call
            // getBase64FromImageUrl(resumeObj.pic);
        }
        // console.log(resumeObj.pic);
        $('#user_pic').attr('src', resumeObj.pic);
        if (!resumeObj.collegeLogo)
            resumeObj.collegeLogo = 'img/university_logo.svg';
        $('.clg_picture img').attr('src', resumeObj.collegeLogo)
        $('[data-content="firstname"]').text(resumeObj.firstname);
        $('[data-content="lastname"]').text(resumeObj.lastname);
        if (resumeObj.jobFunctions && resumeObj.jobFunctions.length) {
            $('input[data-content="jobfunctions"]').val(resumeObj.jobFunctions[0].jobFunctionName);
            $('input[data-content="jobfunctions"]').attr('data-item-id', resumeObj.jobFunctions[0]
                .categoryId);
        }
        $('[data-content="coverLetter"]').text(resumeObj.coverLetter);
        $('[data-content="userJobTitle"]').text(resumeObj.userJobTitle);
        $('[data-content="totalexperience"]').text(resumeObj.expDisplay);
        $('[data-content="location"]').text(resumeObj.location);
        $('[data-content="dob"]').val(resumeObj.date_of_birth);
        if (resumeObj.gender) {
            $('.gender .current').text(resumeObj.gender);
            $('.gender .current').css('color', 'rgb(33, 37, 41)');
        }
        // console.log("Email", resumeObj.email);
        $('[data-content="email"]').text(resumeObj.email);
        $('[data-content="phone"]').text(resumeObj.telephone);
        $('[data-content="linkedin"]').text(resumeObj.user_linkdin);
        $('[data-content="github"]').text(resumeObj.user_github);
        $('[data-content="twitter"]').text(resumeObj.user_twitter);
        $('[data-content="website"]').text(resumeObj.user_website);
        $('[data-content="blog"]').text(resumeObj.user_blog);

        $('[data-content="achivements"]').text(resumeObj.interests);
        $('[data-content="certifications"]').text(resumeObj.certifications);
        bindUserExpData();
        bindUserEduData();
        bindUserAcademicData();
        bindUserSkillsData();
        bindLanguagesData();

        validateStyleCopy();
        $('[contenteditable="true"]').on('focus', function() {
            $(this).keyup(function(e) {
                var code = e.keyCode ? e.keyCode : e.which;
                if (code == 9) {
                    moveCaretToEnd($(this)[0]);
                }
            });
        });
    }

    function bindUserExpData() {
        if (resumeObj.userExperienceResSet && resumeObj.userExperienceResSet.length > 1) {
            for (let index = 1; index < resumeObj.userExperienceResSet.length; index++) {
                var $div = $('div[id^="proExp_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'proExp_' + num);
                $div.after($klon);
            }
        }
        $(resumeObj.userExperienceResSet).each(function (i, v) {
            var id = 'proExp_' + (i + 1);
            $('#resume-body #' + id).find('input[data-content="exp_endDate"]').val(resumeObj
                .userExperienceResSet[i]
                .endDate);
            $('#resume-body #' + id).find('input[data-content="exp_startDate"]').val(resumeObj
                .userExperienceResSet[i]
                .startDate);
            $('#resume-body #' + id).find('span[data-content="exp_jobTitle"]').text(resumeObj
                .userExperienceResSet[i]
                .jobTitle);
            $('#resume-body #' + id).find('div[data-content="exp_location"]').text(resumeObj
                .userExperienceResSet[i]
                .location);
            $('#resume-body #' + id).find('div[data-content="exp_company"]').text(resumeObj
                .userExperienceResSet[i]
                .company);
            $('#resume-body #' + id).find('p[data-content="exp_description"]').text(resumeObj
                .userExperienceResSet[i]
                .description);
        });
        validateWorkExp();
    }

    function bindUserEduData() {
        if (resumeObj.userEducationResSet && resumeObj.userEducationResSet.length > 1) {
            for (let index = 1; index < resumeObj.userEducationResSet.length; index++) {
                var $div = $('div[id^="education_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'education_' + num);
                $div.after($klon);
            }
        }
        $(resumeObj.userEducationResSet).each(function (i, v) {
            var id = 'education_' + (i + 1);
            $('#resume-body #' + id).find('span[data-content="fieldOfStudy"]').text(resumeObj
                .userEducationResSet[i].fieldOfStudy);
            $('#resume-body #' + id).find('div[data-content="edu_institution"]').text(resumeObj
                .userEducationResSet[i].institution);
            $('#resume-body #' + id).find('div[data-content="edu_location"]').text(resumeObj
                .userEducationResSet[i].location);
            $('#resume-body #' + id).find('input[data-content="edu_startDate"]').val(resumeObj
                .userEducationResSet[i].startDate);
            $('#resume-body #' + id).find('input[data-content="edu_endDate"]').val(resumeObj
                .userEducationResSet[i].endDate);
            $('#resume-body #' + id).find('p[data-content="edu_description"]').text(resumeObj
                .userEducationResSet[i].description);
            $('#resume-body #' + id).find('input[data-content="degree_title"]').attr({
                'data-id': resumeObj.userEducationResSet[i].degree,
                // 'data-shortTitle': resumeObj.userEducationResSet[i].degree.shortTitle
            }).val();
            // $('#resume-body #' + id).find('span[data-content="degree_title"]').attr('data-id', resumeObj.userEducationResSet[i].degree.degreeId);
            // $('#resume-body #' + id).find('span[data-content="degree_title"]').attr('data-shorttitle', resumeObj.userEducationResSet[i].degree.shortTitle);
        });
        validateEduHistory();
    }

    function bindUserAcademicData() {
        if (resumeObj.userAcademicResSet && resumeObj.userAcademicResSet.length > 1) {
            for (let index = 0; index < resumeObj.userAcademicResSet.length; index++) {
                var $div = $('div[id^="academic_projects_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'academic_projects_' + num);
                $div.after($klon);
            }
        }
        $(resumeObj.userAcademicResSet).each(function (i, v) {
            const ap = resumeObj.userAcademicResSet[i];
            var id = 'academic_projects_' + (i + 1);
            console.log(id);
            $('#resume-body #' + id).find('span[data-content="acd_role"]').text(ap.role);
            $('#resume-body #' + id).find('span[data-content="acd_projectTitle"]').text(ap.projectTitle);
            $('#resume-body #' + id).find('div[data-content="acd_institution"]').text(ap.institution);
            $('#resume-body #' + id).find('div[data-content="acd_location"]').text(ap.location);
            $('#resume-body #' + id).find('input[data-content="acd_startDate"]').val(ap.startDate);
            $('#resume-body #' + id).find('input[data-content="acd_endDate"]').val(ap.endDate);
            $('#resume-body #' + id).find('p[data-content="acd_description"]').text(ap.description);
        });
        validateAcaProj();
    }

    function bindUserSkillsData() {
        var minSkill = '75%';
        if (resumeObj.userSkillsSet && resumeObj.userSkillsSet.length > 5) {
            for (let index = 5; index < resumeObj.userSkillsSet.length; index++) {
                var $div = $('li[id^="skills_item_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'skills_item_' + num)
                $div.after($klon);
                // console.log(num);
                $('#skills_small' + num + ' .skills-data-container').attr('id', 'skilsContainer_' +
                    num);
                $('.skills-item .remove_skills').removeClass('d-none');
            }
        }
        $(resumeObj.userSkillsSet).each(function (i, ev) {
            const v = resumeObj.userSkillsSet[i];
            var a = i + 1;
            // console.log(v, '#skills_item_' + a + ' .skills-bar .skill-value');
            $('#skills_item_' + a + ' .skill-container .skill-value').attr('data-skill', v.percentage);
            $('#skills_item_' + a + ' .skill-container .skill-value').text(v.percentage + '%');
            $('#skills_item_' + a + ' .skills-bar').attr('data-border', v.percentage);
            $('#skills_item_' + a + ' .skills-bar').attr('class', '').attr('class',
                'skills-bar color-blue at-' + v.percentage);
            $('#skills_item_' + a + ' .skill-input-value').text(v.title);
            $('#skills_item_' + a + ' .skill').attr('data-content', '').text(v.title);

        });

        validateSkills();
    }

    function selectRatingCircle(a, percentage) {
        switch (percentage) {
            case 25:
                $('#lang_' + a + ' .rating-container .rating-circle:first-child').addClass(
                    'rating-chosen')
                break;
            case 50:
                $('#lang_' + a + ' .rating-container li.rating-circle:first-child').addClass(
                    'rating-chosen')
                $('#lang_' + a + ' .rating-container li.rating-circle:nth-child(2)').addClass(
                    'rating-chosen')

                break;
            case 75:
                $('#lang_' + a + ' .rating-container li.rating-circle:first-child').addClass(
                    'rating-chosen')
                $('#lang_' + a + ' .rating-container li.rating-circle:nth-child(2)').addClass(
                    'rating-chosen')
                $('#lang_' + a + ' .rating-container li.rating-circle:nth-child(3)').addClass(
                    'rating-chosen')

                break;
            case 100:
                $('#lang_' + a + ' .rating-container li.rating-circle').addClass('rating-chosen')
                break;
            default:
                break;
        }
    }

    function bindLanguagesData() {
        if (resumeObj.userLngSet && resumeObj.userLngSet.length > 1) {
            for (let index = 1; index < resumeObj.userLngSet.length; index++) {
                var $div = $('li[id^="lang_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'lang_' + num);
                $div.after($klon);
            }
        }
        $(resumeObj.userLngSet).each(function (i, ev) {
            // var id = $('#lang_' + i);
            const v = resumeObj.userLngSet[i];
            var a = i + 1;
            console.log(v);
            $('#lang_' + a + ' .rating-container').attr('data-langpercentage', v.percentage);
            $('#lang_' + a + ' [data-content="languageName"]').text(v.title);
            selectRatingCircle(a, v.percentage);
        });

        if (resumeObj.userLngSet.length <= 1) {
            $('.remove_lang').addClass('d-none');
        }

        if (resumeObj.userLngSet.length == 0) {
            selectRatingCircle(1, 50);
        }

        validateLanguages();
    }
    // services
    var self = this;

    $('.skills').on('keydown', function () {
        var fieldVal = $(this).text();
        var skillsSettings = {
            "async": true,
            "crossDomain": true,
            "url": apiAdminUrl + "/skills?skillName=" + fieldVal,
            "method": "GET",
            "headers": {
                "token": "911ca088ab824095b82d3c98b32332e7",
            }
        }
        var skillsAll = new Array();
        var dom = $(this);
        $.ajax(skillsSettings).done(function (response) {
            // console.log(fieldVal, response)
            if (response !== null)
                $(response.content).each(function (k, v) {
                    skillsAll.push(response.content[k].skillName);
                });
            // var results = $.ui.autocomplete.filter(skillsAll, request.term);
            var skillsArray = [];
            $('.skills').each(function (index) {
                skillsArray.push($(this).text());
            });
            dom.autocomplete({
                source: skillsAll.filter(function (item, index) {
                    return skillsArray.indexOf(item) == -1;
                }),
                minLength: 0,
            }).focus(function () {
                $(this).autocomplete("search", $(this).val());
            });
        });
    });

    function saveUserProfile(applicantData, action) {
        if (applicantData.education.length) {
            var educationValidArray = applicantData.education.filter(function (item, index) {
                return !(!item.institution && !item.location && !item.degree && !item
                    .fieldOfStudy && !item.endDate && !item.startDate);
            });
            // console.log(educationValidArray);
            if (educationValidArray.length == 0) {
                // var errorMessage = "Please fill the all details in education";
                // $('#newErrorMessageID .message-text').html(errorMessage)
                // $('#newErrorMessageID').fadeIn().delay(2000)
                //     .fadeOut('slow', function () {
                //         $('#saveResume').removeAttr('pointer-events');
                //     });
                // return false;
                applicantData.education = [];
            } else {
                applicantData.education = applicantData.education.map(function (item, index) {
                    return {
                        degree: item.degree,
                        endDate: item.endDate,
                        fieldOfStudy: item.fieldOfStudy,
                        institution: item.institution,
                        isPresent: item.isPresent,
                        location: item.location,
                        startDate: item.startDate,
                        description: item.description
                    };
                });
            }
        }
        if (applicantData.experience.length) {
            // console.log("Experience", applicantData.experience);
            var experienceValidArray = applicantData.experience.filter(function (item, index) {
                // return false;
                return !(!item.jobTitle && !item.company && !item.endDate && !item.jobTitle && !item.location && !
                    item.startDate);
            });
            console.log("Experience", experienceValidArray);
            if (experienceValidArray.length == 0) {
                // var errorMessage = "Please fill the all details in experience";
                // $('#newErrorMessageID .message-text').html(errorMessage)
                // $('#newErrorMessageID').fadeIn().delay(2000)
                //     .fadeOut('slow', function () {
                //         $('#saveResume').removeAttr('pointer-events');
                //     });
                // return false;
                applicantData.experience = [];
            } else {
                applicantData.experience = experienceValidArray.map(function (item, index) {
                    return {
                        company: item.company,
                        description: item.description,
                        endDate: item.endDate,
                        isPresent: item.isPresent,
                        jobTitle: item.jobTitle,
                        location: item.location,
                        startDate: item.startDate
                    };
                });
            }
        }
        if (applicantData.academic.length) {
            var academicValidArray = applicantData.academic.filter(function (item, index) {
                // return false;
                return !(!item.description && !item.endDate && !item.institution && !item
                    .location && !item.startDate && !item.projectTitle && !item.role);
            });
            if (academicValidArray.length == 0) {
                // var errorMessage = "Please fill the all details in academic project";
                // $('#newErrorMessageID .message-text').html(errorMessage)
                // $('#newErrorMessageID').fadeIn().delay(2000)
                //     .fadeOut('slow', function () {
                //         $('#saveResume').removeAttr('pointer-events');
                //     });
                // return false;
                applicantData.academic = [];
            } else {
                applicantData.academic = academicValidArray.map(function (item, index) {
                    return {
                        description: item.description,
                        endDate: item.endDate,
                        institution: item.institution,
                        isPresent: item.isPresent,
                        location: item.location,
                        projectTitle: item.projectTitle,
                        role: item.role,
                        startDate: item.startDate
                    };
                });
            }
        }
        if (applicantData.skill.length) {
            var skillValidArray = applicantData.skill.filter(function (item, index) {
                // return !(!item.skillName && !item.skill_percentage);
                return item.skillName;
            });
            // console.log(academicValidArray);
            if (skillValidArray.length == 0) {
                // var errorMessage = "Please fill the skills";
                // $('#newErrorMessageID .message-text').html(errorMessage)
                // $('#newErrorMessageID').fadeIn().delay(2000)
                //     .fadeOut('slow', function () {
                //         $('#saveResume').removeAttr('pointer-events');
                //     });
                // return false;
                applicantData.skill = [];
            } else {
                applicantData.skill = skillValidArray.map(function (item, index) {
                    return {
                        skillName: item.skillName,
                        skill_percentage: item.skill_percentage
                    };
                });
            }
        }
        // console.log("Application Data", JSON.stringify(applicantData));
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": apiUrl + "/user/" + userId + "/updateProfileResume",
            "type": "POST",
            "headers": {
                "token": sessionId,
                "content-type": "application/json"
            },
            "processData": false,
            "data": JSON.stringify(applicantData),
            error: function (e) {
                console.log(e);
            },
            dataType: "json",
            contentType: "application/json"
        }
        // console.log("settings", settings.data);
        // downloadResume
        $.ajax(settings).done(function (response) {
            if (response.status == 'success') {
                $('#newSuccessMessageID .message-text').html(response.msg);
                $('.loading-container').fadeOut();
                if (action === 'save') {
                    $('#newSuccessMessageID').fadeIn().delay(2000)
                        .fadeOut('slow', function () {
                            $('#saveResume').removeAttr('pointer-events');
                        });
                }
                sessionStorage.setItem('userData', JSON.stringify(response.data));
                // console.log("Ajax response");
                // console.log(response.data);

                // console.log("Settings Done");
                var logoImg = $('input[data-content="picture"]').get(0).files[0];
                if (logoImg) {
                    saveUserPic();
                }
                // savePdf();
                getShareNameFile();

            } else {
                $('.loading-container').fadeOut();
                $('#newErrorMessageID .message-text').html(response.msg)
                $('#newErrorMessageID').fadeIn().delay(2000)
                    .fadeOut('slow', function () {
                        //$("#saveResume").bind("click");
                        $('#saveResume').removeAttr('pointer-events');
                    });
                if (formType == 'back') {
                    window.history.back();
                }
            }

        });
    }

    function getShareNameFile() {
        var self = this;
        var shareName = sessionStorage.getItem('shareName');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": apiUrl + "/user/getShareFile?name=" + shareName,
            "type": "GET",
            "headers": {
                "token": "911ca088ab824095b82d3c98b32332e7",
                "cache-control": "no-cache",
            }
        }

        $.ajax(settings).done(function (response) {
            // console.log(response);
        });

    }

    async function savePdf() {
        // if (planInfo.planId !== 1) {
        $('.loading-container').show();
        var eles = $('page');
        console.log(eles);
        var pageCount = eles.length;
        var doc = new jsPDF('p', 'cm', [89.1, 63], true);
        // watermark resume
        var docWaterMark = new jsPDF('p', 'cm', [89.1, 63], true);
        $(eles[1]).find('.nice-select ul.list').remove();
        var color;
        if (selectedcolor == 'theme-black') {
            color = '#2f2f2f';
        } else if (selectedcolor == 'theme-blue') {
            color = '#337ab7';
        } else {
            color = '#3ebb64';
        }
        console.log(color);
        $(eles[1]).find('path').attr('fill', color);
        $(eles[1]).find('polygon').attr('fill', color);
        $(eles[1]).find('.nice-select').css('border', '1px solid transparent');
        for (var i = 1; i < pageCount; ++i) {
            var ele = eles[i];
            $(ele).find('.border-dashed').removeClass('border-dashed').addClass('border-dashed-pdf');

            $(ele).css('background-image', '');
            $(ele).css('background-repeat', '');
            $(ele).css('background-size', '');
            $(ele).css('background-position', '');
            $(ele).css('font-variant-ligatures', 'no-common-ligatures');
            // $(ele).find('p').css('font-feature-settings', '"smcp" 1');

            console.log(ele);
            /* ele.css({'height': ''});
            ele.css({'max-height': ''});*/
            ele.style.boxShadow = "none";
            var canvas = await html2canvas(ele, {
                allowTaint: true,
                logging: true,
                useCORS: true,
                taintTest: false,
                scale: 3
            });

            const data = await canvas.toDataURL("image/jpeg");
            // console.log("Raw", data);

            if (i > 1) {
                doc.addPage();
                docWaterMark.addPage();
            }
            doc.setPage(i);
            docWaterMark.setPage(i);

            var image = new Image();
            image.src = data;
            doc.addImage(image, 'JPEG', -0.3, 0.5, 0, 0);

            addWaterMarkImage(ele)

            canvas = await html2canvas(ele, {
                allowTaint: true,
                logging: true,
                useCORS: true,
                taintTest: false,
                scale: 3
            });

            // const dataWaterMark = data;
            var waterMarkImage = new Image();
            waterMarkImage.src = await canvas.toDataURL("image/jpeg");
            // docWaterMark = addWaterMark(docWaterMark);
            docWaterMark.addImage(waterMarkImage, 'JPEG', -0.3, 0.5, 0, 0);

            ele.style.boxShadow = "rgba(0, 0, 0, .2) 0.2rem 0.2rem 3rem 0.2rem";

        }
        var pdfOut = doc.output('blob');
        var form2 = new FormData();
        form2.append("type", "resume");
        form2.append("userId", userId);
        form2.append('file', pdfOut);
        axios({
                method: 'post',
                url: apiUrl + "/uploadFile",
                data: form2,
                config: {
                    headers: {
                        "token": sessionId,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            })
            .then(function (response) {
                //handle success
                // console.log(response);
            })
            .catch(function (response) {
                //handle error
                // console.log(response);
            });
        var pdfOutWaterMark = docWaterMark.output('blob');
        var formWatermark = new FormData();
        formWatermark.append("type", "watermark");
        formWatermark.append("userId", userId);
        formWatermark.append('file', pdfOutWaterMark);
        axios({
                method: 'post',
                url: apiUrl + "/uploadFile",
                data: formWatermark,
                config: {
                    headers: {
                        "token": sessionId,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            })
            .then(function (response) {
                //handle success
                // console.log(response);
            })
            .catch(function (response) {
                //handle error
                // console.log(response);
            });
        if (planInfo.planId === 1) {
            docWaterMark.save(userId + '_resume.pdf');
            // doc.save(resumeObj.firstname + '_resume.pdf');
        } else {
            doc.save(resumeObj.firstname + '_resume.pdf');
        }
        $('.loading-container').delay(2000).fadeOut();
        // }
    }

    $('#user-picture').on('change', function () {
        saveUserPic();
        readURL(this);
    });

    function saveUserPic() {
        var form = new FormData();
        var logoImg = $('input[data-content="picture"]').get(0).files[0];

        form.append("userId", userId);
        form.append("type", "photo");
        form.append("file", logoImg);

        var imageSettings = {
            "async": true,
            "crossDomain": true,
            "url": apiUrl + "/uploadFile",
            "method": "POST",
            "headers": {
                "token": sessionId,
                "cache-control": "no-cache",
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        }
        console.log("imageSettings", imageSettings);
        $.ajax(imageSettings).done(function (responseData) {
            var response = JSON.parse(responseData);
            //console.log(response.data.httpPath);
            console.log(response);
            if (response.status == 'success') {
                // console.log(response.data.httpPath);
                sessionStorage.setItem('imageStore', response.data.httpPath);
                $('#profileMenu img').attr('src', response.data.httpPath);
                $('#profilePicEdit').attr('src', response.data.httpPath);
                $('#pimage-preview').attr('src', response.data.httpPath);
                $('#pimage-preview2').css('background', 'url(' + response.data.httpPath +
                    ') center center');
                $('#image-preview2').css('opacity', 0);


            }
        });
    }
    var imgData = window.location.origin + '/assets/images/resume/watermarkworkruit.png';
    var base64Img;
    toDataURL(imgData, function (dataUrl) {
        base64Img = dataUrl;
    })

    function addWaterMark(doc) {
        var totalPages = doc.internal.getNumberOfPages();
        console.log(base64Img, "base64Img");
        for (i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.addImage(base64Img, 'PNG', 3.3, 6);
        }
        return doc;
    }

    function toDataURL(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            }
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    }

    $('.ui-autocomplete').css('font-family', selectedFont);
    $('#zoomResume').slider({
        animate: "fast",
        step: 10,
        change: function (event, ui) {
            // console.log(ui.value);
            var width = (ui.value * 0.8 + 100) / 100 * 21;
            $("page").css('min-width', width + "cm");
            $("page").css('max-width', width + "cm");
            $("page").css('margin', "auto");
        }
    });

    $('.gender').on('change', function (e) {
        $('.gender .current').css('color', '#212529');
    });

    var getOuterHTML = function (obj) {
        return $("<div />").append(obj.clone()).html();
    }

    var renderPages = function () {
        var resume = $('#resume-body');
        var dpi = 96;
        var standardHeightAsCm = 29.7;
        var inch = 2.54;
        var standardA4Height = standardHeightAsCm * dpi / inch;
        var totalHeight = parseFloat(resume.css('height'));

        console.log("Document Size: ", resume.css('width'), resume.css('height'));
        console.log("Standard Height: ", standardA4Height);

        var emptyDom = "<page size='a4'>\
                            <div class='row'>\
                                <aside class='col-3 text-break'>\
                                </aside>\
                                <div class='col-9'>";
        var sideDom = "<page size='a4'>\
                            <div class='row'>\
                                " + getOuterHTML($('#resume-body aside')) +
            "<div class='col-9'>";

        var emptyDomClose = "</div>\
                            </div>\
                        </page>";


        var titleHeight = parseFloat($('#resume-title').css('height'));
        var memoHeight = parseFloat($('#resume-memo').css('height'));

        var stackedHeight;

        var experienceHeight = parseFloat($('#experience-section').css('height'));
        var experienceMarginTop = parseFloat($('#experience-section').css('margin-top'));
        var experienceMarginBottom = parseFloat($('#experience-section').css('margin-bottom'));
        var educationHeight = parseFloat($('#education-section').css('height'));
        var educationMarginBottom = parseFloat($('#education-section').css('margin-bottom'));
        var academicHeight = parseFloat($('#academic-section').css('height'));
        var academicMarginBottom = parseFloat($('#academic-section').css('margin-bottom'));
        var skillsHeight = parseFloat($('#skills-section').css('height'));
        var skillsMarginBottom = parseFloat($('#skills-section').css('margin-bottom'));
        var achievementsHeight = parseFloat($('#achievements-section').css('height'));
        var achievementsMarginBottom = parseFloat($('#achievements-section').css('margin-bottom'));
        var certificationsHeight = parseFloat($('#certifications-section').css('height'));
        var certificationsMarginBottom = parseFloat($('#certifications-section').css('margin-bottom'));
        var pagePadding = parseFloat(resume.css('padding'));

        console.log("Title Height: ", titleHeight);
        console.log("Memo Height: ", memoHeight);
        console.log("Work Experience Height:  ", experienceHeight);
        console.log("Work Experience Margin: ", "Top: ", experienceMarginTop, "Bottom: ", experienceMarginBottom);
        console.log("Education Height: ", educationHeight);
        console.log("Education Margin Bottom: ", educationMarginBottom);
        console.log("Academic Height: ", academicHeight);
        console.log("Academic Margin Bottom: ", academicMarginBottom);
        console.log("Skills Height: ", skillsHeight);
        console.log("Skills Margin Bottom: ", skillsMarginBottom);
        console.log("Achievements Height: ", achievementsHeight);
        console.log("Achievements Margin Bottom: ", achievementsMarginBottom);
        console.log("Certifications Height: ", certificationsHeight);
        console.log("Certifications Margin Bottom: ", certificationsMarginBottom);
        console.log("Page padding: ", pagePadding);

        stackedHeight = titleHeight + memoHeight;

        standardA4Height -= pagePadding * 2;

        // Check work experience
        // In case of work experience doesn't exceed the first page

        // console.log(stackedHeight + experienceHeight + experienceMarginTop);
        // console.log(standardA4Height);
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        if (stackedHeight + experienceHeight + experienceMarginTop <= standardA4Height) {
            stackedHeight += experienceHeight + experienceMarginTop + experienceMarginBottom;
            resume.after(sideDom + getOuterHTML($("#resume-title")) + getOuterHTML($('#resume-memo')) + getOuterHTML($('#experience-section')) + emptyDomClose);
        } else {
            console.log("Work Experience Header Height: ", $('#experience-section h4').css('height'));
            stackedHeight += parseFloat($('#experience-section h4').css('height')) + experienceMarginTop + parseFloat($('#experience-section h4').css('margin-bottom'));
            console.log("Exp1 Height: ", $('#proExp_1').css('height'));
            var expCount = $('#experience-section .professional-experience').length;
            console.log("Work Experience Count: ", expCount);
            var exps = $('#experience-section .professional-experience');
            var it;
            var domHtml = '<div class="row mt-3 flex-column">\
                                <h4 class="section_title text-uppercase font-10pt px-2">Work experience</h4>';
            for (it = 0; it < expCount && stackedHeight + parseFloat($(exps[it]).css('height')) <= standardA4Height; ++it) {
                console.log("Experience ", it, "th Height: ", parseFloat($(exps[it]).css('height')));
                stackedHeight += parseFloat($(exps[it]).css('height'));
                domHtml += getOuterHTML($(exps[it]));
            }

            domHtml += '</div>';

            resume.after(sideDom + getOuterHTML($("#resume-title")) + getOuterHTML($('#resume-memo')) + domHtml + emptyDomClose);

            domHtml = '<div class="row flex-column mb-1">';
            stackedHeight = experienceMarginBottom;

            for (; it < expCount; ++it) {
                console.log("Experience ", it, "th Height: ", parseFloat($(exps[it]).css('height')));
                stackedHeight += parseFloat($(exps[it]).css('height'));
                domHtml += getOuterHTML($(exps[it]));
            }

            domHtml += '</div>';

            resume = $('page').last();
            resume.after(emptyDom + domHtml + emptyDomClose);

            console.log("Stacked Height: ", stackedHeight);
        }

        // Clone values from original one

        $($('[data-content="jobfunctions"]')[1]).val($($('[data-content="jobfunctions"]')[0]).val());

        var originExpCount = $('#resume-body #experience-section .professional-experience').length;
        for (var i = 1; i <= originExpCount; ++i) {
            var origin = $($('[data-content="exp_startDate"]')[i - 1]);
            var cloned = $($('[data-content="exp_startDate"]')[i + originExpCount - 1]);
            cloned.val(origin.val());
            origin = $($('[data-content="exp_endDate"]')[i - 1]);
            cloned = $($('[data-content="exp_endDate"]')[i + originExpCount - 1]);
            cloned.val(origin.val());
        }

        // 

        $($('[data-content="dob"]')[1]).val($($('[data-content="dob"]')[0]).val());
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Check Education
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        resume = $('page').last();
        if (stackedHeight + educationHeight + educationMarginBottom < standardA4Height) {
            stackedHeight += educationHeight + educationMarginBottom;
            resume.find('.col-9 .row').last().after(getOuterHTML($('#education-section')));
        } else {
            var domHtml = '';
            stackedHeight += parseFloat($('#education-section h4').css('height')) + parseFloat($('#education-section h4').css('margin-bottom'));
            var eduCount = $('#education-section .education-details').length;
            var edus = $('#education-section .education-details');
            var it;
            console.log("Education Count: ", eduCount);
            domHtml += '<div class="row flex-column mb-1" id="education-section">\
                            <h4 class="section_title text-uppercase font-10pt px-2">Education</h4>';
            for (it = 0; it < eduCount && stackedHeight + parseFloat($(edus[it]).css('height')) <= standardA4Height; ++it) {
                console.log("Education ", it, "th Height: ", parseFloat($(edus[it]).css('height')));
                stackedHeight += parseFloat($(edus[it]).css('height'));
                domHtml += getOuterHTML($(edus[it]));
            }

            domHtml += '</div>';

            resume.find('.col-9 .row').last().after(domHtml + emptyDomClose);

            domHtml = '<div class="row flex-column mb-1">';
            stackedHeight = educationMarginBottom;

            for (; it < eduCount; ++it) {
                console.log("Education ", it, "th Height: ", parseFloat($(edus[it]).css('height')));
                stackedHeight += parseFloat($(edus[it]).css('height'));
                domHtml += getOuterHTML($(edus[it]));
            }

            domHtml += '</div>';

            resume = $('page').last();
            resume.after(emptyDom + domHtml + emptyDomClose);

            console.log("Stacked Height: ", stackedHeight);
        }

        // Clone values from original one

        var originEduCount = $('#resume-body #education-section .education-details').length;
        for (var i = 1; i <= originEduCount; ++i) {
            var origin = $($('[data-content="edu_startDate"]')[i - 1]);
            var cloned = $($('[data-content="edu_startDate"]')[i + originEduCount - 1]);
            cloned.val(origin.val());
            origin = $($('[data-content="edu_endDate"]')[i - 1]);
            cloned = $($('[data-content="edu_endDate"]')[i + originEduCount - 1]);
            cloned.val(origin.val());
            origin = $($('[data-content="degree_title"]')[i - 1]);
            cloned = $($('[data-content="degree_title"]')[i + originEduCount - 1]);
            cloned.val(origin.val());
        }
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Check Academic Experiences
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        resume = $('page').last();
        if (stackedHeight + academicHeight + academicMarginBottom < standardA4Height) {
            stackedHeight += academicHeight + academicMarginBottom;
            resume.find('.col-9 .row').last().after(getOuterHTML($('#academic-section')));
        } else {
            var domHtml = '';
            stackedHeight += parseFloat($('#academic-section h4').css('height')) + parseFloat($('#academic-section h4').css('margin-bottom'));
            var acaCount = $('#academic-section .academic-project').length;
            var acas = $('#academic-section .academic-project');
            var it;
            console.log("Academic Count: ", acaCount);
            domHtml += '<div class="row flex-column  mb-1" id="academic-section">\
                            <h4 class="section_title text-uppercase font-10pt px-2">Academic Projects</h4>';
            for (it = 0; it < acaCount && stackedHeight + parseFloat($(acas[it]).css('height')) <= standardA4Height; ++it) {
                console.log("Academic ", it, "th Height: ", parseFloat($(acas[it]).css('height')));
                stackedHeight += parseFloat($(acas[it]).css('height'));
                domHtml += getOuterHTML($(acas[it]));
            }

            domHtml += '</div>';

            resume.find('.col-9 .row').last().after(domHtml + emptyDomClose);

            domHtml = '<div class="row flex-column mb-1">';
            stackedHeight = academicMarginBottom;

            for (; it < acaCount; ++it) {
                console.log("Academic ", it, "th Height: ", parseFloat($(acas[it]).css('height')));
                stackedHeight += parseFloat($(acas[it]).css('height'));
                domHtml += getOuterHTML($(acas[it]));
            }

            domHtml += '</div>';

            resume = $('page').last();
            resume.after(emptyDom + domHtml + emptyDomClose);

            console.log("Stacked Height: ", stackedHeight);
        }

        // Clone values from original one

        var originAcaCount = $('#resume-body #academic-section .academic-project').length;
        for (var i = 1; i <= originAcaCount; ++i) {
            var origin = $($('[data-content="acd_startDate"]')[i - 1]);
            var cloned = $($('[data-content="acd_startDate"]')[i + originAcaCount - 1]);
            cloned.val(origin.val());
            origin = $($('[data-content="acd_endDate"]')[i - 1]);
            cloned = $($('[data-content="acd_endDate"]')[i + originAcaCount - 1]);
            cloned.val(origin.val());
        }
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Skills Check
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        resume = $('page').last();
        if (stackedHeight + skillsHeight + skillsMarginBottom < standardA4Height) {
            stackedHeight += skillsHeight + skillsMarginBottom;
            resume.find('.col-9 .row').last().after(getOuterHTML($('#skills-section')));
        } else {
            var domHtml = '';
            stackedHeight += parseFloat($('#skills-section h4').css('height')) + parseFloat($('#skills-section h4').css('margin-bottom'));
            var skillCount = $('#skills-section .skills-item').length;
            var skills = $('#skills-section .skills-item');
            var it;
            console.log("Skills Count: ", skillCount);
            domHtml += '<div class="row flex-column  mb-1 skill-row" id="skills-section">\
                            <h4 class="section_title text-uppercase font-10pt px-2">Skills</h4>\
                            <div class="skills-section">\
                                <ul class="list-unstyled w-100 skills-list mb-0">';
            for (it = 0; it < skillCount && stackedHeight + parseFloat($(skills[it]).css('height')) <= standardA4Height; it += 2) {
                console.log("Skills ", it, "th Height: ", parseFloat($(skills[it]).css('height')));
                stackedHeight += parseFloat($(skills[it]).css('height'));
                domHtml += getOuterHTML($(skills[it]));
                if (it + 1 < skillCount)
                    domHtml += getOuterHTML($(skills[it + 1]));
            }

            domHtml += '</ul>\
                    </div>\
                </div>';

            resume.find('.col-9 .row').last().after(domHtml + emptyDomClose);

            domHtml = '<div class="row flex-column mb-1 skill-row">\
                            <div class="skills-section">\
                                <ul class="list-unstyled w-100 skills-list mb-0">';
            stackedHeight = skillsMarginBottom;

            for (; it < skillCount; it += 2) {
                console.log("Skills ", it, "th Height: ", parseFloat($(skills[it]).css('height')));
                stackedHeight += parseFloat($(skills[it]).css('height'));
                domHtml += getOuterHTML($(skills[it]));
                if (it + 1 < skillCount)
                    domHtml += getOuterHTML($(skills[it + 1]));
            }

            domHtml += '</ul>\
                    </div>\
                </div>';

            resume = $('page').last();
            resume.after(emptyDom + domHtml + emptyDomClose);

            console.log("Stacked Height: ", stackedHeight);
        }
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Check achievements
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        resume = $('page').last();
        if (stackedHeight + achievementsHeight + achievementsMarginBottom < standardA4Height) {
            stackedHeight += achievementsHeight + achievementsMarginBottom;
            resume.find('.col-9 .row').last().after(getOuterHTML($('#achievements-section')));
        } else {
            resume.after(emptyDom + getOuterHTML($('#achievements-section')) + emptyDomClose);
            stackedHeight = 0;
        }
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // Check certifications
        // -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        resume = $('page').last();
        if (stackedHeight + certificationsHeight + certificationsMarginBottom < standardA4Height) {
            stackedHeight += certificationsHeight + certificationsMarginBottom;
            resume.find('.col-9 .row').last().after(getOuterHTML($('#certifications-section')));
        } else {
            resume.after(emptyDom + getOuterHTML($('#certifications-section')) + emptyDomClose);
            stackedHeight = 0;
        }
        // if (!planInfo.subscribedUser || planInfo.planId === 1) {
        //     setTimeout(function () {
        //         addWaterMarkImage('#resume-body, .watermark')
        //     }, 0)
        // }
    }


    /**
     * Add Water to page element
     * @param SELECTOR_STRING
     */


    function addWaterMarkImage(selectorElements) {
        $(selectorElements).css(waterMarkCss)
        // $(selectorElements).css('background-image', 'url("' + window.location.origin + '/assets/images/resume/watermarkworkruit.png' + '")');
        // $(selectorElements).css('background-repeat', 'repeat-y');
        // $(selectorElements).css('background-size', '40%');
        // $(selectorElements).css('background-position', 'center 0');
    }

    $('.month-picker').on('change', function() {
        var inputWidth = $(this).textWidth();
        $(this).css({
            width: inputWidth
        })
    });

    setTimeout(function() {
        $('.month-picker').trigger('change');
    }, 2000);

    ratingCircle();
});