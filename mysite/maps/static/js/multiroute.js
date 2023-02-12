function init() {
    // Задаём точки мультимаршрута.
    var pointA = "Москва, проспект Мира, 119, стр. 53",
        pointB = "Москва, проспект Мира, 119, стр. 31",
        pointC = "Москва, проспект Мира, 119, стр. 20",
        pointD = "Москва, площадь Дружбы Народов"
        /**
         * Создаем мультимаршрут.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
         */
        multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                pointA,
                pointB,
                pointC,
                pointD
            ],
            params: {
                //Тип маршрутизации - пешеходная маршрутизация.
                routingMode: 'pedestrian'
            }
        }, {
            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
            boundsAutoApply: true
        });

    // Создаем кнопку.
    var changePointsButton = new ymaps.control.Button({
        data: {content: "Поменять местами точки А и В"},
        options: {selectOnClick: true}
    });

    // Объявляем обработчики для кнопки.
    changePointsButton.events.add('select', function () {
        multiRoute.model.setReferencePoints([pointB, pointA]);
    });

    changePointsButton.events.add('deselect', function () {
        multiRoute.model.setReferencePoints([pointA, pointB]);
    });

    // Создаем карту с добавленной на нее кнопкой.
    var myMap = new ymaps.Map('map', {
        center: [55.739625, 37.54120],
        zoom: 12,
        controls: [changePointsButton]
    }, {
        buttonMaxWidth: 300
    });

    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);
