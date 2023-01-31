ymaps.ready(init);

let center = [55.831388, 37.629277];

function init() {
	var map = new ymaps.Map('map', {
		center: center,
		zoom: 17
	});
	var data = JSON.parse("{{data|escapejs}}");
	for (x in data) {
	    var myPlacemark = new ymaps.Placemark([x.x_coord/100000, x.y_coord/100000], {
                hintContent: x.name,
                balloonContent: x.name
            });

            myMap.geoObjects.add(myPlacemark);
    }
  //map.controls.remove('geolocationControl'); // удаляем геолокацию
  //map.controls.remove('searchControl'); // удаляем поиск
  //map.controls.remove('trafficControl'); // удаляем контроль трафика
  //map.controls.remove('typeSelector'); // удаляем тип
  //map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  //map.controls.enable('zoomControl'); // удаляем контрол зуммирования
  //map.controls.remove('rulerControl'); // удаляем контрол правил
  //map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
}

