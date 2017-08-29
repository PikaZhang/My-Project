var contextmenuCallback = {
        createFloder: function() {
            setTimeout(function() {
                create({
                    pid: _ID,
                    type: 'floder',
                    name: '新建文件夹'
                })
            })
        },
        createTxt: function() {
            setTimeout(function() {
                create({
                    pid: _ID,
                    type: 'text',
                    name: '新建文档文件'
                })
            })
        },
        sortSmall: function() {
            data.list.sort(function(a, b) {
                if (a.id > b.id) {
                    return 1;
                } else {
                    return -1;
                }
            })
            view(_ID)
        },
        sortBig: function() {
            data.list.sort(function(a, b) {
                if (a.id < b.id) {
                    return 1;
                } else {
                    return -1;
                }
            })
            view(_ID)
        },
        sortName: function() {
            data.list.sort(function(a, b) {
                if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
                    return 1;
                }
                return -1;
            });
            view(_ID)
        },
        /**
         * 
         * 
         */
        sortType: function() {

            var arr = [];
            var floder = []; //文件
            var text = []; //文本
            var image = [];
            var video = [];
            var html = [];
            for (var i = 0; i < data.list.length; i++) {
                switch (data.list[i].type) {
                    case 'floder':
                        floder.push(data.list[i]);
                        break;
                    case 'text':
                        text.push(data.list[i]);
                        break;
                    case 'image':
                        image.push(data.list[i]);
                        break;
                    case 'video':
                        video.push(data.list[i]);
                        break;
                    case 'html':
                        html.push(data.list[i]);
                        break
                }
            }
            floder.sort(function(a, b) {
                if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
                    return 1;
                }
                return -1;
            });
            text.sort(function(a, b) {
                if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
                    return 1;
                }
                return -1;
            });
            image.sort(function(a, b) {
                if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
                    return 1;
                }
                return -1;
            });
            video.sort(function(a, b) {
                if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
                    return 1;
                }
                return -1;
            });
            html.sort(function(a, b) {
                if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
                    return 1;
                }
                return -1;
            });
            data.list = arr.concat(floder, text, image, video, html);
            view(_ID);

        },
        upload: function() {
            var uploadBtn = document.querySelector('#uploadBtn');
            uploadBtn.click();
            uploadBtn.addEventListener('change', function(e) {
                var file = this.files[0];
                var fileType = file.type.split('/')[0];

                if (!(fileType == "text" ||
                        fileType == "image" ||
                        fileType == "video" ||
                        fileType == "audio")) {
                    alert('只支持图片、视频、音频和文档的上传');
                    return;
                }
                create({
                    pid: _ID,
                    type: fileType,
                    name: file.name,
                    newFile: file
                });

                uploadBtn.value = "";

            }, {
                once: true
            })
        },
        open: function() {
            if (contextmenuId.className == 'active' && contextmenuId.item.type == 'floder') {
                view(contextmenuId.item.id)
                return;
            } else if (contextmenuId.item.newFile) {
                openFile(contextmenuId.item.newFile, contextmenuId.item.type);
            }

        },
        rename: function() {

            setTimeout(function() {
                reName(contextmenuId);
            });
        },
        delete: function() {
            setTimeout(function() {
                del(contextmenuId);
            });
        }
    }
    //显示上下文菜单
    //@param {[event]} e [事件对象]
    //@param {[Array]} menuData [要生成的菜单内容]
    //@return {[void]}  []

function showContextmenu(e, menuData) {
    //	var contextmenuElement = document.querySelector('#contextmenu');
    //	contextmenuElement.style.display = "block";
    //	contextmenuElement.innerHTML = "";//清空
    createContextmenu(menuData, e.clientX, e.clientY);
}

//根据数据创建右键菜单
function createContextmenu(menuData, x, y) {
    var contextmenuElement = document.createElement('ul');
    contextmenuElement.className = 'contextmenu';
    contextmenuElement.style.display = "block"
    contextmenuElement.style.left = x + 'px';
    contextmenuElement.style.top = y + "px";

    menuData.forEach(function(item, nub) {
        var li = document.createElement('li');
        li.innerHTML = item.name;

        li.onmousedown = contextmenuCallback[item.callbackname];
        li.onmouseover = function() {
            remove(this.parentNode);

            function remove(ul) {
                var lis = ul.children;
                for (var i = 0; i < lis.length; i++) {
                    if (lis[i].ul) {
                        remove(lis[i].ul);
                        document.body.removeChild(lis[i].ul);
                        lis[i].ul = null
                    }
                }
            }
            if (item.child) {
                var left = x + this.offsetWidth;
                li.ul = createContextmenu(item.child, left, y)
            }
        }
        contextmenuElement.appendChild(li);
    });
    document.body.appendChild(contextmenuElement);
    return contextmenuElement;
}
//隐藏菜单
function hideContextmenu() {
    var contextmenuElement = document.querySelectorAll('.contextmenu');
    for (var i = 0; i < contextmenuElement.length; i++) {
        contextmenuElement[i].style.display = "none";
    }
}

