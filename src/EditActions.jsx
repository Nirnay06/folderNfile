import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const EditActions = (props) => {
  return (
    <div className="Actions">
      <CheckOutlined
        className="smallIcon"
        onClick={() => {
          props.onSave();
        }}
      />
      <CloseOutlined
        className="smallIcon"
        onClick={() => {
          props.toggleEditing(false);
          props.closeActions(false);
        }}
      />
    </div>
  );
};

export default EditActions;
