import { useState } from 'react';
import { cropImage } from './cropHelper';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cropper from 'react-easy-crop';

const ImageCropper = ({
	open,
	image,
	onComplete,
	containerStyle,
	...props
}) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

	return (
		<Modal show={open} size="lg">
			<Modal.Title className="pt-3 text-center">ویرایش تصویر</Modal.Title>

			<Modal.Body>
				<div style={containerStyle}>
					<Cropper
						image={image}
						crop={crop}
						zoom={zoom}
						aspect={6 / 9}
						onCropChange={setCrop}
						onCropComplete={(_, croppedAreaPixels) => {
							setCroppedAreaPixels(croppedAreaPixels);
						}}
						onZoomChange={setZoom}
						{...props}
					/>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					className="nn_btn_primary"
					onClick={() =>
						onComplete(cropImage(image, croppedAreaPixels, console.log))
					}
				>
					تائید
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ImageCropper;
