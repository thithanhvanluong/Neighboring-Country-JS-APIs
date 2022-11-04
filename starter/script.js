'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1
}
///////////////////////////////////////
/*const getCountryData = function(country){
    const request = new XMLHttpRequest();//old way
    request.open("GET", `https://restcountries.com/v2/name/${country}`);
    request.send();//send request to this API

    request.addEventListener("load", function(){
    
        const [data] = JSON.parse(this.responseText);
        console.log(data)
    
        const html = `
      <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
      </article>
      `;
    
      countriesContainer.insertAdjacentHTML("beforeend", html);
      countriesContainer.style.opacity = 1
    });
    
}

getCountryData("portugal");
getCountryData("USA");
getCountryData("Germany")*/

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1

}
/*const getCountryAndNeighbor = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();//old way
  request.open("GET", `https://restcountries.com/v2/name/${country}`);
  request.send();//send request to this API

  request.addEventListener("load", function () {

    const [data] = JSON.parse(this.responseText);
    console.log(data)
    //render country
    renderCountry(data)

    //get neighbour country: use optional chaining?.-->if country has no border property
    const neighbor = data.borders?.[0]
    if (!neighbor) return;

    //AJAX call country 2
    const request2 = new XMLHttpRequest();//old way
    request2.open("GET", `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();//send request to this API

    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2)

      renderCountry(data2, 'neighbour')
    })

  });

}
getCountryAndNeighbor("usa")

//callback hell(should not use)
setTimeout(function () {
  console.log("1 second passed");
  setTimeout(function () {
    console.log("2 second passed");
    setTimeout(function () {
      console.log("3 second passed");

    }, 1000)
  }, 1000)
}, 1000)*/

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then(function (response) {
    //console.log(response)
    if (!response.ok) {
      throw new Error(`${errorMsg}(${response.status})`);//status 404
    }
    return response.json()//return a promise--> call then() again
  })
}

const getCountryData = function (country) {

  getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
    //country 1
    .then(function (data) {
      console.log(data)
      renderCountry(data[0])

      const neighbor = data[0].borders?.[0]
      //const neighbor = "dgsfgsdfgfdgsd";
      if (!neighbor) throw new Error("No neighbour found!!")

      //country 2
      return getJSON(`https://restcountries.com/v2/alpha/${neighbor}`, "Country not found")
    })
    .then(function (data) {
      renderCountry(data, "neighbour")
    })
    .catch(function (err) {
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(function () {
      //always happen no matter the result
      countriesContainer.style.opacity = 1
    })
}



btn.addEventListener("click", function () {
  getCountryData("Vietnam")

})


