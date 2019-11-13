$(function () {
    $('#load-header').load('../includes/user-header.html');
    const userPlanStatus = JSON.parse(localStorage.getItem('userPlanStatus'));
    $('.loading-container').delay(1000).fadeOut();
    var localUserData = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', atob(localStorage.getItem(btoa('sessionId_' + window.location.origin))))), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
    var planDetails = localUserData.planDetails;
    if (localUserData) {
        if (!planDetails.emailVerified) {
            $('.tabs-container').addClass('mt-5');
        }
        if ((planDetails.subscribedUser && planDetails.planId === 1) || !planDetails.paidUser) {
            $('.upgrade-panel').removeClass('d-none');
        }
        if (!planDetails.subscribedUser) {
            $('.no-orders-panel').removeClass('d-none');
        }
    }
    doGetWithEncrypt(baseResumeApiUrl + "user/" + localUserData.userId +
        "/getTxnHistory").then(response => {
        console.log(response);
        if (response.status == "success") {
            response.data.sort(function (a, b) {
                return b.userPlanId - a.userPlanId
            });
            orderTableRow(response.data);
            if (response.data.length) {
                $('.upgrade-table').removeClass('d-none');
            }
        } else {
            $("#order_history_table").remove();
            $("#txn-history").text(response.msg.description);
        }
    });
});

function orderTableRow(item) {
    console.log(item);
    item.map(item => {
        const orderRow = `<tr>
        <td>
            Order Id: ${item.orderId}
            <br>
            Order on : ${moment(item.createDate).format('DD MMM YYYY')}
        </td>
        <td>
            ${item.planId === 1 ? item.price = 'Free' : item.price = '&#8377; ' + item.price}
            <br>
            ${item.transactionStatus === 2 ? 'Status: Failed' : ''}
            ${item.promoCode ? 'Promo: ' + item.promoCode : ''}
        </td>
        <td>${item.transactionStatus !== 2 ? item.startDate : 'NA'}</td>
        <td data-content="expDate">${item.transactionStatus !== 2 ? moment(item.expDate).format("DD MMM YYYY"): 'NA'}</td>
        <td>${item.planId === 1 || item.transactionStatus === 2 ? 'NA' : '<a data-href="invoice.html">Invoice</a>'}</td>
    </tr>`;
        $('#order_history_template').append(orderRow);
    });

}