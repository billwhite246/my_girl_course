 $.fn.timeTable = function(arguments) {
   var _self = this,
     colorArrays = ["#FF9797", "#FFC1E0", "#FFBFFF", "#DCB5FF", "#ACD6FF", "#D2A2CC", "#CCCFAA"];

   _self.config = arguments || {};

   if (!_self.config.classNum) _self.config.classNum = "12";
   if (!_self.config.itemWidth) _self.config.itemWidth = "1.333"; /*rem*/
   if (!_self.config.itemHeight) _self.config.itemHeight = "2.5";

   drawTable();

   if (!_self.config.wlist) {
     return;
   }

   createClass(_self.config.wlist);

   function GetDateStr(AddDayCount) { 
      var dd = new Date();
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear(); 
      // var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
      // var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
      var m = dd.getMonth()+1;//获取当前月份的日期
      var d = dd.getDate();//获取当前几号
      // return y+"-"+m+"-"+d; 
      return m+"/"+d; 
    }

   function drawTable() {
     var timetable = document.createElement("table"),
       thead = document.createElement("thead"),
       tbody = document.createElement("tbody");

     var tempDate = new Date();
     var days = tempDate.getDay();
     // 1 - 0 星期一 - 星期日
     // 获取周一到今天有几天
     var daysText = ['', '', '', '', '', '', ''];
     for (let i = 0; i < daysText.length; i++) {
       // 获取前n天的日期
       let index = i + 1 % 7; // index为与days对比之用
       let n = index - days;
       daysText[i] = GetDateStr(n);
      //  console.log(GetDateStr(n));
     }
    //  for (var i = )
     var daysArr = ['周一', '周二',  '周三',  '周四',  '周五',  '周六', '周日'];
     var theadHtml = '<tr><th></th>';
     for (var i = 0; i < daysArr.length; i++) {
        let index = i + 1 % 7; // index为与days对比之用 确定是周几
        if (days == index) {
          theadHtml += '<th style="background-color: #7967d0; color: #c6c6ff;">' + daysArr[i] + '<br/><x style="font-size: 0.3rem; color: #c6c6ff;">' + daysText[i] + '</x>';
        } else {
          theadHtml += '<th>' + daysArr[i] + '<br/><x style="font-size: 0.3rem; color: #7967d0;">' + daysText[i] + '</x>';
        }
        // console.log(daysText[i])
        theadHtml += '</th>';
     }
     theadHtml += '</tr>';
     thead.innerHTML = theadHtml;
     var str = '';
     for (let i = 1; i <= _self.config.classNum; i++) {
       str += '<tr><td>' + i + '</td>';
       for (let j = 0; j < 7; j++) {
         str += '<td></td>';
       }
       str += '</tr>';
     }
     tbody.innerHTML = str;
     timetable.append(thead);
     timetable.append(tbody);
     _self[0].append(timetable);
     _self[0].className += "tabletime";
   }

   function createClass(list) {
     for (let i = 0; i < list.length; i++) {
       addClass(list[i]);
     }
   }

   function addClass(obj) {
     var w = _self.config.itemWidth,
       h = _self.config.itemHeight,
       cheight = (obj.dur * h).toFixed(3) - 0.1,
       topstart = (0.667 + 0.37 + (obj.seq - 1) * h).toFixed(3),
       leftstart = (0.730 + (obj.week - 1) * w).toFixed(3);

     var iclass = document.createElement("div"),
       color = setColor();

     iclass.className += "classitem";
     iclass.innerHTML = obj.evt || "";
     iclass.setAttribute("style", "height:" + cheight + "rem;top:" + topstart + "rem;left:" + leftstart + "rem;background-color:" + color);

     _self[0].append(iclass);
   }

   function setColor() {
     var num = randomNum(0, colorArrays.length);
     var color = colorArrays[num] || colorArrays[0];
     return color;
   }

   function randomNum(minNum, maxNum) {
     switch (arguments.length) {
       case 1:
         return parseInt(Math.random() * minNum + 1, 10);
         break;
       case 2:
         return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
         break;
       default:
         return 0;
         break;
     }
   }
 };