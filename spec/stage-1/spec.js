describe("Stage 1", function() {
    it("must create object with name `Templater`", function() {
        (typeof Templater).should.equals('object');
    });

    it("must replace element with tag `bootstrap_button` to element with tag 'button', class 'btn btn-default', and innerHtml 'Some Text' ", function() {
        $('bootstrap_button').length.should.equals(1);
        Templater.run();
        $('bootstrap_button').length.should.equals(0, 'Element `bootstrap_button` was not removed from DOM. Amount of `bootstrap_button` elements in DOM');

        var replaced = $('button');
        replaced.length.should.equals(1, 'Element with `button` tag was not created. Amount of `button` elements in DOM');
        replaced.attr('class').should.equals('btn btn-default', 'Element with `button` tag has wrong class. It has class');
        replaced.html().should.equals('Some Text', 'Element with `button` tag innerHTML');
    });
});