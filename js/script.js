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
    input.onchange = function() {
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
function getGeneratedPassword() { return generatePassword() }
function setGeneratedPassword() { 
    generatedPassword.value = getGeneratedPassword()
    console.log(generatedPassword.value)
    setPasswordStrength()
    setStrengthBarColors()
    displayPasswordStats()
}

// Primary password generation logic
function generatePassword() {
    const lowerChars = "abcdefghijklmnopqrstuvwxyz"
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numChars = "0123456789"
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?"
    let charset = ""

    if (includeLower()) charset += lowerChars
    if (includeUpper()) charset += upperChars
    if (includeNumbers()) charset += numChars
    if (includeSymbols()) charset += specialChars

    let password = ""
    for (let i=0; i<getPasswordLength(); i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        password += charset[randomIndex]
    }

    return password
}

// Quantify password strength using entropy
function measurePasswordStrength() {
    let charset = 0
    const password = generatedPassword.value

    if (/[a-z]/.test(password)) charset += 26
    if (/[A-Z]/.test(password)) charset += 26
    if (/[0-9]/.test(password)) charset += 10
    if (/[^A-Za-z0-9]/.test(password)) charset += 32 
    if (charset === 0) return 0

    return password.length * Math.log2(charset)
}

// Descriptive equivalent of password strength
function getPasswordStrengthString() {
    const strength = measurePasswordStrength()

    if (strength === 0) return "💀"
    if (strength < 28) return "Very Weak"
    if (strength < 36) return "Weak"
    if (strength < 60) return "Medium"
    if (strength < 128) return "Strong"
    return "Very Strong"
    console.log(measurePasswordStrength())
}

// function measurePasswordStrength() {
//     const passwordLength = getPasswordLength()
//     const charTypes = getCheckedBoxCount()

//     let strength = 0
//     if (passwordLength >= 0 || charTypes >= 1) strength++
//     if (passwordLength >= 8 && charTypes >= 2) strength++
//     if (passwordLength >= 12 && charTypes >= 3) strength++
//     if (passwordLength >= 16 && charTypes == 4) strength++

//     return strength
// }

// Label password strength based on measured quantity
// function getPasswordStrengthString() {
//     const strength = measurePasswordStrength()
//     let strengthString = ""

//     if (strength === 0) strengthString = "Very Weak"
//     if (strength === 1) strengthString = "Weak"
//     if (strength === 2) strengthString = "Medium"
//     if (strength === 3) strengthString = "Strong"
//     if (strength === 4) strengthString = "Very Strong"

//     return strengthString
// }

// Fill bars and color them based on strength
function setStrengthBarColors() {
    resetStrengthBarColors()
    const bars = getBars()
    
    for (let i=0; i<bars; i++) { 
        if (bars === 1) {
            strengthBars[i].style.backgroundColor = "red" 
        }
        else if (bars === 2) {
            strengthBars[i].style.backgroundColor = "orange" 
        }
        else if (bars === 3) {
            strengthBars[i].style.backgroundColor = "yellow" 
        }
        else if (bars === 4) {
            strengthBars[i].style.backgroundColor = "yellowgreen" 
        }
        else {
            strengthBars[i].style.backgroundColor = "green" 
        }
    }
}

// Get how many bars to fill
function getBars() {
    const strength = measurePasswordStrength()
    if (strength === 0) { return 0 }
    else if (strength < 28) { return 1 }
    else if (strength < 36) { return 2 }
    else if (strength < 60) { return 3 }
    else if (strength < 128) { return 4}
    else { return 5 }
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

