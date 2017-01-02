var gremlinLi = {
    view: function (vnode) {
        return m("li", {class: "nav-item"}, [
            m("a[href=/sqlg/gremlin]", {
                class: "nav-link",
                oncreate: m.route.link,
                'data-target': "#gremlin"
            }, "Gremlin")
        ]);
    }
}

var gremlin = {
    view: function (vnode) {
        return m("div", {class: "tab-pane", id: "gremlin"}, "gremlin");
    }
}
