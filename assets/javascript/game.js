var playState = 'n';

var startGameText = "Welcome to the TMNT game! Pick a turtle and save April O' Neil from the bad guys!";

var turtleSelected = "";

const TMNTtheme = new Audio("./assets/sounds/tmnt_theme.mp3");
$('#start-button').click(e => TMNTtheme.play());


function charSelect() {
    $(".info-text").html("<p>Choose your turtle!</p>");

    // for loop to dynamically generate 4 new divs to store the portrait pictures of each turtle into
    // the char select row in the main HTML
    for (var x = 1; x < 5; x++) {
        var turtlePortrait = $("<img>");
        turtlePortrait.attr("width", "100px");
        turtlePortrait.attr("class", "turtle-portrait");
        console.log("Creating div col for ID char-slot-" + x);
        $(".char-select").append('<div id="char-slot-' + x + '" class="col-md-3 text-center"></div>');
        $("#char-slot-" + x).html(turtlePortrait.attr("src", "./assets/images/portrait-" + x +".png"));
    }
}

function setStage() {
    // Destroys the previous 4 portrait divs uses for selecting turtle character
    $(".char-select").empty();

    // Sets class attribute back to default so that the bio-slot isn't stuck showing a turtle's bio pic
    $("#bio-slot").attr("class","col-lg-6 text-center");

    // Sets the main screen div to stage style in CSS that has the Sewer pic as a background image
    $(".main-screen").addClass("stage");

    // Generates 4 new divs with different ID names so the char-select onclick won't trigger
    for (var x = 1; x < 5; x++) {
        $(".char-select").append('<div id="fighter-slot-' + x + '" class="col-md-3 text-center fighter-portrait-div"></div>');
    }

}

// Click event for start button to move to the next phase,
// which is the character selection process
$("#start-button").click(function () {
    alert("Player clicked start the game!");
    playState = 'y';
    console.log("playState is now: " + playState);
    $(".main-screen").html("");
    charSelect();

});


$(document).ready(function () {
    $(".info-text").html(startGameText);
});


// Click function used to determind which turtle the player is choosing
// Checks the parent div ID of the image that the user clicked on to 
// determind which turtle it is
$(".char-select").on("click", "div", function () {
    var test = $(this).attr("id");
    console.log("test var is assigned value:  " + test);
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

    // Mouseenter/mouseleave event that shows Donatello's bio in bio-slot once a user
    // moves the mouse into Donatello's div area
    $("#char-slot-1")
        .mouseenter(function () {
            $("#bio-slot").addClass("donny-bio");
        })
        .mouseleave(function () {
            $("#bio-slot").removeClass("donny-bio");
        });

    // Mouseenter/mouseleave event that shows Leonardo's bio in bio-slot once a user
    // moves the mouse into Leonardo's div area
    $("#char-slot-2")
        .mouseenter(function () {
            $("#bio-slot").addClass("leo-bio");
        })
        .mouseleave(function () {
            $("#bio-slot").removeClass("leo-bio");
        });

    // Mouseenter/mouseleave event that shows Michelangelo's bio in bio-slot once a user
    // moves the mouse into Michelangelo's div area
    $("#char-slot-3")
        .mouseenter(function () {
            $("#bio-slot").addClass("mikey-bio");
        })
        .mouseleave(function () {
            $("#bio-slot").removeClass("mikey-bio");
        });

    // Mouseenter/mouseleave event that shows Raphael's bio in bio-slot once a user
    // moves the mouse into Raphael's div area
    $("#char-slot-4")
        .mouseenter(function () {
            $("#bio-slot").addClass("raph-bio");
        })
        .mouseleave(function () {
            $("#bio-slot").removeClass("raph-bio");
        });

    // Confirms with user that the turtle the user clicked on is the one they want to use
    // if true, calls the setStage function, if user cancels, they can still click on other turtles
    var playerChoice = confirm("You have selected " + turtleSelected + ". Is this your final choice?");
    if (playerChoice === true) {
        console.log("Player has decided on " + turtleSelected);
        setStage();
    }
});
