/* Cucumber-ya my lord! */
(function () {
    var thrownCucumbers = 0;

    var socket = io();
    socket.on('connect', function () {
        socket.emit('join', {windowWidth: window.innerWidth});
    });
    socket.on('throwCucumber', throwCucumberToWindow);
    socket.on('info', refreshUI);

    document.body.addEventListener('click', function (event) {
        socket.emit('throwCucumber', {x: event.clientX  / window.innerWidth, y: event.clientY});
        refreshCounterThrownByUser();
    }, false);

    document.body.addEventListener("touchstart", function (event) {
        socket.emit('throwCucumber', {x: event.touches[0].clientX / window.innerWidth, y: event.touches[0].clientY});
        refreshCounterThrownByUser();
    }, false);

    function throwCucumberToWindow(data) {
        var width = data.width;
        var padLeft = (width / window.innerWidth)/2;
        var y = data.y;
        var x = (data.x - padLeft) * 100;
        var animationDuration = data.animationDuration;
        var rotation = data.rotation;
        var bezier = data.bezier;

        var cucumberWrap = document.createElement('div');
        cucumberWrap.className = 'cucumber-wrap';
        cucumberWrap.style.animationDuration = animationDuration + 's';
        cucumberWrap.style.animationTimingFunction = bezier;
        cucumberWrap.style.left = x + '%';
        cucumberWrap.style.top = y - (width / 2) + 'px';
        cucumberWrap.style.width = width + 'px';
        cucumberWrap.style.height = width + 'px';

        var cucumber = document.createElement('img');
        cucumber.src = 'img/cucumber.png';
        cucumber.className = 'cucumber noselect';
        cucumber.style.transform = 'rotate(' + rotation + 'deg)';
        cucumber.style.width = width + 'px';
        cucumber.style.bottom = '-' + width / 2 + 'px';

        cucumberWrap.appendChild(cucumber);

        document.querySelector('.wrapper').appendChild(cucumberWrap);
    }

    function refreshUI(data) {
        refreshCounter(data.thrownCucumbers);
        refreshUserCounter(data.connectedUsers);
    }

    function refreshCounterThrownByUser() {
        thrownCucumbers++;
        document.querySelector('.counter-own').innerText = thrownCucumbers;
    }

    function refreshUserCounter(count) {
        document.querySelector('.counter-users').innerText = count;
    }

    function refreshCounter(count) {
        document.querySelector('.counter').innerText = count;
    }
})();