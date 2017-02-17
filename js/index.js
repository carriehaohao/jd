
window.onload = function () {
    /*搜索栏*/
    search();
    /*轮播*/
    banner();
    /*倒计时*/
    downTime();
};

/*搜索栏*/
function search(){
    /**
     * 1.默认位置是全透明状态 顶部固定定位 （css）
     * 2.当页面滚动的时候需要动态改变盒子的透明度 （onscroll 根据滚动的高度距离顶部的高度来确定透明度）
     * 3.当页面滚动到轮播图以下的时候透明度保持不变（判断当前是不是在轮播图下面）
     * */

    /*编码*/
    /*获取dom元素*/
    var searchBox = document.querySelector(".jd_header_box");//搜索盒子
    var bannerBox = document.querySelector(".jd_banner");//轮播图盒子
    var height = bannerBox.offsetHeight;//获取高度

    window.onscroll = function () {
        /*滚动的高度距离顶部的高度*/
        var top = document.body.scrollTop;//谷歌获取方式，在移动端可以完全满足，不用考虑IE
        /*var topI = document.documentElement.scrollTop;//IE获取方式*/

        /*计算透明度*/
        var opacity = 0;
        if (top < height) {
            opacity = top / height * 0.85;
        }
        else {
            opacity = 0.85;
        }

        /*改变透明度*/
        searchBox.style.background = 'rgba(201,21,35,'+opacity+')';
    };
}

/*轮播*/
function banner(){
    /*
    * 1.自动滚动（定时器+位移转换+过渡）
    * 1.1 无缝滚动（在尾部加一张图片）(瞬间 动画执行完成)
    * 1.2 无缝滑动（在头部加一张图片）（滑动时需要瞬间定位）
    * 2.在滚动的同时小圆点也要对应改变（监听索引，改变当前样式）
    * 3.轮播图滑动（touch监听手指的x轴方向的移动，让图片盒子随之做位置的改变）
    * 4.当不超过一定距离时要吸附回去（三分之一，过渡回到原来的定位）
    * 5.当超过一定距离时滚动到上一张/下一张（判断方向--手势--右滑/左滑）
    * */

    /*编码*/

    /*获取dom元素*/
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;//宽度
    var imgBox = banner.querySelector('ul:first-child');//图片盒子
    var pointBox = banner.querySelector('ul:last-child');//点盒子
    var points = pointBox.querySelectorAll('li');//所有点


    /*添加过渡*/
    var addTrasition = function () {
        imgBox.style.transition = "all 0.3s";
        imgBox.style.webkitTransition = "all 0.3s";
    }
    /*清除过渡*/
    var removeTrasition = function () {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    }
    /*定位*/
    var setTranslateX = function (translateX) {
        imgBox.style.transform = 'translateX('+translateX+'px)';
        imgBox.style.webkitTransform = 'translateX('+translateX+'px)';
    }



    /*1.自动滚动*/
    var index = 1;//贯穿整个程序
    var timer = setInterval(function () {
        index++;
        /*计算当前盒子的定位*/
        /*加过渡*/
        addTrasition();
        /*设置给当前的图片盒子*/
        setTranslateX(-index*width);
    },1000);

    /*什么时候做无缝滚动的瞬间定位？怎么判断动画结束？*/
    /*过渡结束事件，动画结束事件*/
    itcast.addTransitionEnd(imgBox, function () {
        /*每次滚动过渡结束时会触发该过渡结束事件*/
        /*1.1 无缝滚动*/
        if(index >= 9){
            index = 1;
            /*清除过渡*/
            removeTrasition();
            /*瞬间定位*/
            /*设置给当前的图片盒子*/
            setTranslateX(-index*width);
        }
        /*1.2 无缝滑动*/
        else if(index <= 0){
            index = 8;
            /*清除过渡*/
            removeTrasition();
            /*瞬间定位*/
            /*设置给当前的图片盒子*/
            setTranslateX(-index*width);
        }

        /*当前index的范围？1-8*/
        /*2.在滚动的同时小圆点也要对应改变*/
        setPoint();
    })


    var setPoint = function () {
        /*index 1-8*/
        for(var i=0; i<points.length; i++){
            points[i].className = '';
        }
        points[index-1].className = 'now';
    }


    /*3.轮播图滑动*/
    var startX = 0;//记录刚刚触摸屏幕的x坐标
    var moveX = 0;//记录滑动时当前触摸点的x坐标
    var distanceX = 0;//记录滑动距离
    var isMove = false;//证明一定滑动过，严谨

    imgBox.addEventListener('touchstart', function (e) {
        /*清除定时器*/
        clearInterval(timer);

        startX = e.touches[0].clientX;
    });

    imgBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;

        /*当前的定位是多少？*/
        /*计算出将要去做定位的位置*/

        /*这里定位不需要过渡*/
        /*清除过渡*/
        removeTrasition();
        /*瞬间定位*/
        /*设置给当前的图片盒子*/
        setTranslateX(-index*width + distanceX);

        console.log(distanceX);

        isMove = true;

    });

    imgBox.addEventListener('touchend', function (e) {
        if(isMove){
            if(Math.abs(distanceX)<width/3){
                /*4.当不超过一定距离时要吸附回去*/
                /*定位到滑动之前的位置*/
                /*加过渡*/
                addTrasition();
                /*设置给当前的图片盒子*/
                setTranslateX(-index*width);

            }else{
                /*5.当超过一定距离时滚动到上一张/下一张*/
                /*判断方向--手势--右滑/左滑*/
                if(distanceX > 0){
                    index--;//右滑，到上一张
                }else{
                    index++;//左滑，到下一张
                }

                /*加过渡*/
                addTrasition();
                /*设置给当前的图片盒子*/
                setTranslateX(-index*width);
            }
        }

        /*加定时器*/
        clearInterval(timer);/*严谨的做法*/
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTrasition();
            /*设置给当前的图片盒子*/
            setTranslateX(-index*width);
        },1000);

        /*重置参数*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

    });
}

/*倒计时*/
function downTime(){
    /*
    * 1.倒计时的时间，假设4小时
    * 2.时间格式化
    * 3.计时器，每一秒执行一次
    * 4.转化成时分秒，塞到html
    * */

    /*获取dom元素*/
    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');//所有span

    var time = 4*60*60;

    var timer = setInterval(function () {
        time--;
        /*时间格式化*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);//小时的十位
        spans[1].innerHTML = h%10;//小时的个位
        spans[3].innerHTML = Math.floor(m/10);//分钟的十位
        spans[4].innerHTML = m%10;//分钟的个位
        spans[6].innerHTML = Math.floor(s/10);//秒数的十位
        spans[7].innerHTML = s%10;//秒数的个位

        if(time <= 0){
            clearInterval(timer);
        }

    },1000);



}