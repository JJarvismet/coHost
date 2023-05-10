import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom'
import '../TripSchedule.css'
import axios from 'axios';
import { getCurrentTrip, postMark } from '../../../../../features/trip/tripSlice';
import './NewMark.css'
import validateMark from '../validateMark';
import { toast } from "react-toastify";




const NewInMealForm = () =>{
    const {currentTrip,currentTripLength} = useSelector((state)=>state.trip);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const day = useParams().day;
    const tripId = currentTrip._id;

    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [productResults, setProductResults] = useState(null);
    const [list, setList] = useState([]);
    const [onCart, setOnCart] = useState(1);
    


    const onSubmit = async() => {
        const dataList = [];
        for(let product of list){
            if(product.qty>0){
                dataList.push(product);
            }
        }
        const data = {name, startTime, endTime, list:dataList}
        const isValid = validateMark(data);
        if(isValid.valid){
            dispatch(postMark({tripId, day, mark:{mark:'inMeal', data}}));
            dispatch(getCurrentTrip(tripId));
            navigate(`/trip/${tripId}/schedule`);
        }else{
            toast.error(isValid.message);
        }
    }

    const search = async() =>{
        if(searchTerm.length>0){
            const productResponse = await axios({
                method: 'GET',
                url:'https://api.spoonacular.com/food/products/search',
                params: {
                    apiKey: process.env.REACT_APP_SPOON,
                    query: searchTerm,
                    number: 12
                }
            });
            setProductResults(productResponse.data.products);
        }else{
            setProductResults(null);
        }
    }

    useEffect(() => {
        const dataList = [];
        for(let product of list){
            if(product.qty>0){
                dataList.push(product);
            }
        }
        setList(dataList);
    },[onCart])

    const ProductCard = (props) =>{
        const isMounted = useRef(false);
        const productData = props.product;
        let product = list.find(listIndex=>listIndex.productData.id === productData.id);
        const [part,setPart] = useState(product ? 1 : 0);
        const [qty, setQty] = useState(product ? product.qty : 0);

        useEffect(()=>{
            if(isMounted.current){
                if(part === 1){
                    if(qty <= 0){
                        setPart(0);
                        product.qty = 0;
                    }else{
                        if(product){
                            product.qty = qty;
                        }else{
                            setList(list => [...list, {productData, qty}]);
                        }
                    }
                }
            }else{
                isMounted.current = true;
            }

        },[qty])

        return(
            <div className="product">
                    {part===0 &&
                        <div className="overlay">
                            <i className="fa-solid fa-circle-plus fa-xl" onClick={()=>{setPart(1);setQty(1)}}></i>
                        </div>
                    }
                    {part===1 &&
                        <div className="overlay success">
                            <div>
                                <input disabled type="text" value={qty} onChange={(e)=>{setQty(e.target.value)}}/>
                                <div className="input-btns">
                                    <button onClick={()=>{setQty(qty-1)}}>-</button>
                                    <button onClick={()=>{setQty(qty+1)}}>+</button>
                                </div>
                            </div>
                        </div>
                    }
                {qty > 0 && 
                    <div className="in-list"><i className="fa-solid fa-cart-shopping"></i></div>
                }
                <div className="img-container">
                    <img src={productData.image}/>
                </div>
                <h5>{productData.title}</h5>
            </div>
        )
    }

    return(
        <div id='NewInMealForm'>
            <form className="mark-form">
                <h3>{currentTripLength[0]}</h3>
                <div>
                    <input className="mark-input IM" type="text" placeholder="Name" onChange={(e)=>{setName(e.target.value)}}/>
                    <div className="mark-container">
                        <input className="mark-input IM" type="time" name="" id="" onChange={(e)=>{setStartTime(e.target.value)}}/>
                        <span className="time-label">to</span>
                        <input className="mark-input IM" type="time" name="" id="" onChange={(e)=>{setEndTime(e.target.value)}}/>
                    </div>
                </div>
            </form>
            <div className="shopping">
                <div className="search">
                    <button onClick={()=>{setOnCart(1)}}><i className="fa-solid fa-cart-shopping fa-xl"></i></button>
                    <input placeholder="Search" type="text" onClick={()=>{setOnCart(0)}} onChange={(e)=>{setSearchTerm(e.target.value)}}/>
                    <button className="send-search" onClick={()=>{search(); setOnCart(0)}}><i className="fa-solid fa-magnifying-glass fa-xl"></i></button>
                    {onCart === 0 &&
                        <div id="res-data">
                            {productResults && productResults.length>0 &&
                                <div className="products">
                                    <div className="products-box">
                                        {productResults.map((product)=>
                                            <ProductCard product={product} key={product.id}/>
                                        )}
                                    </div>
                                </div>
                            }
                            {(productResults === null || productResults.length === 0) &&
                                <div className="product-filler">
                                    <span>Search for ingredients</span>
                                </div>
                            }
                        </div>                        
                    }
                    {onCart === 1 &&
                        <div id="list-data">
                            <button className="mark-success IM" onClick={()=>{onSubmit()}}>Add Meal</button>
                            {list && list.length>0 &&
                                <div className="products">
                                    <div className="products-box">
                                        {list.map((product)=>
                                            <ProductCard product={product.productData} key={product.productData.id}/>
                                        )}
                                    </div>
                                </div>
                            }
                            {list.length === 0 &&
                                <div className="product-filler">
                                    <span>Your cart is empty</span>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}

export default NewInMealForm;