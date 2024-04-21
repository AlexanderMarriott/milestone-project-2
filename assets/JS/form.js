// Create form
let form = document.createElement("form");

// Create input for name
let nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.name = "name";
nameInput.placeholder = "Your Name";
nameInput.required = true;
form.appendChild(nameInput);

// Create input for email
let emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.name = "email";
emailInput.placeholder = "Your Email";
emailInput.required = true;
form.appendChild(emailInput);

// Create input for query title
let queryTitleInput = document.createElement("input");
queryTitleInput.type = "text";
queryTitleInput.name = "queryTitle";
queryTitleInput.placeholder = "Your Query Title";
queryTitleInput.required = true;
form.appendChild(queryTitleInput);

// Create textarea for query
let queryInput = document.createElement("textarea");
queryInput.name = "query";
queryInput.placeholder = "Your Query";
queryInput.required = true;
form.appendChild(queryInput);

// Create submit button
let submitButton = document.createElement("input");
submitButton.type = "submit";
submitButton.value = "Submit";
form.appendChild(submitButton);

// Add event listener to form
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from being submitted

  let name = nameInput.value;
  let email = emailInput.value;
  let queryTitle = queryTitleInput.value; // Get value of query title input

  alert(
    `Thank you ${name} for contacting us regarding ${queryTitle}. If your query requires it, we shall get back to you using ${email}.`
  );

  // Redirect to index.html
  window.location.href = "index.html";
});

// Append form to body (or any other container)
document.body.appendChild(form);
