
import {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search';
import { useLocation } from "react-router-dom";

export default function Home({cartItems}){

    const [products, setProducts] = useState([]);
    // const [cartItems,setCartItems]= useState([])


    const location = useLocation();

    const query = new URLSearchParams(location.search);
    const searchName = query.get("name");


    useEffect(() => {
    let url = `${import.meta.env.VITE_API_URL}/products`;
    if (searchName) {
      url += `?name=${encodeURIComponent(searchName)}`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => {
        console.error(err);
        setProducts([]); // or show error message
      });
  }, [searchName]);



  // console.log("products", products)

  return (
    <>
      {/* <Header cartItems={cartItems}/> */}
      {/* <Search /> */}

      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
      <div className="row">
        {products.map((product)=>{
          return(
          <div className="col-sm-12 col-md-6 col-lg-3 my-3">
          <div className="card p-3 rounded">
            <img
              className="card-img-top mx-auto"
              src={product.images[0].image}
            />

            <div className="card-body d-flex flex-column">
              <h5 className="card-title">
               <Link to={"/product/"+product.product_id}>{product.name}</Link>
              </h5>
              <div className="ratings mt-auto">
                <div className="rating-outer">
                  <div className="rating-inner" style={{width:`${product.ratings/5 *100}%`}}></div>
                </div>
              </div>
              <p className="card-text">${product.price}</p>
              <Link to={"/product/"+product.product_id} id="view_btn" className="btn btn-block">View Details</Link>
            </div>
          </div>
        </div>
          )

        })}
        
      </div>
    </section>
    <Footer/>

    
    </>
  );
}