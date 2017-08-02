//业务

var elements = {
    list: document.querySelector('#list'),
    filename: document.querySelector('#filename'),
    filetype: document.querySelector('#filetype'),
    create: document.querySelector('#create'),
    createBtn: document.querySelector('#createBtn'),
    paths: document.querySelector('#paths'),
    back: document.querySelector('#back'),
    crumbs: document.querySelector('#crumbs'),
    rename: document.querySelector('#rename'),
    mask: document.querySelector('#mask'),
    reNameInfo: document.querySelector('#reNameInfo'),
    del: document.querySelector('#del'),
    checknub: document.querySelector('#checknub'),
    checkAll: document.querySelector('#checkAll'),
    checkWrap: document.querySelector('#checkWrap'),
    checkAllText: document.querySelector('#checkAllText'),
    insteadOf: document.querySelector('#insteadOf'),
    close: document.querySelector('#insteadOf .close'),
    retain: document.querySelector('#insteadOf .retain'),
    merge: document.querySelector('#insteadOf .merge'),
    remove: document.querySelector('#remove'),
    treeContent: document.querySelector('.treeContent')
}
var _ID = 0;
var timer = 0;
var names = [];
//渲染
view(_ID);
viewTree(_ID);

var checkbox = elements.list.getElementsByTagName('input')
var contextmenuId = null;
elements.back.onmousedown = function(e) {
    if (e.button == 2) {
        return;
    }
    this.style.color = "red";
    var info = getInfo(_ID);
    if (info) {
        view(info.pid)
        cancelIco();
    }


}
elements.back.onmouseup = function() {
        this.style.color = "blue";
    }
    //新建文件，文件夹
elements.createBtn.onclick = function(e) {
    if (elements.filename.value == '') {
        alert('请输入内容');
        return;
    }
    create({
        pid: _ID,
        type: elements.filetype.value,
        name: elements.filename.value
    })
}
elements.remove.onclick = function(e) {

}
elements.filename.onmousedown = function(e) {
    e.stopPropagation();
}


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    if (e.target.parentNode.tagName == 'LI') {
        contextmenuId = e.target.parentNode;
    } else if (e.target.parentNode.parentNode) {
        contextmenuId = e.target.parentNode.parentNode;
    }
    if (e.target.parentNode.tagName == 'LI' || e.target.parentNode.parentNode && e.target.tagName != "UL") {
        showContextmenu(e, data.menu.file);

    } else {
        showContextmenu(e, data.menu.main);
        cancelActive();
        cancelIco();
    }
})

document.addEventListener('mousedown', function(e) {
        hideContextmenu();
        cancelActive();
        cancelIco();
    })
    //重命名
elements.rename.onclick = function() {
        var checkboxs = elements.list.querySelectorAll('.active');
        for (var i = 0; i < checkboxs.length; i++) {
            reName(checkboxs[i]);
        }
    }
    //删除内容
elements.del.onclick = function() {

        var checkboxs = elements.list.querySelectorAll('.active');
        for (var i = 0; i < checkboxs.length; i++) {

            del(checkboxs[i])

        }



    }
    //取消选中
    // document.addEventListener('mousedown', function (e) {
    //     cancelActive();
    //     cancelIco()
    // });

elements.create.addEventListener('contextmenu', function(e) {
    e.stopPropagation();
    e.preventDefault();
});
elements.create.addEventListener('mousedown', function(e) {
    e.stopPropagation();
    e.preventDefault();
});
elements.back.addEventListener('contextmenu', function(e) {
    e.stopPropagation();
    e.preventDefault();

});
//全选
elements.checkAll.onmousedown = function(e) {
    e.stopPropagation();
}
elements.checkAll.onclick = function(e) {
    e.stopPropagation();
}
elements.checkAll.onchange = function() {
        var inputs = elements.list.querySelectorAll('.ico');;
        if (inputs.length == 0) {
            elements.checkAll.checked = false
            return;
        }
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = this.checked;
            elements.checknub.innerHTML = inputs.length;
            if (this.checked) {
                inputs[i].parentNode.style.display = 'block';
                inputs[i].parentNode.parentNode.classList.add('active');
                elements.checkWrap.style.display = "inline-block";
                elements.checkAllText.style.display = 'none';
            } else {
                inputs[i].parentNode.style.display = 'none';
                inputs[i].parentNode.parentNode.classList.remove('active');
                elements.checknub.innerHTML = 0;
                elements.checkWrap.style.display = "none";
                elements.checkAllText.style.display = 'inline-block';

            }
        }
    }
    //框选
var lis = elements.list.getElementsByTagName('li');
elements.list.onmousedown = listdown;


// //拖拽
// var lis = elements.list.querySelectorAll('li');
// lis.forEach(function (li) {

// })
elements.close.onclick = function() {
    elements.insteadOf.style.display = "none";
}