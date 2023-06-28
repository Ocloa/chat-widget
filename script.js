const close = document.getElementsByClassName('close')

async function submit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const question = document.getElementById('question').value;

    if (ValidateEmail(email)) {
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

            alert('Вопрос добавлен.');
        } catch (error) {
            console.log(error);
        }
    }
    else alert('Ошибка! Неправильный формат электронной почты.');
};

function ValidateEmail(input) {
    var validRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return validRegex.test(input);
}