$(document).ready(function(){
	$('.add_text_button').click(function(){
		let inputValue = $('.user_input').val() 
		localStorage.setItem('testStorage', inputValue);
		// alert("value from local storage " + localStorage.getItem("testStorage") );
		
		let itemHtml = $(localStorage.getItem('testStorage'));
		$('.display').html(`<div class="display_item">${ localStorage.getItem('testStorage')}!</div>`);
		//$('.display').text(localStorage.getItem('testStorage'));
		$('.display_item').click(function(e) {
			console.log(e);
		});
	// insert this value into local storage

	});

	// $('.user_input').on('keyup', function(){
	// 	let inputValue = $('.user_input').val() 
	// 	localStorage.setItem('testStorage', inputValue);
	// 	$('.display').text(localStorage.getItem('testStorage'));
	// });

	$('.delete_text_button').click(function() {
		localStorage.removeItem('testStorage');
		alert('item deleted? check the console!');
	});
});