
/***
#############################################################################################################################

	Class: 			Chess
	
	Creator: 		Jason Spangler
	Created: 		12/30/12
	
	Modifier:		Jason Spangler
	Modified: 		12/30/12

	Description: 	The overarching class that contains helpers for all Chess games

#############################################################################################################################
*/
var Chess = new Class({
	
	/***
		Method:			constructor
		Creator:		Jason Spangler
		Created:		12/30/12
	
		Modifier:		Jason Spangler
		Modified:		12/30/12
	
		Description:	Constructs this chess object
	*/
	constructor: function() {

		// instantiate the board
		this.board = new Board(this);
		
		this.createTeam(this.white_player, this.white_pieces, 'top');
		
		this.createTeam(this.black_player, this.black_pieces, 'bottom');
	},
	
	
	/***
		Method:			createTeam
		Creator:		Jason Spangler
		Created:		1/2/13
	
		Modifier:		Jason Spangler
		Modified:		1/2/13
	
		Description:	Given the object and a team name it constructs the pieces
		@param: 		player (OBJECT) The player object to keep track of the pieces
		@param:			pieces (OBJECT) The object with arrays of pieces
		@param:			team_str (STRING) The class name to add to the pieces
	*/
	createTeam: function(player, pieces, team_str) {
		player.pieces = {};
		
		// loops through each white piece row
		Object.each(pieces, function(row_number, row_array) {
			
			// loops through the row array
			row_array.each(function(name, col_number) {
				// easy way to reference the piece both on the DOM and in the white_player.piece object
				var piece_id 		= name + col_number;
				
				// the id of the square to live in, the col and row number, the team the piece is on and the piece_id
				var piece_options	= { id: this.cols[col_number] + row_number, col: this.cols[col_number], row: row_number, team: team_str, piece_id: piece_id };
			
				// creates the piece and stores in white_player.piece object
				player.pieces[piece_id] = new window[name](piece_options);
			}.bind(this));
			
		}.bind(this));
	},
	

	/***
		Method:			removeSelections
		Creator:		Jason Spangler
		Created:		12/30/12
	
		Modifier:		Jason Spangler
		Modified:		12/30/12
	
		Description:	Removes all selected squares and active items
	*/
	removeSelections: function() {
		Object.each(this.white_player.pieces, function(key, piece) {
			piece.clickable_items.each(function(item) {
				if (item) item.removeEvent('click', piece.move_event).removeClass('active');
			});
		});
		
		Object.each(this.black_player.pieces, function(key, piece) {
			piece.clickable_items.each(function(item) {
				if (item) item.removeEvent('click', piece.move_event).removeClass('active');
			});
		});
		
		view.els(this.board.board, '*', 'class', 'possible').removeClass('possible');
		view.els(this.board.board, '*', 'class', 'active').removeClass('active');
	}
	
});