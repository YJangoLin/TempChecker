<template>
    <el-card shadow="never" class="aui-card--fill">
        <div class="menu-userinfo">
            <el-row class="row-bg">
                <el-col :span="24">
                    <div class="div-bar" style="text-align: left">
                        <a>查询</a>
                    </div>
                </el-col>
            </el-row>
            <el-form :inline="true" :model="queryData" style="float: left" >
                <el-form-item label="用户名：">
                    <el-input v-model="queryData.account" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="queryData.createDate" placeholder="" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="queryData.status" placeholder="">
                        <el-option label="在线" value="1"></el-option>
                        <el-option label="离线" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: left">
                    <el-button  type="primary" @click="openSave" >新建</el-button>
                </el-form-item>
                <el-form-item style="float: left">
                    <el-button @click="query">查询</el-button>
                </el-form-item>
            </el-form>
                <el-col :span="24">
                    <div class="div-bar" style="text-align: left">
                        <a>数据列表</a>
                    </div>
                </el-col>
        <el-table :data="tableData">
            <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
            <el-table-column prop="account" label="用户名" header-align="center" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" header-align="center" align="center">
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='0'">离线</p>
                    <p v-if="scope.row.status=='1'">在线</p>
                </template>
            </el-table-column>
            <el-table-column prop="create_date" label="创建时间" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="update_date" label="上次更新时间" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="" label="操作" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="open(scope.row)">修改</el-button>
                    <el-button type="text" size="small" @click="deletedById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
            <div class="block">
                <el-pagination
                        layout="prev, pager, next"
                        :current-page.sync="pageNum"
                        :total="page.total"
                        :page-size="page.size"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                >
                </el-pagination>
            </div>
        <el-dialog :visible.sync="uvisible"
                   :title="chose ?'修改':'新增'"
                   width="30%"
                   center
                   :append-to-body="true"
        >
            <el-form :model="submitData" :rules="dataRule" ref="dataForm" :inline="true">
                <el-form-item label="账号" prop="account" >
                    <el-input v-model="submitData.account" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="submitData.password" type="password" placeholder=""></el-input>
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
                dataForm: {
                    account: "",
                    createDate: "",
                    status: ""
                },
                chose: false,
                submitData: {
                    id: "",
                    account: "",
                    password: ""
                },
                queryData: {
                    account:'',
                    createDate:"",
                    status: ""
                },
                uvisible: false,
                page: {
                    pageNum: 1,
                    total: 1,
                    size: 1
                }
            }
        },
        name: "userinfo",
        methods: {
            open(userInfo){
                this.submitData.id = userInfo.id
                this.submitData.account = userInfo.account
                this.submitData.password = userInfo.password
                this.chose = true
                this.uvisible = true
                console.log(this.submitData)
            },
            updateOrsave(){
                this.$refs['dataForm'].validate((valid) => {
                    const _this = this;
                    if (valid) {
                        if (this.chose){
                            this.axios.put("http://127.0.0.1:8181/user/update",_this.submitData).then(function (resp) {
                                alert(resp.data)
                                _this.uvisible= false
                            }).catch(function () {
                                alert("404服务器错误！")
                            })
                        }else {
                            this.axios.post("http://127.0.0.1:8181/user/save",_this.submitData).then(function (resp) {
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
            handleSizeChange: function(val){
                this.page.size = val
            },
            handleCurrentChange: function(val){
                this.page.pageNum = val;
                this.query()
            },
            openSave(){
                this.chose = false
                this.uvisible = true
            },
            deletedById(id){
                axios.delete("http://127.0.0.1:8181/user/delete/"+id).then(function (resp) {
                    alert(resp.data)
                }).catch(function () {
                    alert("404")
                })
                this.$router.go(0)
            },
            query(){
                console.log(this.page.pageNum)
                console.log(this.queryData)
                const _this = this
                axios.post("http://127.0.0.1:8181/user/page",{"params":this.queryData,"pageNum":_this.page.pageNum}).then(function (resp) {
                    console.log(resp.data)
                    _this.tableData = resp.data.records;
                    _this.page.current = resp.data.current;
                    _this.page.size = resp.data.size;
                    _this.page.total = resp.data.total;

                })
            }
        },
        created: function() {
            this.query();
        },
        computed: {
            dataRule() {
                return {
                    account: [
                        {required: true, message: "用户名不能为空", trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "修改的密码不能为空", trigger: 'blur'}
                    ]
                }
            }
        }

    }
</script>

<style scoped>
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