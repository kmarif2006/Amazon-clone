export let cart;
loadFromStorage();
function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart=[{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionsId:'1'
      },{
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionsId:'2'
      }];
      saveToStorage();
}
}
// export let cart=[{
//   productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//   quantity:2
// },{
//   productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
//   quantity:1
// }];

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart)); //local storage only save string
}

export function addToCart(productId){
  let matchingItem;
  cart.forEach((item)=>{
    if(productId===item.productId){
      matchingItem=item;
    }
  });

  if(matchingItem){
    matchingItem.quantity++;
  }else{
    cart.push({
    productId:productId,
    quantity:1,
    deliveryOptionsId:'1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId){
  let newCart=[];

  cart.forEach((cartItem)=>{
    if(cartItem.productId!==productId){
      newCart.push(cartItem);
    }
  });

  cart=newCart;

  saveToStorage();
}

export function updateDeliveryOptions(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((item)=>{
    if(productId===item.productId){
      matchingItem=item;
    }
  });

  if (matchingItem) {
    matchingItem.deliveryOptionsId = deliveryOptionId; // Ensure the field name matches 'deliveryOptionsId'
    saveToStorage();
  } else {
    console.error(`Cart item with productId ${productId} not found.`);
  }
  saveToStorage();
}