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
            角色ID:
            <span :style="sStyle">{{ detail.roleId }}</span>
          </Col>
          <Col offset="1" span="11">
            角色状态:
            <span :style="sStyle">{{ roleStatusText }}</span>
          </Col>
        </Row>
      </p>
      <p :style="pStyle">
        <Row>
          <Col span="12">
            角色名称:
            <span :style="sStyle">{{ detail.roleName }}</span>
          </Col>
          <Col offset="1" span="11">
            角色权限码:
            <span :style="sStyle">{{ detail.powerCode }}</span>
          </Col>
        </Row>
      </p>

      <p :style="pStyle">
        <Row>
          <Col span="12">
            创建人ID:
            <span :style="sStyle">{{ detail.createUserId }}</span>
          </Col>

          <Col offset="1" span="11">
            创建时间:
            <span :style="sStyle">{{ detail.createTime }}</span>
          </Col>
        </Row>
      </p>
      <p :style="pStyle">
        <Row>
          <Col span="12">
            更新人ID:
            <span :style="sStyle">{{ detail.updateUserId }}</span>
          </Col>
          <Col offset="1" span="11">
            更新时间:
            <span :style="sStyle">{{ detail.updateTime }}</span>
          </Col>
        </Row>
      </p>

      <p :style="pStyle">
        角色备注:
        <span :style="sStyle2">{{ detail.roleComments }}</span>
      </p>
    </div>
  </Drawer>
</template>

<script>
import {
    SYSTEM_ROLE_MANAGER_DETAIL,
    SYSTEM_ROLE_MANAGER_DETAIL_ZHCN,
} from '@constant/system-manager'

export default {
    name: SYSTEM_ROLE_MANAGER_DETAIL,
    props: {
        showDetailComponent: Boolean,
        detail: {
            type: Object,
            required: false,
            default() {
                return {
                    roleId: '',
                    roleName: '',
                    powerCode: '',
                    roleComments: '',
                    roleStatus: '',
                    updateUserId: '',
                    updateTime: '',
                    createUserId: '',
                    createTime: '',
                }
            },
            //   validator: function(value) {
            //     // 传递过来的数字必须大于0
            //     return value > 0;
            //   }
        },
    },
    computed: {
        roleStatusText() {
            const result = this.detail.roleStatus

            switch (result) {
                case 'valid':
                    return '有效'
                case '有效':
                    return result
                case 'invalid':
                    return '无效'
                case '有效':
                    return result
                default:
                    return '未知'
            }
        },
    },

    data() {
        return {
            title: SYSTEM_ROLE_MANAGER_DETAIL_ZHCN,
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