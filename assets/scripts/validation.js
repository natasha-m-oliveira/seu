const inputs = document.querySelectorAll("input");
const inputPhone = document.querySelector("#phone");

function inputRequired(input, valid) {
    if (!valid) {
        input.classList.add("invalid");
    } else {
        input.classList.remove("invalid");
    }
}

function createNotification(message, type) {
    const toast = document.querySelector(".toast");
    const notif = document.createElement("div");
    if (type == "error") {
        notif.classList.add("error-msg");
    } else if (type == "success") {
        notif.classList.add("success-msg");
    }
    notif.innerText = message;

    toast.appendChild(notif);

    setTimeout(() => {
        notif.remove();
    }, 3000);
}

function contactValidation() {
    let valid = true;
    let message;
    const firstName = document.querySelector("#first-name");
    const lastName = document.querySelector("#last-name");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const office = document.querySelector("#office");
    const company = document.querySelector("#company");
    const morning = document.querySelector("#morning");
    const afternoon = document.querySelector("#afternoon");
    const night = document.querySelector("#night");
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let phoneSet = phone.value.replace(/[^0-9]/g, "");

    if (firstName.value == "") {
        valid = false;
        inputRequired(firstName, valid);
    }
    if (lastName.value == "") {
        valid = false;
        inputRequired(lastName, valid);
    }
    if (email.value == "") {
        valid = false;
        inputRequired(email, valid);
    } else if (!(emailRegex.test(email.value))) {
        message = "E-mail inválido.";
        valid = false;
        createNotification(message, "error");
        inputRequired(email, valid);
    }
    if (phone.value == "") {
        valid = false;
        inputRequired(phone, valid);
    } else if (phoneSet.length <= 10) {
        message = "Número de telefone válido.";
        valid = false;
        createNotification(message, "error");
        inputRequired(phone, valid);
    }
    if (office.value == "") {
        valid = false;
        inputRequired(office, valid);
    }
    if (company.value == "") {
        valid = false;
        inputRequired(company, valid);
    }
    if (morning.checked == "" && afternoon.checked == "" && night.checked == "") {
        message = "Selecione uma das opções de horário para contato";
        valid = false;
        createNotification(message, "error");
        inputRequired(morning, valid);
        inputRequired(afternoon, valid);
        inputRequired(night, valid);
    }
    if (valid === true) {
        return true;
    }
    return false;

}

if (inputs[0] !== null) {
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            if (input.value == "") {
                inputRequired(input, false);
            } else {
                inputRequired(input, true);
            }
        });
    });
}

if (inputPhone !== null) {
    inputPhone.addEventListener("input", (e) => {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

window.onload = () => {
    if (inputs[0] !== null) {
        inputs.forEach(input => {
            input.classList.remove("invalid");
        });
    }
    const toast = document.querySelector(".toast");
    const notif = toast.querySelector(".server-response");
    if (notif !== null) {
        setTimeout(() => {
            notif.remove();
        }, 3000);
    }
}