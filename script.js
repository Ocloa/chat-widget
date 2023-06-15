const close = document.getElementsByClassName('close')

submit.onclick = async function() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const question = document.getElementById('question');
    console.log(name)

    let response = await fetch("/submit", {
        method: 'POST',
        headers:  {
        'Content-Type':'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            user_name: name,
            user_email: email,
            user_question: question,
        })
    });
    console.log(response);
};