import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Enquiry() {
 
  let [fomeData, setFomeData]= useState({
    name:"",
    email:"",
    phone:"",
    message:"",
    _id:""
   })
   const [enquiryList, setEnquiryList] = useState([]);

let getallList=()=>{
    axios
      .get("http://localhost:8020/api/website/enquiry/view")
      .then((res) => {
        console.log(res.data.enquirylist);
        setEnquiryList(res.data.enquirylist);
      })
      .catch((err) => {
        console.log(err);
      });
 
    }
useEffect(()=>{
  getallList()
})

    let saveEnquiry = (e) => {
        e.preventDefault();
   
//        let formData = {
//   name: e.target.name.value,
//   email: e.target.email.value,
//   phone: e.target.phone.value,
//   message: e.target.message.value
// };

if(fomeData._id){
 
axios.put(`http://localhost:8020/api/website/enquiry/update/${fomeData._id}`,
  fomeData
)
.then((res) => {
  console.log(res.data);
   toast.success('Enquiry update Successfully')

   
  setFomeData({
    name:"",
    email:"",
    phone:"",
    message:"",
    
  })

})
}else{
  
axios.post(`http://localhost:8020/api/website/enquiry/insert`,
  fomeData
)
.then((res) => {
  console.log(res.data);
   toast.success('Enquiry Save Successfully')

   
  setFomeData({
    name:"",
    email:"",
    phone:"",
    message:"",
    
  })

})

}


}


   let getValue=(e)=>{
    let inputName=e.target.name
    let inputValue = e.target.value
    let oldData={...fomeData}

    oldData[inputName]=inputValue;
    setFomeData(oldData)
      
   }  
   
let deleteRow = (delid) => {
  if (window.confirm("Are you sure you want to delete?")) {
    axios
      .delete(`http://localhost:8020/api/website/enquiry/delete/${delid}`)
      .then((res) => {
        toast.success("Enquiry Deleted");

        // State se bhi remove karo
        setEnquiryList((prev) =>
          prev.filter((item) => item._id !== delid)
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Delete Failed");
      });
  }
}

let editRow=(editid)=>{
   axios
      .get(`http://localhost:8020/api/website/enquiry/single/${editid}`)
       .then((res)=>{
         let data = res.data
         setFomeData(data.enquiry)

       })
    }
  
  return (
    <div className="min-h-screen bg-white py-8">
      <ToastContainer/>
      <h1 className="text-4xl font-bold text-center mb-8">
        User Enquiry
      </h1>

      <div className="grid grid-cols-[30%_auto] gap-10">
        <div className="bg-gray-200 p-4">
          <h2 className="text-[20px] font-bold ">
            Enquiry Form
          </h2>

          <form action='' onSubmit={saveEnquiry}>
            <div className="py-2">
              <label htmlFor="name" className="block mb-1 text-sm font-medium">
                Your Name
              </label>
              <input
                value={fomeData.name}
                type="text"
                onChange={getValue}
                name="name"
                placeholder="Enter Your Name"
                className="w-full p-2 border-white rounded-lg bg-white "
              />
            </div>

            <div className="py-2">
              <label htmlFor='email'  className="block mb-1 text-sm  font-medium">
                Your Email
              </label>
              <input
                onChange={getValue}
                type="email"
                value={fomeData.email}
                name="email"
                placeholder="Enter Your Email"
                className="w-full p-2 border-white rounded-lg bg-white "
              />
            </div>

            <div className="py-2">
              <label htmlFor="phone" className="block mb-1 text-sm  font-medium">
                Your Phone
              </label>
              <input
                onChange={getValue}
                type="text"
                value={fomeData.phone}
                name="phone"
                placeholder="Enter Your Phone"
                className="w-full p-2 border-white rounded-lg bg-white  "
              />
            </div>

            <div className="py-2">
              <label htmlFor="message" className="block mb-1 text-sm  font-medium">
                Your Message
              </label>
              <textarea
                onChange={getValue}
                value={fomeData.message}
                rows="4"
                name="message"
                placeholder="Message..."
                className="w-full p-2 border-white rounded-lg bg-white "
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-700 rounded-lg hover:bg-cyan-800 text-white py-2 "
            >
              {fomeData._id ? 'Update' : 'Save'}
            </button>
          </form>
        </div>
          <div className="bg-gray-200 p-4 ">
         <h2 className="text-[20px] font-bold ">
            Enquiry List
          </h2>

          <div className="mt-4">


  <div className="overflow-x-auto rounded-lg">
    <table className="w-full  ">
      <thead>
        <tr className="text-left  bg-gray-100">
          <th className="p-3 text-sm font-bold">SR NO</th>
          <th className="p-3 text-sm font-bold">NAME</th>
          <th className="p-3  text-sm font-bold">EMAIL</th>
          <th className="p-3 text-sm font-bold">PHONE</th>
          <th className="p-3 text-sm font-bold">MESSAGE</th>
          <th className="p-3 text-sm font-bold">DELETE</th>
          <th className="p-3 text-sm font-bold">EDIT</th>
        </tr>
      </thead>

      <tbody>
              {/* {} */}
            {enquiryList.length > 0 ? (
           enquiryList.map((item, index) => (
                
            <tr className="text-left  bg-white" key={item._id || index}>
              
              <td className="p-3 ">{index + 1}</td>
              
              <td className="p-3 text-sm ">{item.name || item.sName}</td>
              <td className="p-3  text-sm ">{item.email || item.sEmail}</td>
              <td className="p-3 text-sm ">{item.phone || item.sPhone}</td>
              <td className="p-3  truncate text-sm ">{item.message || item.sMessage}</td>
              <td className="pl-2" > <button onClick={() => deleteRow(item._id)} className="bg-red-700 py-1 px-2 rounded-sm text-sm text-white">Delete</button></td>
              <td className="pl-3" > <button onClick={() => editRow(item._id)} className=" bg-cyan-700 py-1 px-2 rounded-sm text-sm text-white">Edit</button></td>
            </tr>
          ))
  ) : (
   <tr >
  <td  colSpan={7}>
    <div className="flex absolute right-100  items-center py-8">
      <span className="text-lg font-semibold ">
        No Data Available
      </span>
    </div>
  </td>
</tr>
  )}
      </tbody>
    </table>
  </div>
</div>
      </div>
      </div>

     
    </div>

  );
}