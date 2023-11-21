import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient("", "");

function parseLocation() {
  const str = location.search;
  return {
    cb: str === "?agree"
  }
}

function updateLocation(value) {
  // switch value
  location.search = "agree";
}

function App() {
  // const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   getCountries();
  // }, []);

  // async function getCountries() {
  //   const { data } = await supabase.from("countries").select();
  //   setCountries(data);
  // }

  const cb = parseLocation().cb

// {countries.map((country) => (
//   <li key={country.name}>{country.name}</li>
// ))}
  return (
    <>
      <ul>
        <li><input type="text"/></li>
        <li><input type="checkbox" checked="y" onClick={(e) => console.log(e.target.checked)}/></li>
        <li><input type="checkbox" checked="y" onChange={(e) => updateLocation(e.target.value)}/></li>
        <li><input type="checkbox" checked={cb} onChange={updateLocation}/></li>
      </ul>
    </>
  );
}

export default App;
