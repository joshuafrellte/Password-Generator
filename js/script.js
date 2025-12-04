const copyIcon = document.getElementById('copyIcon')
const copyBtn = document.getElementById('copyBtn')

copyBtn.onmouseover = function() {
    copyIcon.style.filter = "invert(0%)"
}

copyBtn.onmouseleave = function() {
    copyIcon.style.filter = "invert(95%)"
}