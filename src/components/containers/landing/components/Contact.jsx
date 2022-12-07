import React from 'react';
import {
	FaInstagram,
	FaRegEnvelope,
	FaMobileAlt,
	FaPhone,
} from 'react-icons/fa';

const Contact = () => {
	return (
		<div className="contact py-5 my-5" id="contact_us">
			<div className="container">
				<h1 className="text-center fw-bolder py-3">با ما در تماس باشید</h1>
				<div className="row m-auto">
					<div className="col-12 col-md-6">
						<div className="contact-items">
							<div className="my-3 d-flex justify-content-start align-items-center">
								<a href="tel:+982177714356">
									<span className="nn_icon">
										<FaPhone size={40} />
									</span>
									<p className="d-inline mx-3">021-77714356</p>
								</a>
							</div>
							<div className="my-3 d-flex justify-content-start align-items-center">
								<span className="nn_icon">
									<FaMobileAlt size={40} />
								</span>
								<p className="d-inline fw-bolder mx-3 mb-0">
									<a href="tel:+989122803157">09122803157</a> -{' '}
									<a href="tel:+989124039582">09124039582</a>
								</p>
							</div>
							<div className="my-3 d-flex justify-content-start align-items-center">
								<a href="https://www.instagram.com/naroney.meson/">
									<span className="nn_icon">
										<FaInstagram size={40} />
									</span>
									<p className="contact_en d-inline mx-3" dir="ltr">
										@naroney.meson
									</p>
								</a>
							</div>
							<div className="my-3 d-flex justify-content-start align-items-center">
								<a href="mailto:naroneymeson@gmail.com">
									<span className="nn_icon">
										<FaRegEnvelope size={40} />
									</span>
									<p className="contact_en d-inline mx-3" dir="ltr">
										naroneymeson@gmail.com
									</p>
								</a>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6">
						<div className="py-3">
							<form className="contact_form" action="">
								<div className="row m-0">
									<div className="col m-0 p-0 input_fname">
										<input
											type="text"
											className="form-control"
											name="firstname"
											placeholder="نام"
										/>
									</div>
									<div className="col m-0 p-0">
										<input
											type="text"
											className="form-control"
											name="lastname"
											placeholder="نام خانوادگی"
										/>
									</div>
								</div>
								<input
									type="phone"
									className="mt-2 form-control"
									name="phone"
									placeholder="شماره همراه"
								/>
								<textarea
									className="mt-2 form-control"
									rows="4"
									name="subject"
									placeholder="موضوع درخواست"
								></textarea>
								<div className="contact_submit mt-2 d-flex justify-content-end">
									<button
										type="submit"
										className="nn_btn_secondary text-dark px-4"
									>
										ارســـــال
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
