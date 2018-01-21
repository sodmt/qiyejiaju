window.onload=function () {
  let banner_con=document.querySelector('.banner_con').querySelector('ul');
  let prev=document.querySelector('.banner').querySelector('.left');
  let next=document.querySelector('.banner').querySelector('.right');
  let dots=document.querySelectorAll('.banner>.dot>ul>li');
  console.log(dots);
  let num=0;
  prev.onclick=function () {
      if (num==-2) {
          this.style.backgroundColor='#ccc';
          next.style.backgroundColor='#000';
        return;
      }
      num--;
      dots.forEach(function (ele,index) {
          ele.className='';
      });
      dots[Math.abs(num)].className='active';
      banner_con.style.marginLeft=(num*banner_con.offsetWidth/3)+'px';
  };
  next.onclick=function () {
      if (num==0) {
          this.style.backgroundColor='#ccc';
          prev.style.backgroundColor='#000';
          return;
      }
      num++;
      dots.forEach(function (ele,index) {
          ele.className='';
      });
      dots[Math.abs(num)].className='active';
      banner_con.style.marginLeft=(num*banner_con.offsetWidth/3)+'px';
  }
};