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

// const ourHost = process.env.HOST || 'http://localhost:8080'
const ourHost = 'http://markjoy.herokuapp.com'

function fetchHappen() {
  fetch(`${ourHost}/api/goals/1`)
    .then(response => response.json())
    .then(data => console.log(data))
}

function fetchTime() {
  fetch(`${ourHost}/api/users/30`)
    .then(response => response.json())
    .then(data => console.log(data))
}

document.getElementById('do-count').onclick = fetchTime
