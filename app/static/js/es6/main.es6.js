(function() {
  'use strict';

  $(document).ready( () => {
    $('#show-sign-in').click(showSignIn);
    $('#show-registration').click(showRegistration);
  });

  function showSignIn () {
    $('#sign-in').toggleClass('show-modal');
  }

  function showRegistration () {
    $('#register').toggleClass('show-modal');
  }

}());
