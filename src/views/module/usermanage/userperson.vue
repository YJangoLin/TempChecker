<template xmlns:el-col="http://www.w3.org/1999/html">
    <div id="userperson">
        <el-row >
            <el-col :span="12" offset="6">
                <img v-if="dataForm.headImage!=null" src="../img/user_default.png" width="50%">
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="8" :offset="4">
                <el-form :model="dataForm" :inline="true">
                    <el-form-item label="真实姓名:" >
                        <el-input v-model="dataForm.realName" disabled></el-input>
                    </el-form-item>
                </el-form>


            </el-col>
            <el-col :span="8" >
                <el-form :model="dataForm" :inline="true">
                    <el-form-item label="电话:" >
                        <el-input v-model="dataForm.telephone" disabled></el-input>
                    </el-form-item>
                </el-form>


            </el-col>
        </el-row>
        <el-row >
            <el-col :span="8" :offset="4">
                <el-form :model="dataForm" :inline="true">
                    <el-form-item label="性别:" >
                        <el-input v-model="dataForm.sex" disabled></el-input>
                    </el-form-item>
                </el-form>


            </el-col>
            <el-col :span="8" >
                <el-form :model="dataForm" :inline="true">
                    <el-form-item label="年龄:" >
                        <el-input v-model="dataForm.age" disabled></el-input>
                    </el-form-item>
                </el-form>


            </el-col>
        </el-row>
        <el-row >
            <el-col :span="8" :offset="4">
                <el-form :model="dataForm" :inline="true">
                    <el-form-item label="邮箱:" >
                        <el-input v-model="dataForm.email" disabled></el-input>
                    </el-form-item>
                </el-form>


            </el-col>
            <el-col :span="8" >
                <el-form :model="dataForm" :inline="true">
                    <el-form-item label="创建时间:" >
                        <el-input v-model="dataForm.createDate" disabled></el-input>
                    </el-form-item>
                </el-form>


            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                dataForm: []
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
        name: "userperson"
    }
</script>

<style scoped>

</style>