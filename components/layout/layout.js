module.exports = {
    oncreate: function (vnode) {
        var w = window, d = document, splitter;

        splitter = {
            lastX: 0,
            leftEl: null,

            init: function(handler, leftEl) {
                var self = this;
                this.leftEl = leftEl;
                handler.addEventListener('mousedown', function(evt) {
                    evt.preventDefault();    /* prevent text selection */
                    self.lastX = evt.clientX;
                    w.addEventListener('mousemove', self.drag);
                    w.addEventListener('mouseup', self.endDrag);
                });
            },

            drag: function(evt) {
                var wL, wDiff = evt.clientX - splitter.lastX;
                wL = d.defaultView.getComputedStyle(splitter.leftEl, '').getPropertyValue('width');
                wL = parseInt(wL, 10) + wDiff;
                splitter.leftEl.style.width = wL + 'px';
                splitter.lastX = evt.clientX;
                setTimeout(function() {
                    m.redraw();
                }, 0);
            },

            endDrag: function() {
                w.removeEventListener('mousemove', splitter.drag);
                w.removeEventListener('mouseup', splitter.endDrag);
            }
        };

        splitter.init(d.getElementsByClassName('splitter')[0], d.getElementsByClassName('leftNav')[0]);
    },
    view: function (vnode) {
        return [
            m("header", vnode.children[0]),
            m("main", [
                m("div", {class: "leftNav"}, vnode.children[1]),
                m("div", {class: "splitter"}),
                m("div", {class: "mainDiv"}, vnode.children[2])
            ]),
            m("footer", "footer")
        ];
    }
}

