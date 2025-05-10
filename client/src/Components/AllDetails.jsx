import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';

export const AllDetails = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false); 
 
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/fetch");

        if (!response || !response.data || !Array.isArray(response.data.data)) {
          toast.error("Invalid response format");
          return;
        }

        const formattedData = response.data.data.map(item => ({
          ...item,
          dateofreport: item.dateofreport ? format(new Date(item.dateofreport), 'dd-MM-yyyy') : '',
          dateofindication: item.dateofindication ? format(new Date(item.dateofindication), 'yyyy-MM-dd') : ''
        }));

        setIncidents(formattedData);
        setLoading(false); 
        toast.success(response.data.message || "Data fetched successfully");
      } catch (error) {
    
        setLoading(false); 
        toast.error("Error fetching data");
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.delete(`http://localhost:5000/api/v1/delete/${id}`);

      if (response.data) {
        toast.success(response.data.message);
        console.log('Incident deleted successfully');
        setIncidents((prevIncidents) => prevIncidents.filter(incident => incident._id !== id));
        setTimeout(() => {
          navigator("/"); 
        }, 2000);
      } else {
        console.error('Failed to delete the incident');
        toast.error("Failed to delete the incident");
      }
    } catch (error) {
      console.error('Error deleting the incident:', error);
      toast.error("Error deleting the incident");
    }finally{
      setLoading(false)
    }
  };

  if (loading) {
    return (
      <>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-green-500"></div>
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-gray-500">Loading...</div>
        </div>
      </>
    );
  }

  

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100 px-4 py-8">
      <div className="flex justify-end w-full mb-6">
        <Link to={"/register"}>
          <button className='block rounded-xl text-white bg-green-500 hover:bg-green-400 cursor-pointer p-3'>Add Incident</button>
        </Link>
      </div>
      <div className="w-full overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full border border-gray-300 divide-gray-200 text-sm text-left border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-gray-700 uppercase tracking-wider text-center text-xs">
              <th className="border border-gray-300 px-4 py-3">Incident No</th>
              <th className="border border-gray-300 px-4 py-3">Report</th>
              <th className="border border-gray-300 px-4 py-3">Date of Report</th>
              <th className="border border-gray-300 px-4 py-3">Title</th>
              <th className="border border-gray-300 px-4 py-3">In Type</th>
              <th className="border border-gray-300 px-4 py-3">Date of Indication</th>
              <th className="border border-gray-300 px-4 py-3">Location</th>
              <th className="border border-gray-300 px-4 py-3">City</th>
              <th className="border border-gray-300 px-4 py-3">State</th>
              <th className="border border-gray-300 px-4 py-3">Zipcode</th>
              <th className="border border-gray-300 px-4 py-3">Description</th>
              <th className="border border-gray-300 px-4 py-3">Action</th>
              <th className="border border-gray-300 px-4 py-3">Edit</th>
              <th className="border border-gray-300 px-4 py-3">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {incidents.length === 0 ? (
              <tr>
                <td colSpan="13" className="px-4 py-2 text-center text-gray-500">No incidents found</td>
              </tr>
            ) : (
              incidents.map((incident, index) => (
                <tr key={index} className="hover:bg-gray-50 text-center">
                  <td className="border border-gray-300 px-4 py-2" >{incident.incidentno}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.report}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.dateofreport}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.intype}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.dateofindication}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.city}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.state}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.zipcode}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.discription}</td>
                  <td className="border border-gray-300 px-4 py-2">{incident.action}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <Link to={`/update/${incident._id}`}>
                      <button className='bg-blue-500 p-2 px-3 rounded-md text-white cursor-pointer'>Edit</button>
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className='bg-red-500 p-2 px-3 rounded-md text-white cursor-pointer'
                      onClick={(e) => handleDelete(e, incident._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};
