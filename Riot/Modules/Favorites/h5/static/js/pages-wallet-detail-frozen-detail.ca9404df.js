(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wallet-detail-frozen-detail"],{"0629":function(t,e,a){t.exports=a.p+"static/img/bg3.30cc32c9.png"},"163e":function(t,e,a){"use strict";var i=a("8ba6"),n=a.n(i);n.a},2451:function(t,e,a){"use strict";a("7a82");var i=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(a("c7eb")),l=i(a("1da1"));a("a9e3");var o=a("8971"),d=i(a("f04c")),r={data:function(){return{rewardFrozen:this.$t("tdex.frozen.rewardFrozen"),frozenAmount:this.$t("tdex.frozen.frozenAmount"),releaseAmount:this.$t("tdex.frozen.releaseAmount"),remainingFrozen:this.$t("tdex.frozen.remainingFrozen"),createTime:this.$t("tdex.frozen.createTime"),id:"",type:"",rewardAmount:this.$t("tdex.walletDetail.rewardAmount"),getComputerPower:this.$t("tdex.walletDetail.getComputerPower"),payment:this.$t("tdex.walletDetail.payment"),collection:this.$t("tdex.walletDetail.collection"),recharge:this.$t("tdex.walletDetail.recharge"),withdrawal:this.$t("tdex.walletDetail.withdrawal"),increaseComputingPower:this.$t("tdex.walletDetail.increaseComputingPower"),income:this.$t("tdex.walletDetail.income"),computerPower:this.$t("tdex.walletDetail.computerPower"),burning:this.$t("tdex.walletDetail.burning"),date:this.$t("tdex.walletDetail.date"),amount:this.$t("tdex.walletDetail.amount"),recipient:this.$t("tdex.walletDetail.recipient"),drawee:this.$t("tdex.walletDetail.drawee"),statusShow:this.$t("tdex.walletDetail.status"),rechargeAmount:this.$t("tdex.walletDetail.rechargeAmount"),rechargeAddress:this.$t("tdex.walletDetail.rechargeAddress"),totalWithdrawal:this.$t("tdex.walletDetail.totalWithdrawal"),withdrawalAddress:this.$t("tdex.walletDetail.withdrawalAddress"),Txid:this.$t("tdex.walletDetail.Txid"),totalRevenueToday:this.$t("tdex.walletDetail.totalRevenueToday"),todayTotalComputingPower:this.$t("tdex.walletDetail.todayTotalComputingPower"),capacityCalculationForce:this.$t("tdex.walletDetail.capacityCalculationForce"),capacityCalculationIncome:this.$t("tdex.walletDetail.capacityCalculationIncome"),basicIncome:this.$t("tdex.walletDetail.basicIncome"),fixedIncome:this.$t("tdex.walletDetail.fixedIncome"),rewardIncome:this.$t("tdex.walletDetail.rewardIncome"),communityComputingPower:this.$t("tdex.walletDetail.communityComputingPower"),communityComputingIncome:this.$t("tdex.walletDetail.communityComputingIncome"),rewardTitle7:this.$t("tdex.walletDetail.rewardTitle7"),rewardTitle8:this.$t("tdex.walletDetail.rewardTitle8"),rewardTitle9:this.$t("tdex.walletDetail.rewardTitle9"),rewardTitle10:this.$t("tdex.walletDetail.rewardTitle10"),rewardTitle11:this.$t("tdex.walletDetail.rewardTitle11"),totalPower:"",totalProfit:"",capacityPower:"",capacityPowerProfit:"",baseProfit:"",fixedProfit:"",rewardProfit:"",communityPower:"",communityPowerProfit:"",created_at:"",amout:"",touser:"",fromuser:"",txstatus:"",status:"",toAddress:"",txid:"",txidShow:"",power:"",address:"",startTime:"",endTime:"",startDate:this.$t("tdex.walletDetail.startDate"),endDate:this.$t("tdex.walletDetail.endDate"),detailData:null,title:this.$t("tdex.frozen.detail")}},filters:{numFilter:function(t){return Number(t).toFixed(4)}},onLoad:function(t){t&&(this.type=t.type||"",this.id=t.id||"",console.log(t)),this.getBalanceLockDetail()},computed:{icon:function(){var t="static/images/detail/icon4.png";switch(this.type){case"6":t="static/images/detail/icon4.png";break;case"1":t="static/images/detail/icon5.png";break;case"1-1":t="static/images/detail/icon5.png";break;case"2":t="static/images/detail/icon2.png";break;case"2-1":t="static/images/detail/icon2.png";break;case"5":t="static/images/detail/icon1.png";break;case"3":t="static/images/detail/icon2.png";break;case"4":t="static/images/detail/icon3.png"}return t},title:function(){var t="";switch(this.type){case"6":t=this.income;break;case"1":t=this.recharge;break;case"1-1":t=this.recharge;break;case"2":t=this.withdrawal;break;case"2-1":t=this.withdrawal;break;case"5":t=this.getComputerPower;break;case"3":t=this.payment;break;case"4":t=this.collection;break;case"7":t=this.rewardTitle7;break;case"8":t=this.rewardTitle8;break;case"9":t=this.rewardTitle9;break;case"10":t=this.rewardTitle10;break;case"11":t=this.rewardTitle11;break}return console.log(t,"title"),t}},methods:{copy:function(t){var e=document.createElement("input");e.setAttribute("readonly","readonly"),e.setAttribute("value",t),document.body.appendChild(e),e.setSelectionRange(0,9999),e.select(),document.execCommand("copy"),document.body.removeChild(e),uni.showToast({title:"复制成功",duration:1e3})},getBalanceLockDetail:function(){var t=this;return(0,l.default)((0,n.default)().mark((function e(){var a,i;return(0,n.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a={userid:t.$getStorage("userId"),lid:t.id},e.next=3,o.DetailService.getBalanceLockDetail(a);case 3:i=e.sent,console.log(i),2e3===i.status&&(t.detailData=i.data,i.data.startTime&&(t.detailData.startTime=(0,d.default)(i.data.startTime).format("YYYY-MM-DD HH:mm:ss")),i.data.endTime&&(t.detailData.endTime=(0,d.default)(i.data.endTime).format("YYYY-MM-DD HH:mm:ss")),t.detailData.createTime=(0,d.default)(i.data.createTime).format("YYYY-MM-DD HH:mm:ss"));case 6:case"end":return e.stop()}}),e)})))()},goBack:function(){uni.navigateBack()}}};e.default=r},"3d76":function(t,e,a){"use strict";a.r(e);var i=a("beeb"),n=a("6796");for(var l in n)["default"].indexOf(l)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(l);a("163e");var o=a("f0c5"),d=Object(o["a"])(n["default"],i["b"],i["c"],!1,null,"348f4d75",null,!1,i["a"],void 0);e["default"]=d.exports},6796:function(t,e,a){"use strict";a.r(e);var i=a("2451"),n=a.n(i);for(var l in i)["default"].indexOf(l)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(l);e["default"]=n.a},"6ff4":function(t,e,a){var i=a("24fb"),n=a("1de5"),l=a("0629");e=i(!1);var o=n(l);e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/*\n@mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。\n*/.detail[data-v-348f4d75]{padding-bottom:%?40?%}.detail-outter[data-v-348f4d75]{width:100%;height:%?540?%;background:url('+o+") 0 0 no-repeat;background-size:100% 100%}.detail-content-wrap[data-v-348f4d75]{width:100%;padding:0 %?32?%;box-sizing:border-box}.detail-content-wrap .detail-content[data-v-348f4d75]{width:100%;background-color:#fff;border-radius:%?32?%;margin-top:%?-126?%;padding-top:%?2?%}.detail-content-wrap .detail-content img[data-v-348f4d75]{width:%?292?%;height:%?292?%;margin:%?-94?% auto 0;display:block}.detail-content-wrap .detail-content .detail-content-title[data-v-348f4d75]{display:flex;align-items:center;justify-content:center;width:100%}.detail-content-wrap .detail-content .detail-content-title span[data-v-348f4d75]{font-size:%?36?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#191919;line-height:%?36?%;margin-right:%?8?%}.detail-content-wrap .detail-content .detail-content-title img[data-v-348f4d75]{width:%?36?%;height:%?36?%;margin:0}.detail-content-wrap .detail-content .detail-content-info[data-v-348f4d75]{margin-top:%?20?%;padding:0 %?32?%;box-sizing:border-box}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter[data-v-348f4d75]{border-bottom:%?2?% solid rgba(0,0,0,.18);padding:%?30?% 0}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter[data-v-348f4d75]:last-child{border:none}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter .detail-content-info-item-inner[data-v-348f4d75]{display:flex;align-items:center;justify-content:space-between;line-height:%?40?%;font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter .detail-content-info-item-inner .detail-content-info-item-inner-label[data-v-348f4d75]{flex-shrink:0;color:#767e8b}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter .detail-content-info-item-inner .detail-content-info-item-inner-value[data-v-348f4d75]{color:#191919;white-space:normal;word-break:break-all;overflow:hidden}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter .detail-content-info-item-inner .color0[data-v-348f4d75]{color:#f56c6c}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter .detail-content-info-item-inner .color1[data-v-348f4d75]{color:#03b384}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter .detail-content-info-item-inner .color2[data-v-348f4d75]{color:#ed7b2f}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter .detail-content-info-item-inner1[data-v-348f4d75]{margin-bottom:%?16?%}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter .detail-content-info-item-inner1[data-v-348f4d75]:last-child{margin-bottom:0}.detail-content-wrap .detail-content .detail-content-info .detail-content-info-item-ouuter1[data-v-348f4d75]:last-child{border-bottom:%?2?% solid rgba(0,0,0,.18)}",""]),t.exports=e},8971:function(t,e,a){"use strict";a("7a82");var i=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.DetailService=void 0;var n=i(a("d4ec")),l=i(a("bee2")),o=a("d22f"),d=(i(a("57e7")),a("2f20")),r=function(){function t(){(0,n.default)(this,t)}return(0,l.default)(t,null,[{key:"getBillList",value:function(t){var e=d.myMethods.apiChannel("/inside/getbilllist",t),a=(0,o.myrequest)({url:"/inside/getbilllist",method:"post",data:e});return a}},{key:"getBillDetail",value:function(t){var e=d.myMethods.apiChannel("/inside/getbilldetailbyid",t),a=(0,o.myrequest)({url:"/inside/getbilldetailbyid",method:"post",data:e});return a}},{key:"getUserDepositDetail",value:function(t){var e=d.myMethods.apiChannel("/inside/getuserdepositdetail",t),a=(0,o.myrequest)({url:"/inside/getuserdepositdetail",method:"post",data:e});return a}},{key:"getUserExchangeDetail",value:function(t){var e=d.myMethods.apiChannel("/inside/getexchangedetail",t),a=(0,o.myrequest)({url:"/inside/getexchangedetail",method:"post",data:e});return a}},{key:"getUserWithdrawDetail",value:function(t){var e=d.myMethods.apiChannel("/inside/getuserwithdrawdetail",t),a=(0,o.myrequest)({url:"/inside/getuserwithdrawdetail",method:"post",data:e});return a}},{key:"getBalanceLockList",value:function(t){var e=d.myMethods.apiChannel("/inside/getbalancelocklist",t),a=(0,o.myrequest)({url:"/inside/getbalancelocklist",method:"post",data:e});return a}},{key:"getBalanceLockDetail",value:function(t){var e=d.myMethods.apiChannel("/inside/getbalancelockdetail",t),a=(0,o.myrequest)({url:"/inside/getbalancelockdetail",method:"post",data:e});return a}}]),t}();e.DetailService=r},"8ba6":function(t,e,a){var i=a("6ff4");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=a("4f06").default;n("6e816e77",i,!0,{sourceMap:!1,shadowMode:!1})},beeb:function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return l})),a.d(e,"a",(function(){return i}));var i={uniNavBar:a("5550").default},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"detail"},[a("v-uni-view",{staticClass:"detail-outter"},[a("uni-nav-bar",{staticClass:"my-nav-bar",attrs:{shadow:!0,"left-icon":"back",backgroundColor:"transparent",shadow:!1,color:"#fff",title:t.title},on:{clickLeft:function(e){arguments[0]=e=t.$handleEvent(e),t.goBack.apply(void 0,arguments)}}})],1),a("v-uni-view",{staticClass:"detail-content-wrap"},[a("v-uni-view",{staticClass:"detail-content"},[a("img",{attrs:{src:t.icon,alt:""}}),a("v-uni-view",{staticClass:"detail-content-title"},[a("span",[t._v(t._s(t.rewardFrozen))]),a("img",{attrs:{src:"static/images/detail/lock-icon5.png",alt:""}})]),a("v-uni-view",{staticClass:"detail-content-info"},[a("v-uni-view",{staticClass:"detail-content-info-item-ouuter"},[a("v-uni-view",{staticClass:"detail-content-info-item-inner"},[a("span",{staticClass:"detail-content-info-item-inner-label"},[t._v(t._s(t.frozenAmount)+"：")]),a("span",{staticClass:"detail-content-info-item-inner-value"},[t._v(t._s(t._f("numFilter")(t.detailData.total))+" Morse")])])],1),a("v-uni-view",{staticClass:"detail-content-info-item-ouuter"},[a("v-uni-view",{staticClass:"detail-content-info-item-inner"},[a("span",{staticClass:"detail-content-info-item-inner-label"},[t._v(t._s(t.releaseAmount)+"：")]),a("span",{staticClass:"detail-content-info-item-inner-value"},[t._v(t._s(t._f("numFilter")(t.detailData.surplus))+" Morse")])])],1),a("v-uni-view",{staticClass:"detail-content-info-item-ouuter"},[a("v-uni-view",{staticClass:"detail-content-info-item-inner"},[a("span",{staticClass:"detail-content-info-item-inner-label"},[t._v(t._s(t.remainingFrozen)+"：")]),a("span",{staticClass:"detail-content-info-item-inner-value"},[t._v(t._s(t._f("numFilter")(t.detailData.balance))+" Morse")])])],1),a("v-uni-view",{staticClass:"detail-content-info-item-ouuter"},[a("v-uni-view",{staticClass:"detail-content-info-item-inner"},[a("span",{staticClass:"detail-content-info-item-inner-label"},[t._v(t._s(t.startDate)+"：")]),a("span",{staticClass:"detail-content-info-item-inner-value"},[t._v(t._s(t.detailData.startTime))])])],1),a("v-uni-view",{staticClass:"detail-content-info-item-ouuter"},[a("v-uni-view",{staticClass:"detail-content-info-item-inner"},[a("span",{staticClass:"detail-content-info-item-inner-label"},[t._v(t._s(t.endDate)+"：")]),a("span",{staticClass:"detail-content-info-item-inner-value"},[t._v(t._s(t.detailData.endTime))])])],1),a("v-uni-view",{staticClass:"detail-content-info-item-ouuter"},[a("v-uni-view",{staticClass:"detail-content-info-item-inner"},[a("span",{staticClass:"detail-content-info-item-inner-label"},[t._v(t._s(t.createTime)+"：")]),a("span",{staticClass:"detail-content-info-item-inner-value"},[t._v(t._s(t.detailData.createTime))])])],1)],1)],1)],1)],1)},l=[]}}]);