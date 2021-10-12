

// 菜单 侧边栏
import util from '@/libs/util.js'
// const loginData_wharf = JSON.parse(util.cookies.get('loginData_wharf'));
// console.log("返回的是-----", util.cookies.get('loginData_wharf'));

function m() {
    var loginData_wharf = {};
    try {
        loginData_wharf = JSON.parse(util.cookies.get('loginData_wharf'))
    } catch (d) {}
    var menuJson = [];
    //************************************************修改******************************
    if (loginData_wharf.media.mediaList == 1 || loginData_wharf.media.adPositionList == 1 || loginData_wharf.media.trafficplatform == 1 ) {
        if (loginData_wharf.media.trafficplatform == 1) {
            menuJson = menuJson.concat([{
                title: '资源管理',
                icon: 'folder-o',
                children: [
                    { path: '/mediaManage/trafficplatform', title: '平台管理' },
                    { path: '/mediaManage/trafficplatform/editTrafficplatform', title: '新增流量平台', hide: true },
                    { path: '/mediaManage/trafficplatform/editTrafficplatform', title: '编辑流量平台', hide: true },
                ]
            }])
        }
        if (loginData_wharf.media.mediaList == 1) {
            menuJson = menuJson.concat([{
                title: '资源管理',
                icon: 'folder-o',
                children: [
                    { path: '/mediaManage/mediaList', title: '应用管理' },
                    { path: '/mediaManage/mediaList/editMedias', title: '新增媒体', hide: true },
                    { path: '/mediaManage/mediaList/editMedias', title: '编辑媒体', hide: true },
                    { path: '/mediaManage/mediaList/shareMedia', title: '媒体结算', hide: true },
                ]
            }])
        }
        if (loginData_wharf.media.adPositionList == 1) {
            menuJson = menuJson.concat([{
                title: '资源管理',
                icon: 'folder-o',
                children: [
                    { path: '/mediaManage/adsenseList', title: '广告位管理' },
                    { path: '/mediaManage/adsenseList/editAdsenseList', title: '编辑广告位', hide: true },
                    { path: '/mediaManage/adsenseList/shareAdsense', title: '广告位结算', hide: true }
                ]
            }])
        }
    }
    if(loginData_wharf.dataEntry.dataEntryChildren == 1){
        
        if(loginData_wharf.dataEntry.dataEntryChildren == 1) {
            menuJson = menuJson.concat([{
                title: '录入支出',
                icon: 'folder-o',
                children: [
                    { path: '/dataSearch/dataEntryChildren', title: '录入支出' },
                ]
            }])
        }
    }

    if (loginData_wharf.dataForm.entryData == 1||loginData_wharf.dataForm.overallData == 1) {
        if(loginData_wharf.dataForm.overallData == 1) {
            menuJson = menuJson.concat([{
                title: '数据报表',
                icon: 'folder-o',
                children: [
                    { path: '/dataFormReport/overallData', title: '整体数据' },
                    { path: '/dataFormReport/overallData/releaseData', title: '整体数据发布',hide: true },
                ]
            }])
        }
        if(loginData_wharf.dataForm.entryData == 1) {
            menuJson = menuJson.concat([{
                title: '数据报表',
                icon: 'folder-o',
                children: [
                    { path: '/dataFormReport/entryData', title: '发布数据' },
                ]
            }])
        }
    }
    if (loginData_wharf.account.accountMeg == 1 || loginData_wharf.account.userMeg == 1) {
        menuJson = menuJson.concat([{
            title: '账号管理',
            icon: 'folder-o',
            children: [
            ]
        }])
        
        if (loginData_wharf.account.accountMeg == 1) {
            menuJson = menuJson.concat([{
                title: '账号管理',
                icon: 'folder-o',
                children: [
                    { path: '/accountManage/accountMeg', title: '账户管理' },
                    { path: '/accountManage/accountMeg/editAccounts', title: '新增账户', hide: true },
                    { path: '/accountManage/accountMeg/editAccounts', title: '编辑账户', hide: true },
                ]
            }])
        }
        if (loginData_wharf.account.userMeg == 1) {
            menuJson = menuJson.concat([{
                title: '账号管理',
                icon: 'folder-o',
                children: [
                    { path: '/accountManage/roleMeg', title: '角色管理' },
                    { path: '/accountManage/roleMeg/editRoles', title: '新建角色', hide: true },
                    { path: '/accountManage/roleMeg/editRoles', title: '编辑角色', hide: true },
                ]
            }])
        }

    }
    

    var map = {};
    var arr = [];
    for (var o of menuJson) {
        if (!map.hasOwnProperty(o.title)) {
            map[o.title] = o;
            const val = map[o.title].children;
            map[o.title].children = [val];
        } else {
            map[o.title].children.push(o.children);
        }
    }

    function transform(obj) {
        for (var item in obj) {
            arr.push(obj[item]);
        }
    }
    transform(map);
    for (var a = 0; a < arr.length; a++) {
        arr[a].children = arr[a].children.reduce(function(a, b) { return a.concat(b) });
    }



    return arr




    // //************************************************修改******************************



}
export default m