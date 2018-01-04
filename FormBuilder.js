// Main function to build the complete form
exports = module.exports = {};

exports.buildForm = (inputs, action = false, method = 'GET') => {

  // Used to output final HTML
  let outputString = `<form`

  if(action) outputString += ` action="${action}"`;

  outputString += ` method="${method}">`

  // Check if inputs variable is an array or throw exception
  if(inputs && Array.isArray(inputs)) {

    // Iterate through each input
    outputString += inputs.map(inputFactory).join('\n');

  } else {
    error('You must supply a valid array of inputs.', inputs); // Custom error method included
  }

  outputString += '</form>';
  console.log(outputString);
}

// Factory for building different input types
let inputFactory = (input) => {

  // Currently accepted input types
  let acceptedInputTypes = [
    'select', 'label', 'reset', 'submit', 'text', 'email', 'password', 'hidden'
  ];

  // Check if input type is accepted or throw exception
  if(input.type && acceptedInputTypes.includes(input.type)) {

    // Route input types to correct build method
    switch(input.type) {

      case 'select':
        return buildSelect(input);
        break;

      case 'label':
        return buildLabel(input);
        break;

      case 'reset':
      case 'submit':
        return buildInputButton(input);
        break;

      default:
        return buildInput(input);
    }
  }

  error('You must supply a valid input type.', input.type);
}

// Builds a select element
let buildSelect = (input) => {

  // Check if name and options array or throw exception
  if(input.name && input.options && Array.isArray(input.options)) {

    // Builds a string to return
    let outputString = `<select name="${input.name}">`;

    outputString += input.options.map(buildOption).join('');

    outputString += '</select>';

    if(input.label) outputString = `<label>${input.label} ${outputString}</label>`;

    outputString = `<p>${outputString}</p>`;

    return outputString;
  }

  error('The select inputs require a name string and options array.', [input.name, input.options]);
}

// Builds an option element
let buildOption = (option) => {

  // Check if value and label or throw exception
  if(option.value && option.label) return `<option value="${option.value}">${option.label}</option>`;

  error('The option elements require a value string and label string.', [option.value, option.label]);
}

// Builds a label element
let buildLabel = (input) => {

  // Check if value or throw exception
  if(input.value) return `<p><label>${input.value}</label></p>`;

  error('The label inputs require a value string.', input.value);
}

// Builds an input button element
let buildInputButton = (input) => {

  // Check if value or throw exception
  if(input.value) return `<input type="${input.type}" value="${input.value}" />`;

  error(`The ${input.type} inputs require a value string`, input.value);
}

// Builds an input element
let buildInput = (input) => {

  // Check if name or throw exception
  if(input.name) {

    // Builds a string to return
    let outputString = `<input type="${input.type}" name="${input.name}"`;

    if(input.value) outputString += ` value="${input.value}"`;

    outputString += ' />';

    if(input.label) outputString = `<label>${input.label} ${outputString}</label>`;

    return outputString;
  }

  error(`The ${input.type} inputs require a value string`, input.value);

}

// Error messages
let error = (message, value) => {
  throw new Error(`FormBuilder - ${message}\nValue:\n${value}`);
}
