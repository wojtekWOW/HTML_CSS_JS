window.onload = appendCards;
//initial function appending cards on board
function appendCards() {
    var boardContent = "";

    for (i = 0; i < 12; i++) {
        boardContent = boardContent + '<div class="card" id="c' + i + '"></div>';
        if ((i + 1) % 4 == 0) boardContent = boardContent + '<div style="clear:both;"></div>';
    };
    document.getElementById("board").innerHTML = boardContent;
    //add click event listeners to each card
    for(i=0;i<12;i++){
        $("#c"+i).on("click", function (){ 
            revealCard(this.id);
            console.log(this);
        })
    };
};
//array of pictrues for a memory game
var cards = ["taipei-101.jpg", "burj-khalifa.jpg", "manta-resort.jpg", "marina_bay.jpg", "palm-jumeirah.jpg", "taipei-101.jpg", "the-shard.jpg", "palm-jumeirah.jpg", "manta-resort.jpg", "burj-khalifa.jpg", "the-shard.jpg", "marina_bay.jpg"];
//randomized array of pictrues
cards = shuffle(cards);

//utility function to randomize array of cards
function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
};

// variables used for managing the game
var oneRevealed = false;
var firstTry;
var currentCard;
var turnCounter = 0;
var freezeClick=false;
var remainingPairs =6;
//main function to reveal cards and decide if there is a pair or not
function revealCard(num) {
    if(freezeClick){
        return;
    }
    currentCard = num;
    var cardId = num.substring(1);
    if (oneRevealed == false) {
        oneRevealed = true;
        firstTry = cardId;
        showCard(cardId);

    } else {
        if(firstTry==cardId)
        return;
        showCard(cardId);
        freezeClick=true;
        if (cards[firstTry] == cards[cardId]) {
            oneRevealed = false;
            setTimeout(removeCards,2000);
            turnCounter++;
            $("#counter").html(turnCounter);
        } else {
            setTimeout(hideCards, 2000);
            oneRevealed = false;
            turnCounter++;
            $("#counter").html(turnCounter);
        }
    }
};
//show clicked card
function showCard(id) {
    $("#c" + id).css("background-image", 'url(img/' + cards[id] + ')');
}
//hide two cards if it's no match
function hideCards() {
    $("#" + currentCard).css("background-image", 'url("img/card.png")');
    $("#c" + firstTry).css("background-image", 'url("img/card.png")');
    restoreClick();
}
//remove two cards if it's a match
function removeCards() {
    $("#c" + firstTry).css({
        "opacity": '0%',
        "cursor": "default"
    });
    $("#c"+firstTry).off(); //remove event listeners

    $("#" + currentCard).css({
        "opacity": '0%',
        "cursor": "default"
    });
    $("#"+currentCard).off(); //remove event listeners
    restoreClick();
    remainingPairs--;
    if(remainingPairs==0){
        endGame();
    }
}
//restore mouse clicks after 2 cards are hidden or removed
function restoreClick() {
    freezeClick=false;
}

function endGame(){
    $("#board").html('<div id="end"><div id="again">Do you want to play again</div><input type="radio" name="yes" id="yes"><label for="yes">Yes</label><input type="radio" name="no" id="no"><label for="no">No</label></div>')
    if($("#yes").is(":checked")){//nie działa jeszcze
        setTimeout(reload, 1500);
    }

    //
}
//restart
function reload() {
    window.location.reload(true);
}