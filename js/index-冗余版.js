
window.onload = function () {
    /*������*/
    search();
    /*�ֲ�*/
    banner();
    /*����ʱ*/
    downTime();
};

/*������*/
function search(){
    /**
     * 1.Ĭ��λ����ȫ͸��״̬ �����̶���λ ��css��
     * 2.��ҳ�������ʱ����Ҫ��̬�ı���ӵ�͸���� ��onscroll ���ݹ����ĸ߶Ⱦ��붥���ĸ߶���ȷ��͸���ȣ�
     * 3.��ҳ��������ֲ�ͼ���µ�ʱ��͸���ȱ��ֲ��䣨�жϵ�ǰ�ǲ������ֲ�ͼ���棩
     * */

    /*����*/
    /*��ȡdomԪ��*/
    var searchBox = document.querySelector(".jd_header_box");//��������
    var bannerBox = document.querySelector(".jd_banner");//�ֲ�ͼ����
    var height = bannerBox.offsetHeight;//��ȡ�߶�

    window.onscroll = function () {
        /*�����ĸ߶Ⱦ��붥���ĸ߶�*/
        var top = document.body.scrollTop;//�ȸ��ȡ��ʽ�����ƶ��˿�����ȫ���㣬���ÿ���IE
        /*var topI = document.documentElement.scrollTop;//IE��ȡ��ʽ*/

        /*����͸����*/
        var opacity = 0;
        if (top < height) {
            opacity = top / height * 0.85;
        }
        else {
            opacity = 0.85;
        }

        /*�ı�͸����*/
        searchBox.style.background = 'rgba(201,21,35,'+opacity+')';
    };
}

