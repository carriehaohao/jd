
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


    /*��ӹ���*/
    var addTrasition = function () {
        imgBox.style.transition = "all 0.3s";
        imgBox.style.webkitTransition = "all 0.3s";
    }
    /*�������*/
    var removeTrasition = function () {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    }
    /*��λ*/
    var setTranslateX = function (translateX) {
        imgBox.style.transform = 'translateX('+translateX+'px)';
        imgBox.style.webkitTransform = 'translateX('+translateX+'px)';
    }



    /*1.�Զ�����*/
    var index = 1;//�ᴩ��������
    var timer = setInterval(function () {
        index++;
        /*���㵱ǰ���ӵĶ�λ*/
        /*�ӹ���*/
        addTrasition();
        /*���ø���ǰ��ͼƬ����*/
        setTranslateX(-index*width);
    },1000);

    /*ʲôʱ�����޷������˲�䶨λ����ô�ж϶���������*/
    /*���ɽ����¼������������¼�*/
    itcast.addTransitionEnd(imgBox, function () {
        /*ÿ�ι������ɽ���ʱ�ᴥ���ù��ɽ����¼�*/
        /*1.1 �޷����*/
        if(index >= 9){
            index = 1;
            /*�������*/
            removeTrasition();
            /*˲�䶨λ*/
            /*���ø���ǰ��ͼƬ����*/
            setTranslateX(-index*width);
        }
        /*1.2 �޷컬��*/
        else if(index <= 0){
            index = 8;
            /*�������*/
            removeTrasition();
            /*˲�䶨λ*/
            /*���ø���ǰ��ͼƬ����*/
            setTranslateX(-index*width);
        }

        /*��ǰindex�ķ�Χ��1-8*/
        /*2.�ڹ�����ͬʱСԲ��ҲҪ��Ӧ�ı�*/
        setPoint();
    })


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

        /*���ﶨλ����Ҫ����*/
        /*�������*/
        removeTrasition();
        /*˲�䶨λ*/
        /*���ø���ǰ��ͼƬ����*/
        setTranslateX(-index*width + distanceX);

        console.log(distanceX);

        isMove = true;

    });

    imgBox.addEventListener('touchend', function (e) {
        if(isMove){
            if(Math.abs(distanceX)<width/3){
                /*4.��������һ������ʱҪ������ȥ*/
                /*��λ������֮ǰ��λ��*/
                /*�ӹ���*/
                addTrasition();
                /*���ø���ǰ��ͼƬ����*/
                setTranslateX(-index*width);

            }else{
                /*5.������һ������ʱ��������һ��/��һ��*/
                /*�жϷ���--����--�һ�/��*/
                if(distanceX > 0){
                    index--;//�һ�������һ��
                }else{
                    index++;//�󻬣�����һ��
                }

                /*�ӹ���*/
                addTrasition();
                /*���ø���ǰ��ͼƬ����*/
                setTranslateX(-index*width);
            }
        }

        /*�Ӷ�ʱ��*/
        clearInterval(timer);/*�Ͻ�������*/
        timer = setInterval(function () {
            index++;
            /*�ӹ���*/
            addTrasition();
            /*���ø���ǰ��ͼƬ����*/
            setTranslateX(-index*width);
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
    /*
    * 1.����ʱ��ʱ�䣬����4Сʱ
    * 2.ʱ���ʽ��
    * 3.��ʱ����ÿһ��ִ��һ��
    * 4.ת����ʱ���룬����html
    * */

    /*��ȡdomԪ��*/
    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');//����span

    var time = 4*60*60;

    var timer = setInterval(function () {
        time--;
        /*ʱ���ʽ��*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);//Сʱ��ʮλ
        spans[1].innerHTML = h%10;//Сʱ�ĸ�λ
        spans[3].innerHTML = Math.floor(m/10);//���ӵ�ʮλ
        spans[4].innerHTML = m%10;//���ӵĸ�λ
        spans[6].innerHTML = Math.floor(s/10);//������ʮλ
        spans[7].innerHTML = s%10;//�����ĸ�λ

        if(time <= 0){
            clearInterval(timer);
        }

    },1000);



}