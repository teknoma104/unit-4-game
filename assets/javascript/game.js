var turtleDB = [
    { n: "Donatello", hp: 100, mp: 50, atkpwr: 9, spatk: 80, spcost: 40, catk: 20, p: "./assets/images/don-battle-portrait.png" },
    { n: "Leonardo", hp: 130, mp: 50, atkpwr: 10, spatk: 100, spcost: 50, catk: 35, p: "./assets/images/leo-battle-portrait.png" },
    { n: "Michelangelo", hp: 120, mp: 60, atkpwr: 7, spatk: 30, spcost: 20, catk: 5, p: "./assets/images/mikey-battle-portrait.png" },
    { n: "Raphael", hp: 140, mp: 50, atkpwr: 8, spatk: 50, spcost: 25, catk: 15, p: "./assets/images/raph-battle-portrait.png" },
];

var startGameText = "<p>Welcome to the TMNT game! Pick a turtle and battle your brothers!</p>";

var turtleSelected = "";
var enemySelected = "";

// Global variables to keep track of which turtles are still available for battle
var charsTakenOutOfPlay = [];

// globally stores attribute values of the turtle the player selected to fight against other turtles
var playerHP = 0;
var playerATK = 0;
var playerMP = 0;
var playerSPATK = 0;
var playerMPCost = 0;
var newATKPower = 0;

var enemyHP = 0;
var enemyCATK = 0;

// Sound files to play for various scenarios (start game, win battles, lose battles)
const TMNTtheme = new Audio("./assets/sounds/tmnt_theme.mp3");
$('#start-button').click(e => TMNTtheme.play());

const winTheme = new Audio("./assets/sounds/victory.mp3");
const gameOver = new Audio("./assets/sounds/game_over.mp3");


