var visiblitiGoTo = false;
$("#gallery-view").fadeOut(0);
$("body").fadeOut(0);

$(document).ready(() => {
    $("body").fadeIn(500);
    prepareGoToTop();
});

function prepareGoToTop() {
    visiblitiGoTo = false;
    showGoToTop(0);
    $("#goToTop").click(() => {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
}

$(document).scroll(() => {
    if (1000 < $(document).scrollTop()) {
        if (visiblitiGoTo == false) {
            showGoToTop(1);
        }
    }
    else {
        if (visiblitiGoTo == true) {
            showGoToTop(0);
        }
    }
});

$("nav a").click(
    () => {
        $("body").fadeOut(500);
        setTimeout(() => {
            window.open("index.html", '_self');
        }, 1000);
    }
);

function showGoToTop(mode) {
    if (mode == 1) {
        $("#goToTop").animate({
            display: "block",
            opacity: 1
        }, 1200);
        visiblitiGoTo = true;
    }
    else {
        $("#goToTop").animate({
            display: "none",
            opacity: 0
        }, 1200);
        visiblitiGoTo = false;
    }
}


$("#gallery-view-exit").click(
    () => {
        $("#gallery-view").fadeOut(500);
    }
);
$(".gallery-element").click(
    (e) => {
        $("#gallery-view").fadeIn(500);
        let elId = (String(e.target.tagName) == "IMG") ? e.target.parentElement.id : e.target.id;
        $("#viewed-element").fadeOut(100);
        $("#viewed-element").html("");
        $("#" + elId + "").clone().appendTo("#viewed-element");
        $("#viewed-element").fadeIn(100);
    }
);

$("#gallery-view-back").click(
    () => {
        let maxEl = $("#gallery-box .gallery-element").length;
        let currentEl = parseInt($("#viewed-element .gallery-element")[0].id);
        let backEl = (currentEl > 1) ? currentEl - 1 : maxEl;
        $("#viewed-element").fadeOut(100);
        setTimeout(() => {
            $("#viewed-element").html("");
            $("#" + backEl + "").clone().appendTo("#viewed-element");
            $("#viewed-element").fadeIn(100);
        }, 110);
    }
);

$("#gallery-view-next").click(
    () => {
        let maxEl = $("#gallery-box .gallery-element").length;
        let currentEl = parseInt($("#viewed-element .gallery-element")[0].id);
        let nextEl = (currentEl < maxEl) ? currentEl + 1 : 1;
        $("#viewed-element").fadeOut(100);
        setTimeout(() => {
            $("#viewed-element").html("");
            $("#" + nextEl + "").clone().appendTo("#viewed-element");
            $("#viewed-element").fadeIn(100);
        }, 110);

    }
);