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
          <FormItem label="商品名称" label-position="top" prop="c_name">
            <Input v-model="formData.c_name" placeholder="请输入商品名称" clearable />
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="商品价格" label-position="top" prop="c_price">
            <Input v-model="formData.c_price" placeholder="请输入商品价格" clearable />
          </FormItem>
        </Col>
      </Row>

      <Row :gutter="32">
        <Col span="12">
          <FormItem label="商品数量" label-position="top" prop="c_size">
            <Input v-model="formData.c_size" placeholder="请输入商品数量" clearable />
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="所属商店" label-position="top" prop="st_id">
            <Select v-model="formData.st_id" placeholder="选择所属商店">
                    <Option  v-for="item in selectList" :key="item.st_id + item.st_name" :value="item.st_id">{{item.st_name}}</Option>
            </Select>
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
    BUSINESS_GOODS_MANAGER_INSERT,
    BUSINESS_GOODS_MANAGER_INSERT_ZHCN,
} from '@constant/business-manager'

import { BusinessGoodsManager } from '@common/urls/index'

import { validateNotEmpty, validateNot } from '@common/validator/validate'

const { INSERT_API, SELECET_LIST_API } = BusinessGoodsManager

export default {
    name: BUSINESS_GOODS_MANAGER_INSERT,
    props: {
        showInsertComponent: Boolean,
    },

    computed: {},

    data() {
        return {
            title: BUSINESS_GOODS_MANAGER_INSERT_ZHCN,
            selectList: [],
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static',
            },
            formData: {
                st_id: '',
                st_name: '',
                c_name: '',
                c_price: '',
                c_size: '',
            },
            ruleCustom: {
                c_name: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入商品名称',
                        trigger: 'blur',
                    },
                ],
                c_price: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入商品价格',
                        trigger: 'blur',
                    },
                ],
                c_size: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请输入商品数量',
                        trigger: 'blur',
                    },
                ],
                st_id: [
                    {
                        validator: validateNotEmpty,
                        required: false,
                        message: '请选择所属商店',
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
            const [
                st_id,
                c_name,
                c_price,
                c_size,
            ] = [
                this.formData.st_id,
                this.formData.c_name,
                this.formData.c_price,
                this.formData.c_size,
            ]

            try {
                /* 发请求，接受数据 */
                const result = await this.$axios.post(INSERT_API, {
                    st_id,
                    c_name,
                    c_price,
                    c_size,
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

        /* 获取下拉列表中的数据 */
        async getSelectList() {
            try {
                const result = await this.$axios.get(SELECET_LIST_API, {})

                const { status: code, message: msg } = result

                // debugger
                if (code !== 0) {
                    // debugger;
                    this.$Notice.error({
                        title: '消息提示',
                        desc: msg,
                    })
                }

                const {
                    data: { total, list: selectList },
                } = result

                this.selectList = selectList
            } catch (error) {
                this.$Notice.error({
                    title: '消息提示',
                    desc: error,
                })
            }
        },

        handleReset(name) {
            this.$refs[name].resetFields()
        },
    },

    mounted() {
        this.getSelectList()
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
