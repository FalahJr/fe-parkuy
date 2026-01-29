import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import NavbarAdmin from "../../../components/NavbarAdmin/NavbarAdmin";
import Button from "../../../components/Button/Button";
// import CardOverview from "../../../components/CardOverview/CardOverview";
import Table, { TableColumn } from "../../../components/Table/Table";
import { DetailPetugasDiterimaResponse, PetugasDiterimaResponse, SetLokasiRequest } from "../../../types";
import { locationService, parkingAttendantsService, storageService } from "../../../services";
import Modal from "../../../components/Modal/Modal";
import { getLocationResponse } from "../../../types/interface/Location/getLocation";

export default () => {
	const [petugasDiterima, setPetugasDiterima] = useState<Array<PetugasDiterimaResponse>>([])
	const [location, setLocation] = useState<Array<getLocationResponse>>([])

	const [showModal, setShowModal] = useState<boolean>(false)
	const [detail, setDetail] = useState<DetailPetugasDiterimaResponse>()
	const[idDetail , setIdDetail] = useState<string>('')
	const[idLocation , setIdLocation] = useState<string>('')
	// const [firstName, setFirstName] = useState<string>('')
  

  
	// Get All Data Petugas
	const getPetugas = async () => {
	  try {
		const response = await parkingAttendantsService.petugasDiterima()
		setPetugasDiterima(response.data)
		// console.log(response.data.username)
		console.log("respon",response.data)
	  } catch (error) {
		console.log("error", error)
	  }
	}
  
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
	const openModal = async(id:string) => {
	  console.log('idnya', id)
  
	  try {
		const response = await parkingAttendantsService.detailPetugasDiterima(id)
		setDetail(response.data)
		setShowModal(true)
		setIdDetail(response.data.id_petugas)

		// console.log('nama',response.data.location)
	  } catch (error) {
		console.log("error", error)
	  }
	}

	// Set Lokasi Bekerja
	const setLokasi = async(id:string) => {
		console.log('idLokasi', id)
		// console.log('tanggal', idLocation)
		
		try {
			const request: SetLokasiRequest = {
				location: idLocation
			}
		  const response = await parkingAttendantsService.setLokasi(id, request)
		  document.location.reload()
		  setShowModal(false)
  
		} catch (error) {
		  console.log("error", error)
		}
	  }
  
  
	useEffect(() => {
	  getPetugas()
	  getLocation()
	  // openModal(id)
	  const token = storageService.getToken()
	  // openModal(id)
  
	}, [])
	const columnsPosts: TableColumn<PetugasDiterimaResponse>[] = [
	  {
		title: "No",
		key: "id_petugas",
		dataType: "numbering"
	  },
	  {
		title: "Nama",
		key: "fullName"
	  },
	  {
		title: "Email",
		key: "email"
	  },
	  {
		title: "Domisili",
		key: "cityName"
	  },
	  {
		title: "No. Hp",
		key: "phone"
	  },
	  {
		title: "Lokasi Bekerja",
		key: "locationName",
		render: (value) => 
		value.locationName == null ? 
		<i>Belum Ditentukan</i>
		:
		value.locationName
	  },
	  {
		title: "Action",
		key: "id_petugas",
		render: (value) => <Button
		// id="value.id_petugas"
		color="detail"
		name="..."
		type="normal"
		size="medium"
		// parsing parameter id ke func modal
		onClick={() =>openModal(value.id_petugas)}
		// onClick={()=> console.log("idpetugas", value.fullName)}
	  />
	  },
	]
	return (
	  <>
		<NavbarAdmin
		  title="Kelola Petugas Parkir"
		/>
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
			<Table columns={columnsPosts} data={petugasDiterima} />
  
  
		  </div>
		</div>
		{/* {showModal ? ( */}
		<Modal visible={showModal} title="Data Petugas Parkir" onCancel={() => setShowModal(false)} onOk={() => setLokasi(idDetail)} okText="Simpan">
		<form action="">
			  <div className="form-group">
				<div className="form-input">
				  <label htmlFor="namaLengkap">
					Nama Lengkap
				  </label>
				  <input
					type="text"
					name="namaLengkap"
					placeholder="Masukkan Nama Lengkap"
					value={detail?.fullName}
					disabled
					/>
				</div>
				<div className="form-input">
				  <label htmlFor="domisili">
					Domisili
				  </label>
				  <input
					type="text"
					name="domisili"
					placeholder="Masukkan Domisili" 
					value={detail?.cityName}
					disabled
					/>
				</div>
				<div className="form-input">
				  <label htmlFor="email">
					Email
				  </label>
				  <input
					type="text"
					name="email"
					placeholder="Masukkan Email" 
					value={detail?.user.email}
					disabled
					/>
				</div>
				<div className="form-input">
				  <label htmlFor="noHp">
					No HP
				  </label>
				  <input
					type="text"
					name="noHp"
					placeholder="Masukkan No HP" 
					value={detail?.phone}
					disabled
					/>
				</div>
				<div className="form-input">
				  <label htmlFor="alamat">
					Alamat
				  </label>
				  <textarea name="alamat" id="alamat" cols={20} rows={8} disabled>
					{detail?.address}
				  </textarea>
				</div>
				<div className="form-input">
				<div className="koordinat-status">
                  <label htmlFor="status">
                    Tentukan Lokasi Bekerja
                  </label>
                  <select name="idLocation" onChange={e => setIdLocation(e.target.value)}>
                    {detail?.location == null ?
					<>
                      <option value="Null">Pilih Lokasi Bekerja</option>
						{location.map(listLocation =>
                      <option value={listLocation.id_location}>{listLocation.locationName} - {listLocation.cityName}</option>
							)}
					   </>
                      : 
					  <>
					  <option value={detail.location.id_location}>{detail.location.locationName}</option>
					  {location.map(listLocation =>
					  <option value={listLocation.id_location}>{listLocation.locationName} - {listLocation.cityName}</option>
						// {const selected = idDetail == idDetail ? "selected" : ""}
							// <option {listLocation.id_location = idDetail ? "selected" : ""}>{detail.location.locationName}</option>
							
						)}

							  </>
                    }
                  </select>
                </div>
				</div>
			  </div>
			</form> 
			  </Modal>
		{/* ) : null} */}
	  </>
	);
  };