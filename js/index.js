var shopping=new Vue({
    el:'#app',
    data:{
        productLists:[],
        totalMoney:0,
    },
    components:{

    },
    mounted:function () {
        this.$nextTick(function () {
            this.$http.get("data/data.json").then(function (response) {
                //成功的回调
                this.productLists=JSON.parse(response.bodyText).result.list;

            },function (response) {
                //失败的回调

            });
            //ES6写法
            // this.$http.get("",[options]).then((response)=>{
            //     //成功的回调
            //
            // },(response)=> {
            //     //失败的回调
            //
            // });
        })
    },
    methods:{
        changeQuantity:function (item,type) {
            if(type==0){
                if(item.productQuantity<2){
                    return false;
                }else{
                    item.productQuantity--;
                    this.calcTotalPrice();
                }

            }else if(type==1){
                item.productQuantity++;
                this.calcTotalPrice();
            }

        },
        checked:function (item) {
            if(!item.checked){
                this.$set(item,"checked",true);//局部注册
                this.calcTotalPrice();
            }else {
                item.checked = !item.checked;
                this.calcTotalPrice();
            }
        },
        calcTotalPrice:function () {
            var _this=this;
            _this.totalMoney=0;
            _this.productLists.forEach(function (item,index) {
                if(item.checked){
                    _this.totalMoney+=item.productPrice*item.productQuantity;
                }
            })
        }
    }
})