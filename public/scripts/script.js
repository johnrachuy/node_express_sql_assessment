$(document).ready(function() {
    $('#submit-button').on('click', postData);
    console.log("Ready!");

    getData();
});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#animal-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $('input').val('');

    $.ajax({
        type: 'POST',
        url: '/animal',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $('.animal-data').remove();
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function(data){
            console.log(data);
            sendToDom(data);
        }
    });
}
function sendToDom(animalData){
    for (var animal in animalData) {

        var ani = animalData[animal];

        $('#animal-table').append('<tr class="animal-data"><td>' + ani.animal + '</td><td>' + ani.quantity + '</td></tr>');
    }
}