window.addEventListener("DOMContentLoaded", function () {

    var req = new XMLHttpRequest(),
        container = document.getElementById("friends");

    var listElement = function (item) {
        var output = document.createElement("div"),
            email_md5 = CryptoJS.MD5(item.email).toString(),
            str = [];

        output.setAttribute("class", "item");

        str.push("<img src='http://www.gravatar.com/avatar/" + email_md5 + "?d=monsterid&s=200' alt='" +
                 item.name + "'>");
        str.push("<h2>" + item.name + "</h2>");

        if (item.contributions && item.contributions.length) {
            str.push("<p class='contributions'>");
            str.push(item.contributions.join(", "));
            str.push("</p>");
        }

        if (item.twitter || item.github) {
            str.push("<p class='social-links'>");
            if (item.twitter) {
                str.push("<span class='twitter'><a href='https://twitter.com/" +
                         item.twitter + "'>Twitter</a></span>");
            }
            if (item.github) {
                str.push("<span class='github'><a href='https://github.com/" +
                         item.github + "'>Github</a></span>");
            }
            str.push("</p>");
        }

        output.innerHTML = str.join("");

        return output;
    };

    var render = function (list) {
        var i;

        list.sort(function (a, b){
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        });

        for (i in list) {
            container.appendChild(listElement(list[i]));
        }
    };

    req.onload = function () {

        try {
            var list = JSON.parse(this.responseText);
        } catch (e) {
            container.innerHTML = "Cannot load friends list :-(";
        }

        list.length && render(list);
    };

    req.open("GET", "friends.json", true);
    req.send();

});
