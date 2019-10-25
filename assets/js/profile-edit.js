/* Update Password functionality */
$('#updateProfile').on('click', function () {

    var firstname = $.trim($('input[name="firstname"]').val());
    var lastname = $.trim($('input[name="lastname"]').val());
    var collegeName = $('#collageName').val() ? JSON.parse(atob($('#collageName').val())).collegeName : '';
    var collegeLogo = $('#collageName').val() ? JSON.parse(atob($('#collageName').val())).collegeLogo : '';
    // var clgName = 
    var email = userData.email;

    $('.invalid-feedback').remove();

    var validate = true;
    if ($.trim(firstname).length <= 0) {
        validate = false;
        $('<div class="invalid-feedback">First Name is required.</div>').insertAfter('input[name="firstname"]');
    } else {
        if ($.trim(firstname).length < 3) {
            validate = false;
            $('<div class="invalid-feedback">Minimum 3 characters are required.</div>').insertAfter('input[name="firstname"]');
        }
    }

    if ($.trim(lastname).length <= 0) {
        validate = false;
        $('<div class="invalid-feedback">Last Name is required.</div>').insertAfter('input[name="lastname"]');
    } else {
        if ($.trim(lastname).length < 3) {
            validate = false;
            $('<div class="invalid-feedback">Minimum 3 characters are required.</div>').insertAfter('input[name="lastname"]');
        }
    }
    if (validate) {
        console.log(collegeName, collegeLogo);
        $('#updateProfile').attr('disabled', true);
        var profileData = {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "collegeName": collegeName,
            "collegeLogo": collegeLogo
        }
        debugger;
        doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume, profileData).then(response => {
            console.log(response);
            if (response.status == "success") {
                localStorage.setItem('userData', JSON.stringify(response.data));
                $('input[name="firstname"]').val(response.data.firstname);
                $('input[name="lastname"]').val(response.data.lastname);
                $('#newSuccessMessageID .message-text').html(response.msg);
                $('#newSuccessMessageID').fadeIn().delay(5000).fadeOut('slow', function () {
                    $('#updateProfile').attr('disabled', false);
                });

            } else {
                $('#newErrorMessageID .message-text').html(response.msg)
                $('#newErrorMessageID').fadeIn().delay(5000).fadeOut('slow', function () {
                    $('#updateProfile').attr('disabled', false);
                });
            }
        })
    }
});
/* Update Password functionality */
$('#updatePassBtn').on('click', function () {

    let oldPassword = $('input[name="oldPassword"]').val();
    let newPassword = $('input[name="newPassword"]').val();
    let reenterNewPassword = $('input[name="reenterNewPassword"]').val();

    let userData = {
        "oldPassword": oldPassword,
        "newPassword": newPassword,
        "reenterNewPassword": reenterNewPassword
    }
    doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateResumeUserPassword, userData).then(response => {
        console.log(response);
        if (response.status == "success") {
            $('#newSuccessMessageID .message-text').html(response.msg.description);
            $('#newSuccessMessageID').html(response.msg.description)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        } else {
            $('#newErrorMessageID .message-text').html(response.msg.description)
            $('#newErrorMessageID').html(response.msg.description)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        }
    })
});
$('#updateProfile2').on('click', function () {
    var collegeName = $('#collageName').val() ? JSON.parse(atob($('#collageName').val())).collegeName : '';
    var collegeLogo = $('#collageName').val() ? JSON.parse(atob($('#collageName').val())).collegeLogo : '';
    // var clgName = 
    console.log(collegeName, collegeLogo);
    var profileData = {
        "firstname": userData.firstname,
        "lastname": userData.lastname,
        "email": userData.email,
        "collegeName": collegeName,
        "collegeLogo": collegeLogo
    }
    doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume, profileData).then(response => {
        console.log(response);
        if (response.status == "success") {
            localStorage.setItem('userData', JSON.stringify(response.data));
            $('#newSuccessMessageID .message-text').html(response.msg);
            $('#newSuccessMessageID').fadeIn().delay(5000).fadeOut('slow', function () {
                $('#updateProfile').attr('disabled', false);
            });

        } else {
            $('#newErrorMessageID .message-text').html(response.msg)
            $('#newErrorMessageID').fadeIn().delay(5000).fadeOut('slow', function () {
                $('#updateProfile').attr('disabled', false);
            });
        }
    })
});