
console.log("js file loaded");

// getting different tags from the index.hbs file. This is where app.js is loaded in 

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
const weekMessage = document.querySelector('#week-message');
const weekMessage1 = document.querySelector('#week-message1');
const weekMessage2 = document.querySelector('#week-message2');
const weekMessage3 = document.querySelector('#week-message3');
const weekMessage4 = document.querySelector('#week-message4');
const weekMessage5 = document.querySelector('#week-message5');
const weekMessage6 = document.querySelector('#week-message6');


// Date.prototype.getDayOfWeek = function(){   
//     return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ this.getDay() ];
// };

// var d1=new Date();
// var d2=new Date();
// d2.setDate(d1.getDate()+1);
// var d3=new Date();
// d3.setDate(d2.getDate()+1);
// var d4=new Date();
// d4.setDate(d3.getDate()+1);
// var d5=new Date();
// d5.setDate(d4.getDate()+1);
// var d6=new Date();
// d6.setDate(d5.getDate()+1);
// var d7=new Date();
// d7.setDate(d6.getDate()+1);

var my_day=new Date()
console.log(my_day)


var day_name=new Array(14);

day_name[0]='Sunday'
day_name[1]='Monday'
day_name[2]='Tuesday'
day_name[3]='Wednesday'
day_name[4]='Thursday'
day_name[5]='Friday'
day_name[6]='Saturday'
day_name[7]='Sunday'
day_name[8]='Monday'
day_name[9]='Tuesday'
day_name[10]='Wednesday'
day_name[11]='Thursday'
day_name[12]='Friday'
day_name[13]='Saturday'




console.log(day_name[my_day.getDay()],my_day.getDay());
console.log(day_name[my_day.getDay()+1],my_day.getDay()+1);
console.log(day_name[my_day.getDay()+2],my_day.getDay()+2);
console.log(day_name[my_day.getDay()+3],my_day.getDay()+3);
console.log(day_name[my_day.getDay()+4],my_day.getDay()+4);
console.log(day_name[my_day.getDay()+5],my_day.getDay()+5);
console.log(day_name[my_day.getDay()+6],my_day.getDay()+6);



// d5.setDate(d4.getDate()+1);
// d6.setDate(d5.getDate()+1);
// d7.setDate(d6.getDate()+1);

// console.log(d1);
// console.log(d2);
// console.log(d3);
// console.log(d4);
// console.log(d5);
// console.log(d6);
// console.log(d7);




// console.log(d1.getDayOfWeek());
// console.log(d2.getDayOfWeek());
// console.log(d3.getDayOfWeek());
// console.log(d4.getDayOfWeek());
// console.log(d5.getDayOfWeek());
// console.log(d6.getDayOfWeek());
// console.log(d7.getDayOfWeek());



// messageOne.textContent = 'Hello!'; // change the value of <p id="message-one"> from the index.hbs file


weatherForm.addEventListener('submit', (e)=>{

    e.preventDefault() // don't refresh the browser when we click on submit

    const location = search.value;
    

    // weekMessage.setAttribute('style', 'white-space: pre;');

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    weekMessage.textContent = '';
    weekMessage1.textContent = '';
    weekMessage2.textContent = '';
    weekMessage3.textContent = '';
    weekMessage4.textContent = '';
    weekMessage5.textContent = '';
    weekMessage6.textContent = '';

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data)=> {
            if(data.error)
            {
                messageOne.textContent = data.error;
            }
            else
            {

                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                
                // weekMessage.textContent =d2.getDayOfWeek()+ " - " +data.week[0] + " \r\n\n"
                // weekMessage.textContent +=d3.getDayOfWeek()+ " - " +data.week[1] + " \r\n\n"
                // weekMessage.textContent +=d4.getDayOfWeek()+ " - " +data.week[2] + " \r\n\n"
                // weekMessage.textContent +=d5.getDayOfWeek()+ " - " +data.week[3] + " \r\n\n"
                // weekMessage.textContent +=d6.getDayOfWeek()+ " - " +data.week[4] + " \r\n\n"
                // weekMessage.textContent +=d7.getDayOfWeek()+ " - " +data.week[5] + " \r\n"

                weekMessage.textContent = day_name[my_day.getDay()+1]+ " - " +data.week[0];
                weekMessage1.textContent =day_name[my_day.getDay()+2]+ " - " +data.week[1];
                weekMessage2.textContent =day_name[my_day.getDay()+3]+ " - " +data.week[2];
                weekMessage3.textContent =day_name[my_day.getDay()+4]+ " - " +data.week[3];
                weekMessage4.textContent =day_name[my_day.getDay()+5]+ " - " +data.week[4];
                weekMessage5.textContent =day_name[my_day.getDay()+6]+ " - " +data.week[5];
                
               
            }
        })
});

    

});