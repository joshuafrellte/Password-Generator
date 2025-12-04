const generatedPassword = document.getElementById('generatedPassword')
const copyIcon = document.getElementById('copyIcon')
const copyBtn = document.getElementById('copyBtn')
const lengthSlider = document.getElementById('lengthSlider')
const passwordLength = document.getElementById('passwordLength')
const upperCheckbox = document.getElementById('upperCheckbox')
const lowerCheckbox = document.getElementById('lowerCheckbox')
const numberCheckbox = document.getElementById('numberCheckbox')
const symbolCheckbox = document.getElementById('symbolCheckbox')
const strengthLabel = document.getElementById('strengthLabel')
const strengthBars = document.getElementsByClassName('strengthBars')
const generateBtn = document.getElementById('generateBtn')

const inputs = [lengthSlider, upperCheckbox, lowerCheckbox, numberCheckbox, symbolCheckbox]
const checkboxes = [upperCheckbox, lowerCheckbox, numberCheckbox, symbolCheckbox]

// Generates default password on load
document.body.onload = function() {
    lowerCheckbox.checked = true
    setPasswordLength()
    setGeneratedPassword()
}

// At least one checkbox always has to be checked
checkboxes.forEach(checkbox => {
    checkbox.onchange = function() {
        if (getCheckedBoxCount() === 0) {
            this.checked = true
            setGeneratedPassword()
        }
    }
})

// Change copy button colors on hover
copyBtn.onmouseover = function() { copyIcon.style.filter = "invert(0%)" }
copyBtn.onmouseleave = function() { copyIcon.style.filter = "invert(99%)" }

// Copy button logic
copyBtn.onclick = function () {
    navigator.clipboard.writeText(generatedPassword.value)
    console.log("Password copied to clipboard!")
}

// Generate password on length slider click
lengthSlider.oninput = function() { setPasswordLength() }

// Generate password on generate button click
generateBtn.onclick = function() {
    setGeneratedPassword()
}

// Clicking any input generates a new password
inputs.forEach(input => { 
    input.onclick = function() {
        setGeneratedPassword()
    }
})

// Setters, getters, and observers
function getCheckedBoxCount() { return checkboxes.filter(checkbox => checkbox.checked).length }
function getPasswordLength() { return lengthSlider.value }
function setPasswordLength() { passwordLength.textContent = getPasswordLength() }
function includeUpper() { return upperCheckbox.checked }
function includeLower() { return lowerCheckbox.checked }
function includeNumbers() { return numberCheckbox.checked }
function includeSymbols() { return symbolCheckbox.checked }
function getPasswordStrength() { return measurePasswordStrength() }
function setPasswordStrength() { strengthLabel.textContent = getPasswordStrengthString() }
function getGeneratedPassword() { return generatePassword(getPasswordLength(), includeLower(), includeUpper(), includeNumbers(), includeSymbols()) }
function setGeneratedPassword() { 
    generatedPassword.value = getGeneratedPassword()
    console.log(generatedPassword.value)
    setPasswordStrength()
    setStrengthBarColors()
    displayPasswordStats()
}

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

    let password = ""
    for (let i=0; i<length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset[randomIndex]
    }

    return password
}

// Quantify password strength
function measurePasswordStrength() {
    const passwordLength = getPasswordLength()
    const charTypes = getCheckedBoxCount()

    let strength = 0
    if (passwordLength >= 0 || charTypes >= 1) strength++
    if (passwordLength >= 8 && charTypes >= 2) strength++
    if (passwordLength >= 12 && charTypes >= 3) strength++
    if (passwordLength >= 16 && charTypes == 4) strength++

    return strength
}

// Label password strength based on measured quantity
function getPasswordStrengthString() {
    const strength = measurePasswordStrength()
    let strengthString = ""

    if (strength === 1) strengthString = "Weak"
    if (strength === 2) strengthString = "Medium"
    if (strength === 3) strengthString = "Strong"
    if (strength === 4) strengthString = "Very Strong"

    return strengthString
}

// Fill bars and color them based on strength
function setStrengthBarColors() {
    resetStrengthBarColors()
    const strength = measurePasswordStrength()
    
    for (let i=0; i<strength; i++) { 
        if (strength === 1) {
            strengthBars[i].style.backgroundColor = "red" 
        }
        if (strength === 2) {
            strengthBars[i].style.backgroundColor = "orange" 
        }
        if (strength === 3) {
            strengthBars[i].style.backgroundColor = "yellowgreen" 
        }
        if (strength === 4) {
            strengthBars[i].style.backgroundColor = "green" 
        }
    }
}

// Clear bar fills and colors to prevent previous colors from staying
function resetStrengthBarColors() {
    Array.from(strengthBars).forEach(bar => {
        bar.style.backgroundColor = "transparent"
    })
}

// Log password length, char types, and strength into console 
function displayPasswordStats() {
    const length = getPasswordLength()
    const types = getCheckedBoxCount()
    const strength = getPasswordStrength()
    console.log(`len: ${length}, type: ${types}, str: ${strength}`)
}

