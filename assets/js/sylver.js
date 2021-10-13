var curcap = Infinity; // current highest number that can be picked
var newcap; // new highest number that can be picked to be checked against curcap
var rem = [];
var picked = []; // remaining available and picked lists
var move; // holds current move
// const primes = [5, 7, 11, 13, 17, 19, 23, 29, 31]; // a list of all primes from 5 to 31
const primes = [5]; // a list of all primes from 5 to 31
var newAdds = [];
var result = [];

var temprem = [];

var dumbcount = 0;


// done. just for swapping between the tabs
function swapToAbt() {
    document.getElementById("abt").style.display = "block";
    document.getElementById("game").style.display = "none";
}
function swapToGame() {
    document.getElementById("abt").style.display = "none";
    document.getElementById("game").style.display = "block";
}
// done. swaps to game and
function start(choice){
  document.getElementById("selec").style.display = "none";
  document.getElementById("play").style.display = "block";
  if(choice == 1) cStart();
}
function moveWrap () {
  playerMove(Number(document.getElementById("numInput").value));
}
function startOver() {
  // bring us back to selec menu
  document.getElementById("play").style.display = "none";
  document.getElementById("selec").style.display = "block";
  // re-enable move button
  document.getElementById("move").disabled = false;
  // clear all variables and lists
  document.getElementById("numInput").value = "";
  document.getElementById("disp").innerHTML = "";
  document.getElementById("winner").innerHTML = "";
  curcap = Infinity;
  rem = [];
  picked = []; // remaining available and picked lists
  newAdds = [];
  result = [];
  dumbcount = 0;

}



// just outputs a random prime from 5 to 31 and display
function cStart() {
  // pick random low prime to set as move
  move = primes[Math.floor(Math.random()*primes.length)];
  // add it to the picked list
  picked.push(move);
  // display the move
  display(move);
  // terminate. this leaves it for the player to respond
  // loop(-1);
}

// processes the player's input and makes an initial response
function pStart(move) {
  // is the move legal? greater than 1, an integer, etc?
  if(!Number.isInteger(move)) {console.log("notint");}
  if(move < 2) {console.log("too small");}
  if(!Number.isInteger(move) || move < 2) {inputErr();return;}
  else document.getElementById("winner").innerHTML = "";

  // add to picked list
  picked.push(move);

  // display move
  display(move);

  // c react switch
  if(!isPrime(move)){
    if(compCheck(move)) newNum(5);
    else { // if other composite, play one its primes geq 5
      var pfactors = primeFactors(move);
      newNum(pfactors[0]);
    }
  }
  else switch(move) {
    case 2:
      picked.push(3);
      display(3);
      gameOver(1);
      break;
    case 3:
      picked.push(2);
      display(2);
      gameOver(1);
      break;
    default:
      // move product of the next two primes
      var nexMove = nextPrimes(move)
      newNum(nexMove);
      // picked.push(nexMove);
      // display(nexMove);
      // // they'll be rel prime so determine cap from this
      // curcap = (5 - 1) * (nexMove - 1) - 1;
  }

  // terminate. this leaves it for the player to respond
  // loop(-1);
}

// the player has given new input. give to newnum, then process a response
// 5 -------- figure out a response based on some strategy
function playerMove(move) {
  if(picked.length == 0) pStart(move);  // is this the first move?
  else {
    if(picked.length == 1 && curcap == Infinity) {       // is it the third move, ie the comp went first?
      // check to make sure the move is legal (integer geq 1 and not the num that was already played)
      if(!Number.isInteger(move) || move < 2 || move == picked[0]) {inputErr();return;}
      else document.getElementById("winner").innerHTML = "";

      newNum(move);
      // need to prioritize ending the game. pick a rel prime to one of those picked
      move = primes[Math.floor(Math.random()*primes.length)];
      while(move != picked[0]) move = primes[Math.floor(Math.random()*primes.length)];
      newNum(move);
      if(rem.length == 0) {gameOver(1);return;}
      // this could be better seems non optimal
    }
    else {    // nah, some other move, so rem is now finite and we can go for ender/non-ender play
      // check to make sure the move is legal (in rem list)
      if(!rem.includes(move)) {inputErr();return;}
      newNum(move);
      if(rem.length == 0) {gameOver(-1);return;}

      move = 0;
      var tempMove = picked.slice();
      tempMove.push(0);
      for(var i = 0; i < rem.length && move == 0; i++) {
        tempMove[tempMove.length-1] = rem[i];
        if(linCombWrap(tempMove).length == 0) move = rem[i];
      }
      if(move == 0) move = rem[rem.length-1]; // stall by using ender

      newNum(move);
      if(rem.length == 0) {gameOver(1);return;}
    }
  }
}

