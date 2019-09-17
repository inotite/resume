const appDate = new Date();
const apiAdminUrl = "https://devapi.workruit.com/admin";
const apiUrl = "https://devapi.workruit.com/api";
const userId = JSON.parse(localStorage.getItem('userData')).userId;
const sessionId = localStorage.getItem('sessionId');
const userStatus = localStorage.getItem('isPremiumUser');
const planInfo = JSON.parse(localStorage.getItem('userPlanStatus'));
let resumeObj = JSON.parse(localStorage.getItem('userData'));
const exp_total_count = 10;
const edu_total_count = 10;
const proj_total_count = 10;
console.log(resumeObj);
// 'Source_Sans_Pro', 'Merriweather', 'Roboto', 'Saira Semi Condensed'
var twitterIcon = import('../img/twitter.svg');
console.log("twitterIcon", twitterIcon);
$('#twitter').prepend(twitterIcon);
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
}]
var settings = resumeObj.themeOptions ? JSON.parse(resumeObj.themeOptions).settings : defaultSettings;
$(window).ready(function () {
    $('.gender').niceSelect();
    if (planInfo && planInfo[0].planId == 1) {
        $('#resume-body').css({
            'background-image': 'url("watermarkworkruit.svg")',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'background-size': 'contain'
        });
    }
    var selectedFont = resumeObj.themeOptions ? JSON.parse(resumeObj.themeOptions).font : fonts[0].fontFamily;
    var selectedcolor = resumeObj.themeOptions ? JSON.parse(resumeObj.themeOptions).color : 'theme-black';
    $('.selected-font').text(selectedFont).attr('data-font', selectedFont);
    $('.selected-color').addClass(selectedcolor).attr('data-color', selectedcolor);
    $('.resume-container').attr('data-oldcolor', 'theme-black').removeClass('theme-black').addClass(selectedcolor);
    $('body').css('font-family', selectedFont);
    // Declare some global variables for later use:
    for (let index = 0; index < fonts.length; index++) {
        const fontItem = fonts[index];
        const fontLink = '<a class="dropdown-item cursor-pointer font-item" data-font=' + fontItem
            .fontInfo +
            ' style="font-family:' + fontItem.fontFamily + '">' +
            fontItem.fontFamily + '</a>';
        $('.font-items').append(fontLink);
    }
    $('.font-items .font-item').on('click', function () {
        var selectedFont = $(this).attr('data-font');
        fonts.filter(item => {
            if (selectedFont == item.fontInfo) {
                $('.selected-font').text(item.fontFamily).attr('data-font', item.fontFamily);
                $('body').css('font-family', item.fontFamily);
                $('.ui-autocomplete').css('font-family', item.fontFamily);
                console.log($('.ui-autocomplete'));
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
    $('.actions').click(function (e) {
        e.stopPropagation();
    });
    // bind userData to Resume

    $('#previewResume').on('click', function () {
        $('.resume-preview').removeClass('d-none');
        $('#previewResume').addClass('d-none');
        $('#previewBack').removeClass('d-none');
        $('.editorNav').addClass('d-none');
        $('.previewNav').css('z-index', '2');
    });
    $('#previewBack').on('click', function () {
        $('.resume-preview').addClass('d-none');
        $('#previewResume').removeClass('d-none');
        $('#previewBack').addClass('d-none');
        $('.editorNav').removeClass('d-none');
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

                if (index >= 0) {
                    //Return the previously chosen choice (if any) back in green
                    // Recall the choice using its index
                    // "get" returns a DOM element, NOT a jQuery object
                    var chosenCircle = container.children().get(index);
                    //Convert to jQuery object
                    var $rating = $(chosenCircle);

                    //Make them green again
                    $rating.addClass("rating-chosen");
                    $rating.prevAll().addClass("rating-chosen");
                }
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
            }
        );
    }
    ratingCircle();


    $("body").on("click", ".skills-bar", function (e) {
        var skillDataValue = $(this).attr('data-border');
        switch (skillDataValue) {
            case '25':
                $(this).addClass('at-50').removeClass('at-25');
                $(this).attr('data-border', '50');
                $(this).children().attr('data-skill', '50%').text('50%');
                break;
            case '50':
                $(this).addClass('at-75').removeClass('at-50');
                $(this).attr('data-border', '75');
                $(this).children().attr('data-skill', '75%').text('75%');
                break;
            case '75':
                $(this).addClass('at-100').removeClass('at-75');
                $(this).attr('data-border', '100');
                $(this).children().attr('data-skill', '100%').text('100%');
                break;
            case '100':
                $(this).addClass('at-25').removeClass('at-100');
                $(this).attr('data-border', '25');
                $(this).children().attr('data-skill', '25%').text('25%');
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

            $("#proExp_" + num + " .exp-role").keypress(function(e) {
                return handleKeypress($(this), LENGTH_EXP_ROLE, e);
            });
            
            $("#proExp_" + num + " .exp-role").keyup(function(e) {
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
            
            $("#proExp_" + num + " .exp-desc").keypress(function(e) {
                return limitLines($(this), LINE_EXP_DESC, e);
            });
            
            $("#proExp_" + num + " .exp-desc").keyup(function(e) {
                return preventCopyPaste($(this), LINE_EXP_DESC, e);
            });
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
                'Degree');
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
                format: "M-yyyy",
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
            
            $("#education_" + num + " .edu-field").keypress(function(e) {
                return handleKeypress($(this), LENGTH_EDU_FIELD_OF_STUDY, e);
            });

            $("#education_" + num + " .edu-field").keyup(function(e) {
                return preventCopyPasteLength($(this), LENGTH_EDU_FIELD_OF_STUDY, e);
            });

            $("#education_" + num + " .edu-degree").keypress(function(e) {
                return handleKeypress($(this), LENGTH_EDU_DEGREE, e);
            });

            $("#education_" + num + " .edu-degree").keyup(function(e) {
                return preventCopyPasteLength($(this), LENGTH_EDU_DEGREE, e);
            });

            $("#education_" + num + " .edu-school").keypress(function(e) {
                return handleKeypress($(this), LENGTH_EDU_SCHOOL, e);
            });

            $("#education_" + num + " .edu-school").keyup(function(e) {
                return preventCopyPasteLength($(this), LENGTH_EDU_SCHOOL, e);
            });

            $("#education_" + num + " .edu-location").keypress(function(e) {
                return handleKeypress($(this), LENGTH_EDU_LOCATION, e);
            });

            $("#education_" + num + " .edu-location").keyup(function(e) {
                return preventCopyPasteLength($(this), LENGTH_EDU_LOCATION, e);
            });

            $("#education_" + num + " .edu-desc").keypress(function(e) {
                return limitLines($(this), LINE_EDU_DESC, e);
            });

            $("#education_" + num + " .edu-desc").keyup(function(e) {
                return preventCopyPaste($(this), LINE_EDU_DESC, e);
            });
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
                format: "M-yyyy",
                endDate: moment(appDate).format('MMM-YYYY'),
                startView: "months",
                minViewMode: "months"
            });

            
            $("#academic_projects_" + num + " .project-title").keypress(function(e) {
                return handleKeypress($(this), LENGTH_PROJ_TITLE, e);
            });
            
            $("#academic_projects_" + num + " .project-title").keyup(function(e) {
                return preventCopyPasteLength($(this), LENGTH_PROJ_TITLE, e);
            });

            $("#academic_projects_" + num + " .project-role").keypress(function(e) {
                return handleKeypress($(this), LENGTH_PROJ_ROLE, e);
            });

            $("#academic_projects_" + num + " .project-role").keyup(function(e) {
                return preventCopyPasteLength($(this), LENGTH_PROJ_ROLE, e);
            });

            $("#academic_projects_" + num + " .university").keypress(function(e) {
                return handleKeypress($(this), LENGTH_PROJ_UNIVERSITY, e);
            });

            $("#academic_projects_" + num + " .university").keyup(function(e) {
                return preventCopyPasteLength($(this), LENGTH_PROJ_UNIVERSITY, e);
            });

            $("#academic_projects_" + num + " .uni-location").keypress(function(e) {
                return handleKeypress($(this), LENGTH_PROJ_LOCATION, e);
            });

            $("#academic_projects_" + num + " .uni-location").keyup(function(e) {
                return preventCopyPasteLength($(this), LENGTH_PROJ_LOCATION, e);
            });

            $("#academic_projects_" + num + " .project-desc").keypress(function(e) {
                return limitLines($(this), LINE_PROJ_DESC, e);
            });

            $("#academic_projects_" + num + " .project-desc").keyup(function(e) {
                return preventCopyPaste($(this), LINE_PROJ_DESC, e);
            });
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
        $('#skills_item_' + num + ' .skill-name').keypress(function(e) {
            return limitLines($(this), LINE_SKILL_NAME, e);
        });
        $('#skills_item_' + num + ' .skill-name').keyup(function(e) {
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
            $('#skills_item_' + num + ' .skill').attr('data-content', '').val('');
            $('#skills_item_' + num + ' [data-content="skillText"]').val('');
            // console.log('i am add_exp')
            // $('#skills_item_' + num + ' .skill-name').keypress(function(e) {
            //     return limitLines($(this), LINE_SKILL_NAME, e);
            // });
            // $('#skills_item_' + num + ' .skill-name').keyup(function(e) {
            //     return preventCopyPaste($(this), LINE_SKILL_NAME, e);
            // });
        }
        if ($('.skills-item').length == 16) {
            $('.skills-item .add_skills').addClass('d-none');
        }
        if ($('.skills-item ').length > 5) {
            $('.skills-item .remove_skills').removeClass('d-none');
        }
        $('.skills').on('keydown', function () {
            var fieldVal = $(this).val();
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
            $.ajax(skillsSettings).done(function (response) {
                // console.log(fieldVal, response)
                console.log("Skill response");
                console.log(response);
                $(response.content).each(function (k, v) {
                    skillsAll.push(response.content[k].skillName);
                });
                // var results = $.ui.autocomplete.filter(skillsAll, request.term);
                console.log("a");
                $(".skills").autocomplete({
                    source: skillsAll,
                    minLength: 0
                }).focus(function () {
                    $(this).autocomplete("search", $(this).val());
                });
                console.log("A");
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
        bindUserDataForSave();
        saveUserProfile(postObj);
    });

    $('#downloadResume').on('click', function () {
        savePdf()
    });

    function bindUserDataForSave() {
        const jobfunctions = $('input[data-content="jobfunctions"]').attr('data-item-id') ? [JSON.parse(
            $('input[data-content="jobfunctions"]').attr('data-item-id'))] : []
        postObj.pic = localStorage.getItem('imageStore');
        postObj.firstname = $('[data-content="firstname"]').text();
        postObj.lastname = $('[data-content="lastname"]').text();
        postObj.jobfunctions = jobfunctions;
        postObj.coverLetter = $('[data-content="coverLetter"]').text();
        postObj.userJobTitle = $('[data-content="userJobTitle"]').text();
        postObj.expDisplay = $('[data-content="totalexperience"]').text();
        postObj.location = $('[data-content="location"]').text();
        postObj.date_of_birth = $('[data-content="dob"]').val();
        postObj.gender = $('.gender .current').text();

        postObj.email = $('[data-content="email"]').text();
        postObj.telephone = $('[data-content="phone"]').text();
        postObj.user_linkdin = $('[data-content="linkedin"]').text();
        // postObj.user_github = !$('.social-github').hasClass('d-none') ? '' : $('[data-content="github"]').text();
        // postObj.user_twitter = !$('.social-twitter').hasClass('d-none') ? '' : $('[data-content="twitter"]').text();
        // postObj.user_website = !$('.social-website').hasClass('d-none') ? '' : $('[data-content="website"]').text();
        // postObj.user_blog = !$('.social-blog').hasClass('d-none') ? '' : $('[data-content="blog"]').text();
        postObj.user_github = $('[data-content="github"]').text();
        postObj.user_twitter = $('[data-content="twitter"]').text();
        postObj.user_website = $('[data-content="website"]').text();
        postObj.user_blog = $('[data-content="blog"]').text();

        postObj.interests = $('[data-content="achivements"]').text();
        postObj.certifications = $('[data-content="certifications"]').text();
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
        $('.professional-experience').each(function (i, v) {
            var id = $(this).attr('id');
            var exp_endDate = $('#' + id).find('input[data-content="exp_endDate"]').val();
            var exp_startDate = $('#' + id).find('input[data-content="exp_startDate"]')
                .val();
            var exp_jobTitle = ($('#' + id).find('span[data-content="exp_jobTitle"]').attr(
                        'placeholder') != $('#' + id).find('span[data-content="exp_jobTitle"]')
                    .text()) ?
                $('#' + id).find('span[data-content="exp_jobTitle"]').text() : '';
            var exp_location = ($('#' + id).find('span[data-content="exp_location"]').attr(
                        'placeholder') != $('#' + id).find('span[data-content="exp_location"]')
                    .text()) ?
                $('#' + id).find('span[data-content="exp_location"]').text() : '';
            var exp_company = ($('#' + id).find('span[data-content="exp_company"]').attr(
                    'placeholder') != $('#' + id).find('span[data-content="exp_company"]')
                .text()) ? $(
                '#' + id).find('span[data-content="exp_company"]').text() : '';
            var exp_description = ($('#' + id).find('p[data-content="exp_description"]')
                .attr('placeholder') != $('#' + id).find(
                    'p[data-content="exp_description"]')
                .text()) ? $('#' + id).find('p[data-content="exp_description"]').text() : '';

            postObj.experience.push({
                "endDate": exp_endDate,
                "startDate": exp_startDate,
                "jobTitle": exp_jobTitle.trim(),
                "isPresent": 0,
                "location": exp_location,
                "company": exp_company,
                "description": exp_description.trim()
            });
        });
    }

    function getAcademicDetails() {
        postObj.academic = [];
        if (!$('#academic-section').hasClass('d-none')) {
            $('.academic-project').each(function (i, v) {
                var id = $(this).attr('id');
                var acd_endDate = $('#' + id).find(
                    'input[data-content="acd_endDate"]').val();
                var acd_startDate = $('#' + id).find(
                        'input[data-content="acd_startDate"]')
                    .val();
                var institution = ($('#' + id).find(
                            'span[data-content="acd_institution"]')
                        .attr(
                            'placeholder') != $('#' + id).find(
                            'span[data-content="acd_institution"]')
                        .text()) ?
                    $('#' + id).find(
                        'span[data-content="acd_institution"]')
                    .text() : '';
                var location = ($('#' + id).find(
                            'span[data-content="acd_location"]').attr(
                            'placeholder') != $('#' + id).find(
                            'span[data-content="acd_location"]')
                        .text()) ?
                    $('#' + id).find(
                        'span[data-content="acd_location"]').text() :
                    '';
                var project = ($('#' + id).find(
                            'span[data-content="acd_projectTitle"]')
                        .attr(
                            'placeholder') != $('#' + id).find(
                            'span[data-content="acd_projectTitle"]')
                        .text()) ? $(
                        '#' + id).find(
                        'span[data-content="acd_projectTitle"]')
                    .text() : '';
                var description = ($('#' + id).find(
                            'p[data-content="acd_description"]')
                        .attr('placeholder') != $('#' + id).find(
                            'p[data-content="acd_description"]')
                        .text()) ? $('#' + id).find(
                        'p[data-content="acd_description"]')
                    .text() : '';
                var role = ($('#' + id).find(
                            'span[data-content="acd_role"]')
                        .attr('placeholder') != $('#' + id).find(
                            'span[data-content="acd_role"]')
                        .text()) ? $('#' + id).find(
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
        $('.education-details').each(function (i, v) {
            // console.log(v);
            var id = $(this).attr('id');
            var endDate = $('#' + id).find(
                'input[data-content="edu_endDate"]').val();
            var startDate = $('#' + id).find(
                    'input[data-content="edu_startDate"]')
                .val();
            var fieldOfStudy = ($('#' + id).find('span[data-content="fieldOfStudy"]')
                .attr(
                    'placeholder') != $('#' + id).find(
                    'span[data-content="fieldOfStudy"]').text()) ? $(
                '#' + id).find('span[data-content="fieldOfStudy"]').text() : '';
            var institution = ($('#' + id).find(
                    'span[data-content="edu_institution"]').attr(
                    'placeholder') != $('#' + id).find(
                    'span[data-content="edu_institution"]').text()) ?
                $('#' + id).find('span[data-content="edu_institution"]').text() :
                '';
            var location = ($('#' + id).find('span[data-content="edu_location"]')
                    .attr(
                        'placeholder') != $('#' + id).find(
                        'span[data-content="edu_location"]').text()) ?
                $('#' + id).find('span[data-content="edu_location"]').text() : '';
            var degree = {
                title: $('#' + id).find('input[data-content="degree_title"]').val(),
                degreeId: $('#' + id).find('input[data-content="degree_title"]').attr(
                    'data-id'),
                shortTitle: $('#' + id).find('input[data-content="degree_title"]').attr(
                    'data-shorttitle'),
            };
            var description = ($('#' + id).find(
                    'p[data-content="edu_description"]')
                .attr('placeholder') != $('#' + id).find(
                    'p[data-content="edu_description"]')
                .text()) ? $('#' + id).find(
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
        $('.lang_details').each(function (i, v) {
            // console.log(v);
            var id = $(this).attr('id');
            $(".rating-chosen").length * 25;
            var lng_percentage = $('#' + id + ' li.rating-chosen').length;
            var lngName = $('#' + id + ' [data-content="languageName"]').text();
            // var title = $('#' + id).find(
            //         '[data-content="languageName"]')
            //     .val();
            // var percentage = ($('#' + id).find('[data-langpercentage]')
            //     .attr(
            //         'placeholder') != $('#' + id).find(
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
        $('.skills-item').each(function (i, v) {
            var id = $(this).attr('id');
            var skill_name = $('#' + id + ' .skill-input-value').val();
            var skill_value = parseInt($('#' + id).find('.skill-value').attr('data-skill'));
            // console.log(i, skill_name, skill_value, "skill_value");
            postObj.skill.push({
                "skillName": skill_name,
                "skill_percentage": skill_value
            });
        });
    }

    function GetThemeOptions() {
        const themeOptions = {
            color: $('.selected-color').attr('data-color'),
            font: $('.selected-font').attr('data-font'),
            settings: settings
        }
        postObj.themeOptions = JSON.stringify(themeOptions);
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

    $("#user-picture").change(function () {
        console.log("Here");
        readURL(this);
    });

    bindUserData();

    function bindUserData() {
        if ( !resumeObj.pic )
            resumeObj.pic = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAFYUlEQVR4nO2d7W3bMBCGr0EHUCeoM0HUCWpP0HSC2BM0naDOBHEmsDtB3QniThB1groTRD/6vwWNlwYtyhJF3lFUqgcwEsgfol7d8eN4pF49P/+hRJjgNUVx3rcU6wf+7ohoj1fv9CloTkTXEE79n1mf6EZJRAWE3uL/6MQWVFnfDYQMFbCNEsJ+hRVHIYagSrg5EX2CS/eBqg4eiGgDocWQFFQJeQshpa3RlRLCrqSElRJ0mZiQVbSwS+udQLgFVXXkukfX7oqqChacdeyFdcQPZYn3RPQ4IDEJZX1E2Vm8icNCVZfn28CErENZ68fQ7laoharW++kFiEm4hidckzchgt6jvnxprHFtXvgKukaX6KVy62ssPoKuQ91iIMx9RO0qaCwxVQNxR0Qz1XBWXjO8FyMY0lnULq38fQQ3Vy3s5w79winKlVvv8LJCuVpxtdB5BDFVod917GTv8J2V9Q4vt66e6WKhOboTkiwQuAjBq87ryLu2fmqbhWbotEtyxyAm4TfurKO8fGsbUbUJ+kW4075jDlAshWOfE2hyliaXn2KcK8mlQGutLvqXdZSX2bkb12Sh0vXRRqjrs2eqQpo4q805QZcRxuffrSPD+G2CNrVVVZ3LZ3CZxsqXgVfCv//XOsJLiSrrJPJfZ6G3EcSsrX8Gdo6srm9eFTTD1MWIG9Y0T1XQecLzQCmSVUdQVUFH6+zOiWamoNOIkfcYXhDL08z0oRNBb6yPysGRetNEFiECZXLUzhT02vqYLJLn6+1atKDSFlOHpEfEbguOHqEFjX1HCfWOxHmvI7u7ed6joG25mFKsmT0jaxpnC3PQ0HT5PuCOt7bGKwU5uvyk5878lEEIfWOm1jvxUGWYXCSS9XGN2KuPp+T4bh/tQJWDoH3eVRM9d+WavTfBZ596rLKqTF9bh/pnjleBiNFvY2JMCfcWRpCKiCcoQa+so2mQpypaA1cXY3SJlawuwDwSwCgoM6OgzIyCMjMKyswoKC/layw2TWG0tEMH/ieyP4qG1W46/jhBPzpP5Bp+9jlSKpA9svOYQy/PfGeK14e+BgUqcyRGUpimwOrgbYSU7gkCJjcRxZ0pQWNkq22wtrIxWVWQHNMi0usDLnVu07PQEHQTcYGBCzq/U0JYVQ290a08t+XskUO5SEhMMhbLzgTKddBQC/rDetufrcfig9joxQ5bxvMeNNSCcv3wBgtQz3V3UqJEWbmScw8amvmhofWouusz6+gweAzsxx7qT6qMlEKsVN/toRLqVUftTEG/Wh9zR3xzFGHKQNc/amcKugto+aRz2mPgew17swGuBkcerI+78RKmUXyv4USz6qIF3wULBRqkobp95pkXYC1cqFpo6WmlecguCAngu6L5oWpE3MtqOBbBxsZ30a1lnVRjoRRgpYqh7fYQsoLZsk46Y6GaXwF5T0Ow1BAx97BOizoL1SysI+6kbqmha+vPatMk6C5wp4S1QEJtKJlRLl9WTYGfJpcnFCB0o6sCd7Sv4LImh5Ah0fs9olRW3alpslBiGqPrNMVlT9aa4dwcaY+tY36XaeSiqc7owBeOrdA6oreSa9yFwREnL+trm6E9AgoSG6PqVcI3jNnZztsMdd2dUaL13hrTyb7BmYkxfcydGr7p4qE+211Kdon2RrJDNdGhNOpgnehwZSQ8SNBJTArYP/R/2P+us5gUkNu0iLCbV5+sfBvikGSxz0ytf2osXBugOkKz7zbo6KY09+6L7rQHxSA40hmLSBv6SbJy2dfOhXHb9US3XdfsENa6S3w6pEQZL7kzXMZHVzAzPlyFmfHxP8yMD6hiJuVHqKlxepPI6T1CjYj+Af7+dGpiAOSrAAAAAElFTkSuQmCC';
        // console.log(resumeObj.pic);
        $('#user_pic').attr('src', resumeObj.pic);
        if ( !resumeObj.collegeLogo )
            resumeObj.collegeLogo = 'img/24px.svg';
        $('.clg_picture img').attr('src', resumeObj.collegeLogo)
        $('[data-content="firstname"]').text(resumeObj.firstname);
        $('[data-content="lastname"]').text(resumeObj.lastname);
        if (resumeObj.jobFunctions.length) {
            $('input[data-content="jobfunctions"]').val(resumeObj.jobFunctions[0].jobFunctionName);
            $('input[data-content="jobfunctions"]').attr('data-item-id', resumeObj.jobFunctions[0]
                .categoryId);
        }
        $('[data-content="coverLetter"]').text(resumeObj.coverLetter);
        $('[data-content="userJobTitle"]').text(resumeObj.userJobTitle);
        $('[data-content="totalexperience"]').text(resumeObj.expDisplay);
        $('[data-content="location"]').text(resumeObj.location);
        $('[data-content="dob"]').val(resumeObj.date_of_birth);
        $('.gender .current').text(resumeObj.gender)
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
    }

    function bindUserExpData() {
        if (resumeObj.userExperienceResSet.length > 1) {
            for (let index = 1; index < resumeObj.userExperienceResSet.length; index++) {
                var $div = $('div[id^="proExp_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'proExp_' + num);
                $div.after($klon);
            }
        }
        $(resumeObj.userExperienceResSet).each(function (i, v) {
            var id = 'proExp_' + (i + 1);
            $('#' + id).find('input[data-content="exp_endDate"]').val(resumeObj
                .userExperienceResSet[i]
                .endDate);
            $('#' + id).find('input[data-content="exp_startDate"]').val(resumeObj
                .userExperienceResSet[i]
                .startDate);
            $('#' + id).find('span[data-content="exp_jobTitle"]').text(resumeObj
                .userExperienceResSet[i]
                .jobTitle);
            $('#' + id).find('span[data-content="exp_location"]').text(resumeObj
                .userExperienceResSet[i]
                .location);
            $('#' + id).find('span[data-content="exp_company"]').text(resumeObj
                .userExperienceResSet[i]
                .company);
            $('#' + id).find('p[data-content="exp_description"]').text(resumeObj
                .userExperienceResSet[i]
                .description);
        });
    }

    function bindUserEduData() {
        if (resumeObj.userEducationResSet.length > 1) {
            for (let index = 1; index < resumeObj.userEducationResSet.length; index++) {
                var $div = $('div[id^="education_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'education_' + num);
                $div.after($klon);
            }
        }
        $(resumeObj.userEducationResSet).each(function (i, v) {
            var id = 'education_' + (i + 1);
            $('#' + id).find('span[data-content="fieldOfStudy"]').text(resumeObj
                .userEducationResSet[i].fieldOfStudy);
            $('#' + id).find('span[data-content="edu_institution"]').text(resumeObj
                .userEducationResSet[i].institution);
            $('#' + id).find('span[data-content="edu_location"]').text(resumeObj
                .userEducationResSet[i].location);
            $('#' + id).find('input[data-content="edu_startDate"]').val(resumeObj
                .userEducationResSet[i].startDate);
            $('#' + id).find('input[data-content="edu_endDate"]').val(resumeObj
                .userEducationResSet[i].endDate);
            $('#' + id).find('p[data-content="edu_description"]').text(resumeObj
                .userEducationResSet[i].description);
            $('#' + id).find('input[data-content="degree_title"]').attr({
                'data-id': resumeObj.userEducationResSet[i].degree.degreeId,
                'data-shortTitle': resumeObj.userEducationResSet[i].degree.shortTitle
            }).val(resumeObj.userEducationResSet[i].degree.title);
            // $('#' + id).find('span[data-content="degree_title"]').attr('data-id', resumeObj.userEducationResSet[i].degree.degreeId);
            // $('#' + id).find('span[data-content="degree_title"]').attr('data-shorttitle', resumeObj.userEducationResSet[i].degree.shortTitle);
        });
    }

    function bindUserAcademicData() {
        if (resumeObj.userAcademicResSet.length > 1) {
            for (let index = 0; index < resumeObj.userAcademicResSet.length; index++) {
                var $div = $('div[id^="academic_projects_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'academic_projects_' + num);
                $div.after($klon);
            }
        }
        for (let i = 0; i < resumeObj.userAcademicResSet.length; i++) {
            const ap = resumeObj.userAcademicResSet[i];
            var id = 'academic_projects_' + (i + 1);
            console.log(id);
            $('#' + id).find('span[data-content="acd_role"]').text(ap.role);
            $('#' + id).find('span[data-content="acd_projectTitle"]').text(ap.projectTitle);
            $('#' + id).find('span[data-content="acd_institution"]').text(ap.institution);
            $('#' + id).find('span[data-content="acd_location"]').text(ap.location);
            $('#' + id).find('input[data-content="acd_startDate"]').val(ap.startDate);
            $('#' + id).find('input[data-content="acd_endDate"]').val(ap.endDate);
            $('#' + id).find('p[data-content="acd_description"]').text(ap.description);
        };
    }

    function bindUserSkillsData() {
        var minSkill = '75%';
        if (resumeObj.userSkillsSet.length > 5) {
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
        for (let i = 0; i < resumeObj.userSkillsSet.length; i++) {
            const v = resumeObj.userSkillsSet[i];
            var a = i + 1;
            // console.log(v, '#skills_item_' + a + ' .skills-bar .skill-value');
            $('#skills_item_' + a + ' .skills-bar .skill-value').attr('data-skill', v.percentage);
            $('#skills_item_' + a + ' .skills-bar .skill-value').text(v.percentage + '%');
            $('#skills_item_' + a + ' .skills-bar').attr('data-border', v.percentage);
            $('#skills_item_' + a + ' .skills-bar').attr('class', '').attr('class',
                'skills-bar color-blue at-' + v.percentage);
            $('#skills_item_' + a + ' .skill-input-value').val(v.title);
            $('#skills_item_' + a + ' .skill').attr('data-content', '').text(v.title);

        }

    }

    function bindLanguagesData() {
        if (resumeObj.userLngSet.length > 1) {
            for (let index = 1; index < resumeObj.userLngSet.length; index++) {
                var $div = $('li[id^="lang_"]:last');
                var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
                var $klon = $div.clone().prop('id', 'lang_' + num);
                $div.after($klon);
            }
        }
        for (let i = 0; i < resumeObj.userLngSet.length; i++) {
            // var id = $('#lang_' + i);
            const v = resumeObj.userLngSet[i];
            var a = i + 1;
            console.log(v);
            $('#lang_' + a + ' .rating-container').attr('data-langpercentage', v.percentage);
            $('#lang_' + a + ' [data-content="languageName"]').text(v.title);
            //data-langpercentage
            console.log(v.percentage);
            switch (v.percentage) {
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
    }
    // services
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
    var self = this;
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

    });
    $('.skills').on('keydown', function () {
        var fieldVal = $(this).val();
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
        $.ajax(skillsSettings).done(function (response) {
            // console.log(fieldVal, response)
            console.log("Skills", response);
            $(response.content).each(function (k, v) {
                skillsAll.push(response.content[k].skillName);
            });
            // var results = $.ui.autocomplete.filter(skillsAll, request.term);
            console.log("a");
            $(".skills").autocomplete({
                source: skillsAll,
                minLength: 0
            }).focus(function () {
                $(this).autocomplete("search", $(this).val());
            });
        });
    });

    function saveUserProfile(applicantData) {
        if (applicantData.education.length) {
            var educationValidArray = applicantData.education.filter(function (item, index) {
                return !item.institution || !item.location || !item.degree.title || !item
                    .fieldOfStudy || !item.endDate || !item.startDate;
            });
            console.log(educationValidArray);
            if (!!educationValidArray.length) {
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
            experienceValidArray = applicantData.experience.filter(function (item, index) {
                return !item.company || !item.endDate || !item.jobTitle || !item.location || !
                    item.startDate;
            });
            console.log(experienceValidArray);
            if (!!experienceValidArray.length) {
                // var errorMessage = "Please fill the all details in experience";
                // $('#newErrorMessageID .message-text').html(errorMessage)
                // $('#newErrorMessageID').fadeIn().delay(2000)
                //     .fadeOut('slow', function () {
                //         $('#saveResume').removeAttr('pointer-events');
                //     });
                // return false;
                applicantData.experience = [];
            } else {
                applicantData.experience = applicantData.experience.map(function (item, index) {
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
            academicValidArray = applicantData.academic.filter(function (item, index) {
                return !item.description || !item.endDate || !item.institution || !item
                    .location || !item.startDate || !item.projectTitle || !item.role;
            });
            console.log(academicValidArray);
            if (!!academicValidArray.length) {
                // var errorMessage = "Please fill the all details in academic project";
                // $('#newErrorMessageID .message-text').html(errorMessage)
                // $('#newErrorMessageID').fadeIn().delay(2000)
                //     .fadeOut('slow', function () {
                //         $('#saveResume').removeAttr('pointer-events');
                //     });
                // return false;
                applicantData.academic = [];
            } else {
                applicantData.academic = applicantData.academic.map(function (item, index) {
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
            academicValidArray = applicantData.skill.filter(function (item, index) {
                return !item.skillName || !item.skill_percentage;
            });
            console.log(academicValidArray);
            if (!!academicValidArray.length) {
                // var errorMessage = "Please fill the skills";
                // $('#newErrorMessageID .message-text').html(errorMessage)
                // $('#newErrorMessageID').fadeIn().delay(2000)
                //     .fadeOut('slow', function () {
                //         $('#saveResume').removeAttr('pointer-events');
                //     });
                // return false;
                applicantData.skill = [];
            } else {
                applicantData.skill = applicantData.skill.map(function (item, index) {
                    return {
                        skillName: item.skillName,
                        skill_percentage: item.skill_percentage
                    };
                });
            }
        }
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
        console.log("settings",settings.data);
        // downloadResume
        $.ajax(settings).done(function (response) {
            if (response.status == 'success') {
                $('#newSuccessMessageID .message-text').html(response.msg);
                $('.loading-container').fadeOut();
                $('#newSuccessMessageID').fadeIn().delay(2000)
                    .fadeOut('slow', function () {
                        $('#saveResume').removeAttr('pointer-events');
                    });
                localStorage.setItem('userData', JSON.stringify(response.data));

                var logoImg = $('input[data-content="picture"]').get(0).files[0];
                if (logoImg) {
                    saveUserPic();
                }
                savePdf();
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
        var shareName = localStorage.getItem('shareName');
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

    function savePdf() {
        $('.loading-container').show();
        if (planInfo) {
            var ele = $('#resume-body')[0];
            // console.log(ele)
            /* ele.css({'height': ''});
            ele.css({'max-height': ''});*/
            ele.style.boxShadow = "none";
            html2canvas(ele, {
                allowTaint: true,
                logging: true,
                useCORS: true,
                scale: 1
            }).then(function (canvas) {
                var doc = new jsPDF('p', 'cm', 'a4', true);
                const data = canvas.toDataURL(canvas, {
                    type: 'image/png',
                });
                console.log("Raw", data);
                var image = new Image();
                image.src = data;
                doc.addImage(image, 'PNG', -0.3, 0.5, 0, 0, '', 'SLOW');
                var pdfOut = doc.output('blob');
                console.log(pdfOut);
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
                    })
                // watermark resume
                var docWaterMark = new jsPDF('p', 'cm', 'a4', true);
                const dataWaterMark = canvas.toDataURL(canvas, {
                    type: 'image/png',
                })
                var waterMarkImage = new Image();
                waterMarkImage.src = dataWaterMark;
                docWaterMark = addWaterMark(docWaterMark);
                docWaterMark.addImage(waterMarkImage, 'PNG', -0.3, 0.5, 0, 0, '', 'SLOW');
                var pdfOutWaterMark = docWaterMark.output('blob');
                // console.log(pdfOutWaterMark);
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
                    })
                if (planInfo && planInfo[0].planId == 1) {
                    docWaterMark.save(userId + '_resume.pdf');
                } else {
                    doc.save(resumeObj.firstname + '_resume.pdf');
                }
                ele.style.boxShadow = "rgba(0, 0, 0, .2) 0.2rem 0.2rem 3rem 0.2rem";
                $('.loading-container').delay(2000).fadeOut();
            });
        } else {
            window.location.href = window.origin + '/pricing.html';
        }
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
            if (response.status == 'success') {
                // console.log(response.data.httpPath);
                localStorage.setItem('imageStore', response.data.httpPath);
                $('#profileMenu img').attr('src', response.data.httpPath);
                $('#profilePicEdit').attr('src', response.data.httpPath);
                $('#pimage-preview').attr('src', response.data.httpPath);
                $('#pimage-preview2').css('background', 'url(' + response.data.httpPath +
                    ') center center');
                $('#image-preview2').css('opacity', 0);


            }
        });
    }
    var imgData = './watermarkworkruit.png'
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
        change: function(event, ui) {
            // console.log(ui.value);
            var width = (ui.value * 0.8 + 100) / 100 * 21;
            $("page").css('min-width', width + "cm");
            $("page").css('max-width', width + "cm");
            $("page").css('margin', "auto");
        }
    });


});