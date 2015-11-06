Declaring AJAX RPCs easily.
rdeclare should be used in the server side along with rcall in the client side.
rdeclare binds itself to '/rpc-api'.

API:
```
rdeclare(name, method, options)

name - the name of the RPC method.
method - a function that will handle calls to the RPC. the last argument is a callback
         to send the answer to.
options - an optional object specifiying options. 
          it can be used to set the expected number of arguments using the 'length' option, 
          which otherwise will be inferred from the method given.

```


Example Usage (matching client example exist in rcall's readme):
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
