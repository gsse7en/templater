//imports('./templater.js');

(function ($) {
"use strict";

    $.fn.templater = function (options) {
        var settings = $.extend({}, $.fn.templater.defaults, options);
        var dom = $(document);
        dom.rawHTML = document.getElementsByTagName('html')[0].innerHTML;
        return this.each(function () {
            Templater(settings);
        });
    };

    $.fn.templater.defaults = {
        parseHtmlPage: true,
        htmlPlaceholder: "html",
        bracketsRegexp: /\{\{(.*?)\}\}/g
    };

}(jQuery));