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
			sentenceArray.push('<span class="sentence question">' + currentSentence + '</span>');
			currentSentence = '';
		}
	};
	return sentenceArray.join('');
};

const getAllStoredQuestions = function() {
	for(let key in localStorage) {
		if(nonStorageArray.indexOf(key) === -1) { 
			$('.display:first').append($('<div class="display_item" data-storage-key="'+key+'"><div>Your Question on: ' + Date() + '</div><div class="questionDiv" id="'+ key + localStorage.getItem(key) + 'QuestionDiv">' + key + '</div><div>Your Answer:</div><div class="answerDiv" id="'+key + localStorage.getItem(key) + 'answerDiv">' +  localStorage.getItem(key) + '</div><div class="delete_text_button">Delete question</div></div>'));
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
					$('.display:first').append($('<div class="display_item" data-storage-key="'+key+'"><div>Your Question on: ' + Date() + '</div><div class="questionDiv" id="'+ key + localStorage.getItem(key) + 'QuestionDiv">' + key + '</div><div>Your Answer:</div><div class="answerDiv" id="'+key + localStorage.getItem(key) + 'answerDiv">' +  localStorage.getItem(key) + '</div><div class="delete_text_button">Delete question</div></div>'));
					$('.delete_text_button').click(function() {
						let deletedItem = $(this)[0].parentNode.children[1].textContent;
					    localStorage.removeItem( deletedItem ); // grab the title and plop here
					    alert('item deleted? check the console');
					    $($(this)[0].parentNode).hide();
					});
				};
			};
		};
	} else {
		getAllStoredQuestions();
	};
};

$(document).ready(function() {

	getAllStoredQuestions();

	$('.add_question_button').click(function() {


		let inputKey = $('.user_input_question').val();
		let inputValue = $('.user_input_answer').val();

		$('.user_input_question').val('');
		$('.user_input_answer').val('');

		localStorage.setItem(inputKey, inputValue);


		console.log(inputKey, inputValue);

		// alert("value from local storage " + localStorage.getItem("testStorage") );
		
    	let itemHtml = '<div class="display_item" data-storage-key="'+inputKey+'"><div>Your Question on: ' + Date() + '</div><div class="questionDiv" id="'+inputKey + localStorage.getItem(inputKey) + 'QuestionDiv">' + inputKey + '</div><div>Your Answer:</div><div class="answerDiv" id="'+inputKey + localStorage.getItem(inputKey) + 'answerDiv">' +  localStorage.getItem(inputKey) + '</div><div class="delete_text_button">Delete question</div></div>';
		$(itemHtml).insertBefore($('.display')[0].children[0]);
		// $('.display:first').append($(itemHtml));

		$('.delete_text_button').click(function() {
			let deletedItem = $(this)[0].parentNode.children[1].textContent;
		     localStorage.removeItem( deletedItem ); // grab the title and plop here
		     $($(this)[0].parentNode).hide();
		});

		$('.user_input_question').blur();
		$('.user_input_answer').blur();
	});


	// give sentences a class of 'sentence' and questions a class of 'question'
	for(let i = 1; i < $('.paragraph').length; i++) {
		let thisParagraphText = $($('.paragraph')[i]).text().split('\n').join('').split('\t').join('');
		$($('.paragraph')[i]).html(findSentences(thisParagraphText));
	};

	//autogrow textareas
	$('textarea').bind('paste input', function () {
	    if ($(this).outerHeight() > this.scrollHeight){
	        $(this).height(1)
	    };
	    while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))){
	        $(this).height($(this).height() + 5)
	    };
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

	$('.user_input_question_search').keyup(function() {
		filterQuetions();
	});

	$('.user_input_answer_search').keyup(function() {
		filterQuetions();
	});
	
	$('body').height(window.innerHeight);
	$('.content_area').height($('body').height() - 110)
	// $('.display_pdf').height($('body').height() - 100)
	// $('.question_maker').height($('body').height() - 100)

}); // end document.ready