//@param {[Array]} dataList [要生成的元素内容]

//创
function create(filedata) {
    filedata.extname = '';
    var existFiles = checkName(filedata);
    if (existFiles.length) {
        for (var i = 1; i <= existFiles.length; i++) {
            var v = existFiles.find(function(ele) {
                return ele.extname == i + 1;
            });
            if (v === undefined) {
                filedata.extname = i + 1;
                break;
            }
        }
    }
    filedata.id = getMaxId() + 1;

    data.list.push(filedata);

    view(_ID);
    cancelIco();
}
//渲染页面文件列表
//@param pid 要渲染的文件数据的pid

/**
 * 
 * 
 * @param {any} pid 
 */
function view(pid) {
    if (!Array.isArray(dataList)) {
        dataList = [];
    }
    //只要调用了view方法 ，那么我们就把_ID设置成我们要view的pid
    //记录_ID的值，以便其他地方使用，记录当view过后，当前所在目录的pid
    _ID = pid;
    var dataList = getChildren(_ID);
    var list = document.querySelector('#list');
    list.innerHTML = "";
    //文件列表
    dataList.forEach(function(item) {
            var newname = item.name;
            if (item.extname) {
                newname += `(${item.extname})`;
            }

            var li = document.createElement('li');
            var fileBg = document.createElement('div');
            fileBg.className = item.type
            var div = document.createElement('div');
            var p = document.createElement('p');
            var input = document.createElement('input')
            var check = document.createElement('input');
            var label = document.createElement('label')
            check.className = 'ico';
            check.type = "checkbox";
            label.className = 'label';
            label.style.display = 'none';
            label.style.zIndex = 5;
            input.type = "text";
            input.style.display = 'none';
            p.innerHTML = `${newname}`;

            label.appendChild(check)
            li.appendChild(label)
            div.appendChild(p)
            div.appendChild(input);
            li.appendChild(fileBg)
            li.appendChild(div)
            li.item = item;
            input.onmousedown = function(e) {
                e.stopPropagation();
            }
            li.oncontextmenu = function() {
                var lis = this.parentNode.children;
                var inputs = this.parentNode.querySelectorAll('.ico')
                for (var i = 0; i < lis.length; i++) {
                    lis[i].classList.remove("active");
                    inputs[i].checked = false;
                }
                cancelIco()
                li.classList.add('active');
                label.style.display = "block";
                hideContextmenu();
                check.checked = true;
                elements.checknub.innerHTML = 1;
                elements.checkWrap.style.display = 'inline-block';
                elements.checkAllText.style.display = 'none';
                if (inputs.length == 1) {
                    elements.checkAll.checked = true;
                } else {
                    elements.checkAll.checked = false;
                }

            }
            label.addEventListener('click', function(e) {
                e.stopPropagation();
                hideContextmenu();
            })

            // li.onmousedown = function (e) {
            //     e.stopPropagation(e);
            //     var lis = this.parentNode.children;
            //     for (var i = 0; i < lis.length; i++) {
            //         lis[i].classList.remove("active");
            //     }
            //     cancelIco();
            //     this.classList.add('active');
            //     // label.style.display = 'block';
            //    ;
            //     hideContextmenu();
            // }

            //移入移出文件夹
            li.onmouseenter = function() {
                this.classList.add('hover');
                label.style.display = 'block'
            }
            li.onmouseleave = function() {
                    this.classList.remove('hover');
                    if (this.className != 'active') {
                        label.style.display = 'none';
                    }

                }
                //点击进入文件夹
            li.addEventListener("click", function(e) {
                e.stopPropagation();
                hideContextmenu();

                if (item.type == "floder" && this.className == "hover") {
                    view(item.id);
                    cancelIco();

                } else if (item.newFile && this.className == "hover") {
                    openFile(item.newFile, item.type);
                }
            })

            //拖拽
            li.addEventListener('mousedown', function(e) {
                e.stopPropagation()

                var nowNode = null; //克隆出来的新节点
                var startX = e.clientX;
                var startY = e.clientY;
                console.log(startX, startY)
                var self = this;
                var cloneEls = [];
                var selectNodes = [];
                var activeNodes = elements.list.querySelectorAll('.active');
                if (self.className == 'hover') {
                    listdown(e)
                    return;
                }

                var otherFiles = elements.list.querySelectorAll('li:not(.active)');
                var otherFilesLabel = elements.list.querySelectorAll('li:not(.active) label');
                document.addEventListener('mousemove', move);
                document.addEventListener('mouseup', end);

                function move(e) {
                    // activeNodes = elements.list.querySelectorAll('.active');
                    if (!nowNode) {
                        for (var i = 0; i < activeNodes.length; i++) {
                            var node = activeNodes[i].cloneNode(true);
                            node.style.opacity = 0.5;
                            node.style.position =
                                'absolute';
                            node.style.zIndex = 0;
                            cloneEls.push(node);
                            var rect = activeNodes[i].getBoundingClientRect();
                            var l = rect.left;
                            var t = rect.top - 62
                            selectNodes.push({
                                left: l,
                                topp: t
                            })

                            elements.list.appendChild(node);
                            if (self == activeNodes[i]) {
                                nowNode = node;
                            }

                            css(cloneEls[i], 'left', selectNodes[i].left)
                            css(cloneEls[i], 'top', selectNodes[i].topp)
                            console.log(cloneEls[i].style.left, cloneEls[i].style.top)
                        }


                    }
                    var disX = e.clientX - startX;
                    var disY = e.clientY - startY;

                    for (var i = 0; i < cloneEls.length; i++) {
                        css(cloneEls[i], 'left', selectNodes[i].left + disX)
                        css(cloneEls[i], 'top', selectNodes[i].topp + disY)
                    }
                    for (var i = 0; i < otherFiles.length; i++) {
                        if (getCollide2(otherFiles[i], nowNode)) {
                            otherFiles[i].classList.add("hover");
                            otherFilesLabel[i].style.display = "block";
                        } else {
                            otherFiles[i].classList.remove("hover");
                            otherFilesLabel[i].style.display = "none";
                        }
                    }
                }

                function end() {
                    document.removeEventListener('mousemove', move);
                    document.removeEventListener('mouseup', end);
                    if (!nowNode) {
                        return;
                    }
                    for (var i = 0; i < otherFiles.length; i++) {

                        if (getCollide2(otherFiles[i], nowNode) && otherFiles[i].item.type == 'floder') {
                            // 
                            for (var j = 0; j < activeNodes.length; j++) {
                                // var children = getChildren(otherFiles[i].item.id)
                                // for (var k = 0; k < children.length; k++) {
                                //     if ((activeNodes[j].item.name + activeNodes[j].item.extname) == (children[k].name + children[k].extname)) {
                                //         elements.insteadOf.style.display = "block";
                                //         elements.retain.onclick = function () {

                                //         }

                                //     }
                                // }

                                activeNodes[j].item.pid = otherFiles[i].item.id;
                            }
                        }
                    }
                    view(_ID);
                    cancelIco();
                }
            })


            list.appendChild(li);
            //勾选
            var inputs = elements.list.querySelectorAll('.ico');
            var nub = 0;

            inputs.forEach(function(input) {
                input.onchange = function() {
                    nub = elements.checknub.innerHTML;
                    if (this.checked) {
                        this.parentNode.parentNode.classList.add('active');
                        nub++;

                    } else {
                        this.parentNode.parentNode.classList.remove('active');
                        nub--;
                    }
                    elements.checknub.innerHTML = nub;
                    if (elements.checknub.innerHTML == 0) {
                        elements.checkWrap.style.display = "none";
                        elements.checkAllText.style.display = "inline-block"
                    } else {
                        elements.checkWrap.style.display = "inline-block";
                        elements.checkAllText.style.display = "none"
                    }

                    //每个选中后，全选也选中
                    var ischeck = true;

                    for (var i = 0; i < inputs.length; i++) {
                        if (!inputs[i].checked) {
                            ischeck = false;
                        }
                    }
                    elements.checkAll.checked = ischeck;

                }
            })


        })
        //导航列表
        //由 顶层，所有父级，当前目录组成
    var pathList = getParents(_ID);
    elements.crumbs.innerHTML = '';
    //顶层
    var li = document.createElement('li');
    li.innerHTML = '<a href="javascript:;">根目录</a>'
    li.onclick = function() {
        if (_ID == 0) {
            return;
        }
        view(0);
        cancelIco();
    };
    li.addEventListener('contextmenu', function(e) {
        e.stopPropagation();
        e.preventDefault();
    })
    elements.crumbs.appendChild(li);
    //中间
    pathList.forEach(function(item) {
            var li = document.createElement('li');
            if (!item.extname) {
                li.innerHTML = `<a href = "javascript:;">${item.name}</a>`;
            } else {
                li.innerHTML = `<a href = "javascript:;">${item.name}(${item.extname})</a>`;
            }

            li.onclick = function() {
                view(item.id)
                cancelIco();
            };
            li.addEventListener('contextmenu', function(e) {
                e.stopPropagation();
                e.preventDefault();
            })
            elements.crumbs.appendChild(li);
        })
        //显示当前
    var info = getInfo(_ID);
    if (info) {
        var li = document.createElement('li');
        if (!info.extname) {
            li.innerHTML = '<span>' + info.name + '</span>'
        } else {
            li.innerHTML = '<span>' + info.name + '(' + info.extname + ')</span>'
        }

        elements.crumbs.appendChild(li);
    }

}
//检车重名 
function checkName(filedata) {
    var files = [];
    for (var i = 0; i < data.list.length; i++) {
        if (filedata.type == data.list[i].type &&
            filedata.name == data.list[i].name &&
            filedata.pid == data.list[i].pid) {
            files.push(data.list[i])
        }
    }
    return files;

}

