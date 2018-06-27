var playState = 'n';

var startGameText = "<p>Welcome to the TMNT game! Pick a turtle and save April O' Neil from the bad guys!</p>";

var turtleSelected = "";

const TMNTtheme = new Audio("./assets/sounds/tmnt_theme.mp3");
$('#start-button').click(e => TMNTtheme.play());


function charSelect() {
    // $("<div></div>").addClass("row char-select").appendTo(".main-screen");
    $(".info-text").html("<p>Choose your turtle!</p>");

    for (var x = 1; x < 5; x++) {
        var turtlePortrait = $("<img>");
        turtlePortrait.attr("width", "100px");
        turtlePortrait.attr("class", "turtle-portrait");
        console.log("Creating div col for ID char-slot-" + x);
        $(".char-select").append('<div id="char-slot-' + x + '" class="col-md-3 text-center portrait-div"></div>');
        $("#char-slot-" + x).html(turtlePortrait.attr("src", "./assets/images/portrait-" + x + ".png"));

    }

    // $(".main-screen").append('<div id="bio-slot" class="row justify-content-center"></div>');
    // $("#bio-slott").append('<div class="col-lg-6 text-center bio-slot-class"></div>');

}

function setStage() {
    $(".char-select").empty();
    $("#bio-slot").attr("class","col-lg-6 text-center");
    $(".main-screen").addClass("stage");
    for (var x = 1; x < 5; x++) {
        $(".char-select").append('<div id="fighter-slot-' + x + '" class="col-md-3 text-center fighter-portrait-div"></div>');
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

$(".char-select").on("click", "div", function () {
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

    $("#char-slot-1")
        .mouseenter(function () {
            $("#bio-slot").addClass("donny-bio");
        })
        .mouseleave(function () {
            $("#bio-slot").removeClass("donny-bio");
        });

    $("#char-slot-2")
        .mouseenter(function () {
            $("#bio-slot").addClass("leo-bio");
        })
        .mouseleave(function () {
            $("#bio-slot").removeClass("leo-bio");
        });

    $("#char-slot-3")
        .mouseenter(function () {
            $("#bio-slot").addClass("mikey-bio");
        })
        .mouseleave(function () {
            $("#bio-slot").removeClass("mikey-bio");
        });

    $("#char-slot-4")
        .mouseenter(function () {
            $("#bio-slot").addClass("raph-bio");
        })
        .mouseleave(function () {
            $("#bio-slot").removeClass("raph-bio");
        });

    var playerChoice = confirm("You have selected " + turtleSelected + ". Is this your final choice?");
    if (playerChoice === true) {
        console.log("Player has decided on " + turtleSelected);
        setStage();
    }
});