
function init() {
    for (i = 0; i < 1000; i++) {
        check = document.getElementById('object-'+i);
        if (check) {
            time = document.getElementById('duration-'+i).value;
            hour = Math.floor(time / 3600);
            minute = Math.floor( (time - hour * 3600) / 60 );
            if (hour > 0) {
                document.getElementById('text-duration-'+i).textContent = 'Продолжительность маршрута: ' + hour + ' ч. ' + minute + ' мин.';
            }
            else {
                document.getElementById('text-duration-'+i).textContent = 'Продолжительность маршрута: ' + minute + ' мин.';
            }

            length = document.getElementById('length-'+i).value;
            kilo = Math.floor(length / 1000);
            metr = Math.floor( (length - kilo * 1000)  );
            if (kilo > 0) {
                document.getElementById('text-length-'+i).textContent = 'Длина маршрута: ' + kilo + ' км. ' + metr + ' м.';
            }
            else {
                document.getElementById('text-length-'+i).textContent = 'Длина маршрута: ' + metr + ' м.';
            }
        }
    }
}

setTimeout( init, 1000 );

function choose(chosen_id) {
    document.getElementById("id_address").value = document.getElementById("address-"+chosen_id).value;
    document.getElementById("id_duration").value = document.getElementById("duration-"+chosen_id).value;
    document.getElementById("id_length").value = document.getElementById("length-"+chosen_id).value;
    document.getElementById("id_names").value = document.getElementById("names-"+chosen_id).value;
    form = document.getElementById('nice_form');
    form.submit();
    clearInterval(draw);
}