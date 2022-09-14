var loadPlanets = function() {
    fetch(
        'http://localhost:8080/json/planets.json',
        { method: 'GET' }
    ).then(response => {
        response.json().then(planets => {
            updatePlanet(planets, 0);
            updatePlanetGrid(planets);
            updatePlanetFacts(planets);
        });
    });
}

var updatePlanet = function(planets, planetId) {
    var planet = planets[planetId];

    $('.bigFrameContent img').attr('src', planet['imageUrl']);

    $('.plaque').html('<div class="text"><h2></h2><p></p></div>');  // reset 'plaque' element
    $('.plaque .text p').text(planet['notes']);
    $('.plaque .text h2').text(planet['name']);
};

var updatePlanetGrid = function(planets) {
    var container = $('.detail .grid-container');

    container.html('');

    for (let i = 0; i < planets.length; i++) {
        var imageUrl = planets[i]['imageUrl'];
        var name = planets[i]['name'];
        var options = $('<div class="grid-item"><img class="responsive" data-id="' + i + '" src="' + imageUrl + '" /><p>' + name + '</p></div>');
        container.append(options);
    }

    $('img', container).click(function () {
        var id = $(this).data('id');
        updatePlanet(planets, id);
    });
};

$(document).ready(function(){
    loadPlanets();

    $(".spaceships a").click(function(){
        // $(".planetPage").addClass("d-none")
        // $(".spaceshipPage").removeClass("d-none")
        // $(".issPage").addClass("d-none")
    });

    $(".planets a").click(function(){
        loadPlanets();
        // $(".spaceshipPage").addClass("d-none")
        // $(".planetPage").removeClass("d-none")
        // $(".issPage").addClass("d-none")
    });

    $(".iss a").click(function(){
        var plaque = $('.plaque');
        var btnApod = $('<div><a class="shiny-button"></a><p>APOD</p></div>');
        var btnSpaceX = $('<div><a class="shiny-button"></a><p>SpaceX Launches</p></div>');
        plaque.html('');
        plaque.append(btnApod);
        plaque.append(btnSpaceX);

        // $(".spaceshipPage").addClass("d-none")
        // $(".planetPage").addClass("d-none")
        // $(".issPage").removeClass("d-none")
    });
});
