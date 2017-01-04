var m = require("./node_modules/mithril/mithril");
var Layout = require("./components/layout/layout");
var Menu = require("./components/menu/menu");
var Connect = require("./components/connect/connect");
var TopologyTree = require("./components/topologytree/topologyTree");
var Schema = require("./components/topology/schema");
var Properties = require("./components/topology/properties");

m.mount(document.body, Connect);

m.route(document.body, "/", {
    "/": {
        render: function () {
            return m(Layout, [
                m(Menu), m(TopologyTree), m(Connect)
            ])
        }
    },
    "/sqlg/:tab": {
        render: function (vnode) {
            return m(Layout, [
                m(Menu),
                m(TopologyTree),
                m(Tabs, {
                    tab: vnode.attrs.tab,
                    tabLis: [homeLi, gremlinLi, sqlLi, sqlLi1, sqlLi2, sqlLi3, sqlLi4],
                    tabs: [home, gremlin, sql, sql1, sql2, sql3, sql4]
                })
            ])
        }
    }
});
