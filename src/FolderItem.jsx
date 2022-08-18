import {
  CaretDownFilled,
  CaretUpFilled,
  FolderOpenTwoTone,
  FolderTwoTone,
} from "@ant-design/icons";
import { useContext, useState } from "react";
import { FolderContext } from "./App";
// import Checkbox from "./Checkbox";
import EditActions from "./EditActions";
import FileActions from "./FileActions";
import FileItem from "./FileItem";

const FolderItem = (props) => {
  const ctx = useContext(FolderContext);
  const [enableEditing, toggleEditing] = useState(false);
  const [opened, setOpened] = useState(false);
  const [showActions, toggleActions] = useState(false);
  // const [checkStatus, setCheckStatus] = useState("partialChecked");
  const [updatedName, setName] = useState(props.name);
  const onSaveHandler = () => {
    ctx.updateItem(props.identifier, updatedName);
    toggleActions(false);
    toggleEditing(false);
  };

  return (
    <div className="folderItem">
      <div className="item" style={{ marginLeft: `${props.margin}px` }}>
        {/* <Checkbox
          checkStatus={checkStatus}
          toggleCheckbox={setCheckStatus}
        ></Checkbox> */}
        {opened && props.content && props.content.length > 0 && (
          <CaretUpFilled
            className="smallIcon"
            onClick={() => {
              setOpened((p) => !p);
            }}
          />
        )}
        {!opened && props.content && props.content.length > 0 && (
          <CaretDownFilled
            className="smallIcon"
            onClick={() => {
              setOpened((p) => !p);
            }}
          />
        )}
        {props.content && props.content.length === 0 && (
          <CaretDownFilled className="smallIcon transparentIcon" />
        )}
        <span
          onClick={() => {
            toggleActions((p) => !p);
          }}
        >
          {opened ? (
            <FolderOpenTwoTone className="md-icon" />
          ) : (
            <FolderTwoTone className="md-icon" />
          )}
          {!enableEditing && props.name}
          {enableEditing && (
            <input
              className="inputBox"
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
      </div>
      {opened && props.content && props.content.length > 0 && (
        <>
          {props.content.map((i) => {
            if (i.type === "file") {
              return (
                <FileItem
                  {...i}
                  key={i.identifier}
                  margin={props.margin + 30}
                />
              );
            }
            if (i.type === "folder") {
              return (
                <FolderItem
                  {...i}
                  key={i.identifier}
                  margin={props.margin + 30}
                />
              );
            }
            return <></>;
          })}
        </>
      )}
    </div>
  );
};

export default FolderItem;
