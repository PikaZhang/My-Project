//获取指定id的数据信息
function getInfo(id) {
    return data.list.filter(function(item) {
        return item.id == id
    })[0];
}

//根据指定的id，返回旗下的所有一级子数据
function getChildren(id) {
    return data.list.filter(function(item) {
        return item.pid == id
    });
}
//查找所有子集并返回结构树
function getTree(id, level) {
    var level = level || 0;
    //得到一级子集
    var children = getChildren(id);
    var data = [];
    children.forEach(function(item) {
        item.level = level;
        data.push(item);
        data = data.concat(getTree(item.id, level + 1))
    })
    return data;
}
//根据现有的 获取到父级的信息
function getParent(id) {
    var info = getInfo(id);
    if (info) {
        return getInfo(info.pid)
    }
}

//获取指定id的所有父级（不包括自己)
function getParents(id) {
    var parents = [];
    var parentInfo = getParent(id);
    if (parentInfo) {
        parents.push(parentInfo);
        var more = getParents(parentInfo.id);
        parents = more.concat(parents)
    }
    return parents;
}

//获取数据中最大的id

function getMaxId() {
    var maxId = 0;
    data.list.forEach(function(item) {
        if (item.id > maxId) {
            maxId = item.id;
        }
    })
    return maxId;
}