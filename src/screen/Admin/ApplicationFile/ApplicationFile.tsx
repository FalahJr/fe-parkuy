import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import ModalConfirmation from "../../../components/ModalConfirmation/ModalConfirmation";
import NavbarAdmin from "../../../components/NavbarAdmin/NavbarAdmin";
import Table, { TableColumn } from "../../../components/Table/Table";
import { applicationFileService } from "../../../services";
import {
  dateInterviewRequest,
  DetailDataPetugas,
  getAllPetugas,
} from "../../../types";
import { FaSearch } from "react-icons/fa";

export default () => {
  const [petugas, setPetugas] = useState<Array<getAllPetugas>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [detail, setDetail] = useState<DetailDataPetugas>();
  const [idPetugas, setIdPetugas] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");

  const [isConfirmSuccess, setIsConfirmSuccess] = useState<boolean>(false);
  const [idConfirm, setIdConfirm] = useState<string>("");
  const [idReject, setIdReject] = useState<string>("");
  const [showModalInterview, setShowModalInterview] = useState<boolean>(false);
  const [dateInterview, setDateInterview] = useState<string>();

  // Get All Data Petugas
  const getPetugas = async () => {
    try {
      const response = await applicationFileService.petugas();
      setPetugas(response.data);

      // console.log(response.data.username)
      // console.log("responpetugas",(petugas))
    } catch (error) {
      console.log("error", error);
    }
  };

  // Get Detail Data By Id
  const openModal = async (id: string) => {
    console.log("idnya", id);

    try {
      const response = await applicationFileService.detailPetugas(id);
      setDetail(response.data);
      setIdConfirm(response.data.id_petugas);
      setIdReject(response.data.id_petugas);
      setShowModal(true);
      console.log("nama", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Acc Application File
  const confirmApplication = async (id: string) => {
    console.log("idDelete", id);
    try {
      await applicationFileService.confirmApplication(id);
      // setIsConfirmSuccess(true)
      document.location.reload();
      setShowModal(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const rejectApplication = async (id: string) => {
    console.log("idReject", id);
    try {
      await applicationFileService.rejectApplication(id);
      // setIsConfirmSuccess(true)
      document.location.reload();
      setShowModal(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Set Date Interview
  const openModalInterview = async (id: string) => {
    try {
      const response = await applicationFileService.detailPetugas(id);
      // setDetail(response.data)
      setIdConfirm(response.data.id_petugas);
      setShowModalInterview(true);
      console.log("nama", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const modalInterview = async (id: string) => {
    console.log("idInterview", id);
    console.log("tanggal", dateInterview);
    try {
      const request: dateInterviewRequest = {
        date: String(dateInterview),
      };
      await applicationFileService.dateInterview(id, request);
      // setIsConfirmSuccess(true)
      document.location.reload();
      setShowModal(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    // console.log('detailkedua', detail)

    getPetugas();
    // openModal(value.id_petugas)
    // const token = storageService.getToken()
    // openModal()
  }, []);

  const columnsPosts: TableColumn<getAllPetugas>[] = [
    {
      title: "No",
      key: "id_petugas",
      dataType: "numbering",
    },
    {
      title: "Nama Lengkap",
      key: "fullName",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Domisili",
      key: "cityName",
    },
    {
      title: "No. Hp",
      key: "phone",
    },
    {
      title: "Berkas",
      key: "id_petugas",
      render: (value) => (
        <div className="berkasBtn">
          <Button
            color="btnBerkas"
            name="Pas Foto"
            type="normal"
            size="medium"
          />
          <Button color="btnBerkas" name="KTP" type="normal" size="medium" />
        </div>
      ),
    },
    {
      title: "Interview",
      key: "date",
      render: (value) =>
        // const dateInterview = new Date(value.date)
        value.date === null ? (
          <Button
            color="interview"
            name="Tetapkan Tanggal"
            type="normal"
            size="medium"
            onClick={() => openModalInterview(value.id_petugas)}
          />
        ) : (
          <div>
            {new Date(value.date).getDate()}
            {new Date(value.date).getMonth() === 0
              ? " Januari "
              : new Date(value.date).getMonth() === 1
              ? " Februari "
              : new Date(value.date).getMonth() === 2
              ? " Maret "
              : new Date(value.date).getMonth() === 3
              ? " April "
              : new Date(value.date).getMonth() === 4
              ? " Mei "
              : new Date(value.date).getMonth() === 5
              ? " Juni "
              : new Date(value.date).getMonth() === 6
              ? " Juli "
              : new Date(value.date).getMonth() === 7
              ? " Agustus "
              : new Date(value.date).getMonth() === 8
              ? " September "
              : new Date(value.date).getMonth() === 9
              ? " Oktober "
              : new Date(value.date).getMonth() === 10
              ? " November "
              : new Date(value.date).getMonth() === 11
              ? " Desember "
              : null}
            {new Date(value.date).getFullYear()}
          </div>
        ),
    },
    {
      title: "Action",
      key: "id_petugas",
      render: (value) => (
        <Button
          // id="value.id_petugas"
          color="detail"
          name="..."
          type="normal"
          size="medium"
          // parsing parameter id ke func modal
          onClick={() => openModal(value.id_petugas)}
          // onClick={()=> console.log("idpetugas", value.fullName)}
        />
      ),
    },
  ];
  return (
    <>
      <NavbarAdmin title="Kelola Berkas Pelamar" />
      <div className="table-content location">
        <div className="table-container">
          <div className="search-form">
            <form className="search">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
          </div>
          <Table columns={columnsPosts} data={petugas} />
        </div>
      </div>
      {detail?.date != null ? (
        <Modal
          visible={showModal}
          title="Berkas Pelamar"
          onCancel={() => setShowModal(false)}
          onOk={() => confirmApplication(idConfirm)}
          okText="Terima"
          onReject={() => rejectApplication(idReject)}
        >
          <form action="">
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="namaLengkap">Nama Lengkap</label>
                <input
                  type="text"
                  name="namaLengkap"
                  placeholder="Masukkan Nama Lengkap"
                  value={detail?.fullName}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="domisili">Domisili</label>
                <input
                  type="text"
                  name="domisili"
                  placeholder="Masukkan Domisili"
                  value={detail?.cityName}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Masukkan Email"
                  value={detail?.user.email}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="noHp">No HP</label>
                <input
                  type="text"
                  name="noHp"
                  placeholder="Masukkan No HP"
                  value={detail?.phone}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="alamat">Alamat</label>
                <textarea name="alamat" id="alamat" cols={20} rows={8} disabled>
                  {detail?.address}
                </textarea>
              </div>
            </div>
          </form>
        </Modal>
      ) : (
        <Modal
          visible={showModal}
          title="Berkas Pelamar"
          onCancel={() => setShowModal(false)}
          okText="Tolak"
          onReject={() => rejectApplication(idReject)}
        >
          <form action="">
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="namaLengkap">Nama Lengkap</label>
                <input
                  type="text"
                  name="namaLengkap"
                  placeholder="Masukkan Nama Lengkap"
                  value={detail?.fullName}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="domisili">Domisili</label>
                <input
                  type="text"
                  name="domisili"
                  placeholder="Masukkan Domisili"
                  value={detail?.cityName}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Masukkan Email"
                  value={detail?.user.email}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="noHp">No HP</label>
                <input
                  type="text"
                  name="noHp"
                  placeholder="Masukkan No HP"
                  value={detail?.phone}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="alamat">Alamat</label>
                <textarea name="alamat" id="alamat" cols={20} rows={8} disabled>
                  {detail?.address}
                </textarea>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {showModalInterview ? (
        <ModalConfirmation
          visible={showModalInterview}
          onCancel={() => setShowModalInterview(false)}
          onOk={() => modalInterview(idConfirm)}
        >
          <form action="">
            <div className="form-input">
              <input
                type="datetime-local"
                name="date"
                onChange={(e) => setDateInterview(String(e.target.value))}
                style={{ width: 200, height: 50 }}
              />
            </div>
          </form>
        </ModalConfirmation>
      ) : null}
    </>
  );
};

// export default ApplicationFile;
