import Navigation from "../../../component/Navigation/Navigation";
import { Link } from "react-router-dom";
import {
	useAssignmentsByTeacherId,
	useTeacherinfo,
} from "../../../services/queries";

const BerandaGuru = () => {
	const assigmentQueries = useAssignmentsByTeacherId();
	const { data: assignmentData, isLoading: isLoadingAssignment } =
		assigmentQueries;

	const teacherCourse = useTeacherinfo();
	const { data: formData, isLoading } = teacherCourse;
	// const getNameTeacherFromToken = (): string | null => {
	// 	const token = localStorage.getItem("token");
	// 	if (token) {
	// 		const payload = token.split(".")[1];
	// 		const decodedPayload = JSON.parse(atob(payload));
	// 		return decodedPayload?.NameTeacher || null;
	// 	}
	// 	return null;
	// };

	const getNameTeacherFromToken = (): {
		nameTeacher: string | null;
		gender: string | null;
	} => {
		const token = localStorage.getItem("token");
		if (token) {
			const payload = token.split(".")[1];
			const decodedPayload = JSON.parse(atob(payload));
			const genderText = decodedPayload?.Gender === "1" ? "Bapak" : "Ibu";
			return {
				nameTeacher: decodedPayload?.NameTeacher || null,
				gender: genderText,
			};
		}
		return { nameTeacher: null, gender: null };
	};

	const { nameTeacher, gender } = getNameTeacherFromToken();

	const now = new Date();
	const hour = now.getHours();

	const greeting =
		hour < 10 ? "Pagi" : hour < 15 ? "Siang" : hour < 19 ? "Sore" : "Malam";

	// const nameTeacher = getNameTeacherFromToken();

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className=" mt-14">
					<h1 className="text-3xl font-bold font-mono">Beranda</h1>
					<h3 className="text-lg font-sans font-semibold mt-3 capitalize">
						Selamat {greeting} {gender} {nameTeacher}
					</h3>
					<p className="text-stone-500 capitalize">
						Yuk, berbagi pengetahuan baru hari ini! 📚
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
					{/* materi terbaru */}
					<div className="flex flex-col gap-3">
						<h1 className="font-bold text-xl mb-3">Materi Terbaru</h1>
						<div>
							{isLoading ? (
								Array.from({ length: 5 }).map((_, index) => (
									<div
										key={index}
										className="flex items-center shadow-sm p-3 gap-2 bg-white mb-2 rounded-lg animate-pulse"
									>
										<div className="flex gap-3">
											<div className="bg-blue-100 rounded-lg h-14 w-14"></div>
											<div className="flex flex-col space-y-2">
												<div className="bg-gray-200 h-4 w-40 rounded"></div>
												<div className="bg-gray-200 h-4 w-48 rounded"></div>
												<div className="bg-gray-200 h-4 w-32 rounded"></div>
											</div>
										</div>
									</div>
								))
							) : formData && formData.length > 0 ? (
								formData.slice(0, 5).map((course, index) => (
									<div key={index}>
										<div className="flex items-center  rounded-lg shadow-sm p-3 gap-2 bg-white mb-2">
											<div className="flex gap-3">
												<div className="bg-blue-100 rounded-lg h-14 flex items-center">
													<svg
														className="w-12 h-12 text-blue-600 dark:text-white"
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															fillRule="evenodd"
															d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2c.6 0 1-.4 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
															clipRule="evenodd"
														/>
													</svg>
												</div>
												<div className="flex flex-col">
													<p className="text-sm capitalize text-gray-500">
														{course.lessonName}
													</p>
													<p className="text-base font-medium capitalize">
														{course.courseName}
													</p>
													<p className="text-sm capitalize text-gray-500">
														{course.longClassName}
													</p>
												</div>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="flex items-center justify-center shadow-sm p-3 gap-2 bg-white mb-2 rounded-lg ">
									<p className="text-sm text-gray-500 text-center">
										Belum ada materi
									</p>
								</div>
							)}
						</div>
						{formData && formData.length > 0 && (
							<Link
								to="/materi-guru"
								className="p-2 text-blue-700 bg-white rounded hover:bg-gray-200 hover:text-blue-500"
							>
								Selengkapnya...
							</Link>
						)}
					</div>
					{/* tugas */}
					<div className="flex flex-col gap-3">
						<h1 className="font-bold text-xl mb-3 capitalize">Tugas terbaru</h1>
						{isLoadingAssignment ? (
							Array.from({ length: 5 }).map((_, index) => (
								<div
									key={index}
									className="flex items-center shadow-sm p-3 gap-2 bg-white mb-2 rounded-lg animate-pulse"
								>
									<div className="flex gap-3">
										<div className="bg-blue-100 rounded-lg h-14 w-14"></div>
										<div className="flex flex-col space-y-2">
											<div className="bg-gray-200 h-4 w-40 rounded"></div>
											<div className="bg-gray-200 h-4 w-48 rounded"></div>
											<div className="bg-gray-200 h-4 w-32 rounded"></div>
										</div>
									</div>
								</div>
							))
						) : assignmentData && assignmentData.length > 0 ? (
							assignmentData.slice(0, 5).map((items) => (
								<div key={items?.id}>
									<div className="flex items-center  rounded-lg shadow-sm p-3 gap-2 bg-white">
										<div className="flex gap-3">
											<div className="bg-blue-100 rounded-lg h-14 flex items-center">
												<svg
													className="w-12 h-12 text-blue-600 dark:text-white"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														fill-rule="evenodd"
														d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
														clip-rule="evenodd"
													/>
												</svg>
											</div>
											<div className="flex flex-col">
												<p className="text-sm font-normal text-gray-500">
													{items.lessonName}
												</p>
												<h2
													className="text-md font-medium"
													title={items?.assignmentName}
												>
													{items?.assignmentName &&
													items.assignmentName.length > 25
														? items.assignmentName.substring(0, 25) + "..."
														: items.assignmentName}
												</h2>
												<div className="flex flex-wrap gap-2 ">
													<div className="flex gap-1">
														<svg
															className="w-5 h-5 text-gray-500"
															aria-hidden="true"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
														>
															<path
																stroke="currentColor"
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth="2"
																d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
															/>
														</svg>
														<span className="text-sm text-gray-500">
															{items.assignmentDate}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="flex items-center justify-center shadow-sm p-3 gap-2 bg-white mb-2 rounded-lg ">
								<p className="text-sm text-gray-500 text-center">
									Belum ada tugas
								</p>
							</div>
						)}
						{assignmentData && assignmentData.length > 0 && (
							<Link
								to="/tugas-siswa"
								className="p-2 text-blue-700 bg-white rounded hover:bg-gray-200 hover:text-blue-500"
							>
								Selengkapnya...
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BerandaGuru;
