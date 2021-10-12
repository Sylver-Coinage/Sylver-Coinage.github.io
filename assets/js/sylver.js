var curcap; // current highest number that can be picked
var newcap; // new highest number that can be picked to be checked against curcap
var rem, picked; // remaining available and picked lists
var move; // holds current move
const primes = [5, 7, 11, 13, 17, 19, 23, 29, 31]; // a list of all primes from 5 to 31

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
// 4 -------- unclear what happens in other composite case about curcap
function pStart(move) {
  // is the move legal? greater than 1, an integer, etc?
  if(!isInteger(move) || move < 2) inputErr();

  // add to picked list
  picked.push(move);

  // display move
  display(move);

  // c react switch
  if(!isPrime(move)){
    if(compCheck(move)) newNum(5);
    else { // if other composite, play one its primes geq 5
      var pfactors = primeFactors(move);
      newNum(pfactors[0]);   // ------ what to do about curcap here?
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
      picked.push(nexMove);
      display(nexMove);
      // they'll be rel prime so determine cap from this
      curcap = (5 - 1) * (nexMove - 1) - 1;
  }

  // terminate. this leaves it for the player to respond
  // loop(-1);
}

// the player has given new input. give to newnum, then process a response
// 5 -------- figure out a response based on some strategy
function playerMove(move) {
  if(picked.length == 0) pStart(move);  // is this the first move?
  else {
    if(picked.length == 1) {       // is it the third move, ie the comp went first?
      // check to make sure the move is legal (integer geq 1 and not the num that was already played)
      if(!isInteger(move) || move < 2 || move == picked[0]) inputErr();
      newNum(move);
      // need to prioritize ending the game. pick a rel prime to one of those picked
      // ---------- figure out a response
    }
    else {    // nah, some other move, so rem is now finite and we can go for ender/non-ender play
      // check to make sure the move is legal (in rem list)
      // ---------- check rem list
      newNum(move);
      // ---------- figure out a response
    }
  }
}

// adds the new move to the list, displays it, calculates the new cap, and calculates rem
// 4 ---------- needs to calculate new rem
function newNum (move) {
    // add the new move to the list
    picked.push(move);

    // display the move
    display(move);

    // check new move against all prior moves checking for relative primeness
    // may want to do this in a temp to preserve the actual order played but i dont think its necessary
    picked.sort();
    newcap = 0;
    picked.forEach(function(prev){
      if(areCoprimes(move, prev)) {
        newcap = (move - 1) * (prev - 1) - 1;
        break;
       }
    })
    // if the new cap is lower than the previous one, lower the cap
    if(newcap != 0 && newcap < curcap) curcap = newcap;

    // now to determine the new list of remaining moves.
    // ---------- determine rem
}

// game over
function gameOver (w) {
  const winner;
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
