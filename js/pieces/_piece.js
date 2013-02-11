
/***
#############################################################################################################################

	Class: 			Piece
	
	Creator: 		Jason Spangler
	Created: 		12/29/12
	
	Modifier:		Jason Spangler
	Modified: 		12/29/12

	Description: 	The top level class that stores global functions for each piece

#############################################################################################################################
*/
var Piece = new Class({

	clickable_items: [],
	
	/***
		Method:			constructor
		Creator:		Jason Spangler
		Created:		12/29/12
	
		Modifier:		Jason Spangler
		Modified:		12/29/12
	
		Description:	The main constructor that is generic and works for every piece
		@param: 		options (OBJECT) The information for this piece
	*/
	constructor: function(options) {
		this.setOptions(options);
		
		this.move_event		= this.newRowClickEvent.bind(this);
			
		// stores the starting row to know to move two spaces
		this.has_moved		= this.options.has_moved ? true : false;
	
		// stores the element to insert the pawn into
		this.square = document.getElementById(this.options.id);
		
		/*************************************************************************
			creates the piece
		**************************************************************************/
		this.piece 	= view.createElement('div', { 'class': 'piece ' + this.name + ' ' + this.options.team });
		
		this.piece.addEvent('click', this.clickPieceEvent.bind(this));
		
		this.square.appendChild(this.piece);
	},
	
	
	/***
		Method:			loopThroughPossibles
		Creator:		Jason Spangler
		Created:		1/2/13
	
		Modifier:		Jason Spangler
		Modified:		1/2/13
	
		Description:	Loops through the possibilities and checks for the enemy
	*/
	loopThroughPossibles: function() {
		this.clickable_items 	= [];
		
		this.possibles.each(function(str) {	
			this.clickable_items.push(view.id(str).addClass('possible').addEvent('click', this.move_event));
		}.bind(this));	
	},
	
	
	/***
		Method:			clickPieceEvent
		Creator:		Jason Spangler
		Created:		12/29/12
	
		Modifier:		Jason Spangler
		Modified:		12/29/12
	
		Description:	Fired when user clicks on a piece
		@param: 		e (EVENT)
	*/
	clickPieceEvent: function(e) {
		CHESS.removeSelections();
			
		e.target.addClass('active');
			
		this.detectMoves();
	},
	
	
	/***
		Method:			newRowClickEvent
		Creator:		Jason Spangler
		Created:		12/29/12
	
		Modifier:		Jason Spangler
		Modified:		12/29/12
	
		Description:	Click event for clicking a square to move a piece
		@param: 		e (EVENT) The click event
	*/
	newRowClickEvent: function(e) {
		//if (e.target.hasClass('piece')) return;

		CHESS.removeSelections();
				
		this.movePiece(e.target.getAttribute('data-row'), e.target.getAttribute('data-col'));
	},
	
	/*************************************************************************
		movePiece
			newRowClickEvent helper
		
	**************************************************************************/
	movePiece: function(row, col) {
		var new_id 				= col + row;
		
		this.square.removeChild(this.piece);
		
		this.options.has_moved 	= true;
		this.options.row 		= row;
		this.options.col 		= col;
		this.options.id			= col + row;
		
		Piece.call(this, this.options);
	},
	
	/*************************************************************************
		foundCollision
	**************************************************************************/
	foundCollision: function(id) {
		return view.id(id).firstChild ? true :  false;
	},
	
	/*************************************************************************
		getRowAbove
			above goes from bottom of board to top
	**************************************************************************/
	getRowAbove: function(current_row, current_col) {
		if (current_row == CHESS.rows.length) return false;
		else return parseInt(current_row) + 1;
	},
	
	/*************************************************************************
		getRowBelow
			above goes from top of board to bottom
	**************************************************************************/
	getRowBelow: function(current_row, current_col) {
		if (current_row == 1) return false;
		else return parseInt(current_row) - 1;
	},
	
	/*************************************************************************
		getColumn
	**************************************************************************/
	getColumn: function(current_row, current_col, val) {
		var new_col = current_col;
		
		CHESS.board.cols.each(function(key, value) {
			if (key == current_col && CHESS.board.cols[parseInt(value) + val] !== undefined) new_col = CHESS.board.cols[parseInt(value) + val];
		});
		return new_col === current_col ? false : new_col;
	},
	
	/*************************************************************************
		getColumnLeft

	**************************************************************************/
	getColumnLeft: function(current_row, current_col) {
		return this.getColumn(current_row, current_col, -1);
	},
	
	/*************************************************************************
		getColumnRight

	**************************************************************************/
	getColumnRight: function(current_row, current_col) {
		return this.getColumn(current_row, current_col, 1);
	},
	
	/*************************************************************************
		getDiagonal
	**************************************************************************/
	getDiagonal: function(point, func1, func2) {
		var row_above 	= this[func1](point[0], point[1]);
		var col_left	= this[func2](point[0], point[1]);
		
		if (row_above === false || col_left === false) return false;
		return [row_above, col_left];
	},
	
	/*************************************************************************
		getDiagonalTopLeft
	**************************************************************************/
	getDiagonalTopLeft: function(point) {
		return this.getDiagonal(point, 'getRowAbove', 'getColumnLeft');
	},
	
	/*************************************************************************
		getDiagonalTopRight
	**************************************************************************/
	getDiagonalTopRight: function(point) {
		return this.getDiagonal(point, 'getRowAbove', 'getColumnRight');
	},
	
	/*************************************************************************
		getDiagonalBottomLeft
	**************************************************************************/
	getDiagonalBottomLeft: function(point) {
		return this.getDiagonal(point, 'getRowBelow', 'getColumnLeft');
	},
	
	/*************************************************************************
		getDiagonalBottomRight
	**************************************************************************/
	getDiagonalBottomRight: function(point) {
		return this.getDiagonal(point, 'getRowBelow', 'getColumnRight');
	},
	
		/*************************************************************************
		getHorseTopLeftTop
	**************************************************************************/
	getHorseTopLeftTop: function(current_row, current_col) {
		var new_row = parseInt(current_row) + 2;
		var new_col = this.getColumnLeft(current_row, current_col);

		if (view.id(new_col + new_row)) return [new_row, new_col];
		else return false;
	},
	
	/*************************************************************************
		getHorseTopLeftLeft
	**************************************************************************/
	getHorseTopLeftLeft: function(current_row, current_col) {
		var new_row = parseInt(current_row) + 1;
		var new_col = this.getColumnLeft(current_row, current_col);
		if (new_col !== false) new_col = this.getColumnLeft(current_row, new_col);

		if (view.id(new_col + new_row)) return [new_row, new_col];
		else return false;
	},
	
	/*************************************************************************
		getHorseTopRightTop
	**************************************************************************/
	getHorseTopRightTop: function(current_row, current_col) {
		var new_row = parseInt(current_row) + 2;
		var new_col = this.getColumnRight(current_row, current_col);

		if (view.id(new_col + new_row)) return [new_row, new_col];
		else return false;
	},
	
	/*************************************************************************
		getHorseTopRightRight
	**************************************************************************/
	getHorseTopRightRight: function(current_row, current_col) {
		var new_row = parseInt(current_row) + 1;
		var new_col = this.getColumnRight(current_row, current_col);
		if (new_col !== false) new_col = this.getColumnRight(current_row, new_col);

		if (view.id(new_col + new_row)) return [new_row, new_col];
		else return false;
	},
	
	/*************************************************************************
		getHorseBottomLeftBottom
	**************************************************************************/
	getHorseBottomLeftBottom: function(current_row, current_col) {
		var new_row = parseInt(current_row) - 2;
		var new_col = this.getColumnLeft(current_row, current_col);

		if (view.id(new_col + new_row)) return [new_row, new_col];
		else return false;
	},
	
	/*************************************************************************
		getHorseBottomLeftLeft
	**************************************************************************/
	getHorseBottomLeftLeft: function(current_row, current_col) {
		var new_row = parseInt(current_row) - 1;
		var new_col = this.getColumnLeft(current_row, current_col);
		if (new_col !== false) new_col = this.getColumnLeft(current_row, new_col);

		if (view.id(new_col + new_row)) return [new_row, new_col];
		else return false;
	},
	
	/*************************************************************************
		getHorseBottomRightBottom
	**************************************************************************/
	getHorseBottomRightBottom: function(current_row, current_col) {
		var new_row = parseInt(current_row) - 2;
		var new_col = this.getColumnRight(current_row, current_col);

		if (view.id(new_col + new_row)) return [new_row, new_col];
		else return false;
	},
	
	/*************************************************************************
		getHorseBottomRightRight
	**************************************************************************/
	getHorseBottomRightRight: function(current_row, current_col) {
		var new_row = parseInt(current_row) - 1;
		var new_col = this.getColumnRight(current_row, current_col);
		if (new_col !== false) new_col = this.getColumnRight(current_row, new_col);

		if (view.id(new_col + new_row)) return [new_row, new_col];
		else return false;
	}
});