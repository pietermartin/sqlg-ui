// var sqlLi4 = {
//     view: function (vnode) {
//         return m("li", {class: "nav-item"}, [
//             m("a[href=/sqlg/sql4]", {
//                 oncreate: m.route.link,
//             }, "Sql4")
//         ]);
//     }
// }

var sql4 = {
    name: function () {
        return "sql4";
    },
    url: function() {
        return "/sqlg/sql4";
    },
    view: function (vnode) {
        return m("div", "sql4");
    }
}
