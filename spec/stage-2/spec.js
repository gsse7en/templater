describe("Stage 2", function() {
    it("must create method `addTag` for object `Templater`", function() {
        (typeof Templater.addTag).should.equals('function');
    });

    it("must replace element with tag `bootstrap_button` to element with tag 'button', class 'btn btn-default', and innerHtml 'Some Text' ", function() {
        $('bootstrap_button').length.should.equals(1);
        Templater.addTag(
            'bootstrap_button',
            '<button class="btn btn-default" type="submit">' +
            'Some Text' +
            '</button>'
        );
        Templater.run();
        $('bootstrap_button').length.should.equals(0, 'Element `bootstrap_button` was not removed from DOM. Amount of `bootstrap_button` elements in DOM');

        var replaced = $('button');
        replaced.length.should.equals(1, 'Element with `button` tag was not created. Amount of `button` elements in DOM');
        replaced.attr('class').should.equals('btn btn-default', 'Element with `button` tag has wrong class. It has class');
        replaced.html().should.equals('Some Text', 'Element with `button` tag innerHTML');
    });

    it("must replace element with tag `bootstrap_link` to element with tag 'a', class 'btn btn-default', and innerHtml 'Some Another Text' ", function() {
        $('bootstrap_link').length.should.equals(1);
        Templater.addTag(
            'bootstrap_link',
            '<a class="btn btn-default" href="#" role=”button”>' +
            'Some Another Text' +
            '</a>'
        );
        Templater.run();
        $('bootstrap_link').length.should.equals(0, 'Element `bootstrap_link` was not removed from DOM. Amount of `bootstrap_link` elements in DOM');

        var replaced = $('button');
        replaced.length.should.equals(1, 'Element with `a` tag was not created. Amount of `a` elements in DOM');
        replaced.attr('class').should.equals('btn btn-default', 'Element with `a` tag has wrong class. It has class');
        replaced.html().should.equals('Some Text', 'Element with `a` tag innerHTML');
    });
});