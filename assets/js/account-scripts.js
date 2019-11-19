var shareSourceUrl = "https://dev.workruit.com/#";
var localUserData = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', atob(localStorage.getItem(btoa('sessionId_' + window.location.origin))))), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
console.log("localUserData", localUserData);
// plug it in, plug it in
(function ($) {

	var paraCount = function () {

		return {

			options: {
				itemClass: 'awesome',
				baseUrl: window.location.origin,
				apiUrl: baseUrl,
				navPath: "",
				callMe: function () {
					console.log("ring, ring...");
				}
			},

			// --------------------------------------------------------------------

			init: function (options, element) {
				this.options = $.extend(this.options, options);
				this.elem = element;
				this.attachEvents();
			},

			// --------------------------------------------------------------------

			attachEvents: function () {
				var self = this;
				// var urlArr = ['login', 'signup', 'forgotPassword', 'home', 'account', 'share'];
				// $.each(urlArr, function (index, value) {
				// 	if (window.location.href.indexOf('index.html') <= -1) {
				// 		if (window.location.href.indexOf(value) >= 0) {
				// 			window.location = self.options.baseUrl + '/' + value + '/index.html';
				// 		}
				// 	}
				// });
				let sessionId = atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)));
				if (!sessionId) {
					//console.log("sessionId ::::::"+sessionId);
					window.location.href = "../index.html";
				} else {
					var localUserData = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', atob(localStorage.getItem(btoa('sessionId_' + window.location.origin))))), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
					getUserProfile();
					var userId = localUserData.userId;
					//console.log(localUserData);
					// var fromPage = localStorage.getItem('fromPage');
					//console.log("fromPage ::::::"+fromPage);
					//if(fromPage == 'signin'){
					$('#userName').text(localUserData.firstname + " " + localUserData.lastname);
					$('#UserEmail').text(text_truncate(localUserData.email, 30));
					$('input[name="firstname"]').val(localUserData.firstname);
					$('input[name="lastname"]').val(localUserData.lastname);
					$('input[name="email"]').val(localUserData.email);

					//$('input[name="shareName"]').val(localUserData.share_name);
					$('input[name="shareName"]').val(localUserData.share_name);
					$('#copyText').val(self.options.baseUrl + '/#' + localUserData.share_name);

					// var pic = atob(localStorage.getItem(btoa('imageStore')));
					// var picpath = pic.search('1631033876795164.jpg');

					if (!localUserData.pic) {
						$('#profileMenu img').attr('src', '../../assets/images/avatar.png');
						$('#profilePicEdit').attr('src', '../../assets/images/avatar.png');

					} else {
						// console.log("picpicpicpicpic", pic)
						$('#profileMenu img').attr('src', localUserData.pic);
						$('#profilePicEdit').attr('src', '');
						$('#profilePicEdit').attr('src', localUserData.pic);
					}


					if (localUserData.lastUpdatedDate) {
						$('#lastUpdated').text(localUserData.lastUpdatedDate);
						$('#createResumeContainer').hide();
						$('#updateResumeContainer').show();
					} else {
						$('#updateResumeContainer').hide();
						$('#createResumeContainer').show();

					}

					//}

				}
				$("#changePassBtn").on('click', function () {
					$("#changePasswordForm").removeClass('d-none');
					$("#changePassBtn").addClass('d-none');
				});
				$("#cancelBtn").on('click', function () {
					$('input[name="oldPassword"]').val('');
					$('input[name="newPassword"]').val('');
					$('input[name="reenterNewPassword"]').val('');
					// $("#changePasswordForm").fadeOut();
					$("#changePasswordForm").addClass('d-none');
					$("#changePassBtn").removeClass('d-none');
				});
				$('#profileMenu').on('click', function () {
					//$('.dropdown-menu').toggleClass('open');
					//$('body').toggleClass('menu-open');
				});
				/* Logout functionality */
				// $('.tab-item').on('click', function () {
				// 	let idVal = $(this).attr('data-item');

				// 	$('.tab-item').removeClass('active')
				// 	$('.tab-body-container').removeClass('tab-body-show');
				// 	$(this).addClass('active');
				// 	$('#' + idVal + 'TabBody').addClass('tab-body-show');
				// });

				$('input.myprofile').on('focus', function (e) {
					$('#updateProfile').fadeIn();
					// console.log(e);
				});
				$('select.myprofile').on('focus', function (e) {
					$('#updateProfile2').fadeIn();
					// console.log(e);
				});




				/*$('input').on('keypress', function (e) {
					if (e.which == 32)
						return false;
				});*/

				$('#saveProfilePic').on('click', function () {
					self.saveUserPic();
				});

			},
			saveUserPic: function () {
				var localUserData = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', atob(localStorage.getItem(btoa('sessionId_' + window.location.origin))))), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
				var self = this;
				var form = new FormData();
				var logoImg = $('input[name="pic"]').get(0).files[0];

				var userId = localUserData.userId;
				console.log('saveUserPic', localUserData)
				form.append("userId", userId);
				form.append("type", "photo");
				form.append("file", logoImg);
				doUpload(baseApiUrl + serviceUrls.post.uploadFile, form).then(response => {
					console.log(response);
					// var response = JSON.parse(response)
					//console.log(response.data.httpPath);
					if (response.status == 'success') {
						localUserData.pic = response.data.httpPath;
						localStorage.setItem(btoa('imageStore'), btoa(response.data.pic));
						getUserProfile();
						$('#profileMenu img').attr('src', response.data.httpPath);
						localStorage.setItem(encrypt('userData', sessionId), encrypt(JSON.stringify(localUserData), sessionId));
						console.log('response.data.httpPath', response.data.httpPath);
						$('#profilePicEdit').attr('src', response.data.httpPath);
						$('#myModelUploadPhoto').modal('hide');
					} else {
						$('<div class="invalid-feedback">' + response.msg.description + '</div>').insertAfter$('#select-pic-section');
					}
				})
			}
		};

	};

	// --------------------------------------------------------------------

	$.fn.paraCount = function (options) {
		// create an instance for each element in the set
		return this.each(function () {
			var myParaCount = new paraCount();
			myParaCount.init(options, this);
			// this lets us call methods on the selector
			$(this).data("paraCount", myParaCount);
		});
	};

})(jQuery);

