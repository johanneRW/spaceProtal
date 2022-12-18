
const APOD = {
    init: function () {
        $(".shiny-button#apod").click(async function () {
            $('#apodModal').modal('toggle')
            var today = new Date();
            await APOD._loadAPOD(today.toISOString().split('T')[0]);
            var APODdate = $('#APODdate');
            APODdate.change(async function () {
                var dateValue = $(this).val();
                await APOD._loadAPOD(dateValue)
            })
        })
    },



    _loadAPOD: async function (date) {
        const response = await fetch(
            'https://api.nasa.gov/planetary/apod?api_key=0xBWwWrQ3fosBO3mfognfipbqRDMeWUQb40DxwcS&date=' + date,
            { method: 'GET' }
        );
    
        const APODData = await response.json()

        var imageUrl = APODData['url']
        var title = APODData['title']
        var explanation = APODData['explanation']

        var img = $('.modal img')
        img.attr('src', imageUrl)

        var imgTitle = $('.modal h5')
        imgTitle.text(title)

        var imgExp = $('.modal p')
        imgExp.text(explanation)

    }

};