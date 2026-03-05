const USER_TYPE = Object.freeze({
    ADMIN: 1,
    DESIGNER: 2,
    TESTER: 3
});

function gen_admin_password() {
    let min = 0;
    let max = 9;
    let password = "";
    for (let i = 0; i < 6; i++) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;
        password += num.toString();
    }
    return password;
}

function getUser() {
    let username = prompt("Enter username: ").toUpperCase();
    let user_type;

    switch (username) {
        case "ADMIN":
            user_type = USER_TYPE.ADMIN;
            break;
        case "DESIGNER":
            user_type = USER_TYPE.DESIGNER;
            break;
        case "TESTER":
            user_type = USER_TYPE.TESTER;
            break;
        default:
            alert("No such user exists.");
            user_type = null;
    }
    return user_type;
}

function getPass(user) {
    if (USER_TYPE.ADMIN == user) {
        let admin_pass = gen_admin_password();
        return [prompt("Admin Password: " + admin_pass + "\nEnter password: "), admin_pass];
    }
    return [prompt("Enter password: "), ""];
}

function passValidate(user, pass) {
    let valid = false;
    switch (user) {
        case USER_TYPE.ADMIN:
            valid = (pass[0] == pass[1]) ? true : false;
            break;
        case USER_TYPE.DESIGNER:
            valid = (pass[0] == "111") ? true : false;
            break;
        case USER_TYPE.TESTER:
            valid = (pass[0] == "222") ? true : false;
            break;
        default:
            return valid;
    }
    return valid;
}

function program_access(user) {
    let pass_fail = 0;
    while (true) {
        let pass_tuple = getPass(user);
        let valid = passValidate(user, pass_tuple);
        if (!valid) {
            message = "Incorrect password.";
            pass_fail++;
            if ((user == USER_TYPE.ADMIN && pass_fail == 2) || 
                (user == USER_TYPE.DESIGNER || user == USER_TYPE.TESTER) && pass_fail == 3) {
                alert(message + "\nToo many attempts -> Exiting program.");
                return false;
            }
        } else {
            return true;
        }
    }
}

function program_prompts(user) {
    let message;
    if (USER_TYPE.ADMIN == user) {
        var age = parseInt(prompt("Your age: "));
        let admission_year = parseInt(prompt("Admission year to CS: "));
        let years_left = (admission_year + 4) - 2026;
        if (years_left < 0) {
            return "Should have already graduated, chump.";
        }
        message = "You will be " + (age + years_left) + " when you graduate in " + (2026 + years_left); 
    }
    else if (USER_TYPE.DESIGNER == user || USER_TYPE.TESTER == user) {
        let num_portfolios = parseInt(prompt("Number of portfolios: "));
        let birth_year     = parseInt(prompt("Birth year: "));
        var age = 2026 - birth_year;
        let discount;
        if ((age <= 18 && age >= 14) && ((num_portfolios => 5) && (num_portfolios <= 10))) {
            discount = 10;
        } else if ((age > 18) && (num_portfolios > 10 && num_portfolios <= 20)) {
            discount = 7;
        } else {
            discount = 0;
        }
        (USER_TYPE.DESIGNER) 
            ? message = "You get a " + discount + "% on an optional Adobe XD course." 
            : message = "You get a " + discount + "% on an optional QA Pro course.";
    }
    return message;
}

function login_2() {
    let user = getUser();
    if (user == null) return;
    if (program_access(user) == true) {
        alert(program_prompts(user));
    } else {
        return;
    }
    alert(message);
}



