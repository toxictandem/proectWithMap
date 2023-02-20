function init() {
    // Задаём точки мультимаршрута.
    var points = [];
    var addressStart = 'Москва, проспект Мира, 119с'
    var all_id = new Set();

    for (i = 0; i < 700; i++) {
        check = document.getElementById('object-'+i);
        points.push(false);
        if (check) {
            id = document.getElementById('id-'+i).value;
            name = document.getElementById('name-'+i).value;
            x = document.getElementById('x-'+i).value;
            y = document.getElementById('y-'+i).value;
            points[i] = {
                'name': name,
                'x': x,
                'y': y
            };
            all_id.add(id);
        }
    }

    console.log(all_id);
    console.log(points);

    duration = document.getElementById('duration').value;
    length = document.getElementById('length').value;

    console.log(duration);
    console.log(length);

    mustEncoded = document.getElementById('address').value;
    must = [ [points[1].x, points[1].y] ];
    cd = [];
    new_text = '';
    for (i = 0; i < 1400; i += 2) {
        if (mustEncoded[i] == 1) {
            console.log('PREPARE: ',i / 2);
            must.push( [points[i / 2].x, points[i / 2].y] );
            cd.push(i / 2);
            new_text = '' + new_text + points[i / 2].name + '; ';
        }
    }

    console.log('MUST: ', must);
    console.log('CD: ', cd);
    console.log(new_text);
    document.getElementById('point-array').textContent = 'Точки: ' + new_text;

        multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: must,
            params: {
                //Тип маршрутизации - пешеходная маршрутизация.
                routingMode: 'pedestrian'
            }
        }, {
            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
            boundsAutoApply: true
        });

    // Создаем карту с добавленной на нее кнопкой.
    var myMap = new ymaps.Map('map', {
        center: [55.739625, 37.54120],
        zoom: 12,
        controls: []
    }, {
        boundsAutoApply: true
    });

    // Добавляем мультимаршрут на карту.
    function draw() {
        myMap.geoObjects.add(multiRoute);
    }
    draw();
}

ymaps.ready(init);
