import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ViewDetails(){

    const [products, setProducts] = useState([]);
     const { id } = useParams();
    
    useEffect(()=>{
        fetch(`${import.meta.env.VITE_API_URL}/product/${id}`)
      .then(res => res.json())
      .then(data => setProducts(data.product));

    },[])

    console.log(products)

    return (
        
        <>
        <div className="row">
        {/* {products?.map((product)=>{
          return( */}
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={products.image}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
                <a href="">{products.name}</a>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner" style={{width:`${products.ratings/5 *100}%`}}></div>
                </div>
              </div>
              <p className="card-text">₹{products.price}</p>
              {/* <a href="#" id="view_btn" className="btn btn-block">View Details</a> */}
            </div>
          </div>
        </div>
          {/* )

        })} */}
        
      </div>
        </>
    )

}