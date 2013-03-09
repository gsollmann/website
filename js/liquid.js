// Parse.User.logIn("calebl", "password", {
//   success: function(user) {
// 	// addContainer();
// 	// getForms();
// 
//   },
//   error: function(user, error) {
//   	//TODO: show the login page
// 
//     // The login failed. Check error to see why.
//   }
// });
	$(document).ready(function(){
		addContainer();
		$('.well').disableSelection();
		$('.well').selectable({filter: "li"});
		
	});
function addContainer() {
	for(i=0; i<9; i++) {
		$("#addFile").append("<li class='span1'><img src='img/glyphicons_029_notes_2.png' /></li>");
	}
		
};

function getForms(){
	var currentUser = Parse.User.current();
	if (currentUser) {
	    // do stuff with the user

	    var Form = Parse.Object.extend('forms');
	 //    var query = new Parse.Query(Form);
		// query.equalTo("user", currentUser);
		// query.find({
		//   success: function(results) {
		//     // alert("Successfully retrieved " + results.length + " scores.");
		//     addFormContainers(results);
		//   },
		//   error: function(error) {
		//     alert("Error: " + error.code + " " + error.message);
		//   }
		// });

		var FormCollection = Parse.Collection.extend({
		  model: Form,
		  query: (new Parse.Query(this.model)).equalTo("user", currentUser)
		});
		var form_collection = new FormCollection();
		form_collection.fetch({
			success: function(collection) {
				collection.each(function(object) {
					console.warn(object);
				});
			},
			error: function(collection, error) {
			// The collection could not be retrieved.
			}
		});
	} else {
	    // show the signup or login page
	}
}

function addFormContainers(results){
	_(results).each(function(result){
		// var form_name = result.get('')
	});
}