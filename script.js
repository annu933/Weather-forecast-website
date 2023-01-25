const api_key=`e112148759844532deccd63cb75aba20`
const form= document.querySelector('form')
const search= document.querySelector('#search')
const cards= document.querySelector('#cards')


const timeEL = document.getElementById('time')
const ampm =document.getElementById('am_pm')
const dateEL =document.getElementById('date')
const currentWeather = document.getElementById('nav')
const timezone = document.getElementById('timeZone');
const countryEl = document.getElementById('country');
const currentTempEl = document.getElementById('currentTemp')
const weather =document.getElementById('weather')
const text = document.getElementById('try')
const w_img=document.getElementById('w-img')
const searchbar =document.getElementById('searchbar')
const cityName = document.getElementById('cityName')
const humidity = document.getElementById('humidity')
const body = document.querySelector('body')
const condition=document.getElementById('condition')
const imgCondition=document.getElementById('imgCondition')
const loadingDiv=document.getElementById('loadingDiv')
const tempData=document.getElementById('tempData')




const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const apiKey = 'e112148759844532deccd63cb75aba20'
setInterval(()=>{
	const Time = new Date();
	const hour = Time.getHours();
	let minute = Time.getMinutes();
	const day = Time.getDay();
	const month = Time.getMonth()
	const date =Time.getDate()
	let hourin12HrFormate = hour>=13?hour%12:"0"+hour;
	const ampm = hour>=12?'PM':'AM'

    console.log(hourin12HrFormate.length)


    if (hourin12HrFormate.length<2){
        hourin12HrFormate="0"+hourin12HrFormate
    }
    else(hourin12HrFormate=+hourin12HrFormate)
    if (minute<10){
        minute="0"+minute

    }



	timeEL.innerHTML = hourin12HrFormate + ':' + minute + ' ' +`<span id="am_pm">${ampm}</span>`
	dateEL.innerHTML = days[day] + ',' + date + ' ' + months[month]
    
    // console.log(hourin12HrFormate+" "+minute)
	

},1000)





const getweather = async (city)=>{
    // weather.innerHTML=`<h2>loading....</h2>`
    
    
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
    const response = await fetch(url);
    // console.log(response)
    const data = await response.json()
    console.log(data)
    return showWeather(data)
}

const showWeather=(data)=>{
    // console.log(data.name)
    if (data.cod == "404"){
        weather.innerHTML=`<h1>city not found</h1>`
    }
    cityName.innerHTML = data.name
    temp.innerHTML = data.main.temp
    condition.innerHTML=data.weather[0].main
    humidity.innerHTML =data.main.humidity +" %"
    pressure.innerHTML = data.main.pressure + " hpa"
    windSpeed.innerHTML = data.wind.speed +" mph"
    imgCondition.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="" width="200px" height="200px">`



var dict = {
    Clear: "image/clear.png",
    Haze : "image/haze.png",
    Sky: "image/sky.png",
    Rain : "image/rainy.png",
    Smoke : "image/smoky.png",
    Clouds : "image/cloudy.png",
    Mist : "image/mist.png",
    Fog : "image/fog.png"
    
  };
let objLenght = Object.keys(dict).length

for(i=0; i<=objLenght; i++){
    if((data.weather[0].main)==(Object.keys(dict)[i])){
        console.log(Object.keys(dict)[i])
        // console.log(Object.values(dict)[i])

        let ur = Object.values(dict)[i]
        // console.log(ur)
        // ur.style.width="200px"
        return displayImage(ur)

        var Pic = ""  
        function displayImage(ur) {
            // for(i=0; i<=arrayOfImages.length; i++){
                // tempData.style.backgroundImage=`url(${ur})`
                tempData.style.backgroundImage=`url(${ur})`
                // tempData.style.backgroundRepeat="no-repeat"
                // tempData.style.backgroundSize="50%"
                
                

            }

        }     
}



    
}


    



// }



form.addEventListener('submit',
function(e){
    getweather(search.value)
    getForcast(search.value)
    e.preventDefault();

}
)



let city="raipur"

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];





const getForcast = async(city)=>{
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b6d60a3160fe59cbf68b56a37a337c9f&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    // console.log(data)

    return showForcast(data)
}




function showForcast(data){
   
    let otherDayForcast = ''
    for (let i = 0; i < (data.list.length); i+=8) {
        
        
            let dt_txt = data.list[i].dt_txt;                               //for day
            let year  = dt_txt[0] + dt_txt[1]+dt_txt[2]+dt_txt[3];       
            let month = dt_txt[5]+dt_txt[6];
            let date = dt_txt[8]+dt_txt[9];
        
            const abcd = new Date(`${dt_txt.substring(0,9+1)}`);
            let abcd_day = abcd.getDay();
            // console.log(days[abcd_day])         
            
            let tepr = data.list[i].main.temp     //for temprature
            let ico =data.list[i].weather[0].icon // for icon
            let main =data.list[i].weather[0].description  //for main

            data.list.forEach((day, i) => {
                // console.log(day)
                // console.log(data.list[1])
                if (i/8==0){
                    otherDayForcast += 
                `<div class="weatherItem">
                <div>${days[abcd_day]}</div>
                <div><img src="http://openweathermap.org/img/w/${ico}.png" alt="">
                </div>
                <div>${main}</div>
                <div>${tepr}°c</div>
                </div>`
                }else{
                    otherDayForcast += 
                    ""
                }
            })
        

    }
    cards.innerHTML = otherDayForcast;   
    // (data.list.length[i])  
 
}








