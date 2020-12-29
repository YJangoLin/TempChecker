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
            <el-form :inline="true" :model="dataForm" style="float: left" >
                <el-form-item label="账号：">
                    <el-input v-model="dataForm.account" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="dataForm.createDate" placeholder="" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="状态">
                    <el-date-picker v-model="dataForm.status" placeholder="" clearable></el-date-picker>
                </el-form-item>
                <el-form-item style="float: left">
                    <el-button  type="primary">新建</el-button>
                </el-form-item>
                <el-form-item style="float: left">
                    <el-button >查询</el-button>
                </el-form-item>
            </el-form>
            <el-row class="row-bg">
                <el-col :span="24">
                    <div class="div-bar" style="text-align: left">
                        <a>数据列表</a>
                    </div>
                </el-col>
            </el-row>
        <el-table :data="tableData">
            <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
            <el-table-column prop="account" label="用户名" header-align="center" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" header-align="center" align="center">
                <template slot-scope="scope">
                    <p v-if="scope.row.status=='0'">离线</p>
                    <p v-if="scope.row.status=='1'">在线</p>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="updateDate" label="上次更新时间" header-align="center" align="center">
            </el-table-column>
            <el-table-column prop="updateDate" label="上次更新时间" header-align="center" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="">修改</el-button>
                    <el-button type="text" size="small" @click="">删除</el-button>
                    <el-button type="text" size="small" @click="">新增</el-button>
                </template>
            </el-table-column>
        </el-table>
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
                }
            }
        },
        name: "userinfo",
        methods: {

        },
        created: function() {
            const _this = this;
            axios.get("http://127.0.0.1:8181/user/page").then(function (resp) {
                _this.tableData = resp.data
                console.log(resp.data)
            })
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