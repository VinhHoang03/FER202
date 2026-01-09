const x= 5;
console.log(`The value of x is: ${x}`);

//Sử dụng câu lệnh if-else
if(x >= 0){
    console.log(`${x} is a positive number.`);
} else {
    console.log(`${x} is not a positive number.`);
}

//Sử dụng toán tử 3 ngôi
const result = (x >= 0) ? 'Non-negative' : 'Negative';
console.log(`The number is: ${result}`);

//Hàm chào hỏi với tham số mặc định
const greet = (name, age = 18) => {
    return `Hello, my name is ${name} and I am ${age} years old.`;
}
console.log(greet('Alice', 30));
console.log(greet('Bob'));

//Hàm tính bình phương
const square = num => num * num;
console.log(`The square of ${x} is: ${square(x)}`);

//hàm in 1 đối tượng student gồm name, age, grade
const printStudent = (student) => {
    console.log(`Id: ${student.id}, Student Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
}
const student = {id: 1, name: 'Charlie', age: 20, grade: 'A'};
printStudent(student);

//Khai báo 1 list students và gọi hàm printStudent cho từng student trong list
const students = [
    {id: 2, name: 'David', age: 21, grade: 'B'},
    {id: 3, name: 'Eva', age: 22, grade: 'A'},
    {id: 4, name: 'Frank', age: 20, grade: 'C'},
    {id: 5, name: 'Grace', age: 23, grade: 'B'},
    {id: 6, name: 'Hannah', age: 21, grade: 'A'},
    {id: 7, name: 'Ian', age: 22, grade: 'C'},
    {id: 8, name: 'Jack', age: 20, grade: 'B'},
    {id: 9, name: 'Kathy', age: 23, grade: 'A'},
    {id: 10, name: 'Leo', age: 21, grade: 'C'},
    {id: 11, name: 'Mia', age: 22, grade: 'B'}
];
students.forEach(printStudent);

//hàm khai báo 1 list students bằng map
students.map(student => printStudent(student));

//Không dùng hàm printStudent để in thông tin từng student trong list
students.forEach(student => {
    console.log(`Id: ${student.id}, Student Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
});

//sử dụng hàm map không dùng hàm printStudent để in thông tin từng student trong list
students.map(student => {
    console.log(`Id: ${student.id}, Student Name: ${student.name}, Age: ${student.age}, Grade: ${student.grade}`);
});

//Sử dụng destructuring để lấy giá trị từ đối tượng student
students.forEach(({id, name, age, grade}) => {
    console.log(`Id: ${id}, Student Name: ${name}, Age: ${age}, Grade: ${grade}`);
});

//Sử dụng destructuring để lấy giá trị từ mảng students
students.map(({id, name, age, grade}) => {
    console.log(`Id: ${id}, Student Name: ${name}, Age: ${age}, Grade: ${grade}`);
});

//Dùng rest operator để lấy phần còn lại của mảng students
const [firstStudent, secondStudent, ...otherStudents] = students;
console.log('First Student:', firstStudent);
console.log('Second Student:', secondStudent);
console.log('Other Students:', otherStudents);

otherStudents.forEach(({id, name, age, grade}) => {
    console.log(`Id: ${id}, Student Name: ${name}, Age: ${age}, Grade: ${grade}`);
});

//Thểm 1 students mói vào otherStudents sử dụng spread operator
const newStudent = {id: 12, name: 'Nina', age: 24, grade: 'A'};
const updatedStudents = [...otherStudents, newStudent];
console.log('Updated Students List:');
updatedStudents.forEach(({id, name, age, grade}) => {
    console.log(`Id: ${id}, Student Name: ${name}, Age: ${age}, Grade: ${grade}`);
});