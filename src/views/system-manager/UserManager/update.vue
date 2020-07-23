<template>
  <Drawer
    :closable="true"
    :mask-closable="true"
    @on-close="$emit('changeUpdateDisplay')"
    width="720"
    :value="showUpdateComponent"
    :title="title"
    :styles="styles"
    @on-visible-change="initUI"
  >
    <Form :model="formData" ref="formData" :rules="ruleCustom">
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="用户名" label-position="top" prop="userName">
            <Input v-model="formData.userName" placeholder="请输入用户名" clearable />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="权限代码" label-position="top" prop="powerCode">
            <Select v-model="formData.powerCode" placeholder="选择权限代码">
              <Option value="0">guest</Option>
              <Option value="1">admin</Option>
              <Option value="2">administrator</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="手机号" label-position="top" prop="phoneNumber">
            <Input v-model="formData.phoneNumber" placeholder="请输入手机号" clearable />
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="邮箱地址" label-position="top" prop="emailAddress">
            <Input v-model="formData.emailAddress" placeholder="请输入邮箱地址" clearable />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="32">
        <Col span="24">
          <FormItem label="用户备注" label-position="top" prop="userComments">
            <Input
              type="textarea"
              v-model="formData.userComments"
              placeholder="用户备注"
              :autosize="{minRows: 4,maxRows: 10}"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="$emit('changeUpdateDisplay')">取消</Button>
      <Button type="primary" @click="handleSubmit('formData')">保存</Button>
    </div>
  </Drawer>
</template>

<script>
import {
    SYSTEM_USER_MANAGER_UPDATE,
    SYSTEM_USER_MANAGER_UPDATE_ZHCN,
} from '@constant/system-manager'

import { SystemUserManager } from '@common/urls'

import { validateNotEmpty, validateNot } from '@common/validator/validate'

const { UPDATE_API } = SystemUserManager

export default {
    name: SYSTEM_USER_MANAGER_UPDATE,
    props: {
        showUpdateComponent: Boolean,
        detail: {
            type: Object,
            required: false,
            default() {
                return {
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
        },
    },

    computed: {},

    data() {
        return {
            title: SYSTEM_USER_MANAGER_UPDATE_ZHCN,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static',
            },
            formData: {
                userId: '',
                userName: '',
                powerCode: '',
                phoneNumber: '',
                emailAddress: '',
                userComments: '',
            },
            ruleCustom: {
                userName: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                ],
                powerCode: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        trigger: 'blur',
                        message: '请选择权限码',
                    },
                ],
                phoneNumber: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入手机号',
                        trigger: 'blur',
                    },
                ],
                emailAddress: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入邮箱地址',
                        trigger: 'blur',
                    },
                ],
                userComments: [
                    {
                        validator: validateNotEmpty,
                        trigger: 'blur',
                        required: false,
                        message: '请输入用户备注信息',
                    },
                ],
            },
        }
    },

    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    // this.$Message.success('验证成功')
                    this.saveFormData()
                } else {
                    this.$Message.error('操作失败')
                }
            })
        },
        async saveFormData() {
            const result = this.compareOldAndNewData()
            if (!result) {
                return
            }

            const [
                userId,
                userName,
                powerCode,
                phoneNumber,
                emailAddress,
                userComments,
            ] = [
                this.formData.userId,
                this.formData.userName,
                this.formData.powerCode,
                this.formData.phoneNumber,
                this.formData.emailAddress,
                this.formData.userComments,
            ]

            try {
                /* 发请求，接受数据 */
                const result = await this.$axios.post(UPDATE_API, {
                    userId,
                    userName,
                    powerCode,
                    phoneNumber,
                    emailAddress,
                    userComments,
                })

                const { code, msg } = result
                if (code !== '0') {
                    this.$Notice.error({
                        title: '消息提示',
                        desc: msg,
                    })
                } else {
                    this.$Notice.success({
                        title: '消息提示',
                        desc: msg,
                    })
                }
            } catch (error) {
                this.$Notice.error({
                    title: '消息提示',
                    desc: error,
                })
            }
            this.$emit('changeInsertDisplay')
        },
        async initUI(state) {
            this.handleReset('formData')
            this.setFormData(state)
        },
        setFormData(state) {
            if (state) {
                const {
                    userId,
                    userName,
                    powerCode,
                    phoneNumber,
                    emailAddress,
                    userComments,
                } = this.detail

                this.$set(this.formData, 'userId', userId)
                this.$set(this.formData, 'userName', userName)
                this.$set(this.formData, 'userName', userName)
                this.$set(this.formData, 'powerCode', ({ guest: '0', admin: '1', administrator: '2' })[powerCode])
                this.$set(this.formData, 'phoneNumber', phoneNumber)
                this.$set(this.formData, 'emailAddress', emailAddress)
                this.$set(this.formData, 'userComments', userComments)
            }
        },
        compareOldAndNewData() {
            let result = true
            const {
                userId,
                userName,
                powerCode,
                phoneNumber,
                emailAddress,
                userComments } = this.detail

            if (userId !== this.formData.userId) {
                result = false
                this.$Message.error('操作失败，该id不能变更。')
            }

            if (
                userName === this.formData.userName
        && powerCode === ['guest', 'admin', 'administrator'][this.formData.powerCode]
        && phoneNumber === this.formData.phoneNumber
        && emailAddress === this.formData.emailAddress
        && userComments === this.formData.userComments
            ) {
                result = false
                this.$Message.error('操作失败，表单未有任何变更。')
            }

            return result
        },

        handleReset(name) {
            this.$refs[name].resetFields()
        },
    },
    // beforeUpdate() {
    //     console.log(this.formData, this.update)
    //     // this.formData = this.update
    //     this.formData.id = this.update.id
    //     this.formData.messageKeyWord = this.update.messageKeyWord
    //     this.formData.messageStatus = this.update.messageStatus
    //     this.formData.messageContext = this.update.messageContext
    //     // this.$set('this', 'formData', this.update)
    // },
}
</script>

<style scoped>
.demo-drawer-profile {
  overflow-y: auto;
  height: calc(100vh - 140px);
}

.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: center;
  background: #fff;
}
</style>
