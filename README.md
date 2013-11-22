# Shrub

Manipulate lists of files recursively in Node.

## Install

```
npm install shrub --save
```

## Usage

```js
var Shrub = require('shrub');
var shrub = new Shrub('path/to/dir');

shrub.each(function (filePath, stats, next) {
  // Do stuff
  next();
}, function () {
  // complete
});

shrub.filter(function (filePath, stats, next) {
  // Callback a true statement to add this files
  // to the filtered list
  
  next(filePath === 'some/file/path');
}, function (files) {
  //
});
```

## Methods

### each(filterFn, onComplete)

Asynchronous loop through file tree

### filter(filterFn, onComplete)

Aynchronously filter the file tree
