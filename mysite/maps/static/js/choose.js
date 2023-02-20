function choose(chosen_id) {
    document.getElementById("id_address").value = document.getElementById("address-"+chosen_id).value;
    document.getElementById("id_duration").value = document.getElementById("duration-"+chosen_id).value;
    document.getElementById("id_length").value = document.getElementById("length-"+chosen_id).value;
    document.getElementById("id_names").value = document.getElementById("names-"+chosen_id).value;
    form = document.getElementById('nice_form');
    form.submit();
    clearInterval(draw);
}