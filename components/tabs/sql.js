// var sqlLi = {
//     view: function (vnode) {
//         return m("li", {class: "nav-item"}, [
//             m("a[href=/sqlg/sql]", {
//                 oncreate: m.route.link,
//             }, "Sql")
//         ]);
//     }
// }

var sql = {
    name: function () {
        return "sql";
    },
    url: function() {
        return "/sqlg/sql";
    },
    view: function (vnode) {
        return m("div", "sql");
    }
}
