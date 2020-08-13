<template>
  <div style="padding: 10px; height: 1000px;" class="menu-manager">
    <div style="background: #fff; border-radius: 8px; padding: 20px; height: 100%">
      <Split v-model="splitRatio">
        <div slot="left">
          <Tree
            v-if="isTreeShow"
            :data="treeRoot"
            :render="renderContent"
            class="demo-tree-render"
            @on-select-change="handleTreeNodeClick"
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

            <!-- <Col :style="{ height: '40px' }" span="2">
              <Button type="primary" @click="getCheckAllTreeNode">获取所有树节点</Button>
            </Col>-->
          </Row>

          <!-- <Table height="405" border stripe :columns="columnsQuery" :data="queryListResult"></Table> -->
          <!-- <Table row-key="menuId" :columns="column" :data="treeTable" border ref="dataTabelTree"
          @on-selection-change="getSelected"
          ></Table>-->

          <Table row-key="menuId" :columns="column" :data="treeTable" border ref="dataTabelTree"></Table>
        </div>
      </Split>
    </div>

    <!-- <Detail
      :showDetailComponent="showDetail"
      @changeDetailDisplay="showDetail = false"
      :v-if="showDetail"
      :detail="details"
    ></Detail>-->
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
    ></Update>-->

    <!-- <Modal
      v-model="showDelete"
      title="提示信息"
      :loading="true"
      @on-ok="handelDelete"
      @on-cancel="showDelete = false"
    >
      <p>是否确定删除？</p>
    </Modal>-->
  </div>
</template>

<script>
import {
    SYSTEM_MENU_MANAGER,
    SYSTEM_MENU_MANAGER_ZHCN,
} from '@constant/system-manager'

import { SystemRoleManager } from '@common/urls'

import { dateFormat } from '@common/utils'
import { getComplateTreeTable } from '@permission/getOperationPermission'
import Detail from './detail.vue'
import Insert from './insert.vue'
import Update from './update.vue'
import { column, treeRoot, treeTable } from './config'

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
            columnWidth: 200,
            isShowOperation: true,

            /**
       * 树
       */

            treeRoot,
            isTreeShow: true,

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
            column: [...column],
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
            treeTable: [...JSON.parse(JSON.stringify(treeTable))],
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
        /* 处理节点点击 */
        handleTreeNodeClick(data) {
            // alert(JSON.stringify(data));
            if (JSON.stringify(data) === '[]') {
                return
            }

            if (data[0].isRoot) {
                this.renderColumn(false)
                this.treeTable = [...treeTable]
            } else {
                this.renderColumn(true)
                console.log('treeTable', treeTable)
                const complateTreeTable = getComplateTreeTable(
                    this.cloneObj(treeTable),
                    this.cloneObj(data[0].meta.menu),
                    { _checked: true },
                )
                debugger
                // this.treeTable = [...data[0].meta.menu];
                this.treeTable = this.cloneObj(complateTreeTable)
            }

            this.expandTreeTable()
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
                          this.deleteId = params.index
                      },
                  },
              },
              '删除',
          ),
            ])
        },

        /* 渲染列 */
        renderColumn(isShowOperation) {
            const tempColumn = [
                ...column.concat(
                    isShowOperation
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
                ),
            ]

            // isShowOperation
            //   ? tempColumn.unshift({
            //       type: "selection",
            //       width: 60,
            //       align: "center"
            //     })
            //   : tempColumn;

            this.column = [...tempColumn]
        },

        /* 初始化页面必备状态 */
        initState() {
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
        /* 克隆一个对象 */
        cloneObj(obj = {}) {
            return JSON.parse(JSON.stringify(obj))
        },
        /* 展开所有树节点 */
        expandTreeTable() {
            const list = document.getElementsByClassName('ivu-icon ivu-icon-ios-add') || []

            const id = setInterval(() => {
                if (!list[0]) {
                    clearInterval(id)
                    return
                }

                list[0].click()
            })
        },
        /* 左侧的角色菜单树，默认点击全部角色，此处是根据class来进行定位和判断的 */
        selectRoleTreeFirstItem() {
            const allRoleItemNode = document
            .getElementsByClassName('ivu-tree-title ivu-tree-title-selected')[0]
            .getElementsByClassName('ivu-icon ivu-icon-ios-folder-outline')
            const allRoleItemSelected = allRoleItemNode.length > 0

            if (allRoleItemSelected) {
                for (let i = 0; i < 2; i++) {
                    setTimeout(() => {
                        allRoleItemNode[0].click()
                    })
                }
            } else {
                document
                .getElementsByClassName('ivu-icon ivu-icon-ios-folder-outline')[0]
                .click()
            }
        },

        // /* 获取表中的所有的选中的树节点 */
        // getCheckAllTreeNode () {
        //   const data = this.$refs.dataTabelTree.getSelection();
        //   alert(JSON.stringify(data));

        //   console.log("allSelectedNode", data);
        // },

        // /* 获取选中父节点 */
        // getSelected (value) {
        //   console.log("selected", value);

        //   const tableData2 = this.cloneObj(value);
        //   const tableData = []
        //   tableData2.forEach(value => {
        //     if (value.menuId - 0 > 99 && value.menuId - 0 < 999) {
        //       tableData.push(value);
        //     }
        //   });

        //   const complateTreeTable = getComplateTreeTable(
        //       this.cloneObj(treeTable),
        //       this.cloneObj(tableData),
        //       { _checked: true }
        //     );

    //   this.treeTable = this.cloneObj(complateTreeTable);
    // }
    },
    beforeMount() {
        this.initState()
    },

    mounted() {
        this.selectRoleTreeFirstItem()
    },

    destroyed() {},
}
</script>

<style scoped>
.menu-manager /deep/.ivu-table-cell-tooltip {
  display: inline-flex;
}

.menu-manager /deep/.ivu-table-cell-tree-level {
  padding-left: 0 !important;
}
</style>
