// 获取元素
var img=document.getElementsByTagName('img')[0]
var yearShow=document.getElementsByClassName('year-show')[0]
var monthShow=document.getElementsByClassName('month-show')[0]
var dateShow=document.getElementsByClassName('date-show')[0]

var timeSpan=document.getElementById('time-span')
var themeSpan=document.getElementById('theme-span')
var contentSpan=document.getElementById('content-span')

var goPreDayBtn=document.getElementsByClassName('go-pre-day-btn')[0]
var goNextDayBtn=document.getElementsByClassName('go-next-day-btn')[0]
var backTodayBtn=document.getElementsByClassName('back-today-btn')[1]

var addThingBtn=document.getElementsByClassName('add-thing-btn')[0]

var date=20
var index=1

var thingsArr=[{
    time:'2022-04-18 18:30:00',
    theme:"吃饭",
    content:'今天越好请广场王大妈吃饭，因为他说要给我介绍一个非常好相亲对象'
}]

// 下一天函数
var goNextDayFun=function(){
    getDaysNumFun()
    // daysNum
    if(date==daysNum){
        if(month==12){
            month=1
            year++
        }else{
            month++
        }
        date=1
    }else{
        date++
    }
    // 得到的数值赋值给年月日展示的区域

    if(index==7){
        index=1
    }else{
        index++
    }



    dayCalRender()
}
// 封装上一天函数
var goPreDayFun=function(){
    month--
    getDaysNumFun()
    month++
    // daysNum
    if(date==1){
        if(month==1){
            month=12
            year--
        }else{
            month--
        }
        date=daysNum
    }else{
        date--
    }
    // 得到的数值赋值给年月日展示的区域

    if(index==1){
        index=7
    }else{
        index--
    }



    dayCalRender()
}

// 渲染函数
var dayCalRender=function(){
    // 图片渲染
    img.src='./img/'+index+'.jpg'

    // 日期渲染
    yearShow.innerHTML=year
    monthShow.innerHTML=month
    dateShow.innerHTML=date

    // 事件渲染
    // 比较当前展示日期和事件日期比较
    // 取出所有事件
    console.log(localStorage.getItem('thingsArr'))
    thingsArr=JSON.parse(localStorage.getItem('thingsArr')) 
    // 当前是否有事件渲染上
    var isThingRender=false
    // // 遍历事件
    thingsArr.forEach(function(item){
        // 利用每个事件存储的时间字符串创建响应的时间对象
        var newDate=new Date(item.time)
        console.log(newDate)
        var theThingYear=newDate.getFullYear()
        var theThingMonth=newDate.getMonth()+1
        var theThingDate=newDate.getDate()
        // var theThingHour=newDate.getHours()
        // var theThingMin=newDate.getMinutes()
        // var theThingSec=newDate.getSeconds()
        var timeArr=item.time.split(' ') 
        
        console.log(theThingYear==year&&theThingMonth==month&&theThingDate==date)

        if(isThingRender==false){
            // 证明此时还没有事件的时间可以对应上当前日期
            if(theThingYear==year&&theThingMonth==month&&theThingDate==date){
                // 进行事件赋值
                themeSpan.innerText=item.theme
                contentSpan.innerText=item.content
                timeSpan.innerText=timeArr[1]
            
                isThingRender=true
                
            }else{
                themeSpan.innerText=''
                contentSpan.innerText=''
                timeSpan.innerText=''
            }
        }
        
    })
}
// localStorage.setItem('thingsArr',JSON.stringify(thingsArr) )
// 挂监听器
goPreDayBtn.addEventListener('click',goPreDayFun)
goNextDayBtn.addEventListener('click',goNextDayFun)
backTodayBtn.addEventListener('click',function(){
    backtodayFun()
    dayCalRender()
})

addThingBtn.addEventListener('click',function(){
    var time=prompt('请输入你要添加事件的时间,如2021-02-02 18:35:00，注意冒号要用英文的')
    var theme=prompt('请输入你要记录的事件主题')
    var content=prompt('请输入你要记录的事件内容')

    var newObj={
        time:time,
        theme:theme,
        content:content
    }

    thingsArr=JSON.parse(localStorage.getItem('thingsArr'))
    
    thingsArr.push(newObj)

    localStorage.setItem('thingsArr',JSON.stringify(thingsArr) )

    dayCalRender()
})

localStorage.setItem("thingsArr",JSON.stringify(thingsArr))

var dayCalInit=function(){
    backtodayFun()
    index=1
    dayCalRender()}

dayCalInit()