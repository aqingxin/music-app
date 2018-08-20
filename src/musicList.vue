<template>
  <view class="list">
    <view class="app-title">
      <touchable-opacity :onPress="returnBack">
        <image class="returnImg" :style="{width:20,height:20}" :source="require('../assets/return.png')" />
      </touchable-opacity>
      <text class="app-title-text">{{songSheetName}}</text>
    </view>
    <scroll-view>
      <touchable-opacity v-for="(musicItem,index) in musicList" :key="index" :on-press="()=>playMusic(this,index)">
        <view class="list-item" >
          <view class="list-item-small">
            <text class="index">{{index+1}}</text>
            <view class="list-info">
              <view class="musicName">
                <text class="musicName-text">{{musicItem.name}}</text>
              </view>
              <view class="artistsName">
                <text class="artistsName-text">{{musicItem.artists[0].name}}</text>
              </view>
            </view>
          </view>
          <touchable-opacity :onPress="()=>downloadMusic(this,musicItem.id,musicItem.name,musicItem.artists[0].name)">
            <view class="rightListMenu">
              <image class="menuImg" :source="require('../assets/download.png')"/>
            </view>
          </touchable-opacity>
        </view>
      </touchable-opacity>
      <view :style="{height:130}"></view>
    </scroll-view>
    <loading v-if="loadingShow"></loading>
  </view>
</template>

<script>
import Audio from 'expo'
import loading from './loading'
const soundObject = new Expo.Audio.Sound();
import Global from '../assets/global.js'

export default {
  data(){
    return{
      musicList:[],
      musicIndex:'',
      clickIndex:0,
      loadingShow:true,
      songSheetId:'',
      songSheetName:'',
      playType:'net'
    }
  },
  components:{
    loading
  },
  mounted(){
    var that=this;    //获取音乐列表
    // console.log(this.navigation)
    if(this.navigation.state.params==undefined){
      var fetchUri="http://music.163.com/api/playlist/detail?id=601803454";
      this.songSheetName='E.A.';
    }else{
      this.songSheetId=this.navigation.state.params.songSheetId;
      this.songSheetName=this.navigation.state.params.songSheetName;
      var fetchUri="http://music.163.com/api/playlist/detail?id="+this.songSheetId;
    }
    fetch(fetchUri,{
      mode:'cors'
    }).then((response)=>response.json())   //数据解析方式
    .then((responseData)=>{    //获取到的数据处理
      that.loadingShow=false
      that.musicList=responseData.result.tracks;
    }).catch((error)=>{   //错误处理
      that.loadingShow=false
    })
  },
  props:{
    onAdd:Function,
    navigation: {
      type: Object
    }
  },

  methods:{
    playMusic:async function(e,index){   //点击传参数
      Global.Global.songIndex=index;
      Global.Global.songList=this.musicList;
      Global.Global.playType=this.playType;
    },
    downloadMusic(e,musicId,musicName,artistsName){
      var downUri=`http://music.163.com/song/media/outer/url?id=${musicId}.mp3`;
      alert('开始下载')
      Expo.FileSystem.downloadAsync(downUri,Expo.FileSystem.documentDirectory +artistsName+'--'+ musicName+'.mp3').then(({uri})=>{
        alert('下载完成')
      })
    },
    
    returnBack(){
      this.navigation.goBack()
    }
  },
}
</script>


<style scoped>
  .list {
    height: 100%;
  }
  .app-title {
    position: relative;
    width: 100%;
    height: 60px;
    paddingTop: 27px;
    padding-left: 20px;
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
    background-color: #C62F2F;
    align-items: center;
    flex-direction: row;
  }
  .app-title-text {
    color: #fff;
    font-size: 20px;
    text-align: center;
    flex: 0.9;
  }
  .list {
    /* padding-bottom: 45px; */
  }
  .list-item {
    position: relative;
    padding: 10px;
    width: 100%;
    background-color: #FBFCFE;
    flex-direction: row;
    align-items: center;
    border-color: #f1f1f1;
    justify-content: space-between;
    border-bottom-width: 1;
  }
  .list-item-small {
    width: 90%;
    flex-direction: row;
    align-items: center;
  }
  .index {
    width: 30px;
    text-align: center;
    font-size: 16px;
    margin-right: 10px;
  }
  .musicImg {
    border-radius: 3px;
    margin-right: 10px;
  }
  .list-info{
    width: 100%;
  }
  .musicName {
    width: 100%;
  }
  .musicName-text {
    font-size: 16px;
    width: 90%;
    overflow: hidden;
  }
  .artistsName-text {
    font-size: 12px;
    color: #9e9e9e;
  }
  .menuImg {
    width: 20px;
    height: 20px;
  }
</style>
