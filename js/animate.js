window.onload=function () {
    let bannerImg=document.querySelectorAll('.bannerImg');
    let dian=document.querySelectorAll('.dot>li');
    let curIndex=0;
    let btns=document.querySelectorAll('.btns');
    let btnl=document.querySelector('.btn_l');
    let btnr=document.querySelector('.btn_r');
    let timer=setInterval(move,3000);
    let bannerBox=document.getElementsByClassName('banner')[0];
    function move(type) {
        type= type||'right';
        if (type=='left'){
            curIndex--;
            if (curIndex==-1){
                curIndex=bannerImg.length-1;
            }
        }else if (type=='right'){
            curIndex++;
            if (curIndex>bannerImg.length-1){
                curIndex=0;
            }
        }
        bannerImg.forEach(function (ele,i) {
            ele.style.opacity=0;
            dian[i].className='';
        });
        bannerImg[curIndex].style.opacity=1;
        dian[curIndex].className='active';
    }

    bannerBox.onmouseover=function () {
        clearInterval(timer);
    };
    bannerBox.onmouseout=function () {
        timer=setInterval(move,3000);
    };
    dian.forEach(function (ele,index) {
        ele.addEventListener('mouseover',function () {
            clearInterval(timer);
        });
        ele.addEventListener('click',function () {
            bannerImg.forEach(function (elem,x) {
                elem.style.opacity=0;
                dian[x].className='';
            });
            bannerImg[index].style.opacity=1;
            this.className='active';
            curIndex=index;
        })

    });
    for (let k=0;k<btns.length;k++){
        btns[k].onmouseover=function () {
            clearInterval(timer);
            this.style.opacity=.7;
        };
        btns[k].onmouseout=function () {
            this.style.opacity=.3;
        };

    }
    btnl.onclick=function () {
        clearInterval(timer);
        move('left');
    };
    btnr.onclick=function () {
        clearInterval(timer);
        move('right');
    };


    // 节点轮播
    // let khUl=document.getElementsByClassName('kehu')[0].getElementsByTagName('ul')[0];
    // let khList=khUl.getElementsByTagName('li')[0];
    // let btn_left=document.getElementsByClassName('btn_left')[0];
    // let btn_right=document.getElementsByClassName('btn_right')[0];
    // let speed=0;
    // let khindex=0;
    // let timers=setInterval(function () {
    //     speed+=1;
    //     khindex++;
    //     khUl.style.marginLeft=-(speed+khList.offsetWidth)+'px';
    //     if (khUl.offsetLeft==-khindex*khList.offsetWidth){
    //
    //         khUl.appendChild(khUl.firstElementChild);
    //     }
    // },20)
    // clearInterval(timers);

    function Scroll(options) {
        //获取到面向对象里的属性（盒子id 对象的方向 定时器速度）
        this.el=document.getElementById(options.el);
        this.deraction=options.deraction;
        this.speed=options.speed;
        //获取到ul li
        this.ul=this.el.getElementsByTagName("ul")[0];
        this.li=this.ul.getElementsByTagName("li");
        //定义index值
        this.index=0;
        //调用原型方法
        this.init();
    }
    Scroll.prototype={
        //效果的初始化
        init:function () {
            this.li_num=this.li.length;
            this.el.style.overflow="hidden";
            if (this.deraction=="x"){
                //确定走向，调用change（）方法
                this.change("width","marginLeft");
            }else if(this.deraction=="y"){
                this.change("height","marginTop");
            }
        },
        //无缝滚动效果
        change:function (attr1,attr2) {
            //此处为了避免闭包现象
            var That=this;
            //获取样式值
            this.li_attr=parseInt(this.getAttr(attr1));
            //获取ul根据走向设置宽|高
            this.ul.style[attr1]=this.li_num*this.li_attr+"px";
            //定时器
            timer1=setInterval(function () {
                //此处有闭包现象 That指向对象的this
                That.index--;
                //设置margin
                That.ul.style[attr2]=That.index+"px";
                //判断margin的绝对值大于或等于li的高|宽
                if(Math.abs(That.index)>=That.li_attr){
                    //将第一个li添加到ul尾部
                    That.ul.appendChild(That.ul.firstElementChild);
                    //初始化index margin
                    That.ul.style[attr2]="0px";
                    That.index=0;

                }
            },this.speed)
        },
        //这个 方法是获取li节点样式
        getAttr:function (attr) {
            if (this.li[0].currentStyle){
                return this.li[0].currentStyle[attr];
            }else {
                return getComputedStyle(this.li[0],null)[attr];
            }
        }
    };
    new Scroll({
        el:"kehu",
        deraction:"x",
        speed:30
    });

};