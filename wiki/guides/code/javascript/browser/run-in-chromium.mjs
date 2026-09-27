// Serves nothing itself: start a static server in this folder (python3 -m http.server 4380), then: node run-in-chromium.mjs
import { createRequire } from 'module';
const require = createRequire('/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');
const b = await chromium.launch();
const p = await b.newPage();
p.on('console', m => console.log(m.text()));
await p.goto('http://127.0.0.1:4380/dom.html');
await p.waitForFunction(() => document.querySelector('#out b'));
console.log('--- user fills the form and clicks Buy');
await p.fill('input[name=email]', 'ada@example.com');
await p.click('#buy');
console.log('--- user clicks "Cake" twice and the new <li>');
await p.click('#todos li:nth-child(2)'); await p.click('#todos li:nth-child(2)'); await p.click('#todos li:nth-child(3)');
console.log('--- user clicks the span');
await p.click('#target');
console.log('--- shift+click');
await p.click('#target', { modifiers: ['Shift'] });
await b.close();
