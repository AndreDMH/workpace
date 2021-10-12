<template>
  <div class="addAdsenseList">
    <d2-container type="full">
      <template slot="header">
        <div class="flex ryt-right-top">
          <div class="line_header"></div>
          <div v-if="pageType == '1'">新建广告位</div>
          <div v-else-if="pageType == '2'" class="line_title">编辑广告位</div>
          <div v-else class="line_title">复制广告位</div>
        </div>
      </template>
      <el-form
        :model="mainForm"
        ref="mainForm"
        label-width="120px"
        style="padding-left:40px"
        :rules="rule"
        size="mini"
      >
        <el-form-item label="广告位名称:" prop="media_position_name">
          <el-input
            v-model="mainForm.media_position_name"
            placeholder="请输入广告位名称"
            style="width: 300px;"
          />
        </el-form-item>
        <el-form-item label="所属平台:" prop="media_platform_id">
          <el-select
            v-model="mainForm.media_platform_id"
            filterable
            placeholder="请选择所属平台"
            style="width:300px"
            @change="filterMedia($event)"
          > 
            <el-option
              v-for="(item,index) in mediaplatformArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属应用:" prop="media_id">
          <el-select
            v-model="mainForm.media_id"
            filterable
            placeholder="请选择所属应用"
            style="width: 300px;"
            @change="changeMedia($event)"
          >
            <el-option
              v-for="(item, index) in mediaArr"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

         <el-form-item
          label="操作系统"
          prop="os"
        >
          <el-radio-group
            v-model="mainForm.os"
          >
            <el-radio-button label=0>不限</el-radio-button>
            <el-radio-button label=1>Android</el-radio-button>
            <el-radio-button label=2>IOS</el-radio-button>
          </el-radio-group>
        </el-form-item>



        <el-form-item
          label="广告位类型"
          prop="scenes_type"
        >
          <el-radio-group
            v-model="mainForm.scenes_type"
            style="width:80%"
          >
            <el-radio-button v-for="(item,index) in positionTypeArr" :key="index" :label="item.key" style="margin-bottom:5px">{{item.value}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item 
          label="媒体映射id:" 
          prop="media_map_code" 
          style="width:180px"
          v-if="mediaType_API&&mediaSchema_openRTB"
        >
          <el-input
            v-model="mainForm.media_map_code"
            placeholder="请填写映射id"
            style="width: 300px;"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="price_text"
          prop="reserve_price"
          style="display:inline-block"
          v-if="isShow"
        >
          <el-input
            v-model="mainForm.reserve_price"
            :placeholder="'请填写'+price_text"
            style="width: 300px"
          ></el-input>
          <i>{{unit}}</i>
        </el-form-item>
        <el-form-item
          label="图片:"
          prop="picture_limit"
          v-if="mediaType_H5"
        >
          <el-radio-group
            v-model="mainForm.picture_limit"
            @change="pictureButton($event)"
          >
            <el-radio-button label=0>禁用</el-radio-button>
            <el-radio-button label=1>必须</el-radio-button>
            <el-radio-button label=2>可选</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div 
          style="display:inline"
          v-if="mainForm.picture_limit != 0 && mediaType_H5"
          v-for="(item,index) in mainForm.material_picture_value"
          :key="index+'picture_limit'"
        >
          <el-form-item
            style="display:inline-block"
            label="名称:"
            :prop="'material_picture_value.'+index+'.material_name'"
            :rules="materialRules.material_picture_name"
            label-width="150px"
          >
            <el-input
              v-model="item.material_name"
              placeholder="请填写图片素材名称"
              style="width:205px"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="display:inline-block"
            label="宽度:"
            label-width="60px"
            :prop="'material_picture_value.'+index+'.width_limit'"
            :rules="materialRules.material_picture_width_limit"           
          >
            <el-input
              v-model="item.width_limit"
              style="width:100px"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="display:inline-block"
            label="高度:"
            label-width="60px"
            :prop="'material_picture_value.'+index+'.high_limit'"     
            :rules="materialRules.material_picture_high_limit"       
          >
            <el-input
              v-model="item.high_limit"
              style="width:100px"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="display:inline-block"
            label="图片大小:"
            :prop="'material_picture_value.'+index+'.file_size'"
            :rules="materialRules.material_picture_file_size"
            label-width="90px"
          >
            <el-input
              v-model="item.file_size"
              style="width:80px"
            ></el-input>kb
          </el-form-item>
          <el-form-item style="display:inline-block" label-width="10px">
            <el-button type="primary"  style="margin-left:10px" v-show="mainForm.picture_limit!=0&&index==mainForm.material_picture_value.length-1" @click="addMaterial('1')">添加</el-button>
            <el-button type="primary"  style="margin-left:10px" v-show="mainForm.picture_limit!=0&&index==mainForm.material_picture_value.length-1&&index!=0" @click="deteMaterial(index,item.id)">删除</el-button>
          </el-form-item>
          <el-form-item
            label="格式要求:"
            :prop="'material_picture_value.'+index+'.format_limit'"
            :rules="materialRules.material_picture_format_limit"
            label-width="150px"
          >
            <el-checkbox-group v-model="item.format_limit">
              <el-checkbox v-for="(q,w) in CONSTANT.image_type" :key="q.value" :label="q.label">{{q.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div style="margin: 30px 8px 20px 6px;border-top:1px dashed #C0C0C0;"></div>
        </div>  
        <el-form-item
          label="文字:"
          prop="text_limit"
          v-if="mediaType_H5"
        >
          <el-radio-group
            v-model="mainForm.text_limit"
            @change="textButton($event)"
          >
            <el-radio-button label=0>禁用</el-radio-button>
            <el-radio-button label=1>必须</el-radio-button>
            <el-radio-button label=2>可选</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div
          style="display: inline;"
          v-if="mainForm.text_limit !=0&&mediaType_H5"
          v-for="(item,index) in mainForm.material_text_value"
          :key="index+'text_limit'"
        >
          <el-form-item
            style="display:inline-block"
            label="名称:"
            :prop="'material_text_value.'+index+'.material_name'"
            :rules="materialRules.material_text_material_name"
            label-width="150px"
          >
            <el-input
              v-model="item.material_name"
              placeholder="请填写文字素材名称"
              style="width:205px"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="display:inline-block"
            label="字数限制:"
            label-width="90px"
            :prop="'material_text_value.'+index+'.quantity_limit'"
            :rules="materialRules.material_text_quantity_limit"
          >
            <el-input
              v-model="item.quantity_limit"
              style="width:120px"
            ></el-input>
          </el-form-item>
          <el-form-item style="display:inline-block" label-width="20px">
            <el-button type="primary"  style="margin-left:10px" v-show="mainForm.text_limit!=0&&index==mainForm.material_text_value.length-1" @click="addMaterial('2')">添加</el-button>
            <el-button type="primary"  style="margin-left:10px" v-show="mainForm.text_limit!=0&&index!=0&&index==mainForm.material_text_value.length-1" @click="deteTextMaterial(index,item.id)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <!-- 插槽 -->
          </el-form-item>
          <div style="margin: 30px 8px 20px 6px;border-top:1px dashed #C0C0C0;"></div>
        </div>
        <el-form-item
          label="视频:"
          prop="video_limit"
          v-if="mediaType_H5"
        >
          <el-radio-group
            v-model="mainForm.video_limit"
            @change="videoButton($event)"
          >
            <el-radio-button label=0>禁用</el-radio-button>
            <el-radio-button label=1>必须</el-radio-button>
            <el-radio-button label=2>可选</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div
          style="display: inline;"
          v-if="mainForm.video_limit !=0&&mediaType_H5"
          v-for="(item,index) in mainForm.material_video_value"
          :key="index+'video_limit'"
        >
          <el-form-item
            style="display:inline-block"
            label="名称:"
            :prop="'material_video_value.'+index+'.material_name'"
            :rules="materialRules.material_video_material_name"
            label-width="150px"
          >
            <el-input
              v-model="item.material_name"
              placeholder="请填写视频素材名称"
              style="width:205px"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="display:inline-block"
            label="宽度:"
            label-width="60px"
            :prop="'material_video_value.'+index+'.width_limit'"      
            :rules="materialRules.material_video_width_limit"     
          >
            <el-input
              v-model="item.width_limit"
              style="width:100px"
            ></el-input>
          </el-form-item>
          <el-form-item
            style="display:inline-block"
            label="高度:"
            label-width="60px"
            :prop="'material_video_value.'+index+'.high_limit'"  
            :rules="materialRules.material_video_high_limit"          
          >
            <el-input
              v-model="item.high_limit"
              style="width:100px"
              :precision="2" :step="0.1"
              controls-position="right"
            ></el-input>
          </el-form-item>
          <el-form-item style="display:inline-block" label-width="10px">
            <el-button type="primary"  style="margin-left:10px" v-show="mainForm.video_limit!=0&&index==mainForm.material_video_value.length-1" @click="addMaterial('3')">添加</el-button>
            <el-button type="primary"  style="margin-left:10px" v-show="mainForm.video_limit!=0&&index!=0&&index==mainForm.material_video_value.length-1" @click="deteVideoMaterial(index,item.id)">删除</el-button>
          </el-form-item>
          <el-form-item
            label="格式要求:"
            label-width="150px"
            :prop="'material_video_value.'+index+'.format_limit'"
            :rules="materialRules.material_video_format_limit"
          >
            <el-checkbox-group v-model="item.format_limit">
              <el-checkbox v-for="(e,r) in CONSTANT.video_type" :key="r" :label="e.label">{{e.label}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div style="margin: 30px 8px 20px 6px;border-top:1px dashed #C0C0C0;"></div>
        </div>
      </el-form>

      <div style="text-align: center; margin-top: 20px;" type="flex">
        <el-button type="primary" size="medium " @click="sunmitMedias"
          >提交</el-button
        >
        <el-button size="medium " @click="cancelMedias">取消</el-button>
      </div>
    </d2-container>
  </div>
</template>
<script>
export default {
  name: "editAdsenseList",
  data() {
    return {
      pageId: "",
      pageType: "",
      pageWhere: "",
      saleType:"",
      platFormID:"",
      loading: true,
      mediaplatformArr:[],
      platformArr:[],//平台下拉框数组
      price_text:"价格",
      unit :"元",
      isShow:true,



      mediaType_H5:true,
      mediaType_API:true,

      mediaSchema_API:true,
      mediaSchema_openRTB:true,




      mainForm:{
        media_position_name:"",// 广告位名称
        media_platform_id:"",//所属平台
        scenes_type:1,//广告位类型 
        os:0,
        media_map_code:"",//媒体映射id
        reserve_price:"",//价格
        picture_limit:0,//图片素材  0 禁用  2  可选  1  必须
        material_picture_value:[],//图片限制
        text_limit:0,// 文字素材  0 禁用   2 可选  1 必须
        material_text_value:[],// 文字素材限制
        video_limit:0, //视频素材  0 禁用  2  可选  1 必须
        material_video_value:[]// 视频素材限制
      },
     
      mediaArr: [],
      positionTypeArr:[],
      rule: {
        media_position_name:[
          {required: true, message:"广告位名称不能为空！", trigger:"blur"}
        ],
        media_platform_id:[
          {required: true, message:"所属平台不能为空！", trigger:"blur"}
        ],
        media_id:[
          {required: false, message:"所属应用不能为空！",trigger:"blur"}
        ],
        picture_limit:[
          {required: true,message:"图片限制不能为空！",trigger:"blur"}
        ],
        text_limit:[
          {required: true,message:"文字限制不能为空！",trigger:"blur"}
        ],
        video_limit:[
          {required: true,message:"视频限制不能为空！",trigger:"blur"}
        ]
      },
      materialRules:{
        material_picture_name:[
          {required: true,message:"图片素材名称不能为空！",trigger:"blur"}
        ],
        material_picture_width_limit:[
          {required: true,message:"图片素材宽度不能为空！",trigger:"blur"}
        ],
        material_picture_high_limit:[
          {required: true,message:"图片素材高度不能为空！",trigger:"blur"}
        ],
        material_picture_file_size:[
          {required: true,message:"图片大小不能为空！",trigger:"blur"}
        ],
        material_picture_format_limit:[
          {required: true,message:"图片格式要求不能为空！",trigger:"blur"}
        ],


        material_text_material_name:[
          {required: true,message:"文字素材名称不能为空！",trigger:"blur"}
        ],
        material_text_quantity_limit:[
          {required: true,message:"字数限制不能为空！",trigger:"blur"}
        ],

        material_video_material_name:[
          {required: true,message:"视频素材名称不能为空！",trigger:"blur"}
        ],
        material_video_width_limit:[
          {required: true, message:"视频素材宽度不能为空！",trigger:"blur"}
        ],
        material_video_high_limit:[
          {required: true, message:"视频素材高度不能为空！",trigger:"blur"}
        ],
        material_video_format_limit:[
          {required: true, message:"视频格式不能为空！",trigger:"blur"}
        ]
      }
    };
  },
  created() {
    this.pageId = this.$route.query.id;
    this.pageType = this.$route.query.type;
    this.pageWhere = this.$route.query.where;
    this.platFormID = this.$route.query.media_platform_id
    this.getPositionType();
    this.getMediaPlatform();
    this.pageType == '2'&&this.getEditPositionData();
    if(this.pageType == '3'){
      this.getEditPositionData();
    }
    if(this.pageWhere == 'mediaList'){
      this.mainForm.media_platform_id = String(this.platFormID)
      this.mainForm.media_id = String(this.pageId)
      this.mediaDown(this.mainForm.media_platform_id)
      this.$nextTick(function(){
        setTimeout(()=>{
          this.changeMedia(this.mainForm.media_id)
        },500)
      })

    }
  },
  methods: {
    pictureButton(e){
      if(this.pageType == '1'||this.pageType == '3'){
        this.mainForm.material_picture_value = [];
        if(e!=0){
          this.mainForm.material_picture_value.push({
            material_name:"",//名称
            width_limit: "", // 宽
            high_limit: "", // 高
            file_size:"",//图片大小
            format_limit:[],//格式要求

            quantity_limit:"",//字数限制

            //以下传固定值
            min_quantity_limit:0,
            position_type :1,
            note_desc:""
          })
        } else {
          this.mainForm.material_picture_value = [];
        }
      } else {
        //编辑时
        console.log('123',this.mainForm.material_picture_value)
        if(this.mainForm.material_picture_value.length == 0){
          if(e!=0){
          this.mainForm.material_picture_value.push({
            material_name:"",//名称
            width_limit: "", // 宽
            high_limit: "", // 高
            file_size:"",//图片大小
            format_limit:[],//格式要求

            quantity_limit:"",//字数限制

            //以下传固定值
            min_quantity_limit:0,
            position_type :1,
            note_desc:""
          })
        } else{
          this.mainForm.material_video_value = [];
        }
        } 
        
      }
    },
    textButton(e){
      if(this.pageType == '1'||this.pageType == '3'){
        this.mainForm.material_text_value = [];
        if(e!=0){
          this.mainForm.material_text_value.push({
            material_name:"",//名称
            quantity_limit:"",//字数限制

            width_limit: "", // 宽
            high_limit: "", // 高
            file_size:"",//图片大小
            format_limit:[],//格式要求

            //以下传固定值
            min_quantity_limit:0,
            position_type :1,
            note_desc:""
          })
        } else {
          this.mainForm.material_text_value = [];
        }
      } else {
        //编辑
        if(this.mainForm.material_text_value.length == 0){
          if(e!=0){
            this.mainForm.material_text_value.push({
              material_name:"",//名称
              quantity_limit:"",//字数限制

              width_limit: "", // 宽
              high_limit: "", // 高
              file_size:"",//图片大小
              format_limit:[],//格式要求

              //以下传固定值
              min_quantity_limit:0,
              position_type :1,
              note_desc:""
            })
          } else {
            this.mainForm.material_text_value = []
          }
        }
      }
    },
    videoButton(e){
      if(this.pageType == '1'||this.pageType == '3'){
      this.mainForm.material_video_value = [];
      if(e!=0){
        this.mainForm.material_video_value.push({
          material_name:"",//名称
          width_limit: "", // 宽
          high_limit: "", // 高
          format_limit:[],//格式要求

          quantity_limit:"",//字数限制
          file_size:"",//图片大小

          //以下传固定值
          min_quantity_limit:0,
          position_type :1,
          note_desc:""
        })
      } else {
        this.mainForm.material_video_value = [];
      }
      } else {
        //编辑时
        if(this.mainForm.material_video_value.length==0){
          if(e!=0){
            this.mainForm.material_video_value.push({
              material_name:"",//名称
              width_limit: "", // 宽
              high_limit: "", // 高
              file_size:"",//图片大小
              format_limit:[],//格式要求

              quantity_limit:"",//字数限制

              //以下传固定值
              min_quantity_limit:0,
              position_type :1,
              note_desc:""
            })
          } else {
            this.mainForm.material_video_value = []
          }
        }
      }
    },
    changeMedia(e){
      console.log('1')
      //所属应用不同的对接协议和对接方式要展示不同的内容
      //business_type 业务对接方式。1 api，2 h5
      //business_schema 业务对接协议.1 open-rtb, 2 api金融

      //bill_type 结算方式。1 CPM, 2 CPC, 3 CPA, 4 CPS, 5 CPD
      //sale_type 竞价方式。1 RTB, 2 PD, 3 PDB

      console.log(this.mediaArr)
      this.mediaArr.forEach(item =>{
        if(item.value == e){
          // console.log('应用名称：',item.label+'应用对接方式：'+item.type+'应用对接协议：'+item.schema)
          // console.log('应用名称：',item.label+'结算方式：'+item.bill+'竞价方式：'+item.compete)
          if(item.type == 1&&item.schema==1){
            //对接方式API 对接协议openRTB
            this.mediaType_API = true;
            this.mediaSchema_openRTB = true;
            if(item.bill == 1&&item.compete == 2){
              this.isShow = true
              this.price_text = "PD价格"
              this.unit = "元/CPM"
            } else if(item.bill == 1&&item.compete==3){
              this.isShow = true
              this.price_text = "PDB价格"
              this.unit = "元/月"
            } else if(item.bill == 2){
              this.isShow = true
              this.price_text = "CPC单价"
              this.unit = '元'
            } else if(item.bill == 3){
              this.isShow = true
              this.price_text = "CPA单价"
              this.unit = "元"
            } else if(item.bill == 4){
              this.isShow = true
              this.price_text = "CPS比例"
              this.unit = "%"
            } else if(item.bill == 5){
              this.isShow = true
              this.price_text = "CPD"
              this.unit = "元/天"
            } else if(item.bill == 1&&item.compete==1){
              this.isShow = false
            }
          } else if(item.type == 1&&item.schema==2){
            //对接方式API 对接协议API金融
            this.mediaType_API = false;
            this.mediaSchema_openRTB = false;
            this.isShow = true;
            if(item.bill == 2){
              this.price_text = "CPC单价"
              this.unit = '元'
            } else if(item.bill == 3){
              this.price_text = "CPA单价"
              this.unit = "元"
            } else if(item.bill == 4){
              this.price_text = "CPS比例"
              this.unit = "%"
            } else if(item.bill == 5){
              this.price_text = "CPD"
              this.unit = "元/天"
            }

          } else {
            this.mediaType_API = false;
            this.mediaSchema_openRTB = false;
          }

          if(item.type == 2){
            //对接方式H5
            this.mediaType_H5 = false;
            this.isShow = true;
            if(item.bill == 2){
              this.price_text = "CPC单价"
              this.unit = '元'
            } else if(item.bill == 3){
              this.price_text = "CPA单价"
              this.unit = "元"
            } else if(item.bill == 4){
              this.price_text = "CPS比例"
              this.unit = "%"
            } else if(item.bill == 5){
              this.price_text = "CPD"
              this.unit = "元/天"
            }
          } else {
            this.mediaType_H5 = true
          }

        }
      })
    },
    //获取流量平台下拉列表
    async getMediaPlatform(){
      //流量平台下拉框 （所属平台）
      const{ data:res} = await this.$http.get(this.baseUrl.ip1 +`/sourceSys/options/mediaPlatform`)
      let platformList = res;
      platformList.forEach((item)=>{
        this.mediaplatformArr.push({
          label:item.media_platform_name,
          value:String(item.id)
        })
      });
    },
    filterMedia(e){
      //筛选媒体
      this.mediaArr.splice(0,this.mediaArr.length)
      this.mainForm.media_id = "";
      this.mediaDown(e)
    },
    async mediaDown(id) {
      const { data: res } = await this.$http.post(this.baseUrl.ip1 + `/sourceSys/options/media`,
        {
          media_platform_id_arr:[id]
        }
      );
      const lista = res;
      lista.forEach((item, index) => {
        this.mediaArr.push({
          value: String(item.id),
          label: item.media_name,
          type: item.business_type,// 对接方式
          schema: item.business_schema,// 对接协议
          bill: item.bill_type,//结算方式
          compete: item.sale_type// 竞价方式
        });
      });
    },
    addMaterial(str){
      if(str == '1'){
        //添加图片素材
        this.mainForm.material_picture_value.push({
          material_name:"",
          width_limit:"",
          high_limit:"",
          file_size:"",
          format_limit:[],
          quantity_limit:"",//字数限制

          //以下传固定值
          min_quantity_limit:0,
          position_type :1,
          note_desc:""


        })
      } else if(str=='2'){
        //添加文字素材
        this.mainForm.material_text_value.push({
          material_name:"",
          quantity_limit:"",
          width_limit:"",
          high_limit:"",
          file_size:"",
          format_limit:[],

           //以下传固定值
          min_quantity_limit:0,
          position_type :1,
          note_desc:""


        })
      } else if(str=='3'){
        //添加视频素材
        this.mainForm.material_video_value.push({
          material_name:"",//名称
          width_limit: "", // 宽
          high_limit: "", // 高
          format_limit:[],//格式要求
          //以下传固定值
          min_quantity_limit:0,
          position_type :1,
          note_desc:"",
          file_size:"",
          quantity_limit:"",//字数限制

        })
      }
    },
    deteMaterial(index,id){
      //删除图片素材
      this.mainForm.material_picture_value.splice(index,1)
      // this.deletMaterial(id)
    },
    deteTextMaterial(index){
      //删除文字素材
      this.mainForm.material_text_value.splice(index,1)
      // this.deletMaterial(id)
    },
    deteVideoMaterial(index){
      //删除视频素材
      this.mainForm.material_video_value.splice(index,1)
      // this.deletMaterial(id)
    },
    // async deletMaterial(material_id){
    //   //删除素材要调用的接口
    //   const {data:res} = await this.$http.post(this.baseUrl.ip1+`/sourceSys/mediaPosition/deleteMaterialLimit`,
    //     {
    //       limit_id:material_id
    //     }
    //   )
    // },
    sunmitMedias() {
      //提交
      this.$refs.mainForm.validate((valid)=>{
        if(valid){
          if(this.pageType != '2'){
            this.submitData();
          } else if(this.pageType == '2'){
            this.editData();
          }
        } else {
          this.$message({
            type: "info",
            message: "您有未填写的信息，请检查",
          });
        }
      })
    },
    cancelMedias() {
      //取消
      this.$router.go(-1);
    },
    async submitData(){
      //新增提交
      let params = {};
      params.media_position_name = this.mainForm.media_position_name;
      params.media_id = this.mainForm.media_id
      params.media_platform_id = this.mainForm.media_platform_id;
      params.scenes_type = this.mainForm.scenes_type;
      params.os = this.mainForm.os;
      params.media_map_code = this.mainForm.media_map_code;
      params.picture_limit = this.mainForm.picture_limit;
      params.text_limit = this.mainForm.text_limit;
      params.video_limit = this.mainForm.video_limit;
      params.reserve_price = this.mainForm.reserve_price;

      if(this.mainForm.picture_limit !=0 ){
        params.picture_limit_arr = this.mainForm.material_picture_value
      } else {
        params.picture_limit_arr = [];
      }
      if(this.mainForm.text_limit !=0 ){
        params.text_limit_arr = this.mainForm.material_text_value
      } else {
        params.text_limit_arr = [];
      }
      if(this.mainForm.video_limit !=0) {
        params.video_limit_arr = this.mainForm.material_video_value
      } else {
        params.video_limit_arr = [];
      }

      const response = await this.$http.post(this.baseUrl.ip1+`/sourceSys/mediaPosition/store`,params)
      .then((response)=>{
        if(response.code == 200){
          this.$message.success(response.msg);
          if(this.pageWhere == 'mediaList'){
            this.$router.push({
              path:`/mediaManage/adsenseList`
            })
          } else{
            this.$router.go(-1)
          }
        }
      })
    },
    async editData(){
      //编辑提交
      let params = {};
      params.id = this.pageId

      params.media_position_name = this.mainForm.media_position_name;
      params.media_id = this.mainForm.media_id
      params.media_platform_id = this.mainForm.media_platform_id;
      params.scenes_type = this.mainForm.scenes_type;
      params.os = this.mainForm.os;
      params.media_map_code = this.mainForm.media_map_code;
      params.picture_limit = this.mainForm.picture_limit;
      params.text_limit = this.mainForm.text_limit;
      params.video_limit = this.mainForm.video_limit;
      params.reserve_price = this.mainForm.reserve_price;

      if(this.mainForm.picture_limit !=0 ){
        params.picture_limit_arr = this.mainForm.material_picture_value
      } else {
        params.picture_limit_arr = [];
      }
      if(this.mainForm.text_limit !=0 ){
        params.text_limit_arr = this.mainForm.material_text_value
      } else {
        params.text_limit_arr = [];
      }
      if(this.mainForm.video_limit !=0) {
        params.video_limit_arr = this.mainForm.material_video_value
      } else {
        params.video_limit_arr = [];
      }

      const response = await this.$http.post(this.baseUrl.ip1+`/sourceSys/mediaPosition/update`,params)
      .then((response)=>{
        if(response.code == 200){
          this.$message.success('保存成功');
          this.$router.go(-1)
        }
      })

    },
    async getEditPositionData(){
      let id = this.pageId;
      const {data:res} = await this.$http.get(this.baseUrl.ip1+`/sourceSys/mediaPosition/edit/${id}`)
      let list = res;

      if(this.pageType == '3'){
        this.mainForm.media_position_name = ""
      } else{
        this.mainForm.media_position_name = list.media_position_name;
      }
      this.mainForm.media_platform_id = String(list.media_platform_id)
      this.mainForm.media_id = String(list.media_id)
      this.mainForm.scenes_type = list.scenes_type
      this.mainForm.os = list.os;
      this.mainForm.media_map_code = list.media_map_code
      this.mainForm.picture_limit = list.picture_limit
      this.mainForm.text_limit = list.text_limit
      this.mainForm.video_limit = list.video_limit
      this.mainForm.reserve_price = list.reserve_price

      this.mainForm.material_picture_value = list.picture_limit_arr
      this.mainForm.material_text_value = list.text_limit_arr
      this.mainForm.material_video_value = list.video_limit_arr

      console.log('asasd',list.picture_limit_arr)
      console.log('12',this.mainForm.material_picture_value)
      this.$nextTick(function(){
        setTimeout(()=>{
          this.changeMedia(this.mainForm.media_id)
        },500)
      })
      this.mediaDown(this.mainForm.media_platform_id)
    },
    async getPositionType(){
    //广告位类型数组
    const {data:res} = await this.$http.get(this.baseUrl.ip1+'/scene/list')
    let positionList = res;
    this.positionTypeArr = positionList
  }
  },
};
</script>
<style lang="scss">
.addAdsenseList {
  .line_title {
    color: #999999;
    font-size: 16px;
    font-weight: 700;
  }
  .card-header{
    height: 8px;
  }
}
</style>
