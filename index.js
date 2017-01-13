var m = require("./node_modules/mithril/mithril");
var Layout = require("./components/layout/layout");
var Connect = require("./components/connect/connect");
var TopologyTree = require("./components/topologytree/topologyTree");
var Schema = require("./components/topology/schema");
var Properties = require("./components/topology/properties");

$(window).bind("resize", function () {
    if (typeof sizeWait != "undefined") {
        clearTimeout(sizeWait);
    }
    sizeWait = setTimeout(function () {
        m.redraw();
    }, 0);
});

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
            var tabs = [];
            switch (vnode.attrs.menu) {
                case 'Menu1':
                    tabs.push({url: "/sqlg/Menu1/Tab11", text: "Tab11"});
                    tabs.push({url: "/sqlg/Menu1/Tab12", text: "Tab12"});
                    tabs.push({url: "/sqlg/Menu1/Tab13", text: "Tab13"});
                    tabs.push({url: "/sqlg/Menu1/Tab14", text: "Tab14"});
                    tabs.push({url: "/sqlg/Menu1/Tab15", text: "Tab15"});
                    tabs.push({url: "/sqlg/Menu1/Tab16", text: "Tab16"});
                    tabs.push({url: "/sqlg/Menu1/Tab17", text: "Tab17"});
                    tabs.push({url: "/sqlg/Menu1/Tab18", text: "Tab18"});
                    tabs.push({url: "/sqlg/Menu1/Tab19", text: "Tab19"});
                    tabs.push({url: "/sqlg/Menu1/Tab110", text: "Tab110"});
                    break;
                case 'Menu2':
                    tabs.push({url: "/sqlg/Menu2/Tab21", text: "Tab21"});
                    tabs.push({url: "/sqlg/Menu2/Tab22", text: "Tab22"});
                    break;
                case 'Menu3':
                    tabs.push({url: "/sqlg/Menu3/Tab31", text: "Tab31"});
                    tabs.push({url: "/sqlg/Menu3/Tab32", text: "Tab32"});
                    tabs.push({url: "/sqlg/Menu3/Tab33", text: "Tab33"});
                    break;
                case 'Menu4':
                    tabs.push({url: "/sqlg/Menu4/Tab41", text: "Tab41"});
                    tabs.push({url: "/sqlg/Menu4/Tab42", text: "Tab42"});
                    tabs.push({url: "/sqlg/Menu4/Tab43", text: "Tab43"});
                    tabs.push({url: "/sqlg/Menu4/Tab44", text: "Tab44"});
                    break;
                case 'Menu5':
                    tabs.push({url: "/sqlg/Menu5/Tab55", text: "Tab65"});
                    tabs.push({url: "/sqlg/Menu5/Tab56", text: "Tab66"});
                    break;
                case 'Menu6':
                    tabs.push({url: "/sqlg/Menu6/Tab77", text: "Tab77"});
                    tabs.push({url: "/sqlg/Menu6/Tab78", text: "Tab78"});
                    break;
                default:
                    console.log("asdfasdf");
            }
            var tabs2 = [];
            switch (vnode.attrs.menu) {
                case 'Menu1':
                    tabs2.push({url: "/sqlg/Menu1/Tabx11", text: "Tabx11"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx12", text: "Tabx12"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx13", text: "Tabx13"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx14", text: "Tabx14"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx15", text: "Tabx15"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx16", text: "Tabx16"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx17", text: "Tabx17"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx18", text: "Tabx18"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx19", text: "Tabx19"});
                    tabs2.push({url: "/sqlg/Menu1/Tabx110", text: "Tabx110"});
                    break;
                case 'Menu2':
                    tabs2.push({url: "/sqlg/Menu2/Tabx21", text: "Tabx21"});
                    tabs2.push({url: "/sqlg/Menu2/Tabx22", text: "Tabx22"});
                    break;
                default:
                    console.log("asdfasdf");
            }
            return m(Layout, [
                m(Menu, {
                        key: vnode.attrs.menu,
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
                // m(Tab, {
                //     key: vnode.attrs.menu,
                //     activeTab: vnode.attrs.tab,
                //     leftTabs: tabs2
                // }),
                m(Tab, {
                    key: vnode.attrs.menu,
                    activeTab: vnode.attrs.tab,
                    leftTabs: tabs
                })
            ])
        }
    }
});
