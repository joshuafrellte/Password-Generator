const generatedPassword = document.getElementById('generatedPassword')
const copyIcon = document.getElementById('copyIcon')
const copyBtn = document.getElementById('copyBtn')
const lengthSlider = document.getElementById('lengthSlider')
const passwordLength = document.getElementById('passwordLength')
const upperCheckbox = document.getElementById('upperCheckbox')
const lowerCheckbox = document.getElementById('lowerCheckbox')
const numberCheckbox = document.getElementById('numberCheckbox')
const symbolCheckbox = document.getElementById('symbolCheckbox')
const strengthBars = document.getElementsByClassName('strengthBars')
const generateBtn = document.getElementById('generateBtn')

const inputs = [lengthSlider, upperCheckbox, lowerCheckbox, numberCheckbox, symbolCheckbox]
const checkboxes = [upperCheckbox, lowerCheckbox, numberCheckbox, symbolCheckbox]

// Generates default password on load
document.body.onload = function() {
    lowerCheckbox.checked = true;
    setPasswordLength()
    setGeneratedPassword()
}

// At least one checkbox always has to be checked
checkboxes.forEach(checkbox => {
    checkbox.onchange = function() {
        const checkedCount = checkboxes.filter(checkbox => checkbox.checked).length;
        console.log(checkedCount)

        if (checkedCount === 0) {
            this.checked = true;
            setGeneratedPassword()
        }
    }
})

// Change copy button colors on hover
copyBtn.onmouseover = function() { copyIcon.style.filter = "invert(0%)" }
copyBtn.onmouseleave = function() { copyIcon.style.filter = "invert(95%)" }

// Generate password on length slider click
lengthSlider.oninput = function() { setPasswordLength() }

// Generate password on generate button click
generateBtn.onclick = function() {
    console.log(generatedPassword)
    setGeneratedPassword()
}

// Clicking any input generates a new password
inputs.forEach(input => { 
    input.onclick = function() {
        setGeneratedPassword()
    }
})

// Setters, getters, and observers
function getGeneratedPassword() { return generatePassword(getPasswordLength(), includeLower(), includeUpper(), includeNumbers(), includeSymbols()) }
function setGeneratedPassword() { generatedPassword.value = getGeneratedPassword() }
function getPasswordLength() { return lengthSlider.value }
function setPasswordLength() { passwordLength.textContent = getPasswordLength() }
function includeUpper() { return upperCheckbox.checked }
function includeLower() { return lowerCheckbox.checked }
function includeNumbers() { return numberCheckbox.checked }
function includeSymbols() { return symbolCheckbox.checked }

// Primary password generation logic
function generatePassword(length, lower, upper, number, symbol) {
    const lowerChars = "abcdefghijklmnopqrstuvwxyz"
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numChars = "0123456789"
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?"
    let charset = ""

    if (lower) charset += lowerChars
    if (upper) charset += upperChars
    if (number) charset += numChars
    if (symbol) charset += specialChars

    let password = "";
    for (let i=0; i<length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset[randomIndex]
    }

    return password;
}



