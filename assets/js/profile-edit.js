/* Update Password functionality */
var localUserData = JSON.parse(decrypt(localStorage.getItem(encrypt('userData', localStorage.getItem('sessionId'))), localStorage.getItem('sessionId')));

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
    // debugger;
    doPostWithEncrypt(baseApiUrl + "/user/" + userId + "/" + serviceUrls.post.updateProfileResume, profileData).then(response => {
      console.log(response);
      if (response.status == "success") {
        // localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem(encrypt('userData', sessionId), encrypt(JSON.stringify(response.data), sessionId));
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
      // localStorage.setItem('userData', JSON.stringify(response.data));
      localStorage.setItem(encrypt('userData', sessionId), encrypt(JSON.stringify(response.data), sessionId));
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
// getCollegesInfo
$(function () {
  $('#load-header').load('../includes/user-header.html');
  $('.account-page').paraCount();
  $(window).ready(function () {
    localUserData.email_verified === 0 ? $('#newSuccessMessageID').css(
      'display',
      'none') : $('.preview_btn').css('display', 'block');
    // console.log(localStorage.getItem('isPremiumUser'));
    if (localStorage.getItem('isPremiumUser') === 'true') {
      $('.premium-feature').removeClass('d-none');
    } else {
      $('.trail-feature').removeClass('d-none');
    }
    var planDetails = localUserData.planDetails;
    if (localUserData) {
      if (!planDetails.emailVerified) {
        $('.tabs-container').addClass('mt-5');
      }
    }
  })
  // console.log(localStorage.getItem('previewData')) newSuccessMessageID
  const userPlanStatus = JSON.parse(localStorage.getItem('userPlanStatus'));
  localStorage.getItem('previewData') === null ? $('.preview_btn').css('display', 'none') : $('.preview_btn')
    .css('display', 'inline-block')
  doGetWithEncrypt(baseResumeApiUrl + resumeServiceUrls.get.getCollegesInfo).then(response => {
    console.log(response);
    for (let index = 0; index < response.collegesInfo.length; index++) {
      const element = response.collegesInfo[index];
      // console.log(element);
      var clgInfo = btoa(JSON.stringify({
        collegeName: element.title,
        collegeLogo: element.logo
      }));
      var option = `<option value="${clgInfo}" data-clgLogo="${element.logo}">${element.title}</option>`
      $('#collageName').append(option)
      var userData = localUserData;
      var clgInfo2 = btoa(JSON.stringify({
        collegeName: userData.collegeName,
        collegeLogo: userData.collegeLogo
      }));
      console.log("clgInfo2", clgInfo2);
      $('#collageName').val(clgInfo2);
    }
    var option = `<option value="" data-clgLogo="">NA</option>`
    $('#collageName').append(option)
  });

  $('.loading-container').delay(1000).fadeOut();

});
$(function () {
  $('.account-page').paraCount();
});

function storeTheImage() {
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
    $('.localStorage-output').html(window.localStorage.getItem('imageStoreData'));
    $('.cont_fotodiv').css('background', 'transparent');
  } catch (e) {
    console.log("Storage failed: " + e);
  }
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#image-preview').show();
      $('#image-preview').attr('src', e.target.result);
      storeTheImage();
    }
    reader.readAsDataURL(input.files[0]);
  }
}

// $('#image-preview').attr('src', window.localStorage.getItem('imageStoreData'));

$('#inputfoto2').on('change', function () {
  readURL(this);
});