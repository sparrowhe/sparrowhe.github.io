function loadMd(url, name) {
    $.ajax({
        url: url,
        success: function (res) {
            document.title = `${name} - ${blogOwner}`
            app.name = `${app.name} - ${name}`
            var converter = new showdown.Converter({
                extensions: ['table', 'strikethrough', 'radiobox']
            });
            app.markdownHtml = converter.makeHtml(res);
            hljs.initHighlighting();
            var card = document.getElementById("card");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, card]);
        }
    })
}

function loadFromId(id) {
    $.ajax({
        url: apiUrl + "/post.json",
        success: function (res) {
            _(res).forEach(element => {
                if(element.id == id) {
                    loadMd(element.markdown, element.title);
                }
            });
            app.markdownHtml = "<h1>404 Not Found</h1>";
        }
    })
}