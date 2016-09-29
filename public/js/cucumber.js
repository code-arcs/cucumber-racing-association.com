/* Cucumber-ya my lord! */
(function () {

    var socket = io();
    socket.on('connect', function (data) {
        socket.emit('join', 'Hello World from client');
    });

    socket.on('throwCucumber', throwCucumberToWindow);

    var minWidthOfCucumber = 35;
    var maxWidthOfCucumber = 55;

    document.body.addEventListener('click', function (event) {
        socket.emit('throwCucumber', {x: event.clientX, y: event.clientY, now: true});
    }, false);

    document.body.addEventListener("touchstart", function (event) {
        throwCucumberToWindow({x: event.touches[0].clientX, y: event.touches[0].clientY, now: true});
    }, false);

    for (var i = 0; i < getRandomInt(5, 15); i++) {
        var x = getRandomInt(maxWidthOfCucumber + 5, window.innerWidth - (maxWidthOfCucumber + 5));
        var y = getRandomInt(10, 120);
        throwCucumberToWindow({x: x, y: y});
    }

    function throwCucumberToWindow(data) {
        const x = data.x;
        const y = data.y;
        const now = data.now;

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