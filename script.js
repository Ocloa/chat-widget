const close = document.getElementsByClassName('close')

async function submit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const question = document.getElementById('question').value;

    try {
        const response = await fetch("http://localhost:5505/submit", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers:  {
            'Content-Type':'application/json'
            },
            body: JSON.stringify({
                user_name: name,
                user_email: email,
                user_question: question
            })
        });

        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.log(error);
    }
};