window.superTempDuration = -1;
var tempDuration = -1;
var allPaths = [];
var newbies = [];
var q = [];
var pathData = [];
var used = [];
var finished = false;

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

    needTime = 2000;
    bestLength = 2;
    bestArray = [addressStart + 1, addressStart + 2];
    bestPointArray = [1, 2];

    q.push([2, bestArray.slice(), 2, 0, [1, 2] ])

    setInterval( function () {
            while (q.length > 0) {
                let pathData = q.pop();
                let pathLength = pathData[0];
                let pathArray = pathData[1];
                let lastPoint = pathData[2];
                let pathDuration = pathData[3];
                let pointArray = pathData[4];
                used.push(q);
                finished = false
                generator(pathLength, pathArray, lastPoint, pathDuration, pointArray);

                console.log('///', q.length);
            }
        }, 10000
    )
    console.log(bestPointArray);

    //pathLength, pathArray, lastPoint, pathDuration, pointArray


    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: bestArray,
        params: {
            routingMode: "pedestrian"
        }
    }, {
        boundsAutoApply: true
    });



    // Подписка на событие обновления данных маршрута.
    /*multiRoute.model.events.add('requestsuccess', function() {
        var activeRoute = multiRoute.getActiveRoute();
        console.log("Длина: " + activeRoute.properties.get("distance").text);
        console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
        console.log(activeRoute.properties.get("duration").value);
        console.log("Точки маршрута: " + bestArray);
    });*/

    myMap.geoObjects.add(multiRoute);


    function getPathDuration(pathArrayTemp) {
        tempDuration = -1;
        var tempRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: pathArrayTemp,
            params: {
                routingMode: "pedestrian"
            }
        });
        console.log('New Iteration');
        tempRoute.model.events.add('requestsuccess', function() {
            var tempActiveRoute = tempRoute.getActiveRoute();
            console.log("Время прохождения: " + tempActiveRoute.properties.get("duration").text);
            console.log(pathArrayTemp);
            tempDuration = tempActiveRoute.properties.get("duration").value;
            //return;
        });
        console.log('?');
        //var tempActiveRoute = tempRoute.getActiveRoute();
        //console.log()
        function waitForTime() {
            if (tempDuration == -1) {
                //console.log('gen not yet...')
                setTimeout(waitForTime, 50);
                return;
            }
            console.log('Please!!!!!!!!!!!', tempDuration);
            return;
        }
        waitForTime();
        return;
    }

    //pathLength, pathArray, lastPoint, pathDuration, needTime, pointArray
    function generator(pathLength, pathArray, lastPoint, pathDuration, pointArray) {

        console.log('PLUS', pathLength, pathArray, lastPoint, pathDuration, pointArray);


        for (var i = lastPoint + 1; i < 7; i++) {
            let tempArray = [...pathArray];
            let tempPointArray = [...pointArray];
            tempArray.push(addressStart + i);

            console.log('ADD Iteration')
            getPathDuration(tempArray);
            tempPointArray.push(i);
            console.log('END Iteration');
            allPaths.push([...tempPointArray]);

            function waitForDuration() {
                if (tempDuration == -1) {
                    console.log('gen not yet...');
                    setTimeout(waitForDuration, 50);
                    finished = true;
                    return;
                }
                console.log('AMOGUX', tempDuration);
                console.log('Best Temp', bestArray);
                if (tempDuration < needTime) {
                    if (pathLength > bestLength) {
                        bestLength = pathLength + 1;
                        bestArray = tempArray.slice();
                        bestPointArray = tempPointArray.slice();
                    }
                } else {
                    console.log('Stopped: ', pathArray, pathDuration);
                }
                q.push([pathLength + 1, [...tempArray], i, tempDuration, [...tempPointArray]]);
            }
            waitForDuration();
            //return;

        }
        finished = true;
        return;
    }
    setInterval(function () {console.log('TOTAL: ', allPaths);}, 5000);
    setInterval(function () {console.log('BEST:  ', bestPointArray);}, 5000);
    setInterval(function () {console.log('USED:  ', q);}, 5000);
});
//aboba
//sus