function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

function initContactForm() {
  var submitButton    = document.querySelector('.js-contact-form-button');
  var inputs          = Array.prototype.slice.call(document.querySelectorAll('.contact-form-input'));
  var inputName       = document.querySelector('.js-contact-form-name');
  var inputEmail      = document.querySelector('.js-contact-form-email');
  var inputMessage    = document.querySelector('.js-contact-form-message');
  var feedbacks       = Array.prototype.slice.call(document.querySelectorAll('.contact-form-feedback'));
  var feedbackFillAll = document.querySelector('.js-contact-form-fill-all');
  var feedbackSuccess = document.querySelector('.js-contact-form-success');
  var feedbackFailure = document.querySelector('.js-contact-form-failure');

  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    var url = '//formspree.io/nutrianni@gmail.com';
    var data = {
      name:     inputName.value,
      message:  inputMessage.value,
      email:    inputEmail.value,
      _subject: "Nutrianni Yhteydenotto"
    };

    if (data.name && data.email && data.message) {
      var params = Object.keys(data).map(function(key) {
        return key + '=' + encodeURIComponent(data[key]);
      }).join('&');
      var request = new XMLHttpRequest();
      request.open('POST', url, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.setRequestHeader('Accept', 'application/json');
      request.send(params);
      request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
          hideAll(feedbacks);
          show(feedbackSuccess);
          inputName.value = '';
          inputMessage.value = '';
          inputEmail.value = '';
        } else if (request.readyState === 4 && request.status !== 200) {
          show(feedbackFailure);
        }
      }
    } else {
      hideAll(feedbacks);
      show(feedbackFillAll);
    }
  });

  inputs.forEach(function(input) {
    input.addEventListener('focus', function () {
      hideAll(feedbacks);
    });
  });
}

function show(element) {
  element.style.display = 'block';
}

function hideAll(elements) {
  elements.forEach(function(element) {
    element.style.display = 'none';
  });
}

ready(initContactForm);
