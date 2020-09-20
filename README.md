# Dyne Docs

A module for creating documentation tree from static markdown files.


**Configuration:**
```js
{
    docs: {
        rootPath: '/documentation',
        root: __dirname +'/resources/docs',
        default: '/in-root'
    }
}
``` 

**rootPath**  
This a route prefix for the documentation pages

**root**  
Physical directory where the files are stored. `rootPath` maps to `root`.

**default**  
The default file what will be displayed on `rootPath` main.
