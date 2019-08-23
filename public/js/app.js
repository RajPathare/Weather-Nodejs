
console.log("js file loaded");

// getting different tags from the index.hbs file. This is where app.js is loaded in 

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');


// messageOne.textContent = 'Hello!'; // change the value of <p id="message-one"> from the index.hbs file


weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault() // dont refresh the browser when we click on submit

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data)=> {
            if(data.error)
            {
                messageOne.textContent = data.error;
            }
            else
            {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
});

    

});