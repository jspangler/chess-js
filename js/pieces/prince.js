

var Prince = new Class({
	extend: Piece,
	
	name: 'prince',
	
	/*************************************************************************
		detectMoves
		
		
	**************************************************************************/
	detectMoves: function() {
		var possibles 			= [];
		
		this.possibles			= [];
				
		if ((id = this.getRowAbove(parseInt(this.options.row) + 1, this.options.col)) !== false) possibles.push(this.options.col + id);
		
		if ((id = this.getRowBelow(parseInt(this.options.row) - 1, this.options.col)) !== false) possibles.push(this.options.col + id);
		
		if ((id = this.getColumnLeft(this.options.row, this.options.col)) !== false) {
			
			if ((new_id = this.getColumnLeft(this.options.row, id)) !== false) {
				possibles.push(new_id + this.options.row);
			}
		}
		
		if ((id = this.getColumnRight(this.options.row, this.options.col)) !== false) {
			
			if ((new_id = this.getColumnRight(this.options.row, id)) !== false) {
				possibles.push(new_id + this.options.row);
			}
		}
		
		
		var point = [this.options.row, this.options.col];
		if ((id = this.getDiagonalTopLeft(point)) !== false) {
			
			if ((new_id = this.getDiagonalTopLeft(id)) !== false) {
				possibles.push(new_id[1] + new_id[0]);
			}
		}
		
		if ((id = this.getDiagonalTopRight(point)) !== false) {
			
			if ((new_id = this.getDiagonalTopRight(id)) !== false) {
				possibles.push(new_id[1] + new_id[0]);
			}
		}
		
		if ((id = this.getDiagonalBottomLeft(point)) !== false) {
			
			if ((new_id = this.getDiagonalBottomLeft(id)) !== false) {
				possibles.push(new_id[1] + new_id[0]);
			}
		}
		
		if ((id = this.getDiagonalBottomRight(point)) !== false) {
			
			if ((new_id = this.getDiagonalBottomRight(id)) !== false) {
				possibles.push(new_id[1] + new_id[0]);
			}
		}
		
		var funcs			= [	'getHorseTopLeftTop', 'getHorseTopLeftLeft', 
								'getHorseTopRightTop', 'getHorseTopRightRight', 
								'getHorseBottomLeftBottom', 'getHorseBottomLeftLeft', 
								'getHorseBottomRightBottom', 'getHorseBottomRightRight'];
								
		
		funcs.each(function(func) {
			if ((point = this[func](this.options.row, this.options.col)) !== false) {
				if (this.foundCollision(point[1] + point[0])) return;
				
				possibles.push(point[1] + point[0]);
			}
		}.bind(this));
		
		possibles.each(function(str) {
			if (!view.id(str)) return;
		
			if (this.foundCollision(str)) return;
			
			this.possibles.push(str);
		}.bind(this));
		
		this.loopThroughPossibles();
	}
});

