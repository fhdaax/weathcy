import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();

// enable localStorage
// import 'localstorage-polyfill';
// global['localStorage'] = localStorage;

const app = express();

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(process.cwd(), 'public');

const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    document: template,
    url: options.req.url,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
  }).then((html) => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER));

app.get('*.*', express.static(join(DIST_FOLDER)));

app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'index.html'), { req });
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
