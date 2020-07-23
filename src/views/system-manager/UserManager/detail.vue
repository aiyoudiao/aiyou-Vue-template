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
            用户ID:
            <span :style="sStyle">{{ detail.userId }}</span>
          </Col>
          <Col offset="1" span="11">
            用户状态:
            <span :style="sStyle">{{ userStatusText }}</span>
          </Col>
        </Row>
      </p>
      <p :style="pStyle">
        <Row>
          <Col span="12">
            用户名称:
            <span :style="sStyle">{{ detail.userName }}</span>
          </Col>
          <Col offset="1" span="11">
            用户权限码:
            <span :style="sStyle">{{ detail.powerCode }}</span>
          </Col>
        </Row>
      </p>

      <p :style="pStyle">
        <Row>
          <Col span="12">
            手机号:
            <span :style="sStyle">{{ detail.phoneNumber }}</span>
          </Col>
          <Col offset="1" span="11">
            邮箱地址:
            <span :style="sStyle">{{ detail.emailAddress }}</span>
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
        用户备注:
        <span :style="sStyle2">{{ detail.userComments }}</span>
      </p>
    </div>
  </Drawer>
</template>

<script>
import {
    SYSTEM_USER_MANAGER_DETAIL,
    SYSTEM_USER_MANAGER_DETAIL_ZHCN,
} from '@constant/system-manager'

export default {
    name: SYSTEM_USER_MANAGER_DETAIL,
    props: {
        showDetailComponent: Boolean,
        detail: {
            type: Object,
            required: false,
            default() {
                return {
                    // id: '',
                    // messageKeyWord: '',
                    // messageContext: '',
                    // messageStatus: '',
                    // updateUserId: '',
                    // updateTime: '',
                    // createUserId: '',
                    // createTime: '',

                    userId: '',
                    userName: '',
                    powerCode: '',
                    phoneNumber: '',
                    emailAddress: '',
                    userComments: '',
                    userStatus: '',
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
        userStatusText() {
            const result = this.detail.userStatus

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
            title: SYSTEM_USER_MANAGER_DETAIL_ZHCN,
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