window.addEventListener("DOMContentLoaded", sendingForm);
function sendingForm() {
    const form = document.querySelector(".contact__form");
    //отримуємо кнопку для форми(кнопка поза тегом form)
    const formButton = document.querySelector(".form__button");
    //додаємо подію "відправку"
    formButton.addEventListener("click", formSend);

    form.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            formSend(e); 
        }
    });
    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        //отримуємо дані з форми
        let formData = new FormData(form);
        if (error === 0) {
            form.classList.add('__sending');
            //sendmail.php файл обробки даних
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                form.classList.remove('__sending');
                showMessage("Application submitted.");
                form.reset();
            } else {
                form.classList.remove('__sending');
                showMessage("Something went wrong.");
            }
        }
    }

    function formValidate(form) {
        let error = 0;
        let required = document.querySelectorAll(".__required");

        for (let index = 0; index < required.length; index++) {
            const input = required[index];
            //перевірка на пусте поле
            if (!formRequired(input)) {
                error++;
                formAddError(input, "*This field is required.");
                continue;
            }
            //перевірка номера телефону
            if (input.name === "phone" && !validatePhone(input)) {
                error++;
                formAddError(input, "*Invalid phone number.");
                continue;
            }
            //перевірка чи це email
            if (input.name === "email" && !validateEmail(input)) {
                error++;
                formAddError(input, "*Invalid email, for example: example@mail.com.");
                continue;
            }
            
            formRemoveError(input);
        }
        return error;
    }

}

function showMessage(message){
    let formMessage=document.querySelector('.form__message');
    formMessage.classList.add('__show-message');
    formMessage.innerHTML= message;
    setTimeout(()=>{
        formMessage.classList.remove('__show-message')
    },5000);
}
//додання помилки і повідомлення
function formAddError(input, errorText) {
    input.classList.add("__error");
    const errorMessageElement = input.nextElementSibling;
    errorMessageElement.textContent = errorText;
    errorMessageElement.style.visibility="unset";
}
//очищення помилки і повідомлення
function formRemoveError(input) {
    input.classList.remove("__error");
    const errorMessageElement = input.nextElementSibling;
    errorMessageElement.style.visibility="hidden";
}
//перевірка на пусте поле 
function formRequired(input) {
    return input.value.trim() !== "";
}
//regex перевірка email
function validateEmail(input) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value);
}
//regex перевірка phone
function validatePhone(input) {
    return /^\+?\d{1,4}?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(input.value);

}

