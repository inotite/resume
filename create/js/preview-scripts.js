// plug it in, plug it in
(function ($) {

	var paraCount = function () {

		return {

			options: {
				itemClass: 'awesome',
				baseUrl: "https://devresume.workruit.com",
				navPath: "",
				apiUrl: "https://stageapi.workruit.com/api",
				apiAdminUrl: "https://stageapi.workruit.com/admin",
				callMe: function () {
					console.log("ring, ring...");
				}
			},

			// --------------------------------------------------------------------

			init: function (options, element) {
				this.options = $.extend(this.options, options);
				this.elem = element;
				this.getLocalStorageData();
			},

			// --------------------------------------------------------------------

			getLocalStorageData: function () {

				var self = this;
				var urlArr = ['login', 'signup', 'forgotPassword', 'home', 'account', 'share'];
				$.each(urlArr, function(index, value){
				   if(window.location.href.indexOf('index.html') <= -1) {
					   if(window.location.href.indexOf(value) >= 0) {
						   window.location = self.options.baseUrl+'/'+value+'/index.html';
					   }
				   }
			   	});

				let sessionId = localStorage.getItem('sessionId');
				//console.log(userData.firstname);
				if (!sessionId) {
					//console.log("sessionId ::::::"+sessionId);
					window.location.href = "../index.html";
				} else {
					var fontStyle = localStorage.getItem('fontStyle');
					var themeStyle = localStorage.getItem('themeStyle');
					var fromPage = localStorage.getItem('fromPage');
					let formType = localStorage.getItem('formType');
					var userData = JSON.parse(localStorage.getItem('previewData'));
					console.log("userData",userData);
					var themeOptions = JSON.parse(localStorage.getItem('themeOptions'));
					//console.log(userData);
					$('body').addClass(themeStyle);
					if(fontStyle == 'font-1'){
						$('body').css({'font-family': "'Source Sans Pro', sans-serif"})
					}
					if(fontStyle == 'font-2'){
						$('body').css({'font-family': "'Merriweather', serif"})
					}
					if(fontStyle == 'font-3'){
						$('body').css({'font-family': "'Saira Semi Condensed', sans-serif"})
					}
					console.log(themeOptions.blog_section);
					!(themeOptions.acadamic_section) ? $('#acadamic_section').hide() : $('#acadamic_section').show()
					!(themeOptions.achivements_section) ? $('#achivements_section').hide() : $('#achivements_section').show()
					!(themeOptions.certifications_section) ? $('#certifications_section').hide() : $('#certifications_section').show()
					!(themeOptions.github_section) ? $('#github_section').hide() : $('#github_section').show()
					!(themeOptions.twitter_section) ? $('#twitter_section').hide() : $('#twitter_section').show()
					!(themeOptions.website_section) ? $('#website_section').hide() : $('#website_section').show()
					!(themeOptions.blog_section) ?  $('#blog_section').hide() : $('#blog_section').show()

					$('p[name="firstname"]').text(userData.firstname);
					$('p[name="lastname"]').text(userData.lastname);
					$('input[name="jobfunctions"]').val(userData.jobfunctions[0].jobFunctionName);
					//$('input[name="jobfunctions"]').attr('data-item-id', jobFunctionId);
					$('p[name="aboutme"]').text(userData.coverLetter);
					$('p[name="title"]').text(userData.userJobTitle);
					$('p[name="totalexperience"]').text(userData.expDisplay);
					$('p[name="location"]').text(userData.location);
					$('p[name="date_of_birth"]').text(userData.date_of_birth);
					$('p[name="languages"]').text();
					$('p[name="gender"]').text(userData.gender);
					$('p[name="email"]').text(userData.email);
					$('p[name="telephone"]').text(userData.telephone);
					$('p[name="user_linkdin"]').text(userData.user_linkdin);
					$('p[name="user_github"]').text(userData.user_github);
					$('p[name="user_twitter"]').text(userData.user_twitter);
					$('p[name="user_blog"]').text(userData.user_blog);
					$('p[name="user_website"]').text(userData.user_website);
					$('p[name="achivements"]').text(userData.interests);
					$('p[name="certifications"]').text(userData.certifications);

					var pic = localStorage.getItem('imageStore');
					var picpath = pic.search('1631033876795164.jpg');
					var userId = userData.userId;
					
					if(picpath > -1 || pic == ''){
						console.log('dummy');
						$('#image-preview').hide();
					}else{
						//console.log('original');
						$('#image-preview').attr('src', pic);
						$('#image-preview').show();
						// $('.cont_fotodiv').css('background', 'transparent');
					}

					/* Experience object  */
					$(userData.experience).each(function (i, v) {
						var id = 'proExp_' + (i + 1);
						$('#' + id).show();
						$('#' + id).find('input[name="exp_endDate"]').val(userData.experience[i].endDate);
						$('#' + id).find('input[name="exp_startDate"]').val(userData.experience[i].startDate);
						$('#' + id).find('p[name="exp_jobTitle"]').text(userData.experience[i].jobTitle);
						$('#' + id).find('p[name="exp_location"]').text(userData.experience[i].location);
						$('#' + id).find('p[name="exp_company"]').text(userData.experience[i].company);
						$('#' + id).find('p[name="exp_description"]').text(userData.experience[i].description);
					});

					/* Education object  */
					$(userData.education).each(function (i, v) {
						var id = 'education_' + (i + 1);
						$('#' + id).show();
						$('#' + id).find('p[name="fieldOfStudy"]').text(userData.education[i].fieldOfStudy);
						$('#' + id).find('p[name="edu_institution"]').text(userData.education[i].institution);
						$('#' + id).find('p[name="edu_location"]').text(userData.education[i].location);
						$('#' + id).find('input[name="edu_startDate"]').val(userData.education[i].startDate);
						$('#' + id).find('input[name="edu_endDate"]').val(userData.education[i].endDate);
						$('#' + id).find('p[name="edu_description"]').text(userData.education[i].description);
						$('#' + id).find('input[name="degree_title"]').val(userData.education[i].degree.title);
						$('#' + id).find('input[name="degree_title"]').attr('data-id', userData.education[i].degree.degreeId);
						$('#' + id).find('input[name="degree_title"]').attr('data-shorttitle', userData.education[i].degree.shortTitle);
					});

					/* Academic object  */
					$(userData.academic).each(function (i, v) {
						var id = 'acadamicPro_' + (i + 1);
						$('#' + id).show();
						$('#' + id).find('p[name="acd_role"]').text(userData.academic[i].role);
						$('#' + id).find('p[name="acd_projectTitle"]').text(userData.academic[i].projectTitle);
						$('#' + id).find('p[name="acd_institution"]').text(userData.academic[i].institution);
						$('#' + id).find('p[name="acd_location"]').text(userData.academic[i].location);
						$('#' + id).find('input[name="acd_startDate"]').val(userData.academic[i].startDate);
						$('#' + id).find('input[name="acd_endDate"]').val(userData.academic[i].endDate);
						$('#' + id).find('p[name="acd_description"]').text(userData.academic[i].description);
					});

					/* Skills object  */
					var percentageDevision = 25;
					$(userData.skill).each(function (i, v) {
						var id = 'skilsContainer_' + (i + 1);
						$('#' + id).show();
						$('#' + id).find('input[name="skill_name"]').val(userData.skill[i].skillName);
						$('#' + id).find('span[name="skill_value"]').text(parseInt(userData.skill[i].skill_percentage)+"%");

						var percentageVal = userData.skill[i].skill_percentage / percentageDevision;
						for (j = 1; j <= percentageVal; j++) {
							$('#' + id).find('.porcentaje' + j * 25).css('opacity', 0);
						}
					});

					/* Language object  */
					$(userData.languages).each(function (i, v) {
						var id = i + 1;
						$('.language-' + id).show();
						$('#langTitle_' + id).text(userData.languages[i].lngName);
						$('#language_' + id).val(userData.languages[i].lng_percentage);

						var percentageVal = userData.languages[i].lng_percentage / percentageDevision;
						for (j = 1; j <= percentageVal; j++) {
							$('.language-' + id).find('.pos' + j).addClass('selected');
						}
					});

					// $('.loading-container').delay(2000).fadeOut();
				}

				$("#downloadResume").click(function () {
					$('.loading-container').show();
					html2canvas(document.getElementById("contimprimir"), {
						onrendered: function (canvas) {
							var quality = [0.0, 1.0];
							var imgData = canvas.toDataURL('image/png', quality);
							//console.log('Report Image URL: '+imgData);
							var doc = new jsPDF('p', 'in', 'a3');
							//var doc = new jsPDF('p', 'mm', [297, 210]); //210mm wide and 297mm high
							doc.addImage(imgData, 'PNG', -0.1, 0);
							doc.save(userId + '_resume.pdf');
							$('.loading-container').delay(2000).fadeOut();
						}
					});
				});

			},
			someMethod: function () {
				//alert('someMethod called');
				return $(this.elem); // for chaining

			},

		};
	}
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