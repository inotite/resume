$('#changePassword2').on('click', function () {
    var UrlUserId = location.href.split('app/auth/updatePassword.html?')[1];
    console.log(UrlUserId);
    let newPassword = $('input[name="newPassword"]').val();
    let reenterNewPassword = $('input[name="reenterNewPassword"]').val();
    let newPasswordObj = {
        "newPassword": newPassword,
        "reenterNewPassword": reenterNewPassword
    };
    doPostWithEncrypt(baseApiUrl + "/user/" + UrlUserId + "/" + serviceUrls.post.resetPasswordResumeUser,
        newPasswordObj).then(response => {
        console.log(response);
        if (response.status == "success") {
            $('#newSuccessMessageID .message-text').html(response.msg.description);
            $('#newSuccessMessageID').html(response.msg.description)
                .fadeIn()
                .delay(5000)
                .fadeOut();
            $('#signupbox').addClass('d-none');
        } else {
            $('#newErrorMessageID .message-text').html(response.msg.description)
            $('#newErrorMessageID').html(response.msg.description)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        }
        $('.responce_message').removeClass('d-none');
        $('.responce-message').text(response.msg.description);
    });
});