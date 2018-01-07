// Error message template
const error = (message, value) => {
  throw new Error(`FormBuilder - ${message}\nYour input:\n${value}`);
};

// Builds an option element
const buildOption = (option) => {
  // Check if value and label or throw exception
  if (option.value && option.label) return `<option value="${option.value}">${option.label}</option>`;

  return error('The option elements require a value string and label string.', [option.value, option.label]);
};

// Builds a select element
const buildSelect = (input) => {
  // Check if name and options array or throw exception
  if (input.name && input.options && Array.isArray(input.options)) {
    // Builds a string to return
    let outputString = `<select name="${input.name}">`;

    outputString += input.options.map(buildOption).join('');

    outputString += '</select>';

    if (input.label) outputString = `<label>${input.label} ${outputString}</label>`;

    outputString = `<p>${outputString}</p>`;

    return outputString;
  }

  return error('The select inputs require a name string and options array.', [input.name, input.options]);
};

// Builds a label element
const buildLabel = (input) => {
  // Check if value or throw exception
  if (input.value) return `<p><label>${input.value}</label></p>`;

  return error('The label inputs require a value string.', input.value);
};

// Builds an input button element
const buildInputButton = (input) => {
  // Check if value or throw exception
  if (input.value) return `<input type="${input.type}" value="${input.value}" />`;

  return error(`The ${input.type} inputs require a value string`, input.value);
};

// Builds an input element
const buildInput = (input) => {
  // Check if name or throw exception
  if (input.name) {
    // Builds a string to return
    let outputString = `<input type="${input.type}" name="${input.name}"`;

    if (input.value) outputString += ` value="${input.value}"`;

    outputString += ' />';

    if (input.label) outputString = `<label>${input.label} ${outputString}</label>`;

    return outputString;
  }

  return error(`The ${input.type} inputs require a value string`, input.value);
};


// Factory for building different input types
const inputFactory = (input) => {
  // Currently accepted input types
  const acceptedInputTypes = [
    'select', 'label', 'reset', 'submit', 'text', 'email', 'password', 'hidden',
  ];

  // Check if input type is accepted or throw exception
  if (input.type && acceptedInputTypes.includes(input.type)) {
    // Route input types to correct build method
    switch (input.type.toLowerCase()) {
      case 'select':
        return buildSelect(input);
      case 'label':
        return buildLabel(input);
      case 'reset':
      case 'submit':
        return buildInputButton(input);
      default:
        return buildInput(input);
    }
  }

  return error('You must supply a valid input type.', input.type);
};

// Main function to build the complete form
module.exports.buildForm = (inputs, action = false, method = 'GET') => {
  // Used to output final HTML
  let outputString = '<form';

  if (action) outputString += ` action="${action}"`;

  outputString += ` method="${method}">`;

  // Check if inputs variable is an array or throw exception
  if (inputs && Array.isArray(inputs)) {
    // Iterate through each input
    outputString += inputs.map(inputFactory).join('\n');
  } else {
    error('You must supply a valid array of inputs.', inputs); // Custom error method included
  }

  outputString += '</form>';
  return outputString;
};
