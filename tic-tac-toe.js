var Match = /** @class */ (function () {
    function Match() {
        this.moves = 0;
        this.board = new Array(9);
        for (var i = 0; i < 9; i++) {
            this.board[i] = null;
        }
        this.player = 'X';
        this.winner = null;
    }
    Match.prototype.move = function (position) {
        if (this.board[position] === null && !this.winner) {
            this.board[position] = this.player;
            this.checkWinner();
            this.player = this.player === 'X' ? 'O' : 'X';
            this.moves++;
        }
    };
    Match.prototype.checkWinner = function () {
        var winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (var _i = 0, winPatterns_1 = winPatterns; _i < winPatterns_1.length; _i++) {
            var pattern = winPatterns_1[_i];
            var a = pattern[0], b = pattern[1], c = pattern[2];
            if (this.board[a] !== null && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a];
                break;
            }
        }
    };
    return Match;
}());
var match = new Match();
function resetGame() {
    match = new Match();
    renderBoard();
}
function handleClick(position) {
    match.move(position);
    renderBoard();
}
function renderBoard() {
    var boardElement = document.getElementById('board');
    if (!boardElement)
        return;
    boardElement.innerHTML = '';
    for (var i = 0; i < 9; i += 3) {
        var row = document.createElement('div');
        row.className = 'row';
        var _loop_1 = function (j) {
            var index = i + j;
            var player = match.board[index];
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = player;
            cell.addEventListener('click', function () { return handleClick(index); });
            row.appendChild(cell);
        };
        for (var j = 0; j < 3; j++) {
            _loop_1(j);
        }
        boardElement.appendChild(row);
    }
    var statusElement = document.getElementById('state');
    if (!statusElement)
        return;
    if (match.winner) {
        statusElement.textContent = "\u041F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u044C: ".concat(match.winner);
    }
    else {
        if (match.moves != 9)
            statusElement.textContent = "\u0425\u043E\u0434 \u0438\u0433\u0440\u043E\u043A\u0430: ".concat(match.player);
        else
            statusElement.textContent = "\u041D\u0438\u0447\u044C\u044F";
    }
}
document.getElementById('reset').addEventListener('click', resetGame);
document.addEventListener('DOMContentLoaded', renderBoard);
