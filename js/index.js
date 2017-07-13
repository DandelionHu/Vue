var shopping=new Vue({
    el:'#app',
    data:{
        productLists:[],
        totalMoney:0,
        checkall:false,
        deleteFlag:false,
        deleteProduct:'',
    },
    filters:{//局部过滤器
        Money:function (value,type) {
            return "$"+value+type;
        }
    },
    components:{//注册局部组件

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
                //Vue.set(item,"checked",true);//全局注册
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
        },
        checkAll:function () {
            var _this=this;
            _this.checkall=!_this.checkall;
            if(_this.checkall){
                _this.productLists.forEach(function (value,index) {
                    if(!value.checked){
                        _this.checked(value);
                    }else{
                        value.checked=true;
                    }
                })
            }else{
                _this.productLists.forEach(function (value,index) {
                    value.checked=false;
                })
            }
            this.calcTotalPrice();

        },
        deletePro:function (item) {
            this.deleteFlag=!this.deleteFlag;
            this.deleteProduct=item;
        },
        cacel:function () {
            this.deleteFlag=!this.deleteFlag;
        },
        sure:function () {
            var index=this.productLists.indexOf(this.deleteProduct);
            this.productLists.splice(index,1);//删除
            this.deleteFlag=!this.deleteFlag;
            this.calcTotalPrice();
        }
    }
});

// Vue.filter({});//全局过滤器
// Vue.component({});//全局组件
// Vue.filter("Money",function (value,type) {
//     return "$"+value+type;
// })