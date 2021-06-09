export const cloudinaryService = {
  uploadImg,
};

function uploadImg(ev) {
  const CLOUD_NAME = 'gtarablus';
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  console.log('formData:', formData);
  console.log('target', ev.target);
  formData.append('file', ev.target.files[0]);
  console.log('ev.target.files[0]):', ev.target.files[0]);
  formData.append('upload_preset', 'kre6xz6j');

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.error(err));
}
