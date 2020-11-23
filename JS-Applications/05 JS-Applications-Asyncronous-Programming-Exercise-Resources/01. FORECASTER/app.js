function attachEvents() {

    let locationInput = document.getElementById('location');

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

                        let forecastsDiv = document.createElement('div');
                        forecastsDiv.className = "forecasts";

                        let conditionIcon = document.createElement('span');
                        conditionIcon.className = "condition symbol";
                        conditionIcon.innerHTML = "&#x2600" // ☀

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
                        lowHigh.textContent = `${data.forecast.low}/${data.forecast.high}`;


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
                    console.log(data);

                    let forecastInfo = document.createElement('div');
                    forecastInfo.className = "forecast-info";

                    let mainUpcoming = document.createElement('span');
                    mainUpcoming.className = "upcoming";

                    data.forecast.map(x => {

                        let condition = document.createElement('span');
                        condition.className = "forecast-data";
                        condition.textContent = x.condition;

                        let degree = document.createElement('span');
                        degree.className = 'forecast-data';
                        degree.textContent = `${x.low}/${x.high}`;

                        mainUpcoming.appendChild(degree);
                        mainUpcoming.appendChild(condition);

                    });

                    forecastInfo.appendChild(mainUpcoming);
                    upcomingConditions.appendChild(forecastInfo);

                })
            })


    }




}

attachEvents();