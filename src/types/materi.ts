export interface CourseClassroom {
	classroomId: string;
	className: string;
	courses: [
		{
			id: number;
			nameTeacher: string;
			lessonName: string;
			courseName: string;
			description: string;
			fileName: string;
			linkCourse: string;
			uniqueNumberOfLesson: [string];
			fileData: string;
			createdAt: Date;
		}
	];
}

export interface IMateriGuru {
	teacherId: string;
	lessons: [
		{
			id: string;
			lessonName: string;
			uniqueNumberOfLesson: string;
		}
	];
	courses: [
		{
			id: string;
			courseName: string;
			description: string;
			fileName: string;
			linkCourse: string;
			uniqueNumberOfLesson: string;
			uniqueNumberOfClassRooms: [string];
			classNames: [string];
			fileData: string;
			lessonName: string;
		}
	];
}
