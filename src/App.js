import React, {useState, useEffect} from 'react';
import axios from 'axios'

const App = () =>{

  const [countries, setCountries] = useState('')
  const [initData, setInitData] = useState('')
 
  
  let returnSearch 
 

 

let returnLanguages = () => Object.values(countries[0].languages).map((language) =>{ 
  
    return(
      <div>
        <li key= {language.name}> {language.name} </li>  
      </div> )

})
 
 useEffect(()=>{
      axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
          setCountries(response.data)
          setInitData(response.data)
               
      })

    

  }, [])
let singleCountryData = ()=>{
 
  const country = countries[0]

 

  return( 
    <div>  
                
      <h1>{country.name}</h1>

      <h2>Languages</h2>

      <ul>
      {returnLanguages()}
      </ul>

      <img src={country.flag}/>
                      
    </div>

    )

  }

 let returnList = Object.values(countries).map((country, index) =>{
    
  
    return(

  //Create an array of the new value
  <li key = {index}>{country.name} <button type="button" onClick= {() => {setCountries([initData[index]])}}  >Show</button></li>)
  


})




  const searchFilter = (event) =>{
  const value = event.target.value


   
      if(value !=='' ){
 
       returnSearch = countries.filter((country)=>{


        return country.name.includes(value)

      })

      if(Object.entries(returnSearch).length === 1 ){
  
        setCountries(returnSearch)

         
      } 
       
      } else {

        returnSearch = initData;

      }

      setCountries(returnSearch)
  }

    
 

  return(


      <div>
      <div>
         Search Country <input onChange = {searchFilter} />

      </div>
    
        {Object.keys(countries).length == 1  ?  singleCountryData():returnList}
       
  </div>
  )

}
export default App;
