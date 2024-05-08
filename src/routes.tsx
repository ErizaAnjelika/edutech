import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import MateriSiswa from "./pages/Materi/Materi Siswa/MateriSiswa";
import TugasSiswa from "./pages/Tugas/Tugas Siswa/TugasSiswa";
import MateriGuru from "./pages/Materi/Materi Guru/MateriGuru";
import TugasGuru from "./pages/Tugas/Tugas Guru/TugasGuru";
import Penilaian from "./pages/Penilaian/Penilaian";
import Koreksi from "./pages/Penilaian/Koreksi/Koreksi";
import Mapel from "./pages/Mapel/Mapel";
import Guru from "./pages/Pengguna/Guru/Guru";
import Siswa from "./pages/Pengguna/Siswa/Siswa";
import BerandaSiswa from "./pages/Beranda/BerandaSiswa/BerandaSiswa";
import AbsensiAdmin from "./pages/Absensi/RekapAbsensi/AbsensiAdmin";
import HasilAbsensiAdmin from "./pages/Absensi/HasilAbsensiAdmin/HasilAbsensiAdmin";
import JadwalAdmin from "./pages/Jadwal/JadwalAdmin/JadwalAdmin";
import TambahJadwalAdmin from "./pages/Jadwal/JadwalAdmin/TambahJadwalAdmin/TambahJadwalAdmin";
import EditJadwalAdmin from "./pages/Jadwal/JadwalAdmin/EditJadwalAdmin/EditJadwalAdmin";
import TambahSiswa from "./pages/Pengguna/Siswa/TambahSiswa/TambahSiswa";
import EditSiswa from "./pages/Pengguna/Siswa/EditSiswa/EditSiswa";
import TambahGuru from "./pages/Pengguna/Guru/TambahGuru/TambahGuru";
import EditGuru from "./pages/Pengguna/Guru/EditGuru/EditGuru";
import ProfilSiswa from "./pages/Profile/ProfilSiswa/ProfilSiswa";
import ProfilGuru from "./pages/Profile/ProfilGuru/ProfilGuru";
import BerandaAdmin from "./pages/Beranda/BerandaAdmin/BerandaAdmin";
import BerandaGuru from "./pages/Beranda/BerandaGuru/BerandaGuru";
import JadwalSiswa from "./pages/Jadwal/JadwalSiswa/JadwalSiswa";
import ProtectedRoute from "./hoc/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/beranda-siswa",
    element: (
      <ProtectedRoute>
        <BerandaSiswa />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/beranda-guru",
    element: (
      <ProtectedRoute>
        <BerandaGuru />
      </ProtectedRoute>
    ),
  },
  {
    path: "/beranda-admin",
    element: (
      <ProtectedRoute>
        <BerandaAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tugas-siswa",
    element: (
      <ProtectedRoute>
        <TugasSiswa />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tugas-guru",
    element: (
      <ProtectedRoute>
        <TugasGuru />
      </ProtectedRoute>
    ),
  },
  {
    path: "/materi-siswa",
    element: (
      <ProtectedRoute>
        <MateriSiswa />
      </ProtectedRoute>
    ),
  },
  {
    path: "/materi-guru",
    element: (
      <ProtectedRoute>
        <MateriGuru />
      </ProtectedRoute>
    ),
  },
  {
    path: "/penilaian",
    element: (
      <ProtectedRoute>
        <Penilaian />
      </ProtectedRoute>
    ),
  },
  {
    path: "/penilaian/koreksi/:id",
    element: (
      <ProtectedRoute>
        <Koreksi />
      </ProtectedRoute>
    ),
  },
  {
    path: "/mapel",
    element: (
      <ProtectedRoute>
        <Mapel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/rekap-absensi",
    element: (
      <ProtectedRoute>
        <AbsensiAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/data-absensi",
    element: (
      <ProtectedRoute>
        <HasilAbsensiAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/jadwal-admin",
    element: (
      <ProtectedRoute>
        <JadwalAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/jadwal-siswa",
    element: (
      <ProtectedRoute>
        <JadwalSiswa />
      </ProtectedRoute>
    ),
  },
  {
    path: "/jadwal-admin/tambah-jadwal",
    element: (
      <ProtectedRoute>
        <TambahJadwalAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/jadwal-admin/edit-jadwal/:id",
    element: (
      <ProtectedRoute>
        <EditJadwalAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pengguna-guru",
    element: (
      <ProtectedRoute>
        <Guru />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pengguna-guru/tambah-guru",
    element: (
      <ProtectedRoute>
        <TambahGuru />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pengguna-guru/edit-guru/:id",
    element: (
      <ProtectedRoute>
        <EditGuru />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pengguna-siswa",
    element: (
      <ProtectedRoute>
        <Siswa />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pengguna-siswa/tambah-siswa",
    element: (
      <ProtectedRoute>
        <TambahSiswa />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pengguna-siswa/edit-siswa/:id",
    element: (
      <ProtectedRoute>
        <EditSiswa />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile-siswa",
    element: (
      <ProtectedRoute>
        <ProfilSiswa />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile-guru",
    element: (
      <ProtectedRoute>
        <ProfilGuru />
      </ProtectedRoute>
    ),
  },
]);
export default router;
