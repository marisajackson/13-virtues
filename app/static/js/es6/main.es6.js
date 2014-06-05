(function() {
  'use strict';

  $(document).ready( () => {
    $('#show-sign-in').click(showSignIn);
    $('#show-registration').click(showRegistration);
  });

  function showSignIn (e) {
    $('#sign-in').toggleClass('show-modal');
    e.preventDefault();
  }

  function showRegistration (e) {
    $('#register').toggleClass('show-modal');
    e.preventDefault();
  }

}());
