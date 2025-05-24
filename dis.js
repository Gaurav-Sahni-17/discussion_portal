const submit=document.getElementById('submit');
const list=document.getElementById('questions');
const res=document.getElementById('res');
const sub=document.getElementById('submit-2');
let count=0,rescount=0;
let data=[];
submit.addEventListener('click',add);
function add(){
    const subject=document.getElementById('subject').value.trim();
    const question=document.getElementById('ques').value.trim();
    if(subject!=="" && question!=="")
    {
        create(subject,question);
    }
    else{
        alert("Please fill all fields.");
    }
}
function create(subject,question,obj,param){
    const li=document.createElement('li');
    li.setAttribute("id","li-"+count);
        const h=document.createElement('p');
        h.style.fontSize="2rem";
        h.textContent=subject;
        h.setAttribute("id","s-"+count);
        const span=document.createElement('span');
        span.textContent=question;
        span.setAttribute("id","q-"+count);
        document.getElementById('subject').value="";
        document.getElementById('ques').value = "";
        li.appendChild(h);
        li.appendChild(span);
        li.setAttribute("class","demo");
        li.addEventListener('click',response);
        const fav=document.createElement('i');
        fav.setAttribute("class","fa-solid fa-heart");
        fav.style['float']="right";
        fav.style['cursor']='pointer';
        fav.classList.add("star");
        li.appendChild(fav);
        const time=document.createElement('span');
        time.style['float']="right";
        li.appendChild(time);
        list.appendChild(li);
        let a={}
        a.ques=question;
        a.sub=subject;
        if(obj!==undefined)
        {
            a.name=obj.name;
            a.comment=obj.comment;
            a.up=obj.up;
            a.down=obj.down;
            a.fav=obj.fav;
            a.time=obj.time;
        }
        else{
            a.fav=false;
            a.time=0;
        }
        if(a.fav===true)
        {
            fav.classList.add('red');
        }
        else{
            fav.classList.add('white');
        }
        fav.addEventListener('click',favourite);
        if(param!==1)
        {
        data[count]=a;
        localStorage.setItem("data",JSON.stringify(data));
        count++;
        start(time,li.id);
        }
}
window.addEventListener('load',load);
function load(){
    const d=JSON.parse(localStorage.getItem("data"));
    if(d!==null)
    {
        for(let i=0;i<d.length;i++)
        {
            if(d[i]!=="" && d[i].fav===true)
            {
            let a=d[i];
            create(a.sub,a.ques,a);
            }
        }
        for(let i=0;i<d.length;i++)
        {
            if(d[i]!=="" && d[i].fav===false)
            {
            let a=d[i];
            create(a.sub,a.ques,a);
            }
        }
    }
}
function response(e) {
    rescount=0;
    document.getElementById('right-2').style.display = "block";
    document.getElementById('right-1').style.display = "none";
    let q;
    const a=document.getElementById('block-1');
    if (e.target.classList.contains('demo')) {
        a.innerHTML = e.target.innerHTML;
        q = e.target;
    }
    else {
        a.innerHTML = e.target.parentNode.innerHTML;
        q = e.target.parentNode;
    }
    res.innerHTML ="";
    const l = q.querySelector('p').id;
    let index=l.split('-');
    let i=index[1];
    let d=JSON.parse(localStorage.getItem("data"));
    if(d[i].name!==undefined)
    { 
        for(let j=0;j<d[i].name.length;j++)
        {
            createres(d[i].name[j],d[i].comment[j]);
        }
}
    }
