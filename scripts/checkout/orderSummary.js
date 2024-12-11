import { cart ,removeFromCart,updateDeliveryOptions} from "../../data/cart.js";
import { products,getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./payment.js";

// const today=dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate);
// console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary(){

  let cartSummaryHTML='';

  cart.forEach((cartItem)=>{

    const productId=cartItem.productId;
    const matchingProduct=getProduct(productId);
    // console.log(matchingProduct);
    const deliveryOptionId=cartItem.deliveryOptionsId;
    const deliveryOption=getDeliveryOption(deliveryOptionId);

    const today=dayjs();
    const deliveryDate=today.add(
      deliveryOptions.deliveryDays,
      'days'
    );
    const dateString =deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML+=`
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
          <div class="delivery-options-title">
                Choose a delivery options:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
    `;
    // console.log(cartSummaryHTML);
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
  
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.price === 0 ? 'FREE' : `&#8377;${formatCurrency(deliveryOption.price)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;
  
      html += `
        <div 
          class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} 
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`;
    });
    return html;
  }
  

  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        removeFromCart(productId);
        // console.log(cart);
        const container=document.querySelector(`.js-cart-item-container-${productId}`);
        // console.log(container);
        container.remove();
        renderOrderSummary();
      });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
      element.addEventListener('click', () => {
        const productId = element.dataset.productId;
        const deliveryOptionId = element.dataset.deliveryOptionId;
    
        if (productId && deliveryOptionId) {
          updateDeliveryOptions(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        } else {
          console.error("Missing productId or deliveryOptionId.");
        }
      });
    });
    
}

