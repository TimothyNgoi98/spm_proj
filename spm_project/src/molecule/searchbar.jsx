// Import All React Related files here
import * as React from 'react';

// Import All Router Links here

// Import All Redux ToolKit here

// Import all the molecules files here

// Import ALL material UI things here
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";
// import TextField from "@mui/material/TextField";


function Searchbar({placeholder, onChangeHandler}) {

    // const Search = ({setSearchQuery}) => (
    //     <form>
    //       <TextField
    //         id="search-bar"
    //         label="Enter a Job Role"
    //         variant="outlined"
    //         placeholder="Search..."
    //         size="small"
    //         style={{  width: 400, height: 50, fontSize: 20, paddingLeft: 10, borderRadius: 45}}
    //       />
    //     </form>
    //   );

    return (
        <div>
            <input className="search-bar"   type="search" placeholder={placeholder} onChange={onChangeHandler} />
        </div>

        

        // <div>
        //     {/* <input type="search" style={{  marginTop: 20, width: 400, height: 50, fontSize: 20, paddingLeft: 10, borderRadius: 45}} placeholder={placeholder} onChange={onChangeHandler} /> */}

        //     <Search onChange={onChangeHandler}></Search>
        // </div>
    );
}

export default Searchbar; 