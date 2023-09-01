// get the HTML elements
const sourceLanguageSelect = document.querySelector('select[aria-label="Default select example"]:first-of-type');
const sourceTextarea = document.querySelector('#exampleFormControlTextarea1');
const targetLanguageSelect = document.querySelector('select[aria-label="Default select example"]:last-of-type');
const targetTextarea = document.querySelector('#exampleFormControlTextarea2');
const translateButton = document.querySelector('#btn1');
const resetButton = document.querySelector('#btn2');

translateButton.addEventListener('click', () => {
  // get the selected languages
  
  const selectedSourceOption = sourceLanguageSelect.options[sourceLanguageSelect.selectedIndex];
  const selectedSourceLanguage = selectedSourceOption.textContent;
  const selectedTargetOption = targetLanguageSelect.options[targetLanguageSelect.selectedIndex];
  const selectedTargetLanguage = selectedTargetOption.textContent;

  
  // make the API request
  const apiUrl = `https://api.mymemory.translated.net/get?q=${sourceTextarea.value}&langpair=${selectedSourceLanguage}|${selectedTargetLanguage}`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Translation failed. Please try again later.');
      }
      return response.json();
    })
    .then(data => {
      // update the target textarea with the translated text
      targetTextarea.value = data.responseData.translatedText;
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
    });
});


// add event listener to the reset button
resetButton.addEventListener('click', () => {
  // clear both textareas and reset the select elements
  sourceTextarea.value = '';
  targetTextarea.value = '';
  sourceLanguageSelect.selectedIndex = 0;
  targetLanguageSelect.selectedIndex = 0;
});


const toggleSwitch = document.querySelector('#toggle');

// Add event listener for toggle switch

toggleSwitch.addEventListener('change', switchTheme, false);

// Switch theme
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.classList.remove('dark-mode');
  }    
}

// Check localStorage for saved theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
    document.body.classList.add('dark-mode');
  }
}
