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
      <Button style="margin-right: 8px" @click="$emit('changeUpdateDisplay')">取消</Button>
      <Button type="primary" @click="handleSubmit('formData')">保存</Button>
    </div>
  </Drawer>
</template>

<script>
import {
    BUSINESS_SHOP_MANAGER_UPDATE,
    BUSINESS_SHOP_MANAGER_UPDATE_ZHCN,
} from '@constant/business-manager'

import { BusinessShopManager } from '@common/urls'

import { validateNotEmpty, validateNot } from '@common/validator/validate'

const { UPDATE_API } = BusinessShopManager

export default {
    name: BUSINESS_SHOP_MANAGER_UPDATE,
    props: {
        showUpdateComponent: Boolean,
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

    computed: {},

    data() {
        return {
            title: BUSINESS_SHOP_MANAGER_UPDATE_ZHCN,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static',
            },
            formData: {
                st_id: '',
                st_name: '',
                st_address: '',
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
                st_id,
                st_name,
                st_address,
            ] = [
                this.formData.st_id,
                this.formData.st_name,
                this.formData.st_address,
            ]

            try {
                /* 发请求，接受数据 */
                const result = await this.$axios.post(UPDATE_API, {
                    st_id,
                    st_name,
                    st_address,
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
            this.$emit('changeUpdateDisplay')
        },
        async initUI(state) {
            this.handleReset('formData')
            this.setFormData(state)
        },
        setFormData(state) {
            if (state) {
                const {
                    st_id,
                    st_name,
                    st_address,
                } = this.detail

                this.$set(this.formData, 'st_id', st_id)
                this.$set(this.formData, 'st_name', st_name)
                this.$set(this.formData, 'st_address', st_address)
            }
        },
        compareOldAndNewData() {
            let result = true
            const {
                st_id,
                st_name,
                st_address } = this.detail

            if (st_id !== this.formData.st_id) {
                result = false
                this.$Message.error('操作失败，该id不能变更。')
            }

            if (
                st_name === this.formData.st_name
        && st_address === this.formData.st_address
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
