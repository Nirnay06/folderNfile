import { CaretDownFilled, FileTwoTone } from "@ant-design/icons";
// import Checkbox from "antd/es/checkbox";
import { useContext, useState } from "react";
import { FolderContext } from "./App";
// import Checkbox from "./Checkbox";
import EditActions from "./EditActions";
import FileActions from "./FileActions";

const FileItem = (props) => {
  const ctx = useContext(FolderContext);
  const [showActions, toggleActions] = useState(false);
  const [enableEditing, toggleEditing] = useState(false);
  const [updatedName, setName] = useState(props.name);
  const onSaveHandler = () => {
    ctx.updateItem(props.identifier, updatedName);
    toggleActions(false);
    toggleEditing(false);
  };
  return (
    <div style={{ marginLeft: `${props.margin}px` }} className="folderItem">
      <span className="item">
        {/* <Checkbox></Checkbox> */}
        <CaretDownFilled className="smallIcon transparentIcon" />
        <span
          onClick={() => {
            toggleActions((p) => !p);
          }}
        >
          <i class="icofont-file-audio"></i>
          <FileTwoTone className="md-icon" />
          {!enableEditing && props.name}
          {enableEditing && (
            <input
              className="inputBox"
              id={props.identifier}
              value={updatedName}
              name={updatedName}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          )}
        </span>
        {showActions && !enableEditing && (
          <FileActions
            file
            identifier={props.identifier}
            closeActions={toggleActions}
            toggleEditing={toggleEditing}
          />
        )}
        {enableEditing && (
          <EditActions
            identifier={props.identifier}
            closeActions={toggleActions}
            toggleEditing={toggleEditing}
            onSave={onSaveHandler}
          />
        )}
      </span>
    </div>
  );
};

export default FileItem;
