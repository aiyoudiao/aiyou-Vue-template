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
          <FormItem label="商店名称" label-position="top" prop="st_name">
            <Input v-model="formData.st_name" placeholder="请输入商店名称" clearable />
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="商店地址" label-position="top" prop="st_address">
            <Input v-model="formData.st_address" placeholder="请输入商店地址" clearable />
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
    BUSINESS_SHOP_MANAGER_INSERT,
    BUSINESS_SHOP_MANAGER_INSERT_ZHCN,
} from '@constant/business-manager'

import { BusinessShopManager } from '@common/urls/index'

import { validateNotEmpty, validateNot } from '@common/validator/validate'

const { INSERT_API } = BusinessShopManager

export default {
    name: BUSINESS_SHOP_MANAGER_INSERT,
    props: {
        showInsertComponent: Boolean,
    },

    computed: {},

    data() {
        return {
            title: BUSINESS_SHOP_MANAGER_INSERT_ZHCN,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static',
            },
            formData: {
                userName: '',
                powerCode: '',
                st_name: '',
                st_address: '',
                userComments: '',
                // userStatus: "",
            },
            ruleCustom: {

                st_name: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入商店名称',
                        trigger: 'blur',
                    },
                ],
                st_address: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入商店地址',
                        trigger: 'blur',
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
                    this.$Message.error('验证失败')
                }
            })
        },
        async initUI() {
            this.handleReset('formData')
        },
        async saveFormData() {
            const [st_name, st_address] = [

                this.formData.st_name,
                this.formData.st_address,
            ]

            try {
                /* 发请求，接受数据 */
                const result = await this.$axios.post(INSERT_API, {
                    st_name, st_address,
                })

                const { status: code, message: msg } = result
                if (code !== 0) {
                    this.$Notice.error({
                        title: '消息提示',
                        desc: msg,
                    })
                } else {
                    this.$Notice.success({
                        title: '消息提示',
                        desc: msg,
                    })
                    this.$emit('updateTable', {})
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
