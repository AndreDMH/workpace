import { Message, MessageBox } from "element-ui";
import util from "@/libs/util.js";
import router from "@/router";
import { AccountLogin } from "@api/sys.login";

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload mobile {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login({ dispatch }, { mobile = "", password = "", sms_code = "" } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        AccountLogin({
          mobile,
          password,
          sms_code,
        })
          .then(async (res) => {
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            // 如有必要 token 需要定时更新，默认保存一天
            // //测试
            // return
            // //测试
            // console.log("登录返回的数据", res);
            //************************************************修改***********************************************
            var loginData_wharf = {
              //流量管理
              media: {
                //流量平台列表
                trafficplatform:"0",
                //媒体列表
                mediaList: "0",
                //广告位列表
                adPositionList: "0",
              },
              //录数
              dataEntry:{
                //数据录入
                dataEntryChildren:"0",
              }, 
              //数据报表
              dataForm: {
                //发布数据报表
                entryData: "0",
                //整体数据
                overallData:"0",
              }, 
              //账户管理
              account: {
                //账户管理
                accountMeg: "0",
                //角色管理
                userMeg: "0",
              },
            };

            // 使用权限管理
            // 广告计划 (新建、编辑、删除功能)
            // 媒体管理（媒体列表-“结算”控制）
            var adPowerData_wharf = {
              is_created: "0",
              is_deleted: "0",
              is_edit: "0",
              edit_column: {
                product_info: "0",
                base_info: "0",
              },
              //结算
              is_commission: "0",
            };

            var loginBackData = res.data.user.permissions;

            for (let i = 0; i < loginBackData.length; i++) {


              if (loginBackData[i].id == 18) {
                var basicData = loginBackData[i].directory;
                for (let j = 0; j < basicData.length; j++) {
                  if (basicData[j].id == 46) {
                    loginData_wharf.media.trafficplatform = "1";
                  } else if (basicData[j].id == 47) {
                    loginData_wharf.media.mediaList = "1";
                  } else if (basicData[j].id == 48) {
                    loginData_wharf.media.adPositionList = "1";
                  }
                }
              } else if (loginBackData[i].id == 19) {
                var basicData = loginBackData[i].directory;
                for (let j = 0; j < basicData.length; j++) {
                  if (basicData[j].id == 49) {
                    loginData_wharf.dataEntry.dataEntryChildren = "1";
                  }
                }
              } else if (loginBackData[i].id == 20) {
                var basicData = loginBackData[i].directory;
                for (let j = 0; j < basicData.length; j++) {
                  if (basicData[j].id == 50) {
                    loginData_wharf.dataForm.entryData = "1";
                  } else if(basicData[j].id == 53){
                    loginData_wharf.dataForm.overallData = "1";
                  }
                }
              } else if(loginBackData[i].id == 21){
                var basicData = loginBackData[i].directory;
                for(let j = 0;j<basicData.length;j++){
                  if(basicData[j].id == 51){
                    loginData_wharf.account.accountMeg = "1";
                  }else if(basicData[j].id == 52){
                    loginData_wharf.account.userMeg = "1";
                  }
                }
              }
            }
            console.log("数据展示", loginData_wharf);
            console.log("权限展示", adPowerData_wharf);
            console.log("所有用户", res.data.user);

            util.cookies.set("uuid_wharf", res.data.user.id);
            util.cookies.set("token_wharf", res.data.token);
            util.cookies.set("userAll_name_wharf", res.data.user.name);
            util.cookies.set("userAll_mobile_wharf", res.data.user.mobile);
            //用户展示权限存储
            util.cookies.set("loginData_wharf", loginData_wharf);
            //广告计划权限存储
            util.cookies.set("adPowerData_wharf", adPowerData_wharf);
            //************************************************修改完了************************************************

            // 设置 vuex 用户信息
            await dispatch(
              "d2admin/user/set",
              {
                name: res.data.user.name,
                //************************************************修改*********************************************
                userloginsData: util.cookies.get("loginData_wharf"),
                //************************************************修改完了*********************************************
              },
              { root: true }
            );
            // 用户登录后从持久化数据加载一系列的设置
            await dispatch("load");
            // 结束
            resolve();
          })
          .catch((err) => {
            console.log("err: ", err);
            reject(err);
          });
      });
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      async function logout() {
        // 删除cookie
        util.cookies.remove("token_wharf");
        util.cookies.remove("uuid_wharf");
        util.cookies.remove("userAll_name_wharf");
        util.cookies.remove("userAll_mobile_wharf");
        util.cookies.remove("loginData_wharf");
        util.cookies.remove("adPowerData_wharf");

        window.name = "";
        // 清空 vuex 用户信息
        await dispatch("d2admin/user/set", {}, { root: true });
        // 跳转路由
        router.push({
          name: "login",
        });
      }
      // 判断是否需要确认
      if (confirm) {
        commit("d2admin/gray/set", true, { root: true });
        MessageBox.confirm("确定要注销当前用户吗", "注销用户", {
          type: "warning",
        })
          .then(() => {
            commit("d2admin/gray/set", false, { root: true });
            logout();
          })
          .catch(() => {
            commit("d2admin/gray/set", false, { root: true });
            Message({
              message: "取消注销操作",
            });
          });
      } else {
        logout();
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    load({ dispatch }) {
      return new Promise(async (resolve) => {
        // DB -> store 加载用户名
        await dispatch("d2admin/user/load", null, { root: true });
        // DB -> store 加载主题
        await dispatch("d2admin/theme/load", null, { root: true });
        // DB -> store 加载页面过渡效果设置
        await dispatch("d2admin/transition/load", null, { root: true });
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch("d2admin/page/openedLoad", null, { root: true });
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch("d2admin/menu/asideCollapseLoad", null, { root: true });
        // DB -> store 持久化数据加载全局尺寸
        await dispatch("d2admin/size/load", null, { root: true });
        // DB -> store 持久化数据加载颜色设置
        await dispatch("d2admin/color/load", null, { root: true });
        // end
        resolve();
      });
    },
  },
};
