import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';


export default function ProductDetails({cartItems,setCartItems}){

    const [products, setProducts] = useState([]);
    const [qty,setQty] = useState(1)
     const { id } = useParams();
    
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => setProducts(data.product));

    },[])

    // console.log(products)


    const addToCart = () =>{
        

      const itemExist = cartItems.find((item) => item.products.product_id === products.product_id)
      console.log("item exist", itemExist)
        if (!itemExist) {
            const newItem = {products, qty};
            setCartItems((state) => [...state, newItem]);
            toast.success('Cart Item added succesfully!')
        }
        console.log("cartitems",cartItems)
    }

    function increaseQty() {
        if (products.stock == qty) {
            return;
        }
        setQty((state) => state + 1);
    }

    function decreaseQty() {
        
        if (qty > 1) {
            setQty((state) => state - 1);
        }
    }


    return (

      <div className="container container-fluid">
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={products.image} alt="sdf" height="500" width="500"/>

                 
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{products.name}</h3>
                <p id="product_id">Product # {products.product_id}</p>

                <hr/>

                <div className="rating-outer">
                    <div className="rating-inner" style={{width:`${products.ratings/5 *100}%`}}></div>
                </div>
           

                <hr/>

                <p id="product_price">${products.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={qty} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                </div>
                 <button onClick ={addToCart} type="button" id="cart_btn" disabled={products.stock==0} className="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr/>

                <p>Status: <span id="stock_status" className={products.stock > 0 ?'text-success':'text-danger'}>{products.stock>0?'In Stock':'Out Of Stock'}</span></p>

                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>{products.description}</p>
                <hr/>
                <p id="product_seller mb-3">Sold by: <strong>{products.seller}</strong></p>
				
                <div className="rating w-50"></div>
						
            </div>

          </div>

      </div>
    
)

}