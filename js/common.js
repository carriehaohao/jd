/*���÷����ķ�װ*/
//�����ռ� itcast���κη����ķ�װ�������������������
window.itcast = {};
/*��װ���ǹ��ɽ����¼���������*/
itcast.addTransitionEnd = function (dom,callback) {
    if(!dom && typeof dom !== 'object') return false;
    dom.addEventListener('webkitTransitionEnd', function () {
        /*��ͬ��ҵ���߼�*/
        callback && callback();//��·�룬����Ҫ��֤�ص��������ڲ�ȥִ�лص�����
        /*if(callback){
            callback();
        }*/
    });
    dom.addEventListener('transitionEnd', function () {
        /*��ͬ��ҵ���߼�*/
        callback && callback();//��·�룬����Ҫ��֤�ص��������ڲ�ȥִ�лص�����
    });
}