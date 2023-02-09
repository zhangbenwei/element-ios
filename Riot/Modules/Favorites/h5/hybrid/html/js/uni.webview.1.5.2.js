! function(e, n) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define &&
		define.amd ? define(n) : (e = e || self).uni = n()
}(this, function() {
	"use strict";

	function i(e, n) {
		var i = {
			options: {
				timestamp: +new Date
			},
			name: e,
			arg: n
		};
		if (window.__dcloud_weex_postMessage || window.__dcloud_weex_) {
			if ("postMessage" === e) {
				var t = {
					data: [n]
				};
				return window.__dcloud_weex_postMessage ? window.__dcloud_weex_postMessage(t) : window.__dcloud_weex_.postMessage(
					JSON.stringify(t))
			}
			var o = {
				type: c,
				args: {
					data: i,
					webviewIds: w
				}
			};
			window.__dcloud_weex_postMessage ? window.__dcloud_weex_postMessageToService(o) : window.__dcloud_weex_.postMessageToService(
				JSON.stringify(o))
		}
		if (!window.plus) return window.parent.postMessage({
			type: c,
			data: i,
			pageId: ""
		}, "*");
		if (0 === w.length) {
			var a = plus.webview.currentWebview();
			if (!a) throw new Error("plus.webview.currentWebview() is undefined");
			var d = a.parent(),
				r = "";
			r = d ? d.id : a.id, w.push(r)
		}
		if (plus.webview.getWebviewById(u)) plus.webview.postMessageToUniNView({
			type: c,
			args: {
				data: i,
				webviewIds: w
			}
		}, u);
		else {
			var s = JSON.stringify(i);
			plus.webview.getLaunchWebview().evalJS('UniPlusBridge.subscribeHandler("'.concat(c, '",').concat(s, ",").concat(
				JSON.stringify(w), ");"))
		}
	}
	var w = [],
		u = "__uniapp__service",
		c = "WEB_INVOKE_APPSERVICE",
		n = {
			navigateTo: function(e) {
				var n = (0 < arguments.length && void 0 !== e ? e : {}).url;
				i("navigateTo", {
					url: encodeURI(n)
				})
			},
			navigateBack: function(e) {
				var n = (0 < arguments.length && void 0 !== e ? e : {}).delta;
				i("navigateBack", {
					delta: parseInt(n) || 1
				})
			},
			switchTab: function(e) {
				var n = (0 < arguments.length && void 0 !== e ? e : {}).url;
				i("switchTab", {
					url: encodeURI(n)
				})
			},
			reLaunch: function(e) {
				var n = (0 < arguments.length && void 0 !== e ? e : {}).url;
				i("reLaunch", {
					url: encodeURI(n)
				})
			},
			redirectTo: function(e) {
				var n = (0 < arguments.length && void 0 !== e ? e : {}).url;
				i("redirectTo", {
					url: encodeURI(n)
				})
			},
			getEnv: function(e) {
				window.plus ? e({
					plus: !0
				}) : e({
					h5: !0
				})
			},
			postMessage: function(e) {
				i("postMessage", (0 < arguments.length && void 0 !== e ? e : {}).data || {})
			}
		},
		t = /uni-app/i.test(navigator.userAgent),
		o = /complete|loaded|interactive/;
	var a = window.my && -1 < navigator.userAgent.indexOf("AlipayClient");
	var d = window.swan && window.swan.webView && /swan/i.test(navigator.userAgent);
	var r = window.qq && window.qq.miniProgram && /QQ/i.test(navigator.userAgent) && /miniProgram/i.test(navigator.userAgent);
	var s = window.tt && window.tt.miniProgram && /toutiaomicroapp/i.test(navigator.userAgent);
	var g = window.wx && window.wx.miniProgram && /micromessenger/i.test(navigator.userAgent) && /miniProgram/i.test(
		navigator.userAgent);
	for (var e, v = function() {
			window.UniAppJSBridge = !0, document.dispatchEvent(new CustomEvent("UniAppJSBridgeReady", {
				bubbles: !0,
				cancelable: !0
			}))
		}, p = [function(e) {
			if (t) return window.__dcloud_weex_postMessage || window.__dcloud_weex_ ? document.addEventListener(
				"DOMContentLoaded", e) : window.plus && o.test(document.readyState) ? setTimeout(e, 0) : document.addEventListener(
				"plusready", e), n
		}, function(e) {
			if (g) return window.WeixinJSBridge && window.WeixinJSBridge.invoke ? setTimeout(e, 0) : document.addEventListener(
				"WeixinJSBridgeReady", e), window.wx.miniProgram
		}, function(e) {
			if (r) return window.QQJSBridge && window.QQJSBridge.invoke ? setTimeout(e, 0) : document.addEventListener(
				"QQJSBridgeReady", e), window.qq.miniProgram
		}, function(e) {
			if (a) {
				document.addEventListener("DOMContentLoaded", e);
				var n = window.my;
				return {
					navigateTo: n.navigateTo,
					navigateBack: n.navigateBack,
					switchTab: n.switchTab,
					reLaunch: n.reLaunch,
					redirectTo: n.redirectTo,
					postMessage: n.postMessage,
					getEnv: n.getEnv
				}
			}
		}, function(e) {
			if (d) return document.addEventListener("DOMContentLoaded", e), window.swan.webView
		}, function(e) {
			if (s) return document.addEventListener("DOMContentLoaded", e), window.tt.miniProgram
		}, function(e) {
			return document.addEventListener("DOMContentLoaded", e), n
		}], l = 0; l < p.length && !(e = p[l](v)); l++);
	e = e || {};
	var f = "undefined" != typeof uni ? uni : {};
	return f.navigateTo ? f.webView = e : Object.assign(f, e, {
		webView: e
	}), f
});
