node-thumbnailer
===

**Requires ImageMagick to be installed and accessible to command-line usage**

Node.js module and binary for creating thumbnails on every image found recursively in a directory

Installation
===

Download the source and run `npm install ./thumbnailer [-g]`
Use the module in a project, or use -g for a global install to use the included binary

Usage
===

For info on ImageMagick's geometry argument, see [their documentation page](http://www.imagemagick.org/script/command-line-processing.php#geometry)

# Require
```
var thumbnailer = require('thumbnailer')
thumbnailer(startdir, targetdir, geometry, callback);
```

`startdir` can be a filename instead. `targetdir` will soon accept `null` instead of a dir, to overwrite each file instead. Callback is optional.

# Global (command-line)
```
thumbnailer <startdir> <targetdir or --inplace> <geometry>
```

`--inplace` is not yet implemented.


License
===

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.