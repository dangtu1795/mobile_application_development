var service = new google.maps.DistanceMatrixService();
var geocoder = new google.maps.Geocoder;
function findAddress() {
    $('.result').empty();
    var lat = $('#lat').val();
    var long = $('#long').val();
    var latlng = {lat: parseFloat(lat), lng: parseFloat(long)};
    console.log(latlng);
    geocoder.geocode({'location': latlng}, function(results, status){
        console.log(status, results)
        if(status == "OK") {
            $('.result').append('<ul>');
            for(var address of results) {
                $('.result').append(
                    '<li>'+address.formatted_address +'</li>'
                )
            }
            $('.result').append('</ul>');
        } else {
            alert("Addres not found!");
        }
    }); 
}

function calulateDistance() {
    $('.distance').empty();
    console.log($('#lat').val(),$('#lat_1').val());
    var lat_1 = parseFloat($('#lat_1').val());
    var long_1 = parseFloat($('#long_1').val());
    var lat_2 = parseFloat($('#lat_2').val());
    var long_2 = parseFloat($('#long_2').val());

    var destinationA = new google.maps.LatLng(lat_1, long_1);
    var destinationB = new google.maps.LatLng(lat_2, long_2);
        
    service.getDistanceMatrix(
        {
          origins: [destinationA],
          destinations: [destinationB],
          travelMode: 'DRIVING'
        }, function(response, status) {
            console.log(response,status);
            if(status == "OK") {
                if(response.rows[0].elements[0].status != "OK") {return alert("cant not caculate distance!");}
                $('.distance').append(
                    `<p>Distance: <b>${response.rows[0].elements[0].distance.text}</b></p>
                    <p>Duration:<b> ${response.rows[0].elements[0].duration.text}</b></p>`
                )
            } else {
                alert("cant not caculate distance!")
            }
        });
}
