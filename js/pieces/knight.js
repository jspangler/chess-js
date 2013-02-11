

var Knight = new Class({
	extend: Piece,
	
	name: 'knight',


	/*************************************************************************
		detectMoves
		
		
	**************************************************************************/
	detectMoves: function() {
		this.func = this.options.team == 'top' ? 'getRowBelow' : 'getRowAbove';
		
		this.possibles 			= [];
		var funcs				= [	'getHorseTopLeftTop', 'getHorseTopLeftLeft', 
									'getHorseTopRightTop', 'getHorseTopRightRight', 
									'getHorseBottomLeftBottom', 'getHorseBottomLeftLeft', 
									'getHorseBottomRightBottom', 'getHorseBottomRightRight'];
		
		funcs.each(function(func) {
			if ((point = this[func](this.options.row, this.options.col)) !== false) {
				if (this.foundCollision(point[1] + point[0])) return;
				
				this.possibles.push(point[1] + point[0]);
			}
		}.bind(this));
		
		this.loopThroughPossibles();
	}
});



