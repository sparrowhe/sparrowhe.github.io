/*(function () {
    showdown.extension('strikethrough', function (converter) {
        return [{
            // strike-through
            // NOTE: showdown already replaced "~" with "~T", so we need to adjust accordingly.
            type: 'lang',
            regex: '(~T){2}([^~]+)(~T){2}',
            replace: function (match, prefix, content, suffix) {
                return '<del>' + content + '</del>';
            }
        }];
    });


    // Client-side export
    if (typeof define === 'function' && define.amd) {
        define('showdown_strikethrough', ['showdown'], function (Showdown) {
            Showdown.extensions = Showdown.extensions || {};
            Showdown.extensions.strikethrough = strikethrough;
        });
    } else if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
        window.Showdown.extensions.strikethrough = strikethrough;
    }
    // Server-side export
    if (typeof module !== 'undefined') {
        module.exports = strikethrough;
    }
}());*/

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