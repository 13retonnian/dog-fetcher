const fetchDog = function() {
  fetch('https://random.dog/woof.json')
    .then(function(response){
      // JSON that is returned from the server must be converted to a JS object asynchronously.
      if (!response.ok) {
        throw new Error('Not 200 OK');
      }
      return response.json();
    })
    .then(function(data){
      // Any code that depends on the `data` must go in this block    
      console.log(data);
      const div = document.querySelector("div");
      div.innerHTML = `<img src="${data.url}" alt="Ruh roh! Dog won't fetch, please try again"></img>`;
    })
    .catch(function(err){
      // An error or `reject` from any of the above `.then()` blocks will end up here.
      console.log(err);
    });
}
  const button = document.querySelector("button");
  button.addEventListener("click", fetchDog)