const urlg = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/IemWo1301q86738Ytc1D/scores/";

// Post method
const sendData = async (data) => {
    let options = {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(urlg, options);
    let responseData = await response.json();
    return responseData;
};

// Get method
const getData = async () => {
    let response = await fetch(urlg);
    let responseData = await response.json();
    return responseData.result;
}

const scorecard = document.querySelector('.leaderboard');

// Rendering data to DOM
const render = async () => {
    scorecard.innerHTML = '';
    const data = await getData();
    scorecard.innerHTML = `<tr>
        <td class="head">Name</td>
        <td class="head">Salary</td> <!-- Changed from 'Score' to 'Salary' -->
    </tr>`;
    
    const list = data.map((item) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.innerHTML = item.user;
        td2.innerHTML = item.score; // Change this line to use item.salary if it's stored as 'salary' in your API response
        td1.setAttribute('class', 'name');
        td2.setAttribute('class', 'score');
        tr.appendChild(td1);
        tr.appendChild(td2);
        scorecard.appendChild(tr);
    });
}

// Adding event listener
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to the buttons
    document.querySelector('#refresh').addEventListener('click', async () => { render(); });

    document.getElementById('input-data').addEventListener('submit', async (event) => {
        event.preventDefault();
        let nameValue = document.querySelector('#name').value;
        let salaryValue = document.querySelector('#Salary').value; // Changed from 'score' to 'Salary'
        console.log(nameValue + " is being added with salary " + salaryValue); // Changed from 'score' to 'Salary'
        let data = {
            user: nameValue,
            score: salaryValue // Changed from 'score' to 'salary'
        };
        let response = await sendData(data);
        console.log(response);
        render();
    });

    render();
});
