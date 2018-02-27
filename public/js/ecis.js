$(document).ready(function() {

    // BACK BUTTON
    (() => {
        const backButton = $('.back');
        if(backButton) {
            backButton.click(() => window.history.back());
        }
    })();

    // TIMER //
    (() => {

        var
        timer = $('#timer'),
        hSpan = $('#timer .hours'),
        mSpan = $('#timer .minutes'),
        sSpan = $('#timer .seconds'),
        displayTime = function() {
            var
            d = new Date(),
            hours = (d.getHours() < 10  ? '0' : '') + d.getHours(),
            minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes(),
            seconds = (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
            hSpan.html(hours);
            mSpan.html(minutes);
            sSpan.html(seconds);
        };

        displayTime();
        setInterval(displayTime, 1000);
        timer.css('opacity', '1');
    })();

});
