const Student = require('./student');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Class {

    constructor(number) {
        this.number = number;
        this.students = [];
    }

    // 添加学生
    static appendStudent(studentInfo) {
        let stuInfoArr = studentInfo.split(',');
        console.log(stuInfoArr);
        let student = new Student(stuInfoArr[0], stuInfoArr[1], stuInfoArr[2], stuInfoArr[3], stuInfoArr[4], stuInfoArr[5], stuInfoArr[6], stuInfoArr[7]);
       /* if (student.stuInfoFormat(stuInfoArr)) {
            console.log(stuInfoArr);
        }
        else {
            rl.question('请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：', Class.appendStudent);
        }*/
    }


}

module.exports = Class;