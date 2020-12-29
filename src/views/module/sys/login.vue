<template>
    <div id="login">
        <div id="main">
            <el-form :model="dataForm" :rules="rules" ref="dataForm" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8" :offset="8">
                        <div class="grid-content bg-purple-dark title">
                            <p>温湿度实时监控系统</p>
                        </div>
                        <div class="grid-content bg-purple-dark sidetitle">
                            <p>基于传感器的实时数据追踪系统</p>
                        </div>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="8" :offset="8" style="margin-bottom: 10px">
                        <div class="grid-content bg-purple-dark">
                            <el-form-item prop="account">
                                <el-input v-model="dataForm.account" placeholder="用户名" clearable></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row id="ifrom">
                    <el-col :span="8" :offset="8">
                        <div class="grid-content bg-purple-dark">
                            <el-form-item prop="password">
                                <el-input v-model="dataForm.password" placeholder="密码" clearable></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :offset="8">
                        <div class="grid-content bg-purple-dark btn1">
                            <el-col :span="4">
                                <el-checkbox v-model="isRemember" style="color: #999;font-size: 12px">记住密码</el-checkbox>
                            </el-col>
                            <el-col :span="4" offset="16">
                                <a @click="resigter" style="color:#409EFF;font-size: 14px">注册</a>
                            </el-col>

                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :offset="8" style="margin-top: 10px">
                        <div class="grid-content bg-purple-dark">
                            <el-form-item>
                                <el-button type="primary" style="width: 80%" @click="login('dataForm')">登录</el-button>
                            </el-form-item>

                        </div>
                    </el-col>
                </el-row>
            </el-form>


        </div>



<!--        <div id="img" style="width: 100%;height:150px"></div>-->
    </div>

</template>

<script>
    export default {
        data () {
            return {
                dataForm: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                isRemember: false,
                loginStatus: "",
                visible: true
            }},
        methods: {
            login (dataSend) {
                console.log(this.dataForm);
                const _this = this;
                this.$refs[dataSend].validate((valid) => {
                        if (valid) {
                                axios.post("http://127.0.0.1:8181/user/login",_this.dataForm).then(function (resp) {
                                    _this.loginStatus = resp.data;
                                    alert(_this.loginStatus);
                                    if (_this.loginStatus=='登录成功') {
                                        _this.$router.push({
                                            name: '主页面',
                                            params: {"account": _this.dataForm.account}
                                        })
                                    }

                                })

                        }else{
                            alert("密码账号不能为空");
                        }
                })


            },
            resigter() {
                this.$router.push({
                    name : 'register'
                }
                )
            }
        },
        name: "login"
    }
</script>

<style scoped>
    #login{
        height: 950px;
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: auto;
        background-image: url("../img/bg.c81e0765.png");
        background-position: 0 100%;
        background-repeat: no-repeat;
        background-size: 100% auto;
    }
    .title{
        font-family: "Helvetica Neue";
        font-size: 30px;
        font-weight: bold;
        margin-bottom: -20px;
    }
    .sidetitle{
        color: #999;
        font-size: 14px;
        margin-bottom: 20px;
    }
    #main{
        margin-top: 100px;
    }
    #ifrom{
        margin-bottom: 10px;
    }
    .btn1{
        margin-top: -20px;
    }
</style>