var turtleDB = [
    { n: "Donatello", hp: 100, mp: 50, atkpwr: 8, spatk: 80, spcost: 40, p: "./assets/images/don-battle-portrait.png"},
    { n: "Leonardo", hp: 130, mp: 50, atkpwr: 9, spatk: 100, spcost: 50, p: "./assets/images/leo-battle-portrait.png"},
    { n: "Michelangelo", hp: 120, mp: 60, atkpwr: 6, spatk: 30, spcost: 20,  p: "./assets/images/mikey-battle-portrait.png"},
    { n: "Raphael", hp: 150, mp: 50, atkpwr: 7, spatk: 50, spcost: 25, p: "./assets/images/raph-battle-portrait.png"},
];

var playState = 'n';

var startGameText = "<p>Welcome to the TMNT game! Pick a turtle and save April O' Neil from the bad guys!</p>";

var turtleSelected = "";

var playerHP = 0;
var playerATK = 0;
var playerMP = 0;

var enemyHP = 0;

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
        $(".char-select").append('<div id="char-slot-' + x + '" class="col-md-3 text-center portrait-div"></div>');
        $("#char-slot-" + x).html(turtlePortrait.attr("src", "./assets/images/portrait-" + x + ".png"));

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

    var battlePortrait = $("<img>");

    switch (turtleSelected) {
        case "Donatello":
            console.log("Adding Donatello's battle portrait.");
            playerHP = turtleDB[0].hp;
            playerMP = turtleDB[0].mp;
            playerATK = turtleDB[0].atkpwr;
            battlePortrait.attr("src", turtleDB[0].p);
            $("#spatk").html('SP ATK: ' + turtleDB[0].spatk);
            break;
        case "Leonardo":
            console.log("Adding Leonardo's battle portrait.");
            playerHP = turtleDB[1].hp;
            playerMP = turtleDB[1].mp;
            playerATK = turtleDB[1].atkpwr;
            battlePortrait.attr("src", turtleDB[1].p);
            $("#spatk").html('SP ATK: ' + turtleDB[1].spatk);
            break;
        case "Michelangelo":
            console.log("Adding Michelangelo's battle portrait.");
            playerHP = turtleDB[2].hp;
            playerMP = turtleDB[2].mp;
            playerATK = turtleDB[2].atkpwr;
            battlePortrait.attr("src", turtleDB[2].p);
            $("#spatk").html('SP ATK: ' + turtleDB[2].spatk);
            break;
        case "Raphael":
            console.log("Adding Raphael's battle portrait.");
            playerHP = turtleDB[3].hp;
            playerMP = turtleDB[3].mp;
            playerATK = turtleDB[3].atkpwr;
            battlePortrait.attr("src", turtleDB[3].p);
            $("#spatk").html('SP ATK: ' + turtleDB[3].spatk);
            break;
    }

    $("#HP").html('HP: ' + playerHP);
    $("#MP").html('MP: ' + playerMP);
    $("#atk").html('ATK: ' + playerATK);
    // $("#hero-battle-portrait").css("border","2px solid #00FF00");
    $("#hero-battle-portrait").prepend(battlePortrait);
    $(".initiallyHiddenBlock").show();
    $("#atk-button").removeClass("initiallyHidden");
    $("#spatk-button").removeClass("initiallyHidden");
    
}

// Click event for start button to move to the next phase,
// which is the character selection process
$("#start-button").click(function () {
    alert("Player clicked start the game!");
    $(this).hide();
    playState = 'y';
    console.log("playState is now: " + playState);
    $(".info-text").html("");
    charSelect();
});


$(document).ready(function () {
    $(".info-text").html(startGameText);
});


// Click function used to determine which turtle the player is choosing
// Checks the parent div ID of the image that the user clicked on to 
// determind which turtle it is
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
