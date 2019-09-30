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
				let sessionId = sessionStorage.getItem('sessionId');
				if (!sessionId) {
					//console.log("sessionId ::::::"+sessionId);
					window.location.href = "../index.html";
				} else {
					var userId = userData.userId;
					//console.log(userData);
					var fromPage = sessionStorage.getItem('fromPage');
					//console.log("fromPage ::::::"+fromPage);
					//if(fromPage == 'signin'){
					$('#userName').text(userData.firstname + " " + userData.lastname);
					$('#UserEmail').text(userData.email);
					$('input[name="firstname"]').val(userData.firstname);
					$('input[name="lastname"]').val(userData.lastname);
					$('input[name="email"]').val(userData.email);

					//$('input[name="shareName"]').val(userData.share_name);
					$('input[name="shareName"]').val(sessionStorage.getItem('shareName'));
					$('#copyText').val(self.options.baseUrl + '/@' + sessionStorage.getItem('shareName'));

					var pic = sessionStorage.getItem('imageStore');
					var picpath = pic.search('1631033876795164.jpg');

					if (picpath > -1 || pic == '') {
						$('#profileMenu img').attr('src', '../images/app/pic1.png');
						$('#profilePicEdit').attr('src', '../images/app/pic1.png');

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
						console.log(shareName, shareName.length, "shareName");
						if (shareName.length == 8) {
							var shareData = {
								"username": userData.email,
								"sharename": shareName
							}

							var settings = {
								"async": true,
								"crossDomain": true,
								"url": baseApiUrl + serviceUrls.post.updateShareName,
								"method": "POST",
								"headers": {
									"content-type": "application/json",
									"token": sessionId,
									"cache-control": "no-cache",
								},
								"processData": false,
								"data": JSON.stringify(shareData)
							}

							$.ajax(settings).done(function (response) {
								// console.log(response);
								sessionStorage.setItem('shareName', shareName);
								if (response.msg.title == "Success") {
									$('#newSuccessMessageID .message-text').html(response.msg.description)
									$('#newSuccessMessageID').html(response.msg.description)
										.fadeIn()
										.delay(5000)
										.fadeOut();
									// $('#shareUpdatedSuccessfully').css('visibility', 'visible').slideDown();
									// setTimeout(function () {
									// 	$('#shareUpdatedSuccessfully').css('visibility', 'hidden').slideUp();
									// }, 2000);
								}
								$('input[name="shareName"]').val(sessionStorage.getItem('shareName'));
							});
						} else {
							var errorMessage = 'Share Url Length should be 8.';
							$('#newErrorMessageID .message-text').html(errorMessage)
							$('#newErrorMessageID').html(errorMessage)
								.fadeIn()
								.delay(5000)
								.fadeOut();
						}
					});

					$('#copyLinkBtn').on('click', function () {
						console.log($('#shareName').val());
						if ($('#shareName').val()) {
							$('#copyText').val($('#shareDomain').val() + $('#shareName').val());
							var copyText = document.getElementById("copyText");
							copyText.select();
							document.execCommand("copy");
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

					var settings = {
						"async": true,
						"crossDomain": true,
						"url": baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateResumeUserPassword,
						"method": "POST",
						"headers": {
							"token": sessionId,
							"content-type": "application/json",
							"cache-control": "no-cache",
						},
						"processData": false,
						"data": JSON.stringify(userData)
					}

					$.ajax(settings).done(function (response) {
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
					});
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

						var settings = {
							"async": true,
							"crossDomain": true,
							"url": baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume,
							"method": "POST",
							"headers": {
								"token": sessionId,
								"content-type": "application/json"
							},
							"processData": false,
							"data": JSON.stringify(profileData)
						}

						$.ajax(settings).done(function (response) {
							console.log(response);
							if (response.status == "success") {
								sessionStorage.setItem('userData', JSON.stringify(response.data));
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
						});
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

					var settings = {
						"async": true,
						"crossDomain": true,
						"url": baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume,
						"method": "POST",
						"headers": {
							"token": sessionId,
							"content-type": "application/json"
						},
						"processData": false,
						"data": JSON.stringify(profileData)
					}

					$.ajax(settings).done(function (response) {
						console.log(response);
						if (response.status == "success") {
							sessionStorage.setItem('userData', JSON.stringify(response.data));
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
					});
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
						"firstname": JSON.parse(sessionStorage.getItem('userData')).firstname,
						"lastname": JSON.parse(sessionStorage.getItem('userData')).lastname,
						"email": JSON.parse(sessionStorage.getItem('userData')).email,
						"hideResume": this.checked
					};
					// profileData.hideResume = this.checked
					var settings = {
						"async": true,
						"crossDomain": true,
						"url": baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume,
						"method": "POST",
						"headers": {
							"token": sessionId,
							"content-type": "application/json"
						},
						"processData": false,
						"data": JSON.stringify(profileData)
					}
					$.ajax(settings).done(function (response) {
						//console.log(response);
						if (response.status == "success") {
							sessionStorage.setItem('userData', JSON.stringify(response.data));
							var statusMessage = response.data.hideResume == true ? "Now your resume is in private mode" : "Now your resume is in public mode";
							$('#newSuccessMessageID .message-text').html(statusMessage);
							$('#newSuccessMessageID').html(statusMessage)
								.fadeIn()
								.delay(5000)
								.fadeOut();
						}
					});
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

				var imageSettings = {
					"async": true,
					"crossDomain": true,
					"url": baseApiUrl + serviceUrls.post.uploadFile,
					"method": "POST",
					"headers": {
						"token": sessionId,
						"cache-control": "no-cache",
					},
					"processData": false,
					"contentType": false,
					"mimeType": "multipart/form-data",
					"data": form
				}
				$.ajax(imageSettings).done(function (responseData) {
					var response = JSON.parse(responseData)
					//console.log(response.data.httpPath);
					if (response.status == 'success') {
						sessionStorage.setItem('imageStore', response.data.httpPath);
						$('#profileMenu img').attr('src', response.data.httpPath);
						$('#profilePicEdit').attr('src', response.data.httpPath);
						$('#myModelUploadPhoto').modal('hide');
					} else {
						$('<div class="invalid-feedback">' + response.msg.description + '</div>').insertAfter$('#select-pic-section');
					}
				});
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