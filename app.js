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
			$('.display:first').append($('<div class="white_card" data-storage-key="'+key+'"><div class="date_div" style="display:none">Your Question on: ' + Date() + '</div><div class="question_div" id="'+ key + localStorage.getItem(key) + 'question_div">' + key + '</div><div><span class="whose_answer" style="display:none">Your Answer:</span></div><div class="answer_div" id="'+key + localStorage.getItem(key) + 'answer_div">' +  localStorage.getItem(key) + '</div><div class="button_row" style="display:none"><div class="button_row_button edit_answer_button">Edit Answer</div><div class="button_row_button delete_question_button">Delete Question</div></div></div></div>'));
			$('.delete_question_button').click(deleteWhiteCard);
			$('.edit_answer_button').click(editWhiteCardAnswer);
		};
	};
};

const initializeWhiteCard = function() {
	let moduleCopy = $(this).clone();
	moduleCopy.attr('id', 'moduleCopy');
	$('#qvm_inner_div').html('');
	$('#qvm_inner_div').append(moduleCopy);
	$('#question_viewer_module').hide();
	$('#question_viewer_module').slideDown();
	$(moduleCopy[0].children[0]).show();
	$(moduleCopy[0].children[4]).show();
	$(moduleCopy[0].children[2].children[0]).show();
	$(moduleCopy[0].children[4].children[1]).click(deleteWhiteCard);
	$(moduleCopy[0].children[4].children[0]).click(editWhiteCardAnswer);
	triggerResize(moduleCopy.height() + 55)
};

const deleteWhiteCard = function() {
	let deletedItem = $(this)[0].parentNode.parentNode.children[1].textContent;
     localStorage.removeItem(deletedItem); 
     for(let i = 0; i < $('.white_card').length; i++) {
     	if($('.white_card')[i].children[1].textContent === deletedItem) {
     		$($('.white_card')[i]).slideUp(200, function() {
     			$($('.white_card')[i]).html('');
     		});
     	};
     };
};

const filterQuetions = function() {
	let filterValQuestion = $('.user_input_question_search').val();
	let filterValAnswer = $('.user_input_answer_search').val();
	if (filterValQuestion !== '' || filterValAnswer !== '') {
		$('.display').html('<div id="first"></div>');
		for(key in localStorage) {
			if(nonStorageArray.indexOf(key) === -1) {
				if(key.indexOf(filterValQuestion) !== -1 && localStorage[key].indexOf(filterValAnswer) !== -1) {
					$('<div class="white_card" data-storage-key="'+key+'"><div class="date_div" style="display:none">Your Question on: ' + Date() + '</div><div class="question_div" id="'+ key + localStorage.getItem(key) + 'question_div">' + key + '</div><div><span class="whose_answer" style="display:none">Your Answer:</span></div><div class="answer_div" id="'+key + localStorage.getItem(key) + 'answer_div">' +  localStorage.getItem(key) + '</div><div class="button_row" style="display:none"><div class="button_row_button edit_answer_button">Edit Answer</div><div class="button_row_button delete_question_button">Delete Question</div></div></div>').insertBefore($('.display')[0].children[0]);
					$($('.display')[0].children[0]).click(initializeWhiteCard)
					$('.delete_question_button').click(deleteWhiteCard);
					$('.edit_answer_button').click(editWhiteCardAnswer);
				};
			};
		};
	} else {
		$('.display').html('')
		getAllStoredQuestions();
	};
};

const triggerResize = function(n) {
	if(n === undefined) {
		n = 0;
	};
	$('body').height(window.innerHeight);
	$('.content_area').height($('body').height() * 0.92 - 55 - n);
};

const autoGrowTextareas = function (context) {
	return function(context) { // this closure may be arbitrary...
		if ($(context).outerHeight() > context.scrollHeight){
		    $(context).height(1)
		};
		while ($(context).outerHeight() < context.scrollHeight + parseFloat($(context).css("borderTopWidth")) + parseFloat($(context).css("borderBottomWidth"))){
		    $(context).height($(context).height() + 5)
		};
		if($(context).val() === '') {
			$(context).blur()
		}; 
	};
};

const editWhiteCardAnswer = function() {
	$(this.parentNode.parentNode).hide();
	$('.floating_black_card').show();
	$('#floating_black_card_user_input_question').val($(this.parentNode.parentNode.children[1]).text());
	$('#floating_black_card_user_input_answer').val($(this.parentNode.parentNode.children[3]).text());
 	$(window).resize();
	triggerResize($('.floating_black_card').height() + 20);
};

