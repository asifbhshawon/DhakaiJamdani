import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import ProductTable from "../Components/ProductTable/ProductTable";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  console.log();
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#cfe8fc", height: "auto", borderRadius: "5px" }}>
          <div className="p-10">
            <div className="flex justify-between mb-6">
              <Typography fontWeight="600" variant="h4">
                Products
              </Typography>
              <Button variant="contained" component={Link} to="/">
                <Add />
                Add
              </Button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <TextField
                id="search"
                type="search"
                label="Search"
                value={searchText}
                onChange={(e)=>setSearchText(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mt-4">
              <Box
                sx={{ bgcolor: "#8ebade", height: "12vh", borderRadius: "5px" }}
              >
                <div className="flex items-center justify-center pt-3 mt-5 gap-10">
                  <Typography>Filters</Typography>
                  <FormControl sx={{width:"110px"}}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={""}
                      label="Age"
                      onChange={() => {}}
                    >
                      <MenuItem value={10}>Sharee</MenuItem>
                      <MenuItem value={20}>Panjabi</MenuItem>
                      <MenuItem value={30}>Three pcs</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Box>
            </div>
            <div className="mt-5">
              <ProductTable search={searchText}/>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Products;
