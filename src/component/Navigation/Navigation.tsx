import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
	Avatar,
	Dropdown,
	DropdownHeader,
	DropdownItem,
	Navbar,
	NavbarBrand,
	NavbarToggle,
} from "flowbite-react";
import { AiFillHome } from "react-icons/ai";
import {
	FaBookBookmark,
	FaClipboardList,
	FaUserLarge,
	FaFileCircleCheck,
	FaCalendarDays,
	FaListCheck,
} from "react-icons/fa6";
import { FaUser, FaAngleUp } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";

const Navigation = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation();
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [absenMenuOpen, setAbsenMenuOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const toggleUserMenu = () => {
		setUserMenuOpen(!userMenuOpen);
	};

	useEffect(() => {
		const handleBodyClick = (event) => {
			const userMenu = document.getElementById("user-menu");
			if (userMenu && !userMenu.contains(event.target)) {
				setUserMenuOpen(false);
			}
		};

		document.body.addEventListener("click", handleBodyClick);

		return () => {
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, []);

	useEffect(() => {
		const submenuLinks = ["/pengguna-guru", "/pengguna-siswa"];
		if (submenuLinks.includes(location.pathname)) {
			setUserMenuOpen(true);
		} else {
			setUserMenuOpen(false);
		}
	}, [location.pathname]);

	// const toggleSidebar = () => {
	// 	setSidebarOpen(!sidebarOpen);
	// };

	const toggleAbsenMenu = () => {
		setAbsenMenuOpen(!absenMenuOpen);
	};

	useEffect(() => {
		const handleBodyClick = (event) => {
			const userMenu = document.getElementById("absensi-menu");
			if (userMenu && !userMenu.contains(event.target)) {
				setAbsenMenuOpen(false);
			}
		};

		document.body.addEventListener("click", handleBodyClick);

		return () => {
			document.body.removeEventListener("click", handleBodyClick);
		};
	}, []);

	useEffect(() => {
		const submenuLinks = ["/rekap-absensi", "/data-absensi"];
		if (submenuLinks.includes(location.pathname)) {
			setAbsenMenuOpen(true);
		} else {
			setAbsenMenuOpen(false);
		}
	}, [location.pathname]);

	return (
		<div>
			<Navbar className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
				<div className="flex gap-4">
					<NavbarToggle onClick={toggleSidebar} />
					<NavbarBrand href="/img/logo-edutech.png">
						<img
							src="/img/logo-edutech.png"
							className="h-8 md:h-9 lg:h-9"
							alt="Flowbite React Logo"
						/>
					</NavbarBrand>
				</div>
				<div className="flex gap-3">
					<Dropdown
						arrowIcon={false}
						inline
						label={
							<div className="relative inline-flex bg-slate-100 rounded-full p-2">
								<svg
									className="w-6  h-6 text-[#1294f2] "
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
										d="M12 5.4V3m0 2.4a5.3 5.3 0 0 1 5.1 5.3v1.8c0 2.4 1.9 3 1.9 4.2 0 .6 0 1.3-.5 1.3h-13c-.5 0-.5-.7-.5-1.3 0-1.2 1.9-1.8 1.9-4.2v-1.8A5.3 5.3 0 0 1 12 5.4ZM8.7 18c.1.9.3 1.5 1 2.1a3.5 3.5 0 0 0 4.6 0c.7-.6 1.3-1.2 1.4-2.1h-7Z"
									/>
								</svg>
								<div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-500 rounded-full -top-1 -end-1.5">
									10
								</div>
							</div>
						}
					>
						<DropdownHeader>
							<span className="block text-sm">Notifikasi</span>
						</DropdownHeader>
						<DropdownItem className="w-80">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus,
							minus?
						</DropdownItem>
					</Dropdown>
					<Dropdown
						arrowIcon={false}
						inline
						label={<Avatar alt="User settings" img="/img/user.png" rounded />}
					>
						<Dropdown.Header>
							<span className="block text-sm">Bonnie Green</span>
							<span className="block truncate text-sm font-medium">
								Rekayasa Perangkat Lunak
							</span>
						</Dropdown.Header>
						<Dropdown.Item icon={FaUserLarge}>Lihat Profil</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item icon={HiLogout}>
							<Link to="/">Logout</Link>
						</Dropdown.Item>
					</Dropdown>
				</div>
			</Navbar>
			<div
				className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform mt-6 overflow-y-auto ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} bg-white border-r border-gray-200 sm:translate-x-0`}
			>
				<div className="h-full px-3 space-y-4">
					<Link
						to="/"
						className={`flex items-center px-4 py-2 ${
							location.pathname === "/" ? "bg-gray-200 rounded-md" : ""
						}`}
					>
						<AiFillHome
							className={`mr-2 h-7 w-7 ${
								location.pathname === "/" ? "text-[#1b5fbf]" : "text-gray-500"
							}`}
						/>
						<span
							className={`font-semibold text-lg ${
								location.pathname === "/" ? "text-[#1b5fbf]" : ""
							}`}
						>
							Beranda
						</span>
					</Link>
					<Link
						to="/materi-siswa"
						className={`flex items-center px-4 py-2 ${
							location.pathname === "/materi-siswa"
								? "bg-gray-200 rounded-md"
								: ""
						}`}
					>
						<FaBookBookmark
							className={`mr-2 h-7 w-7 ${
								location.pathname === "/materi-siswa"
									? "text-[#1b5fbf]"
									: "text-gray-500"
							}`}
						/>
						<span
							className={`font-semibold text-lg ${
								location.pathname === "/materi-siswa" ? "text-[#1b5fbf]" : ""
							}`}
						>
							Materi
						</span>
					</Link>
					<Link
						to="/tugas-siswa"
						className={`flex items-center px-4 py-2 ${
							location.pathname === "/tugas-siswa"
								? "bg-gray-200 rounded-md"
								: ""
						}`}
					>
						<FaClipboardList
							className={`mr-2 h-7 w-7 ${
								location.pathname === "/tugas-siswa"
									? "text-[#1b5fbf]"
									: "text-gray-500"
							}`}
						/>
						<span
							className={`font-semibold text-lg ${
								location.pathname === "/tugas-siswa" ? "text-[#1b5fbf]" : ""
							}`}
						>
							Tugas
						</span>
					</Link>
					<Link
						to="/penilaian"
						className={`flex items-center px-4 py-2 ${
							location.pathname === "/penilaian" ? "bg-gray-200 rounded-md" : ""
						}`}
					>
						<FaFileCircleCheck
							className={`mr-2 h-7 w-7 ${
								location.pathname === "/penilaian"
									? "text-[#1b5fbf]"
									: "text-gray-500"
							}`}
						/>
						<span
							className={`font-semibold text-lg ${
								location.pathname === "/penilaian" ? "text-[#1b5fbf]" : ""
							}`}
						>
							Penilaian
						</span>
					</Link>
					<Link
						to="/jadwal"
						className={`flex items-center px-4 py-2 ${
							location.pathname === "/jadwal" ? "bg-gray-200 rounded-md" : ""
						}`}
					>
						<FaCalendarDays
							className={`mr-2 h-7 w-7 ${
								location.pathname === "/jadwal"
									? "text-[#1b5fbf]"
									: "text-gray-500"
							}`}
						/>
						<span
							className={`font-semibold text-lg ${
								location.pathname === "/jadwal" ? "text-[#1b5fbf]" : ""
							}`}
						>
							Jadwal
						</span>
					</Link>
					<div className="relative">
						<button
							className="flex items-center px-4 py-2 w-full text-left"
							onClick={toggleAbsenMenu}
						>
							<FaListCheck
								className={`mr-2 h-7 w-7 ${
									location.pathname === "/rekap-absensi" ||
									location.pathname === "/data-absensi"
										? "text-[#1b5fbf]"
										: "text-gray-500"
								}`}
							/>
							<span
								className={`font-semibold text-lg ${
									location.pathname === "/rekap-absensi" ||
									location.pathname === "/data-absensi"
										? "text-[#1b5fbf]"
										: "text-dark"
								}`}
							>
								Absensi
							</span>
							<FaAngleUp
								className={`ml-auto w-6 h-6 ${
									location.pathname === "/rekap-absensi" ||
									location.pathname === "/data-absensi"
										? "text-[#1b5fbf]"
										: "text-gray-500"
								} dark:text-white transform ${
									absenMenuOpen ? "rotate-180" : ""
								}`}
							/>
						</button>
						{absenMenuOpen && (
							<div className="ml-10 space-y-2">
								<Link
									to="/rekap-absensi"
									className={`block px-4 py-2 ${
										location.pathname === "/rekap-absensi"
											? "bg-gray-200 rounded-md"
											: ""
									}`}
								>
									Rekap Absensi
								</Link>
								<Link
									to="/data-absensi"
									className={`block px-4 py-2 ${
										location.pathname === "/data-absensi"
											? "bg-gray-200 rounded-md"
											: ""
									}`}
								>
									Data Absensi
								</Link>
							</div>
						)}
					</div>
					<div className="relative">
						<button
							className="flex items-center px-4 py-2 w-full text-left"
							onClick={toggleUserMenu}
						>
							<FaUser
								className={`mr-2 h-7 w-7 ${
									location.pathname === "/pengguna-guru" ||
									location.pathname === "/pengguna-siswa"
										? "text-[#1b5fbf]"
										: "text-gray-500"
								}`}
							/>
							<span
								className={`font-semibold text-lg ${
									location.pathname === "/pengguna-guru" ||
									location.pathname === "/pengguna-siswa"
										? "text-[#1b5fbf]"
										: "text-dark"
								}`}
							>
								Pengguna
							</span>
							<FaAngleUp
								className={`ml-auto w-6 h-6 ${
									location.pathname === "/pengguna-guru" ||
									location.pathname === "/pengguna-siswa"
										? "text-[#1b5fbf]"
										: "text-gray-500"
								} dark:text-white transform ${
									userMenuOpen ? "rotate-180" : ""
								}`}
							/>
						</button>
						{userMenuOpen && (
							<div className="ml-10 space-y-2">
								<Link
									to="/pengguna-guru"
									className={`block px-4 py-2 ${
										location.pathname === "/pengguna-guru"
											? "bg-gray-200 rounded-md"
											: ""
									}`}
								>
									Guru
								</Link>
								<Link
									to="/pengguna-siswa"
									className={`block px-4 py-2 ${
										location.pathname === "/pengguna-siswa"
											? "bg-gray-200 rounded-md"
											: ""
									}`}
								>
									Siswa
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
