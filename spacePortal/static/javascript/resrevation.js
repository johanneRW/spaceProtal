const Reservation = {

    _loadReservation: async function () {
        const responsePlanet = await fetch(
            'json/planets.json',
            { method: 'GET' }
        )
        const planets = await responsePlanet.json();
        var container = $('select#resPlanets');

        container.text('');

        for (var planet = 0; planet < planets.length; planet++) {
            var data = planets[planet];
            var name = data['name'];
            var option = $('<option value="' + planet + '">' + name + '</option>');
            container.append(option);
        }

        const responseSpaceships = await fetch(
            'json/spaceships.json',
            { method: 'GET' }
        )
        const spaceships = await responseSpaceships.json();
        var container = $('select#resSpaceship');

        container.text('');

        for (var spaceship = 0; spaceship < spaceships.length; spaceship++) {
            var data = spaceships[spaceship];
            var name = data['name'];
            var option = $('<option value="' + spaceship + '">' + name + '</option>');
            container.append(option);
        }

        var reservationButton = $('#reservationButton');
        reservationButton.click(function () {
            var resDate = $('#resDate').val();
            var resSpaceship = $('#resSpaceship').val();
            var resPlanet = $('#resPlanets').val();
            //Da der ikke er en backend pt, udskrives der i consolen 

            console.log(resDate, resSpaceship, resPlanet);

            // fetch(
            //     'http://localhost:8080/json/spaceships.json',
            //     { method: 'POST' }
            // )

            // });
            var reservationModal = $('#reservationModal');
            reservationModal.modal('hide');
        });

    },

    init: async function () {
        $(".reservation a").click(async function () {
            $('#reservationModal').modal('toggle')
            await Reservation._loadReservation()
        })
    }
}