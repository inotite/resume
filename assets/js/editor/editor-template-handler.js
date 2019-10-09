
var handleKeypress = function (obj, lengthLimit, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }

    return obj.text().length < lengthLimit;
}

var handleKeypressInput = function (obj, lengthLimit, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }

    return obj.val().length < lengthLimit;
}

var limitLines = function(obj, lineLimit, e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
    var origin = obj.text();
    var cloned = obj.clone();
    cloned.text(origin + "a");
    obj.after(cloned);
    var lines = Math.round(cloned.height() / parseInt(obj.css('line-height')));
    cloned.remove();
    console.log(lines);
    if (lines > lineLimit)
        return false;
    return true;
}

var preventCopyPaste = function(obj, lineLimit, e) {
    var lineHeight = parseInt(obj.css('line-height'));
    var lines = Math.round(obj.height() / lineHeight);

    if (lines > lineLimit) {
        var origin = obj.text();
        var cloned = obj.clone();
        obj.after(cloned);
        for ( var i = origin.length - 1 ; i >= 0 ; --i ) {
            cloned.text(origin.substr(0, i));
            var ln = Math.round(cloned.height() / lineHeight);
            if (lineLimit == ln) {
                obj.text(cloned.text());
                break;
            }
        }
        cloned.remove();
        return false;
    }

    return true;
}

var preventCopyPasteLength = function(obj, lengthLimit, e) {
    if (obj.text().length > lengthLimit) {
        obj.text(obj.text().substr(0, lengthLimit-1));
        return false;
    }
    return true;
}

var preventStyleCopyPate = function(e) {
    e.preventDefault();
    var text = (e.originalEvent || e).clipboardData.getData('text/plain');
    console.log(text);
    document.execCommand('inserttext', false, text);
}

var moveCaretToEnd = function(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
