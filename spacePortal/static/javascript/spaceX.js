const SpaceX = {
    init: function () {
        $(".shiny-button#spacex").click(async function () {
            $('#spacexModal').modal('toggle')
            await SpaceX._loadSpaceX()
        })

    },


    _loadSpaceX: async function () {
        $("#spaceXTitle").text('');
        $("#missionData").text('');

        const response = await fetch(
            'https://api.spacexdata.com/v5/launches',
            { method: 'GET' },
        );

        const launches = await response.json()

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
    }
};