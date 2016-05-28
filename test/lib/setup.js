'use strict';

const app = require('koa')();
const subdomain = require('../../lib/subdomain')();

const routerFactory = require('./routerFactory');

function setup() {

    app.subdomainOffset = 2;
    app.proxy = true;

    // one.example.com
    var router1 = routerFactory('one.example.com').routes();
    subdomain.use('one', router1);

    // two.example.com
    var router2 = routerFactory('two.example.com').routes();
    subdomain.use('two', router2);


    // a.one.example.com
    var router3 = routerFactory('a.one.example.com').routes();
    subdomain.use('a.one', router3);

    // b.one.example.com
    var router4 = routerFactory('b.one.example.com').routes();
    subdomain.use('b.one', router4);


    // example.com
    var router5 = routerFactory('example.com').routes();
    subdomain.use('', router5);


    // *.example.com
    var router6 = routerFactory('*.example.com').routes();
    subdomain.use('*', router6);

    // *.one.example.com
    var router7 = routerFactory('*.one.example.com').routes();
    subdomain.use('*.one', router7);

    // one.*.example.com
    var router8 = routerFactory('one.*.example.com').routes();
    subdomain.use('one.*', router8);


    app.use(subdomain.routes());
    app.listen(8888);

}

module.exports = setup;