// var sqlLi2 = {
//     view: function (vnode) {
//         return m("li", {class: "nav-item"}, [
//             m("a[href=/sqlg/sql2]", {
//                 oncreate: m.route.link,
//             }, "Sql2")
//         ]);
//     }
// }

var sql2 = {
    name: function () {
        return "sql2";
    },
    url: function() {
        return "/sqlg/sql2";
    },
    view: function (vnode) {
        return m("div", "sql2");
    }
}
