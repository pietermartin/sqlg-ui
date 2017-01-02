module.exports = {
    onupdate: function(vnode) {
        $("#tabs a[data-target='#" + vnode.attrs.tab + "']").tab('show');
    },
    oncreate: function (vnode) {
        // $("#tabs").each(function() {
        //     var resizeTimeout   = 20;
        //
        //     var tabList         = $(this);
        //     var tabListItem     = tabList.children("li");
        //
        //     var dropdown        = $(this).children(".dropdown");
        //     var dropdownToggle  = dropdown.children(".dropdown-toggle");
        //     var dropdownList    = dropdown.children("ul");
        //
        //     var clickHandler = ("ontouchstart" in document.documentElement ? "touchstart": "click");
        //
        //     var tabsToDropdown  = function() {
        //         var tabBarWidth = $(this).width();
        //         var previousTabListItemOffset = -1;
        //         tabListItem.each(function(index) {
        //             var dropdownListItem  = dropdownList.children("li").eq(index);
        //             var tabListItemOffset = $(this).position().left + $(this).outerWidth();
        //
        //             if (previousTabListItemOffset !== -1 && previousTabListItemOffset > tabListItemOffset) {
        //                 console.log("its wrapped");
        //                 // $(this).addClass("ttd-hide"); dropdownListItem.addClass("ttd-show");
        //             } else {
        //                 console.log("no wrapped");
        //                 // $(this).removeClass("ttd-hide"); dropdownListItem.removeClass("ttd-show");
        //             }
        //             previousTabListItemOffset = tabListItemOffset;
        //         });
        //
        //         tabList.children(".ttd-hide").length > 0 ? dropdown.addClass("ttd-show"): dropdown.removeClass("ttd-show");
        //     };
        //
        //     tabListItem.clone().appendTo(dropdownList);
        //
        //     tabsToDropdown();
        //     $(window).bind("resize", function(){
        //         if(typeof sizeWait != "undefined") { clearTimeout(sizeWait); }
        //         sizeWait = setTimeout(function(){
        //             tabsToDropdown();
        //         },resizeTimeout);
        //     });
        //
        //     dropdown.bind(clickHandler, function(e) { e.stopPropagation(); });
        //     $(document).bind(clickHandler, function() { dropdown.removeClass("ttd-open"); });
        //     dropdownToggle.bind(clickHandler, function(e) { dropdown.toggleClass("ttd-open"); e.stopPropagation(); });
        // });
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
                tabLis.map(function(tabLi) {
                    return m(tabLi);
                })
            ]),
            m("div", {class: "tab-content"}, [
                tabs.map(function(tab) {
                    return m(tab);
                })
            ])
        ];
        //     m("li", {id: "tabs", class: "nav-item dropdown"}, [
        //         m("a[href=#]", {class: "nav-link dropdown-toggle", 'data-toggle': "dropdown", role: "button", 'aria-haspopup': "true", 'aria-expanded': "false"}, "Dropdown"),
        //         m("div", {class: "dropdown-menu"}, [
        //             m("a[href=/sqlg/dropdown1]", {
        //                 class: "dropdown-item",
        //                 oncreate: m.route.link,
        //                 'data-target': "#dropdown1"
        //             }, "Action"),
        //             m("a[href=/sqlg/dropdown2]", {
        //                 class: "dropdown-item",
        //                 oncreate: m.route.link,
        //                 'data-target': "#dropdown2"
        //             }, "Another action")
        //         ])
        //     ]),
    }
}

