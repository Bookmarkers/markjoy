// import axios from 'axios'

// let a = 0;
// function count() {
//     a++;
//     document.getElementById('demo').textContent = a;
// }

// async function backendCall( ) {
//     let res;
//     res = await axios.get('/api/bookmarks/1')
//     if (res) {
//         console.log('this is your result', res)
//         document.getElementById('demo').textContent = res.data.title
//     } else {
//         console.log('you dont have a result')
//     }
// }

// MAKING FETCH HAPPEN

let goalGoal = {}

function fetchHappen() {
  fetch('http://localhost:8080/api/goals/1')
    .then(response => response.json())
    .then(data => console.log(data))
}

function fetchTime() {
  fetch('http://localhost:8080/api/users/30')
    .then(response => response.json())
    .then(data => console.log(data))
}

document.getElementById('do-count').onclick = fetchTime
