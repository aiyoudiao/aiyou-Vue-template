<!--
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-08 21:45:48
 * @LastEditTime: 2020-08-09 20:38:30
 * @LastEditors: aiyoudiao
 * @FilePath: \web-fornt\src\views\business-manager\ShopManager\detail.vue
-->
<template>
  <Drawer
    :closable="true"
    width="720"
    @on-close="$emit('changeDetailDisplay')"
    :value="showDetailComponent"
    :title="title"
  >
    <div class="demo-drawer-profile">
      <p :style="pStyle">
        <Row>
          <Col span="12">
            商店编号:
            <span :style="sStyle">{{ detail.st_id }}</span>
          </Col>
          <Col offset="1" span="11">
            商店名称:
            <span :style="sStyle">{{ detail.st_name }}</span>
          </Col>
        </Row>
      </p>
      <p :style="pStyle">
        <Row>
          <Col span="24">
            商店地址:
            <span :style="sStyle">{{ detail.st_address }}</span>
          </Col>
        </Row>
      </p>
    </div>
  </Drawer>
</template>

<script>
import {
    BUSINESS_SHOP_MANAGER_DETAIL,
    BUSINESS_SHOP_MANAGER_DETAIL_ZHCN,
} from '@constant/business-manager'

export default {
    name: BUSINESS_SHOP_MANAGER_DETAIL,
    props: {
        showDetailComponent: Boolean,
        detail: {
            type: Object,
            required: false,
            default() {
                return {
                    st_id: '',
                    st_name: '',
                    st_address: '',
                  
                }
            },
        },
    },
    computed: {
    },

    data() {
        return {
            title: BUSINESS_SHOP_MANAGER_DETAIL_ZHCN,
            pStyle: {
                fontSize: '20px',
                color: 'rgba(0, 0, 0, 0.5)',
                lineHeight: '30px',
                display: 'block',
                marginBottom: '16px',
                fontWeight: 600,
            },
            sStyle: {
                fontSize: '18px',
                color: 'rgba(0,0,0,0.85)',
                textIndent: '.5rem',
                wordBreak: 'break-all',
                fontWeight: 'normal',
            },
            sStyle2: {
                fontSize: '18px',
                color: 'rgba(0,0,0,0.85)',
                textIndent: '1rem',
                display: 'table',
                wordBreak: 'break-all',
                fontWeight: 'normal',
            },
        }
    },

    methods: {},
}
</script>

<style scoped>
/* .demo-drawer-profile {
    overflow-y: auto;
    height: calc(100vh - 140px);
} */
</style>