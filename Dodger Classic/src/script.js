


$(document).ready(function () {


    $('a[href^="#"]').on('click', function (scrollevent) {
        scrollevent.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing');

    });


});

var gamestatus = 0;//0 = menü 1 = während des Spiels 2 = gameover;

var score = 0;//unter 1000 rot, unter 5000 orange, unter 10000 grün, ab 20000 blau

var dificulity = 0; // -1 = easy , 1 = hard , 0 = automatischer start in easy


var position;

//Spielstart

//name = localStorage.getItem('playername');
//playername = JSON.parse(name);








// Menü

document.getElementsByClassName("dif1").onclick = function () { Easy() };
document.getElementsByClassName("dif2").onclick = function () { Hard() };

function Hard() {
    dificulity = 1;
    info.innerHTML = "You play in <strong>Hard</strong>mode";
};

function Easy() {
    dificulity = -1;
    info.innerHTML = "You play in <strong>Easy</strong>mode";
};

//Spielstart

$('.playgame').stop().click(function startgame() {
    score = 0;
    
    $('#menu').css('display', 'none');
    $('#wall').css('display', 'block');
    $('.player').stop().fadeIn(400)
    $('.player').css('display', 'block');
    $('#info').css('display', 'none');
    if (dificulity == 0) {
        info.innerHTML = "You play in <strong>Easy</strong>mode";
    }
    $('#wall').css('display', 'flex');
    $('.player').addClass('playerstate1');
    $('#scoreboard').stop().fadeIn(500);
    $('#controls').stop().fadeIn(500);
    $('#controls').css('display', 'flex');
    $('#credits').css('display', 'none');
    position = 1;
    setTimeout(function () {
        gamestatus = 1;
    }, 1000);
    
});

//Steuerung

window.addEventListener('keydown', function (event) {
    if (gamestatus == 1) {
        Movementkeys(event.key);
    }

});

var mobilecontrol;

document.getElementById("left").addEventListener("click", function () {
    if (gamestatus == 1) {
        mobilecontrol = false;
        Movementkeys();
    }
});

document.getElementById("right").addEventListener("click", function () {
    if (gamestatus == 1) {
        mobilecontrol = true;
        Movementkeys();
    }
});

function Movementkeys(key) {
    if (key == "ArrowLeft" && position == 2 || mobilecontrol == false && position == 2) {
        $('.player').addClass('playerstate1');
        $('.player').removeClass('playerstate2');
        $('.player').removeClass('playerstate3');
        $('.player').removeClass('playerstate4');
        position = 1;
    }
    else if (key == "ArrowLeft" && position == 3 || mobilecontrol == false && position == 3) {
        $('.player').removeClass('playejrstate1');
        $('.player').addClass('playerstate2');
        $('.player').removeClass('playerstate3');
        $('.player').removeClass('playerstate4');
        position = 2;
    }
    else if (key == "ArrowLeft" && position == 4 || mobilecontrol == false && position == 4) {
        $('.player').removeClass('playerstate1');
        $('.player').removeClass('playerstate2');
        $('.player').addClass('playerstate3');
        $('.player').removeClass('playerstate4');
        position = 3;
    }
    else if (key == "ArrowRight" && position == 3 || mobilecontrol == true && position == 3) {
        $('.player').removeClass('playerstate1');
        $('.player').removeClass('playerstate2');
        $('.player').removeClass('playerstate3');
        $('.player').addClass('playerstate4');
        position = 4;
    }
    else if (key == "ArrowRight" && position == 2 || mobilecontrol == true && position == 2) {
        $('.player').removeClass('playerstate1');
        $('.player').removeClass('playerstate2');
        $('.player').addClass('playerstate3');
        $('.player').removeClass('playerstate4');
        position = 3;
    }
    else if (key == "ArrowRight" && position == 1 || mobilecontrol == true && position == 1) {
        $('.player').removeClass('playejrstate1');
        $('.player').addClass('playerstate2');
        $('.player').removeClass('playerstate3');
        $('.player').removeClass('playerstate4');
        position = 2;
    }
};

//Score

