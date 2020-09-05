function loadMd(url) {
    $.ajax({
        url: url,
        success: function (res) {
            console.log(res);
            var converter = new showdown.Converter();
            $("#card").html(converter.makeHtml(res));
            $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
        }
    })
}