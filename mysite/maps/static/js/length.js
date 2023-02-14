window.superTempDuration = 808;
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
    generator(1, bestArray, 1, 0, 900, [1]);
    console.log(bestPointArray);




    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: bestArray,
        params: {
            routingMode: "pedestrian"
        }
    }, {
        boundsAutoApply: true
    });
    // Добавление маршрута на карту.
    myMap.geoObjects.add(multiRoute);

    // Подписка на событие обновления данных маршрута.
    multiRoute.model.events.add('requestsuccess', function() {
        // Получение ссылки на активный маршрут.
        // В примере используется автомобильный маршрут,
        // поэтому метод getActiveRoute() вернет объект multiRouter.driving.Route.
        var activeRoute = multiRoute.getActiveRoute();
        // Вывод информации о маршруте.
        console.log("Длина: " + activeRoute.properties.get("distance").text);
        console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
        console.log(activeRoute.properties.get("duration").value);
        console.log("Точки маршрута: " + bestArray);
        // Для автомобильных маршрутов можно вывести
        // информацию о перекрытых участках.
        if (activeRoute.properties.get("blocked")) {
            console.log("На маршруте имеются участки с перекрытыми дорогами.");
        }
    });
    // Добавление маршрута на карту.
    myMap.geoObjects.add(multiRoute);


    function getPathDuration(pathArrayTemp) {
        var superTempRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints: pathArrayTemp,
                params: {
                    routingMode: "pedestrian"
                }
            });
            superTempRoute.model.events.add('requestsuccess', function() {
                var activeRouteSuperTemp = superTempRoute.getActiveRoute();
                window.superTempDuration = activeRouteSuperTemp.properties.get("duration").value;
                console.log("!!! ", superTempDuration);
                //return (superTempDuration);
            });
            console.log("??? ", superTempDuration);
            return superTempDuration;
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
            var tempDuration = 808;
            var tempPointArray = pointArray;
            tempArray.push(addressStart + i);
            tempDuration = getPathDuration(tempArray);
            tempPointArray.push(i)
            generator(pathLength + 1, tempArray, i, tempDuration, needTime, tempPointArray);
        }
        return 0;
    }
});
//aboba
//sus