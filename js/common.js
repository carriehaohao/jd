/*公用方法的封装*/
//命名空间 itcast，任何方法的封装都可以在这个对象里面
window.itcast = {};
/*封装的是过渡结束事件方法函数*/
itcast.addTransitionEnd = function (dom,callback) {
    if(!dom && typeof dom !== 'object') return false;
    dom.addEventListener('webkitTransitionEnd', function () {
        /*相同的业务逻辑*/
        callback && callback();//短路与，必须要保证回调函数存在才去执行回调函数
        /*if(callback){
            callback();
        }*/
    });
    dom.addEventListener('transitionEnd', function () {
        /*相同的业务逻辑*/
        callback && callback();//短路与，必须要保证回调函数存在才去执行回调函数
    });
}