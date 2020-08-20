<template>
  <div style="padding: 10px">
    <div style="background: #fff; border-radius: 8px; padding: 20px;">
      <Form :model="formItem" :label-width="80">

        <Row>
          <Col span="11">
            <FormItem label="商品名称" :label-width="labelWidth">
              <Input v-model="formItem.c_name" placeholder="请输入商品名称" clearable />
            </FormItem>
          </Col>
          <Col span="11" offest="2">
            <FormItem label="商品价格" :label-width="labelWidth">
              <Input v-model="formItem.c_price" placeholder="请输入商品价格" clearable />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="商品数量" :label-width="labelWidth">
              <Input v-model="formItem.c_size" placeholder="请输入商品数量" clearable />
            </FormItem>
          </Col>
          <Col span="11" offest="2">
            <FormItem label="所属商店" :label-width="labelWidth">
              <Select v-model="formItem.st_id" placeholder="选择所属商店" >
                    <Option  v-for="item in selectList" :key="item.st_id + item.st_name" :value="item.st_id">{{item.st_name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>

        <FormItem>
          <Row>
            <Col span="5" offset="7">
              <Button type="primary" @click="searchByFormData">查询</Button>
            </Col>
            <Col span="5" offset="0">
              <Button type="primary" html-type="reset" @click="resetFormDataAndTable">重置</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>

      <Row>
        <Col :style="{ height: '40px' }" offset="22" span="2">
          <Button
            icon="md-person-add"
            type="primary"
            v-if="permission.insert"
            @click="showInsert = true"
          >新增</Button>
        </Col>
      </Row>
      <Table height="405" border stripe :columns="columnsQuery" :data="queryListResult"></Table>
      <br />
      <Page
        :total="total"
        :current="current"
        :page-size="pageSize"
        @on-page-size-change="changePageSize"
        @on-change="changePage"
        show-total
        show-sizer
        show-elevator
        placement="top"
      />
    </div>

    <Detail
      :showDetailComponent="showDetail"
      @changeDetailDisplay="showDetail = false"
      :v-if="showDetail"
      :detail="details"
    ></Detail>
    <Insert
      :showInsertComponent="showInsert"
      @changeInsertDisplay="showInsert = false"
      @updateTable="selectTable"
      :v-if="showInsert"
    ></Insert>
    <Update
      :showUpdateComponent="showUpdate"
      @changeUpdateDisplay="showUpdate = false"
      @updateTable="selectTable"
      :v-if="showUpdate"
      :detail="details"
    ></Update>

    <Modal
      v-model="showDelete"
      title="提示信息"
      :loading="true"
      @on-ok="handelDelete"
      @on-cancel="showDelete = false"
    >
      <p>是否确定删除？</p>
    </Modal>
  </div>
</template>

<script>
import {
    BUSINESS_GOODS_MANAGER,
    BUSINESS_GOODS_MANAGER_ZHCN,
} from '@constant/business-manager'

import { BusinessGoodsManager } from '@common/urls'

import { dateFormat } from '@common/utils'
import Detail from './detail.vue'
import Insert from './insert.vue'
import Update from './update.vue'
import { column } from './config'

const { LIST_API, REMOVE_API, SELECET_LIST_API } = BusinessGoodsManager

export default {
    name: BUSINESS_GOODS_MANAGER,
    components: {
        Detail,
        Insert,
        Update,
    },
    data() {
        return {
            title: BUSINESS_GOODS_MANAGER_ZHCN,
            permission: {
                insert: false,
                detail: false,
                update: false,
                delete: false,
            },
            columnWidth: 200,
            isShowOperation: true,
            // #region 表格 Code Module

            queryList: [],
            selectList: [],
            current: 1,
            total: 0,
            pageSize: 10,

            // #endregion 表格 Code Module End

            // #region 表单 Code Module
            labelWidth: 112,
            editable: false,
            formItem: {
                c_name: '',
                c_price: '',
                c_size: '',
                st_id: '',
            },

            // #endregion 表单 Code Module End

            // #region 抽屉 Code Module
            showDetail: false,
            showInsert: false,
            showUpdate: false,
            showDelete: false,
            deleteIndex: '',
            details: {
                st_id: '',
                st_name: '',
                c_id: '',
                c_name: '',
                c_price: '',
                c_size: '',
            },

            // #endregion 抽屉 Code Module End
        }
    },
    props: {
        menuList: {
            type: Array,
        },
    },
    computed: {
        queryListResult() {
            const current = this.current
            const pageSize = this.pageSize
            // console.log(this.queryList, typeof this.queryList)
            const data = this.queryList.map((value, index) => {
                // value.detailMessageContext = value.messageContext
                // value.messageContext = value.messageContext.substr(0, 10) + '...'
                value.serialNumber = index + 1 + (current - 1) * pageSize

                return value
            })
            // debugger;
            return data
        },
        columnsQuery() {
            return column.concat(
                this.isShowOperation
                    ? [
                        {
                            title: '操作',
                            key: 'action',
                            width: this.columnWidth,
                            align: 'center',
                            fixed: 'right',
                            render: this.renderActionButtonGroup,
                        },
                    ]
                    : [],
            )
        },
    },
    methods: {
    /* 计算表格操作栏的宽度 */
        getOperationWidth() {
            let width = 0
            const keys = Object.keys(this.permission)
            const speed = 200 / keys.length
            for (const key in keys) {
                if (this.permission[key]) {
                    width += speed
                }
            }
            console.log(width)
            return 200
        },

        /* 初始化表单 */
        initFormData() {
            this.formItem.c_price = ''
            this.formItem.c_name = ''
            this.formItem.c_size = ''
            this.formItem.st_id = ''
        },

        /* 初始化表格状态 */
        initTabelState() {
            this.current = 1
            this.total = 0
            this.pageSize = 10
        },

        /* 初始化表格 */
        async initTable() {
            this.initTabelState()

            await this.selectTable({
                pageNumber: this.current,
                pageSize: this.pageSize,
            })
        },

        /* 翻页 */
        async changePage(pageNumber) {
            this.current = pageNumber
            await this.selectTable({
                pageNumber: this.current,
            })
        },

        /* 切换表格每页长度 */
        async changePageSize(pageSize) {
            this.pageSize = pageSize
            await this.selectTable({
                pageSize: this.pageSize,
            })
        },

        /* 刷新表格中数据 */
        async selectTable({ pageNumber, pageSize }) {
            try {
                pageNumber = pageNumber === undefined ? this.current : pageNumber
                pageSize = pageSize === undefined ? this.pageSize : pageSize
                const {
                    st_id,
                    c_name,
                    c_price,
                    c_size,
                } = this.formItem

                const result = await this.$axios.post(LIST_API, {
                    st_id,
                    c_name,
                    c_price,
                    c_size,
                    pageNum: pageNumber,
                    pageSize,
                })

                const { status: code, message: msg } = result

                // debugger
                if (code !== 0) {
                    debugger
                    this.$Notice.error({
                        title: '消息提示',
                        desc: msg,
                    })
                }

                const {
                    data: { total, list: queryList, pageSize: pageSize1 },
                } = result

                this.total = total
                this.queryList = queryList
                this.pageSize = pageSize1
            } catch (error) {
                this.$Notice.error({
                    title: '消息提示',
                    desc: error,
                })
            }
        },

        /* 获取下拉列表中的数据 */
        async getSelectList() {
            try {
                const result = await this.$axios.get(SELECET_LIST_API, {})

                const { status: code, message: msg } = result

                // debugger
                if (code !== 0) {
                    debugger
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

        /* 根据表格数据查询表格数据 */
        async searchByFormData() {
            try {
                this.initTabelState()
                await this.selectTable({})
            } catch (error) {
                this.$Notice.error({
                    title: '消息提示',
                    desc: error,
                })
            }
        },

        /* 重置表单和表格数据 */
        async resetFormDataAndTable() {
            this.initFormData()
            this.initTable()
        },

        /* 渲染表格操作栏的按钮组 */
        renderActionButtonGroup(h, params) {
            return h('div', [
                this.permission.detail
          && h(
              'Button',
              {
                  props: {
                      type: 'primary',
                      size: 'small',
                  },
                  style: {
                      marginRight: '5px',
                      textAlign: 'center',
                  },
                  on: {
                      click: () => {
                          this.showDetail = true
                          this.details = params.row
                          console.log(this.details)
                      },
                  },
              },
              '详情',
          ),
                this.permission.update
          && h(
              'Button',
              {
                  props: {
                      type: 'success',
                      size: 'small',
                  },
                  style: {
                      marginRight: '5px',
                      textAlign: 'center',
                  },
                  on: {
                      click: () => {
                          this.showUpdate = true
                          this.details = params.row
                      },
                  },
              },
              '修改',
          ),
                this.permission.delete
          && h(
              'Button',
              {
                  props: {
                      type: 'error',
                      size: 'small',
                  },
                  style: {
                      // marginRight: '5px',
                      textAlign: 'center',
                  },
                  on: {
                      click: index => {
                          this.showDelete = true
                          this.details = params.row
                          this.deleteIndex = params.index
                      },
                  },
              },
              '删除',
          ),
            ])
        },

        /* 删除表格中某一项数据 */
        async handelDelete() {
            try {
                /* 向后端发送一个请求 */
                const result = await this.$axios.get(REMOVE_API, {
                    params: {
                        c_id: this.details.c_id,
                    },
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

                    this.removeRowData(this.deleteIndex)
                }
            } catch (error) {
                this.$Notice.error({
                    title: '消息提示',
                    desc: error,
                })
            }

            this.showDelete = false
        },

        /* 移除表中某一行数据，但最好是刷新一下表格 */
        removeRowData(index) {
            this.queryList.splice(index, 1)
        },
    },
    beforeMount() {
        const pagePermissions = this.$store.state.pageOperationPermissions
        const currentPagePermissions = pagePermissions[BUSINESS_GOODS_MANAGER]
        for (let i = 0; i < currentPagePermissions.length; i++) {
            this.permission[currentPagePermissions[i]] = true
        }
        // console.log(this.permission);

        let width = 0
        const keys = Object.keys(this.permission).filter(value => value !== 'insert')

        for (const key of keys) {
            if (this.permission[key]) {
                width += 200 / keys.length
            }
        }
        this.columnWidth = width
        this.isShowOperation = this.columnWidth > 0
    },

    mounted() {
        this.getSelectList()
        this.initTable()
    },
}
</script>

<style scoped></style>
