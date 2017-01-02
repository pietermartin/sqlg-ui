var sqlLi = {
    view: function (vnode) {
        return m("li", {class: "nav-item"}, [
            m("a[href=/sqlg/sql]", {
                class: "nav-link",
                oncreate: m.route.link,
                'data-target': "#sql"
            }, "Sql")
        ]);
    }
}

var sql = {
    view: function (vnode) {
        return m("div", {class: "tab-pane", id: "sql"}, "sql");
    }
}
