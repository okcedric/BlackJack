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
var playerScore = 0;
var casinoScore = 0;
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
function reveal(){
  var htmlCard = document.getElementById('hidden');
  htmlCard.setAttribute('id','revealed');
  var card = casinoHand[1];
  showCard(card,htmlCard);

}
casinoHand.push(drawCard(casinoSide));
playerHand.push(drawCard(playerSide));
casinoHand.push(drawHidden());
playerHand.push(drawCard(playerSide));

console.log(casinoHand);
console.log(playerHand);
/*
function drawCard;
function hit() ; //draws a card
function playerPlay();
function casinoPlay();
function pay();
function setGame(); //draw cards for both casino and player then calculate and show player's score
function runGame(); // bet set hit playerPlay casinoPlay pay
//if cardCount > 52*2 run a turn else shuffle then run a game
*/
