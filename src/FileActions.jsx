import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  FileAddOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { FolderContext } from "./App";

const FileActions = (props) => {
  const ctx = useContext(FolderContext);

  return (
    <div className="Actions">
      <EditOutlined className="smallIcon" onClick={props.toggleEditing} />
      <DeleteOutlined
        className="smallIcon"
        onClick={() => {
          ctx.deleteItem(props.identifier);
        }}
      />
      {!props.file && (
        <>
          <FileAddOutlined
            className="smallIcon"
            onClick={() => {
              ctx.addItem(props.identifier, "file");
            }}
          />
          <FolderAddOutlined
            className="smallIcon"
            onClick={() => {
              ctx.addItem(props.identifier, "folder");
            }}
          />
        </>
      )}

      <CloseOutlined
        className="smallIcon"
        onClick={() => {
          props.closeActions(false);
        }}
      />
    </div>
  );
};

export default FileActions;
