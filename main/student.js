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

module.exports = Student;