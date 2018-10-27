//使用策略者模式对应数据
import Url from 'url';
//参数：当前地址和上一次的地址
const pageHeaderInfo = (url,prevUrl)=>{
    let adress = Url.parse(url).pathname;
    //有参数时的所有参数
    let _search = Url.parse(prevUrl).search;
    //当有参数时的所有参数（?keyword=a&pageNo=1）
    let _infos = {
        '/home': {
            title: '首页',
            list:[]
        },
        '/position-list': {
            title: '职位管理',
            description: '职位列表',
            list:[
                {text:'职位列表'}
            ]
        },
        '/position-save': {
            title: '职位管理',
            description: '添加职位',
            list:[
                {text:'职位列表',path: '#/position-list'+_search},
                {text:'添加职位'}
            ]
        },
        '/position-update': {
            title: '职位管理',
            description: '职位更新',
            list: [
                { text: '职位列表',path:'#/position-list'+_search},
                { text: '职位更新'}
            ]
        }
    }
    return _infos[adress]||{};
}

export default{
    pageHeaderInfo
}