import React from 'react';

const Footer = () => {
	return (
		<>
			<div className="Footer pb-3 pt-5">
				<div className="row container m-auto">
					<div className="footer_info col-12 col-md-6">
						<h4 className="mb-5">مزون نارُنِی</h4>
						<p>
							دوخـت ، فــروش و اجــاره به روزترین و شیک ترین لباس های عروس و
							مجلسی
						</p>
						<p>
							<span>با مدیریت : </span>
							<span className="fw-bolder">سجـــادیان</span>
						</p>
						<h6>آدرس :</h6>
						<p>
							تهران - فلکه دوم تهرانپارس، پاساژ نگین شرق (جنب بانک دی) ، طبقه
							اول، واحد 18 .
						</p>
					</div>
					<div className="col-12 col-md-6 text-center">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1528.4567137948109!2d51.528560681435195!3d35.73391440278033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e1d24e72966f9%3A0x87eed74b5497009f!2sNegin%20Shargh%20Mall!5e0!3m2!1sen!2str!4v1670275144145!5m2!1sen!2str"
							width="700"
							height="450"
							title="map"
							className="map"
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						/>
					</div>
				</div>
			</div>
			<div className="copyright text-center fw-bolder py-2">
				کلیه حقوق مادی ومعنوی این وبسایت برای مزون نارُنِی محفوظ می باشد
			</div>
		</>
	);
};

export default Footer;
