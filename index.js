var all = function() {
var myself = arguments.callee.toString();
$(document).ready(function() {
  var textarea = $('textarea')[0];
  var func = function() {
    var output, input;
    if (this.value && this.value.length > 0) {
      if ('j' == this.value || 'J' == this.value) {
        // java example
        var example = $('.example')[0];
        input = example.innerHTML;
      } else {
        // user input
        input = this.value;
      }
    } else {
      // javascript example
      input = myself;
    }
    output = colorize(input);
    $('.code')[0].innerHTML = output;
  }
  textarea.onkeyup = func;
  textarea.onblur = func;
  func();
});
const separators      =/[\. \(\)\+\-=\/\*,;\{\}\n><:!\?\\"'\[\]]/;
function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] in rv) {
      rv[arr[i]]++;
    } else {
      rv[arr[i]] = 1;
    }
  }
  return rv;
}
const keywordColor = '#EA8EEA';
var colorize = function(code) {
  var text = code;
  var seen = {};  // colors here
  var parts = text.split(separators);
  parts = parts.filter(function(el) {
    return (el != "");
  }, this);
  var howManyOfEachWord = toObject(parts);
  var getAnotherColor = getManualColorGetter();
  // keywords:
  $.extend(seen, {
    'const' : keywordColor,
    'callee' : keywordColor,
    'arguments' : keywordColor,
    'throws' : keywordColor,
    'boolean' : keywordColor,
    'int' : keywordColor,
    'float' : keywordColor,
  })
  var ECMAScriptReservedWords = [
    'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'finally',
    'for', 'function', 'if', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try',
    'typeof', 'var', 'void', 'while', 'with', 'class', 'enum', 'export', 'extends', 'import',
    'super', 'implements', 'interface', 'let', 'package', 'private', 'protected', 'public',
    'static', 'yield', ];
  for (var i = 0; i < ECMAScriptReservedWords.length; i++) {
    seen[ECMAScriptReservedWords[i]] = keywordColor;
  };
  var output='';
  while (text.length > 0) {
    var commentindex=text.search(/[ \t]*(\/\/|#)/);
    var index = text.search(separators);
    var word;
    if (commentindex >= 0 && commentindex <= index) {
      // a comment comes first
      var commentend=text.search(/\n/);
      var comment=text.slice(0, commentend);
      word=comment;
      index=commentend;
      seen[word]=commentcolor;
    } else {
      // a separator such as . or ( comes first
      if (index >= 0) {
        word=text.slice(0, index)
      } else {
        word = text;
      }
    }
    var color;
    if (word in seen) {
      color = seen[word];
    } else {
      color = getAnotherColor(howManyOfEachWord[word], word);
      seen[word] = color;
    }
    if (color == white) {
      output += word;
    } else {
      output += '<span style="color: '+color+'">'+word+'</span>';
    }
    if (index < 0) {
      break;
    }
    // eat non-words
    text = text.slice(index);
    var m=text.match(separators);
    if (m && m.length > 0) {
      var l=m[0].length;
      var nonWords=text.slice(0, l);
      text=text.slice(l);
      output += nonWords;
    }
  };
  return output;
}
const white='#fff';
const gray='#666666';
const commentcolor=gray;
function getColorGetter() {
  var a=['00', '40', '80', 'C0', 'ff'];
  const l=5;
  var r=g=b=0;
  return function(occurenceCount) {
    if (occurenceCount == 1) {
      return white;
    }
    b++;
    if (b >= l) {
      b = 0
      g++
      if (g >= l) {
        g = 0
        r++;
        if (r >= l) {
          r = 0
        }
      }
    }
    return '#'+a[r]+a[g]+a[b];
  }
};
var ord0='0'.charCodeAt();
var ordz='z'.charCodeAt();
var range=ordz-ord0;
function getManualColorGetter() {
  const colors = [
      // '#000040', '#400000', '#004000',
      '#400040', '#004040', '#404000', '#404040', '#000080',
      '#400080', '#004080', '#404080', '#800000',
      '#800040', '#804000', '#804040', '#008000',
      '#008040', '#408000', '#408040', '#800080',
      '#804080', '#008080', '#408080', '#808000',
      '#808040', '#808080', '#0000C0', '#4000C0',
      '#0040C0', '#4040C0', '#8000C0', '#8040C0',
      '#0080C0', '#4080C0', '#8080C0', '#C00000',
      '#C00040', '#C04000', '#C04040', '#C00080',
      '#C04080', '#C08000', '#C08040', '#C08080',
      '#00C000', '#00C040', '#40C000', '#20E539',
      '#00C080', '#40C080', //'#80C000', '#80C040',
      '#80C080', '#C080C0', '#80C0C0', '#C0C080',
      '#C0C0C0', '#0000FF', '#4000FF', '#0040FF',
      '#4040FF', '#8000FF', '#8040FF', '#0080FF',
      '#4080FF', '#8080FF', '#C000FF', '#C040FF',
      '#C080FF', '#00C0FF', '#40C0FF', '#80C0FF',
      '#C0C0FF', '#FF0000', '#FF0040', '#FF4000',
      '#FF4040', '#FF0080', '#FF4080', '#FF8000',
      '#FF8040', '#FF8080', '#FF00C0', '#FF40C0',
      '#FF80C0', '#FFC000', '#FFC040', '#FFC080',
      '#FFC0C0', '#00FF00', '#00FF40', '#40FF00',
      '#40FF40', '#00FF80', '#40FF80', '#80FF00',
      '#80FF40', '#80FF80', '#00FFC0', '#40FFC0',
      '#80FFC0', '#C0FF00', '#C0FF40', '#C0FF80',
      '#C0FFC0', '#FF00FF', '#FF40FF', '#FF80FF',
      '#FFC0FF', '#FFE0FF', '#00FFFF', '#40FFFF',
      '#80FFFF', '#C0FFFF', '#E0FFFF', '#FFFF00',
      '#FFFF40', '#FFFF80', '#FFFFC0', '#FFFFE0'];
  const l=colors.length;
  var i=0;
  return function(occurenceCount, word) {
    // if (occurenceCount == 1) {
    //   return white;
    // }
    if (i==l) {
      i=0
    }

    var hash=md5(word);
    // return '#' + hash.slice(0,6);
    var h = Math.round(('0x'+hash.slice(0,2))*360/256);
    var s = '100';//('0x'+hash.slice(2,4))*100/256;
    var lightnessHash = '0x'+hash.slice(4,6);
    var lightnessHashInt = +lightnessHash;
    var lightnessHashIntNormalized = lightnessHashInt/256.0;
    var lTmp = lightnessHashIntNormalized*(1-0.40) + 0.40;
    var l = Math.round(100*lTmp);

    var sum=word.length;
    var lc=word.toLowerCase();
    for(var i=lc.length;i--;){
      if (lc[i] !== word[i]) {
        sum+=3;
      }
      if (lc[i] == '_') {
        sum+=2;
      } else {
        sum+=lc.charCodeAt(i)-ord0;
      }
    }

    h=Math.round((sum%range)*360.0/range);


    // Hack to prevent very dark blue colors
    var badHigh = 269;   // middle: 238 
    var badLow = 221;
    if (badLow < h && h < badHigh) {
      if (h - badLow < badHigh - h) {
        h = badLow;
      } else {
        h = badHigh;
      }
    }

    return 'hsl('+h+','+s+'%,'+l+'%)'
    // return colors[i++];
  }
}
};
all()

jQuery(function(){
  jQuery('textarea').scroll(function(eventObject){
    jQuery('.code').scrollTop(jQuery('textarea').scrollTop());
  });
});
  