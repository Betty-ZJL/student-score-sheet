const Class = require('./class');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.setPrompt(`***\n1. 添加学生\n2. 生成成绩单\n3. 退出\n***\n请输入你的选择（1～3）：`);

class Student {

    constructor(name, id, clazz, nation, math, Chinese, English, program) {
        this.name = name;
        this.id = id;
        this.clazz = clazz;
        this.nation = nation;
        this.math = math;
        this.Chinese = Chinese;
        this.English = English;
        this.program = program;
    }

    // 判断学生信息输入格式是否正确
    stuInfoFormat(stuInfoArr) {
        return true;
    }
}

module.exports = Student;