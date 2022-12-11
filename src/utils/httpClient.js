const API = "https://api.themoviedb.org/3";

export function get(path) {
  return fetch(API + path, {  /*el fetch tmb llamado promise, estas autorizacion es del servidor q nos trea la api,*/ 
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzUzN2ZmMTlmMzgxZGQ3YjY3ZWVlMWVhOGI4MTY0YSIsInN1YiI6IjVlM2ExNmU1MGMyNzEwMDAxODc1NTI4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOpZ_nBtA93tbzr6-rxD0760tssAAaSppyjRv9anArs",
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((result) => result.json());//el result obtiene la promesa y lo parseamos a un json , y esta me va a dar otro promise 
  //q lo obtendre con data
}
