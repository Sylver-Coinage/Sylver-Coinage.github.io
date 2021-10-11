var curcap; // current highest number that can be picked
var newcap; // new highest number that can be picked to be checked against curcap
var rem, picked; // remaining available and picked lists
var move; // holds current move
const primes = [5, 7, 11, 13, 17, 19, 23, 29, 31]; // a list of all primes from 5 to 31

// done. just needs to output a random prime from 5 to 31, then launch to player move loop
function cStart() {
  // pick random low prime to set as move
  move = primes[Math.floor(Math.random()*primes.length)];
  // add it to the picked list
  picked.push(move);
  // terminate. this leaves it for the player to respond
  // loop(-1);
}

// done. needs to take input from user, then make the corrseponding correct opening move then launch to player move loop
function pStart() {
  // call player move
  move = playerMove();
  // call newnum
  picked.push(move);
  // c react switch
  if(isPrime(move)){
    // if 2^n3^m then 5
    // if other composite, play one its primes geq 5
  }
  else switch(move) {
    case 2:
      // return 3, game over
      break;
    case 3:
      // return 2, game over
      break;
    default:
      // return product of the next two primes
      // they'll be rel prime so determine cap from this
  }
  // add to list of picked moves
  picked.push(move);

  // terminate. this leaves it for the player to respond
  // loop(-1);
}

// the player has given new input. give to newnum, then process a response
function playerMove(move) {
  // check to make sure the move is legal (in rem list)


  newNum(move);
  // now process a response
}

// still needs to show the new move
function newNum (move) {
    // add the new move to the list
    picked.push(move);

    // display the move
    document.getElementById("disp").innerHTML = document.getElementById("disp").value.concat(", ", move);

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
    for (i = 1; i*move < curcap; i++) {

    }
    checkAdds(move);
}

// not sure what this is for yet
function checkAdds (move) {
    // check all additions of new num against the remaining list of options
}

// game over
function gameOver (winner) {
  if(winner == 1) { // the computer won
  }
  else { // the player won

  }
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
