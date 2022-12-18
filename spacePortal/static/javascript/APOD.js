
const APOD = {
    init: function () {
        $(".shiny-button#apod").click(async function () {
            $('#apodModal').modal('toggle')
            let today = new Date();
            await APOD._loadAPOD(today.toISOString().split('T')[0]);
            let APODdate = $('#APODdate');
            APODdate.change(async function () {
                let dateValue = $(this).val();
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

        let imageUrl = APODData['url']
        let title = APODData['title']
        let explanation = APODData['explanation']

        let img = $('.modal img')
        img.attr('src', imageUrl)

        let imgTitle = $('.modal h5')
        imgTitle.text(title)

        let imgExp = $('.modal p')
        imgExp.text(explanation)

    }

};