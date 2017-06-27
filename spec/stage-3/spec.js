describe("Stage 3", function() {
    it("must create method `addTag` for object `Templater`", function() {
        (typeof Templater.addTag).should.equals('function');
    });

    it("must replace element with tag `bootstrap_button` to element with tag 'button', class 'btn btn-default', and innerHtml 'Some Text' ", function() {
        $('bootstrap_button').length.should.equals(1);
        Templater.addTag(
            'bootstrap_button',
            '<button class="{{class}}" type="{{type}}">' +
            '{{html}}' +
            '</button>'
        );
        Templater.run();
        $('bootstrap_button').length.should.equals(0, 'Element `bootstrap_button` was not removed from DOM. Amount of `bootstrap_button` elements in DOM');

        var replaced = $('button');
        replaced.length.should.equals(1, 'Element with `button` tag was not created. Amount of `button` elements in DOM');
        replaced.attr('class').should.equals('btn btn-default', 'Element with `button` tag has wrong class. It has class');
        replaced.attr('type').should.equals('submit', 'Element with `button` tag has wrong type. It has class');
        replaced.html().should.equals('Some Text', 'Element with `button` tag innerHTML');
    });
});