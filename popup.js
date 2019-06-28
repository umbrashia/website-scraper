// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function click(e) {
  chrome.tabs.executeScript(null,
    { code: "document.body.style.backgroundColor='" + e.target.id + "'" });
  var injectedCode = "show_ngo_info('165260');";
  console.log('Hello, Snippets!');
  document.body.innerHTML = '';
  var p = document.createElement('p');
  p.textContent = 'Hello, Snippets!';
  document.body.appendChild(p);
  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
