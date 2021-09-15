var curcap; // current highest number that can be picked
var rem, picked; // remaining available and picked lists
var low1, low2; // two lowest values that determine the lower cap on pickable numbers

function startGame(startPlayer) {
    if(startPlayer == 1) loop(1);
    else loop(-1);
}

function loop (curPlayer) {
    var move;
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

function overCheck() {
    if(rem.length == 0) return true;
    else return false;
}
 
function newNum (move) {
    picked.push(move);

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

