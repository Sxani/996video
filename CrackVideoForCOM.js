var Count = 0;
function fuckMain () {
	//console.log(window.searchIsHome_var === undefined);
	if(window.searchIsHome_var == 1 || window.searchIsHome_var === undefined)
	{
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
		var GetOlid = getQueryVariable("olid");
		var NextOlid = getNextCourses (GetOlid);
		//console.log( "VideoEnd:" + getNextCourses (GetOlid) );
		document.getElementsByClassName("outline rightArea")[0].getElementsByClassName("olitem li-video ")[NextOlid].getElementsByTagName("a")[0].click();
	};
};

function getNextCourses (variable) {
	console.log( "getNextCoursesStart_Param:" + variable);
	var ListCount = document.getElementsByClassName("outline rightArea")[0].getElementsByClassName("olitem li-video ");
	for (var i = 0; i < ListCount.length; i++) {
		var pair = document.getElementsByClassName("outline rightArea")[0].getElementsByClassName("olitem li-video ")[i].getAttribute("olid");
		if(pair == variable){return i+1};
	};
};

function searchIsHome () {
	console.log( "searchIsHomeStart");
	var CurrentOlid = getQueryVariable("olid");
	console.log( "CurrentOlid:" + CurrentOlid);
	var ListCount = document.getElementsByClassName("outline rightArea")[0].getElementsByTagName("div");
	console.log( "searchIsHomeLength:" + ListCount.length);
	for (var i = 0; i < ListCount.length; i++) {
		var pair = document.getElementsByClassName("outline rightArea")[0].getElementsByTagName("div")[i].getAttribute("olid");
		 console.log( "searchIsHomeOlid:" + pair);
		if(pair == CurrentOlid){
			console.log( "searchIsHome_pair == CurrentOlid:");
			if(document.getElementsByClassName("outline rightArea")[0].getElementsByTagName("div")[i].getAttribute("isvideo") != "true"){
				document.getElementsByClassName("outline rightArea")[0].getElementsByTagName("div")[i+1].getElementsByTagName("a")[0].click()
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

function downloadQuestion() {
	var textSave='';


    for (var v = 0; v < document.getElementsByClassName("quesItem").length; v++) {
        console.log(document.getElementsByClassName("quesItem")[v].getElementsByClassName("quesTitle")[0].innerText)
        textSave+=document.getElementsByClassName("quesItem")[v].getElementsByClassName("quesTitle")[0].innerText;
        textSave+='\n'
        for (var i = 0; i < document.getElementsByClassName("quesItem")[v].getElementsByClassName("quesAnswerBox")[0].getElementsByClassName("answer").length; i++) {

            if(document.getElementsByClassName("quesItem")[v].getAttribute("type") == 3){
                if(document.getElementsByClassName("quesItem")[v].getElementsByClassName("quesAnswerBox")[0].getElementsByClassName("answer")[0].getAttribute("correct") == "true"){
                    console.log("√")
                    textSave+="√\n";
                } else {
                    console.log("×")
                    textSave+="×\n";
                };
                break;
            };
            if(document.getElementsByClassName("quesItem")[v].getElementsByClassName("quesAnswerBox")[0].getElementsByClassName("answer")[i].getAttribute("correct") == "True"){
                console.log(document.getElementsByClassName("quesItem")[v].getElementsByClassName("quesAnswerBox")[0].getElementsByClassName("answer")[i].innerText)
                textSave+=document.getElementsByClassName("quesItem")[v].getElementsByClassName("quesAnswerBox")[0].getElementsByClassName("answer")[i].innerText;
                textSave+='\n'
            };
        };
    };
    console.log(textSave);
    if(textSave != '')
    {
        exportRaw('答案.txt',textSave)

                function fakeClick(obj) {
                  var ev = document.createEvent("MouseEvents");
                  ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                  obj.dispatchEvent(ev);
                };

                function exportRaw(name, data) {
                  var urlObject = window.URL || window.webkitURL || window;
                  var export_blob = new Blob([data]);
                  var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
                  save_link.href = urlObject.createObjectURL(export_blob);
                  save_link.download = name;
                  fakeClick(save_link);
                };
    };
};