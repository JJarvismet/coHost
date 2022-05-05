import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import './TripDetails.css'

const ProductCard = (props) =>{
    const productData = props.product;

    return(
        <div className="product">
            <div className="img-container">
                <img src={productData.image}/>
            </div>
            <h5>{productData.title}</h5>
        </div>
    )
}

const GroceryList = () =>{
    const navigate = useNavigate();
    const {currentTrip} = useSelector((state)=>state.trip);
    const dispatch = useDispatch();
    const trip = currentTrip;
    const [list, setList] = useState([]);

    useEffect(()=>{
        const fillList = [];
        for(let day of trip.schedule){
            for(let mark of day){
                if(mark.markType === 'IM'){
                    for(let product of mark.products){
                        const found = fillList.find(index => index.product.id === product.productData.id);
                        if(found){
                            found.qty.push(`${product.qty} in ${mark.name}`);
                        }else{
                            fillList.push({qty:[`${product.qty} in ${mark.name}`],product:product.productData});
                        }
                    }
                }
            }
        }
        setList(fillList);
    },[])

    return(
        <div className='GroceryList'>
            <div className="products-box">
                {list && list.map(product=>(
                    <div className="grocery-group" key={product.product.id}>
                        <ProductCard product={product.product}/>
                        {product.qty && product.qty.map(qtyString => (
                            <span className="qty">{qtyString}</span>
                        ))}
                    </div>
                ))}
                {list.length<=0 &&
                    <div className="list-filler">there are no items on the grocery list, yet</div>
                }
            </div>
        </div>
    )
}

export default GroceryList;