import "./App.css";
import { useState } from "react";
// import TextFile from Material UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";

console.log(process.env.REACT_APP_GIPHY_API_KEY);
console.log(process.env.REACT_APP_NASA_API_KEY);

function App() {
  const [text, setText] = useState("");  // here we useState to pass a string of text "" from the search textfield
  const [gifs, setGifs] = useState([]);  // here we useState to pass an array [] of data from the Giphy API
  const [planets, setPlanetGifs] = useState([]);  // here we useState to pass an array [] of data from the NASA API

  // "async" means that you can now use the word
  // "await" within this function!
  // The API key is stored in an environment variable in a file called .env
  // see this article for details:
  //  https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
  
  async function search() {
    const key = "YOUR KEY GOES HERE";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${text}&limit=100&offset=0&lang=en`;
    const r = await fetch(url);
    const j = await r.json();
    setGifs(j.data);
    //console.log(j);
  }

  async function nasaSearch() {
    const url = `https://images-api.nasa.gov/search?q=${text}`;
    const r = await fetch(url);
    const j = await r.json();
    //console.log(j);
    setPlanetGifs(j.collection.items);
  }

  return (
    //<div className="App" style={{ background: `url(${planet})` }}>
    <div className="App" >
      <div className="searchbar">
        {/*  "outlined" variant prop gives the nice animation */}
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyPress={(e) => {
            if (e.key === "Enter") nasaSearch();
          }}
        />
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button onClick={nasaSearch}>Search Nasa</Button>
              <Button onClick={search}>Search giphy</Button>
              </ButtonGroup>
              {/*  "outlined" variant prop gives the nice animation
                   <Button variant="outlined" onClick={nasaSearch} size="large">
                    Search
                    </Button> */}
      </div>
<div className="results">
      <div className="planets">
        {planets.map((gif, i) => { // gif is a local variable to iterate over
          if (!gif.links) return <span />;
          return  <img key={i} src={gif.links[0].href} />; 
        })}
      </div>

      <div className="gifs">
          {gifs.map((gif, i) => { // gif is a local variable to iterate over
          console.log(gif)
//          if (!gif.images) return <img src="https://media1.giphy.com/media/l0IylrSp7fPlMR2oM/giphy-downsized.gif?cid=4785b2b3sxnl12vai06dnn91gkguxudcicyvnd4020dy9gpl&rid=giphy-downsized.gif&ct=g" />;
          return  <img key={i} src={gif.images.downsized.url} />;
        })}
      </div>
    </div>
    </div>
  );
}

export default App;