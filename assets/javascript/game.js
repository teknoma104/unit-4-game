var turtleDB = [
    { n: "Donatello", hp: 100, mp: 50, atkpwr: 9, spatk: 80, spcost: 40, catk: 30, p: "./assets/images/don-battle-portrait.png" },
    { n: "Leonardo", hp: 130, mp: 50, atkpwr: 10, spatk: 100, spcost: 50, catk: 50, p: "./assets/images/leo-battle-portrait.png" },
    { n: "Michelangelo", hp: 120, mp: 60, atkpwr: 7, spatk: 30, spcost: 20, catk: 5, p: "./assets/images/mikey-battle-portrait.png" },
    { n: "Raphael", hp: 150, mp: 50, atkpwr: 8, spatk: 50, spcost: 25, catk: 15, p: "./assets/images/raph-battle-portrait.png" },
];

var enemyDB = [
    { n: "Pink Foot", hp: 100, atkpwr: 8, catk: 5, p: "./assets/images/pink_foot_ninja_battle_portrait.png" },
    { n: "Rocksteady", hp: 180, atkpwr: 9, catk: 15, p: "./assets/images/rocksteady_battle_portrait.png" },
    { n: "Shredder", hp: 210, atkpwr: 6, cpatk: 35, p: "./assets/images/shredder_battle_portrait.png" }
];

var playState = 'n';

var startGameText = "<p>Welcome to the TMNT game! Pick a turtle and save April O' Neil from the bad guys!</p>";

var turtleSelected = "";
var enemySelected = "";

var charsTakenOutOfPlay = [];

var playerHP = 0;
var playerATK = 0;
var playerMP = 0;
var newATKPower = 0;

var enemyHP = 0;
var enemyCATK = 0;

// const TMNTtheme = new Audio("./assets/sounds/tmnt_theme.mp3");
// $('#start-button').click(e => TMNTtheme.play());


