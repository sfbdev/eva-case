<template>
  <div class="sales-list">
    <div class="chart-container p-3">
      <div class="flex items-center justify-between">
        <span class="text-2xl font-bold">Daily Sales</span>
        <div class="border border-gray-400 rounded-md p-2 px-4">
          <select id="country" v-model="selectedDay" @change="getChartData">
            <option value="7">Last 7 Days</option>
            <option value="14">Last 14 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="60">Last 60 Days</option>
          </select>
        </div>
      </div>
      <highcharts :options="chartOptions" ref="myChart" />
    </div>
    <div class="table-container" v-if="items.length">
      <a-table
        :dataSource="items"
        :columns="columns"
        :row-key="(record) => record.sku"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #index="{ index }">
          {{ ++index }}
        </template>
        <template #customInfo="{ record }">
          <span class="font-bold text-sky-500"> {{ record.totalOrderCount }} </span> /
          <span class="font-bold text-primary-500"> {{ record.qty }} </span> /
          <span class="font-bold text-orange-500"> {{ record.amount }} </span>
        </template>
        <template #refundRate="{ record }">
          <span class="font-bold"> {{ record.refundRate }}% </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailySalesList',
  data() {
    return {
      selectedDay: 7,
      activeData: null,
      showTable: false,
      pagination: { total: 1000, current: 1, pageSize: 1000 },
      loading: false,
      skuRefund: [],
      chartOptions: {
        title: {
          text: '',
        },
        chart: {
          type: 'column',
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            point: {
              events: {
                click: (e) => {
                  this.getTableData(e, this.pagination)
                  this.activeData = e
                },
              },
            },
          },
          allowPointSelect: true,
          series: {},
        },

        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray',
          },
        },

        yAxis: {
          title: {
            text: 'Amount $',
          },
        },
        tooltip: {
          pointFormatter: function () {
            return `
            Total Sales: ${this.totalSales}<br>
            Profit: ${this.profit}<br>
            Shipping: ${this.shipping} <br>
            FBA Sales: ${this.fbmSales}<br>
            FBM Sales: ${this.fbaSales}
          `
          },
        },
      },
      items: [],
      columns: [
        {
          dataIndex: 'index',
          width: 50,
          fixed: 'left',
          slots: { customRender: 'index' },
        },
        {
          title: 'SKU',
          dataIndex: 'sku',
          key: 'sku',
          width: 250,
        },
        {
          title: 'Product Name',
          dataIndex: 'productName',
          key: 'productName',
        },
        {
          title: 'Sales / Units / Avg Selling Price',
          dataIndex: 'info',
          slots: { customRender: 'customInfo' },
          width: 300,
        },
        {
          title: 'SKU Refund Rate (last 60 days)',
          dataIndex: 'refundRate',
          slots: { customRender: 'refundRate' },
        },
      ],
    }
  },
  mounted() {
    this.getChartData()
  },
  methods: {
    getChartData() {
      this.$store.dispatch('data/getDailySalesOverview', this.selectedDay).then((response) => {
        this.chartData = response?.item
        this.chartOptions.series = [
          {
            name: 'Profit',
            data: response.item?.map((item) => ({
              y: item.profit,
              totalSales: item.fbaAmount + item.fbmAmount,
              profit: item.profit,
              shipping: item.shippingAmount,
              fbmSales: item.fbmAmount,
              fbaSales: item.fbaAmount,
            })),
            stack: 'total',
          },
          {
            name: 'FBA Amount',
            data: response.item?.map((item) => ({
              y: item.fbaAmount,
              totalSales: item.fbaAmount + item.fbmAmount,
              profit: item.profit,
              shipping: item.shippingAmount,
              fbmSales: item.fbmAmount,
              fbaSales: item.fbaAmount,
            })),
            stack: 'total',
          },
          {
            name: 'FBM Amount',
            data: response.item?.map((item) => ({
              y: item.fbmAmount,
              totalSales: item.fbaAmount + item.fbmAmount,
              profit: item.profit,
              shipping: item.shippingAmount,
              fbmSales: item.fbmAmount,
              fbaSales: item.fbaAmount,
            })),
            stack: 'total',
          },
        ]
        this.chartOptions.xAxis = {
          scrollbar: {
            enabled: true,
          },
          crosshair: true,
          labels: {
            step: 1,
          },
          categories: response.item?.map((item) => item.date),
          title: {
            text: 'Date',
          },
        }
      })
    },
    getTableData(e, pagination) {
      this.loading = true
      this.$store
        .dispatch('data/getDailySalesSkuList', { ...e.point, pagination })
        .then((skuListResponse) => {
          console.log('skuListResponse', skuListResponse)
          this.items = skuListResponse.item.skuList
          this.pagination.total = this.items.length

          const skuList = this.items.map((item) => item.sku)
          this.$store.dispatch('data/getSkuRefundRate', skuList).then((skuRefundResponse) => {
            this.skuRefund = skuRefundResponse
            this.items = this.items.map((item) => {
              const refundData = skuRefundResponse.find((refund) => refund.sku === item.sku)
              return refundData ? { ...item, ...refundData } : item
            })
          })
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleTableChange(pag) {
      this.getTableData(this.activeData, pag)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>