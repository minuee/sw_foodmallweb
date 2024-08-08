import { useState, useEffect } from 'react';
import {Typography, Box, TextField, Autocomplete} from '@mui/material'
import FilterPrducts from './filterProducts';
import { fetchdata } from './fetchdata';

export default function Search() {
    const [input, setInput] = useState('')
    const [list, setList]= useState([]);

    useEffect(()=>{
        fetchdata()
        .then(res=>setList(res))
    },[])

    const handleInput = (e:any)=>{
        setInput(e.target.value.toLowerCase())
    }


    return (
        <Box  sx={{width:"100%",height:"100%",padding:'20px',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>    
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={list.map((item:any)=>item.title)}
                renderInput={
                    (params) => 
                        <TextField {...params} 
                            label="Search title"
                            onSelect={handleInput}
                            sx={{width: "100%",margin:'10px auto'}}  
                        />
                }
            />
            <FilterPrducts searchstring={input} list={list}/>
        </Box>
    );
}