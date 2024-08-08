import { Paper, Box, Typography } from '@mui/material';

type PopupBanquetDetailProps = {
    searchstring? : any,
    list?:any
}

const FetchProducts: React.FC<PopupBanquetDetailProps> = ({ searchstring, list}) => {

const filteredList = list.filter((element:any) => {
    if (searchstring === '') {
        return element;
    }
    else {
        return element.title.toLowerCase().includes(searchstring)
    }
})

  return (
    <Box sx={{overflow: 'auto', maxHeight: '100vh'}}>
      {
        filteredList.map((item:any,index:number) => (
          <Paper 
            key={index}
            sx={{textAlign:'left'}}  
          >
            <Typography><strong>Title:</strong> {item.title}</Typography>
            <Typography><strong>Desc:</strong> {item.description}</Typography>
            <Typography><strong>Price:</strong> {item.price}</Typography>
            <Typography><strong>Rating:</strong> {item.rating}</Typography>
            <Typography><strong>Brand:</strong> {item.brand}</Typography>
          </Paper>
        ))
      }
    </Box>
  )
}

export default FetchProducts;