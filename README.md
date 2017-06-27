# gulp-templater
---
Gulp-templater is a javascript plugin to parse through html documents and update custom tags to specified templates. It works:
  - **Client-side** - adding js files as source files to your html pages.
  - **Server-side** - running "gulp templater" in npm, with html file specified

## Usage
---
### npm
    npm run build
This will create minified javascript files in "dist" folder, that you can use to update html files.    

### Gulpfile
```javascript
gulp.task('templater', function () {
    var templater = require('./dist/templater.gulp.min.js');
    gulp.src('./src/index.html').pipe(templater({
      tags: {
        'custom_tag': __dirname+'/src/template.html'
      },
      htmlPlaceholder: "html",
      bracketsRegexp: /\{\{(.*?)\}\}/g
    })).pipe(gulp.dest('./dist'));
});
```
This will update "src/index.html" server side. 

### javascript
    <script type="text/javascript" src="./dist/templater.min.js"></script>
Add this code to source files of your html document and then run Templater function to your custom tag like this:
```javascript
Templater({tags: {'custom tag': 'template'} });
```

### jQuery
    <script type="text/javascript" src="jquery-3.2.1.js"></script>
you can also use it as jQuery plugin like this:
```javascript
$(document).templater({tags:] {'custom tag': 'template'} });
```
    
## Example
---
##### Template example:
```html
<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>
```

##### Custom tag example:
```html
<panel heading="Inner Panel"><div>Some Inner content</div></panel>
```

##### Result:
```html
<div class="panel"><div class="panel-heading">Inner Panel</div><div class="panel-body"><div>Some Inner content</div></div></div>
```

License
----
MIT
