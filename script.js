const form = document.querySelector("form");

const fields = [
  {
    id: "mail",
    message: "You need to enter an email address.",
    typeMismatchMessage: "Entered value needs to be an email address.",
    minLengthMessage: "Email should be at least 8 characters.",
  },
  {
    id: "country",
    message: "You need to enter a country.",
  },
  {
    id: "zip",
    message: "You need to enter a zip code.",
  },
  {
    id: "password",
    message: "You need to enter a password.",
    minLengthMessage: "Password should be at least 8 characters.",
  },
  {
    id: "confirmPassword",
    message: "You need to confirm your password.",
    matchMessage: "Passwords do not match.",
  },
];

fields.forEach((field) => {
  const input = document.getElementById(field.id);
  const error = document.querySelector(`#${field.id} + span.error`);

  input.addEventListener("input", () => {
    if (input.validity.valid) {
      error.textContent = "";
      error.classList.remove("active");
    } else {
      showError(input, error, field);
    }
    if (field.id === "password" || field.id === "confirmPassword") {
      validatePasswordMatch();
    }
  });
});

form.addEventListener("submit", (event) => {
  let isFormValid = true;

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const error = document.querySelector(`#${field.id} + span.error`);

    if (!input.validity.valid) {
      showError(input, error, field);
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    event.preventDefault();
    return;
  }

  alert("High five! Form submitted successfully!");
  // You can add other actions here upon successful submission
});

function showError(input, error, field) {
  if (input.validity.valueMissing) {
    error.textContent = field.message;
  } else if (input.validity.typeMismatch) {
    error.textContent = field.typeMismatchMessage || field.message;
  } else if (input.validity.tooShort) {
    error.textContent = field.minLengthMessage || field.message;
  } else if (field.id === "confirmPassword" && !input.validity.valid) {
    error.textContent = field.matchMessage;
  }

  error.classList.add("active");
}

function validatePasswordMatch() {
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const confirmPasswordError = document.querySelector(
    "#confirmPassword + span.error"
  );

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.classList.add("active");
    confirmPassword.setCustomValidity("Passwords do not match");
  } else {
    confirmPasswordError.textContent = "";
    confirmPasswordError.classList.remove("active");
    confirmPassword.setCustomValidity("");
  }
}
