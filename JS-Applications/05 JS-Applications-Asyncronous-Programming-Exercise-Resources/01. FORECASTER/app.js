function attachEvents() {

    let locationInput = document.getElementById('location');

    const conditionIcons = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176' // °
    }

    document.getElementById('submit')
        .addEventListener('click', loadLocationInfo);

    function loadLocationInfo() {
        
        fetch('https://judgetests.firebaseio.com/locations.json')
            .then(res => res.json())
            .then(data => {

                document.getElementById('forecast')
                    .style.display = 'block';

                let currentConditions = document.getElementById('current');
                let upcomingConditions = document.getElementById('upcoming');

                let locationId = data.find(city => city.name === locationInput.value);

                fetch(`https://judgetests.firebaseio.com/forecast/today/${locationId.code}.json`)
                    .then(res => res.json())
                    .then(data => {

                        console.log(data);

                        let forecastsDiv = document.createElement('div');
                        forecastsDiv.className = "forecasts";

                        let conditionIcon = document.createElement('span');
                        conditionIcon.className = "condition symbol";
                        conditionIcon.innerHTML = conditionIcons[data.forecast.condition];

                        let mainCondition = document.createElement('span');
                        mainCondition.className = "conditon";

                        let locationName = document.createElement('span');
                        locationName.className = 'forecast-data';
                        locationName.textContent = data.name;

                        let conditionStatus = document.createElement('span');
                        conditionStatus.className = 'forecast-data';
                        conditionStatus.textContent = data.forecast.condition

                        let lowHigh = document.createElement('span');
                        lowHigh.className = 'forecast-data';
                        lowHigh.innerHTML = `${data.forecast.low}${conditionIcons['Degrees']}/${data.forecast.high}${conditionIcons['Degrees']}`;


                        mainCondition.appendChild(locationName);
                        mainCondition.appendChild(conditionStatus);
                        mainCondition.appendChild(lowHigh);

                        forecastsDiv.appendChild(conditionIcon);
                        forecastsDiv.appendChild(mainCondition);


                        currentConditions.appendChild(forecastsDiv);

                    });
                
                fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${locationId.code}.json`)
                .then(res => res.json())
                .then(data => {
                    

                    let forecastInfo = document.createElement('div');
                    forecastInfo.className = "forecast-info";

                    
                    data.forecast.map(x => {

                        let mainUpcoming = document.createElement('span');
                        mainUpcoming.className = "upcoming";

                        let symbolEl = document.createElement('span');
                        symbolEl.className = 'symbol';
                        symbolEl.innerHTML = conditionIcons[x.condition];
           
                        let condition = document.createElement('span');
                        condition.className = "forecast-data";
                        condition.textContent = x.condition;
                        
                        let degree = document.createElement('span');
                        degree.className = 'forecast-data';
                        degree.innerHTML = `${x.low}${conditionIcons['Degrees']}/${x.high}${conditionIcons['Degrees']}`;
                        
       

                        mainUpcoming.appendChild(symbolEl);
                        mainUpcoming.appendChild(condition);
                        mainUpcoming.appendChild(degree);

                        forecastInfo.appendChild(mainUpcoming);
                    });

                    upcomingConditions.appendChild(forecastInfo);

                })
            })


    }




}

attachEvents();