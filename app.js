document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e){
    // be more specific and grab the input with type number
    const number = document.querySelector('input[type="number"]').value;

    // Prepare the AJAX or XHR request
    const xhr = new XMLHttpRequest();

    // Instead of hardcoding the amount we want
    // Use template strings to insert the inputted value
    // set to true to ensure it is asynchronous
    xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

    // To do something with the data we use onload
    xhr.onload = function() {
        // check if status is ok
        if(this.status === 200) {
            //convert to JSON object so we can iterate through it
            const response = JSON.parse(this.responseText);
            
            let output = ''
            if (response.type === 'success') {
            // All API's are formatted diffrently, so we cant go straight to response.forEach
            // Since this particular response object has type and value
            // We want to loop through value which contains the array
            response.value.forEach(function(item){
                // When lookin in the console each item has an id and a joke
                output += `<li>${item.joke}</li>`;
            });
        } else {
            output += '<li>Something went wrong </li>';
        }
        // No insert this created UI of jokes inside the ordered list element
        document.querySelector('.jokes').innerHTML = output
        }
    }

    xhr.send();

    e.preventDefault();
}