/*eslint-disable /
<template>
  <d2-container>
    <template slot="header">这是一个测试录入系统</template>
    <!-- 第一部分 -->
    <div class="app">
    <div class="header">
    <div>
      <span>姓名：</span>
      <span>
        <input type="text" placeholder="请输入姓名" v-model="newStudent.name">
      </span>
    </div>
    <div>
      <span>年龄：</span>
      <span>
        <input type="text" placeholder="请输入年龄" v-model="newStudent.age">
      </span>
    </div>
    <div>
      <span>性别：</span>
      <select v-model="newStudent.sex">
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
    </div>
    <div>
      <span>电话：</span>
      <input type="tel" placeholder="请输入电话号码" v-model="newStudent.phone">
    </div>
    <div>
    <input type="submit" value="提交" @click="createnewStudent()"/>
    </div>
    </div>
    <!-- 第二部分 -->
    <table>
      <thead>
        <tr>
          <td>姓名</td>
          <td>年龄</td>
          <td>性别</td>
          <td>电话</td>
          <td>删除</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p,index) in persons" :key="index">
          <td>{{p.name}}</td>
          <td>{{p.age}}</td>
          <td>{{p.sex}}</td>
          <td>{{p.phone}}</td>
          <td>
            <button @click="deleteStudentMsg()">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </d2-container>
</template>

<script>
export default {
  name: 'page4',
  data(){
    return{
      persons:[{
        name:"张三",
        age:20,
        sex:"男",
        phone:"13831388998"
      },{
        name:"李四",
        age:21,
        sex:"女",
        phone:"13831388998"
      },{
        name:"王五",
        age:22,
        phone:"13831388998",
        sex:"男",
      }
      ],
      newStudent:{
        name:"",
        age:"",
        sex:"",
        phone:""
      },
      backgroundDiv:{
      backgroundimage:"url("+require('../../../assets/img/1.jpg')+")",
      backgroundRepeat:'no-repeat',
      backgroundSize:'100% 100%'
      }
    }
  },
  methods:{
    //创建一条新纪录
    createnewStudent(){
      if(this.newStudent.name===""){
        alert("姓名不能为空");
        return;
      }
      if(this.newStudent.age<=0||this.newStudent.age>=120){
        alert("请输入正确的年龄");
        return;
      }
      if(this.newStudent.phone===""){
        alert("电话号码格式不正确");
        return;
      }
      //往数组中添加一条数据
      this.persons.unshift(this.newStudent);
      //清空数据
      this.newStudent = {
        name:"",
        age:0,
        sex:"",
        phone:""
      }
    },
    //删除一条记录
    deleteStudentMsg(index){
      this.persons.splice(index,1);
    }
  }
}
</script>
<style>
  .app{
    margin: auto;
    width: 600px;
    /* background-image:url(); */
  }
  .header{
    width: 597px;
    margin-bottom: 20px;
    border: solid blueviolet;

  }
  table {
    width: 600px;
    border: solid blueviolet;
    border-collapse: collapse;
    text-align: center;
  }
  thead{
    background-color: cornflowerblue;
  }
  
</style>
