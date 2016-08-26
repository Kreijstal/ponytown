Well, we can't speak much for server-side, since we can't really know how they do the processing, we can however try to find out the libraries they've been using.

First they write the code in TypeScript, they write it in a modular way.

They load the modules with SystemJS
Also some modules are called indirectly as dependencies of other modules. But we can't know that
Some of them modules are: 

- [AngularJS](https://angularjs.org/)
- [BluebirdJS](http://bluebirdjs.com/)
- underscore
- [MomentJS](http://momentjs.com/guides/)
- [core-js](https://www.npmjs.com/package/core-js)
- [rollbar.js](https://rollbar.com/docs/notifier/rollbar.js/)
- [stack for webgl](http://stack.gl/)
- [SystemJS](https://www.npmjs.com/package/systemjs-builder)
- Probably [Babel](https://babeljs.io/)
- [Angular UI Bootstrap](https://angular-ui.github.io/bootstrap/)
- [Express sessions](https://github.com/expressjs/session) (The cookie name is connect.sid)
- [lodash](https://lodash.com/)
- [gl-matrix](https://github.com/toji/gl-matrix)
- [NumberUtil](https://github.com/mattdesl/number-util)
- [typed-array pool](https://github.com/mikolalysenko/typedarray-pool)


For angular there are many tutorials you could use [this](http://www.w3schools.com/angular/angular_scopes.asp) one for example

Some useful links:

  -https://github.com/systemjs/systemjs/blob/master/docs/es6-modules-overview.md

While googling for code I discovered omniref which is a references to read libraries one by one and ask questions about, it's brilliant if you ask me.
You can search any npm library, here
https://docs.omniref.com/js/npm/gl-vao/1.2.0