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
var playerHand = [];
var casinoHand = [];
//makeBet

function showCard(card, htmlCard){
  var corner = document.createElement("div");
  corner.className = "corner";
  corner.innerHTML = card.rank + card.suit;
  var suit = document.createElement("div");
  suit.className = "suit";
  suit.innerHTML = card.suit;
  // color of card
  if (card.suit == "♠" || card.suit == "♣"){
    htmlCard.style.color = "#353A3A";

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
  return scoreShow(scoreCalc(casinoHand),casinoSide);
}
function playerDraw(){
  playerHand.push(drawCard(playerSide));
  return scoreShow(scoreCalc(playerHand),playerSide);
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
  return playerDraw();
}
var playerScore = setGame();

if playerScore
