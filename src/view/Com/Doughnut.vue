<template>
    <div class="chart-wrp">
        <canvas class="doughnut" id="myChart" width="260" height="360"></canvas>
    </div>
</template>
<style lang="scss">
    .chart-wrp{
        position: relative;
        padding: 1rem 2rem;
        .doughnut{
            width: 100%;
        }
    }

</style>
<script>
    export default{
        props:{
            doughnutData:Object
        },
        data(){
            return{
                msg:'doughnut',
                // doughnutChart:Object,
            }
        },
        watch:{
            doughnutData:function () {
               this.refresh()
            }
        },
        methods:{  
            refresh:function () {
                var ctx = this.$el.querySelector('canvas')

                var doughnutChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: this.doughnutData,
                    options: {
                        scales:{
                            height:800
                        }
    //                    animation:{
    //                        animateScale:true
    //                    }
                    }
                });
            }
        },
        mounted:function () {
            this.refresh()
            // var data = {
            //     labels: [
            //         "到",
            //         "未",
            //         "假"
            //     ],
            //     datasets: [
            //         {
            //             data: [4, 1, 1],
            //             backgroundColor: [
            //                 "#6EE8AF",
            //                 "#F76969",
            //                 "#F8B62D"
            //             ],
            //             hoverBackgroundColor: [
            //                 "#6EE8AF",
            //                 "#F76969",
            //                 "#F8B62D"
            //             ]
            //         }]
            // };
//             var ctx = this.$el.querySelector('canvas')

//             doughnutChart = new Chart(ctx, {
//                 type: 'doughnut',
//                 data: data,
//                 options: {
//                     scales:{
//                         height:800
//                     }
// //                    animation:{
// //                        animateScale:true
// //                    }
//                 }
//             });
        },
        components:{

        }
    }
</script>
