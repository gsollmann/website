Parse.User.logIn("calebl", "password", {
  success: function(user) {
	addContainer()

  },
  error: function(user, error) {
    // The login failed. Check error to see why.
  }
});

function addContainer() {
	for(i=0; i<9; i++) {
		$("#addFile").append("<div class='span1'><img src='img/glyphicons_029_notes_2.png' /></div>");
	}
	
};