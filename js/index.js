$(document).ready(function() {
	var contents=$(".container .contents");
	var indicators=$(".indicators li");
	var page=$(".contents .page");
	var w = $(window).width();
	var h = $(window).height();
	page.css({"height": h,"width":w});
    $('.wp-inner').fullpage();
    $(window).resize(function(){
		w = $(window).width();
		h = $(window).height();
		page.css({"height": h,"width":w});
		timeLine.css({left:-w*0.54+232+"px"});
		contactMe();
	})
	var curIndex=0;
	var flag = true;
	$(document).on("mousewheel DOMMouseScroll", function (e) {
		var ev=e||window.event;
		var direction = ev.originalEvent.wheelDelta || ev.originalEvent.detail;
		if(flag){
			flag=false;
			if (direction ==120 || direction == -3) {
				// 向上滚
				curIndex-=1;
				if(curIndex<0){curIndex=0;}
			} else if (direction == -120 || direction == 3) {
				// 向下滚
				curIndex+=1;
				if(curIndex >= page.length){
					curIndex = page.length-1;
				}
			}
			/*个人资料*/
			if(curIndex==1){
				page.find(".btn-info").addClass("show")
			}else{
				page.find(".btn-info").removeClass("show")
			}
			indicators.removeClass("active").eq(curIndex).addClass("active");
			contents.css({transform:"translate3d(0,-"+h*curIndex+"px,0)"});
			setTimeout(function () {
				flag=true;
			},800)
		}
		rotate();
	});
	indicators.on("click", function () {
		curIndex=$(this).index();
		indicators.removeClass("active").eq(curIndex).addClass("active");
		contents.css({transform:"translate3d(0,-"+h*curIndex+"px,0)"});
		rotate();
	})

	/*首页 S */
	var wordIndex = 0;
	var welcome = "Welcome To My HomePage !";
	var index=$(".contents .index");
	function type() {
		if (index < 25) {
			index.children("h1").html(welcome.substring(0, wordIndex++) + "|");
		} else {
			index.children("h1").html(welcome.substring(0, wordIndex++));
		}
	}
	setInterval(type, 100);
	function appear() {
		index.children("h1").addClass("welcome");
		index.children(".avatar").addClass("show");
		index.children(".information").addClass("show");
	}
	setTimeout(appear, 5000);
	/*首页 E */
	/*个人资料 S */
	var btnLi=$(".btn-info li");
	var contentLi=$(".info li");
	var shade=$(".personal .shade");
	btnLi.on("mouseover", function () {
		shade.fadeIn(500);
		var index=$(this).index();
		contentLi.removeClass("active").eq(index).addClass("active");
	})
	function rotate(){
		if(curIndex==1){
			page.find(".btn-info").addClass("show")
		}else{
			page.find(".btn-info").removeClass("show")
		}
	}
	/*个人资料 E */
	/*项目经验 S */
	var introduce=$(".content .introduce");
	var item=$(".content .item");
	for(var i=0;i<item.length;i++){
		item.eq(i).css({left:(i+1) * 645+"px"});
	}
	var showBox=$(".project").children(".list_project");
	var projectBtn=$(".projectBtn li");
	var timeLine=$(".timeLine");
	timeLine.css({left:-w*0.54+232+"px"});
	projectBtn.on("click", function () {
		var x=0;
		var index=$(this).index();
		projectBtn.removeClass("active");
		$(this).addClass("active");
		item.removeClass("active");
		if(index>0){
			introduce.addClass("hidden");
			item.eq(index-1).addClass("active");
			x=item.eq(index-1).css("left");
		}else{
			introduce.removeClass("hidden");
		}
		showBox.css({transform: "translate3d(-"+x+", 0, 0)"});
	})
	/*项目经验 E */
	/*作品展示 S */
	var workList=$(".work ol").children("li");
	var len=workList.length;
	var state={
		current:0,
		timeId:null,
		speed:3000
	}
	var styleList=[
		{width:"20%",height:"58%",left:"21%",zIndex:1,opacity:0.7},
		{width:"24%",height:"70%",left:"38%",zIndex:2,opacity:1},
		{width:"20%",height:"58%",left:"59%",zIndex:1,opacity:0.7},
		{width:"20%",height:"58%",left:"41%",zIndex:0,opacity:0.7},
	]
	function render(){
		workList.css(styleList[3])
		workList.eq(state.current-1<0?len-1:state.current-1).css(styleList[0]);
		workList.eq(state.current).css(styleList[1])
		workList.eq(state.current+1>len-1?0:state.current+1).css(styleList[2]);
	}
	function prev(){
		state.current=state.current-1<0?len-1:state.current-1;
		render();
	}
	function next(){
		state.current=state.current+1>len-1?0:state.current+1;
		render();
	}
	state.timeId=setInterval(next,state.speed);
	setTimeout(render(),0);
	$(".work .prev").on("click", function () {
		clearInterval(state.timeId);
		prev();
		state.timeId=setInterval(next,state.speed);
	})
	$(".work .next").on("click", function () {
		clearInterval(state.timeId);
		next();
		state.timeId=setInterval(next,state.speed);
	})
	workList.hover(function () {
		clearInterval(state.timeId);
	}, function () {
		state.timeId=setInterval(next,state.speed);
	})
	/*作品展示 E */
	/*联系我 S */
	var contact=$(".contact .row");
	function contactMe(){
		if(w>=768){
			contact.css({top:h*0.5-(320/2)+"px"});
		}else{
			contact.css({top:0});
		}
	}
	contactMe();
	/*联系我 E */
});