function charSelect() {
    console.log("charSelect function called.");

    $(".info-text").html("Select your turtle!");

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

    // Click function used to determine which turtle the player is choosing
    // Checks the parent div ID of the image that the user clicked on to 
    // determind which turtle it is
    $(".char-select").on("click", ".portrait-div", function () {
        var test = $(this).attr("id");
        console.log("Char-select test var is assigned value:  " + test);
        console.log("Something got clicked in char-select div.");
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
        $(".char-select").on("mouseenter", "#char-slot-1", function () {
            $("#bio-slot").addClass("donny-bio");
            console.log("User mouse entered donny portrait, attempting to show Donny bio");
        });


        $(".char-select").on("mouseleave", "#char-slot-1", function () {
            $("#bio-slot").removeClass("donny-bio");
            console.log("User mouse left donny portrait, attempting to remove Donny bio");
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
        // Updates charsTakenOutOfPlay array by pushing hero turtle's name selected into the array to
        // keep track of turtles not needed in play/as enemies
        var playerChoice = confirm("You have selected " + turtleSelected + ". Is this your final choice?");
        if (playerChoice === true) {
            console.log("Player has decided on " + turtleSelected);
            console.log("Pushing " + turtleSelected + " into charsTakenOutOfPlay to keep track of which characters are not needed.");
            charsTakenOutOfPlay.push(turtleSelected);
            console.log(charsTakenOutOfPlay);
            setStage();
        }
    });
}

function setStage() {
    console.log("setStage function called.");

    // Destroys the previous 4 portrait divs uses for selecting turtle character
    $(".char-select").empty();

    // Sets class attribute back to default so that the bio-slot isn't stuck showing a turtle's bio pic
    $("#bio-slot").attr("class", "col-lg-6 text-center");

    // Sets the main screen div to stage style in CSS that has the Sewer pic as a background image
    $(".main-screen").addClass("stage");


    console.log("turtleSelect value is: " + turtleSelected);

    var battlePortrait = $("<img>");

    switch (turtleSelected) {
        case "Donatello":
            console.log("Adding Donatello's battle portrait.");
            playerHP = turtleDB[0].hp;
            playerMP = turtleDB[0].mp;
            playerATK = turtleDB[0].atkpwr;
            battlePortrait.attr({ src: turtleDB[0].p, width: "142px" });
            $("#spatk").html('SP ATK: ' + turtleDB[0].spatk);
            // $("#fighter-slot-1").addClass("don-idle");
            break;
        case "Leonardo":
            console.log("Adding Leonardo's battle portrait.");
            playerHP = turtleDB[1].hp;
            playerMP = turtleDB[1].mp;
            playerATK = turtleDB[1].atkpwr;
            battlePortrait.attr({ src: turtleDB[1].p, width: "142px" });
            $("#spatk").html('SP ATK: ' + turtleDB[1].spatk);
            break;
        case "Michelangelo":
            console.log("Adding Michelangelo's battle portrait.");
            playerHP = turtleDB[2].hp;
            playerMP = turtleDB[2].mp;
            playerATK = turtleDB[2].atkpwr;
            battlePortrait.attr({ src: turtleDB[2].p, width: "142px" });
            $("#spatk").html('SP ATK: ' + turtleDB[2].spatk);
            break;
        case "Raphael":
            console.log("Adding Raphael's battle portrait.");
            playerHP = turtleDB[3].hp;
            playerMP = turtleDB[3].mp;
            playerATK = turtleDB[3].atkpwr;
            battlePortrait.attr({ src: turtleDB[3].p, width: "142px" });
            $("#spatk").html('SP ATK: ' + turtleDB[3].spatk);
            break;
    }

    $("#HP").html('HP: ' + playerHP);
    $("#MP").html('MP: ' + playerMP);
    $("#atk").html('ATK: ' + playerATK);

    $("#hero-portrait").html(battlePortrait);

    selectEnemy();

}

function selectEnemy() {
    console.log("selectEnemy function called.");

    var turtlePortrait1 = $("<img>");
    var turtlePortrait2 = $("<img>");
    var turtlePortrait3 = $("<img>");
    var enemyPortrait = $("<img>");

    var validCharPicked = false;

    $(".info-text").html("Select the enemy you with to attack!");

    console.log("turtleSelect value is: " + turtleSelected);

    // Generates 4 new divs with different ID names so the char-select onclick won't trigger
    for (var x = 1; x < 5; x++) {
        $(".char-select").append('<div id="fighter-slot-' + x + '" class="col-md-3 text-center fighter-portrait-div"></div>');
    }

    // Switch statement used to determine which enemy turtle that the player selects to fight against
    switch (turtleSelected) {
        case "Donatello":
            console.log("Donatello was the hero selected. That means Leo-Mikey-Raph should be selectable enemies.");
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
            console.log("Leonardo was the hero selected. That means Don-Mikey-Raph should be selectable enemies.");
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
            console.log("Michelangelo was the hero selected. That means Don-Leo-Raph should be selectable enemies.");
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
            console.log("Raphael was the hero selected. That means Don-Leo-Mikey should be selectable enemies.");
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

    for (var y = 0; y < charsTakenOutOfPlay.length; y++) {
            $('#'+charsTakenOutOfPlay[y]).empty();
            $('#'+charsTakenOutOfPlay[y]).removeAttr("id");
    }



    $(".char-select").off().on("click", ".fighter-portrait-div", function () {
        var test = $(this).attr("id");
        console.log("Enemy test var is assigned value:  " + test);
        console.log("Something got clicked during enemy function.");

        switch (test) {
            case "Donatello":
                console.log("Player clicked on Donatello portrait.");
                enemySelected = "Donatello";
                enemyHP = turtleDB[0].hp;
                console.log("char-select enemyHP: " + enemyHP);
                enemyCATK = turtleDB[0].catk;
                enemyPortrait.attr({ src: turtleDB[0].p, width: "142px" });
                $("#enemy-portrait").html(enemyPortrait);
                $("#enemyHP").html('HP: ' + enemyHP);
                $("#enemyCAtk").html('CATK: ' + enemyCATK);
                $(".char-select").empty();
                validCharPicked = true;
                break;
            case "Leonardo":
                console.log("Player clicked on Leonardo portrait.");
                enemySelected = "Leonardo";
                enemyHP = turtleDB[1].hp;
                console.log("char-select enemyHP: " + enemyHP);
                enemyCATK = turtleDB[1].catk;
                enemyPortrait.attr({ src: turtleDB[1].p, width: "142px" });
                $("#enemy-portrait").html(enemyPortrait);
                $("#enemyHP").html('HP: ' + enemyHP);
                $("#enemyCAtk").html('CATK: ' + enemyCATK);
                $(".char-select").empty();
                validCharPicked = true;
                break;
            case "Michelangelo":
                console.log("Player clicked on Michelangelo portrait.");
                enemySelected = "Michelangelo";
                enemyHP = turtleDB[2].hp;
                console.log("char-select enemyHP: " + enemyHP);
                enemyCATK = turtleDB[2].catk;
                enemyPortrait.attr({ src: turtleDB[2].p, width: "142px" });
                $("#enemy-portrait").html(enemyPortrait);
                $("#enemyHP").html('HP: ' + enemyHP);
                $("#enemyCAtk").html('CATK: ' + enemyCATK);
                $(".char-select").empty();
                validCharPicked = true;
                break;
            case "Raphael":
                console.log("Player clicked on Raphael portrait.");
                enemySelected = "Raphael";
                enemyHP = turtleDB[3].hp;
                console.log("char-select enemyHP: " + enemyHP);
                enemyCATK = turtleDB[3].catk;
                enemyPortrait.attr({ src: turtleDB[3].p, width: "142px" });
                $("#enemy-portrait").html(enemyPortrait);
                $("#enemyHP").html('HP: ' + enemyHP);
                $("#enemyCAtk").html('CATK: ' + enemyCATK);
                $(".char-select").empty();
                validCharPicked = true;
                break;
            default:
                alert("Nothing here! Please select a turtle to fight against.");
        }

        console.log(" botttom of enemySelect function, enemyHP: " + enemyHP);

        charsTakenOutOfPlay.push(test);
        console.log(charsTakenOutOfPlay);

        if (validCharPicked === true)
            battlePhase();
    });

    
}

function battlePhase() {
    console.log("battlePhase function called");
    $("#atk-button").removeClass("initiallyHidden");
    $("#spatk-button").removeClass("initiallyHidden");
    $(".info-text").html("Time to fight!");
    if (newATKPower === 0)
        newATKPower = playerATK;
    var maxPlayerHP = playerHP;
    var maxEnemyHP = enemyHP;

    console.log("newATKPower is: " + newATKPower);
    console.log("enemyHP: " + enemyHP);
    console.log("maxEnemyHP: " + maxEnemyHP);


    $("#atk-button").off().on("click", function () {
        console.log("Player clicked attack button.");

        if (enemyHP <= 0) {
            console.log("enemy HP is " + enemyHP + "! You beat him.");
            $("#enemy-portrait").html("");
            $("#enemyHP").html("");
            $("#enemyHP").css("color", "#00FF00");
            $("#enemyCAtk").html("");

            console.log("------------Calling selectEnemy function again.------------");
            selectEnemy();
        }
        else if (playerHP <= 0) {
            console.log("playerHP is " + playerHP + "! You died! Game over.");
            $("#atk-button").addClass("initiallyHidden");
            $("#spatk-button").addClass("initiallyHidden");
            $("#reset-button").removeClass("initiallyHidden");
        }
        else if ((playerHP > 0) && (enemyHP > 0)) {
            $(".bio-slot").html("You attacked for " + playerATK + "! The enemy counterattacks for " + enemyCATK + "!");
            console.log("You attacked for " + playerATK + "! The enemy counterattacks for " + enemyCATK + "!");

            enemyHP -= newATKPower;
            console.log("enemyHP: " + enemyHP);
            console.log("maxEnemyHP: " + maxEnemyHP);
            console.log(((enemyHP / maxEnemyHP) * 100));
            console.log("First part of if statement value is: " + (((enemyHP / maxEnemyHP) * 100) < 100));
            console.log(((enemyHP / maxEnemyHP) * 100));
            console.log("Second part of if statement value is: " + (((enemyHP / maxEnemyHP) * 100) > 50));
            if ((((enemyHP / maxEnemyHP) * 100) < 100) && (((enemyHP / maxEnemyHP) * 100) > 50))
                $("#enemyHP").css("color", "yellow");
            else if (((enemyHP / maxEnemyHP) * 100) < 50)
                $("#enemyHP").css("color", "red");
            $("#enemyHP").html('HP: ' + enemyHP);

            playerHP -= enemyCATK;
            if ((((playerHP / maxPlayerHP) * 100) < 100) && (((playerHP / maxPlayerHP) * 100) > 50))
                $("#HP").css("color", "yellow");
            else if (((playerHP / maxPlayerHP) * 100) < 50)
                $("#HP").css("color", "red");
            console.log("playerHP: " + playerHP);
            $("#HP").html('HP: ' + playerHP);

            newATKPower += playerATK;
            console.log("Original attack power is: " + playerATK);
            console.log("New attack power is now: " + newATKPower);
            $("#atk").html('ATK: ' + newATKPower);
        }
        
        
    });
}




$(document).ready(function () {
    $(".info-text").html(startGameText);

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
});