$(document).ready(function() {

	getAllStoredQuestions();
	$('.floating_black_card').hide();
	$('<div class="document_end"></div>').insertAfter($('.page:last'));
	$('.page:last').css('margin-bottom', '8px');

	// TODO: Break up this function. It does too much.
		// click binding can be offloaded to another function
	$('.publish_button').click(function() {
		let $user_input_question;
		let $user_input_answer;

		// detects which publish button you're using
		// TODO: just use IDs, what are you doing with this vanilla DOM traversal?!

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

		if($(this.parentNode).hasClass('floating_black_card') === true) {
			$('.black_card_closer').click();
		};

		// TODO: Break this up into an array of strings and variables
			// Better yet, make White Cards a class of their own.
    	let itemHtml = '<div class="white_card" data-storage-key="' + inputKey + '"><div class="date_div" style="display:none">Your Question on: ' + Date() + '</div><div class="question_div" id="'+inputKey + localStorage.getItem(inputKey) + 'question_div">' + inputKey + '</div><div><span class="whose_answer" style="display:none">Your Answer:</span></div><div class="answer_div" id="'+inputKey + localStorage.getItem(inputKey) + 'answer_div">' +  localStorage.getItem(inputKey) + '</div><div class="button_row" style="display:none"><div class="button_row_button edit_answer_button">Edit Answer</div><div class="button_row_button delete_question_button">Delete Question</div></div></div>';

		for(let i = 0; i < $('.display')[0].children.length; i++) {
			if($(itemHtml)[0].children[1].textContent === $('.display')[0].children[i].children[1].textContent) {
				$($('.display')[0].children[i]).html('');
				$($('.display')[0].children[i]).hide();
			};
		};

		$(itemHtml).insertBefore($('.display')[0].children[0]);

		$('.delete_question_button').click(deleteWhiteCard);
		$('.edit_answer_button').click(editWhiteCardAnswer);
		$($('.display')[0].children[0]).click(initializeWhiteCard);

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
		let $answer_field;
		if($('.content_area').hasClass('balanced_mode')) { // populate question log black card
			$question_field = $('#question_log_black_card_user_input_question');
			$answer_field = $('#question_log_black_card_user_input_answer')
			triggerResize();
		} else { // show floating black card
			$question_field = $('#floating_black_card_user_input_question');
			$answer_field = $('#floating_black_card_user_input_answer')
			$('.floating_black_card').slideDown(200, function() {
				triggerResize($('.floating_black_card').height() + 20);
			});
		};
		$($answer_field).val('');
		$($question_field).val('');			
		$($answer_field).blur();
		$($question_field).blur();
		$($question_field).val($reader_question_text);
		for(key in localStorage) {
			if(nonStorageArray.indexOf(key) === -1) {
				if($reader_question_text === key) {
					$($answer_field).val(localStorage[key]);
				};
			};
		};
		autoGrowTextareas()($question_field[0]);
		autoGrowTextareas()($answer_field[0]);
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

		let value1 = $('#floating_black_card_user_input_question').val()
		let value2 =$('#floating_black_card_user_input_answer').val()
		let value3 =$('#question_log_black_card_user_input_question').val()
		let value4 =$('#question_log_black_card_user_input_answer').val()

		$('#floating_black_card_user_input_question').val('');
		$('#floating_black_card_user_input_answer').val('');
		$('#question_log_black_card_user_input_question').val('');
		$('#question_log_black_card_user_input_answer').val('');

		$('#floating_black_card_user_input_question').blur();
		$('#floating_black_card_user_input_answer').blur();
		$('#question_log_black_card_user_input_question').blur();
		$('#question_log_black_card_user_input_answer').blur();

		$('#floating_black_card_user_input_question').val(value1);
		$('#floating_black_card_user_input_answer').val(value2);
		$('#question_log_black_card_user_input_question').val(value3);
		$('#question_log_black_card_user_input_answer').val(value4);

		autoGrowTextareas()($('#floating_black_card_user_input_question')[0]);
		autoGrowTextareas()($('#floating_black_card_user_input_answer')[0]);
		autoGrowTextareas()($('#question_log_black_card_user_input_question')[0]);
		autoGrowTextareas()($('#question_log_black_card_user_input_answer')[0]);
		// TODO: adjust size of input fields on resize
	});

	$('.white_card').click(initializeWhiteCard);
}); // end document.ready