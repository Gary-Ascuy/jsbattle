#!/usr/bin/env node
'use strict'

const fs = require('fs');
const path = require('path');
const showdown  = require('showdown');

showdown.setFlavor('github');
showdown.setOption('tables', true);
showdown.setOption('disableForced4SpacesIndentedSublists', true);
const converter = new showdown.Converter();

function mkdir(name) {
  let p = path.resolve(__dirname + "/../" + name);
  if(fs.existsSync(p)) {
    return;
  }
  fs.mkdirSync(p, {recursive: true});
}

function processMd(txt) {
  txt = txt.replace(/(\[[^\]]*\]\([^\)]*\.)md\)/gi, '$1html)');
  return txt;
}

function processHtml(txt, level, sidebarContent, dns) {
  sidebarContent = sidebarContent.replace(/(\[[^\]]*\]\()([^\)]*\.)md\)/gi, '$1' + ('../'.repeat(level)) + '$2html)');
  
  // Replace Image by CDN into Images
  if (dns) txt = txt.replace(/\"\..*\/img\//ig, `"${dns}/docs/img/`);

  let htmlContent = converter.makeHtml(sidebarContent);
  let root = '../'.repeat(level);
  
  const pathDocs = dns ? `${dns}/docs/` : root

  txt = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Jala Colombia - jsBattle/Docs</title>
    <link rel="stylesheet" href="${pathDocs}style.css" type="text/css">
    <link rel="stylesheet" href="${pathDocs}highlight.css">
    <script src="${pathDocs}highlight.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
  </head>
  <body>
    <div id="side">
      ${htmlContent}
    </div>
    <div id="main">
      ${txt}
    </div>
    <script>

      function showParent(node) {
        let parent = node.parentElement;
        if(!parent) {
          return;
        }
        if(node.tagName == 'UL') {
          node.style.display = 'block'
        }
        showParent(parent)
      }

      // hide all containers
      document
        .querySelectorAll('#side ul ul')
        .forEach(el => el.style.display = 'none')

      // find selected item
      let pathname = window.location.pathname;
      pathname = pathname == '/' ? 'README.html' : pathname;
      let items = document.querySelectorAll('#side li');
      items = Array.prototype.slice.call(items);
      let selectedItem = items
        .find(li => {
          let children = Array.prototype.slice.call(li.childNodes);
          let aLink = children.find(el => el.tagName == 'A');
          return (aLink.href.substr(aLink.href.length - pathname.length, pathname.length) == pathname);
        })

      // show parents
      showParent(selectedItem);

      // show children
      let children = Array.prototype.slice.call(selectedItem.childNodes);
      let ulLink = children.find(el => el.tagName == 'UL');
      if(ulLink) {
        ulLink.style.display = 'block'
      }
    </script>
  </body>
</html>`;
  return txt;
}

function processPath(base, sub, sidebarContent, level, cdn) {
  level = level || 0;
  let basePath = path.resolve(__dirname + "/../" + base);
  let currentPath = path.resolve(basePath + "/" + sub);
  let content = fs.readdirSync(currentPath);

  content.forEach((filename) => {
    let subpath = path.resolve(currentPath + "/" + filename)
    let stat = fs.statSync(subpath);
    if(stat.isDirectory()) {
      mkdir('dist' + sub + '/' + filename);
      processPath(base, sub + '/' + filename, sidebarContent, level+1, cdn);
    } else if(filename.substring(filename.length-3) == '.md') {
      let mdPath = subpath;
      let htmlPath = path.resolve(__dirname + "/../dist/" + sub + '/' + filename.substring(0, filename.length-3) + ".html");
      let mdContent = fs.readFileSync(mdPath).toString();
      mdContent = processMd(mdContent);
      let htmlContent = converter.makeHtml(mdContent);
      htmlContent = processHtml(htmlContent, level, sidebarContent, cdn);
      console.log(htmlPath);
      fs.writeFileSync(htmlPath, htmlContent);
    }
  })
}

// CDN Configuration
// const cdn = 'https://jsbattle.jalacolombia.com';
// ENV JSBATTLE_CDN = 'https://jsbattle.jalacolombia.com'
const cdn = process.env.JSBATTLE_CDN;

mkdir('dist');
let sidebar = fs.readFileSync(path.resolve(__dirname + "/../docs/_sidebar.md")).toString();
processPath('docs', "", sidebar, 0, cdn);

let indexContent = fs.readFileSync(path.resolve(__dirname + '/../dist/README.html')).toString();
fs.writeFileSync(path.resolve(__dirname + '/../dist/index.html'), indexContent);
