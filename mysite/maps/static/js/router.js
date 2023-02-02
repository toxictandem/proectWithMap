ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.831388, 37.629277],
            zoom: 14
        });

    ymaps.route([
        'Москва, просп. Мира, 119, стр. 55',
        'Москва, проспект Мира, 119с1',
        'Москва, Проспект Мира, 119, стр. 31 '
    ]).then(function (route) {
        myMap.geoObjects.add(route);
        var points = route.getWayPoints(),
            lastPoint = points.getLength() - 1;
        points.options.set('preset', 'twirl#redStretchyIcon');
        //points.get(0).properties.set('iconContent', 'Точка отправления');
        //points.get(lastPoint).properties.set('iconContent', 'Точка прибытия');

    }, function (error) {
        alert('Возникла ошибка: ' + error.message);
    });
}