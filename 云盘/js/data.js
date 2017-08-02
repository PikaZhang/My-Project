//数据
//@type {Object}

var data = {
    menu: {
        'main': [{
                name: '新建',
                child: [{
                        name: '文件夹',
                        callbackname: 'createFloder'
                    },
                    {
                        name: '文件',
                        callbackname: 'createTxt'
                    }
                ],
            },
            {
                name: '上传文件',
                callbackname: 'upload'
            },
            {
                name: '刷新',
                callbackname: 'sortSmall'
            },
            {
                name: '排序',
                child: [{
                        name: '修改时间',
                        callbackname: 'sortBig'
                    },
                    {
                        name: '文件名',
                        callbackname: 'sortName'
                    },
                    {
                        name: '文件类型',
                        callbackname: 'sortType'
                    }
                ]
            }
        ],
        'file': [{
                name: '打开',
                callbackname: 'open'
            },
            {
                name: "移动到",
                callbackname: 'remove'
            },
            {
                name: '重命名',
                callbackname: 'rename'
            },
            {
                name: '删除',
                callbackname: 'delete'
            }

        ]
    },
    list: [{
            id: 1,
            pid: 0,
            type: 'floder',
            name: '技术',
            extname: ''
        },
        {
            id: 2,
            pid: 0,
            type: 'floder',
            name: '电影',
            extname: ''
        },
        {
            id: 3,
            pid: 0,
            type: 'floder',
            name: '音乐',
            extname: ''
        },
        {
            id: 4,
            pid: 0,
            type: 'floder',
            name: '图片',
            extname: ''
        },
        {
            id: 5,
            pid: 0,
            type: 'video',
            name: '视频',
            extname: ''
        },
        {
            id: 6,
            pid: 0,
            type: 'text',
            name: 'README',
            extname: ''
        },
        {
            id: 7,
            pid: 1,
            type: 'floder',
            name: '前端',
            extname: ''
        },
        {
            id: 8,
            pid: 1,
            type: 'floder',
            name: '后端',
            extname: ''
        },
        {
            id: 9,
            pid: 7,
            type: 'floder',
            name: 'javascript',
            extname: ''
        },
        {
            id: 10,
            pid: 0,
            type: 'image',
            name: 'img',
            extname: ''
        }
    ]
};