import { useEffect, useState } from 'react';

function App() {
  const [activity, setActivity] = useState(parseLocation().a);
  const [deal, setDeal] = useState(parseLocation().d);
  const [search, setSearch] = useState(location.search);

  function parseLocation() {
    const searchParams = new URLSearchParams(location.search);
    return {
      d: searchParams.get('d'),  // deal
      a: searchParams.get('a')   // activity
    }
  }

  function newSearch(k, v) {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(k, v);
    return searchParams.toString();
  }

  function updateActivity(str) {
    setActivity(str);
    history.replaceState({}, '', newSearch('a', str));
  }

  function updateDeal(bool) {
    setDeal(bool);
    history.replaceState({}, '', newSearch('d', bool));
  }

  return (
    <>
      <input type="text" value={activity} onChange={e => updateActivity(e.target.value)} />

      <label>deal:
      <input
        type="checkbox" checked={deal} xxx="hide checkbox; style the label to look like button"
        onChange={e => updateDeal(e.target.checked)}/></label>
    </>
  );
}

export default App;
