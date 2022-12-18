const Planets = {
    
    _loadPlanets: async function () {
        const response = await fetch(
            'json/planets.json',
            { method: 'GET' }
        );
        const planets = await response.json();
        Planets._updatePlanet(planets, 0);
        Planets._updatePlanetGrid(planets);
    },
    _updatePlanet: function (planets, planetId) {
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
    },
    _updatePlanetGrid: function (planets) {
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
            Planets._updatePlanet(planets, id);
        });
    },
    init: function () {
        $(".planets a").click(async function () {
            await Planets._loadPlanets();
            $(".spaceshipPage").addClass("d-none")
            $(".planetPage").removeClass("d-none")
            $(".issPage").addClass("d-none")
        });
    },
    start: async function () {
        await Planets._loadPlanets();
    },
}