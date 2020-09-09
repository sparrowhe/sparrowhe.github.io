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
            /*
            $('pre code').each(function (i, e) {
                hljs.highlightBlock(e);
            });
            */
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
            for (i in res) {
                if (res[i]["id"]==id) {
                    loadMd(res[i]["markdown"], res[i]["title"]);
                    break;
                }
            }
            app.markdownHtml = "<h1>404 Not Found</h1>";
        }
    })
}