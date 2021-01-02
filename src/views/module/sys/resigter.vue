<template>
    <div id="login">
        <div id="main">
            <el-form :model="dataForm" :rules="rules" ref="dataForm" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8" :offset="8">
                        <div class="grid-content bg-purple-dark title">
                            <p>用户注册</p>
                        </div>
                        <div class="grid-content bg-purple-dark sidetitle">
                            <p>欢迎注册温湿度实时监控系统账户</p>
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
                                <el-input v-model="dataForm.password" placeholder="密码" type="password" clearable></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :offset="8">
                        <el-form-item prop="password2">
                            <el-input v-model="dataForm.password2" placeholder="密码" type="password" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" :offset="8" style="margin-top: 10px">
                        <div class="grid-content bg-purple-dark">
                            <el-form-item>
                                <el-button type="primary" style="width: 80%" @click="reg('dataForm')">注册</el-button>
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
                    password: '',
                    password2: ''
                },
                submitData:{
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ],
                    password2:[
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                isRemember: false,
                loginStatus: "",
                visible: true
            }},
        methods: {
            reg(dataSend) {
                const _this = this;
                console.log(_this.dataForm.password)
                console.log(_this.dataForm.password2)
                this.$refs[dataSend].validate((valid) => {
                        if (valid) {
                            if (_this.dataForm.password == _this.dataForm.password2){
                                _this.submitData.account = _this.dataForm.account
                                _this.submitData.password = _this.dataForm.password
                                axios.post("http://127.0.0.1:8181/user/save",_this.submitData).then(function (resp) {
                                    if (resp.data=="操作成功"){
                                        alert("注册成功！")
                                        _this.$router.push({
                                            name: 'login'
                                        })
                                    }

                                }).catch(function () {
                                    alert("404")
                                })
                            }else {
                                alert("请保持二次密码要一致");
                            }
                        }
                })
            }
        },
        name: "register"
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