const userInfo = JSON.parse(localStorage.getItem('userData'));
if (userInfo) {
    if (userInfo.planDetails.subscribedUser) {
        $('#shareNavItem a').attr("data-toggle", "").attr('data-target', '').attr('href',
            location.origin + '/app/dashboard/share.html');
    } else {
        $('#shareNavItem a').attr("data-toggle", "modal").attr('data-target', '#upgrade');
    }
}
if (location.pathname == "/app/order/cart.html") {
    var priceCalculationObj = {
        "planInfo": JSON.parse(atob(window.location.search.split('?')[1])),
        "promoId": '',
        "user_planId": ""
    }
    if (priceCalculationObj.planInfo.planId === 4) {
        console.log('i am here before plane id;');
        console.log('i am here before frame;');
        $('.upgrade-btn').css('display', 'none');
        console.log('i am here after frame;');
    }
}
if (location.pathname === "/app/order/payment-status.html") {
    $('.upgrade-btn').addClass('d-none')
}
var userId = userData.userId;
//console.log(userData);
var fromPage = sessionStorage.getItem('fromPage');
//console.log("fromPage ::::::"+fromPage);
//if(fromPage == 'signin'){
debugger;
$('#userName').text(userInfo.firstname + " " + userInfo.lastname);
$('#UserEmail').text(userInfo.email);
if (userInfo.pic) {
    $('#profileMenu img').attr('src', userInfo.pic)
} else {
    $('#profileMenu img').attr('src', location.origin + '/assets/images/avatar.png');
}
// if (picpath > -1 || pic == '') {
//     $('#profileMenu img').attr('src', '../../assets/images/avatar.png');
//     $('#profilePicEdit').attr('src', '../../assets/images/avatar.png');

// } else {
//     $('#profileMenu img').attr('src', pic);
//     $('#profilePicEdit').attr('src', pic);
// }
$('body').click('#signOut', function () {
    doGetWithEncrypt(baseApiUrl + "user/" + userInfo.userId + "/" + sessionStorage.getItem("sessionId") +
        "/" +
        serviceUrls.get.resUserLogout).then(response => {
        sessionStorage.clear();
        window.location.href = window.origin + '/app/auth/login.html';
    })
});