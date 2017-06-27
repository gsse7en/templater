describe("Stage 4", function() {
    it("must create method `templater` for `jQuery.fn`", function() {
        (typeof jQuery.fn.templater).should.equals('function');
    });

    it("must replace element with tag `button` to element with tag 'button', class 'btn btn-default', and innerHtml 'Some Text' for bootstrap section", function() {
        $('#bootstrap-templates button').length.should.equals(1);
        $('#bootstrap-templates').templater({
            tags: {
                'button': '<button class="btn btn-default {{class}}" type="{{type}}">{{html}}</button>'
            }
        });

        var replaced = $('#bootstrap-templates button');
        replaced.length.should.equals(1, 'Element with `button` tag was not created. Amount of `button` elements in DOM');
        replaced.attr('class').should.equals('btn btn-default bootstrap', 'Element with `button` tag has wrong class. It has class');
        replaced.attr('type').should.equals('submit', 'Element with `button` tag has wrong type. It has class');
        replaced.html().should.equals('Some Text', 'Element with `button` tag innerHTML');
    });

    it("must replace element with tag `button` to element with tag 'button', class 'button', and innerHtml 'Some Text' for foundation section", function() {
        $('#foundation-templates button').length.should.equals(1);
        $('#foundation-templates').templater({
            tags: {
                'button': '<button class="button {{class}}" type="{{type}}">{{html}}</button>'
            }
        });

        var replaced = $('#foundation-templates button');
        replaced.length.should.equals(1, 'Element with `button` tag was not created. Amount of `button` elements in DOM');
        replaced.attr('class').should.equals('button foundation', 'Element with `button` tag has wrong class. It has class');
        replaced.attr('type').should.equals('submit', 'Element with `button` tag has wrong type. It has class');
        replaced.html().should.equals('Some Text', 'Element with `button` tag innerHTML');
    });
});