<template>
    <div id="cur">
        <el-row>
            <el-col span="12">
                <div id="chart1" style="height: 400px;width: 100%">
                </div>
            </el-col>
            <el-col span="12">
                <div id="chart2" style="height: 400px;width: 100%">
                </div>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                height="300"
                border
                :row-class-name="rowClassName"
        >
            <el-table-column prop="id" label="序号" width="180"></el-table-column>
            <el-table-column prop="account" label="温度" header-align="center" align="center"></el-table-column>
            <el-table-column prop="account" label="湿度" header-align="center" align="center"></el-table-column>
            <el-table-column prop="loginTime" label="获取时间" header-align="center" align="center"></el-table-column>
        </el-table>
    </div>

</template>

<script>
    import * as echarts from 'echarts';
    export default {
        data() {
            return{
                tableData: []
            }
        },
        methods: {
            rowClassName({row, rowIndex}) {
                //把每一行的索引放进row.id
                row.id = rowIndex+1;
            },
            creatEchartsBar(id,text){
                var myChart = this.$echarts.init(document.getElementById(id));
                var dataArr = 44;
                var colorSet = {
                    color: '#468EFD'
                };
                var option = {
                    backgroundColor: '#fff',
                    tooltip: {
                        formatter: "{a} <br/>{b} : {c}%"
                    },

                    series: [{
                        name: "内部进度条",
                        type: "gauge",
                        // center: ['20%', '50%'],
                        radius: '40%',

                        splitNumber: 10,
                        axisLine: {
                            lineStyle: {
                                color: [
                                    [dataArr / 100, colorSet.color],
                                    [1, "#111F42"]
                                ],
                                width: 8
                            }
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,

                        },
                        splitLine: {
                            show: false,
                        },
                        itemStyle: {
                            show: false,
                        },
                        detail: {
                            formatter: function(value) {
                                if (value !== 0) {
                                    var num = Math.round(value ) ;
                                    return parseInt(num).toFixed(0)+"%";
                                } else {
                                    return 0;
                                }
                            },
                            offsetCenter: [0, 82],
                            textStyle: {
                                padding: [0, 0, 0, 0],
                                fontSize: 18,
                                fontWeight: '700',
                                color: colorSet.color
                            }
                        },
                        title: { //标题
                            show: true,
                            offsetCenter: [0, 46], // x, y，单位px
                            textStyle: {
                                color: "#fff",
                                fontSize: 14, //表盘上的标题文字大小
                                fontWeight: 400,
                                fontFamily: 'PingFangSC'
                            }
                        },
                        data: [{
                            name: text,
                            value: dataArr,
                        }],
                        pointer: {
                            show: true,
                            length: '75%',
                            radius: '20%',
                            width: 10, //指针粗细
                        },
                        animationDuration: 4000,
                    },
                        {
                            name: '外部刻度',
                            type: 'gauge',
                            //  center: ['20%', '50%'],
                            radius: '50%',
                            min: 0, //最小刻度
                            max: 100, //最大刻度
                            splitNumber: 10, //刻度数量
                            startAngle: 225,
                            endAngle: -45,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    width: 1,
                                    color: [
                                        [1, 'rgba(0,0,0,0)']
                                    ]
                                }
                            }, //仪表盘轴线
                            axisLabel: {
                                show: true,
                                color: '#4d5bd1',
                                distance: 25,
                                formatter: function(v) {
                                    switch (v + '') {
                                        case '0':
                                            return '0';
                                        case '10':
                                            return '10';
                                        case '20':
                                            return '20';
                                        case '30':
                                            return '30';
                                        case '40':
                                            return '40';
                                        case '50':
                                            return '50';
                                        case '60':
                                            return '60';
                                        case '70':
                                            return '70';
                                        case '80':
                                            return '80';
                                        case '90':
                                            return '90';
                                        case '100':
                                            return '100';
                                    }
                                }
                            }, //刻度标签。
                            axisTick: {
                                show: true,
                                splitNumber: 7,
                                lineStyle: {
                                    color: colorSet.color, //用颜色渐变函数不起作用
                                    width: 1,
                                },
                                length: -8
                            }, //刻度样式
                            splitLine: {
                                show: true,
                                length: -20,
                                lineStyle: {
                                    color: colorSet.color, //用颜色渐变函数不起作用
                                }
                            }, //分隔线样式
                            detail: {
                                show: false
                            },
                            pointer: {
                                show: false
                            }
                        },
                    ]
                };
                myChart.setOption(option);

            }
        },
        mounted() {
            this.creatEchartsBar("chart1","温度异常信息");
            this.creatEchartsBar("chart2","湿度异常信息");
        },
        name: "analysis"
    }
</script>

<style>
    /*#cur{*/
    /*    background-color: #080b30;*/
    /*}*/

</style>