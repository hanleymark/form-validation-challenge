const form = document.querySelector('form');
const fields = document.querySelectorAll('input, textarea');

// Tell browser not to validate
form.setAttribute('novalidate', '');

// On submit, if any fields are invalid prevent form submission
// checkValidity also fires an 'invalid' event if invalid
form.addEventListener('submit', (event) => {
  const allValid = form.checkValidity();
  if (!allValid) {
    event.preventDefault();
  }
});

// Iterate through all input elements to set up custom validation
fields.forEach((field) => {
  field.setAttribute('aria-invalid', false);

  // Create a custom validation message element for all inputs
  const feedback = document.createElement('p');
  const id = field.id + 'Error';
  feedback.setAttribute('id', id);

  // Add custom validation message to aria-describedby
  // Do not overwrite existing aria-describedby attributes
  const prevIds = field.getAttribute('aria-describedBy');
  const describedBy = prevIds ? prevIds + ' ' + id : id;
  field.setAttribute('aria-describedBy', describedBy);

  // Add feedback element as child of input element
  field.after(feedback);

  // Set up listener to clear validation state and message on edit
  field.addEventListener('input', () => {
    field.setAttribute('aria-invalid', 'false');
    feedback.textContent = '';
  });

  // Set up listener to capture invalid event fired from checkValidity() and populate custom validation message
  field.addEventListener('invalid', () => {
    field.setAttribute('aria-invalid', 'true');
    const message = field.validationMessage;
    feedback.textContent = message;
  });
});
