describe("Stage 6", function() {
    it("must create method `templater` object with `run` method", function() {
        (typeof templater.run).should.equals('function');
    });

    it("must recursively replace tags", function() {
        $('panel').length.should.equals(3);
        templater.run({
            tags: {
              'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>'
            },
            parseHtmlPage: true,
            htmlPlaceholder: "html",
            bracketsRegexp: /\{\{(.*?)\}\}/g
        });

        var absent = $('panel');
        absent.length.should.equals(0, 'Element still is found on page after replacement (checking panel tag).');
        var replaced = $('div.panel');
        replaced.length.should.equals(3, 'Wrong elements count for `div` tag with class `panel`.');
    });

});