/* stageapi api's */
const baseUrl = "https://stageapi.workruit.com";
const appUrl = "";
const baseApiUrl = "https://stageapi.workruit.com/api/";
const apiAdminUrl = "https://stageapi.workruit.com/admin";
const apiUrl = "https://stageapi.workruit.com/api";
const baseResumeApiUrl = "https://stageapi.workruit.com/resume/";
/* dev api's
const baseUrl = "https://devapi.workruit.com";
const appUrl = "";
const baseApiUrl = "https://devapi.workruit.com/api/";
const apiAdminUrl = "https://devapi.workruit.com/admin";
const apiUrl = "https://devapi.workruit.com/api";
const baseResumeApiUrl = "https://devapi.workruit.com/resume/"; */
document.addEventListener('contextmenu', event => event.preventDefault());
$(document).keydown(function(e){
    if(e.which === 123){
       return false;
    }
});
const appDate = new Date();
const authToken = "94b51cc4-0c99-11e7-93ae-92361f002671";
const sessionId = localStorage.getItem('sessionId');
// const userData = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', localStorage.getItem('sessionId'))), localStorage.getItem('sessionId')));
const locationPaths = {
    homePage: "/app/dashboard/home.html"
}
const serviceUrls = {
    "post": {
        "loginResumeUser": "loginResumeUser",
        "signupResume": "signupResume",
        "resetPasswordLinkToEmailResume": "resetPasswordLinkToEmailResume",
        "updateShareName": "updateShareName",
        "updateResumeUserPassword": "updateResumeUserPassword",
        "resetPasswordResumeUser": "resetPasswordResumeUser",
        "uploadFile": "uploadFile",
        "updateProfileResume": "updateProfileResume"
    },
    "get": {
        "resUserLogout": "resUserLogout",
        "emailVerificationForResumeUser": "employeer/emailVerificationForResumeUser/"
    }
};
const resumeServiceUrls = {
    "post": {
        "priceCalculation": "/priceCalculation"
    },
    "get": {
        "getResumePlans": "getResumePlans",
        "getCollegesInfo": "getCollegesInfo",
        "getPaytmChecksum": "/getPaytmChecksum",
        "checkUserStatus": "/checkUserStatus",
        "getTxnHistory": "/getTxnHistory",
        "getOrderInfo": "/getOrderInfo",
        "resendEmail": "/resendEmail"
    }
};
const messages = {
    "emailVerified": "Please verify your email",
    "emailVerifiedAtCart": "Please verify your email, to continue this service.",
    "emailVerifiedMessageSent": "Mail sent successfully, please check you mail",
    "shareUrlLengthError": "Username should be between 6 to 20 characters.",
    "shareUrlFormatError": "Username contains only alphabets and numerics.",
    "shareUrlEditInfo": "Username can edit only once"
}
console.log = function () {};
alert = function () {};
prompt = function () {};