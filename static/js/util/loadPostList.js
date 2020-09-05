async function loadPostList() {
    $.ajax({
        url: apiUrl + "/post.json",
        success: function (res) {
            postCallback(res);
        }
    })
}