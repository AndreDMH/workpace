(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dc9d06fa"],{"251c":function(e,t,i){},"2fdb":function(e,t,i){"use strict";var n=i("5ca1"),s=i("d2c8"),a="includes";n(n.P+n.F*i("5147")(a),"String",{includes:function(e){return!!~s(this,e,a).indexOf(e,arguments.length>1?arguments[1]:void 0)}})},5147:function(e,t,i){var n=i("2b4c")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(i){try{return t[n]=!1,!"/./"[e](t)}catch(s){}}return!0}},6762:function(e,t,i){"use strict";var n=i("5ca1"),s=i("c366")(!0);n(n.P,"Array",{includes:function(e){return s(this,e,arguments.length>1?arguments[1]:void 0)}}),i("9c6c")("includes")},c4c3:function(e,t,i){"use strict";i("251c")},d2c8:function(e,t,i){var n=i("aae3"),s=i("be13");e.exports=function(e,t,i){if(n(t))throw TypeError("String#"+i+" doesn't accept regex!");return String(s(e))}},ebc1:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("d2-container",[i("template",{slot:"header"},[i("div",{staticClass:"flex ryt-right-top"},[i("div",{staticClass:"line_header"}),e._v(" "+e._s(e.title)+" ")])]),i("div",{staticClass:"roleForm"},[i("el-form",{ref:"projectInfoRef",staticStyle:{"padding-left":"50px"},attrs:{model:e.usersForm,rules:e.rytproject}},[i("el-form-item",{attrs:{label:"角色名称 :",prop:"name"}},[i("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入角色名称"},model:{value:e.usersForm.name,callback:function(t){e.$set(e.usersForm,"name",t)},expression:"usersForm.name"}})],1),i("div",{staticClass:"addRoles_title",staticStyle:{"margin-left":"-6px"}},[i("div",{staticClass:"formTitle"},[e._v("配置模板")])]),i("el-table",{staticClass:"tableClass",attrs:{data:e.tableData,"max-height":"700",size:"medium","header-cell-style":{background:"#f5f5f5"}}},[i("el-table-column",{staticClass:"table-header",attrs:{label:"权限类型",align:"center",prop:"id",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-form-item",{staticStyle:{"margin-bottom":"0px"}},[i("el-checkbox",{attrs:{"true-label":1,"false-label":0},on:{change:function(i){return e.handleCheckChange(i,t.row.id)}},model:{value:t.row.selectId,callback:function(i){e.$set(t.row,"selectId",i)},expression:"scope.row.selectId"}},[e._v(e._s(t.row.name))])],1)]}}])}),i("el-table-column",{attrs:{label:"权限名称",align:"left",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-form-item",{staticClass:"table-name"},[i("el-checkbox-group",{model:{value:t.row.second,callback:function(i){e.$set(t.row,"second",i)},expression:"scope.row.second"}},e._l(t.row.secondAll,(function(n){return i("el-checkbox",{directives:[{name:"show",rawName:"v-show",value:n.id,expression:"item.id"}],key:n.id,attrs:{label:n.id,disabled:!t.row.selectId},on:{change:function(i){return e.handChange(i,t.row.secondAll,t.row.second,n.id)}}},[e._v(" "+e._s(n.name)+" ")])})),1)],1)]}}])}),i("el-table-column",{attrs:{label:"操作",width:"250",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(t.row.secondAll,(function(n){return i("el-form-item",{key:n.id,staticClass:"useClass"},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:"6"==t.row.id,expression:"scope.row.id == '6'"}],attrs:{type:"text",size:"medium",disabled:!n.checked},on:{click:function(i){return e.initAllColumn(t.row,n.id)}}},[e._v("设置字段 ")]),i("div",{directives:[{name:"show",rawName:"v-show",value:1==n.id,expression:"item.id == 1"}]},[i("el-checkbox-group",{model:{value:n.useArray,callback:function(t){e.$set(n,"useArray",t)},expression:"item.useArray"}},e._l(n.useShowArray,(function(t,s){return i("el-checkbox",{key:s,staticStyle:{"margin-left":"-5px","margin-right":"15px"},attrs:{disabled:!n.checked,label:t.is_created},on:{change:function(t){return e.ClickChangeTwo()}}},[e._v(" "+e._s(t.name)+" ")])})),1)],1)],1)}))}}])}),i("el-table-column",{attrs:{label:"权限描述",width:"250",align:"left"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-form-item",{staticClass:"table-border"},e._l(t.row.secondAll,(function(t,n){return i("div",{key:n,staticStyle:{border:"none","line-height":"20px"}},[e._v(" "+e._s(t.text)+" ")])})),0)]}}])})],1),i("el-form-item",{staticStyle:{"padding-left":"150px","margin-top":"20px"}},[i("el-button",{attrs:{type:"primary"},on:{click:e.handleAddForm}},[e._v("提交")])],1)],1),e.dialogVisible?i("div",[i("selectDialog",{attrs:{dialogVisible:e.dialogVisible,dataLists:e.dialogDataList,selectColumnArr:e.selectColumnArr},on:{clickPlay:e.clickPlay,handleClose:e.handleClose,clearAll:e.clearAll}})],1):e._e()],1)],2)},s=[],a=(i("6762"),i("2fdb"),i("7f7f"),i("96cf"),i("3b8d")),l=(i("ac6a"),i("56f1")),c=["基本信息","产品信息"],r={name:"editRoles",components:{selectDialog:l["a"]},data:function(){this.$createElement;return{checkAll:!1,checkedCities:["基本信息","产品信息"],cities:c,isIndeterminate:!0,all_info:0,base_info:1,product_info:1,usersForm:{name:"",id:""},title:"",limit_level_options:[],tableData:[{selectId:0,id:18,name:"资源管理",secondAll:[{id:46,name:"平台管理",text:"可以创建/编辑SSP平台",list:[],checked:!1},{id:47,name:"应用管理",text:"可以创建/编辑应用",list:[],checked:!1},{id:48,name:"广告位管理",text:"可以创建/编辑广告位",list:[],checked:!1}],second:[]},{selectId:0,id:19,name:"录入支出",secondAll:[{id:49,name:"录入支出",text:"数据录入",checked:!1}],second:[]},{selectId:0,id:20,name:"数据报表",secondAll:[{id:53,name:"整体数据",text:"可以查看整体数据",list:[],checked:!1},{id:50,name:"发布数据",text:"可以查看发布数据",list:[],checked:!1}],second:[]},{selectId:0,id:21,name:"账户管理",secondAll:[{id:51,name:"账户管理",text:"可以新建、编辑、删除账户",checked:!1},{id:52,name:"角色管理",text:"可以新建、编辑、删除角色",checked:!1}],second:[]}],rytproject:{name:[{required:!0,message:"请输入角色名称",trigger:"blur"},{min:1,max:30,message:"字符1-30之间",trigger:"blur"}]},tableRules:{second:[{required:!0,message:"请选择权限名称",trigger:"blur"}]},newData:[],showData:[],hiddenData:[],dataList:[],renderFunc:function(e,t){return e("span",[t.key," - ",t.label])},column_id:"",dialogVisible:!1,selectColumnArr:[],dialogDataList:[]}},methods:{clearAll:function(){this.selectColumnArr=[],this.refreshCheckedData()},cinfigShow:function(e){this.selectColumnArr=JSON.parse(JSON.stringify(this.showData)),this.dialogDataList=JSON.parse(JSON.stringify(this.AllData)),this.$forceUpdate(),this.refreshCheckedData(),this.dialogVisible=!0},handleClose:function(){this.dialogVisible=!1},clickPlay:function(e,t,i,n){if(this.selectColumnArr=JSON.parse(JSON.stringify(n)),0!=e)for(var s=0;s<this.tableData.length;s++)for(var a=0;a<this.tableData[s].secondAll.length;a++)this.tableData[s].secondAll[a].id==this.column_id&&(this.tableData[s].secondAll[a].list=this.selectColumnArr);else console.log("取消");this.dialogVisible=!1},refreshCheckedData:function(){var e=this;0!=this.selectColumnArr.length&&(this.dialogDataList.forEach((function(t){t.child.forEach((function(t){var i=0;t.allChecked=!1,t.child.forEach((function(t){t.checked=!1,e.selectColumnArr.forEach((function(e){t.id==e.id&&(t.checked=!0,i++)}))})),i==t.child.length&&(t.allChecked=!0)}))})),console.log(this.dialogDataList))},handleCheckChange:function(e,t){this.tableData.forEach((function(i,n){i.id==t&&"1"!=e&&(i.second=[])}))},handChange:function(e,t,i,n){t.forEach((function(t,i){t.id==n&&(t.checked=e)}))},getRoleInfo:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,i,n,s,a,l=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.$route.query.id,i=this.baseUrl.ip1+"/role/update/".concat(t),e.next=4,this.$http.get(i);case 4:n=e.sent,s=n.data,this.usersForm.name=s.name,this.usersForm.id=s.id,a=[],a=s.permissions,a.forEach((function(e,t){l.tableData.forEach((function(t,i){e.id==t.id&&(t.selectId=1,e.second.map((function(e){t.second.push(e.id)})),t.secondAll.forEach((function(t,i){e.second.forEach((function(e,i){t.id==e.id&&(t.checked=!0,t.list=e.list,t.is_created=e.is_created,t.is_edit=e.is_edit,t.is_deleted=e.is_deleted,t.edit_column=e.edit_column,t.is_commission=e.is_commission)}))})))}))})),this.tableData.forEach((function(e,t){"1"==e.id&&"1"==e.secondAll[0].id&&1==e.secondAll[0].is_commission&&(e.secondAll[0].useArray.push(1),e.secondAll[0].useShowArray[0].check=!0)})),console.log("打印返回数据",this.tableData);case 13:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),ClickChangeTwo:function(){this.tableData.forEach((function(e,t){"1"==e.id&&"1"==e.secondAll[0].id&&(0==e.secondAll[0].useShowArray[0].check?(e.secondAll[0].is_commission=1,e.secondAll[0].useShowArray[0].check=!0):(e.secondAll[0].is_commission=0,e.secondAll[0].useShowArray[0].check=!1))})),console.log("打印数据",this.tableData)},ClickChange:function(e){this.tableData.forEach((function(t,i){"4"==t.id&&"2"==t.secondAll[1].id&&(t.secondAll[1].useShowArray[e].check=!t.secondAll[1].useShowArray[e].check,"0"==e?t.secondAll[1].useShowArray[e].check?t.secondAll[1].is_created="1":t.secondAll[1].is_created="0":"1"==e?t.secondAll[1].useShowArray[e].check?t.secondAll[1].is_edit="1":t.secondAll[1].is_edit="0":"2"==e&&(t.secondAll[1].useShowArray[e].check?t.secondAll[1].is_deleted="1":t.secondAll[1].is_deleted="0"))}))},handleCheckAllChange:function(e){this.checkedCities=e?c:[],this.isIndeterminate=!1},handleCheckedCitiesChange:function(e){var t=e.length;this.checkAll=t===this.cities.length,this.isIndeterminate=t>0&&t<this.cities.length},handleAddForm:function(){var e=this;if(this.usersForm.name){this.newData=[],this.tableData.forEach((function(t,i){if("1"==t.selectId){for(var n=0;n<t.secondAll.length;n++)for(var s=0;s<t.second.length;s++)t.secondAll[n].id==t.second[s]&&(t.second[s]=t.secondAll[n],delete t.secondAll[n].text);e.newData.push(t)}}));for(var t=0;t<this.newData.length;t++)this.newData[t].second&&(delete this.newData[t].selectId,delete this.newData[t].secondAll,delete this.newData[t].checked);this.$nextTick((function(){e.$refs.projectInfoRef.validate((function(t){t&&(e.usersForm.id?e.saveSubmit():e.handleSubmit())}))}))}else this.$message.success("请输入角色名称")},saveSubmit:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,i,n,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.$route.query.id,i=this.baseUrl.ip1+"/role/update/".concat(t),n={name:this.usersForm.name,permissions:this.newData},e.next=5,this.$http.post(i,n);case 5:s=e.sent,s.data,this.$router.go(-1);case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleSubmit:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.baseUrl.ip1+"/role/store",i={name:this.usersForm.name,permissions:this.newData},e.next=4,this.$http.post(t,i);case 4:n=e.sent,n.data,this.$router.go(-1);case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),dragstart:function(e){this.moveDom=e.currentTarget,this.startY=e.clientY},initAllColumn:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t,i){var n,s,a,l,c,r,o,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.column_id=i,n="",n=this.$route.query.id?this.baseUrl.ip1+"/directory/columnList?directory_id=".concat(this.column_id,"&role_id=").concat(this.$route.query.id):this.baseUrl.ip1+"/directory/columnList?directory_id=".concat(this.column_id),e.next=5,this.$http.get(n);case 5:for(s=e.sent,a=s.data,a,this.AllData=a.all_column,this.hiddenData=a.hide_column,this.showData=a.show_column,l=[],this.AllData.forEach((function(e){l.push({key:e.field,label:e.name})})),c=0;c<this.tableData.length;c++)for(r=0;r<this.tableData[c].secondAll.length;r++)o=this.tableData[c].secondAll[r],this.tableData[c].secondAll[r].id==i&&(this.hiddenData=[],d=this.AllData.map((function(e,t){return e.field})).filter((function(e){return o.list.includes(e)?"":e})),this.hiddenData=this.AllData.filter((function(e){return d.includes(e.field)})));this.cinfigShow();case 15:case"end":return e.stop()}}),e,this)})));function t(t,i){return e.apply(this,arguments)}return t}()},created:function(){this.$route.query.id?this.title="编辑角色":this.title="新增角色",this.$route.query.id&&this.getRoleInfo()}},o=r,d=(i("c4c3"),i("2877")),h=function(e){e.options.__source="src/views/pages/accountManage/roleMeg/editRoles/index.vue"},u=h,f=Object(d["a"])(o,n,s,!1,null,"361c5b06",null);"function"===typeof u&&u(f);t["default"]=f.exports}}]);
//# sourceMappingURL=chunk-dc9d06fa.1c0c880a.js.map