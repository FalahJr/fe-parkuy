import { useEffect, useState } from "react";
import { FaCar, FaMotorcycle, FaSearch } from "react-icons/fa";
import NavbarAdmin from "../../../components/NavbarAdmin/NavbarAdmin";
import Button from "../../../components/Button/Button";
import Table, { TableColumn } from "../../../components/Table/Table";
import { DetailParkirOutResponse, ParkirOutResponse } from "../../../types";
import { parkirOutService } from "../../../services";
import Modal from "../../../components/Modal/Modal";



export default () => {

	const [parkirOut, setParkirOut] = useState<Array<ParkirOutResponse>>([])
	const [detail, setDetail] = useState<DetailParkirOutResponse>()
	const [waktuMasuk, setWaktuMasuk] = useState<string>()

	const [showModal, setShowModal] = useState<boolean>(false)

	// Get All Data Location
	const getParkirOut = async () => {
		try {
			const response = await parkirOutService.getParkirOut()
			setParkirOut(response.data)
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
			const response = await parkirOutService.detailParkirOut(id)
			setDetail(response.data)
			// setWaktuMasuk(parse(response.data.waktu_masuk).getHours)
			setShowModal(true)
			
			// console.log('nama',response.data.location)
		} catch (error) {
			console.log("error", error)
		}
	}
	useEffect(() => {
		// console.log('detailkedua', detail?detail?.locationName)

		getParkirOut()
		// openModal()
		// const token = storageService.getToken()
		// openModal()

	}, [])

	const columnsPosts: TableColumn<ParkirOutResponse>[] = [
		{
			title: "No",
			key: "id_location",
			dataType: "numbering"
		},
		{
			title: "No. Kendaraan",
			key: "nopol"
		},
		{
			title: "Jenis Kendaraan",
			key: "jenis_kendaraan",
			render: (value) =>
				<>
					<div className="capacity">
						{value.jenis_kendaraan === "motor" ?
							<div className="count-vehicle">
								<div>
									<FaMotorcycle />
								</div>
								<div>
									{value.jenis_kendaraan}
								</div>
							</div>
							:
							<div className="count-vehicle">
								<div>
									<FaCar />
								</div>
								<div>
									{value.jenis_kendaraan}
								</div>
							</div>
						}

					</div>
				</>
		},
		{
			title: "Lokasi",
			key: "id_parking",
			render: (value) =>
				value.petugas.location.locationName

		},
		{
			title: "Petugas",
			key: "id_parking",
			render: (value) =>
				value.petugas.fullName
		},
		{
			title: "Durasi",
			key: "id_parking",
			render: (value) =>
				<>
					{/* {setWaktuMasuk = new Date(value.waktu_masuk)} */}
					<div>
			{new Date(value.waktu_masuk).getHours()  }. 
			{new Date(value.waktu_masuk).getMinutes()  } - {new Date(value.waktu_keluar).getHours()  }. 
			{new Date(value.waktu_keluar).getMinutes()  }
			</div>
				</>

		},
		{
			title: "Action",
			key: "id_parking",
			render: (value) => <Button
				// id="value.id_petugas"
				color="detail"
				name="..."
				type="normal"
				size="medium"
				// parsing parameter id ke func modal
				onClick={() => openModal(value.id_parking)}
			// onClick={()=> console.log("idpetugas", value.fullName)}
			/>
		},
	]
	return (
		<>
			<NavbarAdmin
				title="Semua Transaksi Ada Di Sini"
			/>
			<div className="table-content parking-out">
				<div className="table-container">
					<div className="search-form">
						<form className="search">
							<input type="text" placeholder="Search.." name="search" />
							<button type="submit">
								<FaSearch />
							</button>
						</form>

					</div>
					<Table columns={columnsPosts} data={parkirOut} />
				</div>
			</div>
			{/* {showModal ? ( */}
			<Modal visible={showModal} title="Data Parkir Keluar" onCancel={() => setShowModal(false)}>
				<form action="">
					<div className="form-group">
						<div className="form-input">
							<label htmlFor="metode">
								Metode
							</label>
							<input
								type="text"
								name="metode"
								placeholder="Masukkan Nama Lengkap"
								value={detail?.metode}
								disabled
							/>
						</div>
						<div className="form-input">
							<label htmlFor="domisili">
								Nama
							</label>
							{detail?.pengendara == null ? 
							<input
								type="text"
								name="namaPengendara"
								placeholder="Nama Pengendara"
								// value={detail?.pengendara.fullName}
								disabled
							/>
							:
							<input
								type="text"
								name="namaPengendara"
								placeholder="Nama Pengendara"
								value={detail?.pengendara.fullName}
								disabled
							/>
							}
						</div>
						<div className="form-input">
							<label htmlFor="jenisKendaraan">
								Jenis Kendaraan
							</label>
							<input
								type="text"
								name="jenisKendaraan"
								placeholder="Masukkan Email"
								value={detail?.jenis_kendaraan}
								disabled
							/>
						</div>
						<div className="form-input">
							<label htmlFor="noHp">
								Email
							</label>
							{detail?.pengendara == null ? 
							<input
								type="text"
								name="email"
								placeholder="No Hp"
								// value={detail?.pengendara.fullName}
								disabled
							/>
							:
							<input
								type="text"
								name="email"
								placeholder="Nama Pengendara"
								value={detail?.pengendara.user.email}
								disabled
							/>
							}
						</div>
						<div className="form-input">
							<label htmlFor="nopol">
								No. Kendaraan
							</label>
							<input
								type="text"
								name="nopol"
								value={detail?.nopol}
								disabled
							/>
						</div>
						<div className="form-input">
							<label htmlFor="noHp">
								No. Telephone
							</label>
							{detail?.pengendara == null ? 
							<input
								type="text"
								name="noHp"
								placeholder="Nama Pengendara"
								// value={detail?.pengendara.fullName}
								disabled
							/>
							:
							<input
								type="text"
								name="noHp"
								placeholder="Nama Pengendara"
								value={detail?.pengendara.phone}
								disabled
							/>
							}
						</div>
					</div>
					<hr />
					<div className="form-group">

						<div className="form-input">
							<label htmlFor="namaPetugas">
								Petugas Parkir
							</label>
							<input
								type="text"
								name="namaPetugas"
								placeholder="Nama Petugas"
								value={detail?.petugas.fullName}
								disabled
							/>
						</div>
						<div className="form-input">
							<label htmlFor="waktuMasuk">
								Waktu Masuk
							</label>
							<input
								type="text"
								name="waktuMasuk"
								placeholder="Waktu Masuk"
								value={detail?.waktu_masuk}
								disabled
							/>
						</div>
						<div className="form-input">
							<label htmlFor="lokasiParkir">
								Lokasi Parkir
							</label>
							<input
								type="text"
								name="lokasiParkir"
								placeholder="Lokasi Parkir"
								value={detail?.petugas.location.locationName}
								disabled
							/>
						</div>
						<div className="form-input">
							<label htmlFor="biaya">
								Biaya
							</label>
							<input
								type="text"
								name="biaya"
								placeholder="Waktu Masuk"
								value={detail?.petugas.location.rate}
								disabled
							/>
						</div>
						<div className="form-input">
							<label htmlFor="waktuKeluar">
								Waktu Keluar
							</label>
							<input
								type="text"
								name="waktuKeluar"
								placeholder="Waktu Masuk"
								value={detail?.waktu_keluar}
								disabled
							/>
						</div>
					</div>
				</form>
			</Modal>
			{/* ) : null} */}
		</>
	);
};
