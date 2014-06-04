(function() {
  'use strict';

  $(document).ready( () => {
    $('#show-sign-in').click(showSignIn);
    $('#show-registration').click(showRegistration);
  });

  function showSignIn() {
    alert('sign-in form!');
  }

  function showRegistration() {
    alert('registration form!');
  }

}());
