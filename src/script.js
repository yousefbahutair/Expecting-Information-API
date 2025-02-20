const checkStatusAndParse = (res) => {
    if(!res.ok){
        throw new Error(`Status Code Error:${res.status}`)
    }
        return res.json();;
};
fetch('https://swapi.co/api/planets') 
 .then(checkStatusAndParse)
 .then( (data) => {
    console.log("FETCHED ALL PLANETS");
    for(let planet of data.results) {
        console.log( planet.name)
    }
    const nextURL = data.next;
    return fetch(nextURL)
 })
 .then(checkStatusAndParse)
 .then((data) => {
    console.log('FETCHED NEXT 11 PLANETS');
    for(let planet of data.results) {
        console.log(planet.name);
    }
 })
 .catch((err) => {
  console.log('SOMETHING WENT WRONG WITH FETCH!');
  console.log(err.status)
  console.log(err);
 })