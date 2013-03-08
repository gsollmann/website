Parse.User.logIn("calebl", "password", {
  success: function(user) {
    alert('logged in as calebl')
  },
  error: function(user, error) {
    // The login failed. Check error to see why.
  }
});