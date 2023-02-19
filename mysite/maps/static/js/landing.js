function draw () {
            function init() {
                var data = [];

                 id = 0;
                 var i = 1;
                 while (true) {
                    let tempid = document.getElementById("id-"+i);
                        if (!tempid) {
                            break;
                    }
                    tempadd = document.getElementById("address-"+i).value;
                    tempdur = document.getElementById("duration-"+i).value;
                    templen = document.getElementById("length-"+i).value;
                    data.push([tempid.value, tempadd, tempdur, templen]);
                    console.log(tempid.value,'?');
                    console.log(tempadd);
                    console.log(tempdur);
                    console.log(templen);
                    i++;
                 }

                 TEMPROUTE = 1; //значение выбирает пользователь

                multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: data[TEMPROUTE][1].split('|'),
                    params: {
                        routingMode: 'pedestrian'
                    }
                }, {
                    boundsAutoApply: true
                });

            // Создаем карту с добавленной на нее кнопкой.
            var myMap = new ymaps.Map('map', {
                center: [55.739625, 37.54120],
                zoom: 12,
                controls: []
            });

            // Добавляем мультимаршрут на карту.
            myMap.geoObjects.add(multiRoute);
        }

        ymaps.ready(init);
    };
    window.onload = draw;