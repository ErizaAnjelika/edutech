import { useQueries, useQuery } from "@tanstack/react-query";
import {
	getAbsensi,
	getAssigmentByClassroomId,
	getAssigmentByTeacherId,
	getClassRooms,
	getCourseById,
	getGuru,
	getLessonByTeacherId,
	getMapel,
	getMapelClassroom,
	getMapelIds,
	getSiswa,
	getSiswaIds,
	getTeacherinfo,
	getUserInfo,
	getGuruById,
	getClassRoomsByTeacherId,
	getSchedulesAdmin,
	getAssignmentSubmissions,
	getListAssignment,
	getAttendancesCalculate,
	getCountTeacher,
	getToDoLists,
} from "./api";
import {
	getAssignments,
	getAssignmentsIds,
	getAssignmentSubmissionsIds,
	getAttendances,
	getAttendancesIds,
	getCourse,
	getCourseClassroom,
	getCourseIds,
	getLessons,
	getLessonsIds,
	getSchedulesIds,
} from "./api";

// queries get user login
export function useUserLogin() {
	return useQueries({
		queries: [
			{
				queryKey: ["userinfo"],
				queryFn: getUserInfo,
			},
		],
	});
}

//queries get mapel id
export function useGetMapelId() {
	return useQuery({
		queryKey: ["mapel"],
		queryFn: getMapelIds,
	});
}

// queries get mapel
export function useMapel(id: (number | undefined)[] | undefined) {
	return useQueries({
		queries: (id ?? []).map((id) => {
			return {
				queryKey: ["mapel", id],
				queryFn: () => getMapel(id!),
			};
		}),
	});
}

// queries get siswa
export function useGetSiswaId() {
	return useQuery({
		queryKey: ["siswa"],
		queryFn: getSiswaIds,
	});
}

export function useSiswa(ids: (string | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["siswa", { id }],
				queryFn: () => getSiswa(id!),
			};
		}),
	});
}

// get siswa by id
export function useSiswaDetail(id: string) {
	return useQuery({
		queryKey: ["siswa", id],
		queryFn: () => getSiswa(id),
	});
}

// get guru
export function useGetGuru() {
	return useQuery({
		queryKey: ["guru"],
		queryFn: getGuru,
	});
}

// get guru by id
export function useGuruDetail(id: string) {
	return useQuery({
		queryKey: ["guru", id],
		queryFn: () => getGuruById(id),
	});
}

// get absensi
export function useGetAbsensi() {
	return useQuery({
		queryKey: ["absensi"],
		queryFn: getAbsensi,
	});
}

export function useCourseIds() {
	return useQuery({
		queryKey: ["course"],
		queryFn: getCourseIds,
	});
}

export function useCourse(ids: (number | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["course", id],
				queryFn: () => getCourse(id!),
			};
		}),
	});
}

export function useAssignmentsIds() {
	return useQuery({
		queryKey: ["assignments"],
		queryFn: getAssignmentsIds,
	});
}

export function useAssignmentsByTeacherId() {
	return useQuery({
		queryKey: ["assignmentsByTeacherId"],
		queryFn: getAssigmentByTeacherId,
	});
}

export function useAssigmentDetail(ids: (string | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["assigmentDetail", id],
				queryFn: () => getAssignments(id!),
			};
		}),
	});
}

export function useAssignments() {
	return useQuery({
		queryKey: ["assignmentsByClassroomId"],
		queryFn: getAssigmentByClassroomId,
	});
}

export function useAssignmentSubmissionsIds() {
	return useQuery({
		queryKey: ["assignmentSubmissions"],
		queryFn: getAssignmentSubmissionsIds,
	});
}

export function useAssignmentSubmissionsById(id: string) {
	return useQuery({
		queryKey: ["assignmentSubmissionsById", id],
		queryFn: () => getAssignmentSubmissions(id),
	});
}

export function useLessonsIds() {
	return useQuery({
		queryKey: ["lessons"],
		queryFn: getLessonsIds,
	});
}

export function useLessons(ids: (number | undefined)[] | undefined) {
	return useQueries({
		queries: (ids ?? [])
			.filter((id) => id !== undefined)
			.map((id) => {
				return {
					queryKey: ["lesson", id],
					queryFn: () => getLessons(id!),
				};
			}),
	});
}

export function useLessonsClassroom() {
	return useQuery({
		queryKey: ["lessonsClassroom"],
		queryFn: getMapelClassroom,
	});
}

export function useSchedulesIds() {
	return useQuery({
		queryKey: ["schedules"],
		queryFn: getSchedulesIds,
	});
}

export function useSchedulesAdmin() {
	return useQuery({
		queryKey: ["schedulesAdmin"],
		queryFn: getSchedulesAdmin,
	});
}

export function useAttendancesIds() {
	return useQuery({
		queryKey: ["attendances"],
		queryFn: getAttendancesIds,
	});
}

export function useAttendances(ids: (number | undefined)[] | undefined = []) {
	return useQueries({
		queries: (ids ?? []).map((id) => {
			return {
				queryKey: ["attendances", id],
				queryFn: () => getAttendances(),
			};
		}),
	});
}

export function useCourseClassroom() {
	return useQuery({
		queryKey: ["courseclassroom"],
		queryFn: getCourseClassroom,
	});
}

export function useTeacherinfo() {
	return useQuery({
		queryKey: ["teacherinfo"],
		queryFn: getTeacherinfo,
	});
}

export function useGetLessonByGuru() {
	return useQuery({
		queryKey: ["lessonByTeacher"],
		queryFn: getLessonByTeacherId,
	});
}

export function useCourseById(id: string) {
	return useQuery({
		queryKey: ["course", id],
		queryFn: () => getCourseById(id),
	});
}

export function useGetClassrooms() {
	return useQuery({
		queryKey: ["classrooms"],
		queryFn: getClassRoomsByTeacherId,
	});
}

export function useClassrooms() {
	return useQuery({
		queryKey: ["classrooms"],
		queryFn: getClassRooms,
	});
}

// get list tugas
export function useListAssignment(lessonId: string, assignmentId: string) {
	return useQuery({
		queryKey: ["listAssignment", lessonId, assignmentId],
		queryFn: () => getListAssignment(lessonId, assignmentId),
	});
}

// get jumlah absensi
export function useAttendacesCalculate(
	uniqueNumberOfClassRoom: string,
	year: string,
	month: string
) {
	return useQuery({
		queryKey: ["attendancesCalculate", uniqueNumberOfClassRoom, year, month],
		queryFn: () =>
			getAttendancesCalculate(uniqueNumberOfClassRoom, year, month),
	});
}

export function useCount() {
	return useQuery({
		queryKey: ["count"],
		queryFn: getCountTeacher,
	});
}

export function useTodo() {
	return useQuery({
		queryKey: ["todo"],
		queryFn: getToDoLists,
	});
}
