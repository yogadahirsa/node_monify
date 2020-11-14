<template>
    <div>
        <div class="row">
            <div class="col">
                <div id="container" style="width:50%; height:400px;"></div>
            </div>
            <div class="col">
                <div id="containerSpending" style="width:50%; height:400px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
import DataService from '@/services/DataService'
import _ from 'lodash'

var Highcharts = require('highcharts')
require('highcharts/modules/exporting')(Highcharts)

export default {
    data() {
        return {
            dataSalary: [],
            cat: [],
            amount: [],
            dataSpending: [],
            seriesSpending: [],
        }
    },
    methods: {
        async getAllSalary () {
            try {
                const response = await DataService.getAllSalary()
                // console.log(response.data.result)
                this.dataSalary = response.data.result
                this.loadData(this.dataSalary)
            } catch (error) {
                this.error = error.response.data.error
            }
        },
        async getAllSpending () {
            try {
                const response = await DataService.getAllSpending()
                // console.log(response.data.result)
                this.dataSpending = response.data.result
                this.loadDataSpending(this.dataSpending)
            } catch (error) {
                this.error = error.response.data.error
            }
        },
        loadData(d) {
            var i;
            for (i in d) {
                // console.log(d[i].amount)
                this.cat.push(this.pad(d[i].month, 2)+'-'+d[i].year)
                this.amount.push(d[i].amount)
            }
            this.loadChart()
        },
        loadDataSpending(d) {
            var uniq_cat = _.uniq(_.map(d, 'category'))
            var i
            // console.log(d)
            for (i in uniq_cat) {
                var temp = {}
                temp['name'] = uniq_cat[i]

                var filter_by_cat = _.filter(d, ['category', uniq_cat[i]])
                temp['data'] = _.map(filter_by_cat, 'amount')
                
                // console.log(filter_by_cat)
                // console.log('-------------------------------------')
                this.seriesSpending.push(temp)
            }
            // console.log(this.seriesSpending)
            console.log(this.cat)
            this.loadChartSpending()
        },
        loadChart() {
            Highcharts.chart('container', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Salary'
                },
                xAxis: {
                    categories: this.cat
                },
                yAxis: {
                    title: {
                        text: 'Amount'
                    }
                },
                series: [{
                    name: 'Salary',
                    data: this.amount
                }]
            });
        },
        loadChartSpending() {
            Highcharts.chart('containerSpending', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Spending'
                },
                xAxis: {
                    categories: ['2018','2019','2020']
                },
                yAxis: {
                    title: {
                        text: 'Amount'
                    }
                },
                series: this.seriesSpending
            });
        },
        pad(num, size) {
            num = num.toString();
            while (num.length < size) num = "0" + num
            return num
        }
    },
    mounted() {
        this.getAllSalary()
        this.getAllSpending()
    }
}
</script>