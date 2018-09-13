let nonStorageArray = ['length', 'key', 'getItem', 'setItem', 'removeItem', 'clear'];

const findSentences = function(paragraph) {
	let sentenceArray = [];
	let currentSentence = '';
	for(let i = 0; i < paragraph.length; i++) {
		currentSentence += paragraph[i];
		if(paragraph[i] === '.' || paragraph[i] === '!') {
			if(paragraph[i + 1] === "”" || paragraph[i + 1] === '\"' || paragraph[i + 1] === '\'') {
				currentSentence += paragraph[i + 1];
				i++
			};
			sentenceArray.push('<span class="sentence">' + currentSentence + '</span>');
			currentSentence = '';
		} else if(paragraph[i] === '?') {
			if(paragraph[i + 1] === "”" || paragraph[i + 1] === '\"' || paragraph[i + 1] === '\'') {
				currentSentence += paragraph[i + 1];
				i++
			};
			sentenceArray.push('<span class="sentence reader_question">' + currentSentence + '</span>');
			currentSentence = '';
		}
	};
	return sentenceArray.join('');
};

const getAllStoredQuestions = function() {
	for(let key in localStorage) {
		if(nonStorageArray.indexOf(key) === -1) { 
			$('.display:first').append($('<div class="display_item" data-storage-key="'+key+'"><div class="date_div">Your Question on: ' + Date() + '</div><div class="question_div" id="'+ key + localStorage.getItem(key) + 'question_div">' + key + '</div><div>Your Answer:</div><div class="answer_div" id="'+key + localStorage.getItem(key) + 'answer_div">' +  localStorage.getItem(key) + '</div><div class="delete_text_button">Delete question</div></div>'));
			$('.delete_text_button').click(function() {
				let deletedItem = $(this)[0].parentNode.children[1].textContent;
			    localStorage.removeItem( deletedItem ); // grab the title and plop here
			    alert('item deleted? check the console');
			    $($(this)[0].parentNode).hide();
			});
		};
	};
};


const filterQuetions = function() {
	$('.display').html('')
	let filterValQuestion = $('.user_input_question_search').val();
	let filterValAnswer = $('.user_input_answer_search').val();
	if (filterValQuestion !== '' || filterValAnswer !== '') {
		for(key in localStorage) {
			if(nonStorageArray.indexOf(key) === -1) {
				if(key.indexOf(filterValQuestion) !== -1 && localStorage[key].indexOf(filterValAnswer) !== -1) {
					$('.display:first').append($('<div class="display_item" data-storage-key="'+key+'"><div class="date_div">Your Question on: ' + Date() + '</div><div class="question_div" id="'+ key + localStorage.getItem(key) + 'question_div">' + key + '</div><div>Your Answer:</div><div class="answer_div" id="'+key + localStorage.getItem(key) + 'answer_div">' +  localStorage.getItem(key) + '</div><div class="delete_text_button">Delete question</div></div>'));
					$('.delete_text_button').click(function() {
						let deletedItem = $(this)[0].parentNode.children[1].textContent;
					    localStorage.removeItem( deletedItem ); // grab the title and plop here
					    $($(this)[0].parentNode).hide();
					});
				};
			};
		};
	} else {
		getAllStoredQuestions();
	};
};

const triggerResize = function(n) {

	if(n === undefined) {
		n = 0;
	};

	$('body').height(window.innerHeight);
	$('.content_area').height($('body').height() * 0.92 - 20 - n);
};

const autoGrowTextareas = function (context) {
	return function(context) {
		if ($(context).outerHeight() > context.scrollHeight){
		    $(context).height(1)
		};
		while ($(context).outerHeight() < context.scrollHeight + parseFloat($(context).css("borderTopWidth")) + parseFloat($(context).css("borderBottomWidth"))){
		    $(context).height($(context).height() + 5)
		};
	};
};

