declaring AJAX RPCs easily.  
rdeclare binds itself to '/rpc-api' 

Example Usage:

**Server**
```js
var express = require('express');
var app = express();
var rdeclare = require('rdclare')(app);

/* Declare RPC method */
rdeclare('some_function', function(arg1, arg2, cb) {
    /* do something with the args*/
    long_async_operation(arg1 + arg2, function() {
        cb(arg2, arg1);
    });
});    

```

**Client**
```js
var rcall = require('rcall'); 

/* Call RPC method */
rcall('some_function', ['a', 'b'], function (arg1, arg2) {
    console.log(arg1, arg2);
}, this) /* rcall supports optional binding to a different context */
```

