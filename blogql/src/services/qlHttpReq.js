export const httpReq = (query) => {
    var headers = { 'Content-Type': 'application/json'};
    if(window.localStorage.getItem('token')) {
        headers["Authorization"] = `Bearer ${window.localStorage.getItem('token')}`;
    }
    return fetch('http://127.0.0.1:4040/graphql',{
         method: 'POST',
         headers: headers,
         body: JSON.stringify(query)
     })
 }

export const httpGetPhoto = (id) => {
    var headers = {}
    return fetch(`http://127.0.0.1:4040/image/${id}`,{
        method: 'GET',
        headers: headers
    })
}
 export const httpUpload = (formDataFile) => {
    var headers = {};
    return fetch('http://127.0.0.1:4040/upload',{
         method: 'POST',
         headers: headers,
         body: formDataFile
     })
 }