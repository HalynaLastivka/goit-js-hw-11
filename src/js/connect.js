



async function getItem(searchField, page=1) { 
 
    const API_KEY = '38874967-f841ab5810138828c5f6e1fdb';
    const URL = "https://pixabay.com/api/";
    const END_POINT = "&q="+searchField+"&image_type=photo&orientation=horizontal&safesearch=true";
       
    const params = new URLSearchParams({
        key: API_KEY,
        page,
        per_page: 40,

    });   

        const resp = await fetch(`${URL}?${params}${END_POINT}`);

        if (!resp.ok) {
            throw new Error(resp.statusText);
        }

    return resp.json();
}



export {getItem};