import throttle from 'lodash.throttle';

const LOCALE_STORAGE_KEY = 'feedback-form-state';

const formData = localStorage.getItem(LOCALE_STORAGE_KEY) || {};

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form textarea'),
  lable: document.querySelector('.feedback-form lable'),
};

refs.form.addEventListener('submit', onFormSubmit);

refs.form.addEventListener('input', throttle(onTextareaInput, 1000), evt => {
  formData[evt.target.name] = evt.target.value;
  const inputJson = JSON.stringify(formData);
  localStorage.setItem(LOCALE_STORAGE_KEY, inputJson);
  console.log(formData);
});

populateTextarea();

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALE_STORAGE_KEY);
}

function onTextareaInput(evt) {
  const message = evt.target.value;
  localStorage.setItem(LOCALE_STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMess = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (savedMess) {
    refs.input.value = savedMess;
  }
}
