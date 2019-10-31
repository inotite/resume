/* Email Verification functionality */
var parameters = window.location.search.split('/');
var emailVerificationId = parameters[0].substring(1);
var companyName = 'workruit';
var userId = parameters[2];
console.log(emailVerificationId, companyName, userId)
doGetWithAuthKey(baseUrl + '/' + serviceUrls.get.emailVerificationForResumeUser +
    emailVerificationId +
    "/" + companyName + '/123', ).then(response => {
    if (response.status == "success") {
        // localStorage.clear();
        $('.success-email').removeClass('d-none');
        if (sessionId) {
            window.location.href = location.origin + '/app/dashboard/home.html';
        } else {
            window.location.href = location.origin + '/app/auth/index.html';
        }
    } else {
        $('.failed-email').removeClass('d-none');
        $('.failed-email h1').text(response.msg.description);
    }
})
$('.resendEmail').click(function () {
    doGetWithOutAuth(baseResumeApiUrl + 'user/' + userId + resumeServiceUrls.get.resendEmail).then(response => {
        console.log(response, 'response');
        $('.failed-email').removeClass('d-none');
        $('.failed-email h1').text(response.msg.description);
        $('.resendEmail').addClass('d-none');
    })
});