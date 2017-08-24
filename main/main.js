const Class = require('./class');
const Student = require('./student');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// 假设有3个班级，学号为3位
let cla1 = new Class(1);
let cla2 = new Class(2);
let cla3 = new Class(3);


/*
实现功能一：添加学生
 */

// 添加学生到相应班级
function doAppend(student) {
    for (let clazz of [cla1, cla2, cla3]) {
        if (clazz.number == student.clazz) {
            student.sum = student.math + student.Chinese + student.English + student.program;
            student.average = student.sum / 4;
            student.clazz = clazz;
            clazz.students.push(student);
            break;
        }
    }
    console.log(`---学生 ${student.name} 的成绩被添加!---`);
}

// 功能一：添加学生
function appendStudent(studentInfo) {
    let stuInfoArr = studentInfo.split(',');
    let student = new Student(stuInfoArr[0], stuInfoArr[1], stuInfoArr[2], stuInfoArr[3], parseInt(stuInfoArr[4]), parseInt(stuInfoArr[5]), parseInt(stuInfoArr[6]), parseInt(stuInfoArr[7]));
    if (student.stuInfoFormat(stuInfoArr)) { // 判断学生信息输入的格式是否正确
        doAppend(student); // 添加学生到相应班级
        rl.prompt();
    }
    else {
        rl.question('请按正确的格式输入（格式：姓名,学号,民族,班级,数学,语文,英语,编程），按回车提交：', appendStudent);
    }
}


/*
实现功能二：按班级分类，生成成绩单
 */

// 将需要打印的学生成绩信息按班级分类添加
function appendInfoByCla(idArr, reports) {
    for (let id of idArr) {
        let flag = 1;
        for (let item of reports) {
            let student = item.clazz.findStudent(id);
            if (student) {
                item.info += `${student.name}|${student.math}|${student.Chinese}|${student.English}|${student.program}|${student.average}|${student.sum}\n`;
                flag = 0;
                break;
            }
        }
        if (flag)
            console.log(`---学号为‘${id}’的学生不存在！---`)
    }
    return reports;
}

// 按班级分类，打印成绩单
function doPrint(reports) {
    for (let item of reports) {
        if (item.info != '') {
            item.clazz.calAverageOfSums();
            item.clazz.calMedianOfSums();
            console.log(`****************************************\n成绩单( ${item.clazz.number} 班)\n姓名|数学|语文|英语|编程|平均分|总分\n`
                + `========================\n${item.info}========================\n全班总分平均数：${item.clazz.summary.average}\n`
                + `全班总分中位数：${item.clazz.summary.median}\n****************************************`);
        }
    }
}

// 功能二：按班级分类，生成成绩单
function printReport(ids) {
    let idArr = ids.split(',');
    if (Student.idFormat(idArr)) { // 判断输入的学号格式是否正确
        let reports = [{clazz: cla1, info: ''}, {clazz: cla2, info: ''}, {clazz: cla3, info: ''}];
        reports = appendInfoByCla(idArr, reports); // 将需要打印的学生成绩信息按班级分类添加
        doPrint(reports); // 按班级分类，打印成绩单
        rl.prompt();
    }
    else {
        rl.question('请按正确的格式输入要打印的学生的学号（格式： 学号,学号,...），按回车提交：', printReport);
    }
}


rl.setPrompt(`***\n1. 添加学生\n2. 生成成绩单\n3. 退出\n***\n请输入你的选择（1～3）：`);
rl.prompt();

rl.on('line', (choice) => {
    switch (choice.trim()) {
        case '1':
            rl.question('请输入学生信息（格式：姓名,学号,民族,班级,数学,语文,英语,编程），按回车提交：', appendStudent);
            break;
        case '2':
            rl.question('请输入要打印的学生的学号（格式： 学号,学号,...），按回车提交：', printReport);
            break;
        case '3':
            rl.close();
            break;
        default:
            console.log('---没有该操作，请重新输入！---');
            rl.prompt();
    }
});

rl.on('close', () => {
    console.log('---退出成功！---');
    process.exit(0);
});