import { cloudinaryService } from '../services/';

export function cloudinary() {
  <div>
    <h1>Uploading to cloudinary YAAY!</h1>
    <label>
      {' '}
      Upload your image to cloudinary!
      <input onchange="uploadImg(event)" type="file" />
    </label>
  </div>;
}
