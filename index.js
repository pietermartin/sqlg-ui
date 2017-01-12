var m = require("./node_modules/mithril/mithril");
var Layout = require("./components/layout/layout");
var Connect = require("./components/connect/connect");
var TopologyTree = require("./components/topologytree/topologyTree");
var Schema = require("./components/topology/schema");
var Properties = require("./components/topology/properties");

m.route(document.body, "/", {
    "/": {
        render: function () {
            return m(Layout, [
                m(Menu, {
                    leftMenus: [
                        {url: "/sqlg/menu1", text: "Menu1"},
                        {url: "/sqlg/menu2", text: "Menu2"},
                        {url: "/sqlg/menu3", text: "Menu3"},
                        {url: "/sqlg/menu4", text: "Menu4"}
                    ],
                    rightMenus: [
                        {url: "/sqlg/menu5", text: "Menu5"},
                        {url: "/sqlg/menu6", text: "Menu6"}
                    ]
                }),
                m(TopologyTree),
                m(Connect)
            ])
        }
    },
    "/sqlg/:menu/:tab": {
        render: function (vnode) {
            var tabs =  [];
            switch (vnode.attrs.menu) {
                case 'Menu1':
                    tabs.push({url: "/sqlg/Menu1/Tab1", text: "Tab1"});
                    tabs.push({url: "/sqlg/Menu1/Tab2", text: "Tab2"});
                    tabs.push({url: "/sqlg/Menu1/Tab3", text: "Tab3"});
                    tabs.push({url: "/sqlg/Menu1/Tab4", text: "Tab4"});
                    tabs.push({url: "/sqlg/Menu1/Tab5", text: "Tab5"});
                    tabs.push({url: "/sqlg/Menu1/Tab6", text: "Tab6"});
                    tabs.push({url: "/sqlg/Menu1/Tab7", text: "Tab7"});
                    tabs.push({url: "/sqlg/Menu1/Tab8", text: "Tab8"});
                    tabs.push({url: "/sqlg/Menu1/Tab9", text: "Tab9"});
                    tabs.push({url: "/sqlg/Menu1/Tab10", text: "Tab10"});
                    break;
                case 'Menu2':
                    tabs.push({url: "/sqlg/Menu2/Tab1", text: "Tab1"});
                    tabs.push({url: "/sqlg/Menu2/Tab2", text: "Tab2"});
                    break;
                case 'Menu3':
                    tabs.push({url: "/sqlg/Menu3/Tab1", text: "Tab1"});
                    tabs.push({url: "/sqlg/Menu3/Tab2", text: "Tab2"});
                    tabs.push({url: "/sqlg/Menu3/Tab3", text: "Tab3"});
                    break;
                case 'Menu4':
                    tabs.push({url: "/sqlg/Menu4/Tab1", text: "Tab1"});
                    tabs.push({url: "/sqlg/Menu4/Tab2", text: "Tab2"});
                    tabs.push({url: "/sqlg/Menu4/Tab3", text: "Tab3"});
                    tabs.push({url: "/sqlg/Menu4/Tab4", text: "Tab4"});
                    break;
                case 'Menu5':
                    tabs.push({url: "/sqlg/Menu5/Tab5", text: "Tab5"});
                    tabs.push({url: "/sqlg/Menu5/Tab6", text: "Tab6"});
                    break;
                case 'Menu6':
                    tabs.push({url: "/sqlg/Menu6/Tab7", text: "Tab7"});
                    tabs.push({url: "/sqlg/Menu6/Tab8", text: "Tab8"});
                    break;
                default:
                    console.log("asdfasdf");
            }
            return m(Layout, [
                m(Menu, {
                        activeMenu: vnode.attrs.menu,
                        leftMenus: [
                            {url: "/sqlg/Menu1/Tab1", text: "Menu1"},
                            {url: "/sqlg/Menu2/Tab1", text: "Menu2"},
                            {url: "/sqlg/Menu3/Tab1", text: "Menu3"},
                            {url: "/sqlg/Menu4/Tab1", text: "Menu4"}
                        ],
                        rightMenus: [
                            {url: "/sqlg/Menu5/Tab5", text: "Menu5"},
                            {url: "/sqlg/Menu6/Tab7", text: "Menu6"}
                        ]
                    }
                ),
                m(TopologyTree),
                m(Tab, {
                    activeTab: vnode.attrs.tab,
                    key: vnode.attrs.menu + vnode.attrs.tab,
                    menu: false,
                    leftTabs: tabs
                })
            ])
        }
    }
});
