import {
  BorderOutlined,
  CheckOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";

const Checkbox = (props) => {
  const toggleCheckStatus = () => {};
  return (
    <div className="checkbox" onClick={toggleCheckStatus}>
      <div>
        {props.checkStatus === "checked" && (
          <CheckOutlined className="checkboxIcon" />
        )}
        {props.checkStatus === "partialChecked" && (
          <BorderOutlined
            className="checkboxIcon"
            style={{ fontSize: "8px", backgroundColor: "white" }}
          ></BorderOutlined>
        )}
        {props.checkStatus === "notSelected" && <div></div>}
      </div>
    </div>
  );
};

export default Checkbox;
