/**
 * Description: index.js
 * Author: lzhengms <lzhengms@gmail.com>
 * Date: 2015-02-02 11:53:33
 */

'use strict';

var Placeholder;
var $ = require('jquery');
var Position = require('nd-position');
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
      var hide = node.attr('type') === 'hidden' || node.css('display') === 'none' || node.css('visibility') === 'hidden';
      var p = $('<span class="placeholder">' + text + '</span>');
      var h = parseInt(node.css('line-height')) + 4;
      var pl = parseInt(node.css('padding-left'));
      var pt = parseInt(node.css('padding-top'));
      var borderLeft = parseInt(node.css('border-left-width')) + 1;
      var borderTop = parseInt(node.css('border-top-width')) + 1;

      node.after(p);
      p.css({
          color: '#bbb',
          height: h,
          lineHeight: h + 'px',
          paddingLeft: pl + 'px',
          paddingTop: pt + 'px'
        }
      );
      if(hide){
        p.css({display:'none'});
      }

      Position.pin({
        element: p,
        x: 0,
        y: 0
      }, {
        element: node,
        x: borderLeft + 'px',
        y: borderTop + 'px'
      });

      if (hide) {
        p.css({left: '-9999px'});
      }


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
}
;

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
