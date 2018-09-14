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
			$('.display:first').append($('<div class="white_card" data-storage-key="'+key+'"><div class="date_div" style="display:none">Your Question on: ' + Date() + '</div><div class="question_div" id="'+ key + localStorage.getItem(key) + 'question_div">' + key + '</div><div><span class="whose_answer" style="display:none">Your Answer:</span></div><div class="answer_div" id="'+key + localStorage.getItem(key) + 'answer_div">' +  localStorage.getItem(key) + '</div><div class="delete_text_button" style="display:none">Delete question</div></div>'));
			$('.delete_text_button').click(function() {
				let deletedItem = $(this)[0].parentNode.children[1].textContent;
			    localStorage.removeItem( deletedItem ); // grab the title and plop here
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
					$('.display:first').append($('<div class="white_card" data-storage-key="'+key+'"><div class="date_div" style="display:none">Your Question on: ' + Date() + '</div><div class="question_div" id="'+ key + localStorage.getItem(key) + 'question_div">' + key + '</div><div><span class="whose_answer" style="display:none">Your Answer:</span></div><div class="answer_div" id="'+key + localStorage.getItem(key) + 'answer_div">' +  localStorage.getItem(key) + '</div><div class="delete_text_button" style="display:none">Delete question</div></div>'));
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
	$('.content_area').height($('body').height() * 0.92 - 40 - n);
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
	$('.floating_black_card').hide();
	$('<div class="document_end"></div>').insertAfter($('.page:last'));
	$('.page:last').css('margin-bottom', '8px');

	$('.publish_button').click(function() {

		let $user_input_question;
		let $user_input_answer;

		if($(this.parentNode).hasClass('floating_black_card') === true) {
			$user_input_question = $(this.parentNode.children[1])
			$user_input_answer = $(this.parentNode.children[3])
		} else {
			$user_input_question = $(this.parentNode.children[0])
			$user_input_answer = $(this.parentNode.children[2])
		}
		let inputKey = $user_input_question.val();
		let inputValue = $user_input_answer.val();

		$user_input_question.val('');
		$user_input_answer.val('');

		localStorage.setItem(inputKey, inputValue);


		console.log(inputKey, inputValue);

		if($(this.parentNode).hasClass('floating_black_card') === true) {
			$('.black_card_closer').click();
		};
		
    	let itemHtml = '<div class="white_card" data-storage-key="' + inputKey + '"><div class="date_div" style="display:none">Your Question on: ' + Date() + '</div><div class="question_div" id="'+inputKey + localStorage.getItem(inputKey) + 'question_div">' + inputKey + '</div><div><span class="whose_answer" style="display:none">Your Answer:</span></div><div class="answer_div" id="'+inputKey + localStorage.getItem(inputKey) + 'answer_div">' +  localStorage.getItem(inputKey) + '</div><div class="delete_text_button" style="display:none">Delete question</div></div>';
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
	$('.white_card').click(function(){
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

	$('.reader_question').click(function() {
		let $reader_question_text = $(this).text().slice($(this).text().search(/\S/g));
		let $question_field;
		if($('.content_area').hasClass('balanced_mode')) { // populate question log black card
			
			$question_field = $('#question_log_black_card_user_input_question');
			$($question_field).val($reader_question_text);
			autoGrowTextareas()($question_field[0]);
		} else { // show floating black card
			$question_field = $('#floating_black_card_user_input_question');
			$($question_field).val($reader_question_text);
			$('.floating_black_card').slideDown(200, function() {
				triggerResize($('.floating_black_card').height())
				autoGrowTextareas()($question_field[0]);
			});
		};
	});

	$('.black_card_closer').click(function(){
		$($(this)[0].parentNode.parentNode).slideUp(200, function(){
			triggerResize();
			autoGrowTextareas()($('#floating_black_card_user_input_question'));
			autoGrowTextareas()($('#floating_black_card_user_input_answer'));
		});
	});

	$(window).resize(function(){
		triggerResize();
	});

}); // end document.ready