$(document).ready(function() {

	getAllStoredQuestions();

	$('.on_click_black_card').hide();

	$('.publish_button').click(function() {

		let $user_input_question = $(this.parentNode.children[0])
		let $user_input_answer = $(this.parentNode.children[2])

		let inputKey = $user_input_question.val();
		let inputValue = $user_input_answer.val();

		$user_input_question.val('');
		$user_input_answer.val('');

		localStorage.setItem(inputKey, inputValue);


		console.log(inputKey, inputValue);

		// alert("value from local storage " + localStorage.getItem("testStorage") );
		
    	let itemHtml = '<div class="display_item" data-storage-key="' + inputKey + '"><div class="date_div">Your Question on: ' + Date() + '</div><div class="question_div" id="'+inputKey + localStorage.getItem(inputKey) + 'question_div">' + inputKey + '</div><div>Your Answer:</div><div class="answer_div" id="'+inputKey + localStorage.getItem(inputKey) + 'answer_div">' +  localStorage.getItem(inputKey) + '</div><div class="delete_text_button">Delete question</div></div>';
		$(itemHtml).insertBefore($('.display')[0].children[0]);
		// $('.display:first').append($(itemHtml));

		$('.delete_text_button').click(function() {
			let deletedItem = $(this)[0].parentNode.children[1].textContent;
		     localStorage.removeItem( deletedItem ); // grab the title and plop here
		     $($(this)[0].parentNode).hide();
		});

		$user_input_question.blur();
		$user_input_answer.blur();
	});


	// give sentences a class of 'sentence' and questions a class of 'question'
	for(let i = 1; i < $('.paragraph').length; i++) {
		let thisParagraphText = $($('.paragraph')[i]).text().split('\n').join('').split('\t').join('');
		$($('.paragraph')[i]).html(findSentences(thisParagraphText));
	};

	//autogrow textareas
	$('textarea').bind('paste input', function() {
		let theTextarea = this;
		autoGrowTextareas()(theTextarea);
	});

	$('.user_input_question_search').blur(function(){
		if($(this).val() === '') {
			$(this).height('36px');
		};
	});

	$('.user_input_answer_search').blur(function(){
		if($(this).val() === '') {
			$(this).height('36px');
		};
	});

	$('.user_input_question').focus(function(){
		//TODO: make the divider light up
	});

	$('.user_input_question').blur(function(){
		if($(this).val() === '') {
			$(this).height('49px');
		};
	});

	$('.user_input_answer').blur(function(){
		if($(this).val() === '') {
			$(this).height('35px');
		};
	});

	$('.user_input_question').focus(function(){
		//TODO: make the divider light up
	});

	$('.user_input_question_search').keyup(function() {
		filterQuetions();
	});

	$('.user_input_answer_search').keyup(function() {
		filterQuetions();
	});
	

	triggerResize();


	// $(document).bind('fullscreenchange', function() {
	// 	$('body').height(window.innerHeight);
	// 	$('.content_area').height($('body').height() * 0.92 - 20)
	// });
	// $('.display_pdf').height($('body').height() - 100)
	// $('.question_maker').height($('body').height() - 100)
	$('.display_item').click(function(){
		focusQuestionCard = $(this);
		focusQuestionCard.css('background-color: green');
	});

	$('.reader_mode_button').click(function(){
		$('.content_area').removeClass('balanced_mode');
		$('.content_area').removeClass('question_mode');
		$('.content_area').addClass('reader_mode');
	});

	$('.balanced_mode_button').click(function(){
		$('.content_area').removeClass('reader_mode');
		$('.content_area').removeClass('question_mode');
		$('.content_area').addClass('balanced_mode');
	});

	$('.question_mode_button').click(function(){
		$('.content_area').removeClass('balanced_mode');
		$('.content_area').removeClass('reader_mode');
		$('.content_area').addClass('question_mode');
	});

	$('.reader_question').click(function(){
		let $reader_question_text = $(this).text();
		let $hidden_question_field = $('.on_click_black_card')[0].children[1];
		$($hidden_question_field).text($reader_question_text);
		$('.on_click_black_card').slideDown(200, function() {
			triggerResize($('.on_click_black_card').height())
			autoGrowTextareas()($hidden_question_field);
		});
	});
}); // end document.ready