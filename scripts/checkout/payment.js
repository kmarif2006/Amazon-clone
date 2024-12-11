import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";


export function renderPaymentSummary(){
  let productPrice=0;
  let shippingPrice=0;
  cart.forEach((cartItem)=>{
    const product=getProduct(cartItem.productId);
    productPrice+=product.price*cartItem.quantity;
    const deliveryOption=getDeliveryOption(cartItem.deliveryOptionsId);
    shippingPrice+=deliveryOption.price;
  });
  // console.log(productPrice);
  // console.log(shippingPrice);
  const totalBeforeTax=productPrice+shippingPrice;
  const tax=totalBeforeTax*0.1;
  const total=totalBeforeTax+tax;

  const paymentSummaryHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">&#8377;${formatCurrency(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">&#8377;${formatCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">&#8377;${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">&#8377;${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">&#8377;${formatCurrency(total)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `;
  document.querySelector('.js-payment-summary')
  .innerHTML=paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click',async ()=>{
    const response=await fetch('https://supersimplebackend.dev/orders',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        cart: cart
      })
    });
    const order=await response.json();
    console.log(order);
  });
}