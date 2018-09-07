$(document).ready(function(){
	$('.add_text_button').click(function(){
		let inputValue = $('.user_input').val() 
		alert( inputValue );
		localStorage.setItem('testStorage', inputValue);
	});
});