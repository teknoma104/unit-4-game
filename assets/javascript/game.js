var playState = 'n';

var startGameText = "Welcome to the TMNT game! Pick a turtle and save April O' Neil from the bad guys!";

var turtleSelected = "";

const TMNTtheme = new Audio("./assets/sounds/tmnt_theme.mp3");
$('#start-button').click(e => TMNTtheme.play());


function charSelect() {
    // $("<div></div>").addClass("row char-select").appendTo(".main-screen");
    $(".info-text").html("Choose your turtle!");

    for (var x = 1; x < 5; x++) {
        var turtlePortrait = $("<img>");
        turtlePortrait.attr("width", "100px");
        turtlePortrait.attr("class", "turtle-portrait");
        console.log("Creating div col for ID char-slot-" + x);
        $(".char-select").append('<div id="char-slot-' + x + '" class="col-md-3 text-center portrait-div"></div>');
        $("#char-slot-" + x).html(turtlePortrait.attr("src", "./assets/images/portrait-" + x +".png"));
    }


}


$("#start-button").click(function () {
    alert("Player clicked start the game!");
    playState = 'y';
    console.log("playState is now: " + playState);
    $(".info-text").html("");
    charSelect();

});


$(document).ready(function () {
    $(".info-text").html(startGameText); 
});

$(".char-select").on ("click", "div", function () {
    var test = $(this).attr("id");
    console.log("test var is assigned value:  " + test);
    console.log("Something got clicked.");
    switch (test) {
        case "char-slot-1":
            console.log("Player clicked on Donatello portrait.");
            turtleSelected = "Donatello";
            break;
        case "char-slot-2":
            console.log("Player clicked on Leonardo portrait.");
            turtleSelected = "Leonardo";
            break;
        case "char-slot-3":
            console.log("Player clicked on Michelangelo portrait.");
            turtleSelected = "Michelangelo";
            break;
        case "char-slot-4":
            console.log("Player clicked on Raphael portrait.");
            turtleSelected = "Raphael";
            break;            
    } 
    alert("You have selected " + turtleSelected);
});