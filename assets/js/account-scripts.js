var shareSourceUrl = "https://www.workruit.com/#";
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
					var userId = userData.userId;
					//console.log(userData);
					var fromPage = localStorage.getItem('fromPage');
					//console.log("fromPage ::::::"+fromPage);
					//if(fromPage == 'signin'){
					$('#userName').text(userData.firstname + " " + userData.lastname);
					$('#UserEmail').text(userData.email);
					$('input[name="firstname"]').val(userData.firstname);
					$('input[name="lastname"]').val(userData.lastname);
					$('input[name="email"]').val(userData.email);

					//$('input[name="shareName"]').val(userData.share_name);
					$('input[name="shareName"]').val(localStorage.getItem('shareName'));
					$('#copyText').val(self.options.baseUrl + '/@' + localStorage.getItem('shareName'));

					var pic = localStorage.getItem('imageStore');
					var picpath = pic.search('1631033876795164.jpg');

					if (picpath > -1 || pic == '') {
						$('#profileMenu img').attr('src', '../../assets/images/avatar.png');
						$('#profilePicEdit').attr('src', '../../assets/images/avatar.png');

					} else {
						$('#profileMenu img').attr('src', pic);
						$('#profilePicEdit').attr('src', pic);
					}


					if (userData.lastUpdatedDate) {
						$('#lastUpdated').text(userData.lastUpdatedDate);
						$('#createResumeContainer').hide();
						$('#updateResumeContainer').show();
					} else {
						$('#updateResumeContainer').hide();
						$('#createResumeContainer').show();

					}

					//}

					$('#shareNameBtn').on('click', function () {

						let shareName = $('input[name="shareName"]').val();
						if (shareName !== JSON.parse(localStorage.getItem('userData')).share_name) {
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
													"username": userData.email,
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
							if (JSON.parse(localStorage.getItem('userData')).edit_name) {
								$('#copyText2').val(shareSourceUrl + JSON.parse(localStorage.getItem('userData')).share_name);
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

				/* Update Password functionality */
				$('#updatePassBtn').on('click', function () {

					let oldPassword = $('input[name="oldPassword"]').val();
					let newPassword = $('input[name="newPassword"]').val();
					let reenterNewPassword = $('input[name="reenterNewPassword"]').val();

					let userData = {
						"oldPassword": oldPassword,
						"newPassword": newPassword,
						"reenterNewPassword": reenterNewPassword
					}
					doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateResumeUserPassword, userData).then(response => {
						console.log(response);
						if (response.status == "success") {
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
					})
				});
				/* Update Password functionality */
				$('#updateProfile').on('click', function () {

					var firstname = $.trim($('input[name="firstname"]').val());
					var lastname = $.trim($('input[name="lastname"]').val());
					var collegeName = $('#collageName').val() ? JSON.parse(atob($('#collageName').val())).collegeName : '';
					var collegeLogo = $('#collageName').val() ? JSON.parse(atob($('#collageName').val())).collegeLogo : '';
					// var clgName = 
					var email = userData.email;

					$('.invalid-feedback').remove();

					var validate = true;
					if ($.trim(firstname).length <= 0) {
						validate = false;
						$('<div class="invalid-feedback">First Name is required.</div>').insertAfter('input[name="firstname"]');
					} else {
						if ($.trim(firstname).length < 3) {
							validate = false;
							$('<div class="invalid-feedback">Minimum 3 characters are required.</div>').insertAfter('input[name="firstname"]');
						}
					}

					if ($.trim(lastname).length <= 0) {
						validate = false;
						$('<div class="invalid-feedback">Last Name is required.</div>').insertAfter('input[name="lastname"]');
					} else {
						if ($.trim(lastname).length < 3) {
							validate = false;
							$('<div class="invalid-feedback">Minimum 3 characters are required.</div>').insertAfter('input[name="lastname"]');
						}
					}
					if (validate) {
						console.log(collegeName, collegeLogo);
						$('#updateProfile').attr('disabled', true);
						var profileData = {
							"firstname": firstname,
							"lastname": lastname,
							"email": email,
							"collegeName": collegeName,
							"collegeLogo": collegeLogo
						}
						doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume, profileData).then(response => {
							console.log(response);
							if (response.status == "success") {
								localStorage.setItem('userData', JSON.stringify(response.data));
								$('input[name="firstname"]').val(response.data.firstname);
								$('input[name="lastname"]').val(response.data.lastname);
								$('#newSuccessMessageID .message-text').html(response.msg);
								$('#newSuccessMessageID').fadeIn().delay(5000).fadeOut('slow', function () {
									$('#updateProfile').attr('disabled', false);
								});

							} else {
								$('#newErrorMessageID .message-text').html(response.msg)
								$('#newErrorMessageID').fadeIn().delay(5000).fadeOut('slow', function () {
									$('#updateProfile').attr('disabled', false);
								});
							}
						})
					}
				});
				$('#updateProfile2').on('click', function () {
					var collegeName = $('#collageName').val() ? JSON.parse(atob($('#collageName').val())).collegeName : '';
					var collegeLogo = $('#collageName').val() ? JSON.parse(atob($('#collageName').val())).collegeLogo : '';
					// var clgName = 
					console.log(collegeName, collegeLogo);
					var profileData = {
						"firstname": userData.firstname,
						"lastname": userData.lastname,
						"email": userData.email,
						"collegeName": collegeName,
						"collegeLogo": collegeLogo
					}
					doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume, profileData).then(response => {
						console.log(response);
						if (response.status == "success") {
							localStorage.setItem('userData', JSON.stringify(response.data));
							$('#newSuccessMessageID .message-text').html(response.msg);
							$('#newSuccessMessageID').fadeIn().delay(5000).fadeOut('slow', function () {
								$('#updateProfile').attr('disabled', false);
							});

						} else {
							$('#newErrorMessageID .message-text').html(response.msg)
							$('#newErrorMessageID').fadeIn().delay(5000).fadeOut('slow', function () {
								$('#updateProfile').attr('disabled', false);
							});
						}
					})
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
						"firstname": JSON.parse(localStorage.getItem('userData')).firstname,
						"lastname": JSON.parse(localStorage.getItem('userData')).lastname,
						"email": JSON.parse(localStorage.getItem('userData')).email,
						"hideResume": this.checked
					};
					// profileData.hideResume = this.checked
					doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume, profileData).then(response => {
						//console.log(response);
						if (response.status == "success") {
							localStorage.setItem('userData', JSON.stringify(response.data));
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

				var userId = userData.userId;

				form.append("userId", userId);
				form.append("type", "photo");
				form.append("file", logoImg);
				doUpload(baseApiUrl + serviceUrls.post.uploadFile, form).then(response => {
					console.log(response);
					// var response = JSON.parse(response)
					//console.log(response.data.httpPath);
					if (response.status == 'success') {
						JSON.parse(localStorage.getItem('userData')).pic = response.data.httpPath;
						// localStorage.setItem('imageStore', response.data.httpPath);
						$('#profileMenu img').attr('src', response.data.httpPath);
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
	doGetWithEncrypt(apiUrl + "/user/" + userData.userId + "/getProfileResume").then(response => {
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
		localStorage.setItem('userData', JSON.stringify(userProfileData));
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
		console.log(!message.indexOf("2 days"), !message.indexOf("1 day"), !message.indexOf("today"), "today", numberOfDays);
		if (numberOfDays && numberOfDays <= 3) {
			$('#info_message').addClass('alert-danger');
		} else if (!message.indexOf("Your free plan is expired.") || !message.indexOf("Please subscribe") || !message.indexOf("Your plan expired") || !message.indexOf('Your free plan is expiring today')) {
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