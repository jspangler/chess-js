

/***
#############################################################################################################################

	Class: 			PrinceChess
	
	Creator: 		Jason Spangler
	Created: 		12/28/12
	
	Modifier:		Jason Spangler
	Modified: 		12/28/12

	Description: 	The class to handle all aspects of the PrinceChess game

#############################################################################################################################
*/
var PrinceChess = Class({
	extend: Chess,
	
	rows: [9,8,7,6,5,4,3,2,1],
	
	cols: ['a','b','c','d','e','f','g','h','i'],
	
	// rook knight bishop || bishop knight rook
	white_pieces: {
		'9': ['Rook', 'Knight', 'Bishop', 'Prince', 'King', 'Queen', 'Knight', 'Bishop', 'Rook'],
		'8': ['Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn']
	},
	
	black_pieces: {
		'2': ['Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn', 'Pawn'],
		'1': ['Rook', 'Bishop', 'Knight', 'Queen', 'King', 'Prince', 'Bishop', 'Knight', 'Rook']
	},
	
	white_player: {},
	
	black_player: {}

	
});
