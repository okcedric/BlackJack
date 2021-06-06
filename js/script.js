class Card {
    constructor(rank,suit){
    this.rank = rank,
    this.suit = suit
  }
}

// create a deck of 52 cards
var suits = ["♠","♥","♦","♣"] ;
var ranks = ["K","Q","J","10","9","8","7","6","5","4","3","2","1"];
var deck = [];
for (var suit of suits){
  for (var rank of ranks){
    var i = new Card(rank,suit)
    deck.push(i);
  }
}

//create an ordered shoe of 6 decks
var orderedShoe = [];
for(i=0;i<6;i++){
  orderedShoe = orderedShoe.concat(deck);
}
//create a shuffled shoe of 6 decks
var shoe ;



var playerScore = 0;
var casinoScore = 0;
var cash = 1000;
var cardCount;
var bet;
/*
function makeBet() ;
function shuffle();
function showCard;
function hit() ; //draws a card
function playerPlay();
function casinoPlay();
function pay();
function setGame(); //draw cards for both casino and player then calculate and show player's score
function runGame(); // bet set hit playerPlay casinoPlay pay
//if cardCount > 52*2 run a turn else shuffle then run a game
*/
