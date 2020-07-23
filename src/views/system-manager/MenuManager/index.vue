<template>
  <div style="padding: 10px; height: 1000px;" class="menu-manager">
    <div style="background: #fff; border-radius: 8px; padding: 20px; height: 100%">
      <Split v-model="splitRatio">
        <div slot="left">
          <Tree
            :data="data5"
            :render="renderContent"
            class="demo-tree-render"
            @on-select-change="handleClick"
          ></Tree>
        </div>
        <div slot="right" style="margin-left: 15px">
          <Row>
            <Col :style="{ height: '40px' }" span="2">
              <Button
                icon="md-add"
                type="primary"
                v-if="permission.insert"
                @click="showInsert = true"
              >新增</Button>
            </Col>
          </Row>

          <!-- <Table height="405" border stripe :columns="columnsQuery" :data="queryListResult"></Table> -->
          <Table row-key="menuId" :columns="columns16" :data="data12" border></Table>
        </div>
      </Split>
    </div>

    <!-- <Detail
      :showDetailComponent="showDetail"
      @changeDetailDisplay="showDetail = false"
      :v-if="showDetail"
      :detail="details"
    ></Detail> -->
    <Insert
      :showInsertComponent="showInsert"
      @changeInsertDisplay="showInsert = false"
      :v-if="showInsert"
    ></Insert>
    <!-- <Update
      :showUpdateComponent="showUpdate"
      @changeUpdateDisplay="showUpdate = false"
      :v-if="showUpdate"
      :detail="details"
    ></Update> -->

    <!-- <Modal
      v-model="showDelete"
      title="提示信息"
      :loading="true"
      @on-ok="handelDelete"
      @on-cancel="showDelete = false"
    >
      <p>是否确定删除？</p>
    </Modal> -->
  </div>
</template>

<script>
import {
    SYSTEM_MENU_MANAGER,
    SYSTEM_MENU_MANAGER_ZHCN,
} from '@constant/system-manager'

import { SystemRoleManager } from '@common/urls'

import { dateFormat } from '@common/utils'
import Detail from './detail.vue'
import Insert from './insert.vue'
import Update from './update.vue'
import { column, treeTable } from './config'

const { LIST_API, REMOVE_API } = SystemRoleManager


export default {
    name: SYSTEM_MENU_MANAGER,
    components: {
        Detail,
        Insert,
        Update,
    },
    data() {
        return {
            title: SYSTEM_MENU_MANAGER_ZHCN,
            permission: {
                insert: false,
                detail: false,
                update: false,
                delete: false,
            },

            splitRatio: 0.25,

            /**
       * 树
       */

            data5: [
                {
                    title: '全部角色',
                    expand: true,
                    render: (h, { root, node, data }) => h(
                        'span',
                        {
                            style: {
                                display: 'inline-block',
                                width: '20%',
                            },
                        },
                        [
                            h('span', [
                                h('Icon', {
                                    props: {
                                        type: 'ios-folder-outline',
                                    },
                                    style: {
                                        marginRight: '8px',
                                    },
                                }),
                                h('span', data.title),
                            ]),
                            h(
                                'span',
                                {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px',
                                    },
                                },
                                [],
                            ),
                        ],
                    ),
                    children: [
                        {
                            title: '访客',
                        },
                        {
                            title: '管理员',
                        },
                        {
                            title: '超级管理员',
                        },
                    ],
                },
            ],

            // #region 抽屉 Code Module
            showDetail: false,
            showInsert: false,
            showUpdate: false,
            showDelete: false,
            deleteIndex: '',

            // #endregion 抽屉 Code Module End

            /**
       * 树形表格
       */
            columns16: column,
            // [
            //   // {
            //   //   type: "selection",
            //   //   width: 60,
            //   //   align: "center"
            //   // },
            //   {
            //     title: "Name",
            //     key: "name",
            //     tree: true
            //   },
            //   {
            //     title: "Age",
            //     key: "age"
            //   },
            //   {
            //     title: "Address",
            //     key: "address"
            //   }
            // ],
            data12: treeTable,
            // [
            //   {
            //     id: "100",
            //     name: "John Brown",
            //     age: 18,
            //     address: "New York No. 1 Lake Park"
            //   },
            //   {
            //     id: "101",
            //     name: "Jim Green",
            //     age: 24,
            //     address: "London No. 1 Lake Park",
            //     children: [
            //       {
            //         id: "10100",
            //         name: "John Brown",
            //         age: 18,
            //         address: "New York No. 1 Lake Park"
            //       },
            //       {
            //         id: "10101",
            //         name: "Joe Blackn",
            //         age: 30,
            //         address: "Sydney No. 1 Lake Park"
            //       },
            //       {
            //         id: "10102",
            //         name: "Jon Snow",
            //         age: 26,
            //         address: "Ottawa No. 2 Lake Park",
            //         children: [
            //           {
            //             id: "1010200",
            //             name: "Jim Green",
            //             age: 24,
            //             address: "New York No. 1 Lake Park"
            //           }
            //         ]
            //       }
            //     ]
            //   },
            //   {
            //     id: "102",
            //     name: "Joe Black",
            //     age: 30,
            //     address: "Sydney No. 1 Lake Park"
            //   },
            //   {
            //     id: "103",
            //     name: "Jon Snow",
            //     age: 26,
            //     address: "Ottawa No. 2 Lake Park"
            //   }
            // ]
        }
    },
    props: {
        menuList: {
            type: Array,
        },
    },
    computed: {},
    methods: {
    /**
     * 树
     */
        renderContent(h, { root, node, data }) {
            return h(
                'span',
                {
                    style: {
                        display: 'inline-block',
                        width: '100%',
                    },
                },
                [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline',
                            },
                            style: {
                                marginRight: '8px',
                            },
                        }),
                        h('span', data.title),
                    ]),
                    h(
                        'span',
                        {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px',
                            },
                        },
                        [],
                    ),
                ],
            )
        },
        handleClick(data) {
            alert(JSON.stringify(data))
        },
    },
    beforeMount() {
        const pagePermissions = this.$store.state.pageOperationPermissions
        const currentPagePermissions = pagePermissions[SYSTEM_MENU_MANAGER]
        for (let i = 0; i < currentPagePermissions.length; i++) {
            this.permission[currentPagePermissions[i]] = true
        }
        // console.log(this.permission);

        let width = 0
        const keys = Object.keys(this.permission).filter(
            value => value !== 'insert',
        )

        for (const key of keys) {
            if (this.permission[key]) {
                width += 200 / keys.length
            }
        }
        this.columnWidth = width
        this.isShowOperation = this.columnWidth > 0
    },

    mounted() {

    },
}
</script>

<style scoped>

  .menu-manager /deep/.ivu-table-cell-tooltip {
    display: inline-flex;
  }

  .menu-manager /deep/.ivu-table-cell-tree-level {
    padding-left: 0!important;
  }
</style>
