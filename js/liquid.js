<<<<<<< HEAD
Parse.User.logIn("calebl", "password", {
  success: function(user) {
	// addContainer();
	// getForms();

  },
  error: function(user, error) {
  	//TODO: show the login page

    // The login failed. Check error to see why.
  }
});

$(document).ready(function(){

});

var Form = Parse.Object.extend('forms');
var FormCollection = Parse.Collection.extend({
	model: Form,
	query: (new Parse.Query(Form)).equalTo("user", Parse.User.current()),
	comparator: function(object){return object.get('createdAt');}
});
var form_collection = new FormCollection();
=======
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
>>>>>>> 34d96bded25bdb62096e107c1fcf36e7283a317f

function getForms(){

	var currentUser = Parse.User.current();
	if (currentUser) {
	    // do stuff with the user
		form_collection.fetch({
			success: function(collection) {
				addFormContainers(collection);
			},
			error: function(collection, error) {
			// The collection could not be retrieved.
			}
		});
	} else {
	    // show the signup or login page
	}
}

function addFormContainers(collection){
	collection.forEach(function(form){
		var $form_el = $("<li class='span1'><img src='img/glyphicons_029_notes_2.png' /></li>");
		$form_el.data({
			headers: form.get('headers'),
			contents: form.get('contents'), 
			created_at: form.get('createdAt')});
		$("#addFile").append($form_el);
	});
}

function downloadCSV(){
	var headers,
		contents = [];
	$('li.ui-selected').each(function(){
		headers = $(this).data('headers');
		contents.push($(this).data('contents'));
	})
	var output = headers + '\n' + contents.join('\n');
	var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(output);
  	$dl_el = $('<a>').attr('href',uri).attr('download','form_data.csv').addClass('dl_link').html('download');
  	$('#addFile').append($dl_el);
}