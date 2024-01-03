import ImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

interface ImageUploader {
  getValue: (value: any[]) => void;
}

const ImageUploader: React.FC<ImageUploader> = ({ getValue }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    getValue(fileList);
  }, [fileList]);
  return (
    <ImgCrop>
      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" for API call only
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        showUploadList={{
          showPreviewIcon: false,
        }}
        beforeUpload={() => {
          return false;
        }}
        // onPreview={onPreview}
      >
        {fileList.length < 5 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUploader;
