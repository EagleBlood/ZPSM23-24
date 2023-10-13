
const user = {
    name: "Jan",
    surname: 'Kowalski',
    allGrades: [
        {
            subjectName: 'Name1',
            grades: [5,4,3,5,2],
            weight: 3
        },
        {
            subjectName: 'Name2',
            grades: [3,3.5,3,5,2],
            weight: 1
        },
        {
            subjectName: 'Name3',
            grades: [1,4,3,5,4],
            weight: 5
        },

    ]
};


function calculateGradeAverage(user) {
    let totalWeightedSum = 0;
    let totalWeight = 0;

    for (const subject of user.allGrades) {
        const sum = subject.grades.reduce((acc, grade) => acc + grade, 0);
        const average = sum / subject.grades.length;
        const weightedAverage = average * subject.weight;

        totalWeightedSum += weightedAverage;
        totalWeight += subject.weight;
    }

    const overallAverage = totalWeightedSum / totalWeight;

    return overallAverage;
}

const averageGrade = calculateGradeAverage(user);

console.log("User: " + user.name + ", " + user.surname + " grade: " + averageGrade);