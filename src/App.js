import React, { useEffect, useState } from "react";
import "./index.css";
import { addContact, deleteContact, editContact, saveEditedContact, storeContact } from "./action/Action";
import { useDispatch, useSelector } from "react-redux";




const App = () =>
{

  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
    email: ""
  })

  const HandlingFormData = (event) =>
  {
    const iname = event.target.name;
    const ivalue = event.target.value;

    setInputData((preval) =>
    {
      return {
        ...preval,
        [iname]: ivalue
      }
    })
  }



  const dispatch = useDispatch();
  const data = useSelector((state) => state.contactReducer.list);
  const [show, setShow] = useState("hidden");
  const [toggle, setToggle] = useState(true);


  useEffect(() =>
  {
    localStorage.setItem("reduxContact", JSON.stringify(data));
  }, [data]);


  const getStoredData = () =>
  {
    const localData = localStorage.getItem("reduxContact");
    
    if (localData) {
      return JSON.parse(localData);
    } else {
      return [];
    }
    
  }
  
  getStoredData(data);

  return (
    <>
      <div className="main_div">
        <div className="child_div">
          <div className="form_div">
          
            <input type="text" name="name" placeholder=" enter name..." onChange={HandlingFormData}
              value={inputData.name} />
            <input type="number" name="phone" placeholder="enter phone number..." onChange={HandlingFormData}
              value={inputData.phone} />
            <input type="email" name="email" placeholder="enter email id..." onChange={HandlingFormData}
              value={inputData.email} />
            {toggle ?
              <button className="btn" onClick={(e) => dispatch(addContact(inputData),
                setInputData({ name: "", phone: "", email: "" }), setShow("visible"))}> Add </button>
              :
              <button className="btn" onClick={() => dispatch(saveEditedContact(inputData), setToggle(true),
              setInputData({name:"",phone:"",email:""}))}> Save </button>}
            </div>
          <div className="table">
            <table style={{visibility: show}} >
              <thead>
                <tr>
                  <th> Name </th>
                  <th> Phone </th>
                  <th> Email </th>
                  <th> Actions </th>
                </tr>
              </thead>
              {data.map((element) =>
              {
                return (
                <tr key={element.id}>
                <td style={{textTransform: "capitalize"}}> {element.name} </td>
                <td> {element.phone} </td>
                <td> {element.email} </td>
                    <td> <button style={{ backgroundColor: "green", height: "20px", width: "60px", color: "white" }}
                      onClick={() => dispatch(editContact(element.id, element), setInputData(element),
                        setToggle(false))}>Edit</button> /
                      <button style={{ backgroundColor: "red", height: "20px", width: "60px", color: "white" }}
                        onClick={() => dispatch(deleteContact(element.id))} >Delete</button> </td>
              </tr>
                )
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}


export default App;
