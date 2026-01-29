import { useEffect, useReducer, useState } from "react"
import { FaCar, FaMotorcycle, FaRegTrashAlt, FaRegEye, FaSearch } from "react-icons/fa";
import NavbarAdmin from "../../../components/NavbarAdmin/NavbarAdmin";
import Button from "../../../components/Button/Button";
import Table, { TableColumn } from "../../../components/Table/Table";
import Modal from "../../../components/Modal/Modal";
import ModalConfirmation from "../../../components/ModalConfirmation/ModalConfirmation";
import { CreateLocationRequest, DetailLocationResponse, EditStatusLocationRequest, getLocationResponse } from "../../../types/interface/Location/getLocation";
import { locationService } from "../../../services";
import reducer from "./Location.reducer";

export default () => {

  const [location, setLocation] = useState<Array<getLocationResponse>>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [detail, setDetail] = useState<DetailLocationResponse>()
  const [deleteLocation, setDeleteLocation] = useState<DetailLocationResponse>()
  const [idDelete, setIdDelete] = useState<string>('')
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

  // Use State Create
  const [locationName, setLocationName] = useState<string>('')
  const [cityName, setCityName] = useState<string>('')
  const [motorCycle, setMotorCycle] = useState<string>('')
  const [car, setCar] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [coordinate, setCoordinate] = useState<string>('')
  const [rate, setRate] = useState<string>('')
  const [status, setStatus] = useState<boolean>(false)

  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false)
  const [isDeleteSuccess, setIsDeleteSuccess] = useState<boolean>(false)
  const [isEnableInput, setIsEnableInput] = useState<boolean>(false)

  const [sending, setSending] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>()

  // Get All Data Location
  const getLocation = async () => {
    try {
      const response = await locationService.location()
      setLocation(response.data)
      // console.log(response.data.username)
      // console.log("responpetugas",(petugas))
    } catch (error) {
      console.log("error", error)
    }
  }

  // Get Detail Data By Id
  const openModal = async (id: string) => {
    console.log('idnya', id)

    try {
      const response = await locationService.detailLocation(id)
      setDetail(response.data)
      setShowModal(true)
      setLocationName(response.data.locationName)
      setCityName(response.data.cityName)
      setCar(String(response.data.car))
      setMotorCycle(String(response.data.motorCycle))
      setRate(String(response.data.rate))
      setAddress(response.data.address)
      setCoordinate(response.data.coordinate)
      // document.getElementById("locationName").defaultValue = (response.data.locationName);
      console.log('nama', locationName)


      // const { isSubmitted, inputs } = state
      // const { email, password } = inputs
    } catch (error) {
      console.log("error", error)
    }
  }

  // close modal edit
  const closeModalEdit = () => {
    setIsEnableInput(false)
    setShowModal(false)
  }
  // Get ID for Delete
  const openModalConfirmation = async (id: string) => {
    console.log('idnya', id)

    try {
      const response = await locationService.detailLocation(id)
      setDeleteLocation(response.data)
      setIdDelete(response.data.id_location)
      setShowModalDelete(true)

      // setDetail(response.data)
      console.log('nama', response.data.id_location)
    } catch (error) {
      console.log("error", error)
    }
  }

  // Delete Location
  const modalDelete = async (id: string) => {
    // console.log('idDelete',id)
    try {
      await locationService.deleteLocation(id)
      setIsDeleteSuccess(true)
      document.location.reload()
      setShowModalCreate(false)
    } catch (error) {
      console.log("error", error)
    }
  }

  // Open Modal Create
  const openModalCreate = () => {
    setShowModalCreate(true)
  }

  // Create Location
  const modalCreate = async () => {
    console.log('location', locationName)
    console.log('city', cityName)
    console.log('motor', motorCycle)
    console.log('car', car)
    console.log('address', address)
    console.log('coordinate', coordinate)
    console.log('rate', rate)
    setSending(true)
    try {
      const request: CreateLocationRequest = {
        locationName: locationName,
        cityName: cityName,
        motorCycle: parseInt(motorCycle),
        car: parseInt(car),
        availableCars: parseInt(car),
        availableMotorCycles: parseInt(motorCycle),
        address: address,
        coordinate: coordinate,
        rate: parseInt(rate
        )
      }
      await locationService.create(request)

      setLocationName('')
      setCityName('')
      setMotorCycle('0')
      setCar('0')
      setAddress('')
      setCoordinate('')
      setRate('0')
      setSending(false)
      document.location.reload()
      setShowModalCreate(false)
      setIsRegisterSuccess(true)

    } catch (error: any) {
      // Error Handling
      console.log(error)
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      setSending(false)
      if (error && error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message)
        setShowModalCreate(true)

      }
    }
  }


  // Edit Data

  const modalEdit = async (id: string) => {
    // setIsEnableInput(false)
    console.log('idEdit', id)
    console.log('location', locationName)
    console.log('city', cityName)
    console.log('motor', motorCycle)
    console.log('car', car)
    console.log('address', address)
    console.log('coordinate', coordinate)
    console.log('rate', rate)
    console.log('status', status)

    setSending(true)
    try {
      const request: CreateLocationRequest = {
        locationName: locationName,
        cityName: cityName,
        motorCycle: parseInt(motorCycle),
        car: parseInt(car),
        availableCars: parseInt(car),
        availableMotorCycles: parseInt(motorCycle),
        address: address,
        coordinate: coordinate,
        rate: parseInt(rate)
      }
      const requestStatus: EditStatusLocationRequest ={
        status: status
      }
      await locationService.editLocation(id, request)
      await locationService.editStatusLocation(id, requestStatus)

      // setIsRegisterSuccess(true)
      setLocationName('')
      setCityName('')
      setMotorCycle('0')
      setCar('0')
      setAddress('')
      setCoordinate('')
      setRate('0')
      setStatus(false)
      setSending(false)
      document.location.reload()
      setShowModalCreate(false)

    } catch (error: any) {
      // Error Handling
      console.log(error)
      console.log(error.response);
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      setSending(false)
      if (error && error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message)
        setShowModalCreate(true)

      }
    }
  }
  useEffect(() => {
    // console.log('detailkedua', detail?detail?.locationName)

    getLocation()
    // openModal()
    // const token = storageService.getToken()
    // openModal()

  }, [])
  const columnsPosts: TableColumn<getLocationResponse>[] = [
    {
      title: "No",
      key: "id_location",
      dataType: "numbering"
    },
    {
      title: "Nama Lokasi",
      key: "locationName"
    },
    {
      title: "Kota/Kabupaten",
      key: "cityName"
    },
    {
      title: "Kapasitas",
      key: "id_location",
      render: (value) =>
        <>
          <div className="capacity">

            <div className="count-vehicle">
              <div>
                <FaCar />
              </div>
              <div>
                {value.car}
              </div>
            </div>
            <div className="count-vehicle">
              <div>
                <FaMotorcycle />
              </div>
              <div>
                {value.motorCycle}
              </div>
            </div>
          </div>
        </>
    },
    {
      title: "Alamat",
      key: "address"
    },
    // {
    //   title: "Koordinat",
    //   key: "coordinate",
    //   render: (value) =>
    //     <div className="coordinate">
    //       {value.coordinate}
    //     </div>
    // },
    {
      title: "Status",
      key: "status",
      render: (value) =>

        <div className="statusLocation">
          {value.status == 0 ?
            <button className="red"></button>
            :
            <button className="green"></button>
          }
        </div>
    },
    {
      title: "Action",
      key: "id_petugas",
      render: (value) =>
        <>
          <div className="action-location">
            <Button
              // id="value.id_petugas"
              color="primary"
              name={<FaRegEye />}
              type="normal"
              size="medium"
              style={{ height: 40, width: 40 }}

              // parsing parameter id ke func modal
              onClick={() => openModal(value.id_location)}
            />
            <Button
              // id="value.id_petugas"
              color="secondary"
              name={<FaRegTrashAlt />}
              type="normal"
              size="medium"
              style={{ height: 37, width: 37 }}
              // parsing parameter id ke func modal
              onClick={() => openModalConfirmation(value.id_location)}
            // onClick={()=> console.log("idpetugas", value.fullName)}
            />
          </div>
        </>
    },
  ]
  return (
    <>

      <NavbarAdmin
        title="Kelola Data Parkir"
      />

      <div className="table-content location">
        {/* <button onClick={() => setShowModal(true)}>Buka</button> */}

        <div className="table-container">
          <div className="search-form">
            <form className="search">
              <input type="text" placeholder="Search.." name="search" />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
            <Button
              name="Tambah Lokasi"
              color="interview"
              // style={{ marginBottom: 20 }}
              onClick={() => openModalCreate()}
            />
          </div>
          {isRegisterSuccess ? (
            <span>Pendaftaran Berhasil</span>
          ) : null}
          {isDeleteSuccess ? (
            <span>Delete Berhasil</span>
          ) : null}
          <Table columns={columnsPosts} data={location} />
        </div>
      </div>

      {/* Modal Get All Lokasi */}
      {!isEnableInput ?
        <Modal visible={showModal} title="Data Lokasi Parkir" onCancel={() => setShowModal(false)} onOk={() => setIsEnableInput(true)} okText="Edit">
          <form action="">
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="nama">
                  Nama Lokasi Parkir
                </label>
                <input
                  type="text"
                  name="namaLokasi"
                  placeholder="Masukkan Nama Lokasi"
                  value={detail?.locationName}
                  disabled
                />

              </div>
              <div className="form-input">
                <label htmlFor="kotakabupaten">
                  Kota/Kabupaten
                </label>
                <input
                  type="text"
                  name="kotakabupaten"
                  placeholder="Masukkan Kota / Kabupaten"
                  value={detail?.cityName}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="">
                  Kapasitas
                </label>
                <div className="input-kapasitas">
                  <div className="form-group-kapasitas">
                    <input
                      type="number"
                      name="kapasitas"
                      placeholder="Masukkan kapasitas"
                      value={detail?.car}
                      disabled
                    />
                    <label htmlFor="">
                      Mobil
                    </label>
                  </div>
                  <div className="form-group-kapasitas">
                    <input
                      type="number"
                      name="kapasitas"
                      placeholder="Masukkan kapasitas"
                      value={detail?.motorCycle}
                      disabled
                    />
                    <label htmlFor="">
                      Sepeda Motor
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="kotakabupaten">
                  Tarif
                </label>
                <input
                  type="number"
                  name="kotakabupaten"
                  placeholder="Masukkan Tarif"
                  value={detail?.rate}
                  disabled
                />
              </div>
              <div className="form-input">
                <label htmlFor="alamat">
                  Alamat
                </label>
                <textarea name="alamat" cols={20} rows={8} disabled
                >
                  {detail ? detail?.address : null}
                </textarea>
              </div>
              <div className="form-input">
                <div className="koordinat-status">
                  <label htmlFor="koordinat">
                    Koordinat
                  </label>
                  <input
                    type="text"
                    name="koordinat"
                    placeholder="Masukkan koordinat"
                    value={detail?.coordinate}
                    disabled
                  />
                </div>
                <div className="koordinat-status">
                  <label htmlFor="status">
                    Status
                  </label>
                  <select name="status" disabled>
                    {detail?.status == false ?
                      <option value="0">Tidak Aktif</option>
                      : <option value="1">Aktif</option>
                    }
                  </select>
                </div>
              </div>
            </div>
          </form>
        </Modal>
        :
        <Modal visible={showModal} title="Data Lokasi Parkir" onCancel={() => closeModalEdit()} onOk={() => modalEdit(String(detail?.id_location))} okText="Simpan">
          <form action="">
            <div className="form-group">
              <div className="form-input">
                <label htmlFor="locationName">
                  Nama Lokasi Parkir
                </label>
                <input
                  type="text"
                  name="locationName"
                  value={locationName}
                  id="locationName"
                  onChange={e => setLocationName(e.target.value)}
                />
              </div>
              <div className="form-input">
                <label htmlFor="cityName">
                  Kota/Kabupaten
                </label>
                <input
                  type="text"
                  name="cityName"
                  value={cityName}
                  onChange={e => setCityName(e.target.value)}
                />
              </div>
              <div className="form-input">
                <label htmlFor="">
                  Kapasitas
                </label>
                <div className="input-kapasitas">
                  <div className="form-group-kapasitas">
                    <input
                      type="number"
                      name="car"
                      placeholder="Masukkan kapasitas"
                      value={car}
                      onChange={e => setCar(e.target.value)}
                    />
                    <label htmlFor="car">
                      Mobil
                    </label>
                  </div>
                  <div className="form-group-kapasitas">
                    <input
                      type="number"
                      name="motorCycle"
                      placeholder="Masukkan kapasitas"
                      value={motorCycle}
                      onChange={e => setMotorCycle(e.target.value)}

                    />
                    <label htmlFor="motorCycle">
                      Sepeda Motor
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-input">
                <label htmlFor="rate">
                  Tarif
                </label>
                <input
                  type="number"
                  name="rate"
                  placeholder="Masukkan Tarif"
                  value={rate}
                  onChange={e => setRate(e.target.value)}

                />
              </div>
              <div className="form-input">
                <label htmlFor="address">
                  Alamat
                </label>
                <textarea name="address" cols={20} rows={8}
                  onChange={e => setAddress(e.target.value)}
                >
                  {address}
                </textarea>
              </div>
              <div className="form-input">
                <div className="koordinat-status">
                  <label htmlFor="coordinate">
                    Koordinat
                  </label>
                  <input
                    type="text"
                    name="coordinate"
                    placeholder="Masukkan koordinat"
                    value={coordinate}
                    onChange={e => setCoordinate(e.target.value)}
                  />
                </div>
                <div className="koordinat-status">
                  <label htmlFor="status">
                    Status
                  </label>
                  <select name="status" onChange={e => setStatus(JSON.parse(e.target.value))}>
                    {detail?.status == false ?
                      <>
                        <option value="false">Tidak Aktif</option>
                        <option value="true"> Aktif</option>
                      </>
                      :
                      <>
                        <option value="true">Aktif</option>
                        <option value="false">Tidak Aktif</option>
                      </>
                    }
                  </select>
                </div>
              </div>
            </div>
          </form>
        </Modal>}


      {/* Modal Create */}
      {showModalCreate ? <Modal visible={showModalCreate} title="Tambah Lokasi Parkir" onCancel={() => setShowModalCreate(false)} onOk={() => modalCreate()} okText="Simpan">
        <form action="">
          <div className="form-group">
            {errorMsg ? (
              <span style={{ color: "red" }}>{errorMsg}</span>
            ) : null}
            <div className="form-input">
              <label htmlFor="locationName">
                Masukkan Nama Lokasi Parkir
              </label>
              <input
                type="text"
                name="locationName"
                placeholder="Masukkan Nama Lokasi"
                value={locationName}
                onChange={e => setLocationName(e.target.value)}
              />
            </div>
            <div className="form-input">
              <label htmlFor="cityName">
                Kota/Kabupaten
              </label>
              <input
                type="text"
                name="cityName"
                placeholder="Masukkan Kota / Kabupaten"
                value={cityName}
                onChange={e => setCityName(e.target.value)}
              />
            </div>
            <div className="form-input">
              <label htmlFor="">
                Kapasitas
              </label>
              <div className="input-kapasitas">
                <div className="form-group-kapasitas">
                  <input
                    type="number"
                    name="car"
                    placeholder="Masukkan kapasitas"
                    value={car}
                    onChange={e => setCar(e.target.value)}
                  />
                  <label htmlFor="car">
                    Mobil
                  </label>
                </div>
                <div className="form-group-kapasitas">
                  <input
                    type="number"
                    name="motorCycle"
                    placeholder="Masukkan kapasitas"
                    value={motorCycle}
                    onChange={e => setMotorCycle(e.target.value)}
                  />
                  <label htmlFor="motorCycle">
                    Sepeda Motor
                  </label>
                </div>
              </div>
            </div>
            <div className="form-input">
              <label htmlFor="rate">
                Tarif
              </label>
              <input
                type="number"
                name="rate"
                placeholder="Masukkan Tarif"
                value={rate}
                onChange={e => setRate(e.target.value)}
              />
            </div>
            <div className="form-input">
              <label htmlFor="address">
                Alamat
              </label>
              <textarea name="address" id="address" cols={20} rows={8}
                onChange={e => setAddress(e.target.value)}
              >
                {address}
              </textarea>
            </div>
            <div className="form-input">
              <div className="koordinat-status">
                <label htmlFor="coordinate">
                  Koordinat
                </label>
                <input
                  type="text"
                  name="coordinate"
                  placeholder="Masukkan koordinat"
                  value={coordinate}
                  onChange={e => setCoordinate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal> : null}

      {/* Modal Delete */}
      {showModalDelete ?
        <ModalConfirmation visible={showModalDelete} onCancel={() => setShowModalDelete(false)} onOk={() => modalDelete(idDelete)}>
          <h1>
            {deleteLocation?.locationName}
          </h1>
          <h3>Apakah Anda Yakin ingin menghapus?</h3>
        </ModalConfirmation>
        : null}
    </>
  );
};

// export default Location;