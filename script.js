submit.onclick = async function() {
    const name = document.getElementById('Name');
    const email = document.getElementById('Email');
    const question = document.getElementById('Question');

    await fetch("/submit", {
        method: 'POST',
        headers:  {
        'Content-Type':'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            user_Name: name,
            user_Email: email,
            user_Question: question,
        })
    });
};