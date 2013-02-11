
var Rook = new Class({
	extend: Piece,
	
	name: 'rook',
	
	/*************************************************************************
		detectMoves
		
		
	**************************************************************************/
	detectMoves: function() {
		this.func = this.options.team == 'top' ? 'getRowBelow' : 'getRowAbove';
		
		this.possibles	= [];
		var row_funcs	= ['getRowAbove', 'getRowBelow'];
		var col_funcs	= ['getColumnLeft', 'getColumnRight'];
		
		row_funcs.each(function(func) {
			var current_row = this.options.row;
			while ((new_row = this[func](current_row, this.options.col)) !== false) {
				if (this.foundCollision(this.options.col + new_row)) break;
				
				this.possibles.push(this.options.col + new_row);
				current_row = new_row;
			}
		}.bind(this));
		
		col_funcs.each(function(func) {
			var current_col = this.options.col;
			while ((new_col = this[func](this.options.row, current_col)) !== false) {
				if (this.foundCollision(new_col + this.options.row)) break;
				
				this.possibles.push(new_col + this.options.row);
				current_col = new_col;
			}
		}.bind(this));
		
		this.loopThroughPossibles();

	}
});
