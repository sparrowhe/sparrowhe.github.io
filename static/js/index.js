var inst = new mdui.Drawer('#drawer');

const apiUrl="http://127.0.0.1:1956/test";

const blogName = "Blog";

const blogOnwer = "SparrowHe";

document.onload=loadPostList();
document.title = `${blogName} - ${blogOnwer}`

function toggleBar() {
    inst.toggle();
}

function postCallback(res) {
    $("#notes").html("");
    console.log(res);
    for (i in res){
        var html=`<li class="mdui-list-item mdui-ripple" onclick="loadMd('${res[i].markdown}','${res[i].title}')">${res[i].title}</li>`
        $("#notes").html($("#notes").html()+html);
    }
}