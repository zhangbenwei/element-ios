(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wallet-password-set-set"],{"0615":function(e,t,a){"use strict";a.d(t,"b",(function(){return s})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){}));var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"wrap"},[a("v-uni-view",{staticClass:"outter",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.setOrEditPaypass()}}},[a("v-uni-view",[e._v("1."+e._s(0==e.paypassStatus?e.setPass:e.editPass))]),a("img",{attrs:{src:"static/images/right1.png",alt:""}})],1),0!=e.paypassStatus?a("v-uni-view",{staticClass:"outter",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.forgetPaypass.apply(void 0,arguments)}}},[a("v-uni-view",[e._v("2."+e._s(e.forgetPass))]),a("img",{attrs:{src:"static/images/right1.png",alt:""}})],1):e._e()],1)},n=[]},3339:function(e,t,a){"use strict";var s=a("4269"),n=a.n(s);n.a},"3de2":function(e,t,a){var s=a("24fb");t=s(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/*\n@mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。\n*/.wrap[data-v-af2c9648]{padding:%?48?% %?32?% 0;box-sizing:border-box;height:100%;background-color:#fff}.outter[data-v-af2c9648]{width:100%;height:%?160?%;border-radius:%?16?%;border:1px solid #cdcdcd;margin-bottom:%?32?%;display:flex;align-items:center;justify-content:space-between;padding:0 %?32?%;box-sizing:border-box}.outter uni-view[data-v-af2c9648]{font-size:%?30?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#191919;line-height:%?160?%}.outter img[data-v-af2c9648]{width:%?40?%;height:%?40?%}',""]),e.exports=t},4269:function(e,t,a){var s=a("3de2");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);var n=a("4f06").default;n("65a3eccf",s,!0,{sourceMap:!1,shadowMode:!1})},"438a":function(e,t,a){"use strict";a("7a82");var s=a("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.SetService=void 0;var n=s(a("d4ec")),i=s(a("bee2")),r=a("d22f"),o=s(a("57e7")),u=a("2f20"),d=function(){function e(){(0,n.default)(this,e)}return(0,i.default)(e,null,[{key:"checkUserPayPass",value:function(e){e.paypass=o.default.secretPass(e.paypass);var t=u.myMethods.apiChannel("/inside/checkuserpaypass",e),a=(0,r.myrequest)({url:"/inside/checkuserpaypass",method:"post",data:t});return a}},{key:"sendEmailCode",value:function(e){var t=u.myMethods.apiChannel("/inside/sendemailcode",e),a=(0,r.myrequest)({url:"/inside/sendemailcode",method:"post",data:t});return a}},{key:"checkEmailCode",value:function(e){var t=u.myMethods.apiChannel("/inside/checkemailcode",e),a=(0,r.myrequest)({url:"/inside/checkemailcode",method:"get",data:t});return a}},{key:"setUserPaypass",value:function(e){var t=u.myMethods.apiChannel("/inside/setuserpaypass",e),a=(0,r.myrequest)({url:"/inside/setuserpaypass",method:"post",data:t});return a}}]),e}();t.SetService=d},7603:function(e,t,a){"use strict";a.r(t);var s=a("dcfd"),n=a.n(s);for(var i in s)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return s[e]}))}(i);t["default"]=n.a},dcfd:function(e,t,a){"use strict";a("7a82");var s=a("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=s(a("c7eb")),i=s(a("1da1")),r=a("438a"),o={data:function(){return{setPass:this.$t("tdex.set.setPass"),editPass:this.$t("tdex.set.editPass"),forgetPass:this.$t("tdex.set.forgetPass"),paypassStatus:null}},onLoad:function(){var e=this;return(0,i.default)((0,n.default)().mark((function t(){return(0,n.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return uni.setNavigationBarTitle({title:e.$t("tdex.set.title")}),t.next=3,e.$getStorage("paypassStatus");case 3:return e.paypassStatus=t.sent,console.log(e.paypassStatus,"this.paypassStatus"),t.t0=console,t.next=8,e.$getStorage("userDetail");case 8:t.t1=t.sent,t.t0.log.call(t.t0,t.t1,"安卓userDetail---------");case 10:case"end":return t.stop()}}),t)})))()},methods:{setOrEditPaypass:function(){1==this.paypassStatus?this.goPage("/pages/wallet/password/edit-password/old-password"):0==this.paypassStatus&&this.goPage("/pages/wallet/password/edit-password/new-password")},forgetPaypass:function(){this.sendEmailCode(),uni.showLoading({title:"验证码发送中...",mask:!0})},sendEmailCode:function(){var e=this;return(0,i.default)((0,n.default)().mark((function t(){var a,s;return(0,n.default)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={type:1,email:e.$getStorage("email"),userid:e.$getStorage("userId"),token:e.$getStorage("token")},t.next=3,r.SetService.sendEmailCode(a);case 3:s=t.sent,2e3===s.status&&(uni.hideLoading(),e.goPage("/pages/wallet/password/edit-password/email-code?type=forget"));case 5:case"end":return t.stop()}}),t)})))()},goPage:function(e){uni.navigateTo({url:e,success:function(){console.log("成功")},fail:function(e){console.log(e)}})}}};t.default=o},df22:function(e,t,a){"use strict";a.r(t);var s=a("0615"),n=a("7603");for(var i in n)["default"].indexOf(i)<0&&function(e){a.d(t,e,(function(){return n[e]}))}(i);a("3339");var r=a("f0c5"),o=Object(r["a"])(n["default"],s["b"],s["c"],!1,null,"af2c9648",null,!1,s["a"],void 0);t["default"]=o.exports}}]);