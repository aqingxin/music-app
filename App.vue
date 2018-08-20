<template>
  <view class="container">
    <AppNavigation></AppNavigation>
    <audioBar></audioBar>
  </view>
</template>

<script>

import { StackNavigator,DrawerNavigator,TabNavigator  } from "vue-native-router";
import musicList from './src/musicList'
import audioBar from './src/audioBar'
import home from './src/home'
import localMusic from './src/localMusic'
import appTitle from './src/title'
import songSheet from './src/songSheet'


const Drawer = DrawerNavigator(
  {
    '首页音乐': {screen:songSheet},
    本地音乐:localMusic,
    list:musicList
  },
  {
    initialRouteName: "首页音乐",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
  }
);
const AppNavigation = StackNavigator(
  {
    Drawer: Drawer,
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
)

export default {
  data(){
    return{
      listArr:[],
      musicIndex:'',
      musicData:[],
      growth:-250,
      menuShow:false,
    }
  },
  components: {musicList,audioBar,AppNavigation,songSheet },

}
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
.text-color-primary {
  color: #fff;
}
.app-title {
  position: relative;
  width: 100%;
  height: 60px;
  paddingTop: 27px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  background-color: #C62F2F;
}
.menu {
  width: 30px;
  height: 30px;
  backgroundColor:#fff;
}
.menus {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 27px;
  z-index: 9;
}
.growth-animated-view {
  position: absolute;
  left: -250px;
  width: 75%;
  height: 100%;
  backgroundColor: red;
  top: 0;
}
.app-title-text {
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.camera {
  width: 30px;
  height: 30px;
}
.main {
  width: 300px;
  height: 300px;
  marginTop:30px;
  borderColor:#000;
  borderWidth:1px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction:row;
}
.mainDiv1,.mainDiv2 {
  width: 50px;
  height: 50px;
  backgroundColor: red;
}

</style>
