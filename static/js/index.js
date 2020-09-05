var inst = new mdui.Drawer('#drawer');

const apiUrl = "test";

const blogName = "Blog";

const blogOnwer = "SparrowHe";

document.onload = loadPostList();
document.title = `${blogName} - ${blogOnwer}`

if (getQueryVariable("postId")) {
    loadFromId(getQueryVariable("postId"));
}

function toggleBar() {
    inst.toggle();
}

function postCallback(res) {
    $("#notes").html("");
    console.log(res);
    for (i in res) {
        var html = `<li class="mdui-list-item mdui-ripple" onclick="javascript:window.location.href=window.location.href.split('?')[0]+'?postId=${res[i].id}'">${res[i].title}</li>`
        $("#notes").html($("#notes").html() + html);
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}