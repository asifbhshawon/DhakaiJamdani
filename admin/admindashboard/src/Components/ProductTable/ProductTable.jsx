import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useProductContext } from '../../Context/ProductContext';
import { Link } from 'react-router-dom';

export default function ProductTable(profs) {
    const {allProducts} = useProductContext();
    const [filterProducts, setFilterProducts] = useState(allProducts);
    const {search} = profs;

    useEffect(()=>{
      setFilterProducts(allProducts.filter(product=>product.title.toLowerCase().includes(search.toLowerCase())));
    }, [allProducts, search]);
  // console.log(search)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">In Stock</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Price(&#2547;)</TableCell>
            <TableCell align='center'>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {filterProducts.map((product) =>(
                <TableRow key={product._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope='row'>{product.title}</TableCell>
              <TableCell align="right">{product.category}</TableCell>
              <TableCell align="right">{String(product.inStock)}</TableCell>
              <TableCell align="right">{product.rating}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align='center'><Link to={`/product/${product._id}`}><Button variant="contained">Show</Button></Link></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}