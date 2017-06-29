import templater from "./templater.min";

(($ => {
    $.fn.templater = function (options) {
        const settings = $.extend({}, $.fn.templater.defaults, options);
        const dom = $(document);
        dom.rawHTML = document.getElementsByTagName('html')[0].innerHTML;
        return this.each(() => {
            templater.run(settings);
        });
    };

    $.fn.templater.defaults = {
        parseHtmlPage: true,
        htmlPlaceholder: "html",
        bracketsRegexp: /\{\{(.*?)\}\}/g
    };
})(jQuery));