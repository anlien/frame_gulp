
/********************Common *******共用的js*****/
(function($){
	var configAll ={
		requireUrl:""
	}

	//判断当前页面是否正确
	function currentPage(htmlUrl){
		return window.location.pathname.indexOf(htmlUrl)>0
	}

	//共用的一些方法
	window.common={
		requireUrl : configAll["requireUrl"],
		currentPage: currentPage
	};
})(jQuery);

//1-31代表号数，有广告的返回
var adData = {		
	1:{		
		putIn:{ //*1正在投放
			adName:{"ad001":"alienAd","ad002":"百度谷歌"},
			city:{
				"ad001":['郑州',"焦作","深圳","广州"],
				"ad002":["郑州","焦作"]
			},
			count:2
		},
		waitPut:{	//等待投放的
			adName:{"ad003":"暖手宝","ad004":"威士忌"},
			city:{"ad003":["北京","深圳","广州"],"ad004":["上海","新疆"]},
			count:2
		}		
	},
	20:{
		putIn:{ //*1正在投放
			adName:{"ad001":"alienAd","ad002":"百度谷歌"},
			city:{"ad001":["郑州","焦作","深圳","广州"],"ad002":["郑州","焦作"]},
			count:2
		},
		waitPut:{	//等待投放的
			adName:{"ad003":"暖手宝","ad004":"威士忌"},
			city:{"ad003":["北京","深圳","广州"],"ad004":["上海","新疆"]},
			count:2
		}		
	}			
};

(function($,window){	
	if(!common.currentPage("adPlaceParticulars.html")) return false;	
	var calenderObj = null;		
 	function Calendar($contains,data){
		if(!$contains){
		   throw "没有存放日历的容器";
		}
		this.container = $contains;
		this.data = data;			
		this.nowDateInfo  = null; //当前日期的

		this.selectedDay={}; 

		this.selectDate =[]; //存放选定的日期
		this.leisureDate=[]; //空闲的时间	

		//选中或取消选中某天，更新根据日系现实的信息
		this.selectDateUpdateHandle=null;
		this.selectAdInfoHandle = null; //查看投放广告的信息
	};

	//初始化
	Calendar.prototype.init=function(){
		this.initDateInfo = this.getDateInfo(new Date());//初始化时的日期信息
		this.createCalendar(this.data,this.getMonthInfo());	
		this.prevNextMonthEvent();
		this.clickEvent();
	}

	Calendar.prototype.getDateInfo=function(dateObj){
		if(!dateObj){
			console.error("dateObj is null");
			return false;
		}
		return{
			year :dateObj.getFullYear(),
			month:parseInt(dateObj.getMonth())+1,
			day:dateObj.getDate()
		}
	}
	/**	{year:"",month:"",day:""}**/
	Calendar.prototype.getMonthInfo=function(obj){		/*year**month**day**/		

		var _date = new Date();
			_dataInfObj= this.getDateInfo(_date);

		if(obj && (obj.year || obj.month || obj.day)){
			_date = new Date((obj.year||_dataInfObj.year)+"-"+(obj.month||_dataInfObj.month)+"-"+(obj.day||_dataInfObj.day));			
			_dataInfObj = this.getDateInfo(_date);
		}		
		this.nowDateInfo = _dataInfObj;

		var _dayCount = this.getDayCount(_dataInfObj.year,_dataInfObj.month),//天数
			_weeks = this.getMonthWeeks(_dayCount),//周数
			_dayOfTheWeek = this.dayOfTheWeek(_dataInfObj.year,_dataInfObj.month,_dataInfObj.day);			
			
		return {
			nowYear:_dataInfObj.year,
			nowMoth:_dataInfObj.month,
			nowDay:_dataInfObj.day,
			dayCount:_dayCount,
			weeks:_weeks, //总共几周
			dayOfTheWeek : _dayOfTheWeek  //月初星期几
		}	
	}

	//获得本月天数
	Calendar.prototype.getDayCount = function(year, month){
		var day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          	day[1] = (0 == year % 4 && (year % 100 != 0 || year % 400 == 0)) ? 29 : 28;          	
         return day[month - 1];
	}

	//获取本月有几周
	Calendar.prototype.getMonthWeeks = function(days){
		var _weeks = days/7,
			_remainder=days%7;			
		return _remainder > 0 ? (_weeks+1): _weeks;
	}	

	//获取星期几
	Calendar.prototype.dayOfTheWeek=function(year,month,day){
		return new Date(year+'-'+month+"-"+day).getDay();
	}	

	//与数据结合拼接日历
	Calendar.prototype.createCalendar =function(dataObj,dateObj){

		var _this = this, 
			_nowYear=dateObj.nowYear,
			_nowMoth=dateObj.nowMoth,
		 	_nowDay = dateObj.nowDay,
			_dayCount = dateObj.dayCount,
			_weeks = dateObj.weeks,
			_fistDayWeek = this.dayOfTheWeek(_nowYear,_nowMoth,1),
			_dayOfTheWeek =dateObj.dayOfTheWeek,
			_date = 0;
		
		//存放的数据
		var	monthDataArr = new Array(dateObj.dayCount),//当月总数
			firstDayOfWeek = _this.dayOfTheWeek(_nowYear,_nowMoth,1);		

		//当月某天有数据的模板
		$.each(dataObj,function(key,val){			
			if(_this.isTimeInterval(dateObj,key)===-1){			
				monthDataArr[key] = _this.pastDueTemplate(val,key,_this.getWhatDay(firstDayOfWeek,key));
			}else{
				monthDataArr[key] = _this.putInTemplate(val,key,_this.getWhatDay(firstDayOfWeek,key));
			}		
		});
		
		//没有数据模板处理
		$.each(monthDataArr,function(key, val) {
			_date = (key+1);					
			if(!monthDataArr[_date]){ 
			   monthDataArr[_date] = _this.isTimeInterval(dateObj,_date)===-1 ? _this.pastDueNullTemplate(_date,_this.getWhatDay(firstDayOfWeek,_date)): 
			   											    _this.selectionTemplate(_date,_this.getWhatDay(firstDayOfWeek,_date));
			}	
		});
		this.container.children('ul').remove();
		var ulClassName = _dayCount === 29 ? 'class="twentyNine"' : _dayCount === 30 ? 'class="thirtyDay"':"";

		this.container.append('<ul '+ulClassName+'>'+monthDataArr.join('')+'</ul>');
	}

	//判断时间区间
	Calendar.prototype.isTimeInterval = function(nowDate,day){ //0是当月；-1 是过去；1是未来   now取目前、当前的意思  ) && (this.initDateInfo.month>nowDate.nowMoth)
		if((this.initDateInfo.year>nowDate.nowYear) || (this.initDateInfo.year===nowDate.nowYear && this.initDateInfo.month>nowDate.nowMoth)){
			return -1;
		}
		if((this.initDateInfo.year<nowDate.nowYear) || (this.initDateInfo.year===nowDate.nowYear && this.initDateInfo.month<nowDate.nowMoth)){
			return 1;
		}

		return this.initDateInfo.day <= day ? 1:-1;	//当月的
	}
	//判断当日是否选中	
	Calendar.prototype.isSelected=function(day){

		var key = this.nowDateInfo.year +''+ this.zeroFill(this.nowDateInfo.month),
			_data = this.selectedDay[key];	

		if(_data){ if(_data[key+this.zeroFill(day)])return true;}; 		
		return false;
	}
	//根据1号初星期几，算中间的星期几
	Calendar.prototype.getWhatDay = function(w,day){	
		var weeksArr = ["日","一","二","三","四","五","六"],	
			weekM = day%7,week,d;
			d = weekM ===0 ? w+1:(weekM-1)+w;
			if(d<7){
				week = d;
			}else{
				week = d-7;
			}			
		return weeksArr[week];
	}	

	//可选日期的模板
	Calendar.prototype.selectionTemplate=function(day,week){	
		var flag = this.isSelected(day),
			calssName = flag ? "selection pitchOn" : "selection",
			labelClass = flag ? 'class="selected"' : "";
		return '<li class="'+calssName+'">'+
				'<h6><span>周'+week+'</span><span>'+day+'</span></h6>'+
				'<label '+labelClass+'><input type="checkbox" name="select"></label></li>'
	}

	//已投放日期的模板
	Calendar.prototype.putInTemplate =function(data,day,week){
		return  '<li class="putIn">'+
				'<h6><span>周'+week+'</span><span>'+day+'</span></h6>'+
				'<div><strong>正在投放：</strong><span>'+data.putIn.count+'</span></div>'+
				'<div><strong>等待投放：</strong><span>'+data.waitPut.count+'</span></div></li>'
	}

	//不不可选无广告
	Calendar.prototype.pastDueNullTemplate = function(day,week){
		return  '<li class="pastDue">'+
				'<h6 class="dateInfo"><span>周'+week+'</span><span>'+day+'</span></h6>'+
				'</li>';
	}

	//不可选有广告
	Calendar.prototype.pastDueTemplate = function(data,day,week){
		var adName ='',adKey='';
		if(data && data.putIn && data.putIn.adName){
			$.each(data.putIn.adName,function(key, val) {
				adName = val;//等于最后一个广告，需要和产品协商
			});
		};
		return  '<li class="pastDue">'+
				'<h6 class="dateInfo"><span>周'+week+'</span><span>'+day+'</span></h6>'+
				'<p>'+adName+'</p></li>';

	}	

	//click点击事件
	Calendar.prototype.clickEvent= function(){
		var _this = this;
		_this.container.on('click', 'li', function(event) {
			event.preventDefault();
			var $this =$(this),
				date=$this.index()+1;			
			if(_this.isTimeInterval(_this.nowDateInfo,date)&& $this.hasClass('selection')){
				_this.selectOneDay($this,date);			
				// _this.fire('click')	
			}
			//投放的广告信息
			if($this.hasClass('putIn') || $this.hasClass('pastDue')){
				_this.getPutInAdInfo($this,date,!$this.hasClass('pastDue'));
			}				
		});
	}
	Calendar.prototype.prevNextMonthEvent = function(){
		var _this=this;
		_this.container.children('h5').on('click', 'img', function(event) {			
			event.preventDefault();
			var $this = $(this);
			if($this.hasClass('arrowsLeft')){
				_this.prevMonth();
			}

			if($this.hasClass('arrowsRight')){
				_this.nextMonth();
			}		
			_this.container.children('h5').children('span').text(_this.nowDateInfo.year+"年"+_this.nowDateInfo.month+'月排期');		
		});
	}

	//选择与取消某天
	Calendar.prototype.selectOneDay = function($this,date){
		if($this.hasClass('pitchOn')){
			this.delSelectDay(date); //删除选中的元素					
			$this.removeClass('pitchOn').children('label').removeClass('selected');
		}else{
			this.addSelectDay(date);
			$this.addClass('pitchOn').children('label').addClass('selected');
		}

		if(this.selectDateUpdateHandle){ //选中元素后更新外部的已选日期
			this.selectDateUpdateHandle(this.selectedDay);
			// this.selectDateUpdateHandle(this.selectedDay[this.nowDateInfo["year"]+''+this.zeroFill(this.nowDateInfo["month"])]);
		}
	}	
	//选中日期的处理
		//选中的日期 
		/**
			数据格式：
			{
				201607:{20160702:20160702#00:00#23:59,20160703:20160703#00:00#23:59},
				201608:{201683:20160805#11:33#22:44}
			}

		//日历中的数据，不考虑到期时间点，外部更改时再行计算
	****/
	Calendar.prototype.addSelectDay = function(day){
		var key = this.nowDateInfo["year"]+''+this.zeroFill(this.nowDateInfo["month"]);
			this.selectedDay[key] = this.selectedDay[key] || {};		
			this.selectedDay[key][key+this.zeroFill(day)]=(key+this.zeroFill(day)+"#00:00#23:59");
	}

	//补零
	Calendar.prototype.zeroFill=function(str){
		return (str+'').length===1?"0"+str: str+'';
	}

	Calendar.prototype.delSelectDay =function(day){		
		var _this = this,
			key = _this.nowDateInfo["year"]+''+_this.zeroFill(this.nowDateInfo["month"]);
		if(_this.selectedDay[key]){
			delete _this.selectedDay[key][key+_this.zeroFill(day)];
		}
	}

	//上一月
	Calendar.prototype.prevMonth = function(){		
		var _thisMonthInfo = this.nowDateInfo,
			year,month;		

		if(_thisMonthInfo.month === 1){
			year = (_thisMonthInfo.year-1);
			month = 12;
		}
		else{
			month = (_thisMonthInfo.month-1);
			year = _thisMonthInfo.year;
		}		
		this.createCalendar(this.data,this.getMonthInfo({"year":year,"month":month}));	
	}
	//下一月	
	Calendar.prototype.nextMonth = function(){
		var _thisMonthInfo = this.nowDateInfo,
			year,month;	
		if(_thisMonthInfo.month === 12){
			year = (_thisMonthInfo.year+1);
			month = 1;
		}
		else{
			month = (_thisMonthInfo.month+1);
			year = _thisMonthInfo.year;
		}
		this.createCalendar(this.data,this.getMonthInfo({"year":year,"month":month}));	
	}
	//查看投放中的广告信息
	Calendar.prototype.getPutInAdInfo = function($this,date,flag){
		if(!$this.hasClass('clickCalendar')){
			$this.addClass('clickCalendar').siblings().removeClass('clickCalendar');
			if(typeof this.selectAdInfoHandle === 'function'){
				this.selectAdInfoHandle(this.data[date],flag);
			}
		}
	}
	//选中空闲时间
	Calendar.prototype.selectLeisureTime = function(){
		this.container.children('ul').children('.selection:not(".pitchOn")').trigger('click');
	}	

	// Calendar.prototype.getSelectList = function(formatStr){
	// 	data = {
	// 		201607: {
	// 			20160715: 1
	// 		}
	// 	}

	// 	transferData(data)
	// 	return ['20160715']
	// }
	// // 注册
	// Calendar.prototype.on = function(type, func) {
	// 	this.observeMap = {
	// 		'click': [func1, func2, func3, func4]
	// 	}
	// };
	// Calendar.prototype.fire = function(type, data) {
	// 	 this.observeMap[type]
	// 	 for each(function(index, el) {
	// 	 	execute(data)
	// 	 });
	// }


	//获得选择的数据
	$(function(){
		//初始化样式		
		// var calendarObj = new Calendar($(".calendar"),adData, {
		// 	selectAdInfoHandle: function(data) {
		// 		setScheduleInfo(data)
		// 		otherFunc(data);
		// 	},
		// 	selectHandler: function(data){

		// 	}
		// });		

		// calendarObj.on('select', function(data) {

		// });

		var calendarObj = new Calendar($(".calendar"),adData);
			calendarObj.init();				
			calendarObj.selectDateUpdateHandle=setSelectDate;
			calendarObj.selectAdInfoHandle = setScheduleInfo;	

		$("a.selectFreeTime").on('click', function(event) {
			event.preventDefault();		
			calendarObj.selectLeisureTime();			
		});
	
		//已选日期
		/**
			数据格式：
			{
				201607:{20160702:20160702#00:00#23:59,20160703:20160703#00:00#23:59},
				201608:{201683:20160805#11:33#22:44}
			}
		//日历中的数据，不考虑到期时间点，外部更改时再行计算
	****/
		function setSelectDate(allData){	
			var _allData = Object.keys(allData),
				dataContainer =[],
				timeHtmlArr = null,
				dateArr =null;		

				_allData.map(function(val, index) {
					return parseInt(val);
				});
				_allData.sort();

			$.each(_allData,function(index, val) {					
				dateArr = Object.keys(allData[val]);
				dateArr.map(function(val, index) {
					return parseInt(val);
				});					
				
				if($.isArray(dateArr)){
					dateArr.sort();
					timeHtmlArr = dateArr.map(function(val,index) {
						return '<li><span>'+val.slice(4, 6)+"月"+val.slice(6, 8)+'日 00:00-23:59</span></li>';
					});					
				}

				dataContainer=dataContainer.concat(dataContainer,timeHtmlArr);							
			});			

			dataContainer.unshift('<li><strong>已选日期：</strong></li>');	
			$(".selectDate").html(dataContainer.join(''));
		}

		//排期详情
		function setScheduleInfo(data,flag){
			var adInfoContainer =[],
					htmlArr = [],
					dataArr = [],
					cityInfo='';
				adInfoContainer.push('<li class="scheduleCaption">排期详情&nbsp;2016-06-07</li>');
				if(data && data.putIn && data.waitPut){
				if(!flag){ 
					$.each(data.putIn.adName,function(adKey, adVal) {//过去的广告信息
							dataArr = data.putIn.city[adKey];				
							cityInfo = dataArr[0]+"等"+dataArr.length+"个城市";
							htmlArr.push('<li><span class="adPutIn">已投放</span><h5 class="adName">'+adVal+'</h5><strong>'+cityInfo+'</strong></li>');
						});	
					}else{ //正在投放的						
						$.each(data.putIn.adName,function(adKey, adVal) {//有广告信息的			
							dataArr = data.putIn.city[adKey];	
							cityInfo = dataArr[0]+"等"+dataArr.length+"个城市";
							htmlArr.push('<li><span class="adPutIn">正在投放</span><h5 class="adName">'+adVal+'</h5><strong>'+cityInfo+'</strong></li>');
						});		

						//等待投放
						$.each(data.waitPut.adName,function(adKey, adVal) {					
							dataArr = data.waitPut.city[adKey];			
							cityInfo = dataArr[0]+"等"+ dataArr.length+"个城市";				
							htmlArr.push('<li><span class="adPutIn">等待投放</span><h5 class="adName">'+adVal+'</h5><strong>'+cityInfo+'</strong></li>');
						});								
					}
				}		
				adInfoContainer.push(htmlArr.slice(0, 5).join(''));
				adInfoContainer.push('<li class="adAll"><a href="">全部</a></li>');
				$(".scheduleInfo").children('ul').html(adInfoContainer.join(''));
		}
	});
})(jQuery,this);

//client文件下的index.html文件
(function($){
	if(!common.currentPage("index.html")) return false;	

	$(function(){
		$(".adContainer").on('click', 'ul', function(event) {
			event.preventDefault();
			console.log("click");
			location.href="./adParticulars.html";
			/* Act on the event */
		});

	});
})(jQuery);