//创建快捷方式
document.addEventListener('keyup', function(e) {
    if (e.keyCode == 78 && e.shiftKey) {
        contextmenuCallback.createFloder()
        e.preventDefault();
    }
});

//打开文档，视频等等
var fileDetail = document.querySelector('#fileDetail');
var fileDetailCols = document.querySelector('.fileDetailCols')
var fileDetailsC = fileDetail.children[0];
var createWrap = document.querySelector('#create');
fileDetailCols.addEventListener('click', function(e) {
    fileDetailsC.innerHTML = "";
    fileDetail.style.display = "none";
    createWrap.style.display = "block";
});

function openFile(file, fileType) {
    var reader = new FileReader();
    reader.onload = function(e) {
        fileDetail.style.display = "block";
        createWrap.style.display = "none";
        var result = e.target.result;
        if (fileType == "text") {
            var p = document.createElement('p');
            p.innerHTML = result;
            fileDetailsC.appendChild(p)
        } else if (fileType == "image") {
            var img = new Image();
            img.src = result;
            fileDetailsC.appendChild(img)
        } else if (fileType == 'video') {
            var video = document.createElement('video');
            video.setAttribute('loop', '');
            video.setAttribute('controls', '');
            video.src = result;
            fileDetailsC.appendChild(video)
        }
    }
    if (fileType == "text") {
        reader.readAsText(file)
    } else {
        reader.readAsDataURL(file)
    }
}
//重命名
function reName(newName) {
    var inputs = elements.list.querySelectorAll('.active');
    if (inputs.length > 1) {
        return;
    }
    if (newName) {
        // newName.classList.add('active')
        var p = newName.children[2].children[0];
        var input = newName.children[2].children[1];
        p.style.display = "none";
        input.parentNode.parentNode.style.background = "#f1f5fa"
        input.style.display = 'block';
        input.value = p.innerHTML;
        input.select();
        var ext = data.list;
        ext = ext.filter(function(ele) {
            if (ele.pid == _ID && ele.type == newName.item.type) {
                return true
            } else {
                return false
            }
        })
        var names = [];
        var name = newName.item.name;
        for (var i = 0; i < ext.length; i++) {
            if (ext[i].extname) {
                names.push(ext[i].name + '(' + ext[i].extname + ')')
            } else {
                names.push(ext[i].name)
            }
        }
        if (newName.item.extname) {
            name += `(${newName.item.extname})`;
        };
        input.onblur = function() {
            if (hasname()) {
                alert('重名了')
                clearInterval(timer)
                timer = setTimeout(function() {
                    // elements.reNameInfo.style.display = "block";
                    input.focus();
                }, 300);
                return;
            } else if (input.value == '') {
                view(_ID);
            } else if (newName.item.extname) {

                var a, b, c, d;
                a = input.value.lastIndexOf('('); //5
                b = input.value.lastIndexOf(')'); //7
                c = input.value.substring(a + 1, b);
                d = input.value.slice(0, a);
                if (a == -1 || b == -1 || c.length == 0) {
                    newName.item.name = input.value;
                    newName.item.extname = null;
                } else {
                    newName.item.name = d;
                    newName.item.extname = c;
                }

                input.style.display = 'none';
                p.style.display = 'block';
                view(_ID);

            } else {
                newName.item.name = input.value;
                view(_ID)
            }
        }
    }
    //检测重命名
    function hasname() {
        for (var i = 0; i < names.length; i++) {
            if (p.innerHTML != names[i] && input.value == names[i]) {
                return true;
            }
        }
        return false;
    }
}


