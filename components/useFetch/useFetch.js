import { useEffect, useState } from "react";

export const useFetch = (initialUrl, userInputHeading, userInputText, userInputLatitude, userInputLongitude ,image, group, setSelectedCathegory) => {
    const [url, setUrl] = useState(initialUrl);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [refetchIndex, setRefetchIndex] = useState(0);

  
    const deletePost = (id, item) =>{
      let cathegory= item.map(e=>e.title);

      fetch('http://827013-cs70445.tmweb.ru:4000/'+ cathegory[0] + '/' +  id, {
        method: 'DELETE',
      })
      .then(() => setRefetchIndex((prevRefetchIndex) =>
      prevRefetchIndex + 1));
    };
    const searchId = () =>{
        let b=Object.values(data).map((val)=> val).flat();
        let max = 0
        for (let i in b) {
          if (b[i].id > b[max].id) {
            max = i
          }
        }
        if(b[max]){
          return b[max].id
        }
      }
  
    const addPost = (e) =>{
      e.preventDefault();
      let id = searchId();

      fetch('http://827013-cs70445.tmweb.ru:4000/' + group + '/', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id + 1,
          heading: userInputHeading,
          text: userInputText,
          latitude: userInputLatitude,
          longitude: userInputLongitude,
          img: image
        })
      })
      .then(() => setRefetchIndex((prevRefetchIndex) =>
      prevRefetchIndex + 1));
    }

    useEffect(()=>{
      const fetchData = async () =>{
        setIsLoading(true);
        try{
          const response = await fetch(url);
          const result = await response.json()
            
          if(response.ok){
            let modifiedData = [];

            Object.entries(result).forEach(([key,value]) =>{
              value.map(e=>e.title=key)
              modifiedData.push({title: key, data:[value]}) 
            })
            setData(modifiedData)
            
          }else{
            setHasError(true);
            setErrorMessage(result);
          }
          
          
        } catch (err) {
          setHasError(true);
          setErrorMessage(err.message);      
        }finally{
          setIsLoading(false)
            
        }
      }
      fetchData()
      
    },[url, refetchIndex])

    return {data, isLoading,  deletePost, addPost}
  }