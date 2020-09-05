function loadMd(url) {
    $.ajax({
        url: url,
        success: function (res) {
            console.log(res);
            var converter = new Showdown.converter();
            $("#card").html(converter.makeHtml(res));
            $('p code').each(function(i, e) {hljs.highlightBlock(e)});
        }
    })
}