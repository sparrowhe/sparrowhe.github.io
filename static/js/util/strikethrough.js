(function (extension) {
    if (typeof showdown !== 'undefined') {
        // global (browser or nodejs global)
        extension(showdown);
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define(['showdown'], extension);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = extension(require('showdown'));
    } else {
        // showdown was not found so we throw
        throw Error('Could not find showdown library');
    }
}(function (showdown) {
    // loading extension into shodown
    showdown.extension('strikethrough', function () {
        var strikethrough = {
            type: 'lang',
            regex: '(?<=~~).*(?=~~)',
            replace: function (match, prefix, content, suffix) {
                console.log(match)
                return `<del>${match}</del>`
            }
        };
        var removeWaveLine={
            type: 'lang',
            regex: /~~/g,
            replace: ''
        }
        return [strikethrough,removeWaveLine];
    });
}));