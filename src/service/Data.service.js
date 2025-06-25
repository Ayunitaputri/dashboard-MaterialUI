import axios from "axios";

//ngambil data
export const getAllData = (callback) => {
    axios.get('http://localhost:5000/api/v1/post/')
    .then(res => {
        // console.log("API Response:", res.data); // Cek respons API
        callback(res.data)
    }).catch(err => {
        console.error("Error fetching data:", err); 
        callback([]);
    })
}


export const deleteData = (id) => {
    axios.delete(`http://localhost:5000/api/v1/post/${id}`)
    .then(res => {
        console.log( 'data berhasil dihapus');
    }).catch(err => {
        console.log(err, 'error deleting data')
    })
}

export const createData = (req) => {
    axios.post(`http://localhost:5000/api/v1/post${req}`).then(res => {
        res.status("OK");
    }).catch(err => {
        res.status("ERROR", err);
    })
}

//Memanggil getAllData dengan callback
// getAllData((data) => {
   
// });

//http://localhost:5000/api/v1/post/

