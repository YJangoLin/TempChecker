<template>
    <div id="menu">
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-col :span="4">
                    <img src="../img/logo.jpg" style="width: 100%">
                </el-col>
                <div style="margin-right: -30px">
                    <el-col :span="4" offset="13" >
                        <img v-if="dataForm.headImage !=null" src="../img/user_default.png" style="width: 20%;margin-top: 10px"/>
                    </el-col>

                    <el-col span="2" style="text-align: left;margin-left: 10px">
                        <span style="margin-right: 10px" >{{dataForm.account}}</span>
                        <el-dropdown>
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </div>




            </el-header>
        </el-container>
        <el-container style="height: 500px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
<!--                <el-row>-->
<!--                    <el-col :span="24">-->
<!--                        <div class="grid-content bg-purple-dark">-->
<!--                            <img src="../img/user_default.png" v-if="dataForm!=null && dataForm!= ''" style="width: 100%" />-->
<!--                            <p>{{account}}</p>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                </el-row>-->
                <el-menu router :default-openeds="['0']" :default-active="['/userInfo']">
                    <el-submenu v-for="(item, index) in menuList" :key="index" :index="index+''" style="margin-left: -15%">
                        <template slot="title"><i class="el-icon-setting"></i>{{item.name}}</template>
                        <el-menu-item v-for="(item2, index2) in item.children" :index="item2.path" :key="index+'-'+index2">{{item2.name}}</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
<!--                <el-main>-->
<!--                    <el-table :data="tableData">-->
<!--                        <el-table-column prop="date" label="日期" width="140">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="name" label="姓名" width="120">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="address" label="地址">-->
<!--                        </el-table-column>-->
<!--                    </el-table>-->
<!--                </el-main>-->
            </el-container>
        </el-container>
    </div>

</template>

<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            return {
                menuList: this.$router.options.routes.slice(2),
                dataForm: {},
                account: this.$route.params.account,
            }
        },
        created: function () {
            const _this = this;
            axios.get("http://127.0.0.1:8181/user/info").then(function (resp) {
                _this.dataForm = resp.data;
                console.log(resp.data);
                console.log(_this.dataForm);

            }).catch(function (error) {
                alert("404服务器错误")
            });
            // console.log(this.menuList)
        },
        name: "MainMenu"
    }
</script>
