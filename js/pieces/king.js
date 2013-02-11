


var King = new Class({
	extend: Piece,
	
	name: 'king',

	/*************************************************************************
		detectMoves
		
		
	**************************************************************************/
	detectMoves: function() {
		this.possibles 	= [];
		
		var possibles	= [];
				
		if ((id = this.getRowAbove(this.options.row, this.options.col)) !== false) possibles.push(this.options.col + id);
		
		if ((id = this.getRowBelow(this.options.row, this.options.col)) !== false) possibles.push(this.options.col + id);
		
		if ((id = this.getColumnLeft(this.options.row, this.options.col)) !== false) possibles.push(id + this.options.row);
		
		if ((id = this.getColumnRight(this.options.row, this.options.col)) !== false) possibles.push(id + this.options.row);
		
		var point = [this.options.row, this.options.col];
		if ((id = this.getDiagonalTopLeft(point)) !== false) possibles.push(id[1] + id[0]);
		
		if ((id = this.getDiagonalTopRight(point)) !== false) possibles.push(id[1] + id[0]);
		
		if ((id = this.getDiagonalBottomLeft(point)) !== false) possibles.push(id[1] + id[0]);
		
		if ((id = this.getDiagonalBottomRight(point)) !== false) possibles.push(id[1] + id[0]);
		
		possibles.each(function(str) {
			if (this.foundCollision(str)) return;
			
			this.possibles.push(str);
		}.bind(this));
		
		this.loopThroughPossibles();
	}
});

