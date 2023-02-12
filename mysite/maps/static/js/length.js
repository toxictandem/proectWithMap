ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 9,
        controls: []
    });

    // Создание маршрута.
    var points = [];
    var addressStart = 'Москва, проспект Мира, 119с'
    for (var i = 1; i < 26; i++) {
        points.push(addressStart + i);
    }
    console.log(points);

    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: points,
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
        // Для автомобильных маршрутов можно вывести
        // информацию о перекрытых участках.
        if (activeRoute.properties.get("blocked")) {
            console.log("На маршруте имеются участки с перекрытыми дорогами.");
        }
    });
    // Добавление маршрута на карту.
    myMap.geoObjects.add(multiRoute);
});