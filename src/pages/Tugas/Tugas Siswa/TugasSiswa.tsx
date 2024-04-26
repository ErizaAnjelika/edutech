import { FileInput, Tabs, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navigation from "../../../component/Navigation/Navigation";
import {
  useCreateAssignmentSubmissions,
  useEditAssignmentSubmission,
} from "../../../services/mutation";
import {
  useAssignments,
  useAssignmentsIds,
  useAssignmentSubmissions,
} from "../../../services/queries";
import { Pengumpulan } from "../../../types/pengumpulan";
import axios from "axios";

const TugasSiswa = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState("file");
  const assignmentsIdsQuery = useAssignmentsIds();
  const assignmentsQueries = useAssignments(assignmentsIdsQuery.data);
  const assignmentSubmissionsQueries = useAssignmentSubmissions([
    selectedCardId,
  ]);
  const createAssignmentSubmissions = useCreateAssignmentSubmissions();
  const editAssignmentSubmissionMutation = useEditAssignmentSubmission();
  const assignmentSubmissionsData = assignmentSubmissionsQueries[0].data;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<Pengumpulan>();
  // const [assignmentId, setAssignmentId] = useState(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  // useEffect(() => {
  // 	// Panggil fungsi untuk mendapatkan assignmentId saat komponen dimuat
  // 	fetchAssignmentId();
  // }, []);

  // const fetchAssignmentId = async () => {
  //     try {
  //         // Mengambil assignmentId dari link API
  //         const response = await axios.get('http://192.168.139.239:13311/api/Assignments/{id}');
  //         // Set assignmentId yang diperoleh dari respons server
  //         setAssignmentId(response.data.assignmentId);
  //     } catch (error) {
  //         console.error('Error fetching assignmentId:', error);
  //     }
  // };

  // const handleFormSubmit = async (formData, id) => {
  // 	try {
  // 		// Pastikan assignmentId telah diperoleh sebelum membuat permintaan untuk mengedit pengumpulan tugas
  // 		if (!id) {
  // 			console.error("AssignmentId is not available");
  // 			return;
  // 		}
  // 		// Panggil mutasi untuk mengedit pengumpulan tugas dengan assignmentId yang telah diperoleh
  // 		await editAssignmentSubmissionMutation.mutateAsync({
  // 			...formData,
  // 			assignmentId: id,
  // 		});
  // 		console.log("Assignment submission edited successfully!");
  // 	} catch (error) {
  // 		console.error("Error editing assignment submission:", error);
  // 	}
  // };

  // Fungsi untuk menangani pengiriman formulir
  const handleUpdateAssignmentSubmissions = async (formData, assignmentId) => {
    try {
      // Dapatkan studentId menggunakan fungsi getStudentIdFromToken
      const studentId = getStudentIdFromToken();

      // Persiapkan data yang akan dikirim ke API
      let requestBody;
      if (selectedOption === "file") {
        requestBody = {
          fileData: formData.fileData,
          type: "file",
        };
      } else if (selectedOption === "link") {
        requestBody = {
          link: formData.link,
          type: "link",
        };
      }

      // Lakukan pengiriman data ke API
      const response = await fetch(
        `http://192.168.139.239:13311/api/AssignmentSubmissions/student/${studentId}/assignment/${assignmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Periksa status respons
      if (!response.ok) {
        throw new Error("Failed to update assignment submissions");
      }

      // Handle respons jika perlu
      const responseData = await response.json();
      console.log("Assignment submissions updated successfully:", responseData);

      // Setelah pembaruan berhasil, Anda dapat melakukan tindakan tambahan, seperti memberi notifikasi atau memperbarui tampilan
    } catch (error) {
      // Tangani kesalahan jika ada
      console.error("Error updating assignment submissions:", error);
    }
  };

  const getStudentIdFromToken = () => {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload?.StudentId || null;
    }
    return null;
  };

  const handleCardClick = async (id: any) => {
    setIsLoading(true);
    setSelectedCardId(id);
    const studentId = getStudentIdFromToken();
    const assignmentId = id;

    // Persiapkan data untuk dikirim ke API
    const data = {
      studentId: studentId,
      assignmentId: assignmentId,
    };

    try {
      // Kirim data ke API
      await createAssignmentSubmissions.mutate(data);
      console.log("Data berhasil dikirim ke API:", data);

      // Panggil fungsi handleUpdateAssignmentSubmissions dengan assignmentId yang diperoleh dari handleCardClick
      await handleUpdateAssignmentSubmissions(formData, assignmentId);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengirim data:", error);
    }

    // Setelah mengirimkan data, perbarui selectedCard
    setSelectedCard({
      ...assignmentsQueries.find(({ data }) => data?.id === id)?.data,
      studentId: studentId,
      assignmentId: assignmentId,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      // Fungsi untuk menentukan apakah tampilan sedang pada mode mobile atau tidak
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    // Pengecekan awal saat komponen dipasang
    handleResize();

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div>
      <Navigation />
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* left side */}
          <div>
            <div className=" mt-14 flex justify-between">
              <h1 className="text-3xl font-bold font-mono">Tugas</h1>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {assignmentsQueries.map(({ data }) => (
                <div
                  key={data?.id}
                  onClick={() => handleCardClick(data?.id)}
                  className={`cursor-pointer flex flex-col gap-3 bg-white rounded-lg `}
                >
                  <div
                    className={`flex justify-between items-center  shadow-sm p-3 gap-2 hover:bg-[#fdefc8] hover:rounded-lg ${
                      selectedCardId === data?.id
                        ? "bg-[#fdefc8] rounded-lg"
                        : ""
                    }`}
                  >
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
                          {data?.courseName}
                        </p>
                        <h2 className="text-md font-medium">
                          {data?.assignmentName}
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
                              {data?.assignmentDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="bg-orange-200 text-orange-500 text-xs w-32 md:w-24 md:sm font-medium px-1 py-1 md:px-1.5 md:py-1.5 rounded-full text-center border border-orange-500 capitalize">
                      status
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* right side */}
          {selectedCard &&
            (isMobileView ? (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
                <div className="bg-white p-4 rounded-lg w-full sm:max-w-md overflow-y-auto h-full">
                  <div className="flex justify-end">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        closeModal();
                        setSelectedCardId(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                  <Tabs aria-label="Tabs with underline" style="underline">
                    <Tabs.Item active title="Deskripsi">
                      <p>
                        {isLoading
                          ? "Memuat File ..."
                          : selectedCard.assignmentDescription}
                      </p>
                      <h1 className="text-2xl font-bold mt-8">Tugas</h1>
                      <div className="mt-5 flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]">
                        <div className="flex gap-3">
                          <div className="bg-white rounded-lg h-14 flex items-center">
                            <svg
                              className="w-12 h-12 text-blue-600 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-lg font-semibold">
                              {isLoading
                                ? "Memuat File ..."
                                : selectedCard.assignmentFileName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Tabs.Item>
                    <Tabs.Item title="Pengumpulan">
                      <p className="text-md font-bold">Informasi Pengumpulan</p>
                      <div className="relative overflow-x-auto sm:rounded-lg mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">Judul Tugas</td>
                              <td className="px-6 py-4 float-end">
                                {isLoading
                                  ? "Memuat File ..."
                                  : selectedCard.assignmentName}
                              </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">Jenis Pengumpulan</td>
                              <td className="px-6 py-4 float-end">File</td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">Batas Pengumpulan</td>
                              <td className="px-6 py-4 float-end">
                                <div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 w-32">
                                  <h2 className="text-center text-orange-500 font-semibold text-sm">
                                    {isLoading
                                      ? "Memuat File ..."
                                      : selectedCard.assignmentDeadline}
                                  </h2>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <p className="text-md font-bold mt-4">
                          Pengumpulan Tugas
                        </p>
                        <div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 mt-3">
                          <h2 className="p-2 text-orange-500 font-semibold text-sm">
                            Mengumpulkan ataupun mengubah jawaban setelah
                            deadline berakhir akan dikenai pengurangan nilai
                          </h2>
                        </div>
                        <div className=" flex gap-5">
                          <div
                            className="flex items-center gap-2 mt-5"
                            onClick={() => handleOptionChange("file")}
                          >
                            <input
                              type="radio"
                              id="file"
                              name="submissionOption"
                              value="file"
                              checked={selectedOption === "file"}
                            />
                            <label htmlFor="file">File</label>
                          </div>
                          <div
                            className="flex items-center gap-2 mt-5"
                            onClick={() => handleOptionChange("link")}
                          >
                            <input
                              type="radio"
                              id="link"
                              name="submissionOption"
                              value="link"
                              checked={selectedOption === "link"}
                            />
                            <label htmlFor="link">Link</label>
                          </div>
                        </div>
                        {selectedOption === "file" && (
                          <div id="fileUpload" className="mt-4">
                            <FileInput id="file" />
                          </div>
                        )}
                        {selectedOption === "link" && (
                          <div id="linkInput" className="mt-4">
                            <TextInput
                              id="link"
                              type="text"
                              placeholder="Masukkan url atau link yang valid disini"
                              required
                            />
                          </div>
                        )}
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
                        >
                          Kirim
                        </button>
                      </div>
                    </Tabs.Item>
                    <Tabs.Item title="Nilai">
                      {assignmentSubmissionsData &&
                        assignmentSubmissionsData.map(
                          (assignmentSubmission, index) => {
                            const { isLoading, error } =
                              assignmentSubmissionsQueries[index];

                            if (isLoading) return <p>Loading...</p>;
                            if (error) return <p>Error: {error.message}</p>;

                            return (
                              <div key={index}>
                                <p className="text-md font-bold">
                                  Informasi Tugas
                                </p>
                                <div className="relative overflow-x-auto sm:rounded-lg mt-4">
                                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <tbody>
                                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                          Judul Tugas
                                        </td>
                                        <td className="px-6 py-4 float-end">
                                          {selectedCard
                                            ? selectedCard.assignmentName
                                            : "Tugas"}
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">Status</td>
                                        <td className="px-6 py-4 float-end">
                                          {assignmentSubmission.status
                                            ? "Sudah Dikoreksi"
                                            : "Belum Dikoreksi"}
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">Nilai</td>
                                        <td className="px-6 py-4 float-end">
                                          {assignmentSubmission.grade ||
                                            "Belum ada nilai"}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div>
                                  <p className="text-md font-bold mt-4">
                                    Review Guru
                                  </p>
                                  <div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 mt-3">
                                    <h2 className="p-2 text-orange-500 font-semibold text-sm">
                                      {assignmentSubmission.comment ||
                                        "Belum ada review"}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </Tabs.Item>
                  </Tabs>
                </div>
              </div>
            ) : (
              <div>
                <div className="border rounded-lg shadow-sm p-3 mt-14 px-4 bg-white">
                  <div className="flex justify-end">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        closeModal();
                        setSelectedCardId(null);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                  <Tabs aria-label="Tabs with underline" style="underline">
                    <Tabs.Item active title="Deskripsi">
                      <p>
                        {isLoading
                          ? "Memuat File ..."
                          : selectedCard.assignmentDescription}
                      </p>
                      <h1 className="text-2xl font-bold mt-8">Tugas</h1>
                      <div className="mt-5 flex justify-between items-center border rounded-lg shadow-sm p-3 gap-2 bg-[#E7F6FF]">
                        <div className="flex gap-3">
                          <div className="bg-white rounded-lg h-14 flex items-center">
                            <svg
                              className="w-12 h-12 text-blue-600 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4v11c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Zm-.3 9.3c.4.4.4 1 0 1.4L9.4 14l1.3 1.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 0 1 1.4 0Zm2.6 1.4a1 1 0 0 1 1.4-1.4l2 2c.4.4.4 1 0 1.4l-2 2a1 1 0 0 1-1.4-1.4l1.3-1.3-1.3-1.3Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-lg font-semibold">
                              {isLoading
                                ? "Memuat File ..."
                                : selectedCard.assignmentFileName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Tabs.Item>
                    <Tabs.Item title="Pengumpulan">
                      <p className="text-md font-bold">Informasi Pengumpulan</p>
                      <div className="relative overflow-x-auto sm:rounded-lg mt-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                          <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">Judul Tugas</td>
                              <td className="px-6 py-4 float-end">
                                {isLoading
                                  ? "Memuat File ..."
                                  : selectedCard.assignmentName}
                              </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">Jenis Pengumpulan</td>
                              <td className="px-6 py-4 float-end">File</td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <td className="px-6 py-4">Batas Pengumpulan</td>
                              <td className="px-6 py-4 float-end">
                                <div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 w-32">
                                  <h2 className="text-center text-orange-500 font-semibold text-sm">
                                    {isLoading
                                      ? "Memuat File ..."
                                      : selectedCard.assignmentDeadline}
                                  </h2>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <form
                          action=""
                          onSubmit={handleSubmit(
                            handleUpdateAssignmentSubmissions
                          )}
                        >
                          <p className="text-md font-bold mt-4">
                            Pengumpulan Tugas
                          </p>
                          <div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 mt-3">
                            <h2 className="p-2 text-orange-500 font-semibold text-sm">
                              Mengumpulkan ataupun mengubah jawaban setelah
                              deadline berakhir akan dikenai pengurangan nilai
                            </h2>
                          </div>
                          <div className="flex gap-5">
                            <div
                              className="flex items-center gap-2 mt-5"
                              onClick={() => handleOptionChange("file")}
                            >
                              <input
                                type="radio"
                                id="file"
                                name="submissionOption"
                                value="file"
                                checked={selectedOption === "file"}
                              />
                              <label htmlFor="file">File</label>
                            </div>
                            <div
                              className="flex items-center gap-2 mt-5"
                              onClick={() => handleOptionChange("link")}
                            >
                              <input
                                type="radio"
                                id="link"
                                name="submissionOption"
                                value="link"
                                checked={selectedOption === "link"}
                              />
                              <label htmlFor="link">Link</label>
                            </div>
                          </div>
                          {selectedOption === "file" && (
                            <div id="fileUpload" className="mt-4">
                              <FileInput
                                id="fileData"
                                {...register("fileData")}
                              />
                            </div>
                          )}
                          {selectedOption === "link" && (
                            <div id="linkInput" className="mt-4">
                              <TextInput
                                id="link"
                                type="text"
                                placeholder="Masukkan url atau link yang valid disini"
                                {...register("link")}
                              />
                            </div>
                          )}
                          <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 w-32"
                          >
                            Kirim
                          </button>
                        </form>
                      </div>
                    </Tabs.Item>
                    <Tabs.Item title="Nilai">
                      {assignmentSubmissionsData &&
                        assignmentSubmissionsData.map(
                          (assignmentSubmission, index) => {
                            const { isLoading, error } =
                              assignmentSubmissionsQueries[index];

                            if (isLoading) return <p>Loading...</p>;
                            if (error) return <p>Error: {error.message}</p>;

                            return (
                              <div key={index}>
                                <p className="text-md font-bold">
                                  Informasi Tugas
                                </p>
                                <div className="relative overflow-x-auto sm:rounded-lg mt-4">
                                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <tbody>
                                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                          Judul Tugas
                                        </td>
                                        <td className="px-6 py-4 float-end">
                                          {selectedCard
                                            ? selectedCard.assignmentName
                                            : "Tugas"}
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">Status</td>
                                        <td className="px-6 py-4 float-end">
                                          {assignmentSubmission.status === 1 ||
                                          assignmentSubmission.status === 2
                                            ? "Belum Dikoreksi"
                                            : "Sudah Dikoreksi"}
                                        </td>
                                      </tr>
                                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">Nilai</td>
                                        <td className="px-6 py-4 float-end">
                                          {assignmentSubmission.grade ||
                                            "Belum ada nilai"}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div>
                                  <p className="text-md font-bold mt-4">
                                    Review Guru
                                  </p>
                                  <div className="bg-orange-200 p-1 rounded-2xl border-2 border-orange-400 mt-3">
                                    <h2 className="p-2 text-orange-500 font-semibold text-sm">
                                      {assignmentSubmission.comment ||
                                        "Belum ada review"}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </Tabs.Item>
                  </Tabs>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TugasSiswa;
