import googleImg from '../assets/googleImg.png';

function addImage(){
	const img = document.createElement('img');
	img.alt = 'Google';
	img.width = '300';
	img.src = googleImg;

	const body = document.querySelector('body');
	body.appendChild(img);
}

export default addImage;