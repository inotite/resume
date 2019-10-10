if (!sessionStorage.getItem('plans')) {
    getResumePlans();
} else {
    PricingTemplate(JSON.parse(atob(sessionStorage.getItem('plans'))));
}

function getResumePlans() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": baseResumeApiUrl + resumeServiceUrls.get.getResumePlans,
        "method": "GET",
        "headers": {
            "token": authToken,
            "content-type": "application/json"
        },
        "processData": false,
        // "data": JSON.stringify(signupData)
    };
    $.ajax(settings).done(function (response) {
        response.map((item, index) => {
            var pId = btoa(JSON.stringify(item));
            item.price = item.price == 0 ? 'Free' : '&#8377; ' + item.price;
            item.redirectUrl = sessionStorage.getItem('userData') ?
                location.origin + '/app/order/cart.html?' +
                pId :
                location.origin + '/app/auth/login.html';
        });
        sessionStorage.setItem('plans', btoa(JSON.stringify(response)));
        PricingTemplate(response);
        // console.log(response);
        // $('.pricing_template').append(pricing_template);
        // console.log("pricing_template", pricing_template);
    });
    $('.select_plan').on('click', function () {
        console.log($(this).html);
    })
}

function PricingTemplate(item) {
    console.log(item);
    item.map((item, index) => {
        const pricing_template_view = `
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
            <a href="${item.redirectUrl}" class="btn btn-primary btn-lg btn-block select_plan">BUILD RESUME</a>
        </div>
        </div>
    </div>`;
        $('.pricing_template').append(pricing_template_view);
    });


}