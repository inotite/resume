var priceCalculationObj = {
    "planInfo": JSON.parse(atob(window.location.search.split('?')[1])),
    "promoId": '',
    "user_planId": ""
}
var priceInfoData = false;

$(window).ready(function () {
    $('#load-header').load('../includes/user-header.html');
    console.log("priceCalculationObj>>>>>", priceCalculationObj, priceCalculationObj.planInfo.planId == 1);
    var userData = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', atob(localStorage.getItem(btoa('sessionId_' + window.location.origin))))), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
    // Price Calculation
    var priceCalculationUrl = baseResumeApiUrl + "user/" + userData.userId + resumeServiceUrls.post.priceCalculation;
    priceCalculationObj.planId = priceCalculationObj.planInfo.planId;
    console.log(priceCalculationObj);
    if ((userData.planDetails.emailVerified && priceCalculationObj) && priceCalculationObj.planInfo.planId != 1) {
        $('.status').css('display', 'flex');
        doPostWithEncrypt(priceCalculationUrl, priceCalculationObj).then(response => {
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
                const priceCalculationPriceInfo = response.priceInfo
                document.getElementById('finalPrice').innerText = priceCalculationPriceInfo.NetAmount;
                document.getElementById('GSTPercentage').innerText = priceCalculationPriceInfo
                    .GSTPercentage;
                document.getElementById('taxFees').innerText = priceCalculationPriceInfo.GSTMoney;
                document.getElementById('timePeriod').innerText = priceCalculationObj.planInfo.timePeriod;
                document.getElementById('netprice').innerText = priceCalculationPriceInfo.finalPrice;
                document.getElementById('planTitle').innerText = priceCalculationPriceInfo.PlanTitle;
                document.getElementById('subtotal').innerText = priceCalculationPriceInfo.NetAmount;
                document.getElementById('totalprice').innerText = priceCalculationPriceInfo.finalPrice;
                priceCalculationObj.user_planId = priceCalculationPriceInfo.user_planId;
                var priceInfoData = true;
                $('.price-summary-box').removeClass('d-none');
                // $("#finalPrice").text().replace(response.data.data);
            }
        });
    } else if (priceCalculationObj, priceCalculationObj.planInfo.planId == 1) {
        document.getElementById('finalPrice').innerText = "0.00";
        document.getElementById('GSTPercentage').innerText = "0.00";
        document.getElementById('taxFees').innerText = "0.00";
        document.getElementById('timePeriod').innerText = "7 days";
        document.getElementById('netprice').innerText = "Free";
        document.getElementById('planTitle').innerText = "0.00";
        document.getElementById('subtotal').innerText = "0.00";
        document.getElementById('totalprice').innerText = "0.00";
        $('.loading-container').delay(1000).fadeOut();
        $('.price-summary-box').removeClass('d-none');
        $('.promo-add-link').remove();
    } else {
        $('.loading-container').delay(1000).fadeOut();
        $('.error-description').html(messages.emailVerifiedAtCart);
        $('.error-box').removeClass('d-none');
        $('.error-resend-link').removeClass('d-none');
        $('.error-resend-link').click(function () {
            alert("hello");
            $('.error-description').html(messages.emailVerifiedAtCart);
            $('.error-email').text(userData.email);
        });
    }
    $("#proceed_btn").on('click', function (e) {
        e.preventDefault();
        console.log("proceed", priceCalculationObj);
        if (priceCalculationObj.planInfo.planId !== 1) {
            // Paytm Checksum
            var checkSumUrl = baseResumeApiUrl + "user/" + userData.userId +
                "/plan/" +
                priceCalculationObj
                .user_planId + resumeServiceUrls.get.getPaytmChecksum;
            console.log(checkSumUrl);
            doGetWithEncrypt(checkSumUrl).then(function (response) {
                // handle success
                console.log(response);
                $('.price-summary-box').addClass('d-none');
                $('#paytm-checkout').html(response.redirectUrl)

                // url = "./paytm.html";
                // window.location = url
            });
        } else if (priceCalculationObj.planInfo.planId === 1) {
            priceCalculationObj.planId = priceCalculationObj.planInfo.planId;
            doPostWithEncrypt(priceCalculationUrl, priceCalculationObj).then(response => {
                console.log(response);
                if (response) {
                    $('.loading-container').delay(1000).fadeOut();
                    var dashboardPath = origin === 'http://devresume.workruit.com' ? origin +
                        '/app/dashboard/home.html' :
                        origin + '/app/dashboard/home.html';

                    window.location.replace(dashboardPath);
                }
            });
        } else {
            return false;
        }

    });
    $('#promoCodeModal').on('hidden.bs.modal', function (e) {
        document.getElementById("promo-validation").innerText = ""
    })
    $('.applyPromo').click(function (e) {
        e.preventDefault();
        priceCalculationObj.promocode = $('#PromoCode').val();
        if (priceCalculationObj.promocode) {
            priceCalculationObj.planId = priceCalculationObj.planInfo.planId;
            doPostWithEncrypt(priceCalculationUrl, priceCalculationObj).then(response => {
                if (response.status === "success") {
                    console.log(response);
                    $('#promoCodeModal').modal('hide');
                    const applyPromoPriceInfo = response.priceInfo;
                    document.getElementById('PromoCode').value = '';
                    document.getElementById('totalprice').innerText = applyPromoPriceInfo
                        .finalPrice;
                    document.getElementById('promo-price').innerText = '- ₹ ' +
                        applyPromoPriceInfo.PromocodePrice;
                    priceCalculationObj.user_planId = applyPromoPriceInfo.user_planId;
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
});