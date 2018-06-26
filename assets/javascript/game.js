var playState = 'n';

var startGameText = "Welcome to the TMNT game! Pick a turtle and save April O' Neil from the bad guys!";

var turtleSelected = "";

const TMNTtheme = new Audio("./assets/sounds/tmnt_theme.mp3");
$('#start-button').click(e => TMNTtheme.play());


$(document).ready(function () {
    $(".main-screen").html(startGameText);
    
});





function charSelect() {
    

    $("<div></div>").addClass("row char-select").appendTo(".main-screen");

    for (var x = 1; x < 5; x++) {
        var turtlePortrait = $("<img>");
        turtlePortrait.attr("width", "100px");
        turtlePortrait.attr("class", "turtle-portrait");
        console.log("Creating div col for ID char-slot-" + x);
        $(".char-select").append('<div id="char-slot-' + x + '" class="col-md-3 text-center"></div>');
        $("#char-slot-" + x).html(turtlePortrait.attr("src", "./assets/images/portrait-" + x +".png"));
    }


}

// $(".turtle-portrait").hover(function () {
//     $(this).css("border", "5px solid red");
// });


$("#start-button").click(function () {
    alert("Player clicked start the game!");
    playState = 'y';
    console.log("playState is now: " + playState);
    $(".main-screen").html("");
    charSelect();

});


$(".turtle-portrait").click(function () {
    var test = $('.turtle-portrait').attr('id');
    console.log("Something got clicked.");
    switch (test) {
        case 1:
            console.log("Player clicked on Donatello portrait.");
            turtleSelected = "Donatello";
            break;
        case 2:
            console.log("Player clicked on Leonardo portrait.");
            turtleSelected = "Leonardo";
            break;
        case 3:
            console.log("Player clicked on Michelangelo portrait.");
            turtleSelected = "Michelangelo";
            break;
        case 4:
            console.log("Player clicked on Raphael portrait.");
            turtleSelected = "Raphael";
            break;            
    } 
    alert("You have selected " + turtleSelected);
});
