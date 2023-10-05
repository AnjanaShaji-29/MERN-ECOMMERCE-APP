import './productList.css';
import { DeleteOutline } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { productRows } from '../../dummyData';
import {Link} from 'react-router-dom';
import { useState } from 'react';

export default function ProductList() {

    const [data, setData] = useState(productRows);
    const handleDelete = (id) => { 
        setData(data.filter((item) => item.id !== id)); // Removing the product data by passing id to the filter method & setting the updated product
      };

      
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'product', headerName: 'Product', width: 200, 
     renderCell: (params) => {
      return (
        <div className="productListItem">
          <img className="productListImg" src={params.row.avatar} alt="" />
          {params.row.name}
        </div>
      );
    }
  },
    { field: 'stock', headerName: 'Stock', width: 130 },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 90,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell:(params) => {
        return(
        <>
        <Link to={"/product/"+params.row.id}> 
        <button className='productListEdit'> Edit </button>
        </Link>
           <DeleteOutline className='productListDelete' onClick={ () => handleDelete(params.row.id)} />
        </>
        );
        
      }
    }
  ];
  

  return (
    <div className='productList'>
        <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
    </div>
  )
}
