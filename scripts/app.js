let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let codeStackEmail = document.getElementById('codeStackEmail');
let pickPerson = document.getElementById('pickPerson'); 
let lastFiveShown = [];

function getData(){
    return fetch('../data/data.json')
    .then( response => response.json())
    .then( data => {
        console.log(data)
        return data.peopleList
    })   
}
getData();

function getRandomStudent(peopleList){
    let randomIndex =  Math.floor(Math.random() * peopleList.length);
    console.log([randomIndex]);
    return peopleList[randomIndex];
} 

pickPerson.addEventListener('click', () => {
    getData() .then( peopleList => {
        let randomStudent = getRandomStudent(peopleList);
        console.log(randomStudent);
        lastFiveShown.unshift(randomStudent);
        if (lastFiveShown.length > 5) {
            lastFiveShown.pop();
        }
        firstName.innerText = randomStudent.firstName;
        lastName.innerText = randomStudent.lastName;
        email.innerText = randomStudent.email;
        codeStackEmail.innerText = randomStudent.codeStackEmail
        console.log('Last 5 people shown:', lastFiveShown);
        
        for (let i = 0; i < 5; i++) {
            let historyDiv = document.getElementById(`history${i}`);
            if (lastFiveShown[i]) {
                historyDiv.innerHTML = `
                    <p><b>${lastFiveShown[i].firstName} ${lastFiveShown[i].lastName}</b></p>
                    <p>${lastFiveShown[i].email}</p>
                    <p>${lastFiveShown[i].codeStackEmail}</p>
                `;
            } else {
                historyDiv.innerHTML = '';
            }
        }

    })
});