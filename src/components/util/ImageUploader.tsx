import ImgCrop from "antd-img-crop";
import React, { useContext, useEffect, useState } from "react";
import { Upload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import InventoryDrawerVisiblityContext from "@/common/contexts/InventoryDrawerVisibilityContext";
import SelectedDataContext from "@/common/contexts/SelectedDataContext";
import DrawerVisibilityContext from "@/common/contexts/DrawerVisibilityContext";

interface ImageUploader {
  listType: "picture-card" | "picture-circle";
  getValue: (value: any[]) => void;
}

const ImageUploader: React.FC<ImageUploader> = ({ listType, getValue }) => {
  const { pet, item } = useContext(InventoryDrawerVisiblityContext);
  const { add, edit, view } = useContext(DrawerVisibilityContext);
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
        item?.view?.visible ||
        edit?.visible ||
        view?.visible) &&
      get
    ) {
      setFileList([
        {
          uid: get._id,
          name: get.name || get.fullName,
          status: "done",
          url: get.imageUrl || get.profilePicture,
        },
      ]);
    }
  }, [
    get,
    pet?.edit?.visible,
    pet?.view?.visible,
    item?.edit?.visible,
    item?.view?.visible,
    edit?.visible,
    view?.visible,
  ]);

  useEffect(() => {
    if (fileList[0]?.status === "done") {
      // to determine if the image is a file or url
      if (fileList[0]?.originFileObj) {
        getValue([fileList[0]?.originFileObj]);
      } else {
        getValue([fileList[0]?.url]);
      }
    }
  }, [fileList]);
  return (
    <ImgCrop>
      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188" for API call only
        // to avoid sending POST request to upload the file
        // customRequest={({ onSuccess }) => {
        //   if (onSuccess) {
        //     setTimeout(() => {
        //       onSuccess("ok", undefined);
        //     }, 0);
        //   }
        // }}
        listType={listType}
        fileList={fileList}
        onChange={onChange}
        showUploadList={{
          showPreviewIcon: false,
        }}
        beforeUpload={() => {
          return false;
        }}
        maxCount={1}
        disabled={pet?.view?.visible || item?.view?.visible || view?.visible}
        // onPreview={onPreview}
      >
        {fileList?.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUploader;
