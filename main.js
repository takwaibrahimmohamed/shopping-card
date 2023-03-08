let content = document.querySelector('.mainsec .content')
let cartlist=document.querySelector('.cartlist')
let cartcount = document.querySelector('#cart-btn span')
let total = document.querySelector('.total .value')
let clear = document.querySelector('.clear')
let cartId = 1




allevent()
function allevent(){
    window.addEventListener('DOMContentLoaded',loaddata())
    window.addEventListener('DOMContentLoaded',load())
document.querySelector('.navbar-toggle').onclick =()=>{
    document.querySelector('.navbar .collabse').classList.toggle('show')
}
document.querySelector('.card #cart-btn').onclick = ()=>{
    document.querySelector('.card .cart-container').classList.toggle('display')
}
content.addEventListener('click',targetelement)
cartlist.addEventListener('click',deltargetelement)
clear.addEventListener('click',clearAll)
}

function loaddata(){
    fetch('app.json')
    .then((res)=>res.json())
    .then((dat)=>{
        let html =''
     dat.forEach((e)=>{
        html +=`
        <div class="box">
        <div class="img">
            <img src=${e.imgSrc} alt="">
            <div class="add">
                <i class="fas fa-shopping-cart addtocart"></i> add to card
            </div>
        </div>
        <div class="info">
            <h4>${e.name}</h4>
            <button class="btn">${e.category}</button>
            <div class="price">${e.price}</div>
        </div>
    </div>
        
        `
        content.innerHTML = html

     })
     
    })
    .catch((error)=>alert("User live server or local server"))
}
function targetelement(e){
    if(e.target.classList.contains('add') ||e.target.classList.contains('i')){
       let product = e.target.parentElement.parentElement
      getInfo(product)
    }

}
function getInfo(item){
   let iteminfo = {
        id :cartId,
imgSrc:item.querySelector('img').src,
name:item.querySelector('h4').textContent,
category:item.querySelector('.btn').textContent,
price:item.querySelector('.price').textContent
   }
   cartId++
   addtocart(iteminfo)
   savetolocalstorage(iteminfo)
}
function addtocart(product){
    let div =document.createElement('div')
    div.className = 'cart-item'
    div.setAttribute('data-id' , product.id)
div.innerHTML = `
        <img src=${product.imgSrc} alt="">
            <div class="info">
                <h3 class="name">${product.name}</h3>
                <span class="category">${product.category}</span>
                <span class="price">${product.price}</span>
            </div>
            <button type="button" class="cart-del">
                <i class="fas fa-times del"></i>
            </button>

`
cartlist.appendChild(div)
}
function savetolocalstorage(item){
let product = getProductFromStorage()
product.push(item)
localStorage.setItem('product', JSON.stringify(product))
displayInfo()
}
function getProductFromStorage(){
    return localStorage.getItem('product') ?JSON.parse(localStorage.getItem('product')):[]
}


function load(){
let prod= getProductFromStorage()

prod.forEach((e)=> addtocart(e))
displayInfo()
}


function calcTotal (){
let product = getProductFromStorage()
let totle = 0;
product.forEach((e)=>{
    totle +=parseFloat(e.price)
})
let totInfo = {
    totlePrice : totle,
    count:product.length
}
return totInfo
}
function displayInfo(){
let updateInfo =  calcTotal()
cartcount.innerHTML = updateInfo.count
total.innerHTML = '$' +updateInfo.totlePrice
}

function deltargetelement(e){
    let deleteBtn
    if(e.target.classList.contains('cart-del')){
      deleteBtn = e.target.parentElement
      deleteBtn.remove()
    }
   else if(e.target.classList.contains('del')){
       deleteBtn = e.target.parentElement.parentElement
       deleteBtn.remove()
    }

    
    let pro = getProductFromStorage()
    let delitem = pro.filter((prod)=>{
 
return prod.id !=parseInt(deleteBtn.dataset.id)
    })
localStorage.setItem('product',JSON.stringify(delitem))
displayInfo()
}


function clearAll(){
    cartlist.innerHTML =''
    localStorage.clear()
    displayInfo()
    load()
}