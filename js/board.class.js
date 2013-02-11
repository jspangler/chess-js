/***
#############################################################################################################################

	Class: 			Board
	
	Creator: 		Jason Spangler
	Created: 		12/28/12
	
	Modifier:		Jason Spangler
	Modified: 		12/28/12

	Description: 	Creates any form of board named by the rows and columns passed in

#############################################################################################################################
*/
var Board = new Class({
	rows: '',	
	cols: '',
	board: '',
	
	/***
		Method:			constructor
		Creator:		Jason Spangler
		Created:		1/2/13
	
		Modifier:		Jason Spangler
		Modified:		1/2/13
	
		Description:	
		@param: 		
		@return:		
	*/
	constructor: function(chess_object) {
		// rows array
		this.rows 	= chess_object.rows;
	
		// columnss array
		this.cols 	= chess_object.cols;
	
		this.board 	= view.id('board');
		
		var color = false;
	
		// the array to store all the squares
		this.squares = {};
		
		// loops through each row
		this.rows.each(function(row, i) {
		
			// initializes an empty object at this row
			this.squares[row] = {};
			
			// loop through the column items
			this.cols.each(function(col, j) {
				
				// gives an odd even property
				var tile_color = !color ? 'odd' : 'even';
				
				this.squares[row][col] = this.createSquare(row, col, tile_color);
				
				color = !color;
				
			}.bind(this));
			
			if (this.rows.length % 2 == 0) color = !color;
			
			this.createNewLine();
		}.bind(this));
	},
	
	
	/***
		Method:			createSquare
		Creator:		Jason Spangler
		Created:		1/2/13
	
		Modifier:		Jason Spangler
		Modified:		1/2/13
	
		Description:	Creates an individual square
		@param: 		row (STRING) The row id to put square in
		@param:			col (STRING) The column id to put the square in
		@param:			color (STRING) The color class to identify square
		@return:		(ELEMENT) The created square element
	*/
	createSquare: function(row, col, color) {
		var square = view.createElement('div', { id: col + row, 'class': color, 'data-col': col, 'data-row': row });
		
		this.board.appendChild(square);
		
		return square;
	},
	
	
	/***
		Method:			createNewLine
		Creator:		Jason Spangler
		Created:		1/2/13
	
		Modifier:		Jason Spangler
		Modified:		1/2/13
	
		Description:	Quick br creator function that appends to the board
	*/
	createNewLine: function() {
		this.board.appendChild(view.createElement('br'));
	}
	
	
});


