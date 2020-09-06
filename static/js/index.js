var inst = new mdui.Drawer('#drawer');

const apiUrl = "test";

const blogName = "Blog";

const blogOnwer = "SparrowHe";

document.onload = loadPostList();
document.title = `${blogName} - ${blogOnwer}`

if (getQueryVariable("postId")) {
    $("#card").html("<h1>Loading...</h1>");
    loadFromId(getQueryVariable("postId"));
}

if(getQueryVariable("rss")) {
    var xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>${blogName} - ${blogOnwer}</title><link>http://sparrowhe.top</link><description>${blogOnwer}'s Blog</description>`;
    $.ajax({
        url: apiUrl+"/post.json",
        success: function(res) {
            for(i in res) {
                xml += `<item>
                <title>${res[i].title}</title>
                <link>http://sparrowhe.top/?postId=${res[i].id}</link>
                <description>${res[i].description}</description>
              </item>`;
            }
            xml+=`</channel></rss>`;
            document.write(xml);
            console.log(xml);
        }
    })
}

function toggleBar() {
    inst.toggle();
}

function postCallback(res) {
    $("#notes").html("");
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