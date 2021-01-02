<template>
    <div id="cur">
        <el-row>
            <el-col span="18" offset="3">
                <div id="chart1" style="height: 400px;width: 100%">
                </div>
            </el-col>
        </el-row>
        <el-col :span="24">
            <div class="div-bar" style="text-align: center">
                <a>数据展示</a>
            </div>
        </el-col>
        <el-table
                :data="tableData"
                height="300"
                border
                :row-class-name="rowClassName"
        >
            <el-table-column prop="id" label="序号" width="180"></el-table-column>
            <el-table-column prop="tp" label="温度" header-align="center" align="center"></el-table-column>
            <el-table-column prop="wp" label="湿度" header-align="center" align="center"></el-table-column>
            <el-table-column prop="createDate" label="获取时间" header-align="center" align="center"></el-table-column>
        </el-table>
    </div>

</template>

<script>
    import * as echarts from 'echarts';
    export default {
        data() {
            return{
                tableData: [],
                tData: [],
                wData: [],
                cData: []
            }
        },
        methods: {
            rowClassName({row, rowIndex}) {
                //把每一行的索引放进row.id
                row.id = rowIndex+1;
            },
            creatEchartsBar(id,text,titleData,data1,data2){
                var myChart = this.$echarts.init(document.getElementById(id));
                var option = {
                    backgroundColor: '#fff',
                    title: {
                        text: text,
                        textStyle: {
                            align: 'center',
                            color: '#000',
                            fontSize: 20,
                        },
                        top: '5%',
                        left: 'center',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(0, 255, 233,0)'
                                    }, {
                                        offset: 0.5,
                                        color: 'rgba(255, 255, 255,1)',
                                    }, {
                                        offset: 1,
                                        color: 'rgba(0, 255, 233,0)'
                                    }],
                                    global: false
                                }
                            },
                        },
                    },
                    grid: {
                        top: '15%',
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
                        // containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        axisLine: {
                            show: true
                        },
                        splitArea: {
                            // show: true,
                            color: '#f00',
                            lineStyle: {
                                color: '#f00'
                            },
                        },
                        axisLabel: {
                            color: '#000'
                        },
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false,
                        data:  titleData,

                    }],

                    yAxis: [{
                        type: 'value',
                        min: 0,
                        // max: 140,
                        splitNumber: 4,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgba(255,255,255,0.1)'
                            }
                        },
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                            margin: 20,
                            textStyle: {
                                color: '#d1e6eb',

                            },
                        },
                        axisTick: {
                            show: false,
                        },
                    }],
                    series: [{
                        name: '注册总量',
                        type: 'line',
                        // smooth: true, //是否平滑
                        showAllSymbol: true,
                        // symbol: 'image://./static/images/guang-circle.png',
                        symbol: 'circle',
                        symbolSize: 25,
                        lineStyle: {
                            normal: {
                                color: "#6c50f3",
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 5,
                                shadowOffsetX: 5,
                            },
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#6c50f3',
                            }
                        },
                        itemStyle: {
                            color: "#6c50f3",
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 2,
                            shadowOffsetX: 2,
                        },
                        tooltip: {
                            show: false
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(108,80,243,0.3)'
                                },
                                    {
                                        offset: 1,
                                        color: 'rgba(108,80,243,0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(108,80,243, 0.9)',
                                shadowBlur: 20
                            }
                        },
                        data: data1
                    },
                        {
                            name: '注册总量',
                            type: 'line',
                            // smooth: true, //是否平滑
                            showAllSymbol: true,
                            // symbol: 'image://./static/images/guang-circle.png',
                            symbol: 'circle',
                            symbolSize: 25,
                            lineStyle: {
                                normal: {
                                    color: "#00ca95",
                                    shadowColor: 'rgba(0, 0, 0, .3)',
                                    shadowBlur: 0,
                                    shadowOffsetY: 5,
                                    shadowOffsetX: 5,
                                },
                            },
                            label: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#00ca95',
                                }
                            },

                            itemStyle: {
                                color: "#00ca95",
                                borderColor: "#fff",
                                borderWidth: 3,
                                shadowColor: 'rgba(0, 0, 0, .3)',
                                shadowBlur: 0,
                                shadowOffsetY: 2,
                                shadowOffsetX: 2,
                            },
                            tooltip: {
                                show: false
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgba(0,202,149,0.3)'
                                    },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,202,149,0)'
                                        }
                                    ], false),
                                    shadowColor: 'rgba(0,202,149, 0.9)',
                                    shadowBlur: 20
                                }
                            },
                            data: data2,
                        },
                    ]
                };
                myChart.setOption(option);

            }
        },
        mounted() {
            const _this = this;
            let tdata = [];
            let wdata = [];
            let cdata = [];
            axios.get("http://127.0.0.1:8181/tw/finAll").then(function (resq) {
                console.log(resq.data)
                 _this.tableData  = resq.data.data;
                 _this.tData = resq.data.tData
                 _this.wData = resq.data.wData;
                 _this.cData = resq.data.cData;
                 cdata = resq.data.cData;
                 tdata = resq.data.tData.map(Number);
                 wdata = resq.data.wData.map(Number);
                _this.creatEchartsBar("chart1","温湿度实时信息",cdata,tdata, wdata);
            })
            console.log(tdata)
        },
        name: "currentcheck"
    }
</script>

<style>
    /*#cur{*/
    /*    background-color: #080b30;*/
    /*}*/
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