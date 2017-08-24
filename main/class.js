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

}

module.exports = Class;