<template>
    <el-card shadow="never" class="aui-card--fill">
        <div class="menu-logininfo">
            <el-row class="row-bg">
                <el-col :span="24">
                    <div class="div-bar" style="text-align: left">
                        <a>查询</a>
                    </div>
                </el-col>
            </el-row>
            <el-form :inline="true" :model="queryData" style="float: left" >
                <el-form-item label="账号：">
                    <el-input v-model="queryData.account" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item label="操作时间：">
                    <el-date-picker v-model="queryData.loginTime" placeholder="" clearable></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary" @click="openSave">新建</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="query">查询</el-button>
                </el-form-item>
            </el-form>
                <el-col :span="24">
                    <div class="div-bar" style="text-align: left">
                        <a>数据列表</a>
                    </div>
                </el-col>
            <el-table
                    :data="tableData"
                    :row-class-name="rowClassName"
                    height="250"
            >
                <el-table-column prop="xid" label="序号" width="80"></el-table-column>
                <el-table-column prop="account" label="用户名" header-align="center" align="center"></el-table-column>
                <el-table-column prop="status" label="操作状态" header-align="center" align="center">
                    <template slot-scope="scope">
                        <p v-if="scope.row.status=='0'">失败</p>
                        <p v-if="scope.row.status=='1'">成功</p>
                    </template>
                </el-table-column>
                <el-table-column prop="operation" label="操作类型" header-align="center" align="center"></el-table-column>
                <el-table-column prop="login_time" label="操作时间" header-align="center" align="center"></el-table-column>
                <el-table-column prop="updateDate" label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="open(scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="deletedById(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        :current-page.sync="pageNum"
                        :total="page.total"
                        :page-sizes="[10, 20, 50, 100]"
                        layout="total, sizes, prev, pager, next, jumper"
                        :page-size="page.size"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
            <el-dialog :visible.sync="uvisible"
                       :title="chose ?'修改':'新增'"
                       center
                       :append-to-body="true"
                       width="40%"
            >
                <el-form :model="submitData" :rules="dataRule" ref="dataForm">
                    <el-form-item label="用户名" prop="account" >
                        <el-input v-model="submitData.account" placeholder="" style="width:60%"></el-input>
                    </el-form-item>
                    <el-form-item label="登录时间" prop="loginTime">
                        <el-date-picker v-model="submitData.loginTime" placeholder=""></el-date-picker>
                    </el-form-item>
                    <el-form-item label="登录时间" prop="operation">
                        <el-select v-model="submitData.operation" placeholder="">
                            <el-option label="新增用户" value="新增用户"></el-option>
                            <el-option label="删除用户" value="删除用户"></el-option>
                            <el-option label="更新用户" value="更新用户"></el-option>
                            <el-option label="用户登录" value="用户登录"></el-option>
                        </el-select>
                    </el-form-item>

                </el-form>
                <template slot="footer">
                    <el-button type="primary" @click="updateOrsave">提交</el-button>
                    <el-button @click="this.uvisible =false">取消</el-button>
                </template>
            </el-dialog>
        </div>
    </el-card>

</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                uvisible: false,
                submitData: {
                    id: "",
                    account: "",
                    status: "",
                    loginTime: '',
                    operation: ''
                },
                chose: false,
                queryData: {
                    account:'',
                    loginTime:""
                },
                page: {
                    pageNum: 1,
                    total: 1,
                    size: 1
                }
            }
        },
        methods: {
        rowClassName({row, rowIndex}) {
            //把每一行的索引放进row.id
            row.xid = rowIndex+1;
        },open(userInfo){
                this.submitData.id = userInfo.id
                this.submitData.account = userInfo.account
                this.submitData.status = userInfo.status
                this.submitData.loginTime = userInfo.loginTime
                this.submitData.operation = userInfo.operation
                this.chose = true
                this.uvisible = true
                console.log(this.submitData)
            },updateOrsave(){
                this.$refs['dataForm'].validate((valid) => {
                    const _this = this;
                    if (valid) {
                        if (this.chose){
                            this.axios.put("http://127.0.0.1:8181/log/update",_this.submitData).then(function (resp) {
                                alert(resp.data)
                                _this.uvisible= false
                            }).catch(function () {
                                alert("404服务器错误！")
                            })
                        }else {
                            this.axios.post("http://127.0.0.1:8181/log/save",_this.submitData).then(function (resp) {
                                alert(resp.data)
                                _this.uvisible= false
                            }).catch(function () {
                                alert("404服务器错误！")
                            })
                        }
                        _this.$router.go(0);
                    }
                })
            },
            openSave(){
                this.chose = false
                this.uvisible = true
            },
            deletedById(id){
            console.log(id)
                axios.delete("http://127.0.0.1:8181/log/delete/"+id).then(function (resp) {
                    alert(resp.data)
                }).catch(function () {
                    alert("404")
                })
                this.$router.go(0)
            },
            handleSizeChange: function(val){
                this.page.size = val
            },
            handleCurrentChange: function(val){
                this.page.pageNum = val;
                this.query();
            },
            query(){
                const _this = this
                axios.post("http://127.0.0.1:8181/log/page",{"params":this.queryData,"pageNum":_this.page.pageNum}).then(function (resp) {
                    console.log(resp.data)
                    _this.tableData = resp.data.records;
                    _this.page.current = resp.data.current;
                    _this.page.size = resp.data.size;
                    _this.page.total = resp.data.total;

                })
            }
    },
        name: 'logininfo',
        computed: {
            dataRule() {
                return {
                    account: [
                        {required: true, message: "用户名不能为空", trigger: 'blur'}
                    ],
                    loginTime: [
                        {required: true, message: "登录日期不能为空", trigger: 'blur'}
                    ],
                    operation: [
                        {required: true, message: "操作类型不能为空", trigger: 'blur'}
                    ]
                }
            }
        },
        created: function () {
           this.query();
        }
    }
</script>
<style>
    .div-bar{
        background: #0bb2d4;
        border-radius: 4px;
        margin-bottom: 10px;
        height: 30px
    }
    .div-bar a{
        color: white;
        font-size: 16px;
        margin-left: 10px;
        line-height: 30px
    }
</style>