$(document).ready(function(){
	$('body').disableSelection();
	
	// Dropdown menu for user preferences & log out
	$('.dropdown-toggle').dropdown();

	$('body').on('click','h3 .select-all',function(){
		var $icon_check = $(this).find('i');
		var $form_list = $(this).closest('h3').next('ul');
		if($icon_check.is('.icon-check-empty')){
			$icon_check.removeClass('icon-check-empty').addClass('icon-check');
			$form_list.find('.ui-selectee').addClass('ui-selected');

		} else {
			$icon_check.removeClass('icon-check').addClass('icon-check-empty');
			$form_list.find('.ui-selectee').removeClass('ui-selected');
		}

		updateDownloadLink();
	});

	loadScript();
	// $('.form-div').selectable({
	// 	filter: "li",
	// 	selected: updateDownloadLink,
	// 	unselected: function(event,ui){
	// 		var $dl_el = $('.navbar .dl_link');
	// 		if($('li.ui-selected').length > 0){
	// 			$dl_el.closest('li').show();
	// 		} else {
	// 			$dl_el.closest('li').hide();
	// 		}
	// 	}
	// });
	
});

var Form = Parse.Object.extend('forms');
var FormCollection = Parse.Collection.extend({
	model: Form,
	query: (new Parse.Query(Form)).equalTo("user", Parse.User.current()),
	comparator: function(object){return -1 * object.createdAt;}

});
var form_collection = new FormCollection();
var timeout = -1;
var add_markers = false;

function getForms(){

	var currentUser = Parse.User.current();
	if (currentUser) {
	    // do stuff with the user
	    
		form_collection.fetch({
			success: function(collection) {
				addFormContainers(collection);
			// Polling with Parse
				if(timeout > 0)
					setTimeout(getForms, timeout);
				var html_text = addFormContainers(collection);
				$('.span12.well.form-div.container-fluid').html(html_text);

				if(add_markers){
					collection.forEach(function(form){
		            if(form.get('latitude') !== null)
			            addMarker(form.get('latitude'),form.get('longitude'),form.get('formId'));
					})
				}

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
	grouped_by_date = collection.groupBy(function(form){ return form.createdAt.toLocaleDateString() });

	var $container = $("<span>");
	_.each(grouped_by_date, function(date_group,date){
		var $header = $('<h3><i class="icon-calendar"></i> ' + date + '<span class="select-all"><i class="icon-check-empty"></i></span></h3>');
		$container.append($header);
		
		var $date_ul = $("<ul class='row-fluid formRow'></ul>");
		date_group.forEach(function(form){
			var form_name = form.get('form_name');
			var createdAt = form.createdAt.toLocaleDateString()

			var $form_el = $("<li class='span1'><img src='img/glyphicons_029_notes_2.png' /><span>" + createdAt + "</span></li>");
			$container.append($date_ul, $form_el);

			$form_el.data({
				name: form.get('form_name'),
				headers: form.get('headers'),
				contents: form.get('contents'), 
				createdAt: createdAt});
			$date_ul.append($form_el);
		});

	

		$date_ul.selectable({
			filter: "li",
			selected: updateDownloadLink,
			unselected: function(event,ui){
				var $dl_el = $('.navbar .dl_link');
				if($('li.ui-selected').length > 0){
					$dl_el.closest('li').show();
				} else {
					$dl_el.closest('li').hide();
				}
				updateDownloadLink();
			}
		});
	});
		return $container;

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

//Google Maps functions
function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(39.103215, -84.511828),
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
}
function loadScript() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyA54-wexDDrFR1i_EBmcaIy2F48DcvVA90&sensor=false&callback=initialize";
  $('body').append(script);
}
function addMarker(lat, lng, form_id){
  var myLatlng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: form_id.toString()
  });
}