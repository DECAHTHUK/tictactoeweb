type CellValue = 'X' | 'O' | null;

class Match {
    board: CellValue[];
    player: CellValue;
    winner: CellValue | null;
    moves: number = 0;

    constructor() {
        this.board = new Array<CellValue>(9);
        for (let i = 0; i < 9; i++) {
            this.board[i] = null;
        }
        this.player = 'X';
        this.winner = null;
    }

    move(position: number): void {
        if (this.board[position] === null && !this.winner) {
            this.board[position] = this.player;
            this.checkWinner();
            this.player = this.player === 'X' ? 'O' : 'X';
            this.moves++;
        }
    }

    checkWinner(): void {
        const winPatterns: number[][] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] !== null && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a];
                break;
            }
        }
    }
}


let match = new Match();

function resetGame(): void {
    match = new Match();
    renderBoard();
}

function handleClick(position: number): void {
    match.move(position);
    renderBoard();
}

function renderBoard(): void {
    const boardElement = document.getElementById('board');
    if (!boardElement) return;

    boardElement.innerHTML = '';

    for (let i = 0; i < 9; i += 3) {
        const row = document.createElement('div');
        row.className = 'row';

        for (let j = 0; j < 3; j++) {
            const index = i + j;
            const player = match.board[index];

            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = player;
            cell.addEventListener('click', () => handleClick(index));
            row.appendChild(cell);
        }

        boardElement.appendChild(row);
    }

    const statusElement = document.getElementById('state');
    if (!statusElement) return;

    if (match.winner) {
        statusElement.textContent = `Победитель: ${match.winner}`;
    } else {
        if (match.moves != 9)
            statusElement.textContent = `Ход игрока: ${match.player}`;
        else
            statusElement.textContent = `Ничья`
    }
}

document.getElementById('reset').addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', renderBoard);