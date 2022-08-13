window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    // var ul = focus.querySelector('ul');
    var ul = focus.children[0];
    var ol = focus.children[1];
    // var ol = focus.querySelector('ol');
    //获得focus的宽度
    var w = focus.offsetWidth;
    var index = 0;
    var timer = setInterval(function () {
        index++;
        var translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 无缝滚动
    ul.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0;
            //去掉过渡效果
            ul.style.transition = 'none';
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) {
            index = 2;
            //去掉过渡效果
            ul.style.transition = 'none';
            var translateX = -index * w;
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }
        //小圆点跟随变化
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    })
    // 4.手指滑动轮播图
    var startX = 0;
    var moveX = 0;//定义全局变量
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    })
    ul.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translateX = -index * w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';
        flag = true;//如果移动过 再去判断
        e.preventDefault();//阻止滚动屏幕行为
    })
    ul.addEventListener('touchend', function (e) {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                }
                else {
                    index++;
                }
                var translateX = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
            else {
                //回弹
                var translateX = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
        }
        //手指离开重开定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            var translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translatex + 'px)';
        }, 2000);
    })


    //返回顶部模块制作
    var goBack = this.document.querySelector('.goBack');
    var nav = this.document.querySelector('nav');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        }
        else {
            goBack.style.display = 'none';
        }
    })
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    })
})