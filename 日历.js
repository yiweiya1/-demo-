// var now=new Date()

// 获取当前日期是星期几
// now.getDay()
// 星期六--6
// 12345
// 星期日--？  0

// 设计一个星期日的时间戳
// 2021-01-31

// var thirtyOne=new Date('2021-01-31')
// console.log(thirtyOne.getDay())

// 1  --  5   4
// 1  --  4   3
// 1  --  3   2


// 获取元素
var calBodyList = document.getElementsByClassName('cal-body-list')[0]


var yearSpan = document.getElementsByClassName('year-span')[0]
var monthSpan = document.getElementsByClassName('month-span')[0]

var searchYear = document.getElementById('search-year')
var searchMonth = document.getElementById('search-month')
var searchBtn = document.getElementById('search-btn')

var preYearBtn = document.getElementsByClassName('pre-year-btn')[0]
var preMonthBtn = document.getElementsByClassName('pre-month-btn')[0]
var nextYearBtn = document.getElementsByClassName('next-year-btn')[0]
var nextMonthBtn = document.getElementsByClassName('next-month-btn')[0]

var backTodayBtn=document.getElementsByClassName('back-today-btn')[0]

var changeBtn=document.getElementsByClassName('change')[0]

var monthCal=document.getElementsByClassName('month-cal')[0]
var dayCal=document.getElementsByClassName('day-cal')[0]




// 展示任意一个月份
// 此月份有多少天
var month = 1
var year = 2022
var date=20

var daysNum = 30
var whichDay = 0


var getDaysNumFun = function () {
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        daysNum = 31
        // return是函数的返回值
        // return 31
    } else if (month == 2) {
        // daysNum=
        if (year % 4 == 0 && year % 100 != 0) {
            daysNum = 29
        } else if (year % 400 == 0) {
            daysNum = 29
        } else {
            daysNum = 28
        }
    }
    else {
        daysNum = 30
    }
}


// 此月份的一号是星期几
var getTheFirstDayIsWhichDayFun = function () {
    // 创建月初日期的时间对象
    var theFirstDayStr = year + '-' + month + '-01'
    var theFirstDayObj = new Date(theFirstDayStr)
    whichDay = theFirstDayObj.getDay()
    // return theFirstDayObj.getDay()
}

// console.log(daysNum)


// 复制 拼接 li字符串  赋值给ul(cal-body-list)
// 渲染--更改页面的展示状态
var render = function () {
    
    // var now=new Date()

    // year
    // month

    yearSpan.innerHTML = year
    monthSpan.innerHTML = month
    // 获取正确的天数
    getDaysNumFun()
    // 获取此月一号是星期几
    getTheFirstDayIsWhichDayFun()  //whichDay



    // 先让str有一个初始值为空字符串xunhua
    // 接下来对str进行处理 拼接
    var str = '<div class="space"></div>'

    var tpl = '<li class="cal-body-item">$1$</li>'
    // 循环拼接 替换
    for (var i = 0; i < daysNum; i++) {
        str += tpl.replace('$1$', i + 1)
    }
    // 循环执行完毕  得到完整的str
    // console.log(str)
    // 赋值---覆盖
    calBodyList.innerHTML = str
    // 赋值之后再去获取
    // 想要设置的元素是当前页面中的元素
    // 当前页面中的元素是通过赋值得到的
    // 所以我们要在赋值之后再获取元素
    var spaceDiv = document.getElementsByClassName('space')[0]

    // 利用whichDay决定space的宽度
    // 获取元素  .style.width
    // console.log(whichDay*100+'px')
    spaceDiv.style.width = whichDay * 100 + 'px'

    todaySpecialShowFun()

}

// 封装获取当前时间
var getNow=function(){
    // 不加var
    var now = new Date()
    nowYear = now.getFullYear()
    nowMonth = now.getMonth() + 1
    // 获取当前日期
    nowDate=now.getDate()
}

// 封装今日高亮函数
var todaySpecialShowFun=function(){
    // 对比当前年月 日
        // now.getFullYear()
        // now.getMonth()+1
    // 日历展示的年月日 year month
    getNow()
    if(nowYear==year&&nowMonth==month){
        // 说明现在展示的日历就是真实的年月

        // 比较date和

        // 遍历每一天
        // 让对应上的下标为变得特殊  赋予class类名


        // 获取元素
        var lis=document.getElementsByClassName('cal-body-item')

        lis[nowDate-1].className+=' active'

    }
    

}




// 挂监听器

// 给跳转到指定年月按钮（查询按钮）挂监听器
searchBtn.addEventListener('click', function () {
    // 获取输入框中的年月
    // 赋值给变量年月
    // render（）
    // year  month
    // 输入的值为空
    var now = new Date()
    // 2
    if (searchYear.value.length == 0) {

        // year = year

        if (searchMonth.value.length == 0) {
            // 年为空 月为空
            // month = now.getMonth() + 1

            return
        } else {
            // 年为空 月不为空

            // 是否是纯字母
            // window.isNaN(searchMonth)
            // 是否是包含了字母
            if (parseInt(searchMonth.value) != searchMonth.value || searchMonth.value > 12 || searchMonth.value < 0) {
                alert('您输入的月份的值有误')
                return
            }
            month = searchMonth.value

        }


    }
    // 1
    else if (searchMonth.value.length == 0) {
        // 年不为空 月为空
        // month = now.getMonth() + 1
        console.log(parseInt(searchYear.value) == searchYear.value)
        if (parseInt(searchYear.value) != searchYear.value) {
            alert('您输入的年份的值有误')
            return
        }
        year = searchYear.value
    }
    // 1 
    else {

        // 年不为空 月不为空

        // 此时证明年月输入框都输入了内容不是空值

        // 限制输入的值为数字
        // window.isNaN(parseInt(searchYear.value))==true
        // if(window.isNaN(parseInt(searchYear.value))){
        //     alert('您输入的月份不是数字')
        // }

        // 限制输入的值为数字
        // 限定数字范围
        if (parseInt(searchMonth.value) != searchMonth.value || parseInt(searchYear.value) != searchYear.value || searchMonth.value > 12 || searchMonth.value < 0 || searchYear.value < 0) {
            alert('您输入的内容的值有误')
            return
        }

        year = searchYear.value
        month = searchMonth.value
    }

    searchYear.value = ''
    searchMonth.value = ''

    render()
})

// 给翻年翻月按钮挂监听器
preMonthBtn.addEventListener('click', function () {
    if (month == 1) {
        if (year == 1) {
            alert('别翻了，再翻就翻没了')
            return
        }else{
            month = 12
            year--
        }
        
    } else {
        month--
    }
    render()
})

preYearBtn.addEventListener('click', function () {

    if (year == 0) {
        alert('别翻了，再翻就翻没了')
        return
    } else {
        year--
    }
    render()
})

nextMonthBtn.addEventListener('click', function () {
    if (month == 12) {
        month = 1
        year++
    } else {
        month++
    }
    render()
})

nextYearBtn.addEventListener('click', function () {
    year++
    render()
})


var backtodayFun=function(){
    getNow()
    month=nowMonth
    year=nowYear
    date=nowDate
    render()
}


// 给返回今天按钮挂监听器
backTodayBtn.addEventListener('click',backtodayFun)

var isDayShow=true
changeBtn.addEventListener('click',function(){
    if(isDayShow==false){
        monthCal.style.display='none'
        dayCal.style.display='block'
        isDayShow=true
    }else{
        dayCal.style.display='none'
        monthCal.style.display='block'
        isDayShow=false
    }
})


// 页面初始化
var init = function () {
    backtodayFun()
    // dayCalRender()
}




init()
