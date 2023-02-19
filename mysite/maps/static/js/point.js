counter = Array(700).fill(false);
ymaps.ready(init);


function alarm(who) {
    temp = document.getElementById("id_points").value;
    half_one = temp.substring(0, who * 2 );
    half_two = temp.substring(who * 2 + 1, temp.length);
    temp_value = 1 - document.getElementById("id_points").value[who * 2];
    console.log(document.getElementById("id_points").value[who * 2], temp_value, who, document.getElementById("count-"+who).textContent) ;
    document.getElementById("id_points").value = half_one + temp_value + half_two;
    if (temp_value == 1) {
        document.getElementById("count-"+who).textContent = 'Точка включена в маршрут';
        //placemark[who].properties._data.name = ;
    } else {
        document.getElementById("count-"+who).textContent = 'Точка исключена из маршрута';
    }
}

function update(who) {
    console.log(document.getElementById("id_points").value[who * 2], temp_value, who, document.getElementById("count-"+who).textContent) ;
    document.getElementById("id_points").value = half_one + temp_value + half_two;
    if (temp_value == 1) {
        document.getElementById("count-"+who).textContent = 'Точка включена в маршрут';
    } else {
        document.getElementById("count-"+who).textContent = 'Точка исключена из маршрута';
    }
}


function init () {
    var map = new ymaps.Map('map', {
            center: [55.650625, 37.62708],
            zoom: 10,
            controls: []
        }),

        BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="margin: 10px;">' +
                '<b> <p1>{{properties.place}} </p1>  </b></br>' +
                '<i id="count-{{properties.id}}">Нажмите, чтобы добавить или удалить точку из маршрута</i> <br/>' +
                '<button onclick="alarm({{properties.id}})">Поменять</button>' +
            '</div>', {

            build: function () {
                BalloonContentLayout.superclass.build.call(this);
                $('#counter-button').bind('click', this.onCounterClick);
                //update();
            },

            clear: function () {
                $('#counter-button').unbind('click', this.onCounterClick);
                BalloonContentLayout.superclass.clear.call(this);
            },



        });

    var animatedLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="placemark"></div>' +
        '<p9 class="placemark-name">{{properties.place}}</p9>' +
        '<input type="hidden" id="id" data-view-mode="list" value="{{properties.id}}" readonly></input> </b><br/>',
        {
            build: function () {
                animatedLayout.superclass.build.call(this);
                var element = this.getParentElement().getElementsByClassName('placemark')[0];
                var smallShape = {type: 'Circle', coordinates: [0, 0], radius: 30};
                this.getData().options.set('shape', smallShape);
            }
        }
    );

    var placemark = [];
    var marker = [];
    var count = 0;
    var RoutePoints = "";
    for (i = 0; i < 700; i++) {
        RoutePoints += '0|';
        let stid = document.getElementById("id-"+i);
            if (stid) {
            console.log(stid);
                let tid = document.getElementById("id-"+i).value;
                let tname = document.getElementById("place-"+i).value;
                let tx = document.getElementById("x-"+i).value;
                let ty = document.getElementById("y-"+i).value;
                count++;
                placemark.push(new ymaps.Placemark([tx, ty], {
                        id: tid,
                        place: tname,
                        x: tx,
                        y: ty
                    }, {
                        balloonContentLayout: BalloonContentLayout,
                        balloonPanelMaxMapArea: 0,
                        iconLayout: animatedLayout
                    }) );
        }
    }
    document.getElementById("id_points").value = RoutePoints;
    console.log(placemark)
    for (i = 0; i < count; i++) {
        map.geoObjects.add(placemark[i]);
        console.log('!!!', placemark[i].properties._data);
    }

}