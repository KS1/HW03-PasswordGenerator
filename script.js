// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // debugging code
  // console.log("Hello, I am in writePassword function.");
  // console.log("--------------------------------------");

  var password = generatePassword();
  
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

  // debugging code
  // console.log("Password text: " + passwordText.value)
  // console.log("writePassword function completed.");
  // console.log("--------------------------------------");
  
  return;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() { 
  // debugging code
  // console.log("Hello, I am in generatePassword function.");
  // console.log("-----------------------------------------");
  
  // set default password length
  var passwordLength = 12;

  // check if user wants to set 'password-length' criteria
  var passwordLengthCriteria = window.confirm("Do you want to add 'password-length' criteria?");

  if (passwordLengthCriteria) { 
    // Ask password length 
    // Limit a length of at least 8 characters and no more than 128 characters
    passwordLength = getPasswordLength();
    
    // check if password length is valid from the user
    if (passwordLength === 0){
      // set length to default value 
      passwordLength = 12;
      window.alert("Set password length to 12 as a default value.")
    }
  } 

  // set default characters
  var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // check if user wants to set 'character-type' criteria
  var characterTypeCriteria = window.confirm("Do you want to add 'character-type' criteria?");

  if(characterTypeCriteria) {

    // get character types from the user
    var characterTypes = getCharacterTypes();

    // debugging code
    // console.log("In generatePassword function." + "characterTypes: " + characterTypes + "  passwordLength: " + passwordLength);

    if(characterTypes != "") { 
      // Building characters string based on user input for character type
      chars = "";
      if(characterTypes.includes("N"))
        chars = "0123456789";
      if(characterTypes.includes("L"))
        chars = chars + "abcdefghijklmnopqrstuvwxyz";
      if(characterTypes.includes("S"))
      // special characters = "!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
        chars = chars + "!@#$%^&*()-_+{|}[\]~`<>=/.,:;?";
      if(characterTypes.includes("U"))
        chars = chars + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
  }

  // debugging code
  // console.log("In generatePassword function." + "chars: " + chars + "   passwordLength: " + passwordLength);
  
  // Algorithm Reference: https://dev.to/code_mystery/random-password-generator-using-javascript-6a

  var password = "";

  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);    
    password += chars.substring(randomNumber, randomNumber +1);
    // debugging code
    // console.log("In generatePassword function - For Loop." + " i -" + i + " randomNumber: " + randomNumber + " password: " + password);
   }

  // debugging code
  // console.log("In generatePassword function. " + "Generated password: " + password)
  // console.log("generatePassword function completed.");
  // console.log("-------------------------------------------------------------");

  return password;
}

// Added getPasswordLength function to get the length of the password
function getPasswordLength() { 
  // debugging code
  // console.log("Hello, I am in getPasswordLength function.");
  // console.log("------------------------------------------");

   // Limit a length of at least 8 characters and no more than 128 characters
   var passwordLength = window.prompt("Enter password length (min 8 and max 128): ");
   if ((passwordLength < 8) || (passwordLength > 128)) {
     var answer = window.confirm("Password length must be between 8 and 128. Do you want to try again?");
     if(answer){
       passwordLength = getPasswordLength();
     } 
     else { passwordLength = 0; }  
   }

   // debugging code
   // console.log("Inside function getPasswordLength. " + passwordLength);
   // console.log("getPasswordLength function completed.");
   // console.log("-------------------------------------");

   return passwordLength;
}

// Added getCharacterTypes function to get character types
function getCharacterTypes() {

    // debugging code
    // console.log("Hello, I am in getCharacterTypes function.");
    // console.log("------------------------------------------");

    // lowercase, uppercase, numeric, and/or special characters   
    var characterTypes = window.prompt("Enter each character type to include: \
                                      \nFor Lower Case character type: L \
                                      \nFor Numeric character type: N \
                                      \nFor Special character type: S \
                                      \nFor Upper Case character type: U ");
    
    characterTypes = characterTypes.toUpperCase();
    if (!((characterTypes.includes("L")) || (characterTypes.includes("N")) || 
      (characterTypes.includes("S")) || (characterTypes.includes("U")) )) {
      
      var answer = window.confirm("Password must contain at least one character type. Do you want to try again?");
      if(answer){ 
        characterTypes = getCharacterTypes();
      } else {characterTypes = "";}
    }

    // debugging code
    // console.log("getCharacterTypes function completed.");
    // console.log("--------------------------------------");

    return characterTypes;  
}