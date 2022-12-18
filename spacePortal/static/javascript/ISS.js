const ISS = {

    _loadISS: async function () {
        const response = await fetch(
            'https://api.wheretheiss.at/v1/satellites/25544',
            { method: 'GET' }
        );
        const iss = await response.json();
        ISS._updateISS(iss);
        ISS._updateISSGrid(iss);
    },
    _updateISS: function (iss) {
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


    },
    _updateISSGrid: function (iss) {
        var container = $('.detail .grid-container');

        container.html('');
        container.removeClass('planets')
        container.addClass('iss')
        container.removeClass('spaceship')

        container.append('<img src="/images/iss.png">')

    },
    init: function () {
        $(".iss a").click(async function () {
            await ISS._loadISS();
            $(".spaceshipPage").addClass("d-none")
            $(".planetPage").addClass("d-none")
            $(".issPage").removeClass("d-none")
        });
    }
}