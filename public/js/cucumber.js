/* Cucumber-ya my lord! */
(function () {

    var minWidthOfCucumber = 35;
    var maxWidthOfCucumber = 55;

    document.body.addEventListener('click', function (event) {
        throwCucumberToWindow(event.clientX, event.clientY, true);
    }, false);

    document.body.addEventListener("touchstart", function (event) {
        throwCucumberToWindow(event.touches[0].clientX, event.touches[0].clientY, true);
    }, false);

    for (var i = 0; i < getRandomInt(5, 15); i++) {
        var x = getRandomInt(maxWidthOfCucumber + 5, window.innerWidth - (maxWidthOfCucumber + 5));
        var y = getRandomInt(10, 120);
        throwCucumberToWindow(x, y);
    }

    function throwCucumberToWindow(x, y, now) {
        var width = getRandomInt(minWidthOfCucumber, maxWidthOfCucumber);
        var animationDuration = getRandomInt(25, 50);

        var cucumberWrap = document.createElement('div');
        cucumberWrap.className = now ? 'cucumber-wrap' : 'cucumber-wrap delay-1s';
        cucumberWrap.style.animationDuration = animationDuration + 's';
        cucumberWrap.style.animationTimingFunction = getBezier();
        cucumberWrap.style.left = x - (width / 2) + 'px';
        cucumberWrap.style.top = y - (width / 2) + 'px';
        cucumberWrap.style.width = width + 'px';
        cucumberWrap.style.height = width + 'px';

        var cucumber = document.createElement('img');
        cucumber.src = 'img/cucumber.png';
        cucumber.className = 'cucumber noselect';
        cucumber.style.transform = 'rotate(' + getRandomInt(0, 360) + 'deg)';
        cucumber.style.width = width + 'px';
        cucumber.style.bottom = '-' + width / 2 + 'px';

        cucumberWrap.appendChild(cucumber);

        document.querySelector('.wrapper').appendChild(cucumberWrap);
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getBezier() {
        var bez = [
            getRandomFloat(0.2, 0.8),
            getRandomFloat(0.2, 0.5),
            getRandomFloat(0.2, 0.5),
            getRandomFloat(0.2, 0.5)
        ].join(', ');

        return 'cubic-bezier(' + bez + ')';

        function getRandomFloat(min, max) {
            return (Math.random() * (max - min)) + min;
        }
    }
})();