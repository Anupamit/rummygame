console.log('hello');
function ageInDays() {
    var birthYear = prompt('When you are born?');
    var ageInDayss = (2021 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('you are' + ageInDayss + 'days  old.')
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(ageInDays);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// Challenge 2

function generateImg(){
    let image  = document.createElement('img');
    let div = document.getElementById('flex-img-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
    div.appendChild(image);
}


/// Challange 3
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var  humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice  = numberToChoice(randToRpsInt());
    console.log('computer choice:', botChoice);

    result = decideWinner(humanChoice, botChoice);
    console.log(result);

    message = finalMessage(result);
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);

}

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number) {
    return ['rock', 'paper','scissor'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissor':1, 'rock':0.5, 'paper':0},
        'paper': {'rock':1, 'paper':0.5, 'scissor':0},
        'scissor': {'paper':1, 'scissor':0.5, 'rock':0},
    };

    var yourScore = rpsDatabase[yourChoice] [computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore]
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'you lost!', 'color': 'red'};
    }else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    }else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('rock').src,
        'scissor': document.getElementById('rock').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.getElementById('div');
    var botDiv = document.getElementById('div');
    var messageDiv = document.getElementById('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + ";front-size: 60px; padding: 30px;'>" + finalMessage['messagee'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}


//Challenge 4

var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);

var copyAllButton = [];
for (let i=0; i < all_buttons.length; i++) {
    copyAllButton.push(all_buttons[i].classList[1])
}
console.log(copyAllButton);

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    }else if (buttonThingy.value === 'green') {
        buttonGreen();
    }else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    }else if ( buttonThingy.value === 'random'){
        randomColors(); 
    }
}

function buttonsRed() {
    for (let i=0; i< all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonGreen() {
    for (let i=0; i< all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset() {
    for (let i=0; i< all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButton[i]);
    }
}
function randomColors() {
    var  choice = ['btn-primary', 'btn-danger', 'btn-sucess', 'btn-warning']
    
    for (let i=0; i< all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choice[randomNumber]);
    }
}

//Challenge 5

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'card': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1, 11 ]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand' : false,
    'turnsOver' : false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard() {
    let ranndomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['card'][ranndomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
    
}

function blackjackDeal() {
    //let winner =computeWinner();
   // showResult(winner);
   // showResult(computeWinner());

    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

        for (i=0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
    
    
}

function updateScore(card, activePlayer) {
    if (card === 'A') {
        if (activePlayer['score'] + blackjackGame['cardMap'] [card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardMap'] [card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardMap'][card][0];
        }

    }else{
        activePlayer['score'] += blackjackGame['cardMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

// function sleep(ms) {
//     return new Promise(resolve => set setTimeout(resolve, ms));
// }

// asynk
function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        //await sleep(100);
    }

    blackjackGame['turnsOver'] = true;
    let  winner = computeWinner();
    showResult(winner);
}
// compute winner and return who just won
// update the wins loss and drew
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
// condition higher score than dealer or when dealer bust but you are 
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        }else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        }else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }
// condition when user busts but dealer doesn't
    }else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
//condition when you anddealer busts 
    }else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let  message, messageColor;

    if (blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        }else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        }else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    
    }
    }