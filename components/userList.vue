<template>
  <div class="try">
    <ul>
      <li v-for="item in children.list.storeUsername" :key="item.id">
        <el-button type="primary" @click="change(item)" :disabled="!item.children">
          <span>
            <i style="font-size: 18px;" class="el-icon-arrow-up" v-if="item.show"></i>
            <i style="font-size: 18px;" class="el-icon-arrow-down" v-else></i>
          </span>
          <span>{{item.storeUsername}}</span>
        </el-button>
        <new-try v-if="item.children && item.show" :children="item.children"></new-try>
      </li>
    </ul>
  </div>
</template>
 
<script>
export default {
  name: 'NewTry',
  props: {children: Array},
  data () {
    return {
    }
  },
  methods: {
    change (item) {
      item.show = !item.show
    }
  }
}
</script>