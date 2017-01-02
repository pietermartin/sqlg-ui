var state = {
    properties: []
}

module.exports = {
    view: function (vnode) {
        state.properties = vnode.attrs.properties;
        return 'adasdasd';
    }
}