function charSelect() {

    $(".info-text").html("Select your turtle!");

    // For loop to dynamically generate 4 new divs to store the portrait pictures of each turtle into
    // the char select row in the main HTML
    for (var x = 1; x < 5; x++) {
        var turtlePortrait = $("<img>");
        turtlePortrait.attr("width", "100px");
        turtlePortrait.attr("class", "turtle-portrait");

        $("#char-select").append('<div id="char-slot-' + x + '" class="col-md-3 text-center portrait-div"></div>');
        $("#char-slot-" + x).html(turtlePortrait.attr("src", "./assets/images/portrait-" + x + ".png"));

    }

    // Creates a reusable variable tooltip with positions x,y set for the offset
    // where the tooltip will popup in relation to the user's mouse cursor
    var tooltip = $('#tooltip'),
        offset = {
            x: 20,
            y: 20
        };

    // Mouse hover tooltip that shows Donatello's stats
    // to help user decide which turtle to pick to fight as
    $('#char-slot-1').hover(function () {
        tooltip.show()
    }, function () {
        tooltip.hide();
    }).mousemove(function (e) {
        tooltip.css({
            top: e.pageY + offset.y,
            left: e.pageX + offset.x
        }).html(
            'HP: ' + turtleDB[0].hp + "<br>" +
            "MP: " + turtleDB[0].mp + "<br>" +
            "ATK: " + turtleDB[0].atkpwr + "<br>" +
            "SPATK: " + turtleDB[0].spatk + "<br>" +
            "SPATK MP Cost: " + turtleDB[0].spcost);
    });

    // mouse hover tooltip that shows Leonardo's stats
    // to help user decide which turtle to pick to fight as
    $('#char-slot-2').hover(function () {
        tooltip.show()
    }, function () {
        tooltip.hide();
    }).mousemove(function (e) {
        tooltip.css({
            top: e.pageY + offset.y,
            left: e.pageX + offset.x
        }).html(
            'HP: ' + turtleDB[1].hp + "<br>" +
            "MP: " + turtleDB[1].mp + "<br>" +
            "ATK: " + turtleDB[1].atkpwr + "<br>" +
            "SPATK: " + turtleDB[1].spatk + "<br>" +
            "SPATK MP Cost: " + turtleDB[1].spcost);
    });

    // Mouse hover tooltip that shows Michelangelo's stats
    // to help user decide which turtle to pick to fight as
    $('#char-slot-3').hover(function () {
        tooltip.show()
    }, function () {
        tooltip.hide();
    }).mousemove(function (e) {
        tooltip.css({
            top: e.pageY + offset.y,
            left: e.pageX + offset.x
        }).html(
            'HP: ' + turtleDB[2].hp + "<br>" +
            "MP: " + turtleDB[2].mp + "<br>" +
            "ATK: " + turtleDB[2].atkpwr + "<br>" +
            "SPATK: " + turtleDB[2].spatk + "<br>" +
            "SPATK MP Cost: " + turtleDB[2].spcost);
    });

    // Mouse hover tooltip that shows Raphael's stats
    // to help user decide which turtle to pick to fight as
    $('#char-slot-4').hover(function () {
        tooltip.show()
    }, function () {
        tooltip.hide();
    }).mousemove(function (e) {
        tooltip.css({
            top: e.pageY + offset.y,
            left: e.pageX + offset.x
        }).html(
            'HP: ' + turtleDB[3].hp + "<br>" +
            "MP: " + turtleDB[3].mp + "<br>" +
            "ATK: " + turtleDB[3].atkpwr + "<br>" +
            "SPATK: " + turtleDB[3].spatk + "<br>" +
            "SPATK MP Cost: " + turtleDB[3].spcost);
    });

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

    // Click function used to determine which turtle the player is choosing via switch case
    // Checks the parent div ID of the image that the user clicked on to 
    // determine which turtle it is
    $("#char-select").on("click", ".portrait-div", function () {
        tooltip.hide();
        var test = $(this).attr("id");

        switch (test) {
            case "char-slot-1":
                turtleSelected = "Donatello";
                break;
            case "char-slot-2":
                turtleSelected = "Leonardo";
                break;
            case "char-slot-3":
                turtleSelected = "Michelangelo";
                break;
            case "char-slot-4":
                turtleSelected = "Raphael";
                break;
        }

        // Confirms with user that the turtle the user clicked on is the one they want to use
        // if true, calls the setStage function, if user cancels, they can still click on other turtles
        // Updates charsTakenOutOfPlay array by pushing hero turtle's name selected into the array to
        // keep track of turtles not needed in play/as enemies
        var playerChoice = confirm("You have selected " + turtleSelected + ". Is this your final choice?");
        if (playerChoice === true) {
            charsTakenOutOfPlay.push(turtleSelected);
            setStage();
        }
    });
}

function setStage() {

    // Destroys the previous 4 portrait divs uses for selecting turtle character
    $("#char-select").empty();

    // Sets class attribute back to default so that the bio-slot isn't stuck showing a turtle's bio pic
    $("#bio-slot").attr("class", "col-lg-6 text-center");

    // Sets the main screen div to stage style in CSS that has the Sewer pic as a background image
    $(".main-screen").addClass("stage");

    var battlePortrait = $("<img>");

    // Switch case to build left side battle portrait and populate it with Hero turtle's stats from array
    switch (turtleSelected) {
        case "Donatello":
            playerHP = turtleDB[0].hp;
            playerMP = turtleDB[0].mp;
            playerMPCost = turtleDB[0].spcost;
            playerATK = turtleDB[0].atkpwr;
            playerSPATK = turtleDB[0].spatk;
            battlePortrait.attr({ src: turtleDB[0].p, width: "142px" });
            break;
        case "Leonardo":
            playerHP = turtleDB[1].hp;
            playerMP = turtleDB[1].mp;
            playerMPCost = turtleDB[1].spcost;
            playerATK = turtleDB[1].atkpwr;
            playerSPATK = turtleDB[1].spatk;
            battlePortrait.attr({ src: turtleDB[1].p, width: "142px" });
            break;
        case "Michelangelo":
            playerHP = turtleDB[2].hp;
            playerMP = turtleDB[2].mp;
            playerMPCost = turtleDB[2].spcost;
            playerATK = turtleDB[2].atkpwr;
            playerSPATK = turtleDB[2].spatk;
            battlePortrait.attr({ src: turtleDB[2].p, width: "142px" });
            break;
        case "Raphael":
            playerHP = turtleDB[3].hp;
            playerMP = turtleDB[3].mp;
            playerMPCost = turtleDB[3].spcost;
            playerATK = turtleDB[3].atkpwr;
            playerSPATK = turtleDB[3].spatk;
            battlePortrait.attr({ src: turtleDB[3].p, width: "142px" });
            break;
    }

    // Fills the left side battle portrait divs with appropriate stats info
    $("#HP").html('HP: ' + playerHP);
    $("#MP").html('MP: ' + playerMP);
    $("#atk").html('ATK: ' + playerATK);
    $("#spatk").html('SP ATK: ' + playerSPATK);

    $("#hero-portrait").html(battlePortrait);

    selectEnemy();

}

