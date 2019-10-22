$('.loading-container').delay(1000).fadeOut();
const url_string = window.location.href;
const url = new URL(url_string);
const paramUserId = url.searchParams.get("userId") ? JSON.parse(url.searchParams.get("userId")) : null;
const orderId = url.searchParams.get("orderid") ? JSON.parse(url.searchParams.get("orderid")) : null;
console.log("paramUserId, orderId", paramUserId, orderId);
$(window).ready(function () {
    $('#load-header').load('../includes/user-header.html');
    if (!paramUserId || !orderId) {
        if (sessionId) {
            window.location.href = location.origin + '/app/dashboard/home.html';
        } else {
            window.location.href = location.origin;
        }
    }
    $('.loading-container').delay(1000).fadeOut();
    axios.defaults.headers.common['Token'] = sessionStorage.getItem('sessionId');
    // Price Calculation
    var getOrderInfoUrl = baseResumeApiUrl + "user/" + paramUserId + "/order/" + orderId + resumeServiceUrls.get.getOrderInfo;
    axios.get(getOrderInfoUrl)
        .then(function (response) {
            console.log(response);
            console.log(response.data.data);
            $('.paymentUserName').text(response.data.data.userName);
            $('.info_message_status_text').text(response.data.msg.title);
            switch (response.data.status) {
                case "success":
                    $('.info_message_status_text').addClass('text-success');
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": apiUrl + "/user/" + userData.userId + "/getProfileResume",
                        "type": "GET",
                        "headers": {
                            "token": sessionId,
                            "content-type": "application/json"
                        },
                        "processData": false,
                        // "data": JSON.stringify(userData),
                        error: function (e) {
                            console.log(e);
                        },
                        // dataType: "json",
                        contentType: "application/json"
                    };
                    // downloadResume
                    $.ajax(settings).done(function (response) {
                        sessionStorage.setItem('userData', JSON.stringify(response.data));
                        setInfoMessage(userInfo.planDetails.msg.description);
                        // console.log(window.location.href);
                        // window.location.reload();
                    });
                    break;
                case "failed":
                    $('.info_message_status_text').addClass('text-danger');
                    break;
                case "pending":
                    $('.info_message_status_text').addClass('text-warning');
                    break;
                default:
                    break;
            }
            $('.info_message_text').text(response.data.msg.description);
        })
        .catch(function (error) {
            console.log(error);
        });
})