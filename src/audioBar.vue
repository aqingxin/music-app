<template>
  <view class="audio-bar">
    <image
    :style="{width:40,height:40,borderRadius:3,marginRight:10}"
    :source="{uri:songImg}" />
    <view>
      <view class="music-title">
        <text class="music-title-text">{{songName}}</text>
      </view>
      <view class="artistsName">
        <text class="artistsName-text">{{artistsName}}</text>
      </view>
    </view>
    <view class="music-btn">
      <touchable-opacity  class="prev" :on-press="prevSong">
        <image
          :style="{width:40,height:40}"
          :source="require('../assets/prev.png')" />
      </touchable-opacity>
      <touchable-opacity v-if="isPLay"  class="pause" :on-press="musicPause">
        <image
        :style="{width:40,height:40}"
        :source="require('../assets/pause.png')"  />
      </touchable-opacity>
      <touchable-opacity v-if="!isPLay" class="pause" :on-press="continuePLay">
        <image
        :style="{width:40,height:40}"
        :source="require('../assets/play.png')"  />
      </touchable-opacity>
      <touchable-opacity class="next" :on-press="nextSong">
        <image
        :style="{width:40,height:40}"
        :source="require('../assets/next.png')" />
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
import Expo from 'expo'
const soundObject = new Expo.Audio.Sound();
import Global from '../assets/global.js'
var gIndex=Global.songIndex
export default {
  data(){
    return{
      musicList:[],
      songName:'无',
      songImg:'../assets/logo.png',
      songId:0,
      songIndex:Global.songIndex,
      artistsName:'无',
      clickIndex:0,
      isPLay:false,
      playType:'',
      Global:Global,
      playName:''
    }
  },
  mounted(){
   
  },
  methods:{
    playMusic:async function(){
      
      this.clickIndex+=1;
      this.isPLay=true;
      if(this.playType=='net'){
        var musicSrc=`http://music.163.com/song/media/outer/url?id=${this.songId}.mp3`;
      }else{
        var musicSrc=Expo.FileSystem.documentDirectory+this.playName;
      }
      if(this.clickIndex==1){  //判断是否为第一次点击播放，如果是则直接播放
        try{
          await soundObject.loadAsync({uri:musicSrc});
          await soundObject.playAsync();
        }catch(error){
          alert(error)
        }
      }else{   //如果不是，需要先卸载掉媒体再调用播放媒体进行播放
        soundObject.unloadAsync();
        try{
          await soundObject.loadAsync({uri:musicSrc});
          await soundObject.playAsync();
        }catch(error){
          alert(error)
        }
      }
    
    },
    musicPause:function(){        //暂停播放
      if(this.clickIndex!=0){
        this.isPLay=false;
        soundObject.pauseAsync();
      }
    },
    continuePLay:function(){      //继续播放
      if(this.clickIndex!=0){
        this.isPLay=true;
        soundObject.playAsync();
      }
    },
   
    prevSong:async function(){  //上一曲操作
      if(this.clickIndex==0){   //判断是否未有第一次点击，如果不是则不做操作
        return false
      }else{                    //如果不是第一次点击并且歌曲已经在播放，做上一曲的相对应操作
        this.clickIndex+=1;
        if(this.songIndex!=0){
          this.songIndex-=1;
        }
        if(this.isPLay==false){
          this.isPLay=true;
        }
        if(this.playType=='net'){
          this.songName=this.musicList[this.songIndex].name;
          this.songImg=this.musicList[this.songIndex].album.picUrl;
          this.artistsName=this.musicList[this.songIndex].artists[0].name;
          var musicSrc=`http://music.163.com/song/media/outer/url?id=${this.musicList[this.songIndex].id}.mp3`;
        }else{
          var nameIndex=this.musicList[this.songIndex].indexOf('--')
          this.songName=this.musicList[this.songIndex].substring(nameIndex+2,this.musicList[this.songIndex].length);
          this.songImg='../assets/AppLogo.png';
          this.artistsName=this.musicList[this.songIndex].substring(0,nameIndex);
          var musicSrc=Expo.FileSystem.documentDirectory+this.musicList[this.songIndex];
          this.playName=this.musicList[this.songIndex];
        }
        soundObject.unloadAsync();      //需要先卸载掉媒体
        try{
          await soundObject.loadAsync({uri:musicSrc});
          await soundObject.playAsync();
        }catch(error){
          alert(error)
        }
        if(soundObject.playAsync()){
            console.log('playing')
        }
      }
    },
    nextSong:async function(){      //下一曲操作
      if(this.clickIndex==0){       //判断和操作同“上一曲”操作一样
        alert(Global.songIndex)
        return false
      }else{
        this.clickIndex+=1;
        if(this.songIndex<this.musicList.length-1){
          this.songIndex+=1;
        }
        if(this.isPLay==false){
          this.isPLay=true;
        }
        if(this.playType=='net'){
          this.songName=this.musicList[this.songIndex].name;
          this.songImg=this.musicList[this.songIndex].album.picUrl;
          this.artistsName=this.musicList[this.songIndex].artists[0].name;
          var musicSrc=`http://music.163.com/song/media/outer/url?id=${this.musicList[this.songIndex].id}.mp3`;
        }else{
          var nameIndex=this.musicList[this.songIndex].indexOf('--')
          this.songName=this.musicList[this.songIndex].substring(nameIndex+2,this.musicList[this.songIndex].length);
          this.songImg='../assets/AppLogo.png';
          this.artistsName=this.musicList[this.songIndex].substring(0,nameIndex);
          var musicSrc=Expo.FileSystem.documentDirectory+this.musicList[this.songIndex];
          this.playName=this.musicList[this.songIndex];
        }
        soundObject.unloadAsync();
        try{
          await soundObject.loadAsync({uri:musicSrc});
          await soundObject.playAsync();
        }catch(error){
          // alert(error)
        }
      }
    }
  },
  watch:{   //监听点击传过来的音乐的index值，如果改变，则相对应的改变正在播放的音乐
    Global:{
      handler(val){
        if(val.Global.playType=='net'){
          this.songIndex=val.Global.songIndex;
          this.songName=val.Global.songList[val.Global.songIndex].name;
          this.playName=val.Global.songList[val.Global.songIndex].name;
          this.artistsName=val.Global.songList[val.Global.songIndex].artists[0].name;
          this.songId=val.Global.songList[val.Global.songIndex].id;
          this.songImg=val.Global.songList[val.Global.songIndex].album.picUrl;
          this.musicList=val.Global.songList;
          this.playType=val.Global.playType;
        }else{
          var nameIndex=val.Global.songList[val.Global.songIndex].indexOf('--')
          this.songName=val.Global.songList[val.Global.songIndex].substring(nameIndex+2,val.Global.songList[val.Global.songIndex].length);
          this.playName=val.Global.songList[val.Global.songIndex];
          this.artistsName=val.Global.songList[val.Global.songIndex].substring(0,nameIndex);
          this.songIndex=val.Global.songIndex;
          this.playType=val.Global.playType;
          this.musicList=val.Global.songList;
          this.songImg='../assets/AppLogo.png';
        }
        this.playMusic();
      },
      deep:true
    }
  }
}
</script>


<style scoped>
  .audio-bar {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    border-top-color: #F6F6F6;
    border-top-width: 1px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
  }
  .music-title-text {
    width: 140px;
    /* word-wrap: none; */
    /* white-space: nowrap; */
    flexWrap: nowrap;
    overflow: hidden;
    font-size: 16px;
  }
  .artistsName-text {
    font-size: 12px;
    color: #9e9e9e;
  }
  .music-btn {
    position: absolute;
    right: 30px;
    flex-direction: row;
    /* margin-left: 100px; */
  }
  .prev {
    margin-right: 10px;
  }
  .pause {
    margin-right: 10px;
  }
</style>