function selectEnemy() {

    var turtlePortrait1 = $("<img>");
    var turtlePortrait2 = $("<img>");
    var turtlePortrait3 = $("<img>");
    var enemyPortrait = $("<img>");

    var validCharPicked = false;

    // Forces the attack and special attack buttons to be hidden at this phase of selecting the enemy
    // Neccessary as it breaks the game if the user clicks these buttons too early before a valid enemy is set
    $("#atk-button").hide();
    $("#spatk-button").hide();

    $(".info-text").html("Select the enemy you with to attack!");

    // Generates 4 new divs with different ID names so the char-select onclick won't trigger
    for (var x = 1; x < 5; x++) {
        $("#char-select").append('<div id="fighter-slot-' + x + '" class="col-md-3 text-center fighter-portrait-div"></div>');
    }

    // Switch statement used to determine which enemy turtle that the player will select to fight against
    // Logic for this switch case is that if one turtle is picked then the other 3 are enemies now and will be displayed to be
    // selectable as enemy to battle against
    switch (turtleSelected) {
        case "Donatello":
            $("#fighter-slot-2").html(turtlePortrait1.attr({
                src: "./assets/images/portrait-2.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-2").attr("id", "Leonardo");
            $("#fighter-slot-3").html(turtlePortrait2.attr({
                src: "./assets/images/portrait-3.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-3").attr("id", "Michelangelo");
            $("#fighter-slot-4").html(turtlePortrait3.attr({
                src: "./assets/images/portrait-4.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-4").attr("id", "Raphael");
            break;
        case "Leonardo":
            $("#fighter-slot-2").html(turtlePortrait1.attr({
                src: "./assets/images/portrait-1.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-2").attr("id", "Donatello");
            $("#fighter-slot-3").html(turtlePortrait2.attr({
                src: "./assets/images/portrait-3.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-3").attr("id", "Michelangelo");
            $("#fighter-slot-4").html(turtlePortrait3.attr({
                src: "./assets/images/portrait-4.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-4").attr("id", "Raphael");
            break;
        case "Michelangelo":
            $("#fighter-slot-2").html(turtlePortrait1.attr({
                src: "./assets/images/portrait-1.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-2").attr("id", "Donatello");
            $("#fighter-slot-3").html(turtlePortrait2.attr({
                src: "./assets/images/portrait-2.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-3").attr("id", "Leonardo");
            $("#fighter-slot-4").html(turtlePortrait3.attr({
                src: "./assets/images/portrait-4.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-4").attr("id", "Raphael");
            break;
        case "Raphael":
            $("#fighter-slot-2").html(turtlePortrait1.attr({
                src: "./assets/images/portrait-1.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-2").attr("id", "Donatello");
            $("#fighter-slot-3").html(turtlePortrait2.attr({
                src: "./assets/images/portrait-2.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-3").attr("id", "Leonardo");
            $("#fighter-slot-4").html(turtlePortrait3.attr({
                src: "./assets/images/portrait-3.png",
                width: "100px",
                class: "battle-portrait"
            }));
            $("#fighter-slot-4").attr("id", "Michelangelo");
            break;
    }

    // This for loop is neccessary when this function gets called multiple times as the enemy list dwindles
    // It matches the turtle's name in the div ID and empties out all child elements (img tag) and removes
    // the turtle's name out of the ID attribute of the div to prevent further detection by the click function
    // coming up below
    for (var y = 0; y < charsTakenOutOfPlay.length; y++) {
        $('#' + charsTakenOutOfPlay[y]).empty();
        $('#' + charsTakenOutOfPlay[y]).removeAttr("id");
    }


    // On.click function that will set the enemy portrait stats and populates the data on the right side of the screen
    // Once an enemy is set, validCharPicked is set to true to be later used in an if statement to move onto the battle
    // phase function
    $("#char-select").off().on("click", ".fighter-portrait-div", function () {
        var test = $(this).attr("id");

        switch (test) {
            case "Donatello":
                enemySelected = "Donatello";
                enemyHP = turtleDB[0].hp;
                enemyCATK = turtleDB[0].catk;
                enemyPortrait.attr({ src: turtleDB[0].p, width: "142px" });
                $("#enemy-portrait").html(enemyPortrait);
                $("#enemyHP").html('HP: ' + enemyHP);
                $("#enemyCAtk").html('CATK: ' + enemyCATK);
                $("#char-select").empty();
                validCharPicked = true;
                break;
            case "Leonardo":
                enemySelected = "Leonardo";
                enemyHP = turtleDB[1].hp;
                enemyCATK = turtleDB[1].catk;
                enemyPortrait.attr({ src: turtleDB[1].p, width: "142px" });
                $("#enemy-portrait").html(enemyPortrait);
                $("#enemyHP").html('HP: ' + enemyHP);
                $("#enemyCAtk").html('CATK: ' + enemyCATK);
                $("#char-select").empty();
                validCharPicked = true;
                break;
            case "Michelangelo":
                enemySelected = "Michelangelo";
                enemyHP = turtleDB[2].hp;
                enemyCATK = turtleDB[2].catk;
                enemyPortrait.attr({ src: turtleDB[2].p, width: "142px" });
                $("#enemy-portrait").html(enemyPortrait);
                $("#enemyHP").html('HP: ' + enemyHP);
                $("#enemyCAtk").html('CATK: ' + enemyCATK);
                $("#char-select").empty();
                validCharPicked = true;
                break;
            case "Raphael":
                enemySelected = "Raphael";
                enemyHP = turtleDB[3].hp;
                enemyCATK = turtleDB[3].catk;
                enemyPortrait.attr({ src: turtleDB[3].p, width: "142px" });
                $("#enemy-portrait").html(enemyPortrait);
                $("#enemyHP").html('HP: ' + enemyHP);
                $("#enemyCAtk").html('CATK: ' + enemyCATK);
                $("#char-select").empty();
                validCharPicked = true;
                break;
            default:
                alert("Nothing here! Please select a turtle to fight against.");
        }

        // Pushes the name of the selected enemy turtle's name to this array to keep track of which turtles are valid in play to be opponents later on
        charsTakenOutOfPlay.push(test);

        if (validCharPicked === true)
            battlePhase();
    });


}

function battlePhase() {

    // Reveals the attack and special attack button during batttle phase
    $("#atk-button").removeClass("initiallyHidden");
    $("#spatk-button").removeClass("initiallyHidden");
    $("#atk-button").show();
    $("#spatk-button").show();
    $(".info-text").html("Time to fight! Special attacks require MP. Each turtle has different costs and different attack power for their special attack.");

    // newATKpower keeps track of the player's growing atk stat
    // If newATKPower is 0, it means brand new hero who hasn't fought yet so we set this variable to equal the hero's
    // attack stat value
    // In 2nd scenario, if the user has fought already, then we do not want to reset this variable as one of the
    // conditions of this assignment is to have the player's ATK power increased each round by their base atk power
    if (newATKPower === 0)
        newATKPower = playerATK;
    var maxPlayerHP = playerHP;
    var maxPlayerMP = playerMP;
    var maxEnemyHP = enemyHP;

    $("#atk-button").off().on("click", function () {

        // checks conditions of enemy's and player's health
        // if both are okay then proceed to actual battle where each side takes damage, it assumed here that the
        // player gets the first hit in every time
        if (enemyHP <= 0) {
            enemyDefeated();
        }
        else if (playerHP <= 0) {
            playerDefeated();
        }
        else if ((playerHP > 0) && (enemyHP > 0)) {
            $("#bio-slot").html("You attacked for " + newATKPower + "! The enemy counterattacks for " + enemyCATK + "!");

            enemyHP -= newATKPower;

            // This is for aesthetics, colors the Enemy's HP text depending on how much HP they have left
            // in relation to their max HP
            // If HP is less than 100% and greating than 50, change font color to yellow (took damage but still okay)
            // If HP is less than 50%, change the font color to red (near defeat)
            if ((((enemyHP / maxEnemyHP) * 100) < 100) && (((enemyHP / maxEnemyHP) * 100) > 50))
                $("#enemyHP").css("color", "yellow");
            else if (((enemyHP / maxEnemyHP) * 100) < 50)
                $("#enemyHP").css("color", "red");

            // Updates enemy div with updated Enemy HP value
            $("#enemyHP").html('HP: ' + enemyHP);

            // Second health check right after the enemy takes damage from the player
            // This is to check if the player defeated the enemy or not in this attack
            // so that the player can move back to enemy selection phase without taking
            // unneccessary damage from a defeated opponent
            // If the enemy isn't defeated, moves to else statement where the player takes
            // damage from the enemy's counter attack
            if (enemyHP <= 0)
                enemyDefeated();
            else {
                playerHP -= enemyCATK;

                // Same color aesthetics from earlier but this time for the player HP text on left side
                // if health between 99%-50%, color HP text yellow
                // if health is below 50%, color HP text red
                if ((((playerHP / maxPlayerHP) * 100) < 100) && (((playerHP / maxPlayerHP) * 100) > 50))
                    $("#HP").css("color", "yellow");
                else if (((playerHP / maxPlayerHP) * 100) < 50)
                    $("#HP").css("color", "red");

                // Updates player div with updated Player HP value
                $("#HP").html('HP: ' + playerHP);

                // Second health check right after the player takes damage from the enemy's counterattack
                // If player's HP reduced to 0 or negative, call playerDefeated function which ends the game
                // else increase the player's atk power by base atk power and stores that into newATKPower
                // and updates player's atk text in player's div
                if (playerHP <= 0)
                    playerDefeated();
                else {
                    newATKPower += playerATK;
                    $("#atk").html('ATK: ' + newATKPower);
                }
            }
        }
    });

    $("#spatk-button").off().on("click", function () {

        // special attack button functions identically as attack button function except
        // it first tests if player has enough MP to perform the special attack by pre-emptively subracting
        // the MP cost of the special attack from the player's current MP
        // if this is valid then proceed to store the subtracted MP cost from the player's MP then moves onto
        // identical health checks from attack button function
        if (playerMP - playerMPCost >= 0) {
            playerMP -= playerMPCost;

            // first enemy and player health check
            if (enemyHP <= 0)
                enemyDefeated();
            else if (playerHP <= 0)
                playerDefeated();
            else if ((playerHP > 0) && (enemyHP > 0)) {
                $("#bio-slot").html("You use your special attack for " + playerSPATK + "! The enemy counterattacks for " + enemyCATK + "!");

                enemyHP -= playerSPATK;

                if ((((enemyHP / maxEnemyHP) * 100) < 100) && (((enemyHP / maxEnemyHP) * 100) > 50))
                    $("#enemyHP").css("color", "yellow");
                else if (((enemyHP / maxEnemyHP) * 100) < 50)
                    $("#enemyHP").css("color", "red");

                $("#enemyHP").html('HP: ' + enemyHP);

                // Aesthetic text coloring again but this time for the player's MP text
                if ((((playerMP / maxPlayerMP) * 100) < 100) && (((playerMP / maxPlayerMP) * 100) > 50))
                    $("#MP").css("color", "yellow");
                else if (((playerMP / maxPlayerMP) * 100) < 50)
                    $("#MP").css("color", "red");

                $("#MP").html('MP: ' + playerMP);

                // second health check after player hits the enemy with special attack
                if (enemyHP <= 0)
                    enemyDefeated();
                else if (playerHP <= 0)
                    playerDefeated();
                else {
                    playerHP -= enemyCATK;

                    if ((((playerHP / maxPlayerHP) * 100) < 100) && (((playerHP / maxPlayerHP) * 100) > 50))
                        $("#HP").css("color", "yellow");
                    else if (((playerHP / maxPlayerHP) * 100) < 50)
                        $("#HP").css("color", "red");

                    $("#HP").html('HP: ' + playerHP);

                    // third health check after player takes damage from enemy's counter attack
                    // no else statement because the player's attack power will not increase when using a special attack
                    if (playerHP <= 0)
                        playerDefeated();
                }
            }
        }
        else
            $("#bio-slot").html("Not enough MP to do a special attack. Please use a regular attack.");
    });
}

function enemyDefeated() {
    // This function is called if the player defeats the current enemy
    
    // Removes the enemy stats from the right side of the screen then plays victory theme audio
    $("#enemy-portrait").html("");
    $("#enemyHP").html("");
    $("#enemyHP").css("color", "#00FF00");
    $("#enemyCAtk").html("");
    $("#bio-slot").html("");
    winTheme.play();

    // Conditional check to see if player has defeated all remaining turtles
    // if true, update text to congratulate player on winning the game then hides atk/spatk buttons and reveals Reset button to restart the game
    // if there are turtles remaining, alert window to congratulate player defeating opponent and moves bck to enemy selection phase
    if (charsTakenOutOfPlay.length === 4) {
        $(".info-text").html("Congratulations! You beat all your opponents! Hit the reset button to play again.");
        // $("#atk-button").addClass("initiallyHidden");
        $("#atk-button").hide();
        // $("#spatk-button").addClass("initiallyHidden");
        $("#spatk-button").hide();
        $("#reset-button").removeClass("initiallyHidden");
        $("#reset-button").show();
    }
    else {
        alert("You beat your enemy! Moving back to enemy selection phase.");
        selectEnemy();
    }
}

function playerDefeated() {
    // This function is called when the player is defeated in battle
    
    // hides the atk/spatk buttons and reveals the Reset button and plays the game over audio
    $("#atk-button").attr("class", "initiallyHidden");
    $("#spatk-button").attr("class", "initiallyHidden");
    $("#reset-button").removeClass("initiallyHidden");
    $("#reset-button").show();

    $(".info-text").html("You were defeated. Game Over! Hit the reset button to play again.");
    gameOver.play();
}


$(document).ready(function () {
    $(".info-text").html(startGameText);

    // Click function for start button to move to the next phase of the game,
    // which is the character selection process
    // When click on, it will hide itself until a function reveals it again
    $("#start-button").click(function () {
        alert("Player clicked start the game!");
        $(this).hide();
        $(".info-text").html("");
        charSelect();
    });

    // Click function for the reset button, will hide itself when clicked
    // Resets all global variables and divs to be empty
    // Resets css font colors for HP divs
    // Reveals the start button so user can play the game again after reset is done
    $("#reset-button").click(function () {
        alert("Resetting Game!");
        $(this).hide();
        playerHP = 0;
        playerATK = 0;
        playerMP = 0;
        playerSPATK = 0;
        playerMPCost = 0;
        newATKPower = 0;

        charsTakenOutOfPlay = [];

        enemyHP = 0;
        enemyCATK = 0;

        $(".info-text").html(startGameText);
        $("#char-select").empty();
        $("#bio-slot").html("");

        $("#HP").html("");
        $("#MP").html("");
        $("#atk").html("");
        $("#spatk").html("");
        $("#hero-portrait").html("");

        $("#enemy-portrait").html("");
        $("#enemyHP").html("");
        $("#enemyCAtk").html("");

        $("#HP").css("color", "#00FF00");
        $("#enemyHP").css("color", "#00FF00");

        $("#start-button").show();
    });
});



