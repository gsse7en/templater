export class Templater {

    static getAttributeValue(refinedAttribute, tag, options) {
        let value = "";

        if (refinedAttribute === options.htmlPlaceholder) {
            value = tag.innerHTML;
        } else {
            value = tag.getAttribute(refinedAttribute);
        }

        return value;
    }

    static processTemplate(tag, template, options) {
        return template.replace(options.bracketsRegexp, (rawAttribute, refinedAttribute) => this.getAttributeValue(refinedAttribute, tag, options));
    }

    static getDOM(options) {
        if (options.parseHtmlPage) {
            return window.document;       
        } else {
            return options.document;
        }
    }

    static replaceCustomTag(el, findTag, template, options) {
        return el.replace(findTag[0].outerHTML, this.processTemplate(findTag[0], template, options));
    }

    static parseFromHtmlOrFile(options, findTag, dom, template) {
        if (options.parseHtmlPage) {
                findTag[0].outerHTML = this.replaceCustomTag(findTag[0].outerHTML, findTag, template, options);       
            } else {
                dom.rawHTML = this.replaceCustomTag(dom.rawHTML, findTag, template, options);
        }
    }

    static processAllCurrentTags(options, tagName, template) {
        const dom = this.getDOM(options);
        const findTag = dom.getElementsByTagName(tagName);

        if (findTag.length) {
            this.parseFromHtmlOrFile(options, findTag, dom, template);
            this.processAllCurrentTags(options, tagName, template);
        }
    }

    static run(options) {
        for (const key in options.tags) {
            if (options.tags.hasOwnProperty(key)) {
                try {
                    this.processAllCurrentTags(options, key, fs.readFileSync(options.tags[key], 'utf8'));
                }
                catch (err) {
                    this.processAllCurrentTags(options, key, options.tags[key]);
                }
            }
        }
        if (!options.parseHtmlPage) {
            const dom = this.getDOM(options);
            return dom.rawHTML;
        }
    }
};
