import { useEffect, useState } from 'react';

function App() {
  const [deal, setDeal] = useState(parseLocation().d);
  const [search, setSearch] = useState(location.search);

  function parseLocation() {
    const searchParams = new URLSearchParams(location.search);
    return {
      d: searchParams.get('d'),  // deal
      a: searchParams.get('a')   // activity
    }
  }
  const [activity, setActivity] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(window.location);
    return searchParams.get('a');
  });

  function newSearch(k, v) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(k, v);
    return searchParams.toString();
  }

  function updateActivity(str) {
    setActivity(str);
    const ns = `?${newSearch('a', str)}`;
    history.replaceState({}, '', ns);
  }

  function updateDeal(bool) {
    setDeal(bool);
    const ns = `?${newSearch('d', bool)}`;
    history.replaceState({}, '', ns);
  }

  return (
    <>
      <input type="text" value={activity} onChange={e => updateActivity(e.target.value)} />

      <label>DEAL:
      <input
        type="checkbox" checked={deal} xxx="hide checkbox; style the label to look like button"
        onChange={e => updateDeal(e.target.checked)}/></label>
    </>
  );
}

export default App;
