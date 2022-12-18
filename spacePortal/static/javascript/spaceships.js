const Spaceships = {

    _loadSpaceships: async function () {
        const response = await fetch(
            'json/spaceships.json',
            { method: 'GET' }
        );
        const spaceships = await response.json();
        Spaceships._updateSpaceship(spaceships, 0);
        Spaceships._updateSpaceshipGrid(spaceships);
    },
    _updateSpaceship: function (spaceships, spaceshipId) {
        let spaceship = spaceships[spaceshipId];

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

    },
    _updateSpaceshipGrid: function (spaceships) {
        let container = $('.detail .grid-container');

        container.html('');
        container.removeClass('planets')
        container.removeClass('iss')
        container.addClass('spaceship')

        for (let i = 0; i < spaceships.length; i++) {
            let imageUrl = spaceships[i]['imageUrl'];
            let name = spaceships[i]['name'];
            let options = $('<a href="#" data-id="' + i + '"><div class="grid-item"><img class="responsive" src="' + imageUrl + '" /><p>' + name + '</p></div></a>');
            container.append(options);
        }

        $('a', container).click(function () {
            let id = $(this).data('id');
            Spaceships._updateSpaceship(spaceships, id);
        });
    },
    init: function () {
        $(".spaceships a").click(async function () {
            await Spaceships._loadSpaceships();
            $(".planetPage").addClass("d-none")
            $(".spaceshipPage").removeClass("d-none")
            $(".issPage").addClass("d-none")
        });
    }
};