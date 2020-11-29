function attachEvents() {
    console.log('TODO...');

    let baseUrl = 'https://fisher-game.firebaseio.com/catches';

    let catches = document.getElementById('catches');

    const catchParameters = [
        "Angler",
        "Weight",
        "Species",
        "Location",
        "Bait",
        "Capture Time"
    ];

    const loadBtn = document.getElementsByClassName('load')[0]
        .addEventListener('click', loadCatches);

        
    function loadCatches() {
        
        fetch(`${baseUrl}.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                createCatchTemplate(data);
            })
    }

    function createCatchTemplate(data) {

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
            
            let updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update';
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = ('Delete');
            
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






}

attachEvents();

