<template>
    <el-card shadow="never" class="aui-card--fill">
        <div class="menu-logininfo">
            <el-form :inline="true" :model="dataForm" style="float: left" >
                <el-form-item label="账号：">
                    <el-input v-model="dataForm.account" placeholder="" clearable></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="dataForm.createDate" placeholder="" clearable></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button  type="primary">新建</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button >查询</el-button>
                </el-form-item>
            </el-form>
            <el-table
                    :data="tableData"
                    :row-class-name="rowClassName"
            >
                <el-table-column prop="id" label="序号" width="80"></el-table-column>
                <el-table-column prop="account" label="用户名" header-align="center" align="center"></el-table-column>
                <el-table-column prop="status" label="登录状态" header-align="center" align="center">
                    <template slot-scope="scope">
                        <p v-if="scope.row.status=='0'">登录失败</p>
                        <p v-if="scope.row.status=='1'">登录成功</p>
                    </template>
                </el-table-column>
                <el-table-column prop="loginTime" label="登录时间" header-align="center" align="center"></el-table-column>
                <el-table-column prop="updateDate" label="操作" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="">修改</el-button>
                        <el-button type="text" size="small" @click="">删除</el-button>
                        <el-button type="text" size="small" @click="">新增</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div></el-card>

</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                dataForm: {
                    account:"",
                    createDate:""
                }
            }
        },
        methods: {
        rowClassName({row, rowIndex}) {
            //把每一行的索引放进row.id
            row.id = rowIndex+1;
        }
    },
        name: 'logininfo',
        created: function () {
            const _this = this;
            axios.get("http://127.0.0.1:8181//log/findAll").then(function (resp) {
                _this.tableData = resp.data;
            })
        }
    }
</script>