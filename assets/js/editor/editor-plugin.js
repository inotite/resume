// plug it in, plug it in

(function ($) {

	var paraCount = function () {

		return {

			options: {
				itemClass: 'awesome',
				baseUrl: window.location.origin,
				navPath: "",
				apiUrl: baseApiUrl,
				apiAdminUrl: apiAdminUrl,
				callMe: function () {
					console.log("ring, ring...");
				}
			},

			// --------------------------------------------------------------------

			init: function (options, element) {
				this.options = $.extend(this.options, options);
				this.elem = element;
				this.attachEvents();
				//this.someMethod();
				this.autocompleteData();
				//this.dateRangeInit(id);
				this.getLocalStorageData();
			},

			// --------------------------------------------------------------------

			getLocalStorageData: function () {

				var self = this;
				var urlArr = ['login', 'signup', 'forgotPassword', 'home', 'account', 'share'];
				$.each(urlArr, function (index, value) {
					if (window.location.href.indexOf('index.html') <= -1) {
						if (window.location.href.indexOf(value) >= 0) {
							window.location = self.options.baseUrl + '/' + value + '/index.html';
						}
					}
				});


				var sessionId = localStorage.getItem(btoa('sessionId_' + window.location.origin));
				//console.log(userData.firstname);
				if (!sessionId) {
					//console.log("sessionId ::::::"+sessionId);
					window.location.href = "../index.html";
				} else {
					$('.loading-container').delay(2000).fadeOut();

					var fromPage = localStorage.getItem('fromPage');
					let formType = localStorage.getItem('formType');

					/*
					var userData = "";
					if(formType == 'preview'){
						userData = JSON.parse(localStorage.getItem('previewData'));
					}else{
						userData = JSON.parse(localStorage.getItem('userData'));
					}
					
					*/
					// var userData = JSON.parse(localStorage.getItem('userData'));
					// console.log(userData);

					if (fromPage == 'signup') {
						$('p[name="firstname"]').text(userData.firstname);
						$('p[name="lastname"]').text(userData.lastname);
						$('p[name="email"]').text(userData.email);
					}
					if (fromPage == 'signin') {
						var jobFunctionName = userData.jobFunctions.length > 0 ? userData.jobFunctions[0].jobFunctionName : '';
						var jobFunctionId = userData.jobFunctions.length > 0 ? userData.jobFunctions[0].jobFunctionId : '';
					}

					$('p[name="firstname"]').text(userData.firstname);
					$('p[name="lastname"]').text(userData.lastname);
					$('input[name="jobfunctions"]').val(jobFunctionName);
					$('input[name="jobfunctions"]').attr('data-item-id', jobFunctionId);

					if (userData.coverLetter != '') $('p[name="aboutme"]').text(userData.coverLetter);
					if (userData.userJobTitle != '') $('p[name="title"]').text(userData.userJobTitle);
					if (userData.expDisplay && userData.expDisplay != '') $('p[name="totalexperience"]').text(userData.expDisplay);
					if (userData.location != '') $('p[name="location"]').text(userData.location);
					if (userData.date_of_birth != '') $('input#dob').val(userData.date_of_birth);
					if (userData.gender != '') $(".gender [data-value=" + userData.gender + "]").addClass('selected', function () {
						$('.gender .current').text(userData.gender);
					}).siblings().removeClass('selected');
					if (userData.email != '') $('p[name="email"]').text(userData.email);
					if (userData.telephone != '') $('p[name="telephone"]').text(userData.telephone);
					if (userData.user_linkdin != '') $('p[name="user_linkdin"]').text(userData.user_linkdin);
					if (userData.user_github != '') $('p[name="user_github"]').text(userData.user_github);
					if (userData.user_twitter != '') $('p[name="user_twitter"]').text(userData.user_twitter);

					localStorage.setItem('themeStyle', 'theme-picker1');

					var pic = atob(localStorage.getItem(btoa('imageStore')));
					var imageStoreData = localStorage.getItem('imageStoreData');
					var picpath = pic.search('1631033876795164.jpg');


					var themeOptions = {
						"education_section": true,
						"experience_section": true,
						"acadamic_section": true,
						"achivements_section": true,
						"certifications_section": true,
						"github_section": true,
						"twitter_section": true,
						"website_section": true,
						"blog_section": true,
					}

					localStorage.setItem('themeOptions', JSON.stringify(themeOptions));
					//$('#image-preview2').css('background', 'url('+imageStoreData+')');
					//console.log(pic);

					if (pic == '' || picpath > -1) {
						$('#image-preview').hide();
					} else {
						$('#image-preview').attr('src', pic);
						$('#ringoImage').attr('src', pic);
						$('#image-preview2').css('background', 'url(' + pic + ') center center');
						$('#image-preview2').css('opacity', 0);
						$('#image-preview').show();
						// $('.cont_fotodiv').css('background', 'transparent');
					}


					/* Experience object  */
					$(userData.userExperienceResSet).each(function (i, v) {
						var id = 'proExp_' + (i + 1);
						$('#' + id).show();
						$('#' + id).find('input[name="exp_endDate"]').val(userData.userExperienceResSet[i].endDate);
						$('#' + id).find('input[name="exp_startDate"]').val(userData.userExperienceResSet[i].startDate);
						$('#' + id).find('p[name="exp_jobTitle"]').text(userData.userExperienceResSet[i].jobTitle);
						$('#' + id).find('p[name="exp_location"]').text(userData.userExperienceResSet[i].location);
						$('#' + id).find('p[name="exp_company"]').text(userData.userExperienceResSet[i].company);
						$('#' + id).find('p[name="exp_description"]').text(userData.userExperienceResSet[i].description);
					});

					/* Education object  */
					$(userData.userEducationResSet).each(function (i, v) {
						// console.log(i,v)
						var id = 'education_' + (i + 1);
						$('#' + id).show();
						$('#' + id).find('p[name="fieldOfStudy"]').text(userData.userEducationResSet[i].fieldOfStudy);
						$('#' + id).find('p[name="edu_institution"]').text(userData.userEducationResSet[i].institution);
						$('#' + id).find('p[name="edu_location"]').text(userData.userEducationResSet[i].location);
						$('#' + id).find('input[name="edu_startDate"]').val(userData.userEducationResSet[i].startDate);
						$('#' + id).find('input[name="edu_endDate"]').val(userData.userEducationResSet[i].endDate);
						$('#' + id).find('p[name="edu_description"]').text(userData.userEducationResSet[i].description);
						$('#' + id).find('input[name="degree_title"]').val(userData.userEducationResSet[i].degree.title);
						$('#' + id).find('input[name="degree_title"]').attr('data-id', userData.userEducationResSet[i].degree.degreeId);
						$('#' + id).find('input[name="degree_title"]').attr('data-shorttitle', userData.userEducationResSet[i].degree.shortTitle);
					});

					/* Academic object  */
					$(userData.userAcademicResSet).each(function (i, v) {
						var id = 'acadamicPro_' + (i + 1);
						$('#' + id).show();
						$('#' + id).find('p[name="acd_role"]').text(userData.userAcademicResSet[i].role);
						$('#' + id).find('p[name="acd_projectTitle"]').text(userData.userAcademicResSet[i].projectTitle);
						$('#' + id).find('p[name="acd_institution"]').text(userData.userAcademicResSet[i].institution);
						$('#' + id).find('p[name="acd_location"]').text(userData.userAcademicResSet[i].location);
						$('#' + id).find('input[name="acd_startDate"]').val(userData.userAcademicResSet[i].startDate);
						$('#' + id).find('input[name="acd_endDate"]').val(userData.userAcademicResSet[i].endDate);
						$('#' + id).find('p[name="acd_description"]').text(userData.userAcademicResSet[i].description);
					});

					/* Skills object  */
					var percentageDevision = 25;
					console.log(userData.userSkillsSet.length, "userData.userSkillsSet.length");
					if (userData.userSkillsSet.length >= 6) {
						for (let index = 6; index < userData.userSkillsSet.length; index++) {
							var $div = $('li[id^="skills_small"]:last');
							var num = parseInt($div.prop("id").match(/\d+/g), 10) + 1;
							var $klon = $div.clone().prop('id', 'skills_small' + num)
							$div.after($klon);
							console.log(num);
							$('#skills_small' + num + ' .skills-data-container').attr('id', 'skilsContainer_' + num);
						}

					}
					// return;
					$(userData.userSkillsSet).each(function (i, v) {
						var id = 'skilsContainer_' + (i + 1);
						console.log("userSkillsSet", id);
						$('#' + id).show();
						$('#' + id).find('input[name="skill_name"]').val(userData.userSkillsSet[i].title);
						$('#' + id).find('span[name="skill_value"]').text(parseInt(userData.userSkillsSet[i].percentage) + "%");
						$('#' + id).find('span[name="skill_value"]').attr('data-val', parseInt(userData.userSkillsSet[i].percentage));

						var percentageVal = userData.userSkillsSet[i].percentage / percentageDevision;
						for (j = 1; j <= percentageVal; j++) {
							$('#' + id).find('.porcentaje' + j * 25).css('opacity', 0);
						}
					});
					/* Language object  */
					$(userData.userLngSet).each(function (i, v) {
						var id = i + 1;
						$('.language-' + id).show();
						$('#langTitle_' + id).text(userData.userLngSet[i].title);
						$('#language_' + id).val(userData.userLngSet[i].percentage);

						//console.log(userData.userLngSet[i].percentage);

						var percentageVal = userData.userLngSet[i].percentage / percentageDevision;

						for (j = 1; j <= percentageVal; j++) {
							$('.language-' + id).find('.pos' + j).addClass('selected');
						}


						if ($('.lang-contaner:visible').length >= 3) {
							// $('.lang-contaner').find('.clonar').hide();
						} else {
							// $('.lang-contaner').find('.clonar').show();
						}

					});


					let shareName = localStorage.getItem('shareName');
					//let userData = JSON.parse(localStorage.getItem('userData'));
					let userId = userData.userId;
					var sessionId = localStorage.getItem(btoa('sessionId_' + window.location.origin));

					/* Logout functionality */
					$('#guardar_btn').on('click', function () {
						var settings = {
							"async": true,
							"crossDomain": true,
							"url": self.options.apiUrl + "/user/" + userId + "/" + sessionId + "/resUserLogout",
							"method": "GET",
							"headers": {
								"token": sessionId,
								"content-type": "application/json"
							},
							"processData": false
						}
						$.ajax(settings).done(function (response) {
							//console.log(response);
							localStorage.clear();
							window.location.href = "../index.html";
						});
					});
				}

			},
			someMethod: function () {
				//alert('someMethod called');
				return $(this.elem); // for chaining

			},

			savePDF: function () {
				var self = this;
				html2canvas(document.getElementById("contimprimir"), {
					onrendered: function (canvas) {
						var quality = [0.0, 1.0];
						// var imgData = canvas.toDataURL('image/png', quality);
						// Convert the data to binary form
						//watermark pdf
						var waterMarkImgDataDoc = new jsPDF();
						var waterMarkImgDataDoc = new jsPDF('p', 'in', 'a4');
						waterMarkImgDataDoc = addWaterMark(waterMarkImgDataDoc);
						var waterMarkPdfOut = waterMarkImgDataDoc.output('blob');
						var wform = new FormData();
						wform.append("userId", userId);
						wform.append("type", "watermark");
						wform.append('file', pdfOut, 'watermark-resume.pdf');
						var waterMarkImageSettings = {
							"async": true,
							"crossDomain": true,
							"url": self.options.apiUrl + "/uploadFile",
							"method": "POST",
							"headers": {
								"token": sessionId,
								"cache-control": "no-cache",
							},
							"processData": false,
							"contentType": false,
							"mimeType": "multipart/form-data",
							"data": wform
						}
						$.ajax(waterMarkImageSettings).done(function (response) {
							//console.log(response);
							if (response.status == 'success') {
								//localStorage.setItem('imageStore', response.data.httpPath);
							}
						});
						//pdf without matermark
						if (userData.paidUser) {
							var imgData = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
							var waterMarkImgData = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
							imgData = atob(imgData);
							var doc = new jsPDF();
							var doc = new jsPDF('p', 'in', 'a4');
							doc.addImage(imgData, 'JPEG', -0.1, 0);
							// doc.save(userId+'_resume.pdf');
							var pdfOut = doc.output('blob');
							var form = new FormData();
							form.append("userId", userId);
							form.append("type", "resume");
							form.append('file', pdfOut, 'resume.pdf');
							var imageSettings = {
								"async": true,
								"crossDomain": true,
								"url": self.options.apiUrl + "/uploadFile",
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
							$.ajax(imageSettings).done(function (response) {
								//console.log(response);
								if (response.status == 'success') {
									//localStorage.setItem('imageStore', response.data.httpPath);
								}
							});
						}
					}
				});
			},

			saveUserPic: function () {
				var self = this;
				var form = new FormData();
				var logoImg = $('input[name="pic"]').get(0).files[0];

				form.append("userId", userId);
				form.append("type", "photo");
				form.append("file", logoImg);

				var imageSettings = {
					"async": true,
					"crossDomain": true,
					"url": self.options.apiUrl + "/uploadFile",
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

					var response = JSON.parse(responseData);
					//console.log(response.data.httpPath);

					if (response.status == 'success') {
						// console.log(response.data.httpPath);
						localStorage.setItem(btoa('imageStore'), btoa(response.data.pic));
						$('#profileMenu img').attr('src', response.data.httpPath);
						$('#profilePicEdit').attr('src', response.data.httpPath);
						$('#pimage-preview').attr('src', response.data.httpPath);
						$('#pimage-preview2').css('background', 'url(' + response.data.httpPath + ') center center');
						$('#image-preview2').css('opacity', 0);


					}
				});
			},

			getShareNameFile: function () {
				var self = this;
				var shareName = localStorage.getItem('shareName');
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": self.options.apiUrl + "/user/getShareFile?name=" + shareName,
					"type": "GET",
					"headers": {
						"token": "911ca088ab824095b82d3c98b32332e7",
						"cache-control": "no-cache",
					}
				}

				$.ajax(settings).done(function (response) {
					// console.log(response);
				});

			},

			storeTheImage: function () {
				var imgCanvas = document.getElementById('canvas-element'),
					imgContext = imgCanvas.getContext("2d");

				var img = document.getElementById('image-preview');
				// Make sure canvas is as big as the picture BUT make it half size to the file size is small enough
				imgCanvas.width = (img.width / 4);
				imgCanvas.height = (img.height / 4);

				// Draw image into canvas element
				imgContext.drawImage(img, 0, 0, (img.width / 4), (img.height / 4));

				// Get canvas contents as a data URL
				var imgAsDataURL = imgCanvas.toDataURL("image/png");

				// Save image into localStorage
				try {
					window.localStorage.setItem("imageStoreData", imgAsDataURL);
					$('.localstorage-output').html(window.localStorage.getItem('imageStoreData'));
					$('.cont_fotodiv').css('background', 'transparent');
				} catch (e) {
					console.log("Storage failed: " + e);
				}
			},

			readURL: function (input) {
				var self = this;
				if (input.files && input.files[0]) {
					var reader = new FileReader();

					reader.onload = function (e) {
						$('#image-preview').show();
						$('#image-preview').attr('src', e.target.result);
						$('#image-preview2').css('background', 'url(' + e.target.result + ') center center');
						$('#image-preview2').css('opacity', 0);

						self.storeTheImage();
						$('.cont_fotodiv').css('background', 'transparent');
					}
					reader.readAsDataURL(input.files[0]);
					$('.cont_fotodiv').css('background', 'transparent');
				}
			},

			autocompleteData: function () {

				var self = this;
				/* Degrees Autocomplete */
				var degreesSettings = {
					"async": true,
					"crossDomain": true,
					"url": self.options.apiAdminUrl + "/allDegrees",
					"method": "GET",
					"headers": {
						"token": "911ca088ab824095b82d3c98b32332e7",
					}
				}

				var degreesAll = new Array();
				$.ajax(degreesSettings).done(function (response) {
					//console.log(response.degrees[0].title);

					$(response.degrees).each(function (k, object) {
						degreesAll.push({
							'id': response.degrees[k].degreeId,
							'label': response.degrees[k].title,
							'value': response.degrees[k].title,
							'shortTitle': response.degrees[k].shortTitle
						});
					});

					$(".degrees").autocomplete({
						source: jobFunctionsAll,
						minLength: 0,
						source: function (request, response) {
							var results = $.ui.autocomplete.filter(degreesAll, request.term);
							response(results.slice(0, 10));
						},
						select: function (event, ui) {
							$(this).attr({
								'data-id': ui.item.id,
								'data-shortTitle': ui.item.shortTitle
							});
						}
					}).focus(function () {
						$(this).autocomplete("search");
					});

				});

				/* Job Functions Autocomplete */
				var jobFunctionsSettings = {
					"async": true,
					"crossDomain": true,
					"url": self.options.apiAdminUrl + "/allJobFunctions",
					"method": "GET",
					"headers": {
						"token": "911ca088ab824095b82d3c98b32332e7",
					}
				}
				console.log(self.options.apiAdminUrl + "/allJobFunctions");
				var jobFunctionsAll = new Array();
				$.ajax(jobFunctionsSettings).done(function (response) {

					$.each(response.categoryArray, function (i1, object) {
						$.each(object.categoryValues, function (i3, region) {
							jobFunctionsAll.push({
								"value": region.value,
								"id": region.id
							});
						});
					});

					$(".job-functions").autocomplete({
						minLength: 0,
						source: function (request, response) {
							var results = $.ui.autocomplete.filter(jobFunctionsAll, request.term);
							response(results.slice(0, 10));
							if (results.length <= 0) {
								$('.job-functions').attr('data-item-id', '');
							}
						},
						select: function (event, ui) {
							//console.log(ui.item)
							$('.job-functions').attr('data-item-id', ui.item.id);
						}
					}).focus(function () {
						$(this).autocomplete("search");
					});

				});

				/* gender auto complete */
				var availableTags = [
					"male",
					"female",
				];
				$(".gender").autocomplete({
					source: availableTags,
					minLength: 0
				}).on('focus', function () {
					$(this).keydown();
				});
				/* Skills Autocomplete */
				$("body").on("keydown .skills", function (e) {
					var fieldVal = e.srcElement.value;
					// console.log(fieldVal);
					if (fieldVal) {
						var skillsSettings = {
							"async": true,
							"crossDomain": true,
							"url": self.options.apiAdminUrl + "/skills?skillName=" + fieldVal,
							"method": "GET",
							"headers": {
								"token": "911ca088ab824095b82d3c98b32332e7",
							}
						}
						var skillsAll = new Array();
						$.ajax(skillsSettings).done(function (response) {
							// console.log(fieldVal, response)
							$(response.content).each(function (k, v) {
								skillsAll.push(response.content[k].skillName);
							});
							// var results = $.ui.autocomplete.filter(skillsAll, request.term);
							$(".skills").autocomplete({
								source: skillsAll,
								minLength: 0
							}).focus(function () {
								$(this).autocomplete("search", $(this).val());
							});
						});
					}

				});
				$('.phone').attr('setcharlength', function (index, value) {
					// console.log(index, value, "index,value", $(this).text().length);
					if ($(this).text().length > value && event.keyCode != 8) {
						event.preventDefault();
					}
				})
				/* Content Paste replace with plain text */
				$(".texto, .titulo2, .titulo3").bind("paste", function (e) {
					if ($(this).attr('name') == 'telephone') {
						e.preventDefault();
					} else {
						e.preventDefault();
						var maxLength = 150;
						var fieldText = $(this).text();
						var fieldTextLength = $(this).text().length;
						var text = e.originalEvent.clipboardData.getData("text/plain");
						var textLength = text.length;
						var totaLength = fieldTextLength + textLength;
						var lastIndex = maxLength - fieldTextLength;
						//console.log(lastIndex);
						//console.log(text.substring(0, lastIndex));
						text = text.substring(0, lastIndex);
						document.execCommand("insertHTML", false, text);
					}
				});

				// $('.texto, .titulo2, .titulo3').on('keydown', function(event) {
				// 	if($(this).text().length > 150 && event.keyCode != 8){
				// 		event.preventDefault();
				// 	}
				// });

				$('#inputfoto2').on('change', function () {
					self.saveUserPic();
					self.readURL(this);
				});

			},

			// --------------------------------------------------------------------

			attachEvents: function () {

				var self = this;

				$(self.elem).on("hover", function (e) {

					var $currentElement = $(this),
						$paragraphs;

					$paragraphs = $(self.elem).find("p");
					$paragraphs.addClass(self.options.itemClass).css({
						"color": "red"
					});

					self.paragraphCount = $paragraphs.length;

				});

				$('#btn_empezar').on('click', function () {
					$('#intro').remove();
					$('#edit').css({
						'opacity': 1,
						'display': 'block'
					});
					$('#menu_edicion').css({
						'transform': 'translateY(0px)'
					});
					$('#contimprimir').css({
						'opacity': 1,
						'transform': 'scale(1)'
					});
				});
				$('#menu_secciones').on('click', function () {
					$('#menu_secciones').toggleClass('menu_on');
					$('#colorPicker').removeClass('menu_on');
					// $('#hover_submenu').css({ 'opacity': 0.7, 'pointer-events': 'auto', 'display': 'block' });
				});
				$('#colorPicker').on('click', function () {
					$(this).toggleClass('menu_on');
					$('#menu_secciones').removeClass('menu_on');
					// $('#hover_submenu').css({ 'opacity': 0.7, 'display': 'block', 'pointer-events': 'auto' });

				})

				$('#hover_submenu').on('click', function () {
					$('#menu_secciones, #colorPicker').toggleClass('menu_on');
				});
				$(document.body).click(function (e) {
					$('#menu_secciones, #colorPicker').removeClass('menu_on');
				});

				$('#menu_secciones, #colorPicker').click(function (e) {
					e.stopPropagation(); // this stops the event from bubbling up to the body
				});

				$('.tgl-flat').on('click', function () {
					let option = $(this).attr('data-option');
					var acadamic = true;
					var achivements = true;
					var certifications = true;
					var github = true;
					var twitter = true;
					var website = true;
					var blog = true;

					var themeOptions = JSON.parse(localStorage.getItem('themeOptions'));

					if ($(this).is(':checked')) {
						$('#' + option + '_section').show();
						$.each(themeOptions, function (key, val) {
							if (option + "_section" == key) {
								themeOptions[key] = true;
							}
						});

					} else {
						$('#' + option + '_section').hide();
						$.each(themeOptions, function (key, val) {
							if (option + "_section" == key) {
								themeOptions[key] = false;
							}
						});
					}
					//console.log(themeOptions);
					localStorage.setItem('themeOptions', JSON.stringify(themeOptions));

				});
				$("body").on("click", ".skills-section .estrellacircular", function () {
					var skillContId = $(this).closest('.skills-data-container').attr('id');
					console.log('skillContId', skillContId);
					if ($.trim($('#' + skillContId).find('.skills').val()) != '') {
						var skillVal = parseInt($(this).find('.porcentajetexto .skill-val').text());
						// console.log(skillVal);
						var skillNewVal = skillVal + 25;

						if (skillVal <= 75) {
							$(this).find('.porcentajetexto .skill-val').text(skillNewVal + '%');
							$(this).find('.porcentajetexto .skill-val').attr('data-val', skillNewVal);
							$(this).find('.porcentaje' + skillNewVal).css('opacity', '0');
						} else {
							$(this).find('div').removeAttr('style');
							$(this).find('.porcentajetexto .skill-val').text('25%');
							$(this).find('.porcentajetexto .skill-val').attr('data-val', 25);
							//$(this).find('.porcentaje25').css('opacity', '0');
						}
					}
				});


				/* ###### Language selection ###### */
				$("body").on("click", ".progress-type-2 .color_estrellas", function () {
					let lang = $(this).attr('data-lang');
					console.log(lang);
					let langVal = $(this).attr('data-val');
					$(this).closest('.progress-type-2').find('.estrellas').removeClass('selected');
					$(this).closest('.estrellas').prevAll().addClass('selected');
					$(this).closest('.estrellas').addClass('selected');
					$('#language_' + lang).val(langVal);
				})
				$('.progress-type-2 .color_estrellas').on('click', function () {

				});

				/* ###### Remove Components ###### */

				$('.eliminar').on('click', function () {
					let componentType = $(this).attr('data-component');
					let dataId = $(this).attr('data-lang');
					if (componentType == 'language') {
						$('.language-' + dataId).fadeOut(1000);
					}
					if (componentType == 'profexp') {
						let eleLength = $('.professional-experience').length;
						(eleLength <= 2) ? $('.professional-experience').find('.eliminar').hide(): '';
						$(this).closest('.professional-experience').hide();
					}
					if (componentType == 'education') {
						let eleLength = $('.education-section').length;
						(eleLength <= 2) ? $('.education-section').find('.eliminar').hide(): '';
						$(this).closest('.education-section').hide();
					}
					if (componentType == 'acadamic') {
						let eleLength = $('.acadamic-project').length;
						(eleLength <= 2) ? $('.acadamic-project').find('.eliminar').hide(): '';
						$(this).closest('.acadamic-project').remove();
					}
					if (componentType == 'skills') {
						$(this).closest('.sortable').hide();
					}

				});

				/* ###### Add Components ###### */
				$('.clonar').on('click', function () {

					let componentType = $(this).attr('data-component');
					/* Languages */
					if (componentType == 'language') {
						let dataId = parseInt($(this).attr('data-lang')) + 1;
						if ($('.lang-contaner:visible').length >= 3) {
							$('.lang-contaner').find('.clonar').hide();
						} else {
							$('.lang-contaner').find('.clonar').show();
						}
						$('.language-' + dataId).fadeIn(1000);
					}

					/* Professional Experience */
					if (componentType == 'profexp') {
						let element = $(this).closest('.professional-experience');
						let eleLength = $('.professional-experience').length + 1;

						let dataId = parseInt($('.professional-experience:visible').length) + 1;
						$('#proExp_' + dataId).show();

						$('.professional-experience').find('.eliminar').show();

						//$($('#proExp_1').clone(true, true)).insertAfter(element).find('.date-selector').dateDropper();
						//$($('#proExp_1').clone(true, true)).insertAfter(element)						

					}

					/* Education */
					if (componentType == 'education') {
						let element = $(this).closest('.education-section');
						let eleLength = $('.education-section').length + 1;
						let dataId = parseInt($('.education-section:visible').length) + 1;
						$('#education_' + dataId).show();
						//$($('#education_1').clone(true, true)).insertAfter(element);
						// $('.education-section').find('.eliminar').show();
						//$('.education-section:last').attr('id','education_'+eleLength);

						/*$('.education-section').each(function (k, v) {
							let id = k + 1;
							$(this).attr('id', 'education_' + id);
						});*/
					}

					/* Acadamic */
					if (componentType == 'acadamic') {
						let element = $(this).closest('.acadamic-project');
						let eleLength = $('.acadamic-project').length + 1;
						let dataId = parseInt($('.acadamic-project:visible').length) + 1;
						$('#acadamicPro_' + dataId).show();
						//$($('#acadamicPro_1').clone(true, true)).insertAfter(element);
						// $('.acadamic-project').find('.eliminar').show();
						//$('.acadamic-project').last().attr('id','acadamicPro_'+eleLength);

						/*$('.acadamic-project').each(function (k, v) {
							let id = k + 1;
							$(this).attr('id', 'acadamicPro_' + id);
						});*/
					}

					/* Skills */
					if (componentType == 'skills') {
						let eleLength = $('.secondary-skills:visible').length + 1;
						let skillId = eleLength + 5;
						$('#skilsContainer_' + skillId).show();
						$('.secondary-skills').find('.eliminar').show();
					}
				});

				/* Color Picker */
				$('.color-picker').on('click', function () {
					// console.log('color-pickerrr');

					$('.menu_item.menu_on').addClass("menu_off");
					$('body, #color_selected, #contimprimir').attr('class', '');
					$('#color_selected').addClass('color_picker');
					$('#color_selected').addClass($(this).attr('id'));
					$('.color-picker').removeClass('picker_activo');
					$(this).addClass('picker_activo');
					let themeClass = 'theme-' + $(this).attr('id');
					$('body, #contimprimir').addClass(themeClass);
					localStorage.setItem('themeStyle', themeClass);
					$('#hover_submenu').css({
						'opacity': 0.7,
						'display': 'none',
						'pointer-events': 'auto'
					});
				});

				/* Font style picker */
				$('#selectFontFamily').on('change', function () {
					if ($(this).val() == 'font-1') {
						$('body').css({
							'font-family': "'Source Sans Pro', sans-serif"
						});
						localStorage.setItem('fontStyle', 'font-1');
					}
					if ($(this).val() == 'font-2') {
						$('body').css({
							'font-family': "'Merriweather', serif"
						});
						localStorage.setItem('fontStyle', 'font-2');
					}
					if ($(this).val() == 'font-3') {
						$('body').css({
							'font-family': "'Saira Semi Condensed', sans-serif"
						});
						localStorage.setItem('fontStyle', 'font-3');
					}
					if ($(this).val() == 'font-4') {
						$('body').css({
							'font-family': "'Roboto', sans-serif"
						});
						localStorage.setItem('fontStyle', 'font-4');
					}
					if ($(this).val() == 'font-5') {
						$('body').css({
							'font-family': "'Lato', sans-serif"
						});
						localStorage.setItem('fontStyle', 'font-4');
					}
				});
				/*
				$('#preview_btn').on('click', function(){
					window.location.href="./preview.html";
				});
				*/
				let applicantData;
				$('#previewResume, #saveResume, #resumeBack,#downloadResume').on('click', function (event) {

					let formType = $(this).attr('data-type');
					console.log("formType", formType);
					localStorage.setItem('formType', formType);
					/*
					$('.titulo3, .titulo2, .texto').each(function(){
						var placeholder = $(this).attr('placeholder');
						var firldVal = $(this).text();
						if(placeholder == firldVal){
							$(this).text('');
						}
					});
					*/

					let pic = $('input[name="pic"]').val();
					let firstname = $('p[name="firstname"]').text();
					let lastname = $('p[name="lastname"]').text();
					var jobFunctionId = parseInt($('input[name="jobfunctions"]').attr('data-item-id'));
					let jobFunctionName = $('input[name="jobfunctions"]').val();
					let skill_name = $('p[name="skill_name"]').text();
					let skill_value = $('p[name="skill_value"]').text();

					let aboutme = ($('p[name="aboutme"]').attr('placeholder') != $('p[name="aboutme"]').text() ? $('p[name="aboutme"]').text() : '');
					let userJobTitle = ($('p[name="title"]').attr('placeholder') != $('p[name="title"]').text() ? $('p[name="title"]').text() : '');
					let totalexperience = ($('p[name="totalexperience"]').attr('placeholder') != $('p[name="totalexperience"]').text() ? $('p[name="totalexperience"]').text() : '');
					let location = ($('p[name="location"]').attr('placeholder') != $('p[name="location"]').text() ? $('p[name="location"]').text() : '');
					let date_of_birth = ($('input#dob').val() ? $('input#dob').val() : '');
					let languages = ($('p[name="languages"]').attr('placeholder') != $('p[name="languages"]').text() ? $('p[name="languages"]').text() : '');
					let gender = ($(".gender option:selected").text() ? $(".gender option:selected").text() : '');
					let email = ($('p[name="email"]').attr('placeholder') != $('p[name="email"]').text() ? $('p[name="email"]').text() : '');
					let telephone = ($('p[name="telephone"]').attr('placeholder') != $('p[name="telephone"]').text() ? $('p[name="telephone"]').text() : '');
					let user_linkdin = ($('p[name="user_linkdin"]').attr('placeholder') != $('p[name="user_linkdin"]').text() ? $('p[name="user_linkdin"]').text() : '');
					let user_github = ($('p[name="user_github"]').attr('placeholder') != $('p[name="user_github"]').text() ? $('p[name="user_github"]').text() : '');
					let user_twitter = ($('p[name="user_twitter"]').attr('placeholder') != $('p[name="user_twitter"]').text() ? $('p[name="user_twitter"]').text() : '');
					let user_website = ($('p[name="user_website"]').attr('placeholder') != $('p[name="user_website"]').text() ? $('p[name="user_website"]').text() : '');
					let user_blog = ($('p[name="user_blog"]').attr('placeholder') != $('p[name="user_blog"]').text() ? $('p[name="user_blog"]').text() : '');
					let achivements = ($('p[name="achivements"]').attr('placeholder') != $('p[name="achivements"]').text() ? $('p[name="achivements"]').text() : '');
					let certifications = ($('p[name="certifications"]').attr('placeholder') != $('p[name="certifications"]').text() ? $('p[name="certifications"]').text() : '');


					let shareName = localStorage.getItem('shareName');
					// var userData = JSON.parse(localStorage.getItem('userData'));
					var sessionId = localStorage.getItem(btoa('sessionId_' + window.location.origin));
					var userId = userData.userId;
					var fontStyle = $('#selectFontFamily').val();

					if (jobFunctionId) {
						jobFunctionId = jobFunctionId;
						jobFunctionName = jobFunctionName
					} else {
						jobFunctionId = '';
						jobFunctionName = '';
					}

					applicantData = {
						"firstname": firstname,
						"pic": "/5647/1631033876795164.jpg",
						"user_website": user_website,
						"userJobTitle": userJobTitle,
						"user_twitter": user_twitter,
						"coverLetter": aboutme.trim(),
						"email": email,
						"deviceType": "NA",
						"user_blog": user_blog,
						"joining_info": "10-09-2017",
						"user_linkdin": user_linkdin,
						"telephone": telephone,
						"current_salary": 0,
						"user_github": user_github,
						"lastname": lastname,
						"user_behance": "sdfffffffff",
						"expDisplay": totalexperience,
						"location": location,
						"gender": gender,
						"date_of_birth": date_of_birth,
						"interests": achivements,
						"certifications": certifications,
						"refferences": "dgsfdwdf",
						//"share_name": shareName,
						//"userPreferencesResume": {},
						"jobfunctions": [],
						"academic": [],
						"experience": [],
						"education": [],
						"languages": [],
						"skill": [],
					};

					// if (jobFunctionId != '') applicantData.jobfunctions.push(jobFunctionId);

					/* Professional Experience object  */
					$('.professional-experience:visible').each(function (i, v) {
						var id = $(this).attr('id');
						var exp_endDate = $('#' + id).find('input[name="exp_endDate"]').val();
						var exp_startDate = $('#' + id).find('input[name="exp_startDate"]').val();
						var exp_jobTitle = ($('#' + id).find('p[name="exp_jobTitle"]').attr('placeholder') != $('#' + id).find('p[name="exp_jobTitle"]').text()) ? $('#' + id).find('p[name="exp_jobTitle"]').text() : '';
						var exp_location = ($('#' + id).find('p[name="exp_location"]').attr('placeholder') != $('#' + id).find('p[name="exp_location"]').text()) ? $('#' + id).find('p[name="exp_location"]').text() : '';
						var exp_company = ($('#' + id).find('p[name="exp_company"]').attr('placeholder') != $('#' + id).find('p[name="exp_company"]').text()) ? $('#' + id).find('p[name="exp_company"]').text() : '';
						var exp_description = ($('#' + id).find('p[name="exp_description"]').attr('placeholder') != $('#' + id).find('p[name="exp_description"]').text()) ? $('#' + id).find('p[name="exp_description"]').text() : '';

						// if (exp_endDate != '' || exp_startDate != '' || exp_jobTitle != '' || exp_location != '' || exp_company != '' || exp_description != '') {
						applicantData.experience.push({
							"endDate": exp_endDate,
							"startDate": exp_startDate,
							"jobTitle": exp_jobTitle.trim(),
							"isPresent": true,
							"location": exp_location,
							"company": exp_company,
							"description": exp_description.trim()
						});
						// }
					});

					/* Education object  */
					$('.education-section:visible').each(function (i, v) {
						var id = $(this).attr('id');
						let fieldOfStudy = ($('#' + id).find('p[name="fieldOfStudy"]').attr('placeholder') != $('#' + id).find('p[name="fieldOfStudy"]').text()) ? $('#' + id).find('p[name="fieldOfStudy"]').text() : '';
						let edu_institution = ($('#' + id).find('p[name="edu_institution"]').attr('placeholder') != $('#' + id).find('p[name="edu_institution"]').text()) ? $('#' + id).find('p[name="edu_institution"]').text() : '';
						let edu_location = ($('#' + id).find('p[name="edu_location"]').attr('placeholder') != $('#' + id).find('p[name="edu_location"]').text()) ? $('#' + id).find('p[name="edu_location"]').text() : '';
						let edu_description = ($('#' + id).find('p[name="edu_description"]').attr('placeholder') != $('#' + id).find('p[name="edu_description"]').text()) ? $('#' + id).find('p[name="edu_description"]').text() : '';
						let edu_startDate = $('#' + id).find('input[name="edu_startDate"]').val();
						let edu_endDate = $('#' + id).find('input[name="edu_endDate"]').val();
						let degree_title = $('#' + id).find('input[name="degree_title"]').val();
						console.log(degree_title);
						let degreeId = $('#' + id).find('input[name="degree_title"]').attr('data-id');
						let shortTitle = $('#' + id).find('input[name="degree_title"]').attr('data-shortTitle');

						// if (fieldOfStudy != '' || edu_institution != '' || edu_location != '' || edu_description != '' || edu_startDate != '' || edu_endDate != '' || degree_title != '') {
						applicantData.education.push({
							"institution": edu_institution.trim(),
							"degree": {
								"degreeId": degreeId,
								"shortTitle": shortTitle,
								"title": degree_title
							},
							"isPresent": false,
							"location": edu_location,
							"fieldOfStudy": fieldOfStudy,
							"description": edu_description.trim(),
							"startDate": edu_endDate,
							"endDate": edu_startDate
						});
						// } else {
						// 	$('#newErrorMessageID .message-text').html('Some thing wen')
						// 	$('#newErrorMessageID').fadeIn().delay(2000)
						// 		.fadeOut('slow', function () {
						// 			//$("#saveResume").bind("click");
						// 			$('#saveResume').removeAttr('pointer-events');
						// 		});
						// }
						// else if (fieldOfStudy == '' || edu_institution == '' || edu_location == '' || edu_description == '' || edu_startDate == '' || edu_endDate == '' || degree_title == '') {
						// 	var cl = $('.education-sections .education-section').children().length;
						// 	for (let index = 0; index < cl; index++) {
						// 		if ($('.education-sections .education-section:nth-child(' + index + ')').css('display') == 'none') {
						// 			console.log("no education", index);
						// 			$('.education-sections .education-section:nth-child(' + index + ')').css('display','none');
						// 		}
						// 	}

						// }
					});

					/* Academic object  */
					$('.acadamic-project:visible').each(function (i, v) {
						var id = $(this).attr('id');
						let acd_role = ($('#' + id).find('p[name="acd_role"]').attr('placeholder') != $('#' + id).find('p[name="acd_role"]').text()) ? $('#' + id).find('p[name="acd_role"]').text() : '';
						let acd_projectTitle = ($('#' + id).find('p[name="acd_projectTitle"]').attr('placeholder') != $('#' + id).find('p[name="acd_projectTitle"]').text()) ? $('#' + id).find('p[name="acd_projectTitle"]').text() : '';
						let acd_institution = ($('#' + id).find('p[name="acd_institution"]').attr('placeholder') != $('#' + id).find('p[name="acd_institution"]').text()) ? $('#' + id).find('p[name="acd_institution"]').text() : '';
						let acd_location = ($('#' + id).find('p[name="acd_location"]').attr('placeholder') != $('#' + id).find('p[name="acd_location"]').text()) ? $('#' + id).find('p[name="acd_location"]').text() : '';
						let acd_description = ($('#' + id).find('p[name="acd_description"]').attr('placeholder') != $('#' + id).find('p[name="acd_description"]').text()) ? $('#' + id).find('p[name="acd_description"]').text() : '';
						let acd_startDate = $('#' + id).find('input[name="acd_startDate"]').val();
						let acd_endDate = $('#' + id).find('input[name="acd_endDate"]').val();

						// if (acd_role != '' || acd_projectTitle != '' || acd_institution != '' || acd_location != '' || acd_description != '' || acd_startDate != '' || acd_endDate != '') {
						applicantData.academic.push({
							"institution": acd_institution,
							"role": acd_role,
							"endDate": acd_endDate,
							"startDate": acd_startDate,
							"isPresent": true,
							"location": acd_location,
							"projectTitle": acd_projectTitle.trim(),
							"description": acd_description.trim()
						});
						// }
					});

					/* Skills object  */

					var inp = $('.skills-data-container:visible').find('input[name="skill_name"]').val();
					var emptySkill = (inp.length == 0) ? false : true;

					$('.skills-data-container:visible').each(function (i, v) {
						var id = $(this).attr('id');
						console.log(id, 'id');
						var skill_name = $('#' + id).find('input[name="skill_name"]').val();
						var skill_value = parseInt($('#' + id).find('.porcentajetexto .skill-val').attr('data-val'));
						console.log(i, skill_name, skill_value, "skill_value");
						if (emptySkill) {
							applicantData.skill.push({
								"skillName": skill_name,
								"skill_percentage": skill_value
							});
						}
					});

					/* Language object  */
					$('.lang-contaner:visible').each(function (i, v) {
						var id = $(this).attr('id');
						let languages = $(this).find('p[name="languages"]').text();
						let language_value = $(this).find('input[name="language_value"]').val();
						applicantData.languages.push({
							"lngName": languages,
							"lng_percentage": language_value
						});
					});
					if (validateFormData(applicantData)) {
						console.log(validateFormData(applicantData));
						if (formType == 'save' || formType == 'back') {
							$('.loading-container').fadeIn();
							$('#saveResume').attr('pointer-events', 'none');
							//$('#saveResume').off('click');

							var settings = {
								"async": true,
								"crossDomain": true,
								"url": self.options.apiUrl + "/user/" + userId + "/updateProfileResume",
								"type": "POST",
								"headers": {
									"token": sessionId,
									"content-type": "application/json"
								},
								"processData": false,
								"data": JSON.stringify(applicantData),
								error: function (e) {
									console.log(e);
								},
								dataType: "json",
								contentType: "application/json"
							}
							console.log(settings.data);
							// downloadResume
							$.ajax(settings).done(function (response) {

								if (response.status == 'success') {
									$('#newSuccessMessageID .message-text').html(response.msg);
									$('.loading-container').fadeOut();
									$('#newSuccessMessageID').fadeIn().delay(2000)
										.fadeOut('slow', function () {
											$('#saveResume').removeAttr('pointer-events');
										});
									localStorage.setItem(encrypt('userData', sessionId), encrypt(JSON.stringify(response.data), sessionId));
									// localStorage.setItem('userData', JSON.stringify(response.data));
									localStorage.setItem(encrypt('userData', localStorage.getItem(btoa('sessionId_' + window.location.origin))), encrypt(JSON.stringify(response.data), localStorage.getItem(btoa('sessionId_' + window.location.origin))));


									var logoImg = $('input[name="pic"]').get(0).files[0];
									if (logoImg) {
										self.saveUserPic();
									}
									self.savePDF();
									if (formType == 'back') {
										window.history.back();
									}
									self.getShareNameFile();

								} else {
									$('.loading-container').fadeOut();
									$('#newErrorMessageID .message-text').html(response.msg)
									$('#newErrorMessageID').fadeIn().delay(2000)
										.fadeOut('slow', function () {
											//$("#saveResume").bind("click");
											$('#saveResume').removeAttr('pointer-events');
										});
									if (formType == 'back') {
										window.history.back();
									}
								}

							});


						} else {
							let previewData = applicantData;

							previewData.jobfunctions.splice(0, 1, {
								'jobFunctionId': jobFunctionId,
								'jobFunctionName': jobFunctionName
							});
							previewData.userId = userData.userId;
							localStorage.setItem('previewData', JSON.stringify(previewData));
						}
					}
				});
				$("#downloadResume").click(function () {
					if (validateFormData(applicantData)) {
						$('.loading-container').show();
						// var userStatus = localStorage.getItem('isPremiumUser');
						console.log(userStatus, 'downloadResume')
						if (userData.paidUser) {
							html2canvas(document.getElementById("contimprimir"), {
								//allowTaint: true,
								//logging: true,
								//taintTest: false,
								onrendered: function (canvas) {
									var quality = [0.0, 1.0];
									var imgData = canvas.toDataURL('image/png', quality);
									var doc = new jsPDF('p', 'in', 'a4');
									var myImage = new Image();
									myImage.src = imgData;
									myImage.onload = function () {
										console.log('Report Image URL: ', imgData);
										doc.addImage(imgData, 'PNG', -0.1, 0);
										doc = addWaterMark(doc);
										doc = addWaterMark(doc);
										doc.save(userId + '_resume.pdf');
										$('.loading-container').delay(2000).fadeOut();
									};
								}
							});
						} else {
							window.location.href = window.origin + '/pricing.html';
						}
					}
				});
				$('.titulo3, .titulo2, .texto').on('focus', function () {
					var placeholder = $(this).attr('placeholder');
					var firldVal = $(this).text();
					if (placeholder == firldVal) {
						$(this).text('');
					}
				});
				$('.titulo3, .titulo2, .texto').on('focusout', function () {
					var placeholder = $(this).attr('placeholder');
					var firldVal = $(this).text();
					if (firldVal.length <= 0) {
						$(this).text(placeholder);
					}
				});

				$('.fname').on('keydown paste', function (event) {
					if ($(this).text().length >= 50 && event.keyCode != 8) {
						event.preventDefault();
					}
				});

				$('p[name="telephone"]').on('keypress', function (e) {
					if (String.fromCharCode(e.keyCode).match(/[^0-9+]/g)) return false;
				});

				$(self.elem).on("click", function (e) {});

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
	$('#education_check').on('click', function () {
		console.log($(this).is(":checked"));
		if ($(this).is(":checked")) {
			$('#education_section').css('display', 'none')
		} else {
			$('#education_section').css('display', 'block')
		}
	})
	$('#exp_check').on('click', function () {
		console.log($(this).is(":checked"));
		if ($(this).is(":checked")) {
			$('#experience_section').css('display', 'none')
		} else {
			$('#experience_section').css('display', 'block')
		}
	})
	$('#skills_check').on('click', function () {
		console.log($(this).is(":checked"));
		if ($(this).is(":checked")) {
			$('#skills_section').css('display', 'none')
		} else {
			$('#skills_section').css('display', 'block')
		}
	})
})(jQuery);
var imgData = window.location.origin + '/assets/images/resume/watermarkworkruit.png';
var base64Img;
toDataURL(imgData, function (dataUrl) {
	// console.log('RESULT:', dataUrl)
	base64Img = dataUrl;
})

function addWaterMark(doc) {
	var totalPages = doc.internal.getNumberOfPages();
	console.log(base64Img, "base64Img");
	for (i = 1; i <= totalPages; i++) {
		doc.setPage(i);
		doc.addImage(base64Img, 'PNG', 1.5, 2);
		//   doc.setTextColor(150);
		//   doc.text(50, doc.internal.pageSize.height - 100, 'abcdefghijklmnopqrstuvwxyz');
	}
	return doc;
}

function toDataURL(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function () {
		var reader = new FileReader();
		reader.onloadend = function () {
			callback(reader.result);
		}
		reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}

function validateFormData(applicantData) {

	if (applicantData.education.length) {
		var educationValidArray = applicantData.education.filter(function (item, index) {
			return !item.institution || !item.location || !item.degree.title || !item.fieldOfStudy || !item.endDate || !item.startDate;
		});
		console.log(educationValidArray);
		if (!!educationValidArray.length) {
			var errorMessage = "Please fill the all details in education";
			$('#newErrorMessageID .message-text').html(errorMessage)
			$('#newErrorMessageID').fadeIn().delay(2000)
				.fadeOut('slow', function () {
					$('#saveResume').removeAttr('pointer-events');
				});
			return false;
		} else {
			applicantData.education = applicantData.education.map(function (item, index) {
				return {
					degree: item.degree,
					endDate: item.endDate,
					fieldOfStudy: item.fieldOfStudy,
					institution: item.institution,
					isPresent: item.isPresent,
					location: item.location,
					startDate: item.startDate,
					description: item.description
				};
			});
		}
	}
	if (applicantData.experience.length) {
		experienceValidArray = applicantData.experience.filter(function (item, index) {
			return !item.company || !item.endDate || !item.jobTitle || !item.location || !item.startDate;
		});
		console.log(experienceValidArray);
		if (!!experienceValidArray.length) {
			var errorMessage = "Please fill the all details in experience";
			$('#newErrorMessageID .message-text').html(errorMessage)
			$('#newErrorMessageID').fadeIn().delay(2000)
				.fadeOut('slow', function () {
					$('#saveResume').removeAttr('pointer-events');
				});
			return false;
		} else {
			applicantData.experience = applicantData.experience.map(function (item, index) {
				return {
					company: item.company,
					description: item.description,
					endDate: item.endDate,
					isPresent: item.isPresent,
					jobTitle: item.jobTitle,
					location: item.location,
					startDate: item.startDate
				};
			});
		}
	}
	if (applicantData.academic.length) {
		academicValidArray = applicantData.academic.filter(function (item, index) {
			return !item.description || !item.endDate || !item.institution || !item.location || !item.startDate || !item.projectTitle || !item.role;
		});
		console.log(academicValidArray);
		if (!!academicValidArray.length) {
			var errorMessage = "Please fill the all details in academic project";
			$('#newErrorMessageID .message-text').html(errorMessage)
			$('#newErrorMessageID').fadeIn().delay(2000)
				.fadeOut('slow', function () {
					$('#saveResume').removeAttr('pointer-events');
				});
			return false;
		} else {
			applicantData.academic = applicantData.academic.map(function (item, index) {
				return {
					description: item.description,
					endDate: item.endDate,
					institution: item.institution,
					isPresent: item.isPresent,
					location: item.location,
					projectTitle: item.projectTitle,
					role: item.role,
					startDate: item.startDate
				};
			});
		}
	}
	if (applicantData.skill.length) {
		academicValidArray = applicantData.skill.filter(function (item, index) {
			return !item.skillName || !item.skill_percentage;
		});
		console.log(academicValidArray);
		if (!!academicValidArray.length) {
			var errorMessage = "Please fill the skills";
			$('#newErrorMessageID .message-text').html(errorMessage)
			$('#newErrorMessageID').fadeIn().delay(2000)
				.fadeOut('slow', function () {
					$('#saveResume').removeAttr('pointer-events');
				});
			return false;
		} else {
			applicantData.skill = applicantData.skill.map(function (item, index) {
				return {
					skillName: item.skillName,
					skill_percentage: item.skill_percentage
				};
			});
		}
	}
	return true;
}