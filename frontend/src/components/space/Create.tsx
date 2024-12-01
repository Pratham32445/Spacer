import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";

const Create = () => {
  const [Image, setImage] = useState<File | null>(null);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const UploadImage = async () => {
    if (!Image) return;
    const formData = new FormData();
    formData.append("image", Image);
    try {
      const res = await axios.post(`${URL}/uploadImage`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Input
        id="picture"
        type="file"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : Image)}
      />
      <Button onClick={UploadImage}>Upload</Button>
    </div>
  );
};

export default Create;
