window.superTempDuration = -1;
var tempDuration = -1;
var allPaths = [];
var newbies = [];
var q = [];
var pathData = [];
var used = [];
var finished = false;
var count = 0;
var iterationCount = 3000 * document.getElementById('depth').value;

    // Создание маршрута.
var points = [];
var addressStart = 'Москва, проспект Мира, 119с'
var all_id = new Set();
var must_set = new Set();
var must_array = []

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 9,
        controls: []
    });

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

var graph = [];

for (i = 0; i < 700; i++) {
    check = document.getElementById('graph-'+i);
    graph.push(false);
    if (check) {
        graph[i] = [];
        id = document.getElementById('start-'+i);
        end = document.getElementById('end-'+i).value;
        dur = document.getElementById('duration-'+i).value;
        dis = document.getElementById('distance-'+i).value;

        end = decode(end);
        dur = decode(dur);
        dis = decode(dis);

        graph[i] = [];
        for (j = 0; j < 10; j++) {
            graph[i].push( [ end[j], dur[j], dis[j] ] );
        }
    }
}

hour = document.getElementById('hour').value;
minute = document.getElementById('minute').value;

mustEncoded = document.getElementById('must').value;
must = [ [points[1].x, points[1].y] ];
must_set.add(1);

cd = [];
for (i = 0; i < 1400; i += 2) {
    if (mustEncoded[i] == 1 || i == 2) {
        must_set.add( i / 2 );
        must_array.push(i / 2);
        cd.push(i / 2);
        must.push( [points[i / 2].x, points[i / 2].y] );
    }
}

needTime = hour * 3600 + minute * 60;
bestLength = must_array.length;
bestArray = must;
bestPointArray = must_array;
bestTime = -1;
bestDistance = -1;
bestUsed = new Set(JSON.parse(JSON.stringify([...must_set])));

getPathDuration(bestArray, bestArray.length);

function start() {
    bestTime = tempDuration;
    bestDistance = tempDistance;
    q.push([bestLength, bestArray.slice(), bestArray[bestLength - 1], bestTime, bestDistance, bestPointArray, new Set()]);


    while (q.length > 0 && count < iterationCount) {
        let pathData = q.pop();
        let pathLength = pathData[0];
        let pathArray = pathData[1];
        let lastPoint = pathData[2];
        let pathDuration = pathData[3];
        let pathDistance = pathData[4];
        let pointArray = pathData[5];
        let pathUsed = pathData[6];
        document.getElementById('loading').textContent = 'Загрузка ' + Math.floor(100*count/iterationCount) + '%...';
        used.push(q);
        finished = false
        generator(pathLength, pathArray, lastPoint, pathDuration, pointArray, pathDistance, pathUsed);
    }
}

setTimeout(start, 1000);


//pathLength, pathArray, lastPoint, pathDuration, pointArray


var draw = setInterval( function () {
        if (q.length == 0 || count >= iterationCount) {
            q = [];
            count = 0;
            document.getElementById('id_address').value = encode(bestPointArray);
            document.getElementById('id_length').value = bestDistance;
            document.getElementById('id_duration').value = bestTime;
            names = '';
            for ( i = 0; i < bestPointArray.length; i++) {
                names += points[ bestPointArray[i] ].name + "; ";
            }
            document.getElementById('id_names').value = names;
            form = document.getElementById('nice_form');
            form.submit();
            clearInterval(draw);
        }
    }, 10000
)
draw;


    //pathLength, pathArray, lastPoint, pathDuration, pointArray, pathDistance, pathUsed
function generator(pathLength, pathArray, lastPoint, pathDuration, pointArray, pathDistance, pathUsed) {
    count += 1;
    lastPoint = Math.max(...pointArray);
    allPaths.push([...pointArray, pathDuration]);

    for (var i = 0; i < 10; i++) {
        let tempArray = [...pathArray];
        let tempPointArray = [...pointArray];
        let tempPathUsed = new Set(JSON.parse(JSON.stringify([...pathUsed])));

        newPoint = graph[lastPoint][i][0];
        newDur = graph[lastPoint][i][1];
        newDist = graph[lastPoint][i][2];
        if (pointArray.includes(newPoint)) {
            continue;
        }

        tempArray.push( [points[newPoint].x, points[newPoint].y] );
        tempPathUsed.add(newPoint);

        pathDuration += newDur;
        pathDistance += newDist;
        tempPointArray.push(newPoint);

        if (Math.abs(pathDuration - needTime) <= 180 && bestLength < pathLength + 1) {
            bestLength = pathLength + 1;
            bestArray = tempArray.slice();
            bestPointArray = tempPointArray.slice();
            bestTime = pathDuration;
            bestDistance = pathDistance;
            bestUsed = new Set(JSON.parse(JSON.stringify([...tempPathUsed])));
        }
        q.push([pathLength + 1, [...tempArray], newPoint, pathDuration, pathDistance, [...tempPointArray], new Set(JSON.parse(JSON.stringify([...tempPathUsed]))) ]);
    }

    finished = true;
    return;
}

function encodeDouble(s) {
    result = ''
    for (x = 0; x < s.length; x++) {
        result += '' + s[x][0] + '|' + s[x][1] + '|';
    }
    return result;
}

function encode(s) {
    result = ''
    for (x = 0; x < 700; x++) {
        if (s.includes(x)) {
            temp = 1;
        } else {
            temp = 0;
        }
        result += '' + temp + '|';
    }
    return result;
}

function getPathDuration(pathArrayTemp, pathArrayLength) {
        tempDuration = -1;
        tempDistance = -1;
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
        });
        function waitForTime() {
            if (tempDuration == -1 || tempDistance == -1) {
                setTimeout(waitForTime, 10);
                return;
            }
            return;
        }
        waitForTime();
        return;
    }

function decode(s) {
    result = [];
    temp = '';
    for (x = 0; x < s.length; x++) {
        if (s[x] != '|') {
            temp += s[x];
        } else {
            result.push(+temp);
            temp = '';
        }
    }
    return result;
}

});



//aboba
//sus

