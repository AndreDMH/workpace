<template>
  <d2-container>
    <div>
      <span>{{title}}</span>
      <el-form label-width="100px" :model="mainForm">
        <div class="select-model" v-for="(item,index) in mainForm.allArr":key="index">
          <el-row>
            <el-col :span="4">
              <el-form-item label="国家" :prop="'allArr.'+index+'country'">
                <el-select v-model="item.country" placeholder="请选择国家" @change="selectCountry($event,index)">
                  <el-option
                    v-for="(a,b) in countryArr"
                    :key="b"
                    :label="a.label"
                    :value="a.value"
                   
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="省份" :prop="'allArr.'+index+'province'">
                <el-select v-model="item.province" placeholder="请选择城市">
                  <el-option
                   v-for="(c,d) in provinceArr[index]"
                   :key="d"
                   :label="c"
                   :value="c"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="城市" :prop="'allArr.'+index+'city'">
                <el-select v-model="item.city" placeholder="请选择城市">
                  <el-option
                   v-for="(e,f) in cityArr"
                   :key="f"
                   :label="e.label"
                   :value="e.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="县城" :prop="'allArr.'+index+'countyTown'">
                <el-select v-model="item.countyTown" placeholder="请选择城市">
                  <el-option
                   v-for="(g,h) in townArr"
                   :key="h"
                   :label="g.label"
                   :value="g.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button type="primary" v-show="index==0" @click="addSelect">添加</el-button>
                <el-button v-show="index!=0" @click="deleteSelect(index)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
export default {
  data(){
    return{
      title:"表单动态添加",
      countryArr:[
        {
          label:"中国",
          value:1
        },
        {
          label:"美国",
          value:2
        },
        {
          label:"日本",
          value:3
        }
      ],//国家数组
      provinceArr:[],//省份数组
      cityArr:[],//城市数组
      townArr:[],//县城数组
      cProvince:[
        {
          label:"河北省",
          value:1
        },
        {
          label:"河南省",
          value:2
        },
        {
          label:"山东省",
          value:3
        },
      ],//中国省份
      aProvince:[
        {
          label:"亚拉巴马州",
          value:1
        },
        {
          label:"阿拉斯加州",
          value:2
        },
        {
          label:"亚利桑那州",
          value:3
        },
      ],//美国省份
      jProvince:[
        {
          label:"111111",
          value:1
        },
        {
          label:"222222",
          value:2
        },
        {
          label:"333333",
          value:3
        }
      ],//日本省份
      mainForm:{
        allArr:[{
        country:"",
        province:"",
        city:"",
        countyTown:"",
      }],
      },
    }
  },
  methods:{
    addSelect(){
      this.mainForm.allArr.push({
        country:"",
        province:"",
        city:"",
        countyTown:"",
      })
    },
    deleteSelect(index){
      this.mainForm.allArr.splice(index,1)
    },
    selectCountry(str,index){
      console.log('str',str)
      console.log('index',index)
      // console.log('b',b)
      if(str == 1){

        this.provinceArr[index] = this.cProvince
      } else if(str == 2){
        this.provinceArr[index] = this.aProvince
      } else if(str == 3){
        this.provinceArr[index] = this.jProvince
      }
    }
  }  
}
</script>
<style scoped>
  
</style>
