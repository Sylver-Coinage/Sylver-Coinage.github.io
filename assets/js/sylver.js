var curcap; // current highest number that can be picked
var rem, picked; // remaining available and picked lists
var low1, low2; // two lowest values that determine the lower cap on pickable numbers
var move; // holds current move
const primes = [5, 7, 11, 13, 17, 19, 23, 29, 31]; // a list of all primes from 5 to 31

// done. just needs to output a random prime from 5 to 31, then launch to player move loop
function cStart() {
  // pick random low prime to set as move
  move = primes[Math.floor(Math.random()*primes.length)];
  // call newnum on it
  newNum(move);
  // call loop for player
  loop(-1);
}

// done. needs to take input from user, then make the corrseponding correct opening move then launch to player move loop
function pStart() {
  // call player move
  move = playerMove();
  // call newnum
  newNum(move);
  // c react switch
  if(isPrime(move)){
    // if 2^n3^m then 5
    // if other composite, play one its primes geq 5
  }
  else switch(move) {
    case 2:
      // return 3
      break;
    case 3:
      // return 2
      break;
    default:
      // return product of the next two primes
  }
  // call newnum on it
  newNum(move);
  // call loop for player
  loop(-1);
}

// not done
function loop (curPlayer) {
    if(curPlayer == 1) move = compMove();
    else move = playerMove();

    newNum(move);

    if(overCheck()) gameOver();
    else loop(curPlayer * -1);
}

function compMove() {
    // figure out next number to play
    // return that number
}

function playerMove() {
    // take input for player
    // return that number
}

// done. just needs to check rem
function overCheck() {
    if(rem.length == 0) return true;
    else return false;
}

// still needs to show the new move
function newNum (move) {
    // add the new move to the list
    picked.push(move);

    // display the move

    // check new move against all prior moves checking for relative primeness

    if(move < low1) low1 = move;
    else if (move < low2) low2 = move;
    curcap = low1 * low2;

    for (i = 1; i*move < curcap; i++) {

    }
    checkAdds(move);
}

function checkAdds (move) {
    // check all additions of new num against the remaining list of options
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
