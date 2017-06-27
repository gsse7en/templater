describe("Stage 5", function() {
    it("must create method `templater` for `jQuery.fn`", function() {
        (typeof jQuery.fn.templater).should.equals('function');
    });

    it("must recursively replace tags", function() {
        $('panel').length.should.equals(3);
        $(document).templater({
            tags: {
              'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>'
            }
        });

        var absent = $('panel');
        absent.length.should.equals(0, 'Element still is found on page after replacement (checking panel tag).');
        var replaced = $('div.panel');
        replaced.length.should.equals(3, 'Wrong elements count for `div` tag with class `panel`.');
    });

});