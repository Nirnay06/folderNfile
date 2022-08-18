import React, { useState } from 'react';
import './App.scss';
import jsonData from './data.json';
import FolderItem from './FolderItem';
import { v4 as uuidv4 } from 'uuid';

export const FolderContext = React.createContext({ deleteItem: () => { }, updateItem: () => { }, addItem: () => { } });

const removeItem = (obj, id) => {
  console.log(obj);
  if (obj.identifier === id) {
    return {};
  }
  if (obj.content && obj.content.length > 0) {
    obj.content = obj.content.filter(o => o.identifier !== id);
    obj.content.forEach(element => {
      removeItem(element, id);
    })
  }
  return obj;
}

const updateItem = (obj, name, id) => {
  if (obj.identifier === id) {
    obj.name = name;
  }
  if (obj.content && obj.content.length > 0) {
    obj.content.forEach(element => {
      updateItem(element, name, id);
    })
  }
}

const addItemToList = (obj, parentId, newItemID, fileType) => {
  if (obj.identifier === parentId) {

    obj.content.push({
      "name": fileType === 'file' ? 'New File' : 'New Folder',
      "type": fileType,
      "identifier": newItemID,
      "content": []
    })
    return;

  }
  if (obj.content && obj.content.length > 0) {
    obj.content.forEach(element => {
      addItemToList(element, parentId, newItemID, fileType);
    })
  }
}

function App() {
  const [data, setData] = useState(jsonData);
  const onDeleteItem = (id) => {
    setData((p) => {
      let obj = removeItem(p, id);
      return { ...obj };
    })
  }
  const onUpdateItem = (id, name) => {
    setData((p) => {
      updateItem(p, name, id);
      return { ...p };
    })
  }
  const onAddItem = (parentId, fileType) => {
    let newItemID = uuidv4();
    setData((p) => {
      addItemToList(p, parentId, newItemID, fileType)
      return { ...p };
    })
  }
  return (
    <FolderContext.Provider value={{ deleteItem: onDeleteItem, updateItem: onUpdateItem, addItem: onAddItem }}>
      <div className="App">
        {data && data.identifier && <FolderItem {...data} key={data.identifier} margin={0} />}
      </div>
    </FolderContext.Provider>
  );
}

export default App;