const n=document.getElementById('new');
n.addEventListener('click',()=>{
    document.getElementById('right-1').style.display="block";
    document.getElementById('right-2').style.display="none";
})
sub.addEventListener('click',addres);
function addres() {
    const name=document.getElementById('name').value.trim();
    const comment=document.getElementById('comment').value.trim();
    if(name!=="" && comment!=="")
    {
        createres(name,comment,a=1);
    }
    else{
        alert("Please fill all fields.");
    }
}
function createres(name,comment,a){
    const n = document.getElementById('block-1');
    const q = n.querySelector('p').id;
    let index=q.split('-');
    let i=index[1];
    const li=document.createElement('li');
    li.setAttribute("id",'res-'+rescount);
    const h=document.createElement('p');
    h.style.fontSize="1.5rem";
    h.textContent=name;
    const span=document.createElement('span');
    span.textContent=comment;
    document.getElementById('name').value="";
    document.getElementById('comment').value="";
    li.appendChild(h);
    li.appendChild(span);
    const div=document.createElement('div');
    div.setAttribute("class","votes vote-buttons");
    const up=document.createElement('span');
    const d=JSON.parse(localStorage.getItem("data"));
    const u=d[i].up;
    if(u!==undefined)
    {
        if(u[rescount]!==undefined)
        {
       up.textContent=u[rescount];
        }
        else
        {
            up.textContent="0";
        }
    }
    else
    {
        up.textContent="0";
    }
    up.setAttribute("id",'up-'+rescount);
    const like=document.createElement('button');
    like.innerHTML='&#128077;';
    like.setAttribute("class","vote-btn like");
    like.addEventListener("click",likes);
    const down=document.createElement('span');
    const dow=d[i].down;
    if(dow!==undefined)
    {
        if(dow[rescount]!==undefined)
        {
       down.textContent=dow[rescount];
        }
        else
        {
            down.textContent="0";
        }
    }
    else
    {
        down.textContent="0";
    }
    down.setAttribute("id",'down-'+rescount);
    const unlike=document.createElement('button');
    unlike.innerHTML='&#128078;';
    unlike.setAttribute("class","vote-btn dislike");
    unlike.addEventListener("click",unlikes);
    div.appendChild(like);
    div.appendChild(up);
    div.appendChild(unlike);
    div.appendChild(down);
    li.appendChild(div);
    res.appendChild(li);
    rescount++;
    if(a==1)
    {
       saveres(name,comment);
    }
}
function saveres(name,comment){
    const a = document.getElementById('block-1');
    const q = a.querySelector('p').id;
    let index=q.split('-');
    let i=index[1];
    const d=JSON.parse(localStorage.getItem("data"));
    if(d[i].name===undefined)
    {
        const n=[name];
        const com=[comment];
        d[i].name=n;
        d[i].comment=com;
        d[i].up=[0];
        d[i].down=[0];
    }
    else
    {
        const n=d[i].name;
        const com=d[i].comment;
        n.push(name);
        com.push(comment);
        d[i].name=n;
        d[i].comment=com;
        d[i].up.push(0);
        d[i].down.push(0);
    }
    data[i]=d[i];
    localStorage.setItem("data",JSON.stringify(d));
}
const resolve=document.getElementById('resolve');
resolve.addEventListener('click',resolveque);
function resolveque(){
    const a=document.getElementById('block-1').querySelector('p').id;
    let arr=a.split("-");
    let index=arr[1];
    const d=JSON.parse(localStorage.getItem("data"));
    d[index]="";
    data[index]="";
    localStorage.setItem("data",JSON.stringify(d));
    let li=document.getElementById('li-'+index);
    li.remove();
    document.getElementById('right-1').style.display="flex";
    document.getElementById('right-2').style.display="none";
}
search.addEventListener('keyup',find);
function find(e){
  let a=e.target.value.trim();
  let l=0,array=[];
  const d=JSON.parse(localStorage.getItem("data"));
  list.innerHTML="";
  if(a!=="")
  {
  if(d!==null)
  {
  for(let i=0;i<d.length;i++)
  {
    if(d[i]!=="")
    {
    if(d[i].sub.includes(a))
    {
        array.push(d[i]);
        l=1;
    }
  }
}
    for(i=0;i<d.length;i++)
    {
        if(d[i]!=="")
        {
    if(d[i].ques.includes(a) && !(d[i].sub.includes(a)))
    {
        array.push(d[i]);
        l=1;       
    }
}
}
  for(let i=0;i<array.length;i++)
  {
      create(array[i].sub,array[i].ques,array[i],par=1);
  }
}
}
  else{
    count=0;
    load();
}
if(l===0 && list.innerHTML==="")
{
   let li=document.createElement('li');
   li.textContent="Match Not Found";
   li.style.fontSize="2rem";
   list.appendChild(li);
}
}
function likes(e){
    const target=e.target.parentNode.parentNode;
    const i=target.id.split('-');
    const index=i[1];
    let a=parseInt(target.querySelector('#up-'+index).textContent);
    a++;
    target.querySelector('#up-'+index).textContent=a;
    const n = document.getElementById('block-1');
    const q = n.querySelector('p').id;
    let ir=q.split('-');
    let ind=ir[1];
    const d=JSON.parse(localStorage.getItem("data"));
    const u=d[ind].up;
    u[index]=a;
    d[ind].up=u;
    localStorage.setItem("data",JSON.stringify(d));
    ressort();
}
function unlikes(e){
    const target=e.target.parentNode.parentNode;
    const i=target.id.split('-');
    const index=i[1];
    let a=parseInt(target.querySelector('#down-'+index).textContent);
    a++;
    target.querySelector('#down-'+index).textContent=a;
    const n = document.getElementById('block-1');
    const q = n.querySelector('p').id;
    let ir=q.split('-');
    let ind=ir[1];
    const d=JSON.parse(localStorage.getItem("data"));
    const down=d[ind].down;
    down[index]=a;
    d[ind].down=down;
    localStorage.setItem("data",JSON.stringify(d));
    ressort();
}
function ressort()
{
    res.innerHTML="";
    rescount=0;
    const a = document.getElementById('block-1');
    const q = a.querySelector('p').id;
    let index=q.split('-');
    let i=index[1];
    let d=JSON.parse(localStorage.getItem("data"));
    if(d[i].name!==undefined)
    {
        for(j=0;j<d[i].up.length;j++)
        {
            for(k=j+1;k<d[i].up.length;k++)
            {
                if(d[i].up[j]<d[i].up[k] || (d[i].up[j]===d[i].up[k]) && (d[i].down[j]>d[i].down[k]))
                {
                    temp=d[i].up[j];
                    d[i].up[j]=d[i].up[k];
                    d[i].up[k]=temp;
                    temp=d[i].down[j];
                    d[i].down[j]=d[i].down[k];
                    d[i].down[k]=temp;
                    temp=d[i].name[j];
                    d[i].name[j]=d[i].name[k];
                    d[i].name[k]=temp;
                    temp=d[i].comment[j];
                    d[i].comment[j]=d[i].comment[k];
                    d[i].comment[k]=temp;
                }
            }
        }
        localStorage.setItem("data",JSON.stringify(d));
        data=d;
        d=JSON.parse(localStorage.getItem("data"));
        for(let j=0;j<d[i].name.length;j++)
        {
            createres(d[i].name[j],d[i].comment[j]);
        }
}
}
function favourite(e){
    const li=e.target.parentNode;
    const a=e.target.parentNode.id;
    const b=a.split('-');
    const i=b[1];
    const d=JSON.parse(localStorage.getItem("data"));
    if(d[i].fav===true)
    {
        d[i].fav=false;
        e.target.classList.remove('red');
        e.target.classList.add('white');
        e.target.parentNode.remove();
        list.appendChild(li);
    }
    else{
        d[i].fav=true;
        e.target.classList.add('red');
        e.target.classList.remove('white');
        e.target.parentNode.remove();
        list.insertBefore(li,list.childNodes[0]);
    }
    localStorage.setItem("data",JSON.stringify(d));
}
function start(s,item)
{
    let a; 
    let index=item.split('-');
    let i=index[1];
    const d=JSON.parse(localStorage.getItem("data"));
    if(d!==null && d[i]!=="")
    {
       a=d[i].time;
    }
     setInterval(()=>{
         a++;
         updatetime(a,i);
         if(a<10)
         {
           s.textContent="just now";
         }
         else if(a<60)
         {
            s.textContent=a+"sec ago";
         } 
         else if(a<3600)
         {
            s.textContent=Math.floor(a/60)+"min ago";
         }  
         else{
            s.textContent=Math.floor(a/3600)+"hours ago";
         }     
     },1000);
}
function updatetime(t,i)
{
    const d=JSON.parse(localStorage.getItem("data"));
    d[i].time=t;
    localStorage.setItem("data",JSON.stringify(d));
}

document.addEventListener('DOMContentLoaded', function() {
    const particles = document.getElementById('particles');
    const particleCount = 15; 
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 150 + 50;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particles.appendChild(particle);
    }
    document.getElementById('new').addEventListener('click', function() {
        document.getElementById('right-1').style.display = 'flex';
        document.getElementById('right-2').style.display = 'none';
    });
});