/*�ֲ�*/
function banner(){
    /*
    * 1.�Զ���������ʱ��+λ��ת��+���ɣ�
    * 1.1 �޷��������β����һ��ͼƬ��(˲�� ����ִ�����)
    * 1.2 �޷컬������ͷ����һ��ͼƬ��������ʱ��Ҫ˲�䶨λ��
    * 2.�ڹ�����ͬʱСԲ��ҲҪ��Ӧ�ı䣨�����������ı䵱ǰ��ʽ��
    * 3.�ֲ�ͼ������touch������ָ��x�᷽����ƶ�����ͼƬ������֮��λ�õĸı䣩
    * 4.��������һ������ʱҪ������ȥ������֮һ�����ɻص�ԭ���Ķ�λ��
    * 5.������һ������ʱ��������һ��/��һ�ţ��жϷ���--����--�һ�/�󻬣�
    * */

    /*����*/

    /*��ȡdomԪ��*/
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;//���
    var imgBox = banner.querySelector('ul:first-child');//ͼƬ����
    var pointBox = banner.querySelector('ul:last-child');//�����
    var points = pointBox.querySelectorAll('li');//���е�

    /*1.�Զ�����*/
    var index = 1;//�ᴩ��������
    var timer = setInterval(function () {
        index++;
        /*���㵱ǰ���ӵĶ�λ*/
        var translateX = -index*width;
        /*�ӹ���*/
        imgBox.style.transition = "all 0.3s";
        imgBox.style.webkitTransition = "all 0.3s";
        /*���ø���ǰ��ͼƬ����*/
        imgBox.style.transform = 'translateX('+translateX+'px)';
        imgBox.style.webkitTransform = 'translateX('+translateX+'px)';//���뱣֤webkit����
    },1000);

    /*ʲôʱ�����޷������˲�䶨λ����ô�ж϶���������*/
    /*���ɽ����¼������������¼�*/
    imgBox.addEventListener("transitionEnd", function () {
        /*ÿ�ι������ɽ���ʱ�ᴥ���ù��ɽ����¼�*/
    });
    imgBox.addEventListener("webkitTransitionEnd", function () {
        /*ÿ�ι������ɽ���ʱ�ᴥ���ù��ɽ����¼�*/

        /*1.1 �޷����*/
        if(index >= 9){
            index = 1;
            /*˲�䶨λ*/
            var translateX = -index*width;
            /*�������*/
            imgBox.style.transition = 'none';
            imgBox.style.webkitTransition = "none";
            /*���ø���ǰ��ͼƬ����*/
            imgBox.style.transform = 'translateX('+translateX+'px)';
            imgBox.style.webkitTransform = 'translateX('+translateX+'px)';
        }
        /*1.2 �޷컬��*/
        else if(index <= 0){
            index = 8;
            /*˲�䶨λ*/
            var translateX = -index*width;
            /*�������*/
            imgBox.style.transition = 'none';
            imgBox.style.webkitTransition = "none";
            /*���ø���ǰ��ͼƬ����*/
            imgBox.style.transform = 'translateX('+translateX+'px)';
            imgBox.style.webkitTransform = 'translateX('+translateX+'px)';
        }

        /*��ǰindex�ķ�Χ��1-8*/
        /*2.�ڹ�����ͬʱСԲ��ҲҪ��Ӧ�ı�*/
        setPoint();

    });


    var setPoint = function () {
        /*index 1-8*/
        for(var i=0; i<points.length; i++){
            points[i].className = '';
        }
        points[index-1].className = 'now';
    }


    /*3.�ֲ�ͼ����*/
    var startX = 0;//��¼�ոմ�����Ļ��x����
    var moveX = 0;//��¼����ʱ��ǰ�������x����
    var distanceX = 0;//��¼��������
    var isMove = false;//֤��һ�����������Ͻ�

    imgBox.addEventListener('touchstart', function (e) {
        /*�����ʱ��*/
        clearInterval(timer);

        startX = e.touches[0].clientX;
    });

    imgBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;

        /*��ǰ�Ķ�λ�Ƕ��٣�*/
        /*�������Ҫȥ����λ��λ��*/
        var translateX = -index*width + distanceX;

        /*���ﶨλ����Ҫ����*/
        /*�������*/
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = "none";
        /*���ø���ǰ��ͼƬ����*/
        imgBox.style.transform = 'translateX('+translateX+'px)';
        imgBox.style.webkitTransform = 'translateX('+translateX+'px)';

        console.log(distanceX);

        isMove = true;

    });

    imgBox.addEventListener('touchend', function (e) {
        if(isMove){
            if(Math.abs(distanceX)<width/3){
                /*4.��������һ������ʱҪ������ȥ*/
                /*��λ������֮ǰ��λ��*/
                var translateX = -index*width;
                /*�ӹ���*/
                imgBox.style.transition = 'all 0.3s';
                imgBox.style.webkitTransition = "all 0.3s";
                /*���ø���ǰ��ͼƬ����*/
                imgBox.style.transform = 'translateX('+translateX+'px)';
                imgBox.style.webkitTransform = 'translateX('+translateX+'px)';

            }else{
                /*5.������һ������ʱ��������һ��/��һ��*/
                /*�жϷ���--����--�һ�/��*/
                if(distanceX > 0){
                    index--;//�һ�������һ��
                }else{
                    index++;//�󻬣�����һ��
                }
                /*���㶨λ*/
                var translateX = -index*width;
                /*�ӹ���*/
                imgBox.style.transition = 'all 0.3s';
                imgBox.style.webkitTransition = "all 0.3s";
                /*���ø���ǰ��ͼƬ����*/
                imgBox.style.transform = 'translateX('+translateX+'px)';
                imgBox.style.webkitTransform = 'translateX('+translateX+'px)';
            }
        }

        /*�Ӷ�ʱ��*/
        clearInterval(timer);/*�Ͻ�������*/
        timer = setInterval(function () {
            index++;
            /*���㵱ǰ���ӵĶ�λ*/
            var translateX = -index*width;
            /*�ӹ���*/
            imgBox.style.transition = "all 0.3s";
            imgBox.style.webkitTransition = "all 0.3s";
            /*���ø���ǰ��ͼƬ����*/
            imgBox.style.transform = 'translateX('+translateX+'px)';
            imgBox.style.webkitTransform = 'translateX('+translateX+'px)';//���뱣֤webkit����
        },1000);

        /*���ò���*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

    });
}

/*����ʱ*/
function downTime(){

}