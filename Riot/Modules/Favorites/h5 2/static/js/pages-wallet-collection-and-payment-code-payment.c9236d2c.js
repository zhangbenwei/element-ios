(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wallet-collection-and-payment-code-payment"],{"005c":function(t,e,a){"use strict";var n=a("6f11"),i=a.n(n);i.a},"0360":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){}));var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"verification_code"},[a("v-uni-view",{staticClass:"verification_code_continor"},t._l(t.latticeNum,(function(e,n){return a("v-uni-view",{key:n,staticClass:"verification_code_item",style:t.blurShowLocal&&(t.inputValues.length===n||t.inputValues.length===t.latticeNum&&n===t.latticeNum-1)?t.borderCheckStyle:t.borderStyle,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.latticeFoc(n)}}},[t.inputValues[n]?[1==t.ciphertextSty?a("v-uni-view",{staticClass:"point"}):[t._v(t._s(2==t.ciphertextSty?"*":t.inputValues[n]))]]:t._e()],2)})),1),"checkbox"===t.inputType?a("v-uni-input",{ref:"ipt",staticClass:"input_info",attrs:{focus:"",maxlength:t.latticeNum,type:"checkbox"},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputVal.apply(void 0,arguments)},blur:function(e){arguments[0]=e=t.$handleEvent(e),t.blur.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.focus.apply(void 0,arguments)}},model:{value:t.iptVal,callback:function(e){t.iptVal=e},expression:"iptVal"}}):"radio"===t.inputType?a("input",{directives:[{name:"model",rawName:"v-model",value:t.iptVal,expression:"iptVal"}],ref:"ipt",staticClass:"input_info",attrs:{focus:"",maxlength:t.latticeNum,type:"radio"},domProps:{checked:t._q(t.iptVal,null)},on:{input:t.inputVal,blur:t.blur,focus:t.focus,change:function(e){t.iptVal=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.iptVal,expression:"iptVal"}],ref:"ipt",staticClass:"input_info",attrs:{focus:"",maxlength:t.latticeNum,type:t.inputType},domProps:{value:t.iptVal},on:{input:[function(e){e.target.composing||(t.iptVal=e.target.value)},t.inputVal],blur:t.blur,focus:t.focus}})],1)},i=[]},"25e6":function(t,e,a){"use strict";a("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a9e3");var n={props:{latticeNum:{type:Number,default:4},borderStyle:{type:String,default:"background: #F5F5F5;border-radius: 4px 4px 4px 4px;"},borderCheckStyle:{type:String,default:"background: #F5F5F5;border-radius: 4px 4px 4px 4px;"},inputType:{type:String,default:"number"},blurShow:{type:Boolean,default:!1},ciphertextSty:{type:Number,default:1},updateOne:{type:Boolean,default:!1}},data:function(){return{inputValues:[],blurShowLocal:!0,iptVal:""}},mounted:function(){console.log(this.$refs.ipt,"ipr"),this.$refs.ipt.focus(),this.blurShowLocal=this.blurShow},methods:{inputVal:function(t){this.inputValues=this.iptVal,this.$emit("getInputVerification",this.inputValues)},setVerificationCode:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];this.inputValues=t},cleanVal:function(){this.inputValues=[],this.iptVal=""},latticeFoc:function(t){},blur:function(){!this.blurShow&&(this.blurShowLocal=!1)},focus:function(){!this.blurShow&&(this.blurShowLocal=!0)}}};e.default=n},3749:function(t,e,a){var n=a("dbf5");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("9ac60ce6",n,!0,{sourceMap:!1,shadowMode:!1})},"398d":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/*\n@mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。\n*/.code-payment[data-v-ac0d797e]{height:100%;background-color:#fff}.scan-wrap[data-v-ac0d797e]{padding-top:%?60?%}.scan-wrap img[data-v-ac0d797e]{width:%?240?%;height:%?240?%;display:block;margin:0 auto}.scan-wrap span[data-v-ac0d797e]{display:block;text-align:center;margin-top:%?32?%;font-size:%?30?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#03b384;line-height:%?36?%}.form-wrap[data-v-ac0d797e]{position:relative;margin-top:%?48?%;padding:0 %?32?%;box-sizing:border-box}.form-wrap .form-label[data-v-ac0d797e]{display:flex;align-items:center;justify-content:flex-start}.form-wrap .form-label img[data-v-ac0d797e]{width:%?40?%;height:%?40?%}.form-wrap .form-label p[data-v-ac0d797e]{margin:0;padding:0;font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#191919;line-height:%?32?%;margin-left:%?8?%}.form-wrap .form-label p span[data-v-ac0d797e]{font-size:%?24?%;color:#767e8b}.form-wrap .form-outter-wrap[data-v-ac0d797e]{display:flex;align-items:center;justify-content:space-between}.form-wrap .form-outter-wrap span[data-v-ac0d797e]{margin-top:%?24?%}.form-wrap .form-outter[data-v-ac0d797e]{width:100%;height:%?80?%;margin-top:%?24?%;border-radius:%?16?%;background-color:#f5f5f5;padding:0 %?24?%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between}.form-wrap .form-outter uni-input[data-v-ac0d797e]{width:%?560?%;height:%?80?%;line-height:%?80?%;border:none;outline:none;font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#333}.form-wrap .form-outter img[data-v-ac0d797e]{width:%?48?%;height:%?48?%}.form-wrap .form-outter1[data-v-ac0d797e]{width:%?560?%}.btn-wrap[data-v-ac0d797e]{width:100%;margin-top:%?80?%;padding:0 %?32?%;box-sizing:border-box}.btn-wrap span[data-v-ac0d797e]{display:block;text-align:center;width:100%;height:%?80?%;font-size:%?30?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#fff;line-height:%?80?%;background:#03b384;box-shadow:0 %?8?% %?16?% %?2?% rgba(3,143,106,.22);border-radius:%?122?%;margin:0 auto}.popup-outter[data-v-ac0d797e]{width:%?600?%;background-color:#fff;border-radius:%?32?%;position:relative;padding:%?60?% 0 %?28?%}.popup-outter img[data-v-ac0d797e]{width:%?48?%;height:%?48?%;position:absolute;top:%?32?%;right:%?32?%}.popup-outter .pass-tit[data-v-ac0d797e]{margin-top:%?20?%;font-size:%?36?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#191919;line-height:%?42?%;text-align:center}.popup-outter .popup-payment[data-v-ac0d797e]{font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#191919;line-height:%?32?%;text-align:center;margin-top:%?32?%}.popup-outter .popup-amount[data-v-ac0d797e]{font-size:%?40?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#03b384;line-height:%?56?%;text-align:center}.popup-outter .popup-people[data-v-ac0d797e]{font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#767e8b;line-height:%?32?%;text-align:center;margin:%?24?% 0}.popup-outter .errFlag[data-v-ac0d797e]{display:block;font-size:%?26?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#ff5c55;line-height:%?30?%;text-align:center;margin-top:%?16?%}.popup-outter1[data-v-ac0d797e]{width:%?600?%;background-color:#fff;border-radius:%?32?%;position:relative;padding:%?60?% 0 %?48?%}.popup-outter1 img[data-v-ac0d797e]{width:%?48?%;height:%?48?%;position:absolute;top:%?32?%;right:%?32?%}.popup-outter1 .pass-tit[data-v-ac0d797e]{font-size:%?36?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#191919;line-height:%?42?%;text-align:center}.popup-outter1 .pass-tit1[data-v-ac0d797e]{margin-bottom:%?80?%}.popup-outter1 .popup-payment[data-v-ac0d797e]{font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#191919;line-height:%?32?%;text-align:center;margin-top:%?32?%}.popup-outter1 .popup-amount[data-v-ac0d797e]{font-size:%?40?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#03b384;line-height:%?56?%;text-align:center;margin-bottom:%?32?%}.popup-outter1 .popup-people[data-v-ac0d797e]{font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#767e8b;line-height:%?32?%;text-align:center;margin:%?24?% 0}.popup-outter1 .errFlag[data-v-ac0d797e]{display:block;font-size:%?26?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#ff5c55;line-height:%?30?%;text-align:center;margin-top:%?16?%}.set-pass-popup[data-v-ac0d797e]{width:%?590?%;background-color:#fff;border-radius:%?32?%;padding:%?50?% %?80?%;box-sizing:border-box;position:relative}.set-pass-popup .set-pass-popup-close[data-v-ac0d797e]{position:absolute;top:%?32?%;right:%?32?%}.set-pass-popup .set-pass-popup-close img[data-v-ac0d797e]{width:%?48?%;height:%?48?%}.set-pass-popup .set-pass-popup-title[data-v-ac0d797e]{font-size:%?36?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#191919;line-height:%?70?%;width:100%;display:block;text-align:center}.set-pass-popup .set-pass-popup-content[data-v-ac0d797e]{font-size:%?30?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#666;line-height:%?48?%;text-align:center}.set-pass-popup .set-pass-popup-footer[data-v-ac0d797e]{margin:%?60?% auto 0;width:%?430?%;height:%?72?%;border-radius:%?36?%;background:#03b384;box-shadow:0 8px 16px 2px rgba(3,143,106,.22);text-align:center;line-height:%?72?%;font-size:%?28?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#fff}',""]),t.exports=e},"3dc6":function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("a9e3");var i=n(a("c7eb")),o=n(a("1da1")),s=n(a("cbd7")),r=a("ed16"),c={data:function(){return{isFriend:!1,errFlag:!1,errFlag1:!1,payeeVal:"",amount:"",collectionAccountVal:"",paymentAmountVal:"",errTig:this.$t("tdex.set.errTig"),nextStep:this.$t("tdex.set.nextStep"),scantig:this.$t("tdex.fullLift.scantig"),payee:this.$t("tdex.fullLift.payee"),inputPayee:this.$t("tdex.fullLift.inputPayee"),collectionAccount:this.$t("tdex.fullLift.collectionAccount"),inputCollectionAccount:this.$t("tdex.fullLift.inputCollectionAccount"),paymentAmount:this.$t("tdex.fullLift.paymentAmount"),inputPaymentAmount:this.$t("tdex.fullLift.inputPaymentAmount"),paymentPassword:this.$t("tdex.fullLift.paymentPassword"),pay:this.$t("tdex.fullLift.pay"),name:null,userId:null,avatar:null,notice:this.$t("tdex.mineral.notice"),noticePaypass:this.$t("tdex.mineral.noticePaypass"),setup:this.$t("tdex.mineral.setup"),maxOncePaymentAmount:1e3,maxDayPaymentAmount:5e4,reallyPaymentAmount:0,errTig1:this.$t("tdex.set.errTig1"),emailCode:this.$t("tdex.set.emailCode"),paypass:"",code:""}},components:{verificationCodeStyle:s.default},onLoad:function(t){var e=this;return(0,o.default)((0,i.default)().mark((function a(){var n,o,s;return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(e.email=e.$getStorage("email"),uni.setNavigationBarTitle({title:e.$t("tdex.fullLift.payment")}),e.userId=e.$getStorage("userId"),"friend"!==t.type){a.next=10;break}e.isFriend=!0,e.payeeVal=t.userName,e.collectionAccountVal=t.account,e.avatar=e.$getStorage("friendAvatar"),a.next=13;break;case 10:return e.isFriend=!1,a.next=13,e.scan();case 13:n=e.$getStorage("maxOncePaymentAmount"),""!=n&&void 0!=n&&null!=n&&(e.maxOncePaymentAmount=n),o=e.$getStorage("maxDayPaymentAmount"),""!=o&&void 0!=o&&null!=o&&(e.maxDayPaymentAmount=o),s=e.$getStorage("reallyPaymentAmount"),""!=s&&void 0!=s&&null!=s&&(e.reallyPaymentAmount=s);case 19:case"end":return a.stop()}}),a)})))()},onShow:function(){var t=this;return(0,o.default)((0,i.default)().mark((function e(){return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.$getStorage("app-scanCodeRes")){e.next=7;break}return e.next=3,t.$getStorage("app-scanCodeRes");case 3:return t.payeeVal=e.sent,t.$setStorage("app-scanCodeRes",null),e.next=7,t.getAccountByName();case 7:case"end":return e.stop()}}),e)})))()},methods:{closePopup:function(t){"popup"==t?this.errFlag=!1:"popup2"==t&&(this.errFlag1=!1),this.$refs[t].close()},toSetPass:function(){uni.navigateTo({url:"/pages/wallet/password/edit-password/new-password"})},getAccountByName:function(){var t=this;return(0,o.default)((0,i.default)().mark((function e(){var a;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r.CollectPaymentService.getAccountByName({name:t.payeeVal,userId:t.userId});case 2:a=e.sent,2e3===a.status?t.collectionAccountVal=a.data.accountId:uni.showToast({title:t.$t("tcommon.Failure"),icon:"none"});case 4:case"end":return e.stop()}}),e)})))()},scan:function(){return(0,o.default)((0,i.default)().mark((function t(){return(0,i.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,window.AndroidApi.scanCode();case 2:case"end":return t.stop()}}),t)})))()},scanCodeRes:function(t){console.log(this.payeeVal,"this.payeeVal-扫码结果11111111111"),this.payeeVal=t,console.log(this.payeeVal,"this.payeeVal-扫码结果222222222222222")},nextStepFun:function(){1==this.$getStorage("paypassStatus")?Number(this.amount)>0?this.$refs.popup.open("center"):uni.showToast({title:this.$t("tdex.fullLift.notice"),icon:"none"}):0==this.$getStorage("paypassStatus")&&this.$refs.setPass.open("center")},getInputVerification:function(t){var e=this;return(0,o.default)((0,i.default)().mark((function a(){return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(console.log(t),6!==t.length){a.next=5;break}return console.log("发起请求"),a.next=5,e.checkUserPayPass(t);case 5:case"end":return a.stop()}}),a)})))()},sendEmailCode:function(){var t=this;return(0,o.default)((0,i.default)().mark((function e(){var a;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r.CollectPaymentService.sendEmailCode({userid:t.$getStorage("userId"),email:t.email,type:3});case 2:a=e.sent,a.status;case 4:case"end":return e.stop()}}),e)})))()},getInputVerification1:function(t){var e=this;return(0,o.default)((0,i.default)().mark((function a(){return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(console.log(t),6!==t.length){a.next=6;break}return e.emailCodeVal=t,a.next=5,e.checkEmailCode(t);case 5:console.log("发起请求");case 6:case"end":return a.stop()}}),a)})))()},checkEmailCode:function(t){var e=this;return(0,o.default)((0,i.default)().mark((function a(){var n;return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,r.CollectPaymentService.checkEmailCode({userid:e.$getStorage("userId"),code:t,email:e.email,type:3});case 2:if(n=a.sent,console.log("-----------1-----------"),console.log(n),console.log("-----------1-----------"),e.code=t,2e3!==n.status){a.next=12;break}return a.next=10,e.userPayment(e.paypass,2);case 10:a.next=13;break;case 12:e.$refs.verification1.cleanVal();case 13:case"end":return a.stop()}}),a)})))()},checkUserPayPass:function(t){var e=this;return(0,o.default)((0,i.default)().mark((function a(){var n,o;return(0,i.default)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n={userid:e.$getStorage("userId"),paypass:t},a.next=3,r.CollectPaymentService.checkUserPayPass(n);case 3:if(o=a.sent,2e3!==o.status){a.next=20;break}if(console.log("------------maxOncePaymentAmount-------1----"),console.log(e.maxOncePaymentAmount),console.log("------------maxOncePaymentAmount-------2----"),!(e.amount>e.maxOncePaymentAmount||e.reallyPaymentAmount>e.maxDayPaymentAmount)){a.next=16;break}return e.$refs.popup.close(),e.$refs.popup2.open("center"),e.paypass=t,a.next=14,e.sendEmailCode();case 14:a.next=18;break;case 16:return a.next=18,e.userPayment(t,1);case 18:a.next=21;break;case 20:e.$refs.verification.cleanVal();case 21:console.log(o);case 22:case"end":return a.stop()}}),a)})))()},userPayment:function(t,e){var a=this;return(0,o.default)((0,i.default)().mark((function n(){var o,s,c;return(0,i.default)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return 2==e?(o=a.code,s={account:a.collectionAccountVal,amount:a.amount,userid:a.$getStorage("userId"),paypass:t,code:o,test_type:1}):s={account:a.collectionAccountVal,amount:a.amount,userid:a.$getStorage("userId"),paypass:t,test_type:1},n.next=3,r.CollectPaymentService.userPayment(s);case 3:c=n.sent,2e3===c.status&&uni.showToast({title:a.$t("common.success"),duration:1e3}),a.$refs.popup.close(),a.$refs.popup2.close(),setTimeout((function(){a.goPage("/pages/wallet/index/index")}),1500),console.log(c);case 9:case"end":return n.stop()}}),n)})))()},goPage:function(t){uni.navigateBack({delta:2})}}};e.default=c},"6f11":function(t,e,a){var n=a("398d");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("4f06").default;i("60e92154",n,!0,{sourceMap:!1,shadowMode:!1})},"6f4e":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={uniPopup:a("1e3a").default},i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"code-payment"},[t.isFriend?t._e():a("v-uni-view",{staticClass:"scan-wrap"},[a("img",{attrs:{src:"static/images/detail/scanCode.png",alt:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.scan()}}}),a("span",[t._v(t._s(t.scantig))])]),t.isFriend?a("v-uni-view",{staticClass:"scan-wrap"},[t.avatar?a("img",{staticStyle:{width:"72px",height:"72px"},attrs:{src:t.avatar,alt:""}}):a("img",{staticStyle:{width:"72px",height:"72px"},attrs:{src:"static/images/detail/default-header.png",alt:""}})]):t._e(),a("v-uni-view",{staticClass:"form-wrap"},[a("v-uni-view",{staticClass:"form-label"},[a("span",[t._v(t._s(t.payee)+":")])]),a("v-uni-view",{staticClass:"form-outter"},[a("v-uni-input",{attrs:{type:"text",disabled:"true"},model:{value:t.payeeVal,callback:function(e){t.payeeVal=e},expression:"payeeVal"}})],1)],1),a("v-uni-view",{staticClass:"form-wrap"},[a("v-uni-view",{staticClass:"form-label"},[a("span",[t._v(t._s(t.collectionAccount)+":")])]),a("v-uni-view",{staticClass:"form-outter"},[a("v-uni-input",{attrs:{type:"text",disabled:"true"},model:{value:t.collectionAccountVal,callback:function(e){t.collectionAccountVal=e},expression:"collectionAccountVal"}})],1)],1),a("v-uni-view",{staticClass:"form-wrap"},[a("v-uni-view",{staticClass:"form-label"},[a("span",[t._v(t._s(t.paymentAmount)+":")])]),a("v-uni-view",{staticClass:"form-outter-wrap"},[a("v-uni-view",{staticClass:"form-outter form-outter1"},[a("v-uni-input",{attrs:{type:"number",placeholder:t.inputPaymentAmount},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}})],1),a("span",[t._v("Morse")])],1)],1),a("v-uni-view",{staticClass:"btn-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.nextStepFun.apply(void 0,arguments)}}},[a("span",[t._v(t._s(t.nextStep))])]),a("uni-popup",{ref:"popup"},[a("v-uni-view",{staticClass:"popup-outter"},[a("img",{attrs:{src:"static/images/close.png",alt:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closePopup("popup")}}}),a("v-uni-view",{staticClass:"pass-tit"},[t._v(t._s(t.paymentPassword))]),a("v-uni-view",{staticClass:"popup-payment"},[t._v(t._s(t.pay))]),a("v-uni-view",{staticClass:"popup-amount"},[a("span",[t._v(t._s(t.amount)+" Morse")])]),a("v-uni-view",{staticClass:"popup-people"},[t._v(t._s(t.payee)+"："),a("span",[t._v(t._s(t.payeeVal))])]),a("verification-code-style",{ref:"verification",attrs:{latticeNum:6},on:{getInputVerification:function(e){arguments[0]=e=t.$handleEvent(e),t.getInputVerification.apply(void 0,arguments)}}}),t.errFlag?a("span",{staticClass:"errFlag"},[t._v(t._s(t.errTig))]):t._e()],1)],1),a("uni-popup",{ref:"setPass"},[a("v-uni-view",{staticClass:"set-pass-popup"},[a("v-uni-view",{staticClass:"set-pass-popup-close"},[a("img",{attrs:{src:"static/images/close.png",alt:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closePopup("setPass")}}})]),a("v-uni-view",{staticClass:"set-pass-popup-title"},[t._v(t._s(t.notice))]),a("v-uni-view",{staticClass:"set-pass-popup-content"},[t._v(t._s(t.noticePaypass))]),a("v-uni-view",{staticClass:"set-pass-popup-footer",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toSetPass.apply(void 0,arguments)}}},[a("span",[t._v(t._s(t.setup))])])],1)],1),a("uni-popup",{ref:"popup2"},[a("v-uni-view",{staticClass:"popup-outter1"},[a("img",{attrs:{src:"static/images/close.png",alt:""},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closePopup("popup2")}}}),a("v-uni-view",{staticClass:"pass-tit pass-tit1"},[t._v(t._s(t.emailCode))]),a("verification-code-style",{ref:"verification1",attrs:{latticeNum:6},on:{getInputVerification:function(e){arguments[0]=e=t.$handleEvent(e),t.getInputVerification1.apply(void 0,arguments)}}}),t.errFlag1?a("span",{staticClass:"errFlag"},[t._v(t._s(t.errTig1))]):t._e()],1)],1)],1)},o=[]},"72a6":function(t,e,a){"use strict";a.r(e);var n=a("25e6"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"8bfd":function(t,e,a){"use strict";var n=a("3749"),i=a.n(n);i.a},c4c0:function(t,e,a){"use strict";a.r(e);var n=a("3dc6"),i=a.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},cbd7:function(t,e,a){"use strict";a.r(e);var n=a("0360"),i=a("72a6");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("8bfd");var s=a("f0c5"),r=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"2eb1400c",null,!1,n["a"],void 0);e["default"]=r.exports},d4be:function(t,e,a){"use strict";a.r(e);var n=a("6f4e"),i=a("c4c0");for(var o in i)["default"].indexOf(o)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("005c");var s=a("f0c5"),r=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,"ac0d797e",null,!1,n["a"],void 0);e["default"]=r.exports},dbf5:function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,".verification_code[data-v-2eb1400c]{position:relative;overflow:hidden}.verification_code .verification_code_continor[data-v-2eb1400c]{display:flex;text-align:center;justify-content:center;margin-left:%?10?%}.verification_code .verification_code_continor .verification_code_item[data-v-2eb1400c]{width:%?60?%;height:%?60?%;align-items:center;justify-content:center;display:flex}.verification_code .verification_code_continor .verification_code_item[data-v-2eb1400c]:not(:first-child){margin-left:%?20?%}.verification_code .verification_code_continor .point[data-v-2eb1400c]{width:%?10?%;height:%?10?%;background-color:#000;border-radius:200px}.verification_code .input_info[data-v-2eb1400c]{width:%?1200?%;height:%?60?%;border:1px solid red;position:absolute;opacity:0;top:0;left:%?-700?%}",""]),t.exports=e},ed16:function(t,e,a){"use strict";a("7a82");var n=a("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.CollectPaymentService=void 0;var i=n(a("d4ec")),o=n(a("bee2")),s=a("d22f"),r=n(a("57e7")),c=a("2f20"),u=function(){function t(){(0,i.default)(this,t)}return(0,o.default)(t,null,[{key:"getfriendlist",value:function(t){var e=c.myMethods.apiChannel("/inside/setuserpaypass",t),a=(0,s.myrequest)({url:"/inside/getfriendlist",method:"post",data:e});return a}},{key:"checkUserPayPass",value:function(t){t.paypass=r.default.secretPass(t.paypass);var e=c.myMethods.apiChannel("/inside/checkuserpaypass",t),a=(0,s.myrequest)({url:"/inside/checkuserpaypass",method:"post",data:e});return a}},{key:"userPayment",value:function(t){t.paypass=r.default.secretPass(t.paypass);var e=c.myMethods.apiChannel("/inside/userpayment",t),a=(0,s.myrequest)({url:"/inside/userpayment",method:"post",data:e});return a}},{key:"getAccountByName",value:function(t){var e=c.myMethods.apiChannel("/inside/getaccountbyname",t),a=(0,s.myrequest)({url:"/inside/getaccountbyname",method:"post",data:e});return a}},{key:"sendEmailCode",value:function(t){var e=c.myMethods.apiChannel("/inside/sendemailcode",t),a=(0,s.myrequest)({url:"/inside/sendemailcode",method:"post",data:e});return a}},{key:"checkEmailCode",value:function(t){var e=c.myMethods.apiChannel("/inside/checkemailcode",t),a=(0,s.myrequest)({url:"/inside/checkemailcode",method:"get",data:e});return a}}]),t}();e.CollectPaymentService=u}}]);