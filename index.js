var m = require("./node_modules/mithril/mithril");
var Layout = require("./components/layout/layout");
var Connect = require("./components/connect/connect");
var TopologyTree = require("./components/topologytree/topologyTree");
var Schema = require("./components/topology/schema");
var Properties = require("./components/topology/properties");

m.mount(document.body, Connect);

m.route(document.body, "/", {
    "/home": {
        render: function () {
            return m(Layout, [
                m(Menu, {
                    leftMenus: [
                        {url: "#", text: "Home1"},
                        {url: "#", text: "Home2"},
                        {url: "#", text: "Home3"},
                        {url: "#", text: "Home4"}
                    ],
                    rightMenus: [
                        {url: "#", text: "Right1"}, {url: "#", text: "Right2"}
                    ]
                }),
                m(TopologyTree),
                m(Connect)
            ])
        }
    },
    "/sqlg/:tab": {
        render: function (vnode) {
            return m(Layout, [
                m(Menu, {
                        leftMenus: [
                            {url: "#", text: "Home1"},
                            {url: "#", text: "Home2"},
                            {url: "#", text: "Home3"},
                            {url: "#", text: "Home4"}
                        ],
                        rightMenus: [
                            {url: "#", text: "Right1"},
                            {url: "#", text: "Right2"}
                        ]
                    }
                ),
                m(TopologyTree),
                m(Menu, {
                    leftMenus: [
                        {url: "#", text: "Home1"},
                        {url: "#", text: "Home2"},
                        {url: "#", text: "Home3"},
                        {url: "#", text: "Home4"}
                    ]
                })
            ])
        }
    }
});
