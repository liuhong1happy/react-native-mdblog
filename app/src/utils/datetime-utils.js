module.exports = {
    init:function(){
        Date.prototype.addDate=function(n){
            var v = this.valueOf()
            var r = v + n * 24 * 60 * 60 * 1000
            var a = new Date(r)
            return a;
        }
        Date.prototype.subDate=function(n){
            if(n instanceof Date){
                return parseInt((this.valueOf() - n.valueOf())/(24 * 60 * 60 * 1000));
            }else if(n instanceof Number){
                var v = this.valueOf() - n;
                return new Date(v);
            }else{
                return this;
            }
        }
        Date.prototype.Format = function(n) {
                var i = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    S: this.getMilliseconds()
                },
                t;
                /(y+)/.test(n) && (n = n.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
                for (t in i) new RegExp("(" + t + ")").test(n) && (n = n.replace(RegExp.$1, RegExp.$1.length == 1 ? i[t] : ("00" + i[t]).substr(("" + i[t]).length)));
                return n
        };
        Date.prototype.isLeapYear=function(){
              var year = this.getFullYear();
              if(year%4==0 && year%100!=0){
                   return true;
              }
              else{
                   if(year%400==0){
                        return true;
                   }
                   else{
                        return false;
                   }
              }
         }
        Date.prototype.MonthlyNum = function(){ 
              var isLeapYear = this.isLeapYear();
              var month = this.getMonth()+1;
              if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
                    dayNum = 31;
              }
              else if(month==4 || month==6 || month==9 || month==11){
                    dayNum = 30;
              }
              else if(month==2 && isLeapYear){
                    dayNum = 29;
              }
              else{
                    dayNum = 28;
              }
              return dayNum;
        } 
        Date.prototype.Monthly = function(){
            var dayNum = this.MonthlyNum();
            var month = this.getMonth()+1;
            var year = this.getFullYear();
            var firstDay = new Date(this.valueOf());
            firstDay.setDate(1);
                
            var weeks = [];
            for(var i=1;i<=dayNum;){
                var date = new Date();
                date.setFullYear(year);
                date.setMonth(month-1);
                date.setDate(i);
                
                var day = date.getDay();
                var week = [];
                for(var j=0;j<7;j++){
                    week[j] = date.addDate(j-day);
                }
                weeks.push(week);
                i = date.addDate(7-day).subDate(firstDay)+1;
            }
            return weeks;
        }
        Date.prototype.sameDate = function(n){
            if(n instanceof Date){
                return this.Format("yyyy-MM-dd") == n.Format("yyyy-MM-dd");
            }else{
                return this.Format("yyyy-MM-dd") == new Date(n*1000).Format("yyyy-MM-dd");
            }
        }
    },
    LastMonth:function(date){
        var month = date.getMonth();
        var year = date.getFullYear();
        if(month==0){
            month =12;
            year = year-1;
            date.setFullYear(year);
        } 
        date.setMonth(month-1);
        return date;
    },
    NextMonth:function(date){
        var month = date.getMonth();
        var year = date.getFullYear();
        if(month==11){
            month =-1;
            year = year+1;
            date.setFullYear(year);
        } 
        date.setMonth(month+1);
        return date;
    }
}