//全局取消选中
function cancelActive() {
    var lis = elements.list.querySelectorAll('li');
    for (var i = 0; i < lis.length; i++) {
        lis[i].classList.remove("active");
        lis[i].classList.remove("hover");
    }
}

//删除内容
function del(item) {
    if (item) {
        item.item.pid = -1;
        view(_ID);
        cancelIco();
    }
}

//取消ico
function cancelIco() {
    var labels = elements.list.querySelectorAll('.label');
    var inputs = elements.list.querySelectorAll('.ico');
    for (var i = 0; i < labels.length; i++) {
        labels[i].style.display = "none";
        inputs[i].checked = false;
    }
    elements.checkAll.checked = false;
    elements.checknub.innerHTML = 0;
    elements.checkAllText.style.display = "inline-block";
    elements.checkWrap.style.display = "none";
}
//碰撞检测
function getCollide(el, el2) {
    var rect = el.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();
    if (rect.right < rect2.left ||
        rect.left > rect2.right ||
        rect.bottom < rect2.top ||
        rect.top > rect2.bottom) {
        return false;
    }
    return true;
}

function getCollide2(el, el2) {
    var rect = el.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();
    if (rect.right - rect.width / 2 < rect2.left ||
        rect.left + rect.width / 2 > rect2.right ||
        rect.bottom - rect.height / 2 < rect2.top ||
        rect.top + rect.height / 2 > rect2.bottom) {
        return false;
    }
    return true;
}
//框选
function listdown(e) {
    hideContextmenu();
    if (e.button == 2) {
        return;
    };
    var labels = elements.list.querySelectorAll('.label')
    var checks = elements.list.querySelectorAll('.ico')
    var startX = e.clientX;
    var startY = e.clientY;
    var div = document.createElement('div');
    div.className = 'select';
    div.style.left = startX + 'px';
    div.style.top = startY + 'px';
    e.stopPropagation();
    e.preventDefault();
    document.onmousemove = function(e) {


        document.body.appendChild(div);
        var nowX = e.clientX;
        var nowY = e.clientY;
        div.style.width = Math.abs(nowX - startX) + "px";
        div.style.height = Math.abs(nowY - startY) + "px";
        if (nowX < startX) {
            div.style.left = nowX + "px";
        } else {
            div.style.left = startX + "px";
        }
        if (nowY < startY) {
            div.style.top = nowY + "px";
        } else {
            div.style.top = startY + "px";
        }
        for (var i = 0; i < lis.length; i++) {
            if (getCollide(div, lis[i])) {

                lis[i].classList.add("active");
                labels[i].style.display = 'block';
                checks[i].checked = true;

            } else {
                lis[i].classList.remove("active");
                labels[i].style.display = 'none';
                checks[i].checked = false;
                elements.checkWrap.style.display = "none";
                elements.checkAllText.style.display = 'inline-block';

            };
        };
        var checkActive = elements.list.querySelectorAll('.active');
        for (var i = 0; i < checkActive.length; i++) {
            elements.checkWrap.style.display = "inline-block";
            elements.checkAllText.style.display = 'none';

        }
        elements.checknub.innerHTML = checkActive.length;
        if (elements.checknub.innerHTML == lis.length) {
            elements.checkAll.checked = true;
        } else {
            elements.checkAll.checked = false;
        }

    };
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        div.parentNode == document.body && document.body.removeChild(div);
    };
};

// function viewTree() {
//     var allChildren = getTree(0);
//     console.log(allChildren)
//     elements.treeContent.innerHTML = '';
//     allChildren.forEach(function(item) {
//         // console.log(item)
//         var name = item.name;
//         var li = document.createElement('li');
//         for (var i = 0; i < item.level; i++) {
//             name = '&nbsp;&nbsp;&nbsp;&nbsp;' + name;

//         }
//         li.innerHTML = name;
//         elements.treeContent.appendChild(li);
//     })
// }