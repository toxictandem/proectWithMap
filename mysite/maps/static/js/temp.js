var i = 0;
var j = 0;

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 9,
        controls: []
    });

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

    //console.log(all_id);
    console.log(points);
    tempDuration = -1;
    tempDistance = -1;

    function sortFunction(a, b) {
        if (a[0] === b[0]) {
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    function getPathDuration(pathArrayTemp, pathArrayLength, tid1, tid2) {

        var tempRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: pathArrayTemp,
            params: {
                routingMode: "pedestrian"
            }
        });
        tempRoute.model.events.add('requestsuccess', function() {
            var tempActiveRoute = tempRoute.getActiveRoute();
            tempDuration = tempActiveRoute.properties.get("duration").value;
            tempDistance = tempActiveRoute.properties.get("distance").value;
            answer[tid1].push([tempDuration, tempDistance, tid2]);
            answer[tid1].sort(sortFunction);
        });
        return;
    }

    id_1 = 1;
    id_2 = 2;

    answer = []
    count = []
    for (i = 67; i < 700; i++) {
        answer.push([]);
        count.push(0);
        pathArrayLength = 2;
        console.log(i);
        if (points[i] == false) {
            continue;
        }
        for (j = 0; j < points.length; j++) {
            if (i == j || points[i] == false || points[j] == false) {
                continue;
            }
            id_1 = i;
            id_2 = j;
            pathArrayTemp = [[points[id_1].x, points[id_1].y], [points[id_2].x, points[id_2].y]];

            getPathDuration(pathArrayTemp, 2, id_1, id_2);

            console.log(j);

            //setTimeout(() => { answer.push([id_1, tempDuration, tempDistance, id_2]); console.log("World!", j); }, 5000);
            getPathDuration(pathArrayTemp, 2);
        }
    }


    console.log(answer);
    for (i = 0; i < answer.length; i++) {
        index = answer[i][0];
        if (count[index] < 5) {
            count[index]++;
            console.log('aboba', answer[i][0], '\u0009', answer[i][3], '\u0009', answer[i][1], '\u0009', answer[i][2]);
        }
    }
    setTimeout(() => {
        console.log("Answer!");
        console.log(answer);
        for (i = 0; i < answer.length; i++) {
            if (answer[i].length == 0) {
                continue;
            }
            ind = ''
            dur = ''
            dis = ''
            for (j = 0; j < 10; j++) {
                ind += answer[i][j][2] + '|';
                dur += answer[i][j][0] + '|';
                dis += answer[i][j][1] + '|';
            }
            console.log('', i, '\u0009', i, '\u0009', ind, '\u0009', dur, '\u0009', dis);
        }
    }, 40000);
});