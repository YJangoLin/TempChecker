<template>
    <div id="charts" style="background-color: #0e2147;">
        <el-row>
            <el-col :span="18"><div id="chart1" style="width: 100%;height: 500px"></div></el-col>
            <el-col :span="6"><div id="chart2" style="width: 100%;height: 250px"></div></el-col>
            <el-col :span="6"><div id="chart3" style="width: 100%;height: 250px"></div></el-col>
        </el-row>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    export default {
        data(){
            return{
                cData: [],
                tData: [],
                wData: [],
                curData: []
            }
        },
        name: "viewchart",
        methods:{
            createEcharts(id, cdata, tdata, wdata ) {
                var mycharts = this.$echarts.init(document.getElementById(id));
                var xData = cdata
                var lineData = [100, 100, 100, 100, 100, 100, 100]
                var lastYearData = tdata;
                var thisYearData = wdata;
                var timeLineData = [1];
                let legend=['温度', '湿度'];
                var background = "#0e2147"; //背景
                let textColor = "#fff";
                let lineColor="rgba(255,255,255,0.2)";
                let colors = [{
                    borderColor: "rgba(227,161,96,1)",
                    start: "rgba(227,161,96,0.8)",
                    end: "rgba(227,161,96,0.3)"
                },
                    {
                        borderColor: "rgba(0,222,255,1)",
                        start: "rgba(0,222,255,0.3)",
                        end: "rgba(0,222,255,0.8)"
                    },
                ];
                let borderData = [];
                let scale = 2;
                borderData = xData.map(item => {
                    return scale;
                });
                var option = {
                    baseOption: {
                        backgroundColor: background,
                        timeline: {
                            show: false,
                            top: 0,
                            data: []
                        },
                        legend: {
                            top: '5%',
                            right: '5%',
                            itemWidth: 20,
                            itemHeight: 5,
                            // itemGap: 343,
                            icon: 'horizontal',
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 20,
                            },
                            data: legend
                        },
                        grid: [{
                            show: false,
                            left: '5%',
                            top: '10%',
                            bottom: '8%',
                            containLabel: true,
                            width: '37%'
                        }, {
                            show: false,
                            left: '51%',
                            top: '10%',
                            bottom: '8%',
                            width: '0%'
                        }, {
                            show: false,
                            right: '2%',
                            top: '10%',
                            bottom: '8%',
                            containLabel: true,
                            width: '37%'
                        }],
                        xAxis: [{
                            type: 'value',
                            inverse: true,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            position: 'top',
                            axisLabel: {
                                show: true,
                                color: textColor
                            },
                            splitLine:{
                                show: true,
                                lineStyle:{
                                    color:lineColor
                                }
                            },
                        }, {
                            gridIndex: 1,
                            show: false
                        }, {
                            gridIndex: 2,
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            position: 'top',
                            axisLabel: {
                                show: true,
                                color: textColor
                            },
                            splitLine:{
                                show: true,
                                lineStyle:{
                                    color:lineColor
                                }
                            },
                        }],
                        yAxis: [{
                            type: 'category',
                            inverse: true,
                            position: 'right',
                            axisLine: {
                                show: true,
                                lineStyle:{
                                    color:lineColor
                                }
                            },

                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            data: xData
                        }, {
                            gridIndex: 1,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: true,
                                padding:[30,0,0,0],
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 20
                                },
                                align: "center"

                            },
                            data: xData.map(function(value) {
                                return {
                                    value: value,
                                    textStyle: {
                                        align: 'center'
                                    }
                                }
                            })
                        }, {
                            gridIndex: 2,
                            type: 'category',
                            inverse: true,
                            position: 'left',
                            axisLine: {
                                show: true,
                                lineStyle:{
                                    color:lineColor
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false

                            },
                            data: xData
                        }],
                        series: []

                    },
                    options: []
                }

                option.baseOption.timeline.data.push(timeLineData[0])
                option.options.push({
                    series: [{
                        name: "温度",
                        type: "bar",
                        barWidth: 25,
                        stack: "1",
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: colors[0].start
                                },
                                    {
                                        offset: 1,
                                        color: colors[0].end
                                    }
                                ]),
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        data: lastYearData,
                        animationEasing: "elasticOut"
                    },
                        {
                            name: "温度",
                            type: "bar",
                            barWidth: 25,
                            stack: "1",
                            itemStyle: {
                                normal: {
                                    color: colors[0].borderColor

                                }
                            },
                            data: borderData
                        },
                        {
                            name: "湿度",
                            type: "bar",
                            stack: "2",
                            barWidth: 25,
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                        offset: 0,
                                        color: colors[1].start
                                    },
                                        {
                                            offset: 1,
                                            color: colors[1].end
                                        }
                                    ]),
                                }
                            },
                            label: {
                                normal: {
                                    show: false,
                                }
                            },
                            data: thisYearData,
                            animationEasing: "elasticOut"
                        },
                        {
                            name: "湿度",
                            type: "bar",
                            xAxisIndex: 2,
                            yAxisIndex: 2,
                            barWidth: 25,
                            stack: "2",
                            itemStyle: {
                                normal: {
                                    color: colors[1].borderColor

                                }
                            },
                            data: borderData
                        },
                    ]
                });
                mycharts.setOption(option);
            },
            createCurTp(id, text,data1) {
                var mycharts1 = this.$echarts.init(document.getElementById(id));
                var value = 0.2;
                var data = [value, value, value, ];
                var  getvalue=[ data1 ];

                var option = {
                    title: {
                        text: getvalue+'℃',
                        textStyle: {
                            color: '#28BCFE',
                            fontSize: 20
                        },
                        subtext: text,
                        subtextStyle: {
                            color: '#666666',
                            fontSize: 12
                        },
                        itemGap: 20,
                        left: 'center',
                        top: '43%'
                    },
                    tooltip: {
                        formatter: function (params) {
                            return '<span style="color: #fff;">湿度： '+ getvalue + '℃</span>';
                        }
                    },
                    angleAxis: {
                        max: 100,
                        clockwise: true, // 逆时针
                        // 隐藏刻度线
                        show: false
                    },
                    radiusAxis: {
                        type: 'category',
                        show: true,
                        axisLabel: {
                            show: false,
                        },
                        axisLine: {
                            show: false,

                        },
                        axisTick: {
                            show: false
                        },
                    },
                    polar: {
                        center: ['50%', '50%'],
                        radius: '100%' //图形大小
                    },
                    series: [{
                        type: 'bar',
                        data: getvalue,
                        showBackground: true,
                        backgroundStyle: {
                            color: '#BDEBFF',
                        },
                        coordinateSystem: 'polar',
                        roundCap: true,
                        barWidth: 25,
                        itemStyle: {
                            normal: {
                                opacity: 1,
                                color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#25BFFF'
                                }, {
                                    offset: 1,
                                    color: '#5284DE'
                                }]),
                                shadowBlur: 5,
                                shadowColor: '#2A95F9',
                            }
                        },
                    }]
                };
                mycharts1.setOption(option);
            },
            createCurTp1(id, text,data1) {
        var mycharts1 = this.$echarts.init(document.getElementById(id));
        var value = 0.2;
        var data = [value, value, value, ];
        var  getvalue=[ data1 ];

        var option = {
            title: {
                text: getvalue+'℃',
                textStyle: {
                    color: '#c93756',
                    fontSize: 20
                },
                subtext: text,
                subtextStyle: {
                    color: '#666666',
                    fontSize: 12
                },
                itemGap: 20,
                left: 'center',
                top: '43%'
            },
            tooltip: {
                formatter: function (params) {
                    return '<span style="color: #fff;">温度：'+ getvalue + '%</span>';
                }
            },
            angleAxis: {
                max: 50,
                clockwise: true, // 逆时针
                // 隐藏刻度线
                show: false
            },
            radiusAxis: {
                type: 'category',
                show: true,
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: false,

                },
                axisTick: {
                    show: false
                },
            },
            polar: {
                center: ['50%', '50%'],
                radius: '100%' //图形大小
            },
            series: [{
                type: 'bar',
                data: getvalue,
                showBackground: true,
                backgroundStyle: {
                    color: '#BDEBFF',
                },
                coordinateSystem: 'polar',
                roundCap: true,
                barWidth: 25,
                itemStyle: {
                    normal: {
                        opacity: 1,
                        color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#ff4777'
                        }, {
                            offset: 1,
                            color: '#f00056'
                        }]),
                        shadowBlur: 5,
                        shadowColor: '#f20c00',
                    }
                },
            }]
        };
        mycharts1.setOption(option);
    }
        },

        mounted: function () {
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
                cdata = resq.data.cData.slice(0,7);
                tdata = resq.data.tData.map(Number).slice(0,7);
                wdata = resq.data.wData.map(Number).slice(0,7);
                for(var i = 0; i< cdata.length;i++){
                    cdata[i] = cdata[i].substr(0,10);
                }
                _this.createEcharts('chart1',cdata,tdata, wdata);
            });
            axios.get("http://127.0.0.1:8181/tw/findLast").then(function (resq) {
                _this.curData = [resq.data.tp ,resq.data.wp]
                _this.createCurTp1("chart2",'当前温度',resq.data.tp);
                _this.createCurTp("chart3",'当前湿度',100*resq.data.wp)
            })
        }
    }
</script>

<style >
    #charts{
        background-color: #0e2147;
    }
</style>