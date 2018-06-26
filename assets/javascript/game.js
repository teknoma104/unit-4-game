var playState = 'n';

var startGameText = "Welcome to the TMNT game! Pick a turtle and save April O' Neil from the bad guys!";

var turtlePortrait = $("<img>");

const TMNTtheme = new Audio("./assets/sounds/tmnt_theme.mp3");
$('#start-button').click(e => TMNTtheme.play());


$(document).ready(function() {
    $(".main-screen").html(startGameText);
});





function charSelect() {
        $("<div></div>").addClass("row char-select").appendTo(".main-screen");
        $("<div></div>").addClass("col-md-3 text-center").appendTo(".char-select");

        for (var x=1; x < 5; x++)
        {
            console.log("Creating div col for ID char-slot-" + x);
            $(".char-select").append('<div id="char-slot-' + x + '" class="col-md-3 text-center"></div>');
        }

        $("#char-slot-1").html(turtlePortrait.attr("src","./assets/images/portrait-donatello.png"));
        $("#char-slot-2").html(turtlePortrait.attr("src","./assets/images/portrait-leonardo.png"));
        $("#char-slot-3").html(turtlePortrait.attr("src","./assets/images/portrait-michelangelo.png"));
        $("#char-slot-4").html(turtlePortrait.attr("src","./assets/images/portrait-raphael.png"));
}


$('#start-button').click(function () {
       alert('Player clicked start the game!');
       playState = 'y';
       console.log("playState is now: " + playState);
       $(".main-screen").html("");
       charSelect();
    
 });


