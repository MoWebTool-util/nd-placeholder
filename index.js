/**
 * Description: index.js
 * Author: lzhengms <lzhengms@gmail.com>
 * Date: 2015-02-02 11:53:33
 */

'use strict';

var $ = require('jquery');

require('nd-inputor');

var Placeholder = function(node, text) {
  node = $(node);

  if (!node.data('placeholder')) {
    text || (text = node.attr('placeholder'));

    var hidden = node.attr('type') === 'hidden' ||
        node.css('display') === 'none' ||
        node.css('visibility') === 'hidden' ||
        node.val() !== '';

    var p = $('<span class="placeholder">' + text + '</span>');

    if (hidden) {
      p.hide();
    }

    node.after(p);

    p.on('focus click', function() {
      node.focus();
    });

    node.timer(function(text) {
      p[text.length ? 'hide' : 'show']();
    });

    node.data('placeholder', true);
  }
};

Placeholder.render = function() {
  if ('placeholder' in document.createElement('input')) {
    return;
  }

  $('[placeholder]').each(function() {
    new Placeholder(this);
  });
};

module.exports = Placeholder;
