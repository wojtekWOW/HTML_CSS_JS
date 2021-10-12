function countdown()
	{
		var today = new Date();
		
		// var day = today.getDate();
		// var miesiac = today.getMonth()+1;
		// var rok = today.getFullYear();
		
		var hour = today.getHours();
		if (hour<10) hour = "0"+hour;
		
		var min = today.getMinutes();
		if (min<10) min = "0"+min;
		
		var seconds = today.getSeconds();
		if (seconds<10) seconds = "0"+seconds;
		
		document.getElementById("timer").innerHTML = `${hour}:${min}:${seconds}`;
		 
		 setTimeout("countdown()",1000);
	}
	window.onload=function(){countdown();
	  };