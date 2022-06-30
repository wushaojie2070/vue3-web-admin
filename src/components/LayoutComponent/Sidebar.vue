<template>
  <!-- <el-aside class="aside" :style="{'width':isCollapse === false ? '200px':'60px'}"> -->
  <div class='sidebar'>
    <div class="is_collapse">
      <i class="el-icon-sort" @click="handleClickMenuShow"></i>
    </div>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :default-active="onRoutes" theme='dark' unique-opened mode="vertical" menu-trigger="hover" 
      router background-color='#324157' text-color='#bfcbd9' active-text-color='#20a0ff'>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :show-timeout="150" :hide-timeout="100">
            <template slot='title'>
              <i :class="item.icon"></i>
              <span v-if="isCollapse === false">{{ item.title }}</span>
            </template>
            <template v-for="(subItem,i) in item.subs">
              <el-menu-item v-if="!subItem.subs" :key="i" :index="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
              <!-- 有第三级时 -->
              <el-submenu :index="subItem.index" :show-timeout="100" :hide-timeout="0" v-else>
                <template slot="title">
                  {{ subItem.title }}
                </template>

                <template v-for="(ssubItem,j) in subItem.subs">
                  <el-menu-item :key="j">
                    {{ ssubItem.title }}
                  </el-menu-item>
                </template>

              </el-submenu>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>
            <span v-if="isCollapse === false">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
  <!-- </el-aside> -->

</template>

<script>
  import {
    gethometree
  } from "../../api/api.js"
  export default {
    data() {
      return {
        isCollapse: false,
        items: [],
      };
    },
    created() {
      this.gettree();
    },

    computed: {
      onRoutes() {
        return this.$route.path.replace("/", "");
      }
    },
    methods: {
      handleClickMenuShow() {
        this.isCollapse = !this.isCollapse;
      },
      async gettree() {
        let res = await gethometree();
        this.items = res.data.items;
      }
    }
  };
</script>

<style scoped>
  .el-icon-sort {
    font-size: 25px;
    color: bisque;
    transform: rotate(-90deg);
    text-align: center;
  }

  .is_collapse {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .sidebar {
    height: calc(100vh+30px);
    text-align: left;
    background: rgb(50, 65, 87);
  }

  .sidebar>ul {
    border-right: none;
    height: calc(100vh);
    background: rgb(50, 65, 87);
    padding-bottom: 0px;
  }

  .aside {
    background: rgb(50, 65, 87);
  }
</style>
