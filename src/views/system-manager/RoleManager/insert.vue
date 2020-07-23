<template>
  <Drawer
    :closable="true"
    :mask-closable="true"
    @on-close="$emit('changeInsertDisplay')"
    width="720"
    :value="showInsertComponent"
    :title="title"
    :styles="styles"
    @on-visible-change="initUI"
  >
    <Form :model="formData" ref="formData" :rules="ruleCustom">
      <Row :gutter="32">
        <Col span="12">
          <FormItem label="角色名" label-position="top" prop="roleName">
            <Input v-model="formData.roleName" placeholder="请输入角色名" clearable />
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
        <Col span="24">
          <FormItem label="角色备注" label-position="top" prop="roleComments">
            <Input
              type="textarea"
              v-model="formData.roleComments"
              placeholder="角色备注"
              :autosize="{minRows: 4,maxRows: 10}"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click="$emit('changeInsertDisplay')">取消</Button>
      <Button type="primary" @click="handleSubmit('formData')">保存</Button>
    </div>
  </Drawer>
</template>

<script>
import {
    SYSTEM_ROLE_MANAGER_INSERT,
    SYSTEM_ROLE_MANAGER_INSERT_ZHCN,
} from '@constant/system-manager'

import { SystemRoleManager } from '@common/urls/index'

import { validateNotEmpty, validateNot } from '@common/validator/validate'

const { INSERT_API } = SystemRoleManager

export default {
    name: SYSTEM_ROLE_MANAGER_INSERT,
    props: {
        showInsertComponent: Boolean,
    },

    computed: {},

    data() {
        return {
            title: SYSTEM_ROLE_MANAGER_INSERT_ZHCN,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static',
            },
            formData: {
                roleName: '',
                powerCode: '',
                phoneNumber: '',
                emailAddress: '',
                roleComments: '',
                // roleStatus: "",
            },
            ruleCustom: {
                roleName: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入角色名',
                        trigger: 'blur',
                    },
                ],
                powerCode: [
                    {
                        // validator: validateNot,
                        validator: validateNotEmpty,
                        required: false,
                        trigger: 'blur',
                        message: '请选择权限码',
                    },
                ],
                roleComments: [
                    {
                        validator: validateNotEmpty,
                        trigger: 'blur',
                        required: false,
                        message: '请输入角色备注信息',
                    },
                ],
            },
        }
    },

    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$Message.success('验证成功')
                    this.saveFormData()
                } else {
                    this.$Message.error('验证失败')
                }
            })
        },
        async initUI() {
            this.handleReset('formData')
        },
        async saveFormData() {
            const [roleName, powerCode, roleComments] = [
                this.formData.roleName,
                this.formData.powerCode,
                this.formData.roleComments,
            ]

            try {
                /* 发请求，接受数据 */
                const result = await this.$axios.post(INSERT_API, {
                    roleName, powerCode, roleComments,
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

        handleReset(name) {
            this.$refs[name].resetFields()
        },
    },
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
