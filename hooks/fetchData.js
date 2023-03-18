
export default async function fetchData (url, options={}){
  
    const __OPTIONS = {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      mode: 'cors',
      credentials: 'include',
      ...options,
      body: JSON.stringify(options?.body || {}),
    }

    if(__OPTIONS.method === "GET") delete __OPTIONS.body;

    const res = await fetch(`http://localhost:8080${url}`, __OPTIONS);
    const data = (res.ok && res.status === 200) && await res.json();

    return data;

}