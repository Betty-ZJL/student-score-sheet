const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Class {

    constructor(number) {
        this.number = number;
        this.students = [];
        this.summary = {average: 0, median: 0};
    }

    // 计算总分平均数
    calAverageOfSums() {
        for (let student of this.students) {
            this.summary.average += student.sum;
        }
        this.summary.average /= this.students.length;
    }

    // 计算总分中位数
    calMedianOfSums() {
        let sums = [];
        for (let student of this.students) {
            sums.push(student.sum);
        }
        sums.sort(function (a, b) {
            return a - b
        });
        this.summary.median = (sums[parseInt(sums.length / 2)] + sums[parseInt((sums.length - 1) / 2)]) / 2;
    }

    // 通过id找到学生详细信息
    findStudent(id) {
        for (let student of this.students) {
            if (student.id == id)
                return student;
        }
        return null;
    }

    // 添加学生
    static appendStudent(studentInfo) {
        let stuInfoArr = studentInfo.split(',');
        let student = new Student(stuInfoArr[0], stuInfoArr[1], stuInfoArr[2], stuInfoArr[3], parseInt(stuInfoArr[4]), parseInt(stuInfoArr[5]), parseInt(stuInfoArr[6]), parseInt(stuInfoArr[7]));
        if (student.stuInfoFormat(stuInfoArr)) {
            student.sum = student.math + student.Chinese + student.English + student.program;
            student.average = student.sum / 4;
            for (let clazz of [cla1, cla2, cla3]) {
                if (clazz.number == student.clazz) {
                    clazz.students.push(student);
                    student.clazz = clazz;
                    break;
                }
            }
            console.log(`---学生 ${student.name} 的成绩被添加!---`);
            rl.prompt();
        }
        else {
            rl.question('请按正确的格式输入（格式：姓名,学号,民族,班级,数学,语文,英语,编程），按回车提交：', Class.appendStudent);
        }
    }

    // 按班级分类，生成成绩单
    static printReport(ids) {
        let idArr = ids.split(',');
        if (Student.idFormat(idArr)) {
            let reports = [{clazz: cla1, str: ''}, {clazz: cla2, str: ''}, {clazz: cla3, str: ''}];
            for (let id of idArr) {
                let flag = 1;
                for (let item of reports) {
                    let student = item.clazz.findStudent(id);
                    if (student) {
                        item.str += `${student.name}|${student.math}|${student.Chinese}|${student.English}|${student.program}|${student.average}|${student.sum}\n`;
                        flag = 0;
                        break;
                    }
                }
                if (flag)
                    console.log(`---学号为‘${id}’的学生不存在！---`)
            }
            for (let item of reports) {
                if (item.str != '') {
                    item.clazz.calAverageOfSums();
                    item.clazz.calMedianOfSums();
                    console.log(`****************************************\n成绩单( ${item.clazz.number} 班)\n姓名|数学|语文|英语|编程|平均分|总分\n`
                        + `========================\n${item.str}========================\n全班总分平均数：${item.clazz.summary.average}\n`
                        + `全班总分中位数：${item.clazz.summary.median}\n****************************************`);
                }
            }
            rl.prompt();
        }
        else {
            rl.question('请按正确的格式输入要打印的学生的学号（格式： 学号,学号,...），按回车提交：', Class.printReport);
        }
    }

}

class Student {

    constructor(name, id, nation, clazz, math, Chinese, English, program) {
        this.name = name;
        this.id = id;
        this.nation = nation;
        this.clazz = clazz;
        this.math = math;
        this.Chinese = Chinese;
        this.English = English;
        this.program = program;
        this.average = 0;
        this.sum = 0;
    }

    // 判断学生信息输入格式是否正确
    stuInfoFormat(stuInfoArr) {
        if (stuInfoArr.length != 8) {
            console.log('---学生信息输入不完整！---');
            return false;
        }
        else if (this.id.length != 3 || parseInt(this.id) == NaN) {
            console.log('---学号输入有误！---');
            return false;
        }
        else if (!['1', '2', '3'].includes(this.clazz)) {
            console.log('---班级输入有误！---');
            return false;
        }
        else if (this.math < 0 || this.math > 100) {
            console.log('---数学成绩输入有误！---');
            return false;
        }
        else if (this.Chinese < 0 || this.Chinese > 100) {
            console.log('---语文成绩输入有误！---');
            return false;
        }
        else if (this.English < 0 || this.English > 100) {
            console.log('---英语成绩输入有误！---');
            return false;
        }
        else if (this.program < 0 || this.program > 100) {
            console.log('---编程成绩输入有误！---');
            return false;
        }
        return true;
    }

    // 判断学号格式输入格式是否正确
    static idFormat(idArr) {
        for (let id of idArr)
            if (id.length != 3 || parseInt(id) == NaN)
                return false;
        return true;
    }

}

//假设有3个班级，学号为3位
let cla1 = new Class(1);
let cla2 = new Class(2);
let cla3 = new Class(3);

rl.setPrompt(`***\n1. 添加学生\n2. 生成成绩单\n3. 退出\n***\n请输入你的选择（1～3）：`);
rl.prompt();

rl.on('line', (choice) => {
    switch (choice.trim()) {
        case '1':
            rl.question('请输入学生信息（格式：姓名,学号,民族,班级,数学,语文,英语,编程），按回车提交：', Class.appendStudent);
            break;
        case '2':
            rl.question('请输入要打印的学生的学号（格式： 学号,学号,...），按回车提交：', Class.printReport);
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