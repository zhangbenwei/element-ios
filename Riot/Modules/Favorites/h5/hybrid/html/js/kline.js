	var myChart;

	async function post(url,data) {
		console.log('--------------post-------------------')
		console.log(data)
		
		let baseUrl='https://v3.app.tdex.cz';
		return new Promise((resolve,reject)=>{
			axios({
				
				url:baseUrl+url,
				method:'post',
				data: {
					data: JSON.stringify(data),
				},
				
				transformRequest: [function(data) {
				
					let ret = ''
					for(let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret
				}],
				
				headers:{
					"Content-Type": "application/x-www-form-urlencoded",
				},
				
			})
			.then(res=>{
				console.log(res)
				if(res.data.code==1){
					resolve(res.data)
				}else{
					reject()
					alertError('请求超时')
				}
			})
			.catch(err=>{
				alertError('请求超时')
			})
		})
	}
	
	// 弹窗
	function alertError(title) {
		document.addEventListener('plusready',function() {
			console.log('......')
		})
		try{
			plus.nativeUI.toast(title, {
				 icon:'/static/common/toast-error.png',
				 style:'inline',
				 verticalAlign:'top'
			});
		}catch(e){
			//TODO handle the exception
		}
	}

	var app = new Vue({
		el:'#app',
		data:{
			MA5:'',
			MA10:'',
			MA30:'',
			volMA5:'',
			volMA10:'',
			current:1,
			tabs:[
				{'label':'5次','value':1},
				{'label':'30次','value':2},
				{'label':'240次','value':3},
				{'label':'1440次','value':4},
				{'label':'10080次','value':5}
			],
			category:1,
			categoryList:[
				{'label':'深度','value':1},
				{'label':'成交','value':2},
				{'label':'简介','value':3},
			],
			txData:{},//交易数据统计
			buyList:[],
			sellList:[],
			dealHis:[],
			tokenInfo:{},
			page:1,
			price:0,
			coin:'TT',
			tokenDetail:{},
			data_24:{},
			kdata:[],
			now_k_id:0,
			padding:true,
			
			
			//文字
			range:'漲跌幅',
			high:'高',
			low:'低',
			Total:'總量',
			times:'次數',
			buy:'買入',
			sell:'賣出',
			date:'時間',
			open:'開',
			close:'收',
			rate:'比例',
			executed:'成交量'
			
			
			
			
		},
		created() {
			this.current=2;
			this.price = this.getStorage('price');
			this.coin = this.getStorage('coin');
			var lang = this.getStorage('lang');
			
			if(lang == 'en') {
				this.range='Range'
				this.high='High'
				this.low='Low'
				this.Total='Total'
				this.times='Times'
				this.buy='Buy'
				this.sell='Sell'
				this.date='Date'
				this.open='Open'
				this.close='Close'
				this.rate='Rate'
				this.executed='Executed'
				
				this.tabs = [
					{'label':'5 T','value':1},
					{'label':'30 T','value':2},
					{'label':'240 T','value':3},
					{'label':'1440 T','value':4},
					{'label':'10080 T','value':5}
				]
			}
			
			this.tokenDetail = this.getTokenInfoBySymbol(this.coin);
			
			this.getDepth()
		},
		async mounted() {
			this.current=2;
			await this.getData(this.tokenDetail['contract'],this.tokenDetail['dex_contract'])
			
			// await this.getKdata(5 , '0xffff')
			// this.getTxData()
			myChart = echarts.init(document.getElementById('main'));
			this.draw()
			
			this.getKline()
		},
		methods:{
			
			async getData(contract,dex_contract){
				let keyValue = {};
				keyValue['contract'] =  contract;
				keyValue['dex_contract'] = dex_contract;
				var kv = this.apiChannel(keyValue);
				
				//获取最近24小时的数据
				var res = await post('/get_24_info' , kv)
				var high  = this.setNowPrice(res.list.highest_24 , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
				var low  = this.setNowPrice(res.list.lowest_24 , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
				var low_before  = this.setNowPrice(res.list.price_24h_before , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
				var upRate = low_before/low;
				// var volume  = res.list.total_24/10000000;
				var init_volume  =parseFloat(this.setNowPrice(res.list.total_24, 0,
					this.tokenDetail['decimals'], 0).toFixed(4))/1000
					
				if(init_volume > 1000) {
					var volume =parseFloat(init_volume/1000).toFixed(4)+' M'
				} else {
					var volume = parseFloat(init_volume).toFixed(4)+' K'
				}
					
				var st = '+';
				if(low > low_before) {
					st = '+ ';
				} else {
					st = '- ';
				}
				this.txData={
						// 最新成交价
						"lastPrice": this.price,
						// 涨幅
						"upRate": st+upRate.toFixed(2),
						// 1涨绿 2跌红
						"upFlag": "2",
						// 24小时交易量
						"volume": volume,
						// 24小时最高价
						"high": high,
						// 24小时最低价
						"low": low
				}
				
			},
			async getKdata(type,kid){
				
				this.padding = false;
				
				let keyValue = {};
				keyValue['contract'] =  this.tokenDetail['contract'];
				keyValue['type'] = type;
				keyValue['start_k_id'] = kid;
				keyValue['count'] = 50;
				keyValue['dex_contract'] = this.tokenDetail['dex_contract'];
				var kv = this.apiChannel(keyValue);
				var res = await post('/get_k_line_data_v2_1' , kv)
				
				if(res.code == 1) {
					let list = res.list;
					
					if(kid == '0xffff') {
						list.forEach((e, index) => {
							var d = [];
							// ["2004-02-27", 10581.55, 10583.92, 10519.03, 10689.55, 200050000,0.08]
							console.log('----------e, index---------------------')
							
							// console.log(index)
							if(index == 0) {
								this.now_k_id = e.k_id
								
								console.log('------------next----1----------')
								
								console.log(this.now_k_id)
							}
							
							d[0] = e.end_date;
							d[1] = this.setNowPrice(e.price_start , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
							d[2] = this.setNowPrice(e.price_end , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
							d[3] = this.setNowPrice(e.price_min , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
							d[4] = this.setNowPrice(e.price_max , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
							d[5] = (e.number/10000).toFixed(4);
							d[6] = ((d[4]-d[3])/this.price).toFixed(4);
							
							
							// console.log('----------res---------------------')
							this.kdata.push(d)
							// console.log(d)
							// if(kid == '0xffff') {
								
							// } else {
							// 	this.kdata.unshift(d)
							// }
							// 
							
						})
					} else {
						for (var i= list.length-1;i>=0;i--){
						　　　var d = [];
							// ["2004-02-27", 10581.55, 10583.92, 10519.03, 10689.55, 200050000,0.08]
							console.log('----------e, index---------------------')
							
							// console.log(index)
							if(i == 0) {
								this.now_k_id = list[i].k_id
								
								console.log('------------next----1----------')
								
								console.log(this.now_k_id)
							}
							
							d[0] = list[i].end_date;
							d[1] = this.setNowPrice(list[i].price_start , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
							d[2] = this.setNowPrice(list[i].price_end , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
							d[3] = this.setNowPrice(list[i].price_min , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
							d[4] = this.setNowPrice(list[i].price_max , this.tokenDetail['decimals'], 18,this.tokenDetail['price_decimals'])
							d[5] = (list[i].number/10000).toFixed(4);
							d[6] = ((d[4]-d[3])/this.price).toFixed(4);
							
							
							// console.log('----------res---------------------')
							this.kdata.unshift(d)
						}
					}
					
					
					
					console.log(this.kdata)
				}
				
				this.padding = true;
				
				
			},
			//獲取對應幣種的詳細信息
			getTokenInfoBySymbol(symbol){
				var tokenDetail
				let tokenAll = this.getStorage('tokenSymbol');
				var chain = "HECO"
				tokenAll.forEach((token, index) => {
					if(token['symbol'] == symbol && token['block_chain'] == chain) {
						tokenDetail = token;
					}
					
				})
				return tokenDetail;
			},
			//处理价格
			setNowPrice(blockPrice, qian_decimals, hou_decimals, price_decimals) {
				return parseFloat(blockPrice) * Math.pow(10, (parseInt(qian_decimals) - parseInt(hou_decimals) - parseInt(
					price_decimals)));
			},
			formatnumber(value, num) {
				var a, b, c, i;
				a = value.toString();
				b = a.indexOf(".");
				c = a.length;
				if (num == 0) {
					if (b != -1) {
						a = a.substring(0, b);
					}
				} else { //如果没有小数点
					if (b == -1) {
						a = a + ".";
						for (i = 1; i <= num; i++) {
							a = a + "0";
						}
					} else { //有小数点，超出位数自动截取，否则补0
						a = a.substring(0, b + num + 1);
						for (i = c; i <= b + num; i++) {
							a = a + "0";
						}
					}
				}
				return a;
			},
			apiChannel(keyValue) {
				
				keyValue["SIGN"] = md5(new Date().getTime()).toUpperCase();
				
				var sign = this.make_sign(keyValue);
				if (sign != '') {
					keyValue['sign'] = sign;
				}
				var data = JSON.stringify(keyValue);
				return keyValue;
			},
			make_sign(dict) {
				var encryption_key = "[tdex_2021.9.23]";
			
				if (encryption_key == '')
					return '';
			
				if (dict.hasOwnProperty("sign"))
					delete dict["sign"];
			
				var str = this.json_sort(dict);
				str += '&key=' + encryption_key;
			
				var data = this.encode(str);
				
				// var data ='123123';
				
				// ca.log(data);
				return md5(data).toUpperCase();
			},
			
			json_sort(dict) {
				var arr = [];
				for (var key in dict) {
					arr.push(key)
				}
			
				arr.sort();
			
				var str = '';
				for (var i in arr) {
					str += arr[i] + "=" + dict[arr[i]] + "&"
				}
				return str.substr(0, str.length - 1)
			},		
			
			_utf8_encode(string){
				string = string.replace(/\r\n/g,"\n");
				var utftext = "";
				for (var n = 0; n < string.length; n++) {
				    var c = string.charCodeAt(n);
				    if (c < 128) {
				        utftext += String.fromCharCode(c);
				    } else if((c > 127) && (c < 2048)) {
				        utftext += String.fromCharCode((c >> 6) | 192);
				        utftext += String.fromCharCode((c & 63) | 128);
				    } else {
				        utftext += String.fromCharCode((c >> 12) | 224);
				        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				        utftext += String.fromCharCode((c & 63) | 128);
				    }
					
				}
				return utftext;
			},
			encode(input){
				var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
					
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;
				input = this._utf8_encode(input);
				while (i < input.length) {
				    chr1 = input.charCodeAt(i++);
				    chr2 = input.charCodeAt(i++);
				    chr3 = input.charCodeAt(i++);
				    enc1 = chr1 >> 2;
				    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				    enc4 = chr3 & 63;
				    if (isNaN(chr2)) {
				        enc3 = enc4 = 64;
				    } else if (isNaN(chr3)) {
				        enc4 = 64;
				    }
				    output = output +
				        keyStr.charAt(enc1) + keyStr.charAt(enc2) +
				        keyStr.charAt(enc3) + keyStr.charAt(enc4);
				}
				return output;
			},
			
			
			
			
			
			
			
			
			
			
			// 返回上一页
			back(){
				uni.navigateBack()
			},
			// 获取24小时交易数据统计
			// getTxData(){
			// 	this.txData=txData;
			// },
			// 获取k线数据,生成k线
			async getKline(type = ''){
				var current = this.current
				console.log('-------------getkline---------------')
				console.log(this.kdata)
				myChart.showLoading();
				var ktype = 0;
				if(current == 1) {
					ktype = 5;
				}
				if(current == 2) {
					ktype = 30;
				}
				if(current == 3) {
					ktype = 240;
				}
				if(current == 4) {
					ktype = 1440;
				}
				if(current == 5) {
					ktype = 10080;
				}
				
				if(type == 1) {
					
					if(this.padding == false) {
						myChart.hideLoading();
						return;
					}
					
					var start_id = this.now_k_id;
					
					
					
					await this.getKdata(ktype , start_id)
					
					var test_rwa_data=this.kdata;
					
					var test_dates = test_rwa_data.map(function(item) {
						return item[0];
					});
					var test_data = test_rwa_data.map(function(item) {
						return [+item[1], +item[2], +item[3], +item[4], +item[5], +item[6]];
					});
					
					var test_volumes = test_rwa_data.map(function(item, index) {
						return [index, item[5], item[1] > item[2] ? 1 : -1];
					});
					
					// var test_dataMA5 = this.calculateMA(5, test_data);
					// var test_dataMA10 = this.calculateMA(10, test_data);
					// var test_dataMA30 = this.calculateMA(30, test_data);
					var test_volumeMA5 = this.calculateMA(5, test_volumes);
					myChart.hideLoading();
					myChart.setOption({
						xAxis: [
							{
								data: test_dates
							},
							{
								data: test_dates
							},
						],
						series: [
							{
								name: '日K',
								data: test_data
							},
							// {
							// 	name: 'MA5',
							// 	data: test_dataMA5
							// },
							// {
							// 	name: 'MA10',
							// 	data: test_dataMA10
							// },
							// {
							// 	name: 'MA30',
							// 	data: test_dataMA30
							// },
							{
								name: 'Volume',
								data: test_volumes
							},
							{
								name: 'VolumeMA5',
								data: test_volumeMA5
							}
						]
					})
				} else {
					
					
					this.kdata = [];
					await this.getKdata(ktype , '0xffff')
					var dates = this.kdata.map(function(item) {
						return item[0];
					});
					var data = this.kdata.map(function(item) {
						return [+item[1], +item[2], +item[3], +item[4], +item[5], +item[6]];
					});
					var volumes = this.kdata.map(function(item, index) {
						return [index, item[5], item[1] > item[2] ? 1 : -1];
					});
					// var dataMA5 = this.calculateMA(5, data);
					// var dataMA10 = this.calculateMA(10, data);
					// var dataMA30 = this.calculateMA(30, data);
					var volumeMA5 = this.calculateMA(5, volumes);
					myChart.hideLoading();
					myChart.setOption({
						xAxis: [
							{
								data: dates
							},
							{
								data: dates
							},
						],
						series: [
							{
								name: '日K',
								data: data
							},
							// {
							// 	name: 'MA5',
							// 	data: dataMA5
							// },
							// {
							// 	name: 'MA10',
							// 	data: dataMA10
							// },
							// {
							// 	name: 'MA30',
							// 	data: dataMA30
							// },
							{
								name: 'Volume',
								data: volumes
							},
							{
								name: 'VolumeMA5',
								data: volumeMA5
							}
						]
					})
					
				}
				
			},
			
			//设置缓存
			setStorage(key,value){
			   localStorage.setItem(key,JSON.stringify(value))   
			},
			//获取缓存
			getStorage(key){
				var sto = localStorage.getItem(key);
				try{
					var res = JSON.parse(sto)
					return res.data;
				}catch(e){
					return sto;
				}
			},
			// 列表条数不足补全
			addItem(list,type){
				// type: 1开头加，2末尾加
				list=list || [];
				let len=20-list.length;
				if(len>0){
					for(let i=0;i<len;i++){
						if(type==1){
							list.unshift({})
						}else{
							list.push({})
						}
					}
				}
				return list;
			},
			// 获取深度数据
			getDepth(){
				this.buyList=this.addItem(depthList().buyList || []);
				this.sellList=this.addItem(depthList().sellList || []);
			},
			// 获取成交记录
			getDealHis(){
				this.dealHis=dealHis();
			},
			// 获取项目简介信息
			getTokenInfo(){
				this.tokenInfo=tokenInfo;
			},
			
			// 切换tab
			switchTab(val){
				console.log('--------切换------------')
				console.log(val)
				if(this.current==val) return;
				this.current=val;
				this.getKline()
			},
			// 切换类目
			switchCategory(val){
				if(this.category==val) return;
				this.category=val;
				if(this.category==1){
					this.getDepth()
				}else if(this.category==2){
					this.getDealHis()
				}else{
					this.getTokenInfo()
				}
			},
			// 截取数字字符串 保留precision小数
			formatterNum(value, precision) {
				// console.log(value)
				let reg = new RegExp('^\\d+(?:\\.\\d{0,' + precision + '})?')
				return value.toString().match(reg)
			},
			// 计算MA
			calculateMA(dayCount, data) {
				var result = [];
				for (var i = 0, len = data.length; i < len; i++) {
					if (i < dayCount) {
						result.push('-');
						continue;
					}
					var sum = 0;
					for (var j = 0; j < dayCount; j++) {
						sum += data[i - j][1];
					}
					// console.log(sum, dayCount)
					result.push((sum / dayCount).toFixed(2));
				}
				return result;
			},
			// 绘制(配置项)
			draw(){
				let that=this;
				var upColor = '#03ad91';
				var downColor = '#dd345b';
				var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074',
					'#546570', '#c4ccd3'
				];
				var labelFont = 'bold 12px Sans-serif';
				var option = {
					backgroundColor: '#0d1723',
					title: {
						show: false
					},
					legend: {
						show: false
					},
					visualMap: {
					            show: false,
					            seriesIndex: 4,
					            dimension: 2,
					            pieces: [{
					                value: 1,
					                color: downColor
					            }, {
					                value: -1,
					                color: upColor
					            }]
					        },
					grid: [{
							top: '5%',
							left: 20,
							right: 20,
							height: '70%'
						},
						{
							top: '80%',
							left: 20,
							right: 20,
							height: '16%'
						},
					],
					axisPointer: { //坐标轴指示器配置项
						link: {
							xAxisIndex: 'all'
						},
						label: {
							backgroundColor: '#0d1723',
							color: '#fff',
							borderColor: 'rgb(99, 117, 139)',
							borderWidth: 1,
							borderRadius: 2,
							fontSize: 10
						}
					},
					xAxis: [{
						type: 'category', //坐标轴类型。(value:数值轴，适用于连续数据。,category:类目轴，适用于离散的类目数据,time: 时间轴，适用于连续的时序数据,log:对数轴。适用于对数数据)
						data: [], //类目数据，在类目轴（type: 'category'）中有效。
						scale: true,
						boundaryGap: true, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
						axisLine: {
							show: false
						}, //坐标轴轴线相关设置
						axisTick: {
							show: false
						}, //坐标轴刻度相关设置。
						axisLabel: {
							show: false,
						}, //坐标轴刻度标签的相关设置。
						splitLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255, 0.1)'
							}
						}, //坐标轴在 grid 区域中的分隔线。
						min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
						max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
						axisPointer: {
							label: {
								margin: 200
							}
						},
					}, {
						type: 'category',
						gridIndex: 1, //x 轴所在的 grid 的索引，默认位于第一个 grid。
						data: [], //类目数据，在类目轴（type: 'category'）中有效。
						scale: true,
						boundaryGap: true, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
						axisLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255,1)',
								width: 1
							}
						}, //坐标轴轴线相关设置
						axisTick: {
							show: false
						}, //坐标轴刻度相关设置。
						axisLabel: { //坐标轴刻度标签的相关设置。
							show: true,
							margin: 6,
							fontSize: 10,
							color: 'rgba(99, 117, 139, 1.0)',
							formatter: function(value) {
								return echarts.format.formatTime('MM-dd', value);
							}
						},
						splitNumber: 20,
						splitLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255, 0.1)'
							}
						}, //坐标轴在 grid 区域中的分隔线。
						min: 'dataMin', //坐标轴刻度最小值。可以设置成特殊值 'dataMin'，此时取数据在该轴上的最小值作为最小刻度。
						max: 'dataMax', //坐标轴刻度最大值。可以设置成特殊值 'dataMax'，此时取数据在该轴上的最大值作为最大刻度。
						// axisPointer: { show: true, type: 'none', label: { show: false }},
					}],
					yAxis: [{
						type: 'value', //坐标轴类型。(value:数值轴，适用于连续数据。,category:类目轴，适用于离散的类目数据,time: 时间轴，适用于连续的时序数据,log:对数轴。适用于对数数据)
						position: 'right', //y 轴的位置。'left','right'
						scale: true, //是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。在双数值轴的散点图中比较有用。(在设置 min 和 max 之后该配置项无效。)
						axisLine: {
							show: true
						}, //坐标轴轴线相关设置。
						axisTick: {
							show: true,
							inside:true
						}, //坐标轴刻度相关设置。
						axisLabel: { //坐标轴刻度标签的相关设置。
							show: true,
							color: 'rgba(99, 117, 139, 1.0)',
							inside: true,
							fontSize: 10,
							formatter: function(value) {
								return Number(value).toFixed(4)
							}
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255, 0.1)'
							}
						}, //坐标轴在 grid 区域中的分隔线。
					}, {
						type: 'value',
						position: 'right',
						scale: true,
						gridIndex: 1,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false
						},
						splitLine: {
							show: false
						}
					}],
				
					animation: false, //是否开启动画。
					color: colorList,
					tooltip: {
						show: true, //是否显示提示框组件，包括提示框浮层和 axisPointer。
						trigger: 'axis', //触发类型。item,axis,none
						formatter(params){
							let tooltip = '';
							let time = '', open = 0, high = 0, low = 0, close = 0, amount = 0;
							for (var i = 0; i < params.length; i++) {
								if (params[i].seriesName === '日K') {
									time = params[i].name;
									open = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[1], 4)) : 0;
									close = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[2], 4)) : 0;
									low = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[3], 4)) : 0;
									high = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[4], 4)) : 0;
									amount = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[5], 2)) : 0;
									float = params[i].data.length > 1 ? Number(that.formatterNum(params[i].data[6], 4)) : 0;
									// console.log(time,open,close,low,high,amount)
									tooltip = '<div class="charts-tooltip">' +
										'<div class="charts-tooltip-row"><div class="ctr-label">' + that.date + '</div><div class="ctr-value-time">' + time + '</div></div>' + 
										'<div class="charts-tooltip-row"><div class="ctr-label">' + that.open + '</div><div class="ctr-value">' + open + '</div></div>' + 
										'<div class="charts-tooltip-row"><div class="ctr-label">' + that.high + '</div><div class="ctr-value">' + high + '</div></div>' + 
										'<div class="charts-tooltip-row"><div class="ctr-label">' + that.low + '</div><div class="ctr-value">' + low + '</div></div>' + 
										'<div class="charts-tooltip-row"><div class="ctr-label">' + that.close + '</div><div class="ctr-value">' + close + '</div></div>' + 
										'<div class="charts-tooltip-row"><div class="ctr-label">' + that.range + '</div><div class="ctr-value">+' + float + '%</div></div>' + 
										'<div class="charts-tooltip-row"><div class="ctr-label">' + that.executed + '</div><div class="ctr-value">' +amount + '</div></div></div>';
								}
								if (params[i].seriesName === 'MA5') {
									that.MA5 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
								}
								if (params[i].seriesName === 'MA10') {
									that.MA10 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
								}
								if (params[i].seriesName === 'MA30') {
									that.MA30 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
								}
								if (params[i].seriesName === 'VolumeMA5') {
									that.volMA5 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
								}
								if (params[i].seriesName === 'VolumeMA10') {
									that.volMA10 = params[i].data !== 'NAN' ? Number(that.formatterNum(params[i].data, 2)) : 0
								}
							}
							return tooltip;
						},
						triggerOn: 'click', //提示框触发的条件 'mousemove','click','mousemove|click','none'
						textStyle: {
							fontSize: 10
						}, //提示框浮层的文本样式
						backgroundColor: 'rgba(30,42,66,0.8);', //提示框浮层的背景颜色。
						borderColor: '#2f3a56', //提示框浮层的边框颜色。
						borderWidth:2,
						position: function(pos, params, el, elRect, size) { //提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。
							var obj = {
								top: 20
							};
							obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10;
							return obj;
						},
						axisPointer: { //坐标轴指示器配置项。
							label: {
								color: 'rgba(255,255,255,.87)',
								fontSize: 9,
								backgroundColor: '#020204',
								borderColor: "#9c9fa4",
								shadowBlur: 0,
								borderWidth: 0.5,
								padding: [4, 2, 3, 2],
							},
							animation: false,
							type: 'cross',
							lineStyle: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: 'rgba(30, 42, 66, 0.1)' // 0% 处的颜色
									}, {
										offset: 0.7,
										color: 'rgba(30, 42, 66,0.9)' // 100% 处的颜色
									}, {
										offset: 1,
										color: 'rgba(30, 42, 66,0.2)' // 100% 处的颜色
									}]
								},
								width: 10,
								shadowColor: 'rgba(30, 42, 66,0.7)',
								shadowBlur: 0,
								shadowOffsetY: 68,
							}
						}
					},
				
					dataZoom: [{ //用于区域缩放
						type: 'inside',
						xAxisIndex: [0, 1],
						realtime: false,
						start: 50,
						end: 100,
					}
					],
					series: [
						{
							type: 'candlestick',
							name: '日K',
							data: [],
							itemStyle: {
								color: upColor,
								color0: downColor,
								borderColor: upColor,
								borderColor0: downColor
							},
							markPoint: {
								symbol: 'rect',
								symbolSize: [-10, 0.5],
								symbolOffset: [5, 0],
								itemStyle: {
									color: 'rgba(255,255,255,.87)'
								},
								label: {
									color: 'rgba(255,255,255,.87)',
									offset: [10, 0],
									fontSize: 10,
									align: 'left',
									formatter: function(params) {
										return Number(params.value).toFixed(2)
									}
								},
								data: [{
										name: 'max',
										type: 'max',
										valueDim: 'highest'
									},
									{
										name: 'min',
										type: 'min',
										valueDim: 'lowest'
									}
								]
							},
						}, 
						{
							name: 'MA5',
							type: 'line',
							data: [],
							symbol: 'none',//去除圆点
							smooth: true,
							lineStyle: { normal: { opacity: 1, width: 1, color: "#eef4ba" } },
							z: 5
						}, 
						{
							name: 'MA10',
							type: 'line',
							data: [],
							symbol: 'none',//去除圆点
							smooth: true,
							lineStyle: { normal: { opacity: 1, width: 1, color: '#83c1c5' } },
							z: 4
						},
						{
							name: 'MA30',
							type: 'line',
							data: [],
							symbol: 'none',//去除圆点
							smooth: true,
							lineStyle: { normal: { opacity: 1, width: 1, color: '#b39cd8' } },
							z: 3
						},
						{
								name: 'Volume',
								type: 'bar',
								xAxisIndex: 1,
								yAxisIndex: 1,
								data: []
							},
							{
								name: 'VolumeMA5',
								type: 'line',
								xAxisIndex: 1,
								yAxisIndex: 1,
								data: [],
								symbol: 'none',//去除圆点
								smooth: true,
								lineStyle: { normal: { opacity: 1, width: 1, color: "#eef4ba" } },
								z: 5
							},
							{
								name: 'VolumeMA10',
								type: 'line',
								xAxisIndex: 1,
								yAxisIndex: 1,
								data: [],
								symbol: 'none',//去除圆点
								smooth: true,
								lineStyle: { normal: { opacity: 1, width: 1, color: '#83c1c5' } },
								z: 4
							},
					]
				};
				myChart.setOption(option);
				// 加载上一页数据
				myChart.on('datazoom',function(params){
					let num=params.batch[0]['start'];
					if(num==0){
						console.log('到最左边了')
						
						that.getKline(1)
					}
				})
				window.addEventListener('resize', () => { myChart.resize()})
			}
		},
		components: {
			// Base64
		}
	})
