var Templater = function (options) {
    "use strict";

    var getAttributeValue = function (refinedAttribute, tag, options) {
        var value = "";

        if (refinedAttribute === options.htmlPlaceholder) {
            value = tag.innerHTML;
        } else {
            value = tag.getAttribute(refinedAttribute);
        }

        return value;
    };

    var processTemplate = function (tag, template, options) {
        return template.replace(options.bracketsRegexp, function (rawAttribute, refinedAttribute) {
            return getAttributeValue(refinedAttribute, tag, options);
        });
    };

    var getDOM = function(options) {
        if (options.parseHtmlPage) {
            return window.document;       
        } else {
            return options.document;
        }
    };

    var processAllCurrentTags = function (options, tagName, template) {
        var dom = getDOM(options);
        var findTag = dom.getElementsByTagName(tagName);

        if (findTag.length) {
            if (options.parseHtmlPage) {
                findTag[0].outerHTML = findTag[0].outerHTML.replace(findTag[0].outerHTML, processTemplate(findTag[0], template, options));       
            } else {
                dom.rawHTML = dom.rawHTML.replace(findTag[0].outerHTML, processTemplate(findTag[0], template, options));
            }
            processAllCurrentTags(options, tagName, template);
        }
    };

    return function(options) {
        for (var key in options.tags) {
            if (options.tags.hasOwnProperty(key)) {
                try {
                    processAllCurrentTags(options, key, fs.readFileSync(options.tags[key], 'utf8'));
                }
                catch (err) {
                    processAllCurrentTags(options, key, options.tags[key]);
                }
            }
        }
        if (!options.parseHtmlPage) {
            var dom = getDOM(options);
            return dom.rawHTML;
        }
    }(options); 
};