import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-msg';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea'),
  input: document.querySelector('.feedback-form input'),
};

let formData = {};
onTextareaActivity();

refs.form.addEventListener('submit', onFormSubmitSent);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmitSent(evt) {
  evt.preventDefault();
  console.log(formData);
  formData = {};
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const savedData = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, savedData);
}

function onTextareaActivity() {
  const saveMessage = localStorage.getItem(STORAGE_KEY);
  if (saveMessage) {
    const parseSave = JSON.parse(saveMessage);
    const keys = Object.keys(parseSave);

    for (const key of keys) {
      refs.form.elements[key].value = parseSave[key];
      formData[key] = parseSave[key];
    }
  }
}
