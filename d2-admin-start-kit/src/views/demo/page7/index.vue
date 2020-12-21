<template>
  <d2-container slot="header">
    <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>新增广告位（直投）
        </div>
    </template>
    <div class="editInfo">
      <div>编辑资料</div>
      <el-form :model="adList" style="margin-left:120px" label-width="120px" >
        <el-form-item label="所属媒体：" prop="adMedias">
          <el-select style="width:240px" placeholder="请选择所属媒体" size="small" v-model="adList.adMedias">
            <el-option
              v-for="(item,index) in admedias"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对接方式：" prop="dockingtype" >
          <el-select style="width:240px" placeholder="请选择对接方式" size="small" v-model="adList.dockingtype">
            <el-option
              v-for="(item,index) in dockingType"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="场景：" prop="scene">
          <el-select style="width: 240px" placeholder="请选择场景" size="small" v-model="adList.scene">
            <el-option
              v-for="(item,index) in sceneType"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告位素材：" prop="adimage">
          <el-radio-group v-model="adList.adimage" size="small">
            <el-radio-button :label="1">api获取</el-radio-button>
            <el-radio-button :label="2">媒体上传</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="素材个数：" v-if="this.adList.adimage==1" prop="imgNumber">
          <el-select 
            style="width:240px"  
            placeholder="请选择素材个数"
            size="small" 
            v-model="adList.imgNumber" 
            @change="changeNum($event)">
            <el-option
            v-for="(item,index) in imgNum"
            :key="index"
            :label="item.label"
            :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>



        <div v-for="(selectItem, selectIndex) in imageNumber" :key="selectIndex" >
          <el-form-item 
            :label="'素材'+Number(selectIndex+1)+':'" 
            v-if="adList.adimage==1" 
            prop="imageType">
            <el-select size="small" clearable placeholder="请选择素材类型" style="width:240px" v-model="selectItem.imageType">
              <el-option
                v-for="(item,index) in imgType"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item 
            v-if="adList.adimage==1" 
            :label="'名称'+Number(selectIndex+1)+':'" 
            prop="imageName">
            <el-input placeholder="请输入素材名称" style="width:240px" size="small" v-model="selectItem.imageName"/>
          </el-form-item>
          <el-form-item v-if="adList.adimage==1 && selectItem.imageType==1" label="数字限制：" prop="limitNum">
            <el-input-number style="width:120px" size="small" v-model="adList.limitNum"></el-input-number>
          </el-form-item>
          <el-form-item label="格式要求：" prop="requirements" v-if="adList.adimage==1 && selectItem.imageType==2 "> 
            <el-checkbox-group v-model="adList.requirements">
              <el-checkbox label="JPG" name="type"></el-checkbox>
              <el-checkbox label="PNG" name="type"></el-checkbox>
              <el-checkbox label="GIF" name="type"></el-checkbox> 
            </el-checkbox-group>
            高度：<el-input-number style="width:120px" size="small"></el-input-number>
            宽度：<el-input-number style="width:120px" size="small"></el-input-number>
          </el-form-item>
          <el-form-item label="是否必传：" v-if="adList.adimage==1" prop="is_transport">
            <el-radio-group v-model="adList.is_transport" size="small">
              <el-radio-button :label="0">否</el-radio-button>
              <el-radio-button :label="1">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <div class="lineSytle" v-show="adList.adimage==1" ></div>
        </div>
        <el-form-item label="是否批量：" prop="is_aaaa">
          <el-radio-group v-model="adList.is_aaaa" size="small">
            <el-radio-button :label="0">否</el-radio-button>
            <el-radio-button :label="1">是</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <div style="text-align: center; margin-top: 80px; margin-left:-120px" type="flex">
        <el-button type="primary" size="medium " @click="sunmitMedias">提交</el-button>
         <el-button size="medium "  @click="cancelMedias">取消</el-button>
      </div>
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
export default {
  data(){
    return{
      //广告位信息
      adList:{
        adMedias:"",
        dockingtype:"",
        scene:"",
        adimage:2,
        is_aaaa:0,
        imgNumber:"1",
        imageType:"",
        is_transport:0,
        imageName:"",
        limitNum:"",
        requirements:[],
      },
      admedias:[
        {label:'假数据',value:'1'}
      ],
      dockingType:[
        {label:'直投',value:'1'},
        {label:'定制化api',value:'2'},
        {label:'程序化',value:'3'}
        ],
      sceneType:[
        {label:'开屏',value:'1'},
        {label:'插屏',value:'2'},
        {label:'banner',value:'3'},
        {label:'信息流',value:'4'},
        {label:'视频',value:'5'},
        {label:'固定板块',value:'6'}
      ],
      imgNum:[
        {label:'1',value:'1'},
        {label:'2',value:'2'},
        {label:'3',value:'3'},
        {label:'4',value:'4'},
        {label:'5',value:'5'},
        {label:'6',value:'6'},
        {label:'7',value:'7'},
        {label:'8',value:'8'},
        {label:'9',value:'9'},
        {label:'10',value:'10'},
      ],
      imgType:[
        {label:'文字',value:'1'},
        {label:'图片',value:'2'}
      ],
      numImg:[],
      imageNumber:[
        {
        imageType:"",//素材类型
        imageName:"",//素材名称
        limitNum:"",//字数限制
        requirements:"",//格式要求
        is_transport:""//是否必传
        }
      ]
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    sunmitMedias(){
      console.log('提交')
    },
    cancelMedias(){
      console.log('取消')
    },
    changeNum(num){
      console.log('个数选择:',num)
      let numList = num;
      this.imageNumber = [];
      for(let i = 0;i<num;i++){
        this.imageNumber.push({
          imageType:"",//素材类型
        imageName:"",//素材名称
        limitNum:"",//字数限制
        requirements:"",//格式要求
        is_transport:""//是否必传
        })
      }
    },



    getInfo(){
      this.imgNum.forEach((item,index)=>{
        this.numImg.push({
          label:item.label,
          value:item.value
        })
      })
      console.log('打印数据:',this.numImg)
    },
  }  
}

</script>

<style scoped>
  .lineSytle{
  width: 400px;
  border: 1px lightgray dashed;
  margin-left: 30px;
  margin-bottom: 20px;
}
</style>