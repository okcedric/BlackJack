class Card {
    constructor(rank,suit){
    this.rank = rank,
    this.suit = suit
  }
}
class Score {
    constructor(num,text){
    this.num = num,
    this.suit = text
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
var shoe=[] ;
function shuffle(){
  //create an ordered shoe of 6 decks
  var orderedShoe = [];
  for(i=0;i<6;i++){
    orderedShoe = orderedShoe.concat(deck);
  }
  //create a shuffled shoe of 6 decks
  while(orderedShoe.length >0){
    var i = Math.floor(Math.random()*(orderedShoe.length+1)); //pick a random index of orderedShoe
    shoe = shoe.concat(orderedShoe.splice(i,1));// take card of that index and put in the shoe
  }
  return shoe;
}

var playerSide = document.getElementById('player-side');
var casinoSide = document.getElementById('casino-side');
var playerHand = [];
var casinoHand = [];
var playerScore = new Score(0,"début");
var casinoScore = new Score(0,"début");

//makeBet

// print face of a card on an div with class of card
function renderCard(card, htmlCard){
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

//scoreCalc

function scoreCalc(hand){
  var num=0;
  var text="";
  var score = new Score;
  var anyAces = false;
// sum the hand value and scan for aces
  for (let card of hand ){
    if (!parseInt(card.rank)){
      num+=10;
    }else{
      num += parseInt(card.rank);
      if (card.rank == 1){
        anyAces = true;
      }
    }
}

//determine score.text and add 10 to score num if there is at least one ace
if ((num == 11)&&(hand.length = 2) && (anyAces)){
  text = 'BlackJack';
  num = 210;
}else if((num <12) && anyAces){
  text= (num+10)+ " / " + num ;
  num = num +10;
}else {
  text = num.toString();
}
score.num = num;
score.text=text;
return score ;
}

function scoreShow(score,side){
var scoreHeader = side.nextElementSibling;
scoreHeader.innerHTML = score.text;
return score;
}

//draw a Card and put i
function draw(side) {
  //get first card from the shoe and put it i,n hand
  var card = shoe.shift();
  //get for the hand
  if (side === casinoSide){
    casinoHand.push(card);
    var score =scoreCalc(casinoHand);
    casinoScore=score;
  }else {
    playerHand.push(card);
    var score =scoreCalc(playerHand);
    playerScore= score ;
  }
  //generate blank card, render it in the hand
  var htmlCard = document.createElement("div");
  htmlCard.className = "card";
  renderCard(card,htmlCard);
  side.appendChild(htmlCard);
  scoreShow(score,side);
  return score;
}
function drawHidden(){
  var topCard = shoe.shift();
  var card = document.createElement("div");
  card.className = "card";
  card.setAttribute('id','hidden');
  casinoSide.appendChild(card);
  return topCard
}

function reveal(){
  var htmlCard = document.getElementById('hidden');
  htmlCard.setAttribute('id','revealed');
  var card = casinoHand[1];

  renderCard(card,htmlCard);
  casinoScore = scoreCalc(casinoHand);
  scoreShow(casinoScore,casinoSide);
}

function setGame(){
  playerHand = [];
  casinoHand = [];
  playerScore = new Score(0,"début");
  casinoScore = new Score(0,"début");
  draw(casinoSide);
  draw(playerSide);
  casinoHand.push(drawHidden());
  addButtons();
  draw(playerSide);
  checkScore();
}

function checkScore(){
  if (playerScore.num > 20){
    stay();
  }
}


function hideButtons(){
  var buttons = document.getElementById('buttons');
  var hitButton = document.getElementById('hit');
  var stayButton = document.getElementById('stay');
  buttons.removeChild(hitButton);
  buttons.removeChild(stayButton);
}
function addButtons(){
  var buttons = document.getElementById('buttons');
  //'<button id="hit"> hit </button>
  var hitButton = document.createElement('button');
  hitButton.setAttribute('id','hit');
  hitButton.innerHTML = "hit";
  //<button id="stay"> stay</button>"'
  var stayButton = document.createElement('button');
  stayButton.setAttribute('id','stay');
  stayButton.innerHTML = "stay";
  buttons.appendChild(hitButton);
  buttons.appendChild(stayButton);
  hitButton.addEventListener('click',hit);
  stayButton.addEventListener('click',stay);
}

function hit(){
  draw(playerSide);
  checkScore();
}
function casinoTurn(){
  // wait :500MS
  //Si playerScore.num === 210
  if (playerScore.num ===210) {
    if (casinoScore.num === 210 ){

      say('push','#22333B');

    }else if(casinoScore.num === 21) {
      //threeForTwo(); orange
      say('BlackJack','#CAA953');
    }else{
      //blackjack();
      say('BlackJack','#FCE762');
    }
  } else if (casinoScore.num === 210) {
    //redBlackJack();
    say('BlackJack','#CA5953');
  } else if (playerScore.num > 21) {
    //lose();
    say('Lose','#CA5953');
  }else if (casinoScore.num < 17) {
    draw(casinoSide);
      setTimeout(() => {casinoTurn(); }, 500);
  }else if (casinoScore.num == playerScore.num) {
        say('push','#22333B');
  }else if ((casinoScore.num< playerScore.num) || (casinoScore.num > 21)) {
    say('Win','#FCE762');
  }else {
    say('Lose','#CA5953');
  }
}

var popup = document.getElementById('popup');
var overlay = document.getElementById('overlay');

function replay(){
  overlay.style.display = "none";
  //remove card on screen
  casinoSide.innerHTML = '';
  playerSide.innerHTML='';
  setGame();
}
function say(text,color){
  // change text
  popup.innerHTML = text;
  // change couleur
  popup.style.color = color;
  //display overlay
  overlay.style.display = "block";
  console.log(text);
  //au click replay()
  overlay.addEventListener('click', replay);
}

function stay(){
  hideButtons();
  reveal();
  setTimeout(() => {casinoTurn(); }, 500);
}

shuffle();
setGame();
