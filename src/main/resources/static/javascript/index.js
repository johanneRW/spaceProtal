//skjul og vis foskellige sider
$(document).ready(function () {
    loadPlanets();

    $(".spaceships a").click(function () {
        loadSpaceships();
        $(".planetPage").addClass("d-none")
        $(".spaceshipPage").removeClass("d-none")
        $(".issPage").addClass("d-none")
    });

    $(".planets a").click(function () {
        loadPlanets();
        $(".spaceshipPage").addClass("d-none")
        $(".planetPage").removeClass("d-none")
        $(".issPage").addClass("d-none")
    });

    $(".iss a").click(function () {
        loadISS();
        $(".spaceshipPage").addClass("d-none")
        $(".planetPage").addClass("d-none")
        $(".issPage").removeClass("d-none")

        //var plaque = $('.plaque');
    });

    $(".shiny-button#apod").click(function () {
        $('#apodModal').modal('toggle')
        var today = new Date();
        loadAPOD(today.toISOString().split('T')[0]);
        var APODdate = $('#APODdate');
        APODdate.change(function () {
            var dateValue = $(this).val();
            loadAPOD(dateValue)
        })
    });

    $(".shiny-button#spacex").click(function () {
        $('#spacexModal').modal('toggle')
        loadSpaceX()
    });

    $(".reservation a").click(function () {
        $('#reservationModal').modal('toggle')
        loadReservation()
    });

});

// Plantes
var loadPlanets = function () {
    fetch(
        'http://localhost:8080/json/planets.json',
        { method: 'GET' }
    ).then(response => {
        response.json().then(planets => {
            updatePlanet(planets, 0);
            updatePlanetGrid(planets);
        });
    });
}

var updatePlanet = function (planets, planetId) {
    var planet = planets[planetId];

    $('.bigFrameContent img').attr('src', planet['imageUrl']);

    $('.plaque').html('<div class="text"><h2></h2><p></p></div>');  // reset 'plaque' element
    $('.plaque .text p').text(planet['notes']);
    $('.plaque .text h2').text(planet['name']);


    $("#planet-mass").text(planet['mass']);
    $("#planet-diameter").text(planet['diameter']);
    $("#planet-density").text(planet['density']);
    $("#planet-gravity").text(planet['gravity']);
    $("#planet-hoursperday").text(planet['hoursPerDay']);
    $("#planet-distance").text(planet['distanceFromSun']);
    $("#planet-meantemp").text(planet['meanTemp']);
    $("#planet-moons").text(planet['moons']);
    $("#top-notes").text(planet['notes']);
    $("#planet-name").text(planet['name']);

};

var updatePlanetGrid = function (planets) {
    var container = $('.detail .grid-container');

    container.html('');
    container.addClass('planet')
    container.removeClass('iss')
    container.removeClass('spaceship')

    for (let i = 0; i < planets.length; i++) {
        var imageUrl = planets[i]['imageUrl'];
        var name = planets[i]['name'];
        var options = $('<a href="#" data-id="' + i + '"><div class="grid-item"><img class="responsive" src="' + imageUrl + '" /><p>' + name + '</p></div></a>');
        container.append(options);
    }

    $('a', container).click(function () {
        var id = $(this).data('id');
        updatePlanet(planets, id);
    });
};


// Spaceships
var loadSpaceships = function () {
    fetch(
        'http://localhost:8080/json/spaceships.json',
        { method: 'GET' }
    ).then(response => {
        response.json().then(spaceships => {
            updateSpaceship(spaceships, 0);
            updateSpaceshipGrid(spaceships);

        });
    });
}

var updateSpaceship = function (spaceships, spaceshipId) {
    var spaceship = spaceships[spaceshipId];

    $('.bigFrameContent img').attr('src', spaceship['imageUrl']);

    $('.plaque').html('<div class="text"><h2></h2><p></p></div>');  // reset 'plaque' element
    $('.plaque .text p').text(spaceship['notes']);
    $('.plaque .text h2').text(spaceship['name']);


    $("#spaceship-crew-pass").text(spaceship['crew']);
    $("#spaceship-max-speed").text(spaceship['maxSpeed']);
    $("#spaceship-type").text(spaceship['type']);
    $("#spaceship-propulsion").text(spaceship['propulsion']);
    $("#spaceship-power").text(spaceship['power']);
    $("#spaceship-mass").text(spaceship['mass']);
    $("#spaceship-length").text(spaceship['length']);
    $("#spaceship-width").text(spaceship['width']);
    $("#spaceship-height").text(spaceship['height']);
    $("#spaceship-name").text(spaceship['name']);

};

var updateSpaceshipGrid = function (spaceships) {
    var container = $('.detail .grid-container');

    container.html('');
    container.removeClass('planets')
    container.removeClass('iss')
    container.addClass('spaceship')

    for (let i = 0; i < spaceships.length; i++) {
        var imageUrl = spaceships[i]['imageUrl'];
        var name = spaceships[i]['name'];
        var options = $('<a href="#" data-id="' + i + '"><div class="grid-item"><img class="responsive" src="' + imageUrl + '" /><p>' + name + '</p></div></a>');
        container.append(options);
    }

    $('a', container).click(function () {
        var id = $(this).data('id');
        updateSpaceship(spaceships, id);
    });
};

