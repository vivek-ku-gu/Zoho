
let username 
let textarea = document.querySelector('#textarea')
const submitbtn = document.querySelector('#submitbtn')
const filter = document.querySelector('#filter')
const commentbox= document.querySelector('.comment__box');

submitbtn.addEventListener('click', (e)=>{
    e.preventDefault()
    let comment = textarea.value
    if(!comment)
    {return}
    postcomment(comment);
    
})
filter.addEventListener('click', (e)=>{
fetchcommentOnFilter
  
})
function postcomment(comment)
{

 let data ={
     username: username,
     comment: comment    
 }
 apendToDom(data);

 textarea.value='';
 syncdb(data)
}
function apendToDom(data)
{
let ltag = document.createElement('li')
ltag.classList.add('comment')

let markup = ` <div class="card border-light ">
<div class="card-body">
    <h5>${data.username}</h5>
    <p>${data.comment}</p>
    
</div>
</div>`
ltag.innerHTML = markup;
commentbox.prepend(ltag);

}


function syncdb(data)
{

    fetch('/comment', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
}
function fetchcomment()
{

    fetch('/comment/api')
.then(response => response.json())
.then(res => {
       res.forEach((comment) => {
        apendToDom(comment)
})
})
}
function fetchcommentOnFilter()
{
    fetch('/comment/filter')
.then(response => response.json())
.then(res => {
       res.forEach((comment) => {
        apendToDom(comment)
})
})
}
window.onload = fetchcomment