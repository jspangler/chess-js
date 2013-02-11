

/***
#############################################################################################################################

	Class: 			RegularChess
	
	Creator: 		Jason Spangler
	Created: 		12/28/12
	
	Modifier:		Jason Spangler
	Modified: 		12/28/12

	Description: 	The class to handle all aspects of the PrinceChess game

#############################################################################################################################
*/
var RegularChess = Class({
	extend: Chess,
	
	rows: [8,7,6,5,4,3,2,1],
	
	cols: ['a','b','c','d','e','f','g','h'],
	
	// rook knight bishop || bishop knight rook
	white_pieces: {
		'8': ['Rook', 'Knight', 'Bishop', 'King', 'Queen', 'Bishop', 'Knight', 'Rook'],
		'7': ['Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn']
	},
	
	black_pieces: {
		'2': ['Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn'],
		'1': ['Rook', 'Knight', 'Bishop', 'Queen', 'King', 'Bishop', 'Knight', 'Rook']
	},
	
	white_player: {},
	
	black_player: {}
	
});