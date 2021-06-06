class Card {
    constructor(rank,suit, value){
    this.rank = rank,
    this.suit = suit
    this.value = value,
  }
}

var blackJack = new Card ("J","♠",10);
var deck = [] /*52 cards*/
var shoe = [] /*6*52 shuffled cards t*/
var playerScore = 0;
var casinoScore = 0;
var cash= 1000;
var cardCount /**/
var bet
function makeBet() ;
function shuffle();
function showCard;
function hit() ; /*draws a card */
function playerPlay();
function casinoPlay();
function pay();
function setGame(); /*draw cards for both casino and player then calculate and show player's score */
function runGame(); /* bet set hit playerPlay casinoPlay pay*/


/*if cardCount > 52*2 run a turn else shuffle then run a game*/
