- [X] store items
	-[X] create items
	-[X] edit/update item
		-[X] select item
	-[X] delete item
	

	-[ ] Front End
		-[X] display items
		-[X] enter new items
		-[X] select item for edit
		-[X] select item for delete
		-[X] a form
		-[ ] Donate button

		-[ ] UI/UX consdierations
			-[X] Confirmation of delete/update
			-[ ] Sortable list
			-[ ] Navigation/Pagination
			-[ ] recurring item (?)
			-[ ] Mousover preview
			-[ ] Searching
			-[ ] Voting (?)
			-[ ] Animations/transitions

- [ ] Library Considerations
	-[ ] underscore
	-[X] jQuery
	-[ ] moment.js
	-[ ] c3.js or charts.js

-[ ] testing

## Feature List

### 1 = already done, 5 = 1 day, 10 = five days

-[X] Upload PDF: 5 CANCELLED. PDF CONVERSION IS HARD.
 	-[X] Add to PDFs list CANCELLED
	-[X] Delete from PDFs list CANCELLED

-[X] The Reader: 7
	-[X] Parse PDF for '?'s: 5
	-[X] Adding clickable '?'s to questions list: 2.5
			-[X] Make '?'s clickable: 2.5
			-[X] Reader Mode functionality
				-[X] Populates The Floating Black Card
					-[X] FBC question field gets clicked question
					-[X] FBC answer field gets any previous answer
					-[X] All fields resized appropriately
				-[X] Make close button work
				-[X] Make new publish button work
					-[X] publish question
					-[X] clear text fields
					-[X] close new black card
			-[X] Balanced Mode functionality
				-[X] Populates The Black Card
					-[X] Question gets clicked question
					-[X] Answer gets any previous answer 
	-[X] Highlight Text Passage: 3.5
		-[X] Create Question based on Highlight: 2.5
		-[X] Add to Answer of previously created Question based on Highlighted passage: 2.5

-[X] Question Logger: 7
	-[X] The Black Card
		-[X] Publish Button: 2
			-[X] Makes White Card on click
				-[X] White Card inherits feild data
					-[X] Question
					-[X] Answer
				-[X] Resets fields on click
					-[X] Values
					-[X] Sizes
			-[X] fields adjusts size on keyup
				-[X] Question
				-[X] Answer
			-[X] Updates div.display
				-[X] Handles old white card
					-[X] Checks div.display for child with question text
						-[X] clears child html
						-[X] hides child
				-[X] Appends new white card to top of list
	-[X] Question Viewer Module
		-[X] Open on click of White Card
		-[X] Edit answer: 2
		-[X] Delete question
		-[X] Close button
	-[X] Search Questions on keyup
	-[X] Search Answers on keyup

-[X] Navigation bar / mode picker
	-[X] Activates reader mode
	-[X] Activates balanced mode
	-[X] Activates question mode

-[ ] Gold Plates:
	-[X] Toggle display helper tooltips on reader highlight/unselect
	-[X] Adjust height of input fields on window resize
	-[ ] Fix the typo in your project name
	-[ ] Organize the TODO list by priority, number of child tasks, and then alphabetically
	-[ ] Truncated Question Cards
	-[ ] Long-Word-Wrapping Question Cards
	-[ ] Sensible black card font sizes
	-[ ] As a card is appended to div.display after answer edit, show afterglow
	-[ ] Change the text of the Edit Answer Button to be "Add Answer" when there's no answer
	-[ ] Customizable Frontend Themes
	-[ ] Clear placeholder text on focus, readd on blur
	-[ ] Remove whitespace from new questions
		-[ ] Strip external whitespace
		-[ ] Remove newlines
	-[ ] jQuery Animations 
		-[ ] on mode changes
		-[ ] slideUp/slideDown question log black card
		-[ ] slideUp/slideDown question log search bars
		-[ ] on load
			-[ ] content area appears in an interesting way
			-[ ] question log white cards fade/ slightly swing in in sequence
			-[ ] question log black card "turns on" like a DOS box or old TV
	-[ ] autocomplete fields
		-[ ] black cards
			-[ ] question log
			-[ ] floating
	-[ ] question log black card has "blue mode" button
		-[ ] essentially its fields become a replacement for the search 
	-[ ] Cross-PDF interaction
		-[ ] Proof-of-concept version
			-[ ] A play
			-[ ] Navigation between the play and "EF's visit..." pdf
			-[ ] pdf-specific data within white cards
				-[ ] multiple pdf-specific categorizations of a white card.
		-[ ] PDF to HTML converter integration
	-[ ] Refactor the stinking code
		-[ ] Use classes!
	-[ ] Login page
		-[ ] Refactor database to have username at the top level

