//first step, we need to attach event listener to get user data

//attach event (click) listeners to each "game box" 

//next, initialize game

//next, we need to check which gamemode we're playing

//we need to set win conditions

//we need to determine current player

//after each move, check win conditions and if not met, 

//human vs human, next implement easy AI, next impossible AI

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const form = document.querySelector("#myForm");

form.addEventListener('submit', (event) => {
    //prevent page refresh
    event.preventDefault();

    //initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector(".modal-wrapper").setAttribute("hidden", true);
    initializeGame(data);
});

const initializeVariables = (data) => {
    data.choice = +data.choice;
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = 0;
    data.currentPlayer = "X";
    data.gameOver = false;
};

const addEventListenersToGameBoard = (data) => {
    document.querySelectorAll('.box').forEach((box) => {
        box.addEventListener('click', (event) => {
            playMove(event.target, data);
        });
    });
};

const initializeGame = (data) => {
    //initialize game variables
    
    adjustDom("displayTurn", `${data.player1Name}'s turn`);
    initializeVariables(data);

    addEventListenersToGameBoard(data);
};

const playMove = (box, data) => {
    //is game over? If game over, don't do anything
    if(data.gameOver || data.round > 8) {
        return;
    }
    //check if game has a letter in it, if so, don't do anything
    if(data.board[box.id] === "X" || data.board[box.id] === "O") {
        return;
    }

    //adjust the DOM for player move, and then check win conditions

    data.board[box.id] = data.currentPlayer;
    box.textContent = data.currentPlayer;
    box.classList.add(data.currentPlayer === "X" ? "player1" : "player2");
    //increase the round #
    data.round++;

    //check end conditions
    if (endConditions(data)) {
       return; 
    }

    //change current player
    //change the DOM, and change data.currentplayer
    changePlayer(data);
};

const endConditions = (data) => {
    //3 potential options,
    //winner
    //tie
    //game not yet over
    if(checkWinner(data)) {
        //adjust the DOM to reflect win
        let winnerName = 
         data.currentPlayer === "X" ? data.player1Name : data.player2Name;
        adjustDom("displayTurn", winnerName + " has won the game");
        return true;
    } else if (data.round === 9) {
        adjustDom("displayTurn", "It's a Tie!");
        data.gameOver = true;
        //adjust the DOM to reflect tie
        return true;
    }
    return false;
};

const checkWinner = (data) => {
    let result = false;
    winningConditions.forEach(condition => {
        if(
            data.board[condition[0]] === data.board[condition[1]] && 
            data.board[condition[1]] === data.board[condition[2]]
            ) {
            data.gameOver = true;
            result = true;
        }
    });
    return result;
};

const adjustDom = (className, textContent) => {
    const elem =  document.querySelector(`.${className}`);
    elem.textContent = textContent;
};

const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
    //adjust the DOM 
    let displayTurnText =
     data.currentPlayer === "X" ? data.player1Name : data.player2Name;
    adjustDom("displayTurn", `${displayTurnText}'s turn`);
};
