function createUser() {
    if (checkNonEmptyData() && checkInputNumber() && checkInputBirth() && checkInputVk()) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "api/create/new/user");
        xhr.setRequestHeader("Content-type", "application/json");
        var user_name = document.getElementById("input_name").value;
        var user_numberPhone = document.getElementById("input_numberPhone").value;
        var user_birthday = document.getElementById("input_birthday").value;
        var user_vk = document.getElementById("input_vk").value;
        var user_about = document.getElementById("input_about").value;
        var user_hobby = document.getElementById("input_hobby").value;
        var params = {
            "name" : user_name,
            "numberPhone" : user_numberPhone,
            "birthday" : user_birthday,
            "vk" : user_vk,
            "about" : user_about,
            "hobby" : user_hobby
        };
        xhr.send(JSON.stringify(params));
    } else {
        if (!checkNonEmptyData()) {
            alert("Не все поля заполнены.")
        }
        if (!checkInputNumber()) {
            alert("Номер телефона не должен содержать букв.")
        }
        if (!checkInputBirth()) {
            alert("Неккоректная дата рождения.")
        }
        if (!checkInputVk()) {
            alert("Ссылка должна быть следующего вида: https://vk.com/user_id")
        }
    }
}

function getUser(switching) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "api/select/user/by/id");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.responseType = "text";

        if (switching == 1) {
            var user_id = document.getElementById("input_user_id").textContent;
            user_id++;
            var params = {"id": user_id};
            xhr.send(JSON.stringify(params));
            document.getElementById("input_user_id").textContent = user_id;
        } else if (switching == 2) {
            var user_id = document.getElementById("input_user_id").textContent;
            user_id--;
            var params = {"id": user_id};
            xhr.send(JSON.stringify(params));
            document.getElementById("input_user_id").textContent = user_id;
        }
        xhr.onload = (e) => {
            var userData = JSON.parse(e.target.response),
                userDataId = userData.id,
                userDataName = userData.name,
                userDataNumber = userData.numberPhone,
                userDataBirth = userData.birthday,
                userDataVk = userData.vk,
                userDataAbout = userData.about,
                userDataHobby = userData.hobby;
                if (userDataId == null){
                    alert('Конец списка пользователей.');
                    if (user_id > 0){
                        user_id--;
                    } else {
                        user_id++;
                    }
                    document.getElementById("input_user_id").textContent = user_id;
                } else {
                    document.getElementById("user_id").textContent = userDataId;
                    document.getElementById("user_name").textContent = userDataName;
                    document.getElementById("user_numberPhone").textContent = userDataNumber;
                    document.getElementById("user_birthday").textContent = userDataBirth;
                    document.getElementById("user_vk").href = userDataVk;
                    document.getElementById("user_vk").textContent = userDataVk;
                    document.getElementById("user_about").textContent = userDataAbout;
                    document.getElementById("user_hobby").textContent = userDataHobby;
            }
        };
}

function checkInputNumber() {
    var numberRegex = new RegExp("^[-+()0-9]*[^A-Za-zА-ЯА-я]$");
    var user_number = document.getElementById("input_numberPhone").value;
    if (numberRegex.test(user_number)) {
        return true;
    }
}

function checkInputBirth() {
    var input_birth = document.getElementById("input_birthday").value.split('-');
    var input_date = new Date(input_birth[0], input_birth[1] - 1, input_birth[2]);
    var current_date = new Date();
    var min_date = new Date();
    min_date.setFullYear(min_date.getFullYear() - 150);
    if (input_date < current_date && input_date > min_date) {
        return true;
    }
}

function checkInputVk() {
    var vkRegex = new RegExp("^https:\/\/vk\.com\/.*");
    var user_vk = document.getElementById("input_vk").value;
    if (vkRegex.test(user_vk)) {
        return true;
    }
}

function checkNonEmptyData() {
    if (document.getElementById("input_name").value.trim() != "" ||
        document.getElementById("input_about").value.trim() != "" ||
        document.getElementById("input_hobby").value.trim() != "") {
        return true;
    }
}