function Scorecount() {
    if (gamestatus == 1) {
        score = score + 10;
        document.getElementById('score').innerHTML = score;

    } else {
        score = score;

        if (gamestatus == 2) {
            $('#gameover').stop().fadeIn(200);
            document.getElementById('endscore').innerHTML = score;
            $('#wrapper').addClass('filterblur');
        }
    }
};

//Position und Gameover
var balken1;
var balken2;
var balken3;
var balken4;

function Position() {
    if (position == 1 && balken1 == 1) {
        gamestatus = 2;
    }
    if (position == 2 && balken2 == 1) {
        gamestatus = 2;
    }
    if (position == 3 && balken3 == 1) {
        gamestatus = 2;
    }
    if (position == 4 && balken4 == 1) {
        gamestatus = 2;
    }
}

//Balken

function Balkenstop() {
    $('.wall1').removeClass('walldown');
    $('.wall2').removeClass('walldown');
    $('.wall3').removeClass('walldown');
    $('.wall4').removeClass('walldown');
    $('.wall1').removeClass('wallclose');
    $('.wall2').removeClass('wallclose');
    $('.wall3').removeClass('wallclose');
    $('.wall4').removeClass('wallclose');

    balken1 = 0;
    balken2 = 0;
    balken3 = 0;
    balken4 = 0;
}

function Closebalken() {// balken werden geschlossen
    if (balken1 == 1) {
        $('.wall1').removeClass('.wallcharge');
        $('.wall1').addClass('.wallclose');
    }
    else if (balken2 == 1) {
        $('.wall3').removeClass('.wallcharge');
        $('.wall3').addClass('.wallclose');
    }

    else if (balken3 == 1) {
        $('.wall3').removeClass('.wallcharge');
        $('.wall3').addClass('.wallclose');
    }

    else if (balken4 == 1) {
        $('.wall4').removeClass('.wallcharge');
        $('.wall4').addClass('.wallclose');
    }

}

var diftime;
var diftime2;

if (dificulity == -1) {
    diftime = 100;
    diftime2 = 400;
} else{
    diftime = 750;
    diftime2 = 1500;
}

var pattern;

var min;
var max;


