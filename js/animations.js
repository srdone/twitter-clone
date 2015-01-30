/**
 * Created by stephendone on 1/27/15.
 */

$(document).ready(function () {

  var defaultCharCount = +$('#char-count').text();
  var defaultHeight = $('.tweet-compose').height();

  // STEP 1: When the user clicks in the textarea, it should double in size and the controls should appear
  $('.tweet-compose').on('focus', function () {
    $('#tweet-controls').removeClass('hidden');
    var currentHeight = $(this).height();
    if ($(this).height === defaultHeight) {
      $(this).height(currentHeight * 2);
    }
  }).on('keydown', function () {
      setTimeout( function() {
        var charCount = $('#char-count');
        var submit = $('#tweet-submit');

        charCount.text(defaultCharCount - $('.tweet-compose').val().length);

        var numCharsLeft = +charCount.text();

        if (numCharsLeft <= 10 && numCharsLeft > -1) {
          charCount.css('color', 'red');
          submit.prop('disabled', false);
        } else if (numCharsLeft <= 0) {
          charCount.css('color', 'red');
          submit.prop('disabled', true);
        } else {
          charCount.css('color', 'inherit');
          submit.prop('disabled', false);
        }
      }, 0);
  })
  
  $('#tweet-submit').on('click', function (e) {
    e.preventDefault();
    submitTweet(); 
  });
  
  var submitTweet = function () {
    var tweetText = $('.tweet-compose').val();
    console.log(tweetText);
    var fullName = $('#profile-summary p').text();
    console.log(fullName);
    var avatarSrc = $('#profile-summary .avatar').prop('src');
    console.log(avatarSrc);
    var tweetTemplate = $('.tweet').last().clone(true);
    console.log(tweetTemplate);
    
    tweetTemplate.find('.avatar').first().attr('src', avatarSrc);
    tweetTemplate.find('.tweet-text').text(tweetText);
    tweetTemplate.find('.fullname').text(fullName);
    tweetTemplate.find('.username').text('@' + fullName);
    tweetTemplate.find('.num-retweets').text('0');
    tweetTemplate.find('.num-favorites').text(0);
    tweetTemplate.find('.users-interact').find('img').remove();
    
    $('#stream').prepend(tweetTemplate);
  }
  
  $('.tweet').hover(function () {
    console.log('in enter hover');
    $(this).find('.stats').slideDown();
  }, function() {
    console.log('in exit hover');
    if (!$(this).find('.reply .tweet-compose').is(':focus')) {
      $(this).find('.stats').slideUp(); 
      $(this).find('.reply').slideUp();
    }
  })
  .click(function () {
    console.log('in click');
    $(this).find('.reply').slideDown();
  });

});