// adds the new move to the list, displays it, calculates the new cap, and calculates rem
function newNum (move) {
    // check new move against all prior moves checking for relative primeness
    // may want to do this in a temp to preserve the actual order played but i dont think its necessary
    picked.sort();
    newcap = 0;
    var i = 0;
    while( i < picked.length && newcap == 0){
      if(areCoprimes(move, picked[i])) newcap = (move - 1) * (picked[i] - 1) - 1;
      i++;
    }
    // if the new cap is lower than the previous one, lower the cap
    if(newcap != 0 && newcap < curcap) curcap = newcap;

    // add the new move to the list
    picked.push(move);

    // display the move
    display(move);

    // now to determine the new list of remaining moves.
    newRem(move);
}

function newRem(move) {
  rem.sort();
  var i = 0;
  if(curcap != Infinity){
    while(i < rem.length && rem[i] <= curcap) i++;
    rem.length = i;
  }

  // get list of all linear combos of new picked list
  result = [];
  temprem = [];
  result.length = Math.ceil(curcap/2); // want it to be half the max number
  rem = linCombWrap(picked);
}


function linCombWrap(p){
  linComb(p, p.length, 0);

  // get list of all numbers 2 to curcap
  // subtract former from latter
  for(var i = 2; i <= curcap; i++){
    if(!newAdds.includes(i)) temprem.push(i);
  }

  return temprem;
}
// recusively finds all combos of a certain length in an array
function linComb(input, len, start) {
  if(len === 0) {
    if(result.length == 0) return;
    // add em all together into one num, check if its over curcap, if not, add it to newadds
    var temp = result.reduce(add,0);
    if(temp <= curcap && temp > 1) newAdds.push(temp);
    return;
  }
  for (let i = start; i <= input.length; i++) {
    if(len == 5 && dumbcount == 0) dumbcount++;
    else if(len == 5 && dumbcount == 1) break;
    result[result.length - len] = input[i];
    linComb(input, len-1, i);
  }
}

// game over
function gameOver (w) {
  var winner;
  if(w == 1) winner = "The computer has won. Better luck next time!";
  else winner = "You have won. Congratulations!"
  document.getElementById("winner").innerHTML = winner;
  document.getElementById("move").disabled = true;
}

// checks if the number is prime
function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}

// checks if two numbers are coprime
function areCoprimes(num1, num2) {
   const smaller = num1 > num2 ? num1 : num2;
   for(let ind = 2; ind < smaller; ind++) {
      const condition1 = num1 % ind === 0;
      const condition2 = num2 % ind === 0;
      if(condition1 && condition2) return false;
   }
   return true;
}

// displays the given number as a move
function display(move) {
  if(document.getElementById("disp").innerHTML == '') document.getElementById("disp").innerHTML = move;
  else document.getElementById("disp").innerHTML = document.getElementById("disp").innerHTML.concat(", ", move);
}

// given some prime, returns the product of the next two primes.
function nextPrimes(p) {
  var p1 = p + 2;
  while(!isPrime(p1)) p1 += 2;
  var p2 = p1 + 2;
  while(!isPrime(p2)) p2 += 2;
  return p1*p2;
}

// checks if a composite is of the form 2^n3^m
function compCheck(c) {
  var temp = c;
  while(temp%2 == 0) temp = temp/2;
  while(temp%3 == 0) temp = temp/3;
  if(temp==1) return true;
  else return false;
}

// gets the prime factorization of a number
function primeFactors(n) {
  const factors = [];
  let divisor = 2;

  while (n >= 2) {
    if (n % divisor == 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }
  return factors;
}

// gives input error
function inputErr(){
  document.getElementById("winner").innerHTML = "Input error. Make sure you are choosing a positive integer greater than 1 that has not yet been picked, and is not the sum of multiples of any picked numbers.";
}

function add(accumulator, a) {
    if(a === undefined) return accumulator;
    else return accumulator + a;
}
