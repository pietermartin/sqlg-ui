var dropDownState = [
    {name: "Action1", href: "/sqlg/dropdown1", dataTarget: "action1"}
];

var Tabs = {
    addToDropDown: function (tab) {
        var jqueryTab = $(tab);
        var aLink = jqueryTab.children("a").attr("href");
        var aDataTarget = jqueryTab.children("a").attr("data-target");
        var aText = jqueryTab.children("a").text();
        var tabToDropDown = {name: aText, href: aLink, dataTarget: aDataTarget};
        dropDownState.push(tabToDropDown);
        tab.remove();
    },
    onupdate: function (vnode) {
        $("#tabs a[data-target='#" + vnode.attrs.tab + "']").tab('show');
    },
    oncreate: function (vnode) {
        $("#tabs").each(function () {
            var resizeTimeout = 20;

            var tabList = $(this);
            var tabListItems = tabList.children("li");

            var dropdown = $(this).children(".dropdown");
            var dropdownToggle = dropdown.children(".dropdown-toggle");

            var clickHandler = ("ontouchstart" in document.documentElement ? "touchstart" : "click");

            var tabsToDropdown = function () {
                var previousTabListItemOffset = -1;
                tabListItems.each(function (index) {
                    if (index !== tabListItems.length - 1) {
                        var tabListItem = tabListItems[index];
                        var tabListItemOffset = $(this).position().left + $(this).outerWidth();

                        if (previousTabListItemOffset !== -1 && previousTabListItemOffset > tabListItemOffset) {
                            console.log("its wrapped");
                            Tabs.addToDropDown(tabListItem);
                        } else {
                            console.log("no wrapped");
                        }
                        previousTabListItemOffset = tabListItemOffset;
                    }
                });
            };

            tabsToDropdown();
            $(window).bind("resize", function () {
                if (typeof sizeWait != "undefined") {
                    clearTimeout(sizeWait);
                }
                sizeWait = setTimeout(function () {
                    tabsToDropdown();
                }, resizeTimeout);
            });

            dropdown.bind(clickHandler, function (e) {
                // e.stopPropagation();
            });
            $(document).bind(clickHandler, function () {
                // e.stopPropagation();
            });
        });
        $("#tabs a[data-target='#" + vnode.attrs.tab + "']").tab('show');
        $('.dropdown-toggle').dropdown();
        $('#tabs a').click(function (e) {
            e.preventDefault()
            $(this).tab('show')
            m.redraw();
            console.log(vnode);
        });
        //bug https://github.com/twbs/bootstrap/issues/17371
        $('.nav-tabs').on('shown.bs.tab', 'a', function (e) {
            if (e.relatedTarget) {
                $(e.relatedTarget).removeClass('active');
            }
        })
    },
    view: function (vnode) {
        var tabLis = vnode.attrs.tabLis;
        var tabs = vnode.attrs.tabs;
        return [
            m("ul", {id: "tabs", class: "nav nav-tabs"}, [
                tabLis.map(function (tabLi) {
                    return m(tabLi);
                }),
                m("li", {
                    class: "nav-item dropdown",
                    style: "visibility: " + (dropDownState.length > 0 ? "visible" : "visible")
                }, [
                    m("a[href=#]", {
                        class: "nav-link dropdown-toggle",
                        'data-toggle': "dropdown",
                        role: "button",
                        'aria-haspopup': "true",
                        'aria-expanded': "false"
                    }, "...V"),
                    m("div", {class: "dropdown-menu"}, [
                        dropDownState.map(function (link) {
                            // return m("a[href=/sqlg/dropdown1]", {
                            //     class: "dropdown-item",
                            //     oncreate: m.route.link,
                            //     'data-target': "#dropdown1"
                            // }, "Action")
                            return m("a[href=" + link.href + "]", {
                                class: "dropdown-item",
                                oncreate: m.route.link,
                                'data-target': link.dataTarget
                            }, link.name)
                        })
                    ])
                ])
            ]),
            m("div", {class: "tab-content"}, [
                tabs.map(function (tab) {
                    return m(tab);
                })
            ])
        ];
    }
}