// ISS
var loadISS = function () {
    fetch(
        'https://api.wheretheiss.at/v1/satellites/25544',
        { method: 'GET' }
    ).then(response => {
        response.json().then(iss => {
            updateISS(iss);
            updateISSGrid(iss);

        });
    });
}

var updateISS = function (iss) {
    var note = "Is the largest modular space station currently in low Earth orbit. It is a multinational collaborative project involving five participating space agencies:NASA, Roscosmos, JAXA, ESA, and CSA. The ownership and use of the space station is established by intergovernmental treaties and agreements";
    var name = "The International Space Station (ISS) "
    $('.bigFrameContent img').attr('src', "/images/iss.png");

    $('.plaque').html('<div class="text"><h2></h2><p></p></div>');  // reset 'plaque' element
    $('.plaque .text p').text(note);
    $('.plaque .text h2').text(name);


    $("#iss-latitude").text(iss['latitude']);
    $("#iss-longitude").text(iss['longitude']);
    $("#iss-altitude").text(iss['altitude']);
    $("#iss-velocity").text(iss['velocity']);
    $("#iss-visibility").text(iss['visibility']);
    $("#iss-footprint").text(iss['footprint']);
    $("#iss-daynum").text(iss['daynum']);
    $("#iss-solar-lat").text(iss['solar_lat']);
    $("#iss-solar-lon").text(iss['solar_lon']);
    $("#iss-units").text(iss['units']);
    $("#iss-name").text(iss['name']);


};

var updateISSGrid = function (iss) {
    var container = $('.detail .grid-container');

    container.html('');
    container.removeClass('planets')
    container.addClass('iss')
    container.removeClass('spaceship')

    container.append('<img src="/images/iss.png">')

};

var loadAPOD = function (date) {
    fetch(
        'https://api.nasa.gov/planetary/apod?api_key=0xBWwWrQ3fosBO3mfognfipbqRDMeWUQb40DxwcS&date=' + date,
        { method: 'GET' }
    ).then(response => {
        response.json().then(APOD => {
            var imageUrl = APOD['url']
            var title = APOD['title']
            var explanation = APOD['explanation']

            var img = $('.modal img')
            img.attr('src', imageUrl)

            var imgTitle = $('.modal h5')
            imgTitle.text(title)

            var imgExp = $('.modal p')
            imgExp.text(explanation)


        });
    });

};

var loadSpaceX = function () {
    $("#spaceXTitle").text('');
    $("#missionData").text('');

    fetch(
        'https://api.spacexdata.com/v5/launches',
        { method: 'GET' },
    ).then(response => {
        response.json().then(launches => {
            var container = $('select#mission');

            container.text('');

            for (var launch = 0; launch < launches.length; launch++) {
                var data = launches[launch];
                var name = data['name'];
                var option = $('<option value="' + launch + '">' + name + '</option>');
                container.append(option);
            }

            container.change(function () {
                var value = $(this).val();
                var data = launches[value];
                var details = $('<p><h4>Details:</h4>' + data['details'] + '</p>');
                var launchDate = $('<p><h4>Launch date:</h4>' + data['date_utc'] + '</p>');
                var webcast = $('<p><h4>Webcast:</h4> <a href="' + data['links']['webcast'] + '">' + data['links']['webcast'] + '</a></p>');
                var wikipedia = $('<p><h4>Wikipedia:</h4> <a href="' + data['links']['wikipedia'] + '">' + data['links']['wikipedia'] + '</a></p>');
                $("#spaceXTitle").text(data['name']);
                $("#missionData").text('');
                $("#missionData").append(details);
                $("#missionData").append(launchDate);
                $("#missionData").append(webcast);
                $("#missionData").append(wikipedia);
            });
        });
    });
};

var loadReservation = function () {

    fetch(
        'http://localhost:8080/json/planets.json',
        { method: 'GET' }
    ).then(response => {
        response.json().then(planets => {
            var container = $('select#resPlanets');

            container.text('');

            for (var planet = 0; planet < planets.length; planet++) {
                var data = planets[planet];
                var name = data['name'];
                var option = $('<option value="' + planet + '">' + name + '</option>');
                container.append(option);
            }
        });
    });
    fetch(
        'http://localhost:8080/json/spaceships.json',
        { method: 'GET' }
    ).then(response => {
        response.json().then(spaceships => {
            var container = $('select#resSpaceship');

            container.text('');

            for (var spaceship = 0; spaceship < spaceships.length; spaceship++) {
                var data = spaceships[spaceship];
                var name = data['name'];
                var option = $('<option value="' + spaceship + '">' + name + '</option>');
                container.append(option);
            }
        });
    });

    var reservationButton = $('#reservationButton');
    reservationButton.click(function () {
        var resDate = $('#resDate').val();
        var resSpaceship = $('#resSpaceship').val();
        var resPlanet = $('#resPlanets').val();
        console.log(resDate, resSpaceship, resPlanet);

        // fetch(
        //     'http://localhost:8080/json/spaceships.json',
        //     { method: 'POST' }
        // ).then(response => {

        // });
        var reservationModal = $('#reservationModal');
        reservationModal.modal('hide');
    });

};