function getUserProfile() {
	doGetWithEncrypt(apiUrl + "/user/" + localUserData.userId + "/getProfileResume").then(response => {
		console.log("doGetWithEncrypt", response);
		var userProfileData = response.data;
		console.log(userProfileData.planDetails);
		$('#info_message span').html(userProfileData.planDetails.msg.description);
		if (userProfileData.planDetails.subscribedUser) {
			$('#shareNavItem a').attr("data-toggle", "").attr('data-target', '').attr('href',
				location.origin + '/app/dashboard/share.html');
		} else {
			$('#shareNavItem a').attr("data-toggle", "modal").attr('data-target', '#upgrade');
		}
		if (userProfileData.pic) {
			$('#profileMenu img').attr('src', userProfileData.pic)
		} else {
			$('#profileMenu img').attr('src', location.origin + '/assets/images/avatar.png');
		}
		if (userProfileData.edit_name) {
			$('.edit_name').addClass('d-none');
			$('#shareDomain2').val(shareSourceUrl + userProfileData.share_name);
			$('.edit_name_link').removeClass('d-none');
		}
		// console.log(encrypt('userData', atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
		// localStorage.removeItem(encrypt('userData', atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
		localStorage.setItem(encrypt('userData', sessionId), encrypt(JSON.stringify(response.data), sessionId));
		localStorage.setItem(btoa('shareName_' + location.origin), encrypt(JSON.stringify(response.data.share_name), atob(localStorage.getItem(btoa('sessionId_' + window.location.origin)))));
		setInfoMessage(response.data.planDetails.msg.description, response.data.planDetails.emailVerified);
		console.log(window.location.href);
		$('#load-header').load('../includes/user-header.html');
	});
}

function setInfoMessage(message, emailVerified) {
	if (emailVerified) {
		$('#mail_message').remove();
		if (!$('#info_message span').length) {
			requestAnimationFrame(function () {
				setInfoMessage(message);
			});
			return;
		}
		const numberOfDays = JSON.parse(message.match(/\d+/)) ? JSON.parse(message.match(/\d+/)[0]) : null;
		console.log(!message.indexOf("2 days"), !message.indexOf("1 day"), message.indexOf("today"), "today", numberOfDays);
		if ((numberOfDays && numberOfDays <= 3) || message.split('.')[0].indexOf('today') !== -1) {
			$('#info_message').addClass('alert-danger');
		} else if (!message.indexOf("Your free plan is expired.") || !message.indexOf("Please subscribe") || !message.indexOf("Your plan expired")) {
			$('#info_message').addClass('alert-danger');
		} else {
			$('#info_message').addClass('alert-success');
		}
		$('#info_message span').html(message);
	} else {
		if (!$('#mail_message span').length) {
			requestAnimationFrame(function () {
				setInfoMessage(message);
			});
			return;
		}
		$('#info_message').addClass('d-none');
		$('#mail_message span').html(messages.emailVerified);
		$('#mail_message').addClass('alert-danger');
		$('#mail_message .close').remove();
	}
	if (localUserData) {
		console.log("userInfo.planDetails.subscribedUser", localUserData.planDetails, localUserData.planDetails.subscribedUser);
		if (localUserData.planDetails.subscribedUser) {
			$('#shareNavItem a').attr("data-toggle", "").attr('data-target', '').attr('href',
				location.origin + '/app/dashboard/share.html');
		} else {
			$('#shareNavItem a').attr("data-toggle", "modal").attr('data-target', '#upgrade');
		}
		if (localUserData.planDetails.emailVerified) {
			$('#mail_message').remove();
		}
	}
}
window.addEventListener("message", function (event) {
	console.log(":: PARENT MESSAGE", event.data)

	if (event.data && event.data.type === "CLOSE__MODAL") {
		$(".modal").modal("hide");
	}
});

function alphanumeric(inputtxt) {
	var letterNumber = /^[0-9a-zA-Z]+$/;
	if ((inputtxt.match(letterNumber))) {
		return true;
	} else {
		return false;

	}
}

function text_truncate(str, length, ending) {
	if (length == null) {
		length = 100;
	}
	if (ending == null) {
		ending = '...';
	}
	if (str.length > length) {
		return str.substring(0, length - ending.length) + ending;
	} else {
		return str;
	}
}
var emailVerifiedStatus = localUserData.emailVerified
emailVerifiedStatus === 0 ? $(
	'#newSuccessMessageID').css(
	'display',
	'none') : $('.preview_btn').css('display', 'block');