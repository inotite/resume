var priceCalculationObj = {
    "planInfo": JSON.parse(atob(window.location.search.split('?')[1])),
    "promoId": '',
    "user_planId": ""
}
var priceInfoData = false;

$(window).ready(function () {
    $('#load-header').load('../includes/user-header.html');
    console.log("priceCalculationObj>>>>>", priceCalculationObj, priceCalculationObj.planInfo.planId == 1);
    var userInfo = JSON.parse(sessionStorage.getItem("userData"));
    if (userInfo.planDetails.emailVerified) {
        $('.status').css('display', 'flex');
        axios.defaults.headers.common['Token'] = sessionStorage.getItem('sessionId');
        var userData = JSON.parse(sessionStorage.getItem("userData"));
        // Price Calculation
        var priceCalculationUrl = baseResumeApiUrl + "user/" + userData.userId + resumeServiceUrls.post.priceCalculation;
        priceCalculationObj.planId = priceCalculationObj.planInfo.planId;
        console.log(priceCalculationObj);
        axios.post(priceCalculationUrl, priceCalculationObj)
            .then(function (response) {
                console.log(response);
                console.log(response.data.data);
                if (response) {
                    $('.loading-container').delay(1000).fadeOut();
                }
                if (priceCalculationObj.planInfo.planId === 1 && response.data.status == "failed") {
                    $('.error-description').html(response.data.msg.description);
                    $('.error-box').removeClass('d-none');
                    $('.error-upgrade-link').removeClass('d-none');
                    $('#price-action-modal').modal({
                        show: true,
                        // keyboard:false,
                        // backdrop:'static'
                    });
                } else {
                    if (priceCalculationObj.planInfo.planId === 1) {
                        $('.promo-add-link').addClass('d-none').removeClass('d-flex');
                    }
                    document.getElementById('finalPrice').innerText = response.data.priceInfo.NetAmount;
                    document.getElementById('GSTPercentage').innerText = response.data.priceInfo
                        .GSTPercentage;
                    document.getElementById('taxFees').innerText = response.data.priceInfo.GSTMoney;
                    document.getElementById('timePeriod').innerText = priceCalculationObj.planInfo
                        .timePeriod;
                    document.getElementById('netprice').innerText = response.data.priceInfo.finalPrice;
                    document.getElementById('planTitle').innerText = response.data.priceInfo.PlanTitle;
                    document.getElementById('subtotal').innerText = response.data.priceInfo.NetAmount;
                    document.getElementById('totalprice').innerText = response.data.priceInfo
                        .finalPrice;
                    priceCalculationObj.user_planId = response.data.priceInfo.user_planId
                    var priceInfoData = true;
                    $('.price-summary-box').removeClass('d-none');
                    // $("#finalPrice").text().replace(response.data.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        $("#proceed_btn").on('click', function () {
            console.log("proceed");
            if (priceCalculationObj.planInfo.planId !== 1) {
                // Paytm Checksum
                var checkSumUrl = baseResumeApiUrl + "user/" + userData.userId +
                    "/plan/" +
                    priceCalculationObj
                    .user_planId + resumeServiceUrls.get.getPaytmChecksum;
                console.log(checkSumUrl);
                axios.get(checkSumUrl)
                    .then(function (response) {
                        // handle success
                        console.log(response);
                        var paytmInfo = jQuery('<div> ' + response.data.redirectUrl +
                            '</div>');
                        // console.log(paytmInfo);
                        // alert(response.data.redirectUrl);
                        // sessionStorage.setItem('orderId', paytmInfo.find(
                        //         "input[name=ORDER_ID]")
                        //     .val());
                        // sessionStorage.setItem('CHECKSUMHASH', paytmInfo.find(
                        //     "input[name=CHECKSUMHASH]").val());
                        // console.log(response.data);
                        $('.price-summary-box').addClass('d-none');
                        $('#paytm-checkout').html(response.data.redirectUrl)

                        // url = "./paytm.html";
                        // window.location = url
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
            } else {
                var dashboardPath = origin === 'http://devresume.workruit.com' ? origin +
                    '/app/dashboard/home.html' :
                    origin + '/app/dashboard/home.html';

                window.location.replace(dashboardPath);
            }

        });
        $('#promoCodeModal').on('hidden.bs.modal', function (e) {
            document.getElementById("promo-validation").innerText = ""
        })
        $('.applyPromo').click(function () {
            priceCalculationObj.promocode = $('#PromoCode').val();
            if (priceCalculationObj.promocode) {
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": priceCalculationUrl,
                    "method": "POST",
                    "headers": {
                        "token": sessionStorage.getItem('sessionId'),
                        "content-type": "application/json"
                    },
                    "processData": false,
                    "data": JSON.stringify(priceCalculationObj)
                }
                $.ajax(settings).done(function (response) {
                    if (response.status === "success") {
                        console.log(response.priceInfo.PromocodePrice);
                        $('#promoCodeModal').modal('hide');
                        document.getElementById('PromoCode').value = '';
                        document.getElementById('totalprice').innerText = response
                            .priceInfo
                            .finalPrice;
                        document.getElementById('promo-price').innerText = '- ₹ ' +
                            response
                            .priceInfo.PromocodePrice
                    } else {
                        document.getElementById("promo-validation").innerText = response
                            .msg
                            .description;
                        $('.close').on('click', function () {
                            // do something…
                            document.getElementById('PromoCode').value = '';
                            document.getElementById("promo-validation")
                                .innerText =
                                "";
                        })
                    }
                    console.log(response);
                });
            } else {
                document.getElementById("promo-validation").innerText =
                    'Please Enter Promo code';
            };
        })
    } else {
        $('.loading-container').delay(1000).fadeOut();
        $('.error-description').html(messages.emailVerifiedAtCart);
        $('.error-box').removeClass('d-none');
        $('.error-resend-link').removeClass('d-none');
        $('.error-resend-link').click(function () {
            alert("hello");
            $('.error-description').html(messages.emailVerifiedAtCart);
            $('.error-email').text(userInfo.email);
        });
    }
});