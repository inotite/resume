$(function () {
    $('#load-header').load('../includes/user-header.html');
    $('.account-page').paraCount();
    $(window).ready(function () {
        JSON.parse(sessionStorage.getItem('userData')).email_verified === 0 ? $(
            '#newSuccessMessageID').css(
            'display',
            'none') : $('.preview_btn').css('display', 'block');
        // console.log(sessionStorage.getItem('isPremiumUser'));
    })
    // console.log(sessionStorage.getItem('previewData')) newSuccessMessageID
    const userPlanStatus = JSON.parse(sessionStorage.getItem('userPlanStatus'));
    sessionStorage.getItem('previewData') === null ? $('.preview_btn').css('display', 'none') : $(
            '.preview_btn')
        .css('display', 'inline-block')
    $('.loading-container').delay(1000).fadeOut();

});

$(function () {
    $('.account-page').paraCount();
});
var planDetails = JSON.parse(sessionStorage.getItem('userData')).planDetails;
if (sessionStorage.getItem('userData')) {
    if (!planDetails.emailVerified) {
        $('.tabs-container').addClass('mt-5');
    }
    if ((planDetails.subscribedUser && planDetails.planId === 1) || !planDetails.paidUser) {
        $('.upgrade-panel').removeClass('d-none');
    }
}
// const userPlanInfo = JSON.parse(sessionStorage.getItem('userPlanStatus'));
var settings = {
    "async": true,
    "crossDomain": true,
    "url": baseResumeApiUrl + "user/" + JSON.parse(sessionStorage.getItem('userData')).userId +
        "/getTxnHistory",
    "method": "GET",
    "headers": {
        "token": "911ca088ab824095b82d3c98b32332e7",
        "content-type": "application/json"
    },
    "processData": false,
    // "data": JSON.stringify(signupData)
}
$.ajax(settings).done(function (response) {
    console.log(response);
    if (response.status == "success") {
        response.data.sort(function (a, b) {
            return b.userPlanId - a.userPlanId
        });
        response.data.map(item => {
            // item.createDate = moment(item.createDate).format("DD MMM YYYY");
            // item.startDate = moment(item.startDate).format("DD MMM YYYY");
            item.expDate = moment(item.expDate).format("DD MMM YYYY");
            item.invoiceLink = "invoice.html";
            item.planId === 1 ? item.price = 'Free' : item.price = '&#8377; ' + item.price;
            item.promoCode = item.promoCode ? 'Promo: ' + item.promoCode : ''
        });
        $('#order_history_template').loadTemplate(
            //Specify the template container (or file name of external template)
            $('.data-history-template'),
            response.data, {
                append: true,
                elemPerPage: 20
            }
            // console.log(response.resumeplans[index]),
            //Specify the data to render
            // response.resumeplans[index]
        );
        if (response.data.length) {
            $('.upgrade-table').removeClass('d-none');
        }
    } else {
        $("#order_history_table").remove();
        $("#txn-history").text(response.msg.description);
    }
});