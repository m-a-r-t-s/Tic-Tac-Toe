// Tic Tac Toe
class Agent {
    constructor() {

    }

    minimax(board, isMaximizing) {
        const gameOver = board.gameOver();

        // game outcomes
        const X_WINS = 1;
        const O_WINS = 2;
        const DRAW = 3;

        // base cases
        if (gameOver === X_WINS) return 1;
        else if (gameOver === O_WINS) return -1;
        else if (gameOver === DRAW) return 0;

        // customize initial score for max or min
        let bestScore = isMaximizing ? -Infinity : Infinity;

        // find empty cells on board
        const emptyCells = [];
        for (let i = 0; i < board.cells.length; i++) {
            if (board.cellFree(i + 1)) emptyCells.push(i + 1);
        }

        for (const cell of emptyCells) {
            // clone the current board then move
            const newBoard = board.clone();
            newBoard.move(cell);

            // find score
            const score = this.minimax(newBoard, !isMaximizing);

            // update best score
            if (isMaximizing) bestScore = Math.max(bestScore, score);
            else bestScore = Math.min(bestScore, score);
        }

        return bestScore;
    }

    selectMove(board) {
        let bestMove = null;
        let maxScore = -Infinity; // highest score for player X (max)
        let minScore = Infinity; // lowest score for player O (min)

        const isMaximizing = board.playerOne; // player X (max)
        const isMinimizing = !isMaximizing; // player O (min)
    
        // check every cell on
        for (let i = 0; i < board.cells.length; i++) {
            const cell = i + 1;
    
            // check whether cell is free
            if (board.cellFree(cell)) {

                // move and evaluate score
                const newBoard = board.clone();
                newBoard.move(cell);
                const score = this.minimax(newBoard, isMinimizing);
    
                // update best move and score
                if (isMaximizing && score > maxScore) {
                        bestMove = cell;
                        maxScore = score;
                }
                if (isMinimizing && score < minScore) {
                        bestMove = cell;
                        minScore = score;
                }
    
                // terminate early when winning move found
                if (maxScore === 1 || minScore === -1) return bestMove;
            }
        }

        return bestMove;
    }
}