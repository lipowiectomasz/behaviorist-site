// $(window).on('beforeunload', function(){
//     $(window).scrollTop(0);
// });

var visiblities = {
    "motto": false,
    "hashtag": false,
    "about": false,
    "certificates": false,
    "contact": false,
    "goTo": false
};
var galleryMode = false;

const opinions = [
    {
        text: "Ma kobieta wielkie serce, bo podejście do nieznajomej osoby ot tak i powiedzenie,  że warto spróbować czegoś innego.... powiedzieć napisz do mnie służę pomocą, odpowiem na pytania,pomogę!  Ogromne dzięki bo  swoją  miłością do psów zaznacza  ze nie ma rzeczy niemożliwych.",
        author: "Malwina"
    },
    {
        text: "Opinia 2",
        author: "Autor 2"
    },
    {
        text: "Opinia 3",
        author: "Autor 3"
    }
];

$("#op1 p:eq(0)").html(opinions[0].text);
$("#op1 p:eq(1)").html(opinions[0].author);
$("#hideGallery").fadeOut(0);

$(document).ready(function () {
    const startNavHeight = parseInt($("#header-container nav").css("height")) + 5;
    $("nav a:first-child").click(
        () => {
            let val;
            let currNavHeight = parseInt($("#header-container nav").css("height"));
            val = (currNavHeight < startNavHeight) ? "48vh" : "8vh";
            $("#header-container nav").animate({ height: val }, 700);
        }
    );
    prepareGoToTop();
    prepareLinks();
    prepareVisibility();
    slideEngine();
    $("#hideGallery").fadeOut(0);
});

function prepareLinks() {
    $("nav a:eq(1)").click(() => {  $('html, body').animate({ scrollTop: $("#about").position().top }, 600);  } );
    $("nav a:eq(2)").click(() => {  $('html, body').animate({ scrollTop: $("#certificates").position().top }, 600);  } );
    $("nav a:eq(3)").click(() => {  $('html, body').animate({ scrollTop: $("#gallery").position().top }, 600);  } );
    $("nav a:eq(4)").click(() => {  $('html, body').animate({ scrollTop: $("#opinions").position().top }, 600);  } );
    $("nav a:eq(5)").click(() => {  $('html, body').animate({ scrollTop: $("#contact-container").position().top }, 600);  } );
}

function prepareGoToTop() {
    visiblities.goTo = false;
    showGoToTop(0);
    $("#goToTop").click(() => {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
}

function showGoToTop(mode) {
    if (mode == 1) {
        $("#goToTop").animate({
            display: "block",
            opacity: 1
        }, 1200);
        visiblities.goTo = true;
    }
    else {
        $("#goToTop").animate({
            display: "none",
            opacity: 0
        }, 1200);
        visiblities.goTo = false;
    }
}

function changeVisibility(section, mode){
    let visibility = mode == 1 ? false : true;
    if(visiblities[section] == visibility){
        visiblities[section] = !visibility;
        $("#"+section+"-container").animate({ opacity: mode }, 600);
    }
}

function prepareVisibility(){
    $("#hello-text").fadeIn(500);
    $("#motto-container").animate({ opacity: 0 }, 100);
    $("#hashtag-container").animate({ opacity: 0 }, 100);
    $("#about-container").animate({ opacity: 0 }, 100);
    $("#certificates-container").animate({ opacity: 0 }, 100);
    $("#contact-container").animate({ opacity: 0 }, 100);
}

$(document).scroll(() => {
    if (1000 < $(document).scrollTop()) {
        if (visiblities.goTo == false) {
            showGoToTop(1);
        }
    }
    else {
        if (visiblities.goTo == true) {
            showGoToTop(0);
        }
    }

    Math.floor($("#motto-container").position().top*0.5)<$(document).scrollTop() ? changeVisibility("motto", 1) : changeVisibility("motto", 0);

    Math.floor($("#hashtag-container").position().top*0.6)<$(document).scrollTop() ? changeVisibility("hashtag", 1) : changeVisibility("hashtag", 0);

    Math.floor($("#about-container").position().top*0.7)<$(document).scrollTop() ? changeVisibility("about", 1) : changeVisibility("about", 0);

    Math.floor($("#certificates-container").position().top*0.75)<$(document).scrollTop() ? changeVisibility("certificates", 1) : changeVisibility("certificates", 0);

    Math.floor($("#contact-container").position().top*0.7)<$(document).scrollTop() ? changeVisibility("contact", 1) : changeVisibility("contact", 0);


});

function slideEngine() {
    let dogSlider = setInterval(() => {
        let currentSlide = getCurrentDogSlide();
        slideDog(currentSlide, (currentSlide + 1) % 2);
    }, 10000);
    
    let opinionSlider = setInterval(() => {
        slideOpinion(opinion, (opinion == 2)? 1 : 2);
    }, 10000);
}
function getCurrentDogSlide(){
    let curr;
    curr = ($("#dog1").css('z-index') == 2) ? 1 : 2;
    return curr;
}
function slideDog(slide, nextSlide){
    $("#hello-image").animate({ opacity: 0 }, 700, function () {
        $("#dog"+slide).css('z-index', 1);
        $("#dog"+nextSlide).css('z-index', 2);
        $(this).animate({ opacity: 1 }, 700);
    });
}

var opinion = 1;
var opinionText = 1;

function slideOpinion(slide, nextSlide){

    opinionText = (opinionText+1)%opinions.length;

    $("#op"+nextSlide+" p:eq(0)").html(opinions[opinionText].text);
    $("#op"+nextSlide+" p:eq(1)").html(opinions[opinionText].author);

    $("#op"+slide+"").animate({right: 102.5+'%'},800, ()=>{
        $("#op"+slide+"").fadeOut(0);
    });
    $("#op"+nextSlide+"").animate({right: 2.5+'%'},800);
    $("#op"+slide+"").animate({right: -100+'%'},0, ()=>{
        $("#op"+slide+"").fadeIn(0);
    });

    opinion = (opinion == 2)? 1 : 2;
}
$("#gallery-box").hover(
    ()=>{
        $("#gallery-mask").animate({ opacity: 0.5},400);
        $("#goToGallery").animate({ opacity: 1},400);
    },
    ()=>{
        $("#gallery-mask").animate({ opacity: 0},400);
        $("#goToGallery").animate({ opacity: 0},400);
    }
);

$("#goToGallery").click( 
    ()=>{
        galleryMode = true;
        $("#gallery-box").animate({ height: $("#gallery-box")[0].scrollHeight}, 500);
        $("#hideGallery").fadeIn(500);
        $("#gallery-mask").fadeOut(500);
        $("#goToGallery").fadeOut(500);
    } 
);

$("#hideGallery").click( 
    ()=>{
        galleryMode = false;
        $("#gallery-box").animate({ height: 580+'px'}, 500);
        $("#hideGallery").fadeOut(500);
        $("#gallery-mask").fadeIn(500);
        $("#goToGallery").fadeIn(500);
    } 
);