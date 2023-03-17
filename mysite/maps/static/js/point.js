counter = Array(700).fill(false);
ymaps.ready(init);

var colourOn = '#c51d34'
var colourOff = '#FFFFFF'

function alarm(who) {
    temp = document.getElementById("id_points").value;
    half_one = temp.substring(0, who * 2 );
    half_two = temp.substring(who * 2 + 1, temp.length);
    temp_value = 1 - document.getElementById("id_points").value[who * 2];
    document.getElementById("id_points").value = half_one + temp_value + half_two;
    if (temp_value == 1) {
        document.getElementById("count-"+who).textContent = 'Точка включена в маршрут';
        //document.getElementById("placemark-name-"+who).style.color = colourOn;
    } else {
        document.getElementById("count-"+who).textContent = 'Точка исключена из маршрута';
        //document.getElementById("placemark-name-"+who).style.color = colourOff;
    }
    temp = document.getElementById("id_points").value;
    new_text = '';
    added_check = true;
    for (i = 0; i < temp.length; i+=2) {
        if (temp[i] == 1) {
            new_text = new_text +  '' + document.getElementById("name-"+i/2).value + '; ';
            added_check = false;
        }
    }

    if (added_check) {
        document.getElementById("point-array").textContent = "Ничего не выбрано";
    } else {
        document.getElementById("point-array").textContent = new_text;
    }
}

function update(who) {
    document.getElementById("id_points").value = half_one + temp_value + half_two;
    if (temp_value == 1) {
        document.getElementById("count-"+who).textContent = 'Точка включена в маршрут';
    } else {
        document.getElementById("count-"+who).textContent = 'Точка исключена из маршрута';
    }
}


function init () {
    var map = new ymaps.Map('map', {
            center: [55.82869300, 37.63372400],
            zoom: 16,
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
        //'<i id="placemark-name-{{properties.id}}" style="background-color: #FFFFFF; font-size: 70%">{{properties.place}}</i>' +
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
                let tid = document.getElementById("id-"+i).value;
                let tname = document.getElementById("name-"+i).value;
                let tx = document.getElementById("x-"+i).value;
                let ty = document.getElementById("y-"+i).value;
                count++;
                placemark.push(new ymaps.Placemark([tx, ty], {
                        id: tid,
                        place: tname,
                        x: tx,
                        y: ty,
                        hintContent: tname
                    }, {
                        balloonContentLayout: BalloonContentLayout,
                        balloonPanelMaxMapArea: 0,
                        iconLayout: animatedLayout,

                    }) );
        }
    }
    document.getElementById("id_points").value = RoutePoints;
    for (i = 0; i < count; i++) {
        map.geoObjects.add(placemark[i]);
    }
}