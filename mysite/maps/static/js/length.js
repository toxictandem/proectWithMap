window.superTempDuration = -1;
var tempDuration = -1;
ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 9,
        controls: []
    });

    // Создание маршрута.
    var points = [];
    var addressStart = 'Москва, проспект Мира, 119с'
    for (var i = 1; i < 25; i++) {
        points.push(addressStart + i);
    }
    console.log(points);

    tempNeedTime = 900;
    bestLength = 1;
    bestArray = [addressStart + 1];
    bestPointArray = [1];
    generator(1, bestArray, 1, 0, tempNeedTime, [1]);
    console.log(bestPointArray);




    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: bestArray,
        params: {
            routingMode: "pedestrian"
        }
    }, {
        boundsAutoApply: true
    });



    // Подписка на событие обновления данных маршрута.
    multiRoute.model.events.add('requestsuccess', function() {
        var activeRoute = multiRoute.getActiveRoute();
        console.log("Длина: " + activeRoute.properties.get("distance").text);
        console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
        console.log(activeRoute.properties.get("duration").value);
        console.log("Точки маршрута: " + bestArray);
    });

    myMap.geoObjects.add(multiRoute);


    function getPathDuration(pathArrayTemp) {
        tempDuration = -1;
        var newRoute = ymaps.route(pathArrayTemp).then(function (route) {
            tempDuration = route.getTime();
            console.log('Time ', tempDuration);
            myMap.geoObjects.add(route);
        })

        function waitForTime() {
            if (tempDuration == -1) {
                console.log('wait not yet...')
                setTimeout(waitForTime, 50);
                return;
            }
            console.log('Please!!!!!!!!!!!', tempDuration);
            return;
        }
        waitForTime();
        return;
    }

    function generator(pathLength, pathArray, lastPoint, pathDuration, needTime, pointArray) {
        console.log(pathLength, pathDuration, needTime);
        if (pathDuration < needTime) {
            if (pathDuration <= needTime && pathLength > bestLength) {
                bestLength = pathLength;
                bestArray = pathArray;
                bestPointArray = pointArray;
            }
        } else {return 0;}

        for (var i = lastPoint + 1; i < 5; i++) {
            var tempArray = pathArray;
            var tempPointArray = pointArray;
            tempArray.push(addressStart + i);
            getPathDuration(tempArray);
            tempPointArray.push(i)
            function waitForDuration() {
                if (tempDuration == -1) {
                    console.log('gen not yet..', tempDuration);
                    setTimeout(waitForDuration, 50);
                    return;
                }
                console.log('AMOGUX', tempDuration);
                generator(pathLength + 1, tempArray, i, tempDuration, needTime, tempPointArray);
            }
            waitForDuration();
            return;

        }
        return 0;
    }
});
//aboba
//sus