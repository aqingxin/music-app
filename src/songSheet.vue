<template>
  <view class="songSheet">
    <view class="app-title">
      <text class="app-title-text">首页音乐</text>
    </view>
    <scroll-view>
      <touchable-opacity v-for="(songList,index) in songSheetList" :key="index" :onPress="()=>toDetail(songList.id,songList.name)">
        <view class="songSheet-item">
          <view class="songSheetImg">
            <image :style="{width:50,height:50,borderRadius:5}" :source="{uri:songList.imgUrl}" />
          </view>
          <text class="songSheet-name">{{songList.name}}</text>
        </view>
      </touchable-opacity>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      songSheetList:[
        {name:'E.A.',id:'601803454',imgUrl:'http://p1.music.126.net/OvNzao--j5ZfucYr6MSdXw==/18561955300159599.jpg?param=200y200'},
        {name:'ElectronicMusic',id:'591013070',imgUrl:'http://p1.music.126.net/nMF77YVPHaw75vewmVrtHw==/18969874114610908.jpg?param=200y200'},
        {name:'云音乐新歌榜',id:'3779629',imgUrl:'http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=150y150'},
        {name:'云音乐电音榜',id:'1978921795',imgUrl:'http://p1.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg?param=150y150'},
        {name:"说唱TOP榜",id:'2323534945',imgUrl:'http://p1.music.126.net/NkCHTGef5IX2JFgH_UZhEA==/109951163416439652.jpg?param=150y150'},
        {name:'美国Billboard周榜',id:'60198',imgUrl:'http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=150y150'},
        {name:'iTunes榜',id:'11641012',imgUrl:'http://p1.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg?param=150y150'},
      ]
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods:{
    toDetail:function(songSheetId,songSheetName){
      this.navigation.navigate('list',{songSheetId,songSheetName})
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
  .songSheet-item{
    padding: 10px;
    background-color: #FBFCFE;
    flex-direction: row;
    align-items: center;
    border-color: #f1f1f1;
    border-bottom-width: 1;
  }
  .songSheetImg {
    margin-right: 15px;
  }
</style>
