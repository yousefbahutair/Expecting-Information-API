const checkStatusAndParse = (res) => {
    if (!res.ok) {
        throw new Error(`Status Code Error: ${res.status}`);
    }
    return res.json();
};

function nextURL(data) {
    return data.next;
}

function fetchNextPlanet(url) {
    if (!url) {
        console.log("NO MORE PAGES!!");
        return Promise.reject("No more pages");
    }
    return fetch(url);
}

function fetchMorePlanets(data) {
    for (let planet of data.results) {
        console.log("Planet Name: ", planet.name);
    }
    return data;
}
fetchNextPlanet("https://swapi.dev/api/planets/")
    .then(checkStatusAndParse) 
    .then(fetchMorePlanets)
    .then(nextURL)
    .then(fetchNextPlanet)
    .then(checkStatusAndParse)
    .then(fetchMorePlanets)
    .catch((err) => {
        console.log("An error occur", err);
    });
