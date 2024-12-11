function Cart(localStorageKey){
  const cart={
    cartItems: undefined,
    loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      if(!this.cartItems){
        this.cartItems=[{
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:2,
            deliveryOptionsId:'1'
          },{
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:1,
            deliveryOptionsId:'2'
          }];
      }
    },
    saveToStorage(){
      localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems)); //local storage only save string
    },
    addToCart(productId){
      let matchingItem;
      this.cartItems.forEach((item)=>{
        if(productId===item.productId){
          matchingItem=item;
        }
      });
    
      if(matchingItem){
        matchingItem.quantity++;
      }else{
        this.cartItems.push({
        productId:productId,
        quantity:1,
        deliveryOptionsId:'1'
        });
      }
      this.saveToStorage();
    },
    removeFromCart(productId){
      let newCart=[];
    
      this.cartItemsart.forEach((cartItem)=>{
        if(cartItem.productId!==productId){
          newCart.push(cartItem);
        }
      });
    
      this.cartItemsart=newCart;
    
      this.saveToStorage();
    },
    
    updateDeliveryOptions(productId,deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach((item)=>{
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
    this.saveToStorage();
    }
  };
  return cart;
}
const cart=Cart('cart');
const bussinessCart=Cart('cart-business');
cart.loadFromStorage();

// console.log(cart);