/**
 * Description: index.js
 * Author: lzhengms <lzhengms@gmail.com>
 * Date: 2015-02-02 11:53:33
 */

'use strict';

var Placeholder;
var $=require('jquery');
var Position=require('nd-position');
require('nd-inputor');

var detect = (function () {
  var isSupport = 0;
  return function () {
    if (isSupport === 0) {
      isSupport = 'placeholder' in document.createElement('input');
    }
    return isSupport;
  };
})();

 Placeholder = function (node, text) {
  if (!detect()) {
    node = $(node);
    if (!node.data('placeholder')) {
      text = text || node.attr('placeholder');
      var p = $('<span class="placeholder">' + text + '</span>');
      var h = parseInt(node.css('line-height')) + 4;
      var pl = parseInt(node.css('padding-left'));
      var pt = parseInt(node.css('padding-top'));

      node.after(p);
      p.css({
        color: '#bbb',
        height: h,
        lineHeight: h + 'px',
        paddingLeft: pl + 'px',
        paddingTop: pt + 'px'
      });

      Position.pin({
        element: p
      }, {
        element: node
      });

      node.timer(function (text) {
        p[text.length ? 'hide' : 'show']();
      });

      p.bind('focus click', function () {
        node.focus();
      });

      if (node.val().length) {
        p.hide();
      }

      node.data('placeholder', true);
    }
  }
};

Placeholder.render = function () {
  $('[placeholder]').placehoder();
};

$.fn.placehoder = function () {
  this.each(function () {
    Placeholder(this);
  });
};

$(function () {
  if (!detect()) {
    $(window).bind('resize.placeholder', function () {
      $('[placeholder]').each(function (i, node) {
        node = $(node);
        var p = node.nextAll('.placeholder').eq(0);
        Position.pin({
          element: p
        }, {
          element: node
        });
      });
    });
  }
});

module.exports = Placeholder;
