<template>
    <div class="xsje">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售金额</span>
            </div>
            <div class="text item">
                <ve-line :data="chartData" :settings="chartSettings" :tooltip="{type:''}"></ve-line>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "xsje",
        data(){
            this.chartSettings = {
                axisSite: { left: ['销售额'] },
            };
            return{
                chartData: {
                    columns: ['日期', '销售额'],
                    rows: [
                        { '日期': '1月', '销售额': 1393},
                        { '日期': '2月', '销售额': 3530},
                        { '日期': '3月', '销售额': 2923},
                        { '日期': '4月', '销售额': 1723},
                        { '日期': '5月', '销售额': 3792},
                        { '日期': '6月', '销售额': 2675},
                        { '日期': '7月', '销售额': 167}
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>