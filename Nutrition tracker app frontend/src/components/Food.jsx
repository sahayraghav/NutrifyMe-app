import React, { useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function Food(props) {

    const [eatenQuantity,setEatenQuantity] = useState(100);  
    const [food,setfood] = useState({})
    const [foodInitial,setFoodInital] = useState({});

    const loggeddata = useContext(UserContext)

    useEffect(()=>{

        setfood(props.food)
        setFoodInital(props.food);

        console.log(loggeddata.loggeduser);

    },[props.food])

    function calculatemacros(event){

        if (event.target.value.length!==0){

            let quantity = Number(event.target.value)
            setEatenQuantity(quantity);

            let copyFood = {...food}
            
            copyFood.protein = (foodInitial.protein*quantity)/100;
            copyFood.carbohydrates = (foodInitial.carbohydrates*quantity)/100;
            copyFood.fat = (foodInitial.fat*quantity)/100;
            copyFood.fiber = (foodInitial.fiber*quantity)/100;
            copyFood.calories = (foodInitial.calories*quantity)/100;

            setfood(copyFood)

            
        }
    }

    function trackfooditem(){

        let trackeditem={
            userid:loggeddata.loggeduser.userid,
            foodid:food._id,
            details:{
                protein:food.protein,
                carbohydrates:food.carbohydrates,
                fat:food.fat,
                fiber:food.fiber,
                calories:food.calories
            },
            quantity:eatenQuantity
        }

        console.log(trackeditem);

        fetch("http://localhost:8000/track",{
            method:"POST",
            body:JSON.stringify(trackeditem),
            headers:{
                "Authorization":`Bearer ${loggeddata.loggeduser.token}`,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })


    }


  return (
    <div className="food">

       <div className='food-img'>
       
       </div>

        <h3>{food.name} ({food.calories} Kcal for  {eatenQuantity} Gm)</h3>

        <div className="nutrient">
            <p className="n-title">Protein</p>
            <p className="n-value">{food.protein}g</p>
        </div>

        <div className="nutrient">
            <p className="n-title">Carbs</p>
            <p className="n-value">{food.carbohydrates}g</p>
        </div>

        <div className="nutrient">
            <p className="n-title">Fat</p>
            <p className="n-value">{food.fat}g</p>
        </div>

        <div className="nutrient">
            <p className="n-title">Fibre</p>
            <p className="n-value">{food.fiber}g</p>
        </div>

        <div className="track-control">

                <input type="number" onChange={calculatemacros}
                className="inp"  placeholder="Quantity in Gms"/>
                
                <button className="btn" onClick={trackfooditem}>Track</button>


        </div>


    </div>
    )
}