function Balkenauswahl() {

    if (gamestatus == 1) {
        if (dificulity == 1) {
            min = 1;
            max = 8;
        } else {
            min = 1;
            max = 16;
        }

        if (dificulity == 1) {
            pattern = (Math.round(Math.random() * (max - min)) + min) * 2;
        } else {
            pattern = Math.round(Math.random() * (max - min)) + min;
        }


        switch (pattern) {

            case 1:
                $('.wall1').addClass('wallcharge');// x 0 0 0
                setTimeout(function () {
                    $('.wall1').removeClass('wallcharge');
                    $('.wall1').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall1').removeClass('wallclose');
                        $('.wall1').addClass('walldown');
                        balken1 = 1;
                    }, 200);
                }, diftime)
                break;

            case 2:
                $('.wall1').addClass('wallcharge');// x x 0 0
                $('.wall2').addClass('wallcharge');
                setTimeout(function () {
                    $('.wall1').removeClass('wallcharge');
                    $('.wall2').removeClass('wallcharge');
                    $('.wall1').addClass('wallclose');
                    $('.wall2').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall1').removeClass('wallclose');
                        $('.wall2').removeClass('wallclose');
                        $('.wall1').addClass('walldown');
                        $('.wall2').addClass('walldown');
                        balken1 = 1;
                        balken2 = 1;
                    }, 200);
                }, diftime)
                break;

            case 3 || 14:
                $('.wall2').addClass('wallcharge');// 0 x x 0
                $('.wall3').addClass('wallcharge');
                setTimeout(function () {
                    $('.wall2').removeClass('wallcharge');
                    $('.wall3').removeClass('wallcharge');
                    $('.wall2').addClass('wallclose');
                    $('.wall3').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall2').removeClass('wallclose');
                        $('.wall3').removeClass('wallclose');
                        $('.wall2').addClass('walldown');
                        $('.wall3').addClass('walldown');
                        balken2 = 1;
                        balken3 = 1;
                    }, 200);
                    
                }, diftime)
                break;

            case 4:
                $('.wall1').addClass('wallcharge');// x x x 0
                $('.wall2').addClass('wallcharge');
                $('.wall3').addClass('wallcharge');
                setTimeout(function () {
                    $('.wall1').removeClass('wallcharge');
                    $('.wall2').removeClass('wallcharge');
                    $('.wall3').removeClass('wallcharge');
                    $('.wall1').addClass('wallclose');
                    $('.wall2').addClass('wallclose');
                    $('.wall3').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall1').removeClass('wallclose');
                        $('.wall2').removeClass('wallclose');
                        $('.wall3').removeClass('wallclose');
                        $('.wall1').addClass('walldown');
                        $('.wall2').addClass('walldown');
                        $('.wall3').addClass('walldown');
                        balken1 = 1;
                        balken2 = 1;
                        balken3 = 1;
                    }, 200);
                }, diftime)
                break;

            case 5:
                $('.wall2').addClass('wallcharge');// 0 x 0 0
                setTimeout(function () {
                    $('.wall2').removeClass('wallcharge');
                    $('.wall2').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall2').removeClass('wallclose');
                        $('.wall2').addClass('walldown');
                        balken2 = 1;
                    }, 200);
                    
                }, diftime)
                break;

            case 6:
                $('.wall3').addClass('wallcharge');// 0 0 x x
                $('.wall4').addClass('wallcharge');
                setTimeout(function () {
                    $('.wall3').removeClass('wallcharge');
                    $('.wall4').removeClass('wallcharge');
                    $('.wall3').addClass('wallclose');
                    $('.wall4').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall3').removeClass('wallcharge');
                        $('.wall4').removeClass('wallcharge');
                        $('.wall3').addClass('walldown');
                        $('.wall4').addClass('walldown');
                        balken3 = 1;
                        balken4 = 1;
                    }, 200);
                }, diftime)
                break;

            case 7:
                $('.wall3').addClass('wallcharge');// 0 0 x 0
                setTimeout(function () {
                    $('.wall3').removeClass('wallcharge');
                    $('.wall3').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall3').removeClass('wallclose');
                        $('.wall3').addClass('walldown');
                        balken3 = 1;
                    }, 200);
                }, diftime)
                break;

            case 8:
                $('.wall2').addClass('wallcharge');// 0 x x x
                $('.wall3').addClass('wallcharge');
                $('.wall4').addClass('wallcharge');
                setTimeout(function () {
                    $('.wall2').removeClass('wallcharge');
                    $('.wall3').removeClass('wallcharge');
                    $('.wall4').removeClass('wallcharge');
                    $('.wall2').addClass('wallclose');
                    $('.wall3').addClass('wallclose');
                    $('.wall4').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall2').removeClass('wallclose');
                        $('.wall3').removeClass('wallclose');
                        $('.wall4').removeClass('wallclose');
                        $('.wall2').addClass('walldown');
                        $('.wall3').addClass('walldown');
                        $('.wall4').addClass('walldown');
                        balken2 = 1;
                        balken3 = 1;
                        balken4 = 1;
                    }, 200);
                }, diftime)
                break;

            case 9 || 15:
                $('.wall1').addClass('wallcharge');// x 0 0 x
                $('.wall4').addClass('wallcharge');

                setTimeout(function () {
                    $('.wall1').removeClass('wallcharge');
                    $('.wall4').removeClass('wallcharge');
                    $('.wall1').addClass('wallclose');
                    $('.wall4').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall1').removeClass('wallclose');
                        $('.wall4').removeClass('wallclose');
                        $('.wall1').addClass('walldown');
                        $('.wall4').addClass('walldown');
                        balken1 = 1;
                        balken4 = 1;
                    }, 200);
                }, diftime)
                break;

            case 10:
                $('.wall1').addClass('wallcharge');// x 0 x 0
                $('.wall3').addClass('wallcharge');

                setTimeout(function () {
                    $('.wall1').removeClass('wallcharge');
                    $('.wall3').removeClass('wallcharge');
                    $('.wall1').addClass('wallclose');
                    $('.wall3').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall1').removeClass('wallclose');
                        $('.wall3').removeClass('wallclose');
                        $('.wall1').addClass('walldown');
                        $('.wall3').addClass('walldown');
                        balken1 = 1;
                        balken3 = 1;
                    }, 200);
                }, diftime)
                break;

            case 11:
                $('.wall4').addClass('wallcharge');// 0 0 0 x

                setTimeout(function () {
                    $('.wall4').removeClass('wallcharge');
                    $('.wall4').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall4').removeClass('wallclose');
                        $('.wall4').addClass('walldown');
                        balken4 = 1;
                    }, 200)
                }, diftime)
                break;

            case 12:
                $('.wall1').addClass('wallcharge');// x x 0 x
                $('.wall2').addClass('wallcharge');
                $('.wall4').addClass('wallcharge');
                setTimeout(function () {
                    $('.wall1').removeClass('wallcharge');
                    $('.wall2').removeClass('wallcharge');
                    $('.wall4').removeClass('wallcharge');
                    $('.wall1').addClass('wallclose');
                    $('.wall2').addClass('wallclose');
                    $('.wall4').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall1').removeClass('wallclose');
                        $('.wall2').removeClass('wallclose');
                        $('.wall4').removeClass('wallclose');
                        $('.wall1').addClass('walldown');
                        $('.wall2').addClass('walldown');
                        $('.wall4').addClass('walldown');
                        balken1 = 1;
                        balken2 = 1;
                        balken4 = 1;
                    }, 200);
                }, diftime)
                break;

            case 13:
                $('.wall2').addClass('wallcharge');// 0 x 0 x
                $('.wall4').addClass('wallcharge');
                setTimeout(function () {
                    $('.wall2').removeClass('wallcharge');
                    $('.wall4').removeClass('wallcharge');
                    $('.wall2').addClass('wallclose');
                    $('.wall4').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall2').removeClass('wallclose');
                        $('.wall4').removeClass('wallclose');
                        $('.wall2').addClass('walldown');
                        $('.wall4').addClass('walldown');
                        balken2 = 1;
                        balken4 = 1;
                    }, 200);

                }, diftime)
                break;

            default:
                $('.wall1').addClass('wallcharge');// x 0 x x
                $('.wall3').addClass('wallcharge');
                $('.wall4').addClass('wallcharge');
                setTimeout(function () {
                    $('.wall1').removeClass('wallcharge');
                    $('.wall3').removeClass('wallcharge');
                    $('.wall4').removeClass('wallcharge');
                    $('.wall1').addClass('wallclose');
                    $('.wall3').addClass('wallclose');
                    $('.wall4').addClass('wallclose');
                    setTimeout(function () {
                        $('.wall1').removeClass('wallclose');
                        $('.wall3').removeClass('wallclose');
                        $('.wall4').removeClass('wallclose');
                        $('.wall1').addClass('walldown');
                        $('.wall3').addClass('walldown');
                        $('.wall4').addClass('walldown');
                        balken1 = 1;
                        balken3 = 1;
                        balken4 = 1;
                    }, 200);
                }, diftime)
                break;

        }
//        document.getElementById('pattern').innerHTML = pattern;  Zeigt die aktuelle Nummer welche für eine Pattern zugewiesen wurde
    }

    Scorecount(); // Jedes mal wenn die Balken pattern gewechselt wird, wird die score um 10 erhöht
    Balkenstop();// Schließt die Balken

    


};

setInterval('Balkenauswahl()', diftime2);

Balkenauswahl();

setInterval('Position()', 5)

Position();


$('#reload').stop().click(function reload() {

    window.location.reload();

});


// menü




/*
var syncre;
var syncpattern;
var smax = 4;
var smin = 1;

function sync() {


    syncpattern = (Math.round(Math.random() * (smax - smin)) + smin);

    if (syncre == syncpattern) {
        syncpattern = (Math.round(Math.random() * (smax - smin)) + smin);
    }

    syncre == syncpattern;

    $('.playgame').removeClass('playgamec');
    $('.dif').removeClass('difc');
    $('.dif1').removeClass('dif1c');
    $('.dif2').removeClass('dif2c');

    switch (syncpattern) {

        case 1:
            $('.playgame').addClass('playgamec');
            break;

        case 2:
            $('.dif').addClass('difc');
            break;

        case 3:
            $('.dif1').addClass('dif1c');
            break;

        case 4:
            $('.dif2').addClass('dif2c');
            break;
    }

}

setInterval('sync()', 250);

sync();
*/
