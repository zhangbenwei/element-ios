(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-wallet-password-edit-password-new-password"],{"10ef":function(a,e,t){"use strict";t.r(e);var s=t("2f59"),i=t("ec71");for(var n in i)["default"].indexOf(n)<0&&function(a){t.d(e,a,(function(){return i[a]}))}(n);t("b392");var o=t("f0c5"),l=Object(o["a"])(i["default"],s["b"],s["c"],!1,null,"6324637f",null,!1,s["a"],void 0);e["default"]=l.exports},"2f59":function(a,e,t){"use strict";t.d(e,"b",(function(){return s})),t.d(e,"c",(function(){return i})),t.d(e,"a",(function(){}));var s=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("v-uni-view",{staticClass:"new-password"},[t("v-uni-view",{staticClass:"form-wrap"},[t("v-uni-view",{staticClass:"form-label"},[t("img",{attrs:{src:"static/images/lock.png",alt:""}}),t("span",[a._v(a._s(a.newPass)+":")])]),t("v-uni-view",{staticClass:"form-outter"},[t("v-uni-input",{attrs:{type:"number",placeholder:a.newPassPlaceholder},on:{blur:function(e){arguments[0]=e=a.$handleEvent(e),a.checkPassword.apply(void 0,arguments)}},model:{value:a.newPassVal,callback:function(e){a.newPassVal=e},expression:"newPassVal"}}),t("img",{attrs:{src:"static/images/close.png",alt:""},on:{click:function(e){arguments[0]=e=a.$handleEvent(e),a.newPassVal=""}}})],1),a.passDiff?t("span",{staticClass:"again-err"},[a._v(a._s(a.passErr))]):a._e()],1),t("v-uni-view",{staticClass:"form-wrap"},[t("v-uni-view",{staticClass:"form-label"},[t("img",{attrs:{src:"static/images/lock.png",alt:""}}),t("span",[a._v(a._s(a.againPass)+":")])]),t("v-uni-view",{staticClass:"form-outter"},[t("v-uni-input",{attrs:{type:"number",placeholder:a.againPassPlaceholder},on:{blur:function(e){arguments[0]=e=a.$handleEvent(e),a.checkPassword.apply(void 0,arguments)}},model:{value:a.againPassVal,callback:function(e){a.againPassVal=e},expression:"againPassVal"}}),t("img",{attrs:{src:"static/images/close.png",alt:""},on:{click:function(e){arguments[0]=e=a.$handleEvent(e),a.againPassVal=""}}})],1),a.againDiff?t("span",{staticClass:"again-err"},[a._v(a._s(a.againErr))]):a._e()],1),t("v-uni-view",{staticClass:"form-wrap"},[t("v-uni-view",{staticClass:"form-label"},[t("img",{attrs:{src:"static/images/email.png",alt:""}}),t("p",[a._v(a._s(a.email)+":"),t("span",[a._v("（"+a._s(a.emailTig)+"）")])])]),t("v-uni-view",{staticClass:"form-outter"},[t("v-uni-input",{attrs:{type:"text",placeholder:a.emailPlaceholder,disabled:a.disabled},on:{blur:function(e){arguments[0]=e=a.$handleEvent(e),a.checkEmail.apply(void 0,arguments)}},model:{value:a.emailVal,callback:function(e){a.emailVal=e},expression:"emailVal"}})],1),a.emailDiff?t("span",{staticClass:"again-err"},[a._v(a._s(a.emailErr))]):a._e()],1),0==a.paypassStatus?t("v-uni-view",{staticClass:"tip"},[a._v(a._s(a.changeEmailTip))]):a._e(),t("v-uni-view",{staticClass:"btn-wrap"},[t("v-uni-button",{on:{click:function(e){arguments[0]=e=a.$handleEvent(e),a.submitNext.apply(void 0,arguments)}}},[a._v(a._s(a.nextStep))])],1)],1)},i=[]},"438a":function(a,e,t){"use strict";t("7a82");var s=t("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.SetService=void 0;var i=s(t("d4ec")),n=s(t("bee2")),o=t("d22f"),l=s(t("57e7")),r=t("2f20"),d=function(){function a(){(0,i.default)(this,a)}return(0,n.default)(a,null,[{key:"checkUserPayPass",value:function(a){a.paypass=l.default.secretPass(a.paypass);var e=r.myMethods.apiChannel("/inside/checkuserpaypass",a),t=(0,o.myrequest)({url:"/inside/checkuserpaypass",method:"post",data:e});return t}},{key:"sendEmailCode",value:function(a){var e=r.myMethods.apiChannel("/inside/sendemailcode",a),t=(0,o.myrequest)({url:"/inside/sendemailcode",method:"post",data:e});return t}},{key:"checkEmailCode",value:function(a){var e=r.myMethods.apiChannel("/inside/checkemailcode",a),t=(0,o.myrequest)({url:"/inside/checkemailcode",method:"get",data:e});return t}},{key:"setUserPaypass",value:function(a){var e=r.myMethods.apiChannel("/inside/setuserpaypass",a),t=(0,o.myrequest)({url:"/inside/setuserpaypass",method:"post",data:e});return t}}]),a}();e.SetService=d},6167:function(a,e,t){var s=t("6d67");s.__esModule&&(s=s.default),"string"===typeof s&&(s=[[a.i,s,""]]),s.locals&&(a.exports=s.locals);var i=t("4f06").default;i("786c9046",s,!0,{sourceMap:!1,shadowMode:!1})},"6d67":function(a,e,t){var s=t("24fb");e=s(!1),e.push([a.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/*\n@mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。\n*/.new-password[data-v-6324637f]{padding:0 %?32?% 0;box-sizing:border-box;height:100%;background-color:#fff;padding-top:%?48?%}.form-wrap[data-v-6324637f]{position:relative;margin-bottom:%?48?%}.form-wrap .form-label[data-v-6324637f]{display:flex;align-items:center;justify-content:flex-start}.form-wrap .form-label img[data-v-6324637f]{width:%?40?%;height:%?40?%}.form-wrap .form-label p[data-v-6324637f]{margin:0;padding:0;font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#191919;line-height:%?32?%;margin-left:%?8?%}.form-wrap .form-label p span[data-v-6324637f]{font-size:%?24?%;color:#767e8b}.form-wrap .form-outter[data-v-6324637f]{width:100%;height:%?80?%;margin-top:%?24?%;border-radius:%?16?%;background-color:#f5f5f5;padding:0 %?24?%;box-sizing:border-box;display:flex;align-items:center;justify-content:space-between}.form-wrap .form-outter uni-input[data-v-6324637f]{width:%?560?%;height:%?80?%;line-height:%?80?%;border:none;outline:none;font-size:%?28?%;font-family:PingFang SC-Regular,PingFang SC;font-weight:400;color:#333}.form-wrap .form-outter img[data-v-6324637f]{width:%?48?%;height:%?48?%}.form-wrap .again-err[data-v-6324637f]{position:absolute;left:%?20?%;font-size:%?26?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#ff5c55;line-height:%?44?%}.tip[data-v-6324637f]{width:100%;font-size:%?26?%;font-family:PingFang SC-Medium,PingFang SC;font-weight:500;color:#ff5c55;line-height:%?44?%;border:1px solid #cdcdcd;border-radius:%?16?%;padding:%?16?% %?24?%;box-sizing:border-box;margin-top:%?40?%}.btn-wrap[data-v-6324637f]{margin-top:%?80?%}.btn-wrap uni-button[data-v-6324637f]{width:%?400?%;height:%?80?%;line-height:%?80?%;text-align:center;border-radius:%?40?%;border:none;background-color:#03b384;color:#fff}.btn-wrap uni-button[data-v-6324637f]:after{content:"";display:none}',""]),a.exports=e},b392:function(a,e,t){"use strict";var s=t("6167"),i=t.n(s);i.a},ec71:function(a,e,t){"use strict";t.r(e);var s=t("fa79"),i=t.n(s);for(var n in s)["default"].indexOf(n)<0&&function(a){t.d(e,a,(function(){return s[a]}))}(n);e["default"]=i.a},fa79:function(a,e,t){"use strict";t("7a82");var s=t("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=s(t("c7eb")),n=s(t("1da1"));t("ac1f"),t("00b4");var o=t("438a"),l=s(t("57e7")),r={data:function(){return{disabled:!0,againDiff:!1,emailDiff:!1,passDiff:!1,newPassVal:"",againPassVal:"",emailVal:"",newPass:this.$t("tdex.set.newPass"),newPassPlaceholder:this.$t("tdex.set.newPassPlaceholder"),againPass:this.$t("tdex.set.againPass"),againPassPlaceholder:this.$t("tdex.set.againPassPlaceholder"),email:this.$t("tdex.set.email"),emailTig:this.$t("tdex.set.emailTig"),emailPlaceholder:this.$t("tdex.set.emailPlaceholder"),againErr:this.$t("tdex.set.againErr"),emailErr:this.$t("tdex.set.emailErr"),nextStep:this.$t("tdex.set.nextStep"),passErr:this.$t("tdex.set.passErr"),changeEmailTip:this.$t("tdex.set.changeEmailTip"),editPassText:this.$t("tdex.set.editPassText"),setPassText:this.$t("tdex.set.setPassText"),uptosix:this.$t("tdex.set.uptosix"),paypassStatus:null}},onLoad:function(a){this.paypassStatus=this.$getStorage("paypassStatus"),this.emailVal=this.$getStorage("email"),this.disabled=!0,1==this.paypassStatus?uni.setNavigationBarTitle({title:this.editPassText}):0==this.paypassStatus&&uni.setNavigationBarTitle({title:this.setPassText})},methods:{checkPassword:function(a){console.log("-------------1---------"),console.log(this.newPassVal),console.log("-------------2---------"),console.log(this.againPassVal),console.log("-------------3---------"),this.newPassVal.length>6&&uni.showToast({title:this.uptosix,duration:2e3,icon:"none"}),this.$setStorage("newPaypass",l.default.secretPass(this.newPassVal)),this.newPassVal&&6===this.newPassVal.length?this.passDiff=!1:this.passDiff=!0,console.log(this.newPassVal,this.againPassVal),this.newPassVal!==this.againPassVal?this.againDiff=!0:this.againDiff=!1},checkEmail:function(){/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this.emailVal)?this.emailDiff=!1:this.emailDiff=!0},submitNext:function(){var a=this;return(0,n.default)((0,i.default)().mark((function e(){return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0==a.paypassStatus&&a.$setStorage("email",a.emailVal),a.checkPassword(),a.checkEmail(),a.passDiff||a.againDiff||a.emailDiff){e.next=7;break}return uni.showLoading({title:a.$t("tdex.set.sendCode")}),e.next=7,a.sendEmailCode();case 7:case"end":return e.stop()}}),e)})))()},sendEmailCode:function(){var a=this;return(0,n.default)((0,i.default)().mark((function e(){var t,s;return(0,i.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={type:1,email:a.emailVal,userid:a.$getStorage("userId"),token:a.$getStorage("token")},e.next=3,o.SetService.sendEmailCode(t);case 3:s=e.sent,2e3===s.status&&(uni.hideLoading(),a.goPage("/pages/wallet/password/edit-password/email-code?type=edit&email=".concat(a.emailVal)));case 5:case"end":return e.stop()}}),e)})))()},goPage:function(a){uni.navigateTo({url:a,success:function(){console.log("成功")},fail:function(a){console.log(a)}})}}};e.default=r}}]);