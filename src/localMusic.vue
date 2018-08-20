<template>
  <view>
    <view class="app-title">
      <text class="app-title-text">本地音乐</text>
    </view>
    <view>
      <scroll-view >
        <touchable-opacity v-for="(musicItem,index) in musicList" :key="index" :onPress="()=>play(this,index)">
          <view class="localMusicItem">
            <view class="list-item-small">
              <text class="index">{{index+1}}</text>
              <view class="list-info">
                <view class="musicName">
                  <text class="musicName-text">{{musicItem}}</text>
                </view>
              </view>
            </view>
            <touchable-opacity :onPress="()=>deleteFile(this,musicItem)">
              <view class="rightListMenu">
                <image class="menuImg" :source="require('../assets/delete.png')"/>
              </view>
            </touchable-opacity>
          </view>
        </touchable-opacity>
    </scroll-view>
    </view>
  </view>
</template>

<script>
const soundObject = new Expo.Audio.Sound();
import Global from '../assets/global.js'
export default {
  data(){
    return{
      musicList:[],
      playType:'local'
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  mounted(){
    this.loadLocalMusic();
  },
  methods:{
    loadLocalMusic(){
      var that=this;
      Expo.FileSystem.readDirectoryAsync(Expo.FileSystem.documentDirectory).then((uri)=>{
        // console.log(uri[0])
        that.musicList=uri
      })
    },
    deleteFile:function(e,musicName){     //删除文件
      var that=this;
      Expo.FileSystem.deleteAsync(Expo.FileSystem.documentDirectory + musicName, {
        idempotent:true
      }).then((res)=>{
        alert('删除成功');
        that.loadLocalMusic();
      })
    },

    play(e,index){
      Global.Global.songIndex=index;
      Global.Global.songList=this.musicList;
      Global.Global.playType=this.playType;
    }
  }
}
</script>


<style scoped>
  .app-title {
    position: relative;
    width: 100%;
    height: 60px;
    paddingTop: 27px;
    border-bottom-color: #ccc;
    border-bottom-width: 1px;
    background-color: #C62F2F;
  }
  .app-title-text {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .localMusicItem {
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
  .menuImg {
    width: 20px;
    height: 20px;
  }
</style>
