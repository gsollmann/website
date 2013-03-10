Parse.User.logIn("calebl", "password", {
  success: function(user) {
	getForms();

  },
  error: function(user, error) {
  	//TODO: show the login page

    // The login failed. Check error to see why.
  }
});

$(document).ready(function(){
	$('.well').disableSelection();
	$('.well').selectable({
		filter: "li",
		selected: updateDownloadLink,
		unselected: function(event,ui){
			var $dl_el = $('.navbar .dl_link');
			if($('li.ui-selected').length > 0){
				$dl_el.closest('li').show();
			} else {
				$dl_el.closest('li').hide();
			}
		}
	});
	
});

var Form = Parse.Object.extend('forms');
var FormCollection = Parse.Collection.extend({
	model: Form,
	query: (new Parse.Query(Form)).equalTo("user", Parse.User.current()),
	comparator: function(object){return -1 * object.createdAt;}
});
var form_collection = new FormCollection();

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
		var form_name = form.get('form_name');
		var createdAt = form.createdAt.toLocaleDateString();
		
		var $form_el = $("<li class='span1'><img src='img/glyphicons_029_notes_2.png' /><span>" + createdAt + "</span></li>");
		
		$form_el.data({
			name: form.get('form_name'),
			headers: form.get('headers'),
			contents: form.get('contents'), 
			created_at: createdAt});
		$("#addFile").append($form_el);
	});
}

function updateDownloadLink(){
	var $dl_el = $('.navbar .dl_link');
	if($('li.ui-selected').length > 0){
		$dl_el.closest('li').show();
	} else {
		$dl_el.closest('li').hide();
	}

	var headers,
		contents = [];
	$('li.ui-selected').each(function(){
		headers = $(this).data('headers');
		contents.push($(this).data('contents'));
	});
	var output = headers + '\n' + contents.join('\n');
	var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(output);
  	$dl_el.attr('href',uri).attr('download','form_data.csv');
}