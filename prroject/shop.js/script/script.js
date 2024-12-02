let productContainer = document.querySelector("#product");
let cartHeader= document.querySelector(".cart-header");
let cartContainer= document.querySelector("#cart");
let cartItems=document.querySelector(".cart-items");
let totalItemsEl = document.querySelector('.total-items');
let totalPriceEl = document.querySelector('.total-price');





    function showAllProduct(){
       for(let i =0 ; i <product.length ; i++) {
            productContainer.innerHTML +=`<div id="product-item">
            <div class="product-images"> <img src=`+ product[i].imgSrc+` alt=""></div>
            <div class="product-title">` + product[i].name+`</div>
            <div class="product-instoct"> موجودی:`+product[i].instock+`</div>
            <div class="product-date">
            <div class="product-price">` + commafy(product[i].price) + `</div>
                <div class="add-to-cart" onclick="addToCart(`+product[i].id+`)"><i class="fa-solid fa-cart-shopping"></i></div>` ;
        }
        }
showAllProduct();
   
  let n=0;
  cartHeader.addEventListener("click" , function(){
    if(n==0){
        cartContainer.style.bottom="-10px";
        n++;
    }else{
        cartContainer.style.bottom="-365px";
        n = 0;
    }
  });
//   array cart 
let cart=[]; 

//   add to cart
   function addToCart(id){

    let itemId = cart.some(function (item) {
      return item.id == id;
  });


  if (itemId) {
      changeNumberOfUnits('plus', id);
  } else {

    let item =product.find(function(p){
      return p.id == id;

    });
    item.numberOfUnits = 1;
    cart.push(item);
     renderCartItems();
     renderTotal();
   }
  }
  //  rendewr cart items 
  function renderCartItems(){
    cartItems.innerHTML=" ";
    for(i=0 ; i<cart.length ; i++){
      cartItems.innerHTML+=`<li class="cart-item"> 
      <div class="p-name" onclick="deleteFromCart(` + cart[i].id + `)">` + cart[i].name + `</div>
      <div class="p-price">` + commafy(cart[i].price) + `</div>
      <div class="p-unit">
          <span class="pluss"onclick="changeNumberOfUnits('plus', ` + cart[i].id + `)"> <i class="fa-solid fa-plus"></i></span>
          <span class="unit">` +cart[i].numberOfUnits+ `</span>
          <span class="minus" onclick="changeNumberOfUnits('minus', ` + cart[i].id + `)"><i class="fa-solid fa-minus"></i></span>
      </div>
  </li>`
    }
  }
   // change number of units
function changeNumberOfUnits(action, id){
    cart = cart.map(function(item){
      let oldNumberOfUnits = item.numberOfUnits; //1

      if(item.id == id){

          if(action == 'plus' && oldNumberOfUnits < item.instock){
              oldNumberOfUnits++;
          } else if(action == 'minus' && oldNumberOfUnits >1 ){
              oldNumberOfUnits--;
          }
          
      }

      item.numberOfUnits = oldNumberOfUnits;
      return item;
  });

  renderCartItems();
  renderTotal();

}

  //  revder total 
    function renderTotal(){
      let totalPrice = 0;
      let totalItems = 0;
  
      for (let i = 0; i < cart.length ; i++){
          totalItems += cart[i].numberOfUnits;
          totalPrice += cart[i].price * cart[i].numberOfUnits; 
      }
  
      totalPriceEl.innerHTML = commafy(totalPrice);
      totalItemsEl.innerHTML = totalItems;
  
  
  }
  // delete from cart
function deleteFromCart(id){
  cart = cart.filter(function(item){
      return item.id != id;
  });
  renderCartItems();
  renderTotal();
}

function commafy(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1.');
  }
  if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}