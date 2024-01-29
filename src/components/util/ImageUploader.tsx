import ImgCrop from "antd-img-crop";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";

interface ImageUploader {
  getValue: (value: any[]) => void;
}

const ImageUploader: React.FC<ImageUploader> = ({ getValue }) => {
  const { pet, item } = useContext(InventoryDrawerVisiblityContext);
  const { get } = useContext(SelectedDataContext);

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
    if (
      (pet?.edit?.visible ||
        pet?.view?.visible ||
        item?.edit?.visible ||
        item?.view?.visible) &&
      get
    ) {
      setFileList(get.inventoryImage);
    }
  }, [
    get,
    pet?.edit?.visible,
    pet?.view?.visible,
    item?.edit?.visible,
    item?.view?.visible,
  ]);

  useEffect(() => {
    getValue(fileList);
  }, [fileList]);
  return (
    <ImgCrop>
      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" for API call only
        // to avoid sending POST request to upload the file
        customRequest={({ onSuccess }) => {
          if (onSuccess) {
            setTimeout(() => {
              onSuccess("ok", undefined);
            }, 0);
          }
        }}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        showUploadList={{
          showPreviewIcon: false,
        }}
        beforeUpload={() => {
          return false;
        }}
        maxCount={1}
        // onPreview={onPreview}
      >
        {fileList?.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUploader;
