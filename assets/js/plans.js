if (localStorage.getItem('userData')) {
    $('#load-auth-header').load('app/includes/user-auth-header.html');
    $(".auth-header").removeClass('d-none');
    $(".header").addClass('d-none');
}
$("body").on("click", ".dismiss-pricing-modal", function () {
    if (window.parent) {
        window.parent.postMessage({
            type: "CLOSE__MODAL"
        });
    }
});
if (!localStorage.getItem('plans')) {
    getResumePlans();
} else {
    PricingTemplate(JSON.parse(atob(localStorage.getItem('plans'))));
}
var userPlansInfo = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).planDetails : null;

function getResumePlans() {
    doGetWithEncrypt(baseResumeApiUrl + resumeServiceUrls.get.getResumePlans).then(response => {
        response.map((item, index) => {
            var pId = btoa(JSON.stringify(item));
            item.price = item.price == 0 ? 'Free' : '&#8377; ' + item.price;
            var redirectAction = location.origin + '/app/order/cart.html?' + pId;
            item.redirectUrl = localStorage.getItem('userData') ?
                redirectAction :
                location.origin + '/app/auth/login.html';
        });
        localStorage.setItem('plans', btoa(JSON.stringify(response)));
        PricingTemplate(response);
        // console.log(response);
        // $('.pricing_template').append(pricing_template);
        // console.log("pricing_template", pricing_template);
    })
}
$("body").on("click", ".price-action-modal", function (e) {
    console.log("clickced ds");
    $('body .modal-backdrop.fade.in').css("opacity", '0');
    $('#price-action-modal').modal('show');
    $('#pricing-modal').css('z-index', '2999');
});
$("body").on("click", ".price-action-verify-modal", function (e) {
    console.log("clickced ds");
    $('body .modal-backdrop.fade.in').css("opacity", '0');
    $('#price-action-verify-modal').modal('show');
    $('#pricing-modal').css('z-index', '2999');
});
$('.close-free-plan-modal').click(function () {
    $('body .modal-backdrop.fade.in').css('opacity', '1');
    $('#price-action-modal').modal('hide');
    $('#price-action-verify-modal').modal('hide');
    // $('body .modal-backdrop.fade.in').remove();
    // $("body").append('<div class="modal-backdrop fade in"></div>');
    $('#pricing-modal').css({
        'z-index': '4000',
        "opacity": 1,
        "overflow-x": "hidden",
        "overflow-y": "auto"
    });

});

function PricingTemplate(item) {
    console.log(item);
    item.map((item, index) => {
        var pricing_template_view = `
    <div class="has-3 p1 col-md-3 pricing"><div class="highlight plan">
        <div class="detail plan-1">
            <h4><span class="amount">  ${item.price}   </span></h4>
            <h3>
                <span class="title" style="color: #6a6a6a; font-display: normal"> ${item.timePeriod}
                    </span>
                <span class="interval" style="color: #337ab7" data-content="planTitle"> ${item.planTitle} </span>
            </h3>
        </div>
        <div class="features">
            <ul>
                <li class="item-row">
                    <span class="item-mobile">
                        <img src="${location.origin + '/assets/images/app/icons/like-green.svg'}" style="margin-right: 10px;"> <span>${item.description.template} </span>
                    </span>
                </li>
                <li class="item-row">
                    <span class="item-mobile">
                    <img src="${location.origin + '/assets/images/app/icons/like-green.svg'}" style="margin-right: 10px;"> <span data-content="description.download">${item.description.download}</span>
                    </span>
                </li>
                <li class="item-row">
                    <span class="item-mobile">
                        <img src="${location.origin + '/assets/images/app/icons/like-green.svg'}" style="margin-right: 10px;"> <span data-content="description.branding">${item.description.branding}</span>
                    </span>
                </li>
                <li class="item-row">
                    <span class="item-mobile">
                        <img src="${location.origin + '/assets/images/app/icons/like-green.svg'}" style="margin-right: 10px;"> <span data-content="description.styles">${item.description.styles}</span>
                    </span>
                </li>
                <li class="item-row">
                    <span class="item-mobile">
                        <img src="${location.origin + '/assets/images/app/icons/like-green.svg'}" style="margin-right: 10px;"> <span data-content="description.sharing">${item.description.sharing}</span>
                    </span>
                </li>
                <li class="item-row">
                    <span class="item-mobile">
                        <img src="${location.origin + '/assets/images/app/icons/like-green.svg'}" style="margin-right: 10px;"> <span data-content="description.url"> ${item.description.url}</span>
                    </span>
                </li>
            </ul>
        </div>
        <div class="form-group mt-4">
        ${ JSON.parse(localStorage.getItem('userData'))?
            (JSON.parse(localStorage.getItem('userData')).planDetails && JSON.parse(localStorage.getItem('userData')).planDetails.emailVerified) ? 
            item.planId==1 && (localStorage.getItem('userData') && JSON.parse(localStorage.getItem('userData')).planDetails.planId) ? 
            `<button class="btn btn-primary btn-lg btn-block select_plan price-action-modal">BUILD RESUME</button>` 
            : `<a href="${item.redirectUrl}" target="_blank" class="btn btn-primary btn-lg btn-block select_plan">BUILD RESUME</a>`:`<button class="btn btn-primary btn-lg btn-block select_plan price-action-verify-modal">BUILD RESUME</button>`:
             `<a href="${item.redirectUrl}" target="_blank" class="btn btn-primary btn-lg btn-block select_plan">BUILD RESUME</a>`}
        </div>
        </div>
    </div>`;
        $('.pricing_template').append(pricing_template_view);
    });


}