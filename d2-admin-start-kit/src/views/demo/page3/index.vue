<template>
  <d2-container>
    <template slot="header">用户查询</template>
    <template slot="footer">用户查询</template>
      <div>
        <h3>信息提交</h3>
        <span>order_no：</span>
        <span>
          <input type="text" placeholder="请输入order_no" v-model="newInfo.order_no">
        </span>
        <span>partner_code：</span>
        <span>
          <input type="text" placeholder="请输入partner_code" v-model="newInfo.partner_code">
        </span>
        <span>user_id：</span>
        <span>
          <input type="text" placeholder="请输入user_id" v-model="newInfo.user_id">
        </span>
        <span>distinct_id：</span>
        <span>
          <input type="text" placeholder="请输入distinct_id" v-model="newInfo.distinct_id">
        </span>
        <span>
          <input type="submit" value="查询信息" @click="searchInfo()"/>
        </span>
      </div>

      <!-- 查询结果 -->
      <div>
        <h3>查询结果</h3>
        <!-- 用户数据 -->
        <h4>用户数据</h4>
        <div id="user_data">
          <table>
            <thead>
              <tr>
                <td>user_id</td>
                <td>distinct_id</td>
                <td>wb_uid</td>
                <td>third_id</td>
              </tr>
            </thead>
            <tbody>
              <tr v-cloak v-for="(u,index) in searchData">
                <td>{{u.user_id}}</td>
                <td>{{u.distinct_id}}</td>
                <td>{{u.wb_uid}}</td>
                <td>{{u.third_id}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 授信数据 -->
        <h4>授信数据</h4>
        <div id="credit_data">
          <table>
            <thead>
              <tr>
                <td>user_id</td>
                <td>partner_code</td>
                <td>unit_id</td>
                <td>order_no</td>
                <td>撞库状态</td>
                <td>注册状态</td>
                <td>进件状态</td>
                <td>授信状态</td>
              </tr>
            </thead>
            <tbody>
              <tr v-cloak v-for="(s, index) in shouxin_data">
                <td>{{s.user_id}}</td>
                <td>{{s.partner_code}}</td>
                <td>{{s.unit_id}}</td>
                <td>{{s.order_no}}</td>
                <td>{{s.check_state}}</td>
                <td>{{s.regist_state}}</td>
                <td>{{s.submit_state}}</td>
                <td>{{s.approval_state}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 订单数据 -->
        <h4>订单数据</h4>
        <div id="order_data">
          <table>
            <thead>
              <tr>
                <td>user_id</td>
                <td>partner_code</td>
                <td>order_no</td>
                <td>订单状态</td>
                <td>提现时间</td>
              </tr>
            </thead>
            <tbody>
              <tr v-cloak v-for="(o,index) in order_data ">
                <td>{{o.user_id}}</td>
                <td>{{o.partner_code}}</td>
                <td>{{o.order_no}}</td>
                <td>{{o.order_state}}</td>
                <td>{{o.withdrawn_at}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </d2-container>
</template>

<script>
export default {
  name: 'page3',
  code:0,
  data(){
    return{
      // search:"",
      // searchData:"",
      user_info:[{
        user_id:"1",
			  distinct_id:"123123",
			  wb_uid:"3333",
			  third_id:"2222"
      },
      {
        user_id:"2",
			  distinct_id:"123123",
			  wb_uid:"3333",
			  third_id:"2222"
      }],
       real_user_info:[],
      //授信数据信息数组
      shouxin_data:[{
        user_id:"1",
				partner_code:"xiaoyingyidaifull",
				unit_id:"12",
				order_no:"RYTkS8dS12009101823313021",
				check_state:"1",
				regist_state:"1",
				submit_state:"1",
				approval_state:"1",
      },
      {
        user_id:"2",
				partner_code:"xiaoyingyidaifull",
				unit_id:"12",
				order_no:"RYTkS8dS12009101823313021",
				check_state:"2",
				regist_state:"2",
				submit_state:"2",
				approval_state:"2",
      }],
      real_shouxin_data:[],
      //订单数据信息数组
      order_data:[{
        user_id:"1",
			  partner_code:"xiaoyingyidaifull",
				order_no:"RYTkS8dS12009101823313021",
				order_state:"90",
				withdrawn_at:"2020-08-21 16:32:41",
      },{
        user_id:"2",
			  partner_code:"xiaoyingyidaifull",
				order_no:"RYTkS8dS12009101823313021",
				order_state:"90",
				withdrawn_at:"2020-08-21 16:32:41",
      }],
      real_order_data:[],
      newInfo:{
        user_id:"",
        partner_code:"",
        order_no:"",
        distinct_id:""
      }
    }
  },
  /* create(){
      this.search({})
    }, */
  methods:{
    //search information 判断条件不能为空
    searchInfo(){
      if(this.newInfo.user_id===""){
        alert("用户id不能为空！")
        return;
      }
      if(this.newInfo.partner_code===""){
        alert("partner_code不能为空！")
        return;
      }
      if(this.newInfo.order_no===""){
        alert("order_no不能为空")
        return;
      }
      if(this.newInfo.distinct_id===""){
        alert("distinct_id不能为空")
        return;
      }
    //查询用户信息 search information
    //把用户所查询的信息推入新数组中
      //this.real_user_info.push(this.nInfo);
    //将新数组中的信息与与原数组中的信息进行比较，计算两个数组的交集
      //var r = real_user_info.filter(function(v){ return user_info.indexOf(v) > -1 })
    /* var search = this.search
    if(search){
      this.searchData = this.user_info.filter(function(product){

      })
    }   */
      /* var search = this.search;
        if (search) {
        this.searchData = this.user_info.filter(function(product) {
        console.log(product) 
        return Object.keys(product).some(function(key) {
        console.log(key)
        return String(product[key]).toLowerCase().indexOf(search) > -1
 })
 })
 } */
    
    //查询结束后清空信息
      this.newInfo = {
        user_id:"",
        partner_code:"",
        order_no:"",
        distinct_id:""  
      }
      
    },
    /* search({user_id,partner_code,order_no,distinct_id}){
      this.real_user_info
      this.real_shouxin_data
      this.real_order_data
    }  */

  },
  msg:"加载成功"
}
</script>
