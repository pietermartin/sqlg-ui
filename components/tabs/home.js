var homeLi = {
    view: function (vnode) {
        return m("li", {class: "nav-item"}, [
            m("a[href=/sqlg/home]", {
                class: "nav-link",
                oncreate: m.route.link,
                'data-target': "#home"
            }, "Home")
        ]);
    }
}

var home = {
    view: function (vnode) {
        return m("div", {class: "tab-pane", id: "home"}, "home");
    }
}
