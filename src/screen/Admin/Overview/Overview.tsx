import React, { useEffect, useState } from "react";
import { FaLayerGroup, FaParking, FaUserAlt } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import CardOverview from "../../../components/CardOverview/CardOverview";
import BarChart from "../../../components/Chart/Chart";
import NavbarAdmin from "../../../components/NavbarAdmin/NavbarAdmin";
import Table from "../../../components/Table/Table";
import { applicationFileService, locationService, parkingAttendantsService } from "../../../services";




const Overview: React.FC = () => {

  const [countBerkas, setCountBerkas] = useState<number>(0);
  const [countPetugas, setCountPetugas] = useState<number>(0);
  const [countLokasi, setCountLokasi] = useState<number>(0);

  const getBerkas = async () => {
    try {
      const resp = await applicationFileService.petugas();

      console.log("resp", resp);

      setCountBerkas(resp.data.length);
      console.log("jumlah", resp.data.length);
    } catch (error) {
      console.log("getCustomer error", error);
    }
  };

  const getPetugas = async () => {
    try {
      const resp = await parkingAttendantsService.petugasDiterima();

      console.log("resp", resp);

      setCountPetugas(resp.data.length);
      console.log("jumlah", resp.data.length);
    } catch (error) {
      console.log("getCustomer error", error);
    }
  };
  const getLokasi = async () => {
    try {
      const resp = await locationService.location();

      console.log("resp", resp);

      setCountLokasi(resp.data.length);
      console.log("jumlah", resp.data.length);
    } catch (error) {
      console.log("getCustomer error", error);
    }
  };
  useEffect(() => {
    getBerkas();
    getPetugas();
    getLokasi();
  }, []);
  return (
    <>
    <NavbarAdmin />
    <div className="home-content">
      <div className="overview-boxes">
        <CardOverview 
          color="three"
          titleCountOne="Masuk"
          countOne={countBerkas}
          icon={<FaLayerGroup/>}
          titleLabel="Berkas"
        />
        <CardOverview 
          color="one"
          titleCountOne="Aktif"
          countOne={countPetugas}
          icon={<FaUserAlt/>}
          titleLabel="Petugas"
        />
        <CardOverview 
          color="two"
          titleCountOne="Lokasi"
          countOne={countLokasi}
          icon={<FaParking/>}
          titleLabel="Parkir"
          style={{marginBottom:73}}
        />
      </div>

      <div className="sales-boxes">
        <div className="recent-sales box">
          <div className="header-grafik">
            <div className="title text">Grafik</div>
            <Button 
              color="light"
              name="Minggu Ini"
							type="normal"
							size="medium"
              style={{width: '100px', height: '35px', boxSizing: 'border-box'}}
							/>
          </div>
          <div>
          <div className="chart-wrapper">
        <BarChart
          title={"Revenue"}
          labels={[
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
          ]}
          dataChart={[20, 40, 50, 60, 30, 10, 71,20,40,15,5,50]}
        />
      </div>
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Overview;