const baseUrl = "https://stageapi.workruit.com";
const appUrl = "";
const baseApiUrl = "https://stageapi.workruit.com/api/";
const apiAdminUrl = "https://stageapi.workruit.com/admin";
const apiUrl = "https://stageapi.workruit.com/api";
const baseResumeApiUrl = "https://stageapi.workruit.com/resume/";
const appDate = new Date();
const authToken = "911ca088ab824095b82d3c98b32332e7";
const sessionId = sessionStorage.getItem('sessionId');
const userData = JSON.parse(sessionStorage.getItem('userData'));
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
        "getTxnHistory": "/getTxnHistory"
    }
};