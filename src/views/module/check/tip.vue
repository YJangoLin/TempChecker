<template>
    <div id="nap">
        <el-col :span="24">
            <div class="div-bar" style="text-align: left">
                <a>数据指标</a>
            </div>
        </el-col>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple dataInfo"><span>平均温度</span><br>{{info.avgTp}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple dataInfo"><span>平均湿度</span><br>{{info.avgWp}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple dataInfo"><span>当前温度</span><br>{{info.curTp}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple dataInfo"><span>当前湿度</span><br>{{info.curWp}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple dataInfo"><span>最大温度</span><br>{{info.maxTp}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple dataInfo"><span>最小温度</span><br>{{info.minTp}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple dataInfo"><span>最大湿度</span><br>{{info.maxWp}}</div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple dataInfo"><span>最小湿度</span><br>{{info.minWp}}</div></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8" :offset="4"><div class="grid-content bg-purple dataInfo"><span>温差</span><br>{{info.disTp}}</div></el-col>
            <el-col :span="8" :offset="4"><div class="grid-content bg-purple dataInfo"><span>湿度差</span><br>{{info.disWp}}</div></el-col>
        </el-row>
        <el-col :span="24">
            <div class="div-bar" style="text-align: left">
                <a>温馨提示</a>
            </div>
        </el-col>
        <div id="tip">
            {{info.tip}}
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                info : {
                    avgTp: "",
                    avgWp: "",
                    curTp:"",
                    curWp:"",
                    disWp:"",
                    disTp:"",
                    minTp:"",
                    maxTp:"",
                    minWp:"",
                    maxWp:"",
                    tip: ""
                }
            }

        },
        name: "tip",
        mounted: function () {
            const _this = this;
            axios.get("http://127.0.0.1:8181/tw/info").then(function (resq) {
                console.log(resq.data)
                _this.info = resq.data;
            })
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .dataInfo{
        height: 100px;
        font-size: 35px;
    }
    .dataInfo span{
        font-size: 20px;
        /*line-height: 72px;*/
    }
    #tip{
        font-size: 20px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        text-align: left;
    }
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