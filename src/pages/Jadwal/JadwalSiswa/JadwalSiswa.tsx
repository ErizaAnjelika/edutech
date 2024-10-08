import Navigation from "../../../component/Navigation/Navigation";
import { useSchedulesIds } from "../../../services/queries";

const JadwalSiswa = () => {
	const schedulesQuery = useSchedulesIds();
	const { data: schedules, isLoading } = schedulesQuery;

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="mt-14">
					<h1 className="text-3xl font-bold">Jadwal Pelajaran</h1>
				</div>
				<div className="mt-8 w bg-white shadow p-4 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
					{isLoading ? (
						Array.from({ length: 5 }).map((_, day) => (
							<div key={day}>
								<h1 className="text-xl font-bold text-center">
									<div className="h-6 bg-gray-200 rounded-md animate-pulse w-24 mx-auto"></div>
								</h1>
								<div className="flex flex-col gap-6 mt-4">
									{Array.from({ length: 3 }).map((_, index) => (
										<div
											key={index}
											className="bg-gray-100 border-l-4 border-gray-300 rounded-lg h-full flex items-center w-52 animate-pulse"
										>
											<div className="p-4 w-full">
												<div className="h-6 bg-gray-200 rounded-md mb-2"></div>
												<div className="flex gap-1 items-center mb-2">
													<svg
														className="w-5 h-5 text-gray-200"
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
													<div className="h-4 bg-gray-200 rounded-md w-32"></div>
												</div>
												<div className="h-4 bg-gray-200 rounded-md w-24"></div>
											</div>
										</div>
									))}
								</div>
							</div>
						))
					) : (
						<>
							{(() => {
								if (!schedules)
									return (
										<div className="flex items-center justify-center h-full w-full">
											<div className="py-4 text-center capitalize text-gray-500">
												Data belum tersedia.
											</div>
										</div>
									);

								const groupedSchedules: { [key: number]: any[] } = {
									1: [],
									2: [],
									3: [],
									4: [],
									5: [],
								};

								schedules.forEach((schedule: any) => {
									groupedSchedules[schedule.day].push(schedule);
								});

								return Object.keys(groupedSchedules).map((day) => (
									<div key={day}>
										<h1 className="text-xl font-bold text-center">
											{day === "1"
												? "Senin"
												: day === "2"
												? "Selasa"
												: day === "3"
												? "Rabu"
												: day === "4"
												? "Kamis"
												: "Jum'at"}
										</h1>
										<div className="flex flex-col gap-6 mt-4">
											{groupedSchedules[parseInt(day)].map((schedule) => (
												<div
													key={schedule.id}
													className="bg-blue-100 border-l-4 border-blue-500 rounded-lg h-full flex items-center w-52"
												>
													<div className="p-4">
														<h2 className="m-1 text-lg font-medium">
															{schedule.lessonName}
														</h2>
														<div className="flex gap-1">
															<svg
																className="w-5 h-5 text-gray-800 dark:text-white"
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
															<span className="text-sm uppercase">
																{schedule.startTime.slice(0, -3)} -{" "}
																{schedule.endTime.slice(0, -3)} WIB
															</span>
														</div>
														<p
															className="m-1 text-md font-medium text-gray-700 capitalize hover:cursor-pointer"
															title={schedule.nameTeacher}
														>
															{schedule.nameTeacher.length > 15
																? `${schedule.nameTeacher.slice(0, 15)}...`
																: schedule.nameTeacher}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
								));
							})()}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default JadwalSiswa;
