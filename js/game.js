$(document).ready(function(){

    class Puissance4 {

        constructor(grid_dimension = {col: 7, row: 6}) {
            this.grid_dimension = grid_dimension;
            this.player_one = 1;
            this.player_two = 2;
            this.turn = this.player_one;
            this.max_moves = this.grid_dimension.col * this.grid_dimension.row;
            this.moves = 0;
            this.winner = null;
            this.grid = [];
            // this.count = 0;
                    
            this.generate_grid();
            
            $("#puissance4").click((e) => this.handleClick(e));
            $('#player2').css("opacity","50%")
        }
    
    
        // On génère la grille
        generate_grid() {
            for (let h = 0; h < this.grid_dimension.row; h++) {
                this.grid[h] = [];
                for (let l = 0; l < this.grid_dimension.col; l++) {
                    this.grid[h][l] = 0;
                }
            }
        }
        // Ce qui se passe au click
        handleClick(e){
            // target le click et On stock la data des x (colonnes) dans la variable 'cols'
            const cols = parseFloat($(e.target).parent().attr("data-col"));
            // la variable rows retourne la fonction ci dessous
            const rows = this.checkLastIndex(cols)
            this.addJetons(rows, cols)

            console.log(cols, rows)
            console.log(this.grid)

        }
        checkLastIndex(cols) { 
            for (let h = this.grid_dimension.row - 1; h >= 0; h-- ) {
                if (this.grid[h][cols] === 0) {
                    return h
                }
            }

        }
        addJetons(rows, cols) {
            // ici on update notre grille javascript
            this.grid[rows][cols] = this.turn;

            // ici on update notre table html (pour placer visuellement le jeton)
            // ps : il faut changer le jeton en fonction du joueur courant (this.turn)
            // alterner joueur courant (this.turn)
            // compter les tours
            $('#player2').css("opacity","50%") 
            if (this.turn === this.player_one) {
                $("tr:nth-child(" + (rows+1) + ") td:nth-child(" + (cols+1) + ") img").attr("src", './img/jetonswag.png');
                // Check win
                if (this.win(rows, cols, this.turn)){
                    this.winner = this.turn;
                    setTimeout(function(){
                        window.alert("Joueur 1 a gagné ! Bravo ! \n Cliquez sur le boutton recommencer pour relancer une partie")
                    }, 100);
                }
                // ou joueur suivant 
                this.turn = this.player_two;
                $('#player2').css("opacity","100%")
                $('#player1').css("opacity","50%")
            }    
            else { 
                $("tr:nth-child(" + (rows+1) + ") td:nth-child(" + (cols+1) + ") img").attr("src", './img/jetonalien.png')
                // check win 
                if (this.win(rows, cols, this.turn)){
                    this.winner = this.turn;
                    setTimeout(function(){
                        window.alert("Joueur 2 a gagné ! Bravo ! \n Cliquez sur le boutton 'Recommencer' pour relancer une partie")
                    }, 100);
                }
                // ou joueur suivant 
                this.turn = this.player_one;
                $('#player1').css("opacity","100%")
            }
            this.moves++
            // egalité ?
            if (this.moves >= this.max_moves) { 
                this.winner = 0;
                window.alert("Egalité")
            }
          
        }


        win(rows, cols, player){
            //Horizontal
            let count = 0;
            for (let j = 0; j < this.grid_dimension.col; j++) {
                count = (this.grid[rows][j] === player) ? count+1 : 0;
                if (count >= 4) return true;
            }
            //Vertical
            count = 0
            for (let i = 0; i < this.grid_dimension.row ; i++) {
                count = (this.grid[i][cols] === player) ? count+1 : 0;
                if (count >=4) return true;
            }
            // Diagonal
            count = 0;
            let diagonal = rows - cols;
            for (let i = Math.max(diagonal, 0); i < Math.min(this.grid_dimension.row, this.grid_dimension.col + diagonal); i++) {
                count = (this.grid[i][i - diagonal] == player) ? count+1 : 0;
                if (count >= 4) return true;
            }

            //Anti-Diagonal 
            count = 0;
            diagonal = rows + cols;
            for (let i = Math.max(diagonal - this.grid_dimension.col + 1, 0); i < Math.min(this.grid_dimension.row, diagonal + 1); i++) {
                count = (this.grid[i][diagonal - i] == player) ? count+1 : 0;
                if (count >= 4) return true;
            }
            
            return false;
        }



        
           



        
            
      

            
        
    }
   

    var game1 = new Puissance4()
    $('button#rejouer').click(function(){
        location.reload();
    });
    $('button#retour').click(function(){
        window.location.href = 'menu.html'
    })
});