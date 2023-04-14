// Getting all Elements 
const fullname = document.getElementById('fullname')       
const age = document.getElementById('age')
const standard = document.getElementById('class')
const submit = document.getElementById('submit')
const cleardata = document.getElementById('clear-data')
const result = document.getElementById('result')
const subject = document.getElementById('subject')

// Getting data from local storage or a new empty array
let studentdata = JSON.parse(localStorage.getItem('studentdata')) || [];

submit.addEventListener('click', function(e){
    e.preventDefault(); 
    console.log(subject.value)

    if (fullname.value === "" || age.value === "" || standard.value === "" || subject.value === "") {
        alert ('Incomplete Information'); 
    }
    else {
        storedata();
        resetForm();
    }
});

function storedata (){
    const localname = fullname.value;   
    const localage = age.value;
    const localstandard = standard.value;
    const localsubject = subject.value;

     // Validate input values
    if (!localname.match(/^[a-zA-Z ]+$/)) {
        alert('Name can only contain letters');
        return;
    }
    if (localstandard < 1 || localstandard > 12) {
        alert('Class should be between 1 and 12');
        return;
    }

    // check for duplicates
    if (studentdata.some(student => student['Student Name'] === localname && student['Student Age'] === localage && student['Student Standard'] === localstandard && student['Student Subject'] === localsubject)) {
        alert('Data already exists');
        return;
    }

    else {
        // Pushing Data into Array studentdata
        studentdata.push ({ 
            'Student Name': localname, 
            'Student Age' : localage,
            'Student Standard': localstandard,
            'Student Subject': localsubject,
        });
        localStorage.setItem('studentdata',JSON.stringify(studentdata));
        showdata(); // call showdata only if there are no duplicates
    }
}


// To Show Data On Click Of Show Data Btn 
function showdata(){
    const localname = fullname.value;   
    const localage = age.value;
    const localstandard = standard.value;
    const localsubject = subject.value;

    if(localname == null || localage == null ){ 
        alert ('No Data Present');
    }
    else {
        const data = 
        `<table>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Standard</th>
            <th>Subjects</th>
        </tr>
        <tr>
        <td>${localname}</td>
        <td>${localage}</td>
        <td>${localstandard}</td>
        <td>${localsubject}</td>
        </tr>
        </table>`;
        result.insertAdjacentHTML('afterbegin',data);
    }
}

cleardata.addEventListener('click', ()=>{
    localStorage.clear();   //clear data from local storage
    result.innerHTML = ''; // clear displayed data
});

function resetForm () {
    fullname.value= null
    age.value= null
    standard.value= null
    subject.value = ""
}
