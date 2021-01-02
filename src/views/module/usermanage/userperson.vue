<template xmlns:el-col="http://www.w3.org/1999/html">
    <div id="userperson">
        <el-form :model="dataForm" :inline="true" :rules="dataRule" ref="dataForm">
        <el-row >
            <el-col :span="12" offset="6">
                <img v-if="dataForm.headImage!=null" src="../img/user_default.png" width="50%">
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="8" :offset="4">
                    <el-form-item label="真实姓名:" prop="realName">
                        <el-input v-model="dataForm.realName"></el-input>
                    </el-form-item>


            </el-col>
            <el-col :span="8" >
                    <el-form-item label="电话:" prop="telephone">
                        <el-input v-model="dataForm.telephone"></el-input>
                    </el-form-item>


            </el-col>
        </el-row>
        <el-row >
            <el-col :span="8" :offset="4">
                    <el-form-item label="性别:" prop="sex">
                        <el-input v-model="dataForm.sex"></el-input>
                    </el-form-item>


            </el-col>
            <el-col :span="8" >
                    <el-form-item label="年龄:" prop="age">
                        <el-input v-model="dataForm.age"></el-input>
                    </el-form-item>


            </el-col>
        </el-row>
        <el-row >
            <el-col :span="8" :offset="4">
                    <el-form-item label="邮箱:" >
                        <el-input v-model="dataForm.email" prop="email"></el-input>
                    </el-form-item>


            </el-col>
            <el-col :span="8" >
                    <el-form-item label="创建时间:" >
                        <el-date-picker v-model="dataForm.createDate" prop="createDate"></el-date-picker>
                    </el-form-item>


            </el-col>
        </el-row>
        </el-form>
        <el-button type="primary" @click="update" style="width: 50%">确定</el-button>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                dataForm: {
                    id: '',
                    realName: "",
                    telephone:"",
                    age: '',
                    sex: '',
                    email: '',
                    headImage: '',
                    createDate:''
                }
            }
        },
        methods: {
            update(){
                console.log(this.dataForm)
                this.$refs['dataForm'].validate((valid) => {
                    const _this = this;
                    if (valid) {
                        if (_this.dataForm.id!=null){
                            axios.put("http://127.0.0.1:8181/userinfo/update",_this.dataForm).then(function (resq) {
                                alert(resq.data)

                            }).catch(function () {
                                alert('404')
                            })
                        }else {
                            axios.post("http://127.0.0.1:8181/userinfo/insert",_this.dataForm).then(function (resq) {
                                alert(resq.data)

                            }).catch(function () {
                                alert('404')
                            })
                        }

                    }
                })
            }

        },
        created: function () {
            const _this = this;
            axios.get("http://127.0.0.1:8181/user/info").then(function (resp) {
                console.log(resp.data)
                if (resp.data!=null&&resp.data!=''){
                    _this.dataForm = resp.data;
                }
                console.log(_this.dataForm);
            }).catch(function (error) {
                alert("404服务器错误")
            });
            console.log(_this.dataForm)
        },
        name: "userperson",
        computed: {
            dataRule() {
                return {
                    account: [
                        {required: true, message: "用户名不能为空", trigger: 'blur'}
                    ],
                    age: [
                        {required: true, message: "年龄不能为空", trigger: 'blur'}
                    ],
                    createTime: [
                        {required: true, message: "创建时间不能为空", trigger: 'blur'}
                    ],
                    telephone: [
                        {required: true, message: "电话不能为空", trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: "邮箱不能为空", trigger: 'blur'}
                    ],
                    realName: [
                        {required: true, message: "真实姓名不能为空", trigger: 'blur'}
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>