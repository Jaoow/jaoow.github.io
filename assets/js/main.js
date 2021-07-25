/* SCROLL REVEAL */


window.sr = ScrollReveal({
    reset: false,
    duration: 600,
    easing: 'cubic-bezier(.694,0,.335,1)',
    scale: 1,
    viewFactor: 0.3,
});

sr.reveal('#about');
sr.reveal('#works', {viewFactor: 0.2});
sr.reveal('#contact', {viewFactor: 0.1});
sr.reveal('#socials', {viewFactor: 0.05});

/* MAIN */

const introHeight = document.querySelector('#about').offsetHeight;
const topButton = document.getElementById('top-button');
const $topButton = $('#top-button');

window.addEventListener(
    'scroll',
    function() {
        if (window.scrollY > introHeight) {
            $topButton.fadeIn();
        } else {
            $topButton.fadeOut();
        }
    },
    false
);

topButton.addEventListener('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 500);
});

/* PREVENT CLICK */

if (document.addEventListener) {
    document.addEventListener(
        'contextmenu',
        function (e) {
            e.preventDefault();
        },
        !1
    );
} else {
    document.attachEvent('oncontextmenu', function () {
        window.event.returnValue = !1;
    });
}