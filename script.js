const form = document.querySelector('#form');

const fisrtnameInput = document.querySelector('#firstname');
const lastnameInput = document.querySelector('#lastname');
const emailInput = document.querySelector('#email');
const scoreInput = document.querySelector('#score');

const inputElementAll = document.querySelectorAll('.input-element');
const cardSection = document.querySelector('.cards');
const infoForm = document.querySelector('.info-form');
const validateScoreInput = document.querySelector('.validate-score');
const validateEmailInput = document.querySelector('.validate-email');

let studentList = [];
const handleStudentList = () => {

  studentList = JSON.parse(localStorage.getItem('studentList')) || [];
  if (studentList) {
    studentList.forEach(student => {
      createCard(student);
    })
  };
};

handleStudentList();

const formClean = () => {
  fisrtnameInput.value = '';
  lastnameInput.value = '';
  emailInput.value = '';
  scoreInput.value = '';
};

const saveStudent = (
  id,
  fisrtnameInput,
  lastnameInput,
  emailInput,
  scoreInput
) => {
  studentList.push({
    id,
    fisrtnameInput,
    lastnameInput,
    emailInput,
    scoreInput,
  });
};

const saveLocalstorage = () => {
  localStorage.setItem('studentList', JSON.stringify(studentList));
};

const removeLocalstorage = id => {

  studentList = JSON.parse(localStorage.getItem('studentList'));
  const index = studentList.findIndex(
    (student) => student.id === id
  );
  studentList.splice(index, 1);
  localStorage.setItem('studentList', JSON.stringify(studentList));

}

function createCard(student) {
  const card = document.createElement(`div`);
  card.classList.add('card');
  cardSection.appendChild(card);
  card.setAttribute('id', `card-${student.id}`);

  card.innerHTML = `<div class="student-info-card" ><span>
        <span class="span-element new-value-edit">${student.fisrtnameInput}</span>
        <span class="span-element new-value-edit">${student.lastnameInput}</span>
        </span>
        <span class="card-box span-element new-value-edit">${student.emailInput}</span>
        <span class="card-box span-element new-value-edit">${student.scoreInput}</span>
        <div>
        <button class="card-buttons btn-edit" onclick="findEditBtn('${student.id}')">Edit</button>
        <button class="card-buttons btn-delete" onclick="findDeleteBtn('${student.id}')">Delete</button>
        </div>
    </div>`;
};

const deleteCard = (id) => {
  studentList.filter((student) => student.emailInput !== email);
  document.querySelector(`#card-${id}`).remove();
};

const findDeleteBtn = (id) => {
  if (confirm("Are You sure?")) {
    deleteCard(id);
    removeLocalstorage(id);
  }
};

const findEditBtn = (id) => {
  emailInput.disabled = true;
  const findUser = studentList.find((student) => student.id === id);
  if (findUser) {
    fisrtnameInput.value = findUser.fisrtnameInput;
    lastnameInput.value = findUser.lastnameInput;
    emailInput.value = findUser.emailInput;
    scoreInput.value = findUser.scoreInput;
  }
};

const validateEmail = (student) => {
  return emailInput.value !== student.emailInput;
};

const handleFrom = (event) => {
  event.preventDefault();

  const messageBox = document.querySelector('.message-box');


  const messageAdd = () => {
    messageBox.innerHTML = 'Student saved';
  };

  const messageEdit = () => {
    messageBox.innerHTML = 'Edit done';
  };

  const validateScoreAlert = () => {
    validateScoreInput.innerHTML = 'Score must be number';
    validateScoreInput.classList.add('error-message');
  };

  const ValidateScoreAlertRemove = () => {
    validateScoreInput.innerHTML = '';
    validateScoreInput.classList.remove('error-message');
  };

  const validateEmailAlert = () => {
    validateEmailInput.innerHTML = `The email is duplicate`;
    validateEmailInput.classList.add('error-message');
  };

  const ValidateEmailAlertRemove = () => {
    validateEmailInput.innerHTML = '';
    validateEmailInput.classList.remove('error-message');
  };

  const alertEmptyInputs = () => {
    messageBox.innerHTML = 'All must be filled';
    inputElementAll.forEach((input) => {
      input.classList.add('input-alert');
    })
  };

  const alertRemoveinputs = () => {
    inputElementAll.forEach((input) => {
      input.classList.remove('input-alert');
    })
  }

  const updateCard = (email) => {
    const index = studentList.findIndex(
      (student) => student.emailInput === email
    );
    if (index >= 0) {
      studentList[index].id = studentList[index].id;
      studentList[index].fisrtnameInput = fisrtnameInput.value;
      studentList[index].lastnameInput = lastnameInput.value;
      studentList[index].emailInput.value = emailInput.value;
      studentList[index].scoreInput = scoreInput.value;
      const element = document.querySelector(`#card-${studentList[index].id}`);
      element.querySelectorAll('span')[1].innerText = fisrtnameInput.value;
      element.querySelectorAll('span')[2].innerText = lastnameInput.value;
      element.querySelectorAll('span')[4].innerText = scoreInput.value;
    }
    emailInput.disabled = false;
  };

  messageBox.innerHTML = '';
  ValidateScoreAlertRemove();
  ValidateEmailAlertRemove();

  if (
    fisrtnameInput.value === '' ||
    fisrtnameInput.value === null ||
    lastnameInput.value === '' ||
    lastnameInput.value === null ||
    emailInput.value === '' ||
    emailInput.value === null ||
    scoreInput.value === '' ||
    scoreInput.value === null
  ) {
    alertEmptyInputs();

  } else if (!isNaN(+scoreInput.value)) {
    alertRemoveinputs();

    if (emailInput.disabled === true) {
      updateCard(emailInput.value);
      saveLocalstorage();
      messageEdit();
      formClean();
    } else if (studentList.every(validateEmail)) {
      const id = crypto.getRandomValues(new Uint32Array(1)).join('-');

      saveStudent(
        id,
        fisrtnameInput.value,
        lastnameInput.value,
        emailInput.value,
        scoreInput.value
      );

      createCard({
        id,
        fisrtnameInput: fisrtnameInput.value,
        lastnameInput: lastnameInput.value,
        emailInput: emailInput.value,
        scoreInput: scoreInput.value,
      });

      saveLocalstorage();
      messageAdd();
      formClean();
    } else {
      validateEmailAlert();
    }
  } else {
    validateScoreAlert();
  }
};

form.addEventListener('submit', handleFrom);
