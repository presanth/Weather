dummy();
function dummy(){
    var a = document.querySelector('.wetherbox')
    a.classList.add("mar");
}


function findWether(){

    let place = nameCity.value
    if(place){
        document.getElementById("error").style.display='none';
        document.getElementById("nodata").style.display='none';
        // fetch data using api
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=5b4bee0ba241d092159faf007e166080`).then(data=>data.json())
        .then(datas=>displayValues(datas))
    }else{
        clouds.innerHTML=''
        city.innerHTML=''
        resultbox.innerHTML=''
        document.getElementById("error").style.display='flex';
        document.getElementById("nodata").style.display='none';
    }



}

function displayValues(values){
    if(values.cod == 200){


        document.getElementById("error").style.display='none';
        var a = document.querySelector('.wetherbox')
        a.classList.add("anim");
        a.classList.remove("mar");
        a.style.marginTop = "1rem";


        temp = Math.round(values.main.temp-273.15);
        pressure = values.main.pressure
        hum = values.main.humidity
        vis = values.visibility
        wind = values.wind.speed
        weather = values.weather[0].main
        img = values.weather[0].icon
        pc = values.name
        
        // create date function

        const date = new Date();
        hr = date.getHours();
        min = date.getMinutes();
        const da =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        day = da[date.getDay()];
        d = date.getDate();
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        mon = months[date.getMonth()];
        yr = date.getFullYear();


        clouds.innerHTML=`<img src="http://openweathermap.org/img/w/${img}.png" alt="">
                        <p>${weather}</p>`

        city.innerHTML=`
                    <div class="degree">
                        <p class="tp">${temp}<sup>o</sup></p>
                    </div>
                    <div class="date">
                        <div class="date1">
                            <p class="cn">${pc}</p>
                            <p class="timeday">${hr}:${min}-${day},${d} ${mon}'${yr}</p>
                        </div>
                    </div>`

        resultbox.innerHTML = `
                
                    <div class="contents">
                        <i class="fa-solid fa-gauge-high"></i>
                        <p class="wethervalue">${pressure}hpa</p>
                        <p class="type">pressure</p>
                    </div>
                    <div class="contents">
                        <i class="fa-solid fa-droplet"></i>
                        <p class="wethervalue">${hum}%</p>
                        <p class="type">humidity</p>
                    </div>
                    <div class="contents">
                        <i class="fa-solid fa-wind"></i>
                        <p class="wethervalue">${wind}KM/H</p>
                        <p class="type">wind</p>
                    </div>
                    <div class="contents">
                        <i class="fa-regular fa-eye"></i>
                        <p class="wethervalue">${vis}KM</p>
                        <p class="type">visibility</p>
                    </div>`
    }else{
        // location.reload();
        clouds.innerHTML=''
        city.innerHTML=''
        resultbox.innerHTML=''
        document.getElementById("nodata").style.display='flex';
    }
}
