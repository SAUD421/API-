const apiUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/IemWo1301q86738Ytc1D/scores/";
const scorecard = document.querySelector('.leaderboard');

// Post method
const sendData = async (data) => {
    try {
        let options = {
            method: "POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(data)
        }

        let response = await fetch(apiUrl, options);
        let responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};

// Get method
const getData = async () => {
    try {
        let response = await fetch(apiUrl);
        let responseData = await response.json();
        return responseData.result;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Rendering data to DOM
const render = async () => {
    try {
        scorecard.innerHTML = '';
        const data = await getData();
        scorecard.innerHTML = `<thead>
            <tr>
                <th>Name</th>
                <th>Salary</th>
            </tr>
        </thead>`;

        const list = data.map((item) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            td1.innerHTML = item.user;
            td2.innerHTML = item.score;
            td1.setAttribute('class', 'name');
            td2.setAttribute('class', 'score');
            tr.appendChild(td1);
            tr.appendChild(td2);
            scorecard.appendChild(tr);
        });
    } catch (error) {
        console.error('Error rendering data:', error);
        throw error;
    }
};

// Adding event listener
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#refresh').addEventListener('click', async () => { render(); });

    document.getElementById('input-data').addEventListener('submit', async (event) => {
        event.preventDefault();
        let nameValue = document.querySelector('#name').value;
        let salaryValue = document.querySelector('#Salary').value;
        console.log(nameValue + " is being added with salary " + salaryValue);
        let data = {
            user: nameValue,
            score: salaryValue
        };
        try {
            let response = await sendData(data);
            console.log(response);
            render();
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        // Clear input fields
        document.querySelector('#name').value = '';
        document.querySelector('#Salary').value = '';
    });

    render();
});
