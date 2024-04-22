import Navigation from "../../../component/Navigation/Navigation";
import { Link } from "react-router-dom";
import { useTeacherinfo } from "../../../services/queries";

const BerandaGuru = () => {
	const teacherCourse = useTeacherinfo();
	const { data: formData } = teacherCourse;
	const getNameTeacherFromToken = (): string | null => {
		const token = localStorage.getItem("token");
		if (token) {
			const payload = token.split(".")[1];
			const decodedPayload = JSON.parse(atob(payload));
			return decodedPayload?.NameTeacher || null;
		}
		return null;
	};

	const nameTeacher = getNameTeacherFromToken();
	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className=" mt-14">
					<h1 className="text-3xl font-bold font-mono">Beranda</h1>
					<h3 className="text-lg font-sans font-semibold mt-3 capitalize">
						Selamat Pagi Bapak/Ibu {nameTeacher}
					</h3>
					<p className="text-stone-500 capitalize">
						Yuk, berbagi pengetahuan baru hari ini! 📚
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
					<div>
						{/* materi terbaru */}
						<div className="flex flex-col gap-3">
							<h1 className="font-bold text-xl mb-3">Materi Terbaru</h1>
							{formData && (
								<div key={formData?.id} className="cursor-pointer">
									{formData.courses.map((course) => (
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
														{
															formData.lessons.find(
																(lesson) =>
																	lesson.uniqueNumberOfLesson ===
																	course.uniqueNumberOfLesson
															)?.lessonName
														}
													</p>
													<p className="text-md font-medium">
														{course.courseName}
													</p>
													<p className="text-sm capitalize text-gray-500">
														{course.classNames.join(", ")}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							)}

							<Link
								to="HalamanMateri"
								className="bg-white p-2 rounded text-blue-700 hover:bg-gray-200 hover:text-blue-500"
							>
								Selengkapnya...
							</Link>
						</div>
						{/* tugas */}
					</div>
					{/* tabel kehadiran */}
					<div className="flex flex-col gap-3">
						<h1 className="font-bold text-xl mb-3">Daftar Tugas</h1>
						<div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-3 gap-2">
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
										Basic Programing
									</p>
									<h2 className="text-md font-medium">Membuat Flowchart</h2>
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
												01 Januari 2024
											</span>
										</div>
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
													d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
												/>
											</svg>
											<span className="text-sm text-gray-500 uppercase">
												07:30 - 10:00 wib
											</span>
										</div>
									</div>
								</div>
							</div>
							<span className="bg-orange-200 text-orange-500 text-xs w-32 md:w-24 md:sm font-medium px-1 py-1 md:px-1.5 md:py-1.5 rounded-full text-center border border-orange-500 capitalize">
								belum selesai
							</span>
						</div>
						<div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-3 gap-2">
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
										Basic Programing
									</p>
									<h2 className="text-md font-medium">Membuat Flowchart</h2>
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
												01 Januari 2024
											</span>
										</div>
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
													d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
												/>
											</svg>
											<span className="text-sm text-gray-500 uppercase">
												07:30 - 10:00 wib
											</span>
										</div>
									</div>
								</div>
							</div>
							<span className="bg-orange-200 text-orange-500 text-xs w-32 md:w-24 md:sm font-medium px-1 py-1 md:px-1.5 md:py-1.5 rounded-full text-center border border-orange-500 capitalize">
								belum selesai
							</span>
						</div>
						<Link
							to="HalamanTugas"
							className="bg-white p-2 rounded text-blue-700 hover:bg-gray-200 hover:text-blue-500"
						>
							Selengkapnya...
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BerandaGuru;
