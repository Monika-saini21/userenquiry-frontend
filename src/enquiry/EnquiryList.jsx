import React from "react";
export default function EnquiryList ({data}){
  console.log("Received Data:", data);
    return(
        
         <div className="bg-gray-200 p-4 ">
         <h2 className="text-[20px] font-bold ">
            Enquiry List
          </h2>

          <div className="mt-8">


  <div className="overflow-x-auto rounded-lg">
    <table className="w-full  ">
      <thead>
        <tr className="text-left  bg-gray-100">
          <th className="p-3 text-sm font-bold">SR NO</th>
          <th className="p-3 text-sm font-bold">NAME</th>
          <th className="p-3 text-sm font-bold">EMAIL</th>
          <th className="p-3 text-sm font-bold">PHONE</th>
          <th className="p-3 text-sm font-bold">MESSAGE</th>
          <th className="p-3 text-sm font-bold">DELETE</th>
          <th className="p-3 text-sm font-bold">EDIT</th>
        </tr>
      </thead>

      <tbody>
  {data?.length >= 1 ? 
  (
    data.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.message}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center">
        Data not found
      </td>
    </tr>
  )}
</tbody>
    </table>
  </div>
</div>
      </div>
    )
}