"use strict"
var yourBrowserSucks = yourBrowserSucks || (function(){
	var isChromium = window.chrome,
	    vendorName = window.navigator.vendor,
	    UA = window.navigator.userAgent,
	    isOpera = UA.indexOf("OPR") > -1,
	    isIEedge = UA.indexOf("Edge") > -1,
	    isAndroid = UA.indexOf("Android") > -1,
	    isIos = UA.indexOf("iP") > -1,
	    isWindowsPhone = UA.indexOf("Windows Phone") > -1,    
	    results = {},
	    htmlToInject='',
	    cssToInject='',
	    threshold = threshold || 11,
	    pass = 0,
	    chromeStoreAndroid = "https://play.google.com/store/apps/details?id=com.android.chrome",
	    chromeStoreIOS = "https://itunes.apple.com/it/app/chrome-browser-web-di-google/id535886823?mt=8",
	    chromeStoreWindows = "https://www.microsoft.com/en-us/store/apps/google/9wzdncrfhx3w",
	    messages = ["sucks", "is ancient", "was Abramo's favourite", "is mega-slow", "was cool in 1993", "is seasoned", "has a looong greyberd",
	    			"has more years than a Baobab", "was used by my granpa", "is mentally ill", "fought Phoenician wars", "thinks 1+1=11"],
	    colors = ["#ffcd07", "#07FF26", "#FF079C", "#2E3325", "#40DAB6", "#BDFF1E", "D8D8D8"];

	/*function createCookie (name,value,days) {
	    if (days) {
	        var date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        var expires = "; expires="+date.toGMTString();
	    }
	    else var expires = "";
	    document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie (name) {
	    var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0;i < ca.length;i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1,c.length);
	        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	    }
	    return null;
	}

	function eraseCookie (name) {
	    createCookie(name,"",-1);
	}*/

	function addHtml(selector, html) {
		selector.innerHTML = "";
		selector.innerHTML = htmlToInject;
	}

	function addMessage (selector) {
		console.log(selector)
		document.getElementById("message").innerHTML = messages[Math.floor(Math.random()*messages.length)] + "!";
	}

	function addStyle (style) {
	    var htmlDiv = document.createElement('div');
		htmlDiv.innerHTML = '<p style="font-size:0;">foo</p><style>' + style + '</style>';
		document.body.style.background = colors[Math.floor(Math.random()*colors.length)];
		document.getElementsByTagName('body')[0].appendChild(htmlDiv);
	}

	function addStore () {
		if(isIos) {
			document.getElementsByClassName("store")[0].href = chromeStoreIOS;
		}
		if(isAndroid) {
			document.getElementsByClassName("store")[0].href = chromeStoreAndroid;
		}
		if(isWindowsPhone) {
			document.getElementsByClassName("store")[0].href = chromeStoreWindows;
		}
	}

	function test (e) {
		if( e.style.transform !== undefined) { results.transformation = true; ++pass; }
		if( e.style.borderImage !== undefined) { results.borderImage = true; ++pass; }
		if( e.style.counterReset !== undefined) { results.counter = true; ++pass; }
		if( e.style.animation !== undefined) { results.animation = true; ++pass; }
		if( window.devicePixelRatio !== undefined) { results.pixelRation = true; ++pass; }   
		if( typeof Crypto !== "undefined") { results.crypto = true; ++pass; }
		if( window.SVGRect !== undefined) { results.svg = true; ++pass; }
		if( window.localStorage !== undefined) { results.LS = true; ++pass; }
		if( window.WebGLShader !== undefined) { results.WebGL = true; ++pass; }
		if( typeof Set !== "undefined") { results.set = true; ++pass; }
		if( screen.orientation !== undefined) { results.orientation = true; ++pass; }
		if( typeof CSS !== "undefined") { 
			if( CSS.supports !== undefined) {
				results.supports = true; ++pass; 
			}
		}
		try{
			eval("const a = 0");
			eval("let b = 0")
			results.assigments = true; ++pass;
		}catch(error){/*console.log(e);*/}

		 console.log(pass);
		 console.log(results);
		if(pass <= threshold) {
			addHtml(e, htmlToInject);
			addMessage(e)
			addStyle(cssToInject);
			addStore();
			//createCookie("suck", pass <= threshold ? true : false, 30);
		}
	}

	try{
		document.addEventListener('DOMContentLoaded', function() {
			var body = document.body;
			test(body);
		});
	} catch(e){
		document.onreadystatechange = function() {
			var body = document.body;
			test(body);
		}
	}
}())
