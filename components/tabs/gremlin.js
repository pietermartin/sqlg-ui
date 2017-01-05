// var gremlinLi = {
//     view: function (vnode) {
//         return m("li", {class: "nav-item"}, [
//             m("a[href=/sqlg/gremlin]", {
//                 oncreate: m.route.link,
//             }, "Gremlin")
//         ]);
//     }
// }

var gremlin = {
    name: function () {
        return "gremlin";
    },
    url: function() {
        return "/sqlg/gremlin";
    },
    view: function (vnode) {
        return m("div", "gremlin");
    }
}
