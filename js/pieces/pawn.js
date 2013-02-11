

var Pawn = new Class({
	extend: Piece,
	
	name: 'pawn',
	
	/*************************************************************************
		detectMoves
		
		
	**************************************************************************/
	detectMoves: function() {
		this.possibles 	= [];
		
		this.func 		= this.options.team == 'top' ? 'getRowBelow' : 'getRowAbove';
						
		var new_row 	= this[this.func](this.options.row, this.options.col);
		
		var collide		= this.foundCollision(this.options.col + new_row);
		
		if (!collide) this.possibles.push(this.options.col + new_row);
		
		// check for moving two spaces
		var id = this[this.func](new_row, this.options.col);
		if (!this.has_moved && !collide && !this.foundCollision(this.options.col + id)) {
			
			this.possibles.push(this.options.col + id);
		}
		
		this.loopThroughPossibles();
	}
});

