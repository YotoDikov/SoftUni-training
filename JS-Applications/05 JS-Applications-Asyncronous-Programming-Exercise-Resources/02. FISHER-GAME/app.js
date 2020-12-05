function attachEvents() {
    console.log('TODO...');

    let baseUrl = 'https://fisher-game.firebaseio.com/catches';

    let catches = document.getElementById('catches');

    const loadBtn = document.getElementsByClassName('load')[0]
        .addEventListener('click', loadCatches);

    const addBtn = document.getElementsByClassName('add')[0]
        .addEventListener("click", addUser);
    

    const catchParameters = [
        "Angler",
        "Weight",
        "Species",
        "Location",
        "Bait",
        "Capture Time"
    ];

        
    function loadCatches() {
        
        fetch(`${baseUrl}.json`)
            .then(res => res.json())
            .then(data => {
         
                createCatchTemplate(data);
            })
    }

    function createCatchTemplate(data) {

        catches.innerHTML = '';

        for (const id in data) {

            let catchDiv = document.createElement('div');
            catchDiv.className = 'catch';
            catchDiv.id = id;

            catchParameters.reduce((acc, curr) => {

                let currKey = curr.toLowerCase();
                let label = createLabelElelement(curr);
                let input = createInputElement(curr);

                if (curr === "Capture Time") {
                    currKey = "captureTime"
                }


                input[0].value = data[id][currKey];
 
                acc.push([label,input]);
                return acc;

            },[]).map(x => {

                let label = x[0];
                let input = x[1][0];
                let hr = x[1][1];

                
                catchDiv.appendChild(label);
                catchDiv.appendChild(input);
                catchDiv.appendChild(hr);
            });
            
            let updateBtn = document.createElement('button')
            updateBtn.textContent = 'Update';
            updateBtn.addEventListener('click', update);

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = ('Delete');
            deleteBtn.addEventListener('click', deleteFnc)
            
            catchDiv.appendChild(updateBtn);
            catchDiv.appendChild(deleteBtn);

            catches.appendChild(catchDiv);
        }
  
    }

    function createLabelElelement(content) {
        let label = document.createElement('label');
        label.textContent = content;

        return label;
    }

    function createInputElement(className) {
        let input = document.createElement('input');
        input.className = className;

        let hrElement = document.createElement('hr');

        return [input, hrElement]
    }

    function update(e) {

        let user = e.target.parentNode.children;
        let userArray = Array.from(user)
            .reduce((acc, curr) => {
                if(curr.tagName === "INPUT") {
                    acc.push(curr);
                }
                return acc
            },[]);
        let userBody = {
            angler: userArray.find(x => x.className === "Angler").value,
            bait: userArray.find(x => x.className === "Bait").value,
            captureTime: userArray.find(x => x.className === "Capture Time").value,
            location: userArray.find(x => x.className === "Location").value,
            species: userArray.find(x => x.className === "Species").value,
            weight: userArray.find(x => x.className === "Weight").value
        }
        let userId = e.target.parentNode.id;

        fetch(`${baseUrl}/${userId}.json`, {method: "PUT", body: JSON.stringify(userBody)})

    }

    function deleteFnc(e) {

        let userId = e.target.parentNode.id;
        fetch(`${baseUrl}/${userId}.json`,{method:"DELETE"})
        
    }

    function addUser() {

        let anglerInput = document.querySelector('#addForm > .angler');
        let weightInput = document.querySelector('#addForm > .weight');
        let speciesInput = document.querySelector('#addForm > .species');
        let locationInput = document.querySelector('#addForm > .location');
        let baitInput = document.querySelector('#addForm > .bait');
        let captureTimeInput = document.querySelector('#addForm > .captureTime');

        let userBody = {
            angler: anglerInput.value,
            bait: weightInput.value,
            captureTime: speciesInput.value,
            location: locationInput.value,
            species: baitInput.value,
            weight: captureTimeInput.value
        }

        
        fetch(`${baseUrl}.json`, {method: 'POST', body: JSON.stringify(userBody)})

    }






}

attachEvents();

