/**
 * Created by Administrator on 2017/7/13.
 */
new Vue({
    el:'.container',
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1
    },
    mounted:function () {
        this.$nextTick(function(){
            this.$http.get("data/address.json").then(function (response) {
                //成功的回调
                this.addressList=JSON.parse(response.bodyText).result;

            },function (response) {
                //失败的回调

            });
        });
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);//splice
        }
    },
    methods:{
        loadMore:function () {
            this.limitNum=this.addressList.length;
        },
        setDefault:function (item) {
            this.addressList.forEach(function (value,index) {
                if(value==item){
                    value.isDefault=true;
                }else{
                    value.isDefault=false;
                }
            })
        }
    }
})