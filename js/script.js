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

document.body.onload = function() {
    lowerCheckbox.checked = true;
    setPasswordLength()
    setGeneratedPassword()
}

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

copyBtn.onmouseover = function() { copyIcon.style.filter = "invert(0%)" }
copyBtn.onmouseleave = function() { copyIcon.style.filter = "invert(95%)" }
lengthSlider.oninput = function() { setPasswordLength() }

generateBtn.onclick = function() {
    console.log(generatedPassword)
    console.log("generate button clicked!")
    setGeneratedPassword()
}

inputs.forEach(input => { 
    input.onclick = function() {
        setGeneratedPassword()
    }
})

function getGeneratedPassword() { return generatePassword(getPasswordLength(), includeLower(), includeUpper(), includeNumbers(), includeSymbols()) }
function setGeneratedPassword() { generatedPassword.value = getGeneratedPassword() }
function getPasswordLength() { return lengthSlider.value }
function setPasswordLength() { passwordLength.textContent = getPasswordLength() }
function includeUpper() { return upperCheckbox.checked }
function includeLower() { return lowerCheckbox.checked }
function includeNumbers() { return numberCheckbox.checked }
function includeSymbols() { return symbolCheckbox.checked }

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



