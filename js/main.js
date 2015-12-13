ready(init);

function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

function init() {
  initStickyNav();
  initContactForm();
}

function initContactForm() {
  var submitButton    = document.querySelector('.js-contact-form-button');
  var inputName       = document.querySelector('.js-contact-form-name');
  var inputEmail      = document.querySelector('.js-contact-form-email');
  var inputMessage    = document.querySelector('.js-contact-form-message');
  var inputs          = [inputName, inputEmail, inputMessage];
  var feedbackFillAll = document.querySelector('.js-contact-form-fill-all');
  var feedbackSuccess = document.querySelector('.js-contact-form-success');
  var feedbackFailure = document.querySelector('.js-contact-form-failure');
  var feedbacks       = [feedbackFillAll, feedbackSuccess, feedbackFailure];

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

function initStickyNav() {
  var nav = document.querySelector('.js-sticky-nav');
  var solidPoint = window.innerHeight;

  window.onscroll = function (e) {
    var offset = window.pageYOffset;
    var distance = solidPoint - offset;

    if (distance <= 0) addClass(nav, 'solid-bg');
    else if (offset <= solidPoint) removeClass(nav, 'solid-bg');
  }
}

function addClass(element, className) {
  if (element.classList) element.classList.add(className);
  else element.className += ' ' + className;
}

function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);
  else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}
