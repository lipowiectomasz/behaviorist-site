$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});

$("body").fadeOut(0);

var visiblities = {
    "motto": false,
    "hashtag": false,
    "about": false,
    "offer": false,
    "certificates": false,
    "gallery": false,
    "opinions": false,
    "contact": false,
    "goTo": false
};
var galleryMode = false;

const opinions = [
    {
        text: "Ma kobieta wielkie serce, bo podejście do nieznajomej osoby ot tak i powiedzenie,  że warto spróbować czegoś innego.... powiedzieć napisz do mnie służę pomocą, odpowiem na pytania,pomogę!  Ogromne dzięki bo  swoją  miłością do psów zaznacza  ze nie ma rzeczy niemożliwych.",
        author: "~Malwina"
    },
    {
        text: "Pani Sylwia jest profesjonalna w swoim  ,,fachu '' Szybko nawiązuje super kontakt z psiakiem i właścicielem . Jest ,,Czarodziejką '' i ,, Zaklinaczem '' tak ją żartobliwie nazwałam , ponieważ moja sunia słuchała i wykonywała wszystko to co Pani Sylwia kazała 😁 Serdecznie Polecam",
        author: "~Krystyna"
    },
    {
        text: "Już po pierwszym spotkaniu z Sylwią są duuuuże efekty! Nawet nie wiedziałam, że trening może aż TYLE dać. Świetne podejście do piesów i przyjemna atmosfera. Polecam serdeczniutko ja i Kosa z którym nauczyłam się dzięki Sylwi nawiązywać więź! 🌞",
        author: "~Milliona"
    }
];

$("#op1 p:eq(0)").html(opinions[0].text);
$("#op1 p:eq(1)").html(opinions[0].author);
$("#hideGallery").fadeOut(0);
$("#gallery-view").fadeOut(0);

$(document).ready(function () {

    $("body").fadeIn(500);

    const startNavHeight = parseInt($("#header-container nav").css("height")) + 5;
    $("nav a:first-child").click(
        () => {
            let val;
            let currNavHeight = parseInt($("#header-container nav").css("height"));
            val = (currNavHeight < startNavHeight) ? "56vh" : "8vh";
            $("#header-container nav").animate({ height: val }, 700);
        }
    );
    prepareGoToTop();
    prepareLinks();
    prepareVisibility();
    slideEngine();
});

function prepareLinks() {
    $("nav a:eq(1)").click(() => { $('html, body').animate({ scrollTop: $("#about").position().top }, 600); });
    $("nav a:eq(2)").click(() => { $('html, body').animate({ scrollTop: $("#offer").position().top }, 600); });
    $("nav a:eq(3)").click(() => { $('html, body').animate({ scrollTop: $("#certificates").position().top }, 600); });
    $("nav a:eq(4)").click(() => { $('html, body').animate({ scrollTop: $("#gallery").position().top }, 600); });
    $("nav a:eq(5)").click(() => { $('html, body').animate({ scrollTop: $("#opinions").position().top }, 600); });
    $("nav a:eq(6)").click(() => { $('html, body').animate({ scrollTop: $("#contact-container").position().top }, 600); });
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

function changeVisibility(section, mode) {
    let visibility = mode == 1 ? false : true;
    if (visiblities[section] == visibility) {
        visiblities[section] = !visibility;
        $("#" + section + "-container").animate({ opacity: mode }, 600);
    }
}

function prepareVisibility() {
    $("#hello-text").fadeIn(500);
    $("#motto-container").animate({ opacity: 0 }, 100);
    $("#hashtag-container").animate({ opacity: 0 }, 100);
    $("#about-container").animate({ opacity: 0 }, 100);
    $("#offer-container").animate({ opacity: 0 }, 100);
    $("#certificates-container").animate({ opacity: 0 }, 100);
    $("#gallery-container").animate({ opacity: 0 }, 100);
    $("#opinions-container").animate({ opacity: 0 }, 100);
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

    Math.floor($("#motto-container").position().top * 0.5) < $(document).scrollTop() ? changeVisibility("motto", 1) : changeVisibility("motto", 0);

    Math.floor($("#hashtag-container").position().top * 0.6) < $(document).scrollTop() ? changeVisibility("hashtag", 1) : changeVisibility("hashtag", 0);

    Math.floor($("#about-container").position().top * 0.7) < $(document).scrollTop() ? changeVisibility("about", 1) : changeVisibility("about", 0);

    Math.floor($("#offer-container").position().top * 0.6) < $(document).scrollTop() ? changeVisibility("offer", 1) : changeVisibility("offer", 0);

    Math.floor($("#certificates-container").position().top * 0.75) < $(document).scrollTop() ? changeVisibility("certificates", 1) : changeVisibility("certificates", 0);

    Math.floor($("#gallery-container").position().top * 0.9) < $(document).scrollTop() ? changeVisibility("gallery", 1) : changeVisibility("gallery", 0);

    Math.floor($("#opinions-container").position().top * 0.9) < $(document).scrollTop() ? changeVisibility("opinions", 1) : changeVisibility("opinions", 0);

    Math.floor($("#contact-container").position().top * 0.7) < $(document).scrollTop() ? changeVisibility("contact", 1) : changeVisibility("contact", 0);

});

function dogSlider() {
    let currentSlide = getCurrentDogSlide();
    slideDog(currentSlide, (currentSlide + 1) % 2);
}
function opinionSlider() {
    slideOpinion(opinion, (opinion == 2) ? 1 : 2);
}
let dogInterval, opinionInterval;
function slideEngine() {
    clearInterval(dogInterval);
    dogInterval = setTimeout(dogSlider, 10000);
    clearInterval(opinionInterval);
    opinionInterval = setTimeout(opinionSlider, 10000);
}
function getCurrentDogSlide() {
    let curr;
    curr = ($("#dog1").css('z-index') == 2) ? 1 : 2;
    return curr;
}
function slideDog(slide, nextSlide) {
    $("#hello-image").animate({ opacity: 0 }, 700, function () {
        $("#dog" + slide).css('z-index', 1);
        $("#dog" + nextSlide).css('z-index', 2);
        $(this).animate({ opacity: 1 }, 700);
    });

    dogInterval = setTimeout(dogSlider, 10000);
}

var opinion = 1;
var opinionText = 1;

function slideOpinion(slide, nextSlide) {

    opinionText = (opinionText + 1) % opinions.length;

    $("#op" + nextSlide + " p:eq(0)").html(opinions[opinionText].text);
    $("#op" + nextSlide + " p:eq(1)").html(opinions[opinionText].author);

    $("#op" + slide + "").animate({ right: 102.5 + '%' }, 800, () => {
        $("#op" + slide + "").fadeOut(0);
    });
    $("#op" + nextSlide + "").animate({ right: 2.5 + '%' }, 800);
    $("#op" + slide + "").animate({ right: -100 + '%' }, 0, () => {
        $("#op" + slide + "").fadeIn(0);
    });

    opinion = (opinion == 2) ? 1 : 2;

    opinionInterval = setTimeout(opinionSlider, 10000);
}

$("#gallery-box").hover(
    () => {
        $("#gallery-mask").animate({ opacity: 0.5 }, 400);
        $("#goToGallery").animate({ opacity: 1 }, 400);
    },
    () => {
        $("#gallery-mask").animate({ opacity: 0 }, 400);
        $("#goToGallery").animate({ opacity: 0 }, 400);
    }
);

$("#goToGallery").click(
    () => {
        galleryMode = true;
        // $("#gallery-box").animate({ height: $("#gallery-box")[0].scrollHeight}, 500);
        // $("#hideGallery").fadeIn(500);
        console.log("Going to gallery");
        $("body").fadeOut(500);
        setTimeout(() => {
            window.open("gallery.html", '_self');
        }, 1000);
        // $("#gallery-mask").fadeOut(500);
        // $("#goToGallery").fadeOut(500);
    }
);