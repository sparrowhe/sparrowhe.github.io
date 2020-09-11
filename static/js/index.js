var inst = new mdui.Drawer('#drawer');

const apiUrl = "test";

const blogName = "Blog";

const blogOwner = "SparrowHe";

var markdownHtml = `<br><div class="mdui-typo-display-2">SparrowHe</div><br><div class="mdui-typo-body1">Hi, 我是SparrowHe，生于这个世纪，即将死于这个世纪</div><br><div class="mdui-typo-body1">思想江化，整天膜蛤</div><br><div class="mdui-typo-body1">文章在左边，记录我的一些日常生活</div><br>`;

var notes = []

mdui.mutation();

var app = new Vue({
    el: "#app",
    data: {
        owner: blogOwner,
        name: blogName,
        markdownHtml: markdownHtml,
        posts: notes,
        sideStyle: "",
        status: inst.getState()=='opened' ? true : false,
        time: '页面加载于 ' + new Date().toLocaleString()
    }
});

Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
      hljs.highlightBlock(block);
    })
  })

document.onload = loadPostList();
document.title = `${blogName} - ${blogOwner}`

if (getQueryVariable("postId")) {
    app.markdownHtml = "<h1>Loading...</h1>";
    loadFromId(getQueryVariable("postId"));
}

if (getQueryVariable("rss")) {
    var xml = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>${blogName} - ${blogOnwer}</title><link>http://sparrowhe.top</link><description>${blogOnwer}'s Blog</description>`;
    $.ajax({
        url: apiUrl + "/post.json",
        success: function (res) {
            for (i in res) {
                xml += `<item>
                <title>${res[i].title}</title>
                <link>http://sparrowhe.top/?postId=${res[i].id}</link>
                <description>${res[i].description}</description>
              </item>`;
            }
            xml += `</channel></rss>`;
            document.write(xml);
            console.log(xml);
        }
    })
}

function toggleBar() {
    app.status = !app.status;
    inst.toggle();
}

function postCallback(res) {
    _(res).forEach(element => {
        if (!element.hideInList) {
            app.posts.push({
                title: element.title,
                postUrl: "javasctipt:window.location.href='" + window.location.href.split("?")[0] + `?postId=${element.id}'`
            })
        }
    });
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = _.split(query, "&", 1);
    if (_.split(vars[0], "=")[0] == variable) {
        return _.split(vars[0], "=")[1];
    }
}