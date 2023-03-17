ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
            center: [55.831388, 37.629277],
            zoom: 14,
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

    mustEncoded = document.getElementById('must').value;
    must = [ [points[1].x, points[1].y] ];
    cd = [];
    names = '';
    for (i = 0; i < 1400; i += 2) {
        if (mustEncoded[i] == 1) {
            must.push( [points[i / 2].x, points[i / 2].y] );
            cd.push(i / 2);
            names += '' + points[i / 2].name + '; ';
        }
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

    getPathDuration(must, must.length);
    function waitAgain() {
        if (tempDuration == -1 || tempDistance == -1) {
            setTimeout(waitAgain, 10);
            return;
        }
        document.getElementById('id_address').value = mustEncoded;
        document.getElementById('id_duration').value = tempDuration;
        document.getElementById('id_length').value = tempDistance;
        document.getElementById('id_names').value = names;
        form = document.getElementById('nice_form');
        form.submit();
        clearInterval(draw);
        return;
    }
    waitAgain();
}