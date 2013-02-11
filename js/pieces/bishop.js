
var Bishop = new Class({
	extend: Piece,
	
	name: 'bishop',
	
	/*************************************************************************
		detectMoves
		
		
	**************************************************************************/
	detectMoves: function() {
		this.possibles			= [];
		var funcs				= ['getDiagonalTopLeft', 'getDiagonalTopRight', 'getDiagonalBottomLeft', 'getDiagonalBottomRight'];
		
		funcs.each(function(func) {
			var current_point = [this.options.row, this.options.col];
			while ((point = this[func](current_point)) != false) {
				if (this.foundCollision(point[1] + point[0])) break;
				
				this.possibles.push(point[1] + point[0]);
				current_point = [point[0], point[1]];
			}
		}.bind(this));
		
		this.loopThroughPossibles();
	}
});

