class Card {
    constructor(rank,suit){
    this.rank = rank,
    this.suit = suit
  }
}
function  makeDeck(){
  var suits = ["♠","♥","♦","♣"] ;
  var ranks = ["K","Q","J","10","9","8","7","6","5","4","3","2","1"];
  var deck = [];
  for (var suit of suits){
    for (var rank of ranks){
      var i = new Card(rank,suit)
      deck.push(i);
    }
  }
  return deck;
}
const deck=makeDeck();
var cash = 1000;
var cardCount;
var bet;
function shuffle(){
  //create an ordered shoe of 6 decks
  var orderedShoe = [];
  for(i=0;i<6;i++){
    orderedShoe = orderedShoe.concat(deck);
  }
  //create a shuffled shoe of 6 decks
  var shoe=[] ;
  while(orderedShoe.length >0){
    var i = Math.floor(Math.random()*(orderedShoe.length+1)); //pick a random index of orderedShoe
    shoe = shoe.concat(orderedShoe.splice(i,1));// take card of that index and put in the shoe
  }
  return shoe;
}

var shoe=shuffle();
var playerSide = document.getElementById('player-side');
var casinoSide = document.getElementById('casino-side');
var message = document.getElementById('msg');
var playerHand = [];
var casinoHand = [];
var playerScore = 0;
var casinoScore = 0;

//makeBet

function showCard(card, htmlCard){
  var corner = document.createElement("div");
  corner.className = "corner";
  corner.innerHTML = card.rank;
  var suit = document.createElement("div");
  suit.className = "suit";
  suit.innerHTML = card.suit;
  // color of card
  if (card.suit == "♠" || card.suit == "♣"){
    htmlCard.style.color = "#22333B";

  }else{
      htmlCard.style.color =  "#CA5953";
  }
  htmlCard.appendChild(corner);
  htmlCard.appendChild(suit);
}
//drawCard
function drawCard(side) {
  var card = shoe.shift();
  var htmlCard = document.createElement("div");
  htmlCard.className = "card";
  showCard(card,htmlCard);
  side.appendChild(htmlCard);
  return card;
}
function drawHidden(){
  var topCard = shoe.shift();
  var card = document.createElement("div");
  card.className = "card";
  card.setAttribute('id','hidden');
casinoSide.appendChild(card);
return topCard
}

//scoreCalc

function scoreCalc(hand){
  var score=0;
  var anyAces = false;

  for (let card of hand ){
    if (!parseInt(card.rank)){
      score +=10;
    }else{
      score += parseInt(card.rank);
      if (card.rank == 1){
        anyAces = true;
      }
    }
}

// Ace's case
if ((score == 11)&&(hand.length = 2) && (anyAces)){
  score = 'BlackJack'
}else if((score <12) && anyAces){
  score = (score+10)+ " / " + score ;
}
return score ;
}

function scoreShow(score,side){
var scoreHeader = side.nextElementSibling;
scoreHeader.innerHTML = score;
return score;
}

function casinoDraw(){
  casinoHand.push(drawCard(casinoSide));
  casinoScore = scoreShow(scoreCalc(casinoHand),casinoSide);
  return casinoScore;
}
function playerDraw(){
  playerHand.push(drawCard(playerSide));
  playerScore = scoreShow(scoreCalc(playerHand),playerSide);
  return playerScore;
}
function reveal(){
  var htmlCard = document.getElementById('hidden');
  htmlCard.setAttribute('id','revealed');
  var card = casinoHand[1];
  showCard(card,htmlCard);
  return scoreShow(scoreCalc(casinoHand),casinoSide);
}
function setGame(){
  casinoDraw();
  playerDraw();
  casinoHand.push(drawHidden());
  addButtons();
  return playerDraw();
}

function checkScore(){
  if ((playerScore > 20) ||(playerScore == "BlackJack")) {
    stay();
  }
}

function casinoTurn(){
casinoScore =  reveal();
  console.log('Casino Turn ' + casinoScore);
}
function hideButtons(){
  console.log('Hide the buttons!');
  var buttons = document.getElementById('buttons');
  var hitButton = document.getElementById('hit');
  var stayButton = document.getElementById('stay');
  buttons.removeChild(hitButton);
  buttons.removeChild(stayButton);
}
function addButtons(){
  var buttons = document.getElementById('buttons');
  //'<button id="hit" type="button" name="button"> Hit </button>
  //<button id="stay" type="button" name="button"> Stay</button>"'
  var hitButton = document.createElement('button');
  hitButton.setAttribute('id','hit');
  hitButton.innerHTML = "hit";
  var stayButton = document.createElement('button');
  stayButton.setAttribute('id','stay');
  stayButton.innerHTML = "stay";
  buttons.appendChild(hitButton);
  buttons.appendChild(stayButton);
  hitButton.addEventListener('click',hit);
  stayButton.addEventListener('click',stay);
}

function hit(){
  playerScore = playerDraw();
  checkScore();
}

function stay(){
hideButtons();
casinoTurn();
}

setGame();
