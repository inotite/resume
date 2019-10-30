var shareSourceUrl = "https://www.workruit.com/#";
var localUserData = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', localStorage.getItem('sessionId'))), localStorage.getItem('sessionId')));
// console.log("localUserData",localUserData)
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
				let sessionId = localStorage.getItem('sessionId');
				if (!sessionId) {
					//console.log("sessionId ::::::"+sessionId);
					window.location.href = "../index.html";
				} else {
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
					$('input[name="shareName"]').val(localStorage.getItem('shareName'));
					$('#copyText').val(self.options.baseUrl + '/@' + localStorage.getItem('shareName'));

					var pic = localStorage.getItem('imageStore');
					// var picpath = pic.search('1631033876795164.jpg');

					if (!pic) {
						$('#profileMenu img').attr('src', '../../assets/images/avatar.png');
						$('#profilePicEdit').attr('src', '../../assets/images/avatar.png');

					} else {
						console.log("pic>>>>>>>>>>>>>>>>>", pic);
						$('#profileMenu img').attr('src', pic);
						$('#profilePicEdit').attr('src', '');
						$('#profilePicEdit').attr('src', pic);
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

					$('#shareNameBtn').on('click', function () {

						let shareName = $('input[name="shareName"]').val();
						if (shareName !== localUserData.share_name) {
							console.log(shareName, shareName.length, "shareName");
							if (alphanumeric(shareName)) {
								if (shareName.length >= 6 && shareName.length <= 20) {
									swal({
											title: "Are you sure?",
											text: messages.shareUrlEditInfo,
											icon: "warning",
											buttons: true,
											dangerMode: true,
										})
										.then((willDelete) => {
											if (willDelete) {
												var shareData = {
													"username": localUserData.email,
													"sharename": shareName
												}
												doPostWithEncrypt(baseApiUrl + serviceUrls.post.updateShareName, shareData).then(response => {
													localStorage.setItem('shareName', shareName);
													if (response.msg.title == "Success") {
														getUserProfile();
														$('#newSuccessMessageID .message-text').html(response.msg.description);
														$('#newSuccessMessageID').html(response.msg.description)
															.fadeIn()
															.delay(5000)
															.fadeOut();
													} else {
														$('#newErrorMessageID .message-text').html(response.msg.description)
														$('#newErrorMessageID').html(response.msg.description)
															.fadeIn()
															.delay(5000)
															.fadeOut();
													}
													$('input[name="shareName"]').val(localStorage.getItem('shareName'));
												})
											}

										});
								} else {
									// var errorMessage = shareUrlLengthError;
									$('#newErrorMessageID .message-text').html(messages.shareUrlLengthError)
									$('#newErrorMessageID').html(messages.shareUrlLengthError)
										.fadeIn()
										.delay(5000)
										.fadeOut();
								}
							} else {
								// var errorMessage = shareUrlLengthError;
								$('#newErrorMessageID .message-text').html(messages.shareUrlFormatError)
								$('#newErrorMessageID').html(messages.shareUrlFormatError)
									.fadeIn()
									.delay(5000)
									.fadeOut();
							}
						}
					});

					$('#copyLinkBtn').on('click', function () {
						if ($('#shareName').val()) {
							if (localUserData.edit_name) {
								$('#copyText2').val(shareSourceUrl + localUserData.share_name);
								var copyText = document.getElementById("copyText2");
								copyText.select();
								document.execCommand("copy");
							} else {
								console.log($('#shareDomain').val() + $('#shareName').val());
								$('#copyText').val($('#shareDomain').val() + $('#shareName').val());
								var copyText = document.getElementById("copyText");
								copyText.select();
								document.execCommand("copy");
							}
							var successMessage = 'Your link is copied successfully';
							$('#newSuccessMessageID .message-text').html(successMessage)
							$('#newSuccessMessageID').html(successMessage)
								.fadeIn()
								.delay(5000)
								.fadeOut();
						} else {
							var errorMessage = 'Please enter valid share url and save';
							$('#newErrorMessageID .message-text').html(errorMessage)
							$('#newErrorMessageID').html(errorMessage)
								.fadeIn()
								.delay(5000)
								.fadeOut();
						}
						//alert("Copied the text: " + copyText.value);
					});


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
				$('#resume_piblic').change(function () {
					var profileData = {
						"firstname": localUserData.firstname,
						"lastname": localUserData.lastname,
						"email": localUserData.email,
						"hideResume": this.checked
					};
					// profileData.hideResume = this.checked
					doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume, profileData).then(response => {
						//console.log(response);
						if (response.status == "success") {
							localStorage.setItem('localUserData', JSON.stringify(response.data));
							var statusMessage = response.data.hideResume == true ? "Now your resume is in private mode" : "Now your resume is in public mode";
							$('#newSuccessMessageID .message-text').html(statusMessage);
							$('#newSuccessMessageID').html(statusMessage)
								.fadeIn()
								.delay(5000)
								.fadeOut();
						}
					})
				})

			},
			saveUserPic: function () {
				var self = this;
				var form = new FormData();
				var logoImg = $('input[name="pic"]').get(0).files[0];

				var userId = localUserData.userId;

				form.append("userId", userId);
				form.append("type", "photo");
				form.append("file", logoImg);
				doUpload(baseApiUrl + serviceUrls.post.uploadFile, form).then(response => {
					console.log(response);
					// var response = JSON.parse(response)
					//console.log(response.data.httpPath);
					if (response.status == 'success') {
						localUserData.pic = response.data.httpPath;
						localStorage.setItem('imageStore', response.data.httpPath);
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
		localStorage.setItem(encrypt('localUserData', response.sessionId), encrypt(JSON.stringify(response.data), response.sessionId));
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