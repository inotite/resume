var shareSourceUrl = "https://dev.workruit.com/#";
$('#load-header').load('../includes/user-header.html');

var origin = window.location.origin;
var sourceUrl = 'https://dev.workruit.com/#';
// var sharePath = origin + '/#';
$(function () {
    $('.account-page').paraCount();
    $("#shareDomain").attr('value', sourceUrl)
});
var userShareInfo = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', atob(localStorage.getItem(btoa('sessionId_' + window.location.origin))))), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
if (userShareInfo.edit_name) {
    $('.edit_name').addClass('d-none');
    $('#shareDomain2').val(sourceUrl + userShareInfo.share_name);
    $('.edit_name_link').removeClass('d-none');
}
$('#resume_piblic').attr('checked', userShareInfo.hideResume);
if (userShareInfo.planDetails.subscribedUser && userShareInfo.planDetails.validUser) {
    $('#shareName').removeAttr('disabled');
    $('#shareNameBtn').removeAttr('disabled');
} else if (!userShareInfo.planDetails.validUser && !!userShareInfo.planDetails.subscribedUser) {
    $('#shareName').attr('disabled', 'true');
    $('#shareNameBtn').attr('disabled', 'true');
}
// var resume_piblic = $('input[type=checkbox]').prop('checked');
// console.log(resume_piblic);
$('.loading-container').delay(1000).fadeOut();
$('#resume_piblic').change(function () {
    var profileData = {
        "firstname": localUserData.firstname,
        "lastname": localUserData.lastname,
        "email": localUserData.email,
        "hideResume": this.checked
    };
    // profileData.hideResume = this.checked
    doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume, profileData).then(response => {
        //console.log(response);
        if (response.status == "success") {
            // localStorage.setItem('localUserData', JSON.stringify(response.data));
            var statusMessage = response.data.hideResume == true ? "Now your resume is in private mode" : "Now your resume is in public mode";
            $('#newSuccessMessageID .message-text').html(statusMessage);
            $('#newSuccessMessageID').html(statusMessage)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        }
    })
})
$('#shareNameBtn').on('click', function () {

    let shareName = $('input[name="shareName"]').val();
    if (shareName !== localUserData.share_name) {
        console.log(shareName, shareName.length, "shareName");
        if (alphanumeric(shareName)) {
            if (shareName.length >= 6 && shareName.length <= 20) {
                swal({
                        title: "Are you sure?",
                        text: messages.shareUrlEditInfo,
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                    .then((willDelete) => {
                        if (willDelete) {
                            var shareData = {
                                "username": localUserData.email,
                                "sharename": shareName
                            }
                            doPostWithEncrypt(baseApiUrl + serviceUrls.post.updateShareName, shareData).then(response => {
                                if (response.msg.title == "Success") {
                                    localStorage.setItem(btoa('shareName_' + location.origin), encrypt(JSON.stringify(shareData.sharename), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
                                    getUserProfile();
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
                                $('input[name="shareName"]').val(JSON.parse(decrypt(localStorage.getItem(btoa('shareName_' + location.origin)), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin))))));
                            })
                        }

                    });
            } else {
                // var errorMessage = shareUrlLengthError;
                $('#newErrorMessageID .message-text').html(messages.shareUrlLengthError)
                $('#newErrorMessageID').html(messages.shareUrlLengthError)
                    .fadeIn()
                    .delay(5000)
                    .fadeOut();
            }
        } else {
            // var errorMessage = shareUrlLengthError;
            $('#newErrorMessageID .message-text').html(messages.shareUrlFormatError)
            $('#newErrorMessageID').html(messages.shareUrlFormatError)
                .fadeIn()
                .delay(5000)
                .fadeOut();
        }
    }
});

$('#copyLinkBtn').on('click', function () {
    var shareNameText = JSON.parse(decrypt(localStorage.getItem(btoa('shareName_' + location.origin)), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
    // console.log("$('#shareName').val()", $('#shareName').val());
    if ($('#shareName').val()) {
        if (localUserData.edit_name) {
            $('#copyText2').attr('value', shareSourceUrl + shareNameText);
            var copyText = document.getElementById("copyText2");
            // console.log('copyText', copyText, shareSourceUrl + localUserData.share_name);
            copyText.select();
            // console.log(copyText.select());
            document.execCommand("copy");
        } else {
            console.log($('#shareDomain').val() + shareNameText);
            $('#copyText').val($('#shareDomain').val() + shareNameText);
            var copyText = document.getElementById("copyText");
            copyText.select();
            // console.log('copyText.select()', copyText.select());
            document.execCommand("copy");
        }
        var successMessage = 'Your link is copied successfully';
        $('#newSuccessMessageID .message-text').html(successMessage)
        $('#newSuccessMessageID').html(successMessage)
            .fadeIn()
            .delay(5000)
            .fadeOut();
    } else if (!$('#shareName').val() && localUserData.edit_name) {
        if (localUserData.edit_name) {
            $('#copyText2').val(shareSourceUrl + shareNameText);
            var copyText = document.getElementById("copyText2");
            copyText.select();
            // console.log(copyText.select());
            document.execCommand("copy");
        }
        var successMessage = 'Your link is copied successfully';
        $('#newSuccessMessageID .message-text').html(successMessage)
        $('#newSuccessMessageID').html(successMessage)
            .fadeIn()
            .delay(5000)
            .fadeOut();
    } else {
        var errorMessage = 'Please enter valid share url and save';
        $('#newErrorMessageID .message-text').html(errorMessage)
        $('#newErrorMessageID').html(errorMessage)
            .fadeIn()
            .delay(5000)
            .fadeOut();
    }
    //alert("Copied the text: " + copyText.value);
});