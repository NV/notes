function $(id){
    return document.getElementById(id)
}
var S = localStorage
var s = getSelection()
var editor = $("editor")
var entries = $("entries")
var id = S.last_id = S.last_id || 0


function show(id) {
    editor.innerHTML = S.getItem(id + "_html") || ""
}

function select(){
    var r = document.createRange()
    r.setStart(editor, 0)
    s.removeAllRanges()
    s.addRange(r)
}

function create() {
    id = ++S.last_id
    editor.textContent = ''
    S.setItem(id, '')
    location.hash = "#"+ id
    select()
    updateList()
}

function updateList() {
    var l = parseInt(S.last_id) + 1
    var r = []
    for (var i=0; i<l; ++i) {
        var item = S.getItem(i)
        if (item) {
            r.push("<a id='item_"+ i +"' href='#"+i+"'>"+ item.slice(0, 50) +"</a>")
        }
    }

    entries.innerHTML = r.join("")
    highlightSelected()
}

function check() {
    var hash = location.hash
    if (hash) {
        id = hash.slice(1)
        if (id in S) {
            show(id)
        }
    } else {
        create()
    }
    updateList()
    select()
}

function setTitle(str) {
    if (str.length >= 30) {
        var i = str.lastIndexOf(" ") + 1
        if (i)
            str = str.slice(0, i)
        str += "..."
    }
    document.title = str
}

function highlightSelected(){
    var hash = location.hash.slice(1)
    if (!hash) return
    var element = $("item_"+hash)
    if (element) {
        element.className += ' selected'
        setTitle(element.textContent)
    }
}

editor.onkeyup = editor.onpaste = function(e){
    var html = e.target.innerHTML
    if (html != S.getItem(id+"_html")) {
        S.setItem(id, e.target.textContent)
        S.setItem(id+"_html", html)
        updateList()
    }
}

onload=onhashchange=check
