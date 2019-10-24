$('.loading-container').delay(1000).fadeOut();
const url_string = window.location.href;
const url = new URL(url_string);
const paramUserId = url.searchParams.get("userId") ? JSON.parse(url.searchParams.get("userId")) : null;
const orderId = url.searchParams.get("orderId") ? JSON.parse(url.searchParams.get("orderId")) : null;
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
    axios.defaults.headers.common['Token'] = localStorage.getItem('sessionId');
    // Price Calculation
    var getOrderInfoUrl = baseResumeApiUrl + "user/" + paramUserId + "/order/" + orderId + resumeServiceUrls.get.getOrderInfo;
    doGetWithEncrypt(getOrderInfoUrl).then(function (response) {
            console.log(response);
            $('.paymentUserName').text(response.data.userName);
            $('.info_message_status_text').text(response.msg.title);
            // $('.info_message_text').text(response.msg.description);
            $('#order_id span').text(orderId);
            $('#txn_amount span').text(response.msg.description.split('amount')[1].split(':')[1]);
            switch (response.status) {
                case "success":
                    $('.info_message_status_text').addClass('text-success');
                    $('.status_message').text('Congratulations,');
                    $('.check_order').text('You may check "Order History" to view more details.');
                    doGetWithEncrypt(apiUrl + "/user/" + paramUserId + "/getProfileResume").then(response => {
                        localStorage.setItem('userData', JSON.stringify(response.data));
                        setInfoMessage(userInfo.planDetails.msg.description);
                    });
                    break;
                case "failed":
                    $('.info_message_status_text').addClass('text-danger');
                    $('.paymentUserName').addClass('d-none');
                    $('.status_message').text('Oops, Try Again,');
                    break;
                case "pending":
                    $('.info_message_status_text').addClass('text-warning');
                    $('.status_message').text('Opps,');
                    break;
                default:
                    break;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

})