// var sqlLi3 = {
//     view: function (vnode) {
//         return m("li", {class: "nav-item"}, [
//             m("a[href=/sqlg/sql3]", {
//                 oncreate: m.route.link,
//             }, "Sql3")
//         ]);
//     }
// }

var sql3 = {
    name: function () {
        return "sql3";
    },
    url: function() {
        return "/sqlg/sql3";
    },
    view: function (vnode) {
        return m("div", "sql3");
    }
}
