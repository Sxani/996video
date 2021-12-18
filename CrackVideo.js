var Count = 0;
var firstTime = 0;
function fuckMain () {
	
	//console.log(window.searchIsHome_var === undefined);
	if(window.searchIsHome_var == 1 || window.searchIsHome_var === undefined)
	{
		firstTimeClick();
		searchIsHome();
	};
	if(window.downloadQuestion_var == 1)
	{
		if(Count == 0){
			downloadQuestion();
			Count=1;
		}
		
	};
	if(window.fuckSpeed_var == 1 || window.fuckSpeed_var === undefined)
	{
		fuckSpeed();
	};
	if(window.fuckNextCourses_var == 1 || window.fuckNextCourses_var === undefined)
	{
		fuckNextCourses();
	};
	
	
};

function downloadQuestion() {
	let btn=document.createElement("button");
    btn.id="submit-btn";//添加id
    btn.style.position="absolute";
    btn.style.color="yellow";
    btn.style.background="#000"
    btn.style.left="50px";
    btn.style.top="50px";
    btn.style.zIndex="99";
    btn.innerHTML="下载答案";//innerText也可以,区别是innerText不会解析html
	btn.onclick=function(){
        //code
        var saveText = "";
        for(var i = 0; i < document.getElementsByTagName("dd").length; i++) {
            // 题目
            saveText += document.getElementsByTagName("dd")[i].getElementsByTagName("card-title")[0].innerText;
            saveText += "\n";
            // 选项
            saveText += document.getElementsByTagName("dd")[i].getElementsByTagName("card-context")[0].innerText
            saveText += "\n";
            // 答案
            saveText += "答案：" + document.getElementsByTagName("dd")[i].getElementsByTagName("card-context")[1].innerText
            saveText += "\n\n";
        }
        console.log(saveText);
        if(saveText != '')
        {
            exportRaw('答案.txt',saveText)
        };
        function exportRaw(name, data) {
            var urlObject = window.URL || window.webkitURL || window;
            var export_blob = new Blob([data]);
            var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
            save_link.href = urlObject.createObjectURL(export_blob);
            save_link.download = name;
            save_link.id="download-a";
            console.log(save_link);
            document.body.append(save_link);
            document.getElementById("download-a").click();
        };
    }
    document.body.append(btn);
}

function firstTimeClick () {
        console.log( "firstTimeClickStart" );
        if(firstTime == 0) {
            document.getElementById("outline").click();
            document.getElementsByClassName("van-overlay")[0].click();
            firstTime=1;
        }
    };

    function fuckSpeed () {
        console.log( "fuckSpeedStart" );
        document.querySelector('video').defaultPlaybackRate = 2.0;
        document.querySelector('video').playbackRate = 2.0;
    };

    function fuckNextCourses () {
        console.log( "fuckNextCoursesStart" );
        setVideoEndApi();

    };

    function setVideoEndApi () {
        document.querySelector('video').onended = function() {
            console.log( "VideoEnd" );
            var GetCurrentOlid = getQueryVariable("olid");
            var NextOlid = getNextCourses (GetCurrentOlid);
            //console.log( "VideoEnd:" + getNextCourses (GetOlid) );
            document.getElementsByClassName("van-cell")[NextOlid].click();
        };
    };

    function getNextCourses (variable) {
        console.log( "getNextCoursesStart_Param:" + variable);
        var ListCount = document.getElementsByClassName("van-cell");
        for (var i = 0; i < ListCount.length; i++) {
            var pair = document.getElementsByClassName("van-cell")[i].getAttribute("olid");
            if(pair == variable){return i+1};
        };
    };

    function searchIsHome () {
        console.log( "searchIsHomeStart");
        var CurrentOlid = getQueryVariable("olid");
        console.log( "CurrentOlid:" + CurrentOlid);
        var ListCount = document.getElementsByClassName("van-cell");
        console.log( "searchIsHomeLength:" + ListCount.length);
        for (var i = 0; i < ListCount.length; i++) {
            var temp = document.getElementsByClassName("van-cell")[i].getAttribute("olid");
            var pair = null;
            if(temp!=null) {pair=temp;console.log( "searchIsHomeOlid:" + pair);}

            if(pair == CurrentOlid){
                console.log( "searchIsHome_pair == CurrentOlid:");
                if(document.getElementsByClassName("van-cell")[i].getAttribute("isvideo") == null){
                    console.log( "searchIsHomeClick");
                    document.getElementsByClassName("van-cell")[i+1].click();
                    break;
                };
            };
        };
    };

    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    };