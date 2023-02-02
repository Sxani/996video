async function getAll() {
  var saveText = "";
  var ddList = document.getElementsByClassName("question")[0].getElementsByTagName("dd");
  for (var clickNum = 0; clickNum < ddList.length;  clickNum++) {
      document.getElementsByClassName("move_btn")[0].getElementsByTagName("span")[1].click();
      await sleep(100);
  }
  for (var i = 0; i < ddList.length;  i++) {
      // 问题
      var question = ddList[i].getElementsByTagName("card-title")[0].innerText + "\n";
      // 选项
      var selection_collect = "";
      var selectionList = ddList[i].getElementsByTagName("card-context")[0].getElementsByTagName("div");
      if(selectionList[0].classList.contains("type3")) {
          // 正确
          var part_one = selectionList[1].getElementsByTagName("i")[0].innerText;
          // 错误
          var part_two = selectionList[2].getElementsByTagName("i")[0].innerText;
          selection_collect += part_one + " " + part_two + "\n";
      } else {
          for(var j = 1; j < selectionList.length;  j++) {
              // A .
              var part_one = selectionList[j].getElementsByTagName("i")[0].innerText;
              // 自然属性是人的本质属性
              var part_two = selectionList[j].getElementsByTagName("span")[0].innerText;
              selection_collect += part_one + part_two + "\n";
          }
      }
      // 答案
      var answer = "正确答案：" + ddList[i].getElementsByTagName("card-context")[1].innerText + "\n";
      saveText += question + selection_collect + answer + "\n";
      //console.log(question + selection_collect + answer);
  }
  console.log(saveText);
  if(saveText != '')
  {
      exportRaw('答案.txt',saveText)
  }

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
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
