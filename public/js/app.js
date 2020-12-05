console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    document.querySelector('#message-1').textContent = 'loading...';
    document.querySelector('#message-2').textContent = '';


    fetch('http://localhost:3000/weather?address=' + document.querySelector('input').value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.querySelector('#message-1').textContent = data.error;
            } else {
                document.querySelector('#message-1').textContent = data.location;
                document.querySelector('#message-2').textContent = data.forecast;
            }
        })
    })
})