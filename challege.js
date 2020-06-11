/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dices, gamePlaying;

var lastDice;

function resetAll() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";
    document.querySelector('#name-' + activePlayer).innerHTML = 'Player ' + (activePlayer + 1);
    document.querySelector('#name-' + (1 - activePlayer)).innerHTML = 'Player ' + ((1 - activePlayer) + 1);
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.final-score').value=100;
}

resetAll();



function btn1() {
    if (gamePlaying) {
        //1. Random number
        dices = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        console.log(dices);

        //2. Display the result
        var dice1DOM = document.getElementById('dice-1');
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dices[0] + '.png';
        var dice2DOM = document.getElementById('dice-2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + dices[1] + '.png';

        //3. Update the rund score IF the rolled number was not a 1
        if (dices[0] === 6 && dices[1] === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dices[0] === 1 && dices[1] === 1) {
            nextPlayer();
         } else {
            roundScore += (dices[0]+dices[1]);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    }
}

function btn2() {
    if (gamePlaying) {
        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winning_score;
        if(input){
            winning_score = input;
        }else {
            winning_score = 100;
        }
        //Check if win
        if (scores[activePlayer] >= winning_score) {
            document.querySelector('#name-' + activePlayer).innerHTML = 'Player ' + (activePlayer + 1) + 'WINNER!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            document.getElementById('dice-1').style.display = "none";
            document.getElementById('dice-2').style.display = "none";
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
}


document.querySelector('.btn-roll').addEventListener('click', btn1);
document.querySelector('.btn-hold').addEventListener('click', btn2);
document.querySelector('.btn-new').addEventListener('click', resetAll);

function
nextPlayer() {
    activePlayer = 1 - activePlayer;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';



    document.querySelector('.player-' +
        (1 - activePlayer) + '-panel').classList.remove('active');
    document.querySelector('.player-' +
        activePlayer + '-panel').classList.add('active');


    document.querySelector('.dice').style.display = 'none';

}