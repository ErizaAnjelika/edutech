import Navigation from "../../../component/Navigation/Navigation";
import { Button } from "flowbite-react"; // Import Modal component
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useGetLessonByGuru, useTeacherinfo } from "../../../services/queries";
import { IMateriGuru } from "../../../types/materi";
import MateriAdd from "./MateriAdd";
import MateriEdit from "./MateriEdit";
import MateriEditMobile from "./MateriEditMobile";
import MateriAddMobile from "./MateriAddMobile";
import MateriAddTablet from "./MateriAddTablet";
import MateriEditTablet from "./MateriEditTablet";

const MateriGuru = () => {
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [isMobileModalOpenAdd, setisMobileModalOpenAdd] = useState(false);
	const [isMobileModalOpenEdit, setisMobileModalOpenEdit] = useState(false);
	const [isTabletModalOpenAdd, setisTabletModalOpenAdd] = useState(false);
	const [isTabletModalOpenEdit, setisTabletModalOpenEdit] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const teacherinfo = useTeacherinfo();
	const { data: formData } = teacherinfo;

	const [formUpdate, setFormUpdate] = useState<{
		id: string;
		courseName: string;
		description: string;
		fileData: File | null;
		linkCourse: string;
		lessonName: string;
	}>({
		id: "",
		courseName: "",
		description: "",
		fileData: null,
		linkCourse: "",
		lessonName: "",
	});

	useEffect(() => {
		const handleResize = () => {
			const windowWidth = window.innerWidth;
			setIsMobile(windowWidth <= 768);
			setIsTablet(windowWidth > 768 && windowWidth <= 1024);
		};

		handleResize(); // Panggil fungsi handleResize saat komponen dimuat agar state 'isMobile' dan 'isTablet' dapat diatur dengan benar

		window.addEventListener("resize", handleResize); // Tambahkan event listener untuk memantau perubahan ukuran layar

		return () => {
			window.removeEventListener("resize", handleResize); // Bersihkan event listener saat komponen di-unmount
		};
	}, []);

	const handleShowAddForm = () => {
		if (showEditForm) {
			Swal.fire({
				title: "Anda yakin ingin meninggalkan halaman?",
				text: "Perubahan yang Anda buat mungkin tidak disimpan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					setShowEditForm(false);
					setShowAddForm(true);
				}
			});
		} else {
			setShowAddForm(!showAddForm);
		}
	};

	const handleShowEditForm = async (data: IMateriGuru) => {
		console.log(data);
		// Jika sedang menampilkan form tambah
		if (showAddForm) {
			// Tampilkan SweetAlert untuk konfirmasi
			Swal.fire({
				title: "Anda yakin ingin meninggalkan halaman?",
				text: "Perubahan yang Anda buat mungkin tidak disimpan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					// Tutup form tambah jika dikonfirmasi
					setShowAddForm(false);
					setFormUpdate({
						id: data.id,
						courseName: data.courseName || "",
						description: data.description || "",
						fileData: data.fileData || "",
						linkCourse: data.linkCourse || "",
						lessonName: data.lessonName || "",
					});
					setShowEditForm(true);
				}
			});
		} else {
			// Jika sedang menampilkan form edit
			if (showEditForm) {
				// Tampilkan SweetAlert untuk konfirmasi
				Swal.fire({
					title: "Anda yakin ingin meninggalkan halaman?",
					text: "Perubahan yang Anda buat mungkin tidak disimpan.",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Ya, lanjutkan",
					cancelButtonText: "Tidak, batalkan",
				}).then((result) => {
					if (result.isConfirmed) {
						// Tampilkan form edit
						setShowEditForm(true);
						setFormUpdate({
							id: data.id,
							courseName: data.courseName || "",
							description: data.description || "",
							fileData: data.fileData || "",
							linkCourse: data.linkCourse || "",
							lessonName: data.lessonName || "",
						});
					}
				});
			} else {
				setFormUpdate({
					id: data.id,
					courseName: data.courseName || "",
					description: data.description || "",
					fileData: data.fileData || "",
					linkCourse: data.linkCourse || "",
					lessonName: data.lessonName || "",
				});
				setShowEditForm(true);
			}
		}
	};

	const handleCloseForms = () => {
		if (showAddForm || showEditForm) {
			Swal.fire({
				title: "Anda yakin ingin meninggalkan halaman?",
				text: "Perubahan yang Anda buat mungkin tidak disimpan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					setShowAddForm(false);
					setShowEditForm(false);
				}
			});
		} else {
			setShowAddForm(false);
			setShowEditForm(false);
		}
	};

	const handleShowModalAddFormMobile = () => {
		setisMobileModalOpenAdd(true);
		setisMobileModalOpenEdit(false);
	};

  const handleShowModalAddFormTablet = () => {
		setisTabletModalOpenAdd(true);
		setisTabletModalOpenEdit(false);
	};

	const handleShowModalEditFormMobile = (data: IMateriGuru) => {
		setFormUpdate({
			id: data.id,
			courseName: data.courseName || "",
			description: data.description || "",
			fileData: data.fileData || "",
			linkCourse: data.linkCourse || "",
			lessonName: data.lessonName || "",
		});
		setisMobileModalOpenEdit(true);
		setisMobileModalOpenAdd(false);
	};

	const handleCloseModalFormMobile = () => {
		if (isMobileModalOpenAdd || isMobileModalOpenEdit) {
			Swal.fire({
				title: "Anda yakin ingin meninggalkan halaman?",
				text: "Perubahan yang Anda buat mungkin tidak disimpan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					setisMobileModalOpenAdd(false);
					setisMobileModalOpenEdit(false);
				}
			});
		} else {
			setisMobileModalOpenAdd(false);
			setisMobileModalOpenEdit(false);
		}
	};

	const handleCloseModalFormTablet = () => {
		if (isTabletModalOpenAdd || isTabletModalOpenEdit) {
			Swal.fire({
				title: "Anda yakin ingin meninggalkan halaman?",
				text: "Perubahan yang Anda buat mungkin tidak disimpan.",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Ya, lanjutkan",
				cancelButtonText: "Tidak, batalkan",
			}).then((result) => {
				if (result.isConfirmed) {
					setisTabletModalOpenAdd(false);
					setisTabletModalOpenEdit(false);
				}
			});
		} else {
			setisTabletModalOpenAdd(false);
			setisTabletModalOpenEdit(false);
		}
	};

	const handleShowModalEditFormTablet = (data: IMateriGuru) => {
		setFormUpdate({
			id: data.id,
			courseName: data.courseName || "",
			description: data.description || "",
			fileData: data.fileData || "",
			linkCourse: data.linkCourse || "",
			lessonName: data.lessonName || "",
		});
		setisTabletModalOpenEdit(true);
		setisTabletModalOpenAdd(false);
	};

	const [selectedLesson, setSelectedLesson] = useState("semua");

	const queryMapel = useGetLessonByGuru();
	const { data: dataMapel } = queryMapel;

	const filteredData: IMateriGuru[] =
		selectedLesson === "semua"
			? formData || []
			: (formData || []).filter(
					(materi) => materi.lessonName === selectedLesson
			  );

	const handleLessonChange = (e: any) => {
		setSelectedLesson(e.target.value);
	};

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (e: any) => {
		setSearchTerm(e.target.value);
	};
	const searchFilter = (lesson: any) => {
		return (
			lesson.courseName &&
			lesson.courseName.toLowerCase().includes(searchTerm.toLowerCase())
		);
	};

	return (
		<div>
			<Navigation />
			<div className="p-4 sm:ml-64">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
					{/* left side */}
					<div>
						<div className="flex items-center justify-between mt-16 mb-2">
							<h1 className="text-3xl font-bold capitalize">Materi</h1>
							<select
								value={selectedLesson}
								onChange={handleLessonChange}
								className="p-3 capitalize bg-white border border-gray-300 rounded-lg"
							>
								<option selected>semua</option>
								{dataMapel?.map((item) => (
									<option value={item.lessonName}>{item.lessonName}</option>
								))}
							</select>
						</div>

						<div className="flex justify-between gap-4 mt-5 mb-2">
							<form className="max-w-xs" onSubmit={(e) => e.preventDefault()}>
								<label
									htmlFor="default-search"
									className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
								>
									Search
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-2">
										<svg
											className="w-3 h-3 text-gray-500 dark:text-gray-400"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 20"
										>
											<path
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
											/>
										</svg>
									</div>
									<input
										type="search"
										id="default-search"
										className="block w-56 p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg md:w-80 ps-7 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Cari..."
										value={searchTerm}
										onChange={handleSearchChange}
										required
									/>
								</div>
							</form>
							{isMobile && (
								<button
									type="button"
									onClick={handleShowModalAddFormMobile}
									className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									<svg
										className="w-5 h-5 text-white dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14m-7 7V5"
										/>
									</svg>
									Tugas
								</button>
							)}
							{isTablet && (
								<button
									type="button"
									onClick={handleShowModalAddFormTablet}
									className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									<svg
										className="w-5 h-5 text-white dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14m-7 7V5"
										/>
									</svg>
									Tugas
								</button>
							)}
							{!isMobile && !isTablet && (
								<button
									type="button"
									onClick={handleShowAddForm}
									className="flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								>
									<svg
										className="w-5 h-5 text-white dark:text-white"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14m-7 7V5"
										/>
									</svg>
									Materi
								</button>
							)}
						</div>

						<div
							className="overflow-y-auto overflow-clip max-h-[calc(100vh-100px)]"
							style={{ scrollbarWidth: "none" }}
						>
							<div className="flex flex-col gap-3 mt-6 ">
								{filteredData.filter(searchFilter).length > 0 ? (
									filteredData.filter(searchFilter).map((card) => (
										<div key={card.id} className="cursor-pointer">
											<div className="flex items-center justify-between gap-2 p-3 bg-white rounded-lg shadow-sm">
												<div className="flex gap-3">
													<div className="flex items-center bg-blue-100 rounded-lg h-14">
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
														<p className="text-sm text-gray-500 capitalize">
															{card.lessonName}
														</p>
														<p className="text-base font-medium capitalize">
															{card.courseName}
														</p>
														<p className="text-sm text-gray-500 capitalize">
															{card.longClassName}
														</p>
													</div>
												</div>
												<Button
													color="warning"
													onClick={
														isMobile
															? () => handleShowModalEditFormMobile(card)
															: isTablet
															? () => handleShowModalEditFormTablet(card)
															: () => handleShowEditForm(card)
													}
												>
													Edit
												</Button>
											</div>
										</div>
									))
								) : (
									<p className="text-center text-gray-400">
										Tidak ada hasil pencarian yang sesuai.
									</p>
								)}

								{filteredData.length === 0 && searchTerm.length === 0 && (
									<p className="text-center text-gray-400">
										Tidak ada data yang sesuai dengan pilihan pelajaran yang
										dipilih.
									</p>
								)}
							</div>
						</div>
					</div>
					{/* right side */}
					{showAddForm && (
						<div className="overflow-y-auto" style={{ scrollbarWidth: "none" }}>
							<div className="p-3 bg-white border rounded-lg shadow-sm mt-14">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">
										Upload Materi
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseForms}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
								<MateriAdd
									setShowAddForm={setShowAddForm}
									handleCloseForms={handleCloseForms}
								/>
							</div>
						</div>
					)}
					{showEditForm && (
						<div
							className="overflow-y-auto"
							style={{ scrollbarWidth: "none" }}
						>
							<div className="p-3 bg-white border rounded-lg shadow-sm mt-14">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">Edit Materi</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseForms}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
								<hr className="my-3" />
								<MateriEdit
									id={formUpdate.id}
									setShowEditForm={setShowEditForm}
								/>
							</div>
						</div>
					)}
					{isMobileModalOpenAdd && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
							<div className="w-full p-4 bg-white rounded-lg sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">
										Upload Materi
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormMobile}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
								<hr className="my-3" />
								<MateriAddMobile
									setisMobileModalOpenAdd={setisMobileModalOpenAdd}
									handleCloseForms={handleCloseForms}
								/>
							</div>
						</div>
					)}
					{isMobileModalOpenEdit && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
							<div className="w-full p-4 bg-white rounded-lg sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">Edit Materi</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormMobile}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
								<hr className="my-3" />
								<MateriEditMobile
									id={formUpdate.id}
									setisMobileModalOpenEdit={setisMobileModalOpenEdit}
								/>
							</div>
						</div>
					)}
					{isTabletModalOpenAdd && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
							<div className="w-full p-4 bg-white rounded-lg sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">
										Upload Materi
									</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormTablet}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
								<hr className="my-3" />
								<MateriAddTablet
									setisTabletModalOpenAdd={setisTabletModalOpenAdd}
									handleCloseForms={handleCloseForms}
								/>
							</div>
						</div>
					)}
					{isTabletModalOpenEdit && (
						<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
							<div className="w-full p-4 bg-white rounded-lg sm:max-w-md">
								<div className="flex justify-between">
									<p className="text-xl font-bold text-gray-500">Edit Materi</p>
									<button
										className="text-gray-500 hover:text-gray-700"
										onClick={handleCloseModalFormTablet}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-6 h-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
								<hr className="my-3" />
								<MateriEditTablet
									id={formUpdate.id}
									setisTabletModalOpenEdit={setisTabletModalOpenEdit}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MateriGuru;
