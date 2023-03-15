window.superTempDuration = -1;
var tempDuration = -1;
var allPaths = [];
var newbies = [];
var q = [];
var pathData = [];
var used = [];
var finished = false;
var count = 0;
var iterationCount = 100;

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 9,
        controls: []
    });

    // Создание маршрута.
    var points = [];
    var addressStart = 'Москва, проспект Мира, 119с'
    var all_id = new Set();
    var must_set = new Set();

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

    hour = document.getElementById('hour').value;
    minute = document.getElementById('minute').value;

    mustEncoded = document.getElementById('must').value;
    must = [ [points[1].x, points[1].y] ];
    cd = [];
    for (i = 0; i < 1400; i += 2) {
        if (mustEncoded[i] == 1) {
            console.log('PREPARE: ',i / 2);
            must.push( [points[i / 2].x, points[i / 2].y] );
            must_set.add( [points[i / 2].x, points[i / 2].y] )
            cd.push(i / 2);
        }
    }
    console.log('MUST: ', must, cd);

    needTime = hour * 3600 + minute * 60;
    bestLength = cd.length;
    bestArray = must;
    bestPointArray = cd;
    bestTime = -1;
    bestDistance = -1;

    q.push([bestLength, bestArray.slice(), bestArray[bestLength - 1], bestTime, bestDistance, [1] ])

    setInterval( function () {
            if (q.length > 0 && count < iterationCount) {
                let pathData = q.pop();
                let pathLength = pathData[0];
                let pathArray = pathData[1];
                let lastPoint = pathData[2];
                let pathDuration = pathData[3];
                let pathDistance = pathData[4];
                let pointArray = pathData[5];
                used.push(q);
                finished = false
                //generator(pathLength, pathArray, lastPoint, pathDuration, pointArray, pathDistance);

                console.log('///', q.length);

            }
        }, 10
    )
    console.log(bestPointArray);

    //pathLength, pathArray, lastPoint, pathDuration, pointArray


    var draw = setInterval( function () {
            console.log('work?');
            if (q.length == 0 || count >= iterationCount) {
                q = [];
                count = 0;
                console.log('ALARM EVERYTHING ENDED', count)
                /*var multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: bestArray,
                    params: {
                        routingMode: "pedestrian"
                    }
                }, {
                    boundsAutoApply: true
                });*/

                //myMap.geoObjects.add(multiRoute);
                console.log(getPathDuration(bestArray, bestLength), tempDuration, 'ANSWER');
                console.log(encodeDouble(bestArray), 'encoded');
                console.log(encode(bestPointArray), 'encoded');
                document.getElementById('id_address').value = encode(bestPointArray);
                document.getElementById('id_length').value = bestDistance;
                document.getElementById('id_duration').value = bestTime;
                names = ''
                console.log(bestPointArray);
                for ( i = 0; i < bestPointArray.length; i++) {
                    names += points[ bestPointArray[i] ].name + "; ";
                    console.log('names:', points[ bestPointArray[i] ])
                }
                //document.getElementById('id_names').value = names;
                //form = document.getElementById('nice_form');
                //form.submit();
                //clearInterval(draw);
            }
        }, 10000
    )
    draw;


    //pathLength, pathArray, lastPoint, pathDuration, needTime, pointArray
    function generator(pathLength, pathArray, lastPoint, pathDuration, pointArray, pathDistance) {
        count += 1;
        lastPoint = Math.max(...pointArray);
        console.log('PLUS', pathLength, pathArray, lastPoint, pathDuration, pointArray);
        allPaths.push([...pointArray]);

        for (var i = lastPoint + 1; i < 700; i++) {
            let tempArray = [...pathArray];
            let tempPointArray = [...pointArray];
            check = points[i];
            if (!check) { continue; }
            tempArray.push( [points[i].x, points[i].y] );

            getPathDuration(tempArray, pathLength);
            tempPointArray.push(i);


            console.log('AMOGUX', tempDuration);
            //console.log('Best Temp', bestArray);
            if (Math.abs(tempDuration - needTime) <= 270 && bestLength < pathLength + 1) {
                bestLength = pathLength + 1;
                bestArray = tempArray.slice();
                bestPointArray = tempPointArray.slice();
                bestTime = tempDuration;
                bestDistance = tempDistance;
                //q = [];
                //return;
            } else {
                console.log('Stopped: ', pathArray, pathDuration);
            }
            console.log('Was: ', q.length);
            q.push([pathLength + 1, [...tempArray], i, tempDuration, tempDistance, [...tempPointArray]]);
            console.log('Now; ', q.length);
            }
            //return;

        }
        finished = true;
        console.log('Now-now', q[-1]);
        return;
    }

    function encodeDouble(s) {
        result = ''
        for (i = 0; i < s.length; i++) {
            result += '' + s[i][0] + '|' + s[i][1] + '|';
        }
        return result;
    }

    function encode(s) {
        result = ''
        for (i = 0; i < 700; i++) {
            if (s.includes(i)) {
                temp = 1;
            } else {
                temp = 0;
            }
            result += '' + temp + '|';
        }
        return result;
    }

    setInterval(function () {console.log('CHECK: ', q.length, count);}, 5000);
    setInterval(function () {console.log('TOTAL: ', allPaths);}, 5000);
    setInterval(function () {console.log('BEST:  ', bestPointArray);}, 5000);
    setInterval(function () {console.log('USED:  ', count, q);}, 5000);
    setInterval(function () {console.log('TIME:  ', bestTime);}, 5000);
    setInterval(function () {console.log('DIST:  ', bestDistance);}, 5000);
});
//aboba
//sus

