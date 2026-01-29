import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
		<div className="content">
			<div className="left box">
				<div className="upper">
					<div className="topic">
						<img src="assets/img/Content/logo-footer.png" width="40%" alt=""/>
					</div>
					<p>Parkuy merupakan Platform yang mengdigitalisasi Sistem Parkir dan juga menyediakan lapangan
						pekerjaan untuk tukang parkir agar mendapatkan pekerjaan yang layak.</p>
				</div>

			</div>
			<div className="lower box">
				<div className="topic">Contact us</div>
				<div className="phone">
					<a href="#"><i className="fas fa-phone-volume"></i>+007 9089 6767</a>
				</div>
				<div className="email">
					<a href="#"><i className="fas fa-envelope"></i>abc@gmail.com</a>
				</div>
			</div>
			<div className="middle box">
				<div className="topic">Sosial Media</div>
				<div><a href="#"><i className="fab fa-instagram"></i> @Parkuy</a></div>
				<div><a href="#"><i className="fab fa-whatsapp"> </i>08712312312</a></div>
				<div><a href="#"><i className="fab fa-facebook-f"></i> Facebook.com</a></div>
			</div>
			<div className="right box">
				<div className="topic">Bekerja Sama Dengan</div>
				<img src="assets/img/Content/pemda.png" width="20%" alt=""/>
			</div>
		</div>
		<div className="bottom">
			<p>Copyright © 2022 <a href="#">Pattimura Team C</a> All rights reserved</p>
		</div>
	</footer>
  );
};
export default Footer;