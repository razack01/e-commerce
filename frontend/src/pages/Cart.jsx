import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Cart({ cartItems, setCartItems }) {
  const [qty, setQty] = useState(1);
  const [complete, setComplete] = useState(false);

  //     useEffect(() => {
  //   console.log("Cart updated:", cartItems);
  // }, [cartItems]);

  function increaseQty(items) {
    console.log("items", items);
    if (items.products.stock == items.qty) {
      return;
    }
    const updatedCartitems = cartItems.map((item) => {
      // console.log("item",item)
      if (item.products.product_id === items.products.product_id) {
        item.qty++;
      }
      return item;
    });
    setCartItems(updatedCartitems);
  }

  function decreaseQty(items) {
    if (items.qty > 1) {
      const updatedCartitems = cartItems.map((item) => {
        // console.log("item",item)
        if (item.products.product_id === items.products.product_id) {
          item.qty--;
        }
        return item;
      });
      setCartItems(updatedCartitems);
    }
  }

  function removeItem(items) {
    const updatedCartitems = cartItems.filter((i) => {
      if (i.products.product_id !== items.products.product_id) {
        return i;
      }
    });
    setCartItems(updatedCartitems);
  }

  function placeOrderHandler() {
  const bodyData = JSON.stringify(cartItems);
  console.log("Request Body", bodyData);

  fetch(`${import.meta.env.VITE_API_URL}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyData,
  }).then((res) => {
    if(res.ok){
      setCartItems([])
      setComplete(true)
      toast.success("Order sucessfully placed")
    }
    else{
      toast.error("order failed")
    }
    
   
  });
}
  console.log("cartItems", cartItems);
  return (
    <>
      {complete ? (
        <>
         <h2 className='mt-5'>Order Complete!</h2>
        <h2 className="mt-5 text-success">Your order has been placed successfully</h2>
        </>
      ) : cartItems.length > 0 ? (
        <div className="container container-fluid">
          <h2 className="mt-5">
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {cartItems.map((item, index) => (
                <Fragment key={index}>
                  <div className="cart-item">
                    <div className="row">
                      <div className="col-4 col-lg-3">
                        <img
                          src={item.products.image}
                          alt={item.products.name}
                          height="90"
                          width="115"
                        />
                      </div>

                      <div className="col-5 col-lg-3">
                        <a href="#">{item.products.name}</a>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.products.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                          <span
                            className="btn btn-danger minus"
                            onClick={() => decreaseQty(item)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.qty}
                            readOnly
                          />
                          <span
                            onClick={() => increaseQty(item)}
                            className="btn btn-primary plus"
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i
                          className="fas fa-trash"
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => removeItem(item)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                  </span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.products.price * item.qty,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrderHandler}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="mt-5">Your Cart is Empty</h2>
      )}
    </>
  );
}
