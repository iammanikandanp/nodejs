import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

export const Update = () => {
  const [incident, setIncident] = useState({
    report: '',
    dateofreport: '',
    title: '',
    incidentno: '',
    intype: '',
    dateofindication: '',
    location: '',
    city: '',
    state: '',
    zipcode: '',
    discription: '',
    action: ''
  });
  
  const [loading, setLoading] = useState(true);
  const navigator = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { city: "" } : {})
    }));
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/fetchbyid/${id}`);
        if (!response) {
          toast.error("Fetching Data error");
          return;
        }

        const data = response.data.data;

        const formattedData = {
          ...data,
          dateofreport: data.dateofreport ? format(new Date(data.dateofreport), 'yyyy-MM-dd') : '',
          dateofindication: data.dateofindication ? format(new Date(data.dateofindication), 'yyyy-MM-dd') : ''
        };

        setIncident(formattedData);
        setLoading(false);
        toast.success(response.data.message);
      } catch (error) {
        console.error("error", error);
        toast.error("Something went wrong while submitting the incident.");
        setLoading(false);
      }
    };
    fetchdata();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/update/${id}`, { ...incident });
      if (!response) {
        toast.error("Failed to update incident.");
        return;
      }
      setIncident(response.data.data);
      toast.success(response.data.message);
      setTimeout(() => {
        navigator("/");
      }, 2000);
    } catch (error) {
      console.error("error", error);
      toast.error("Something went wrong while submitting the incident.");
    }
  };

  const inputs = [
    { name: "incidentno", type: "text", placeholder: "Incident No" },
    { name: "dateofreport", type: "date", placeholder: "Date of Report" },
    { name: "report", type: "text", placeholder: "Report" },
    { name: "title", type: "text", placeholder: "Title" },
  ];

  const inputFields = [
    { name: "intype", type: "text", placeholder: "Incident Type" },
    { name: "dateofindication", type: "date", placeholder: "Date of Indication" },
    { name: "location", type: "text", placeholder: "Location" },
    { name: "zipcode", type: "text", placeholder: "Zipcode" },
  ];

  const textAreas = [
    { name: "discription", placeholder: "Description" },
    { name: "action", placeholder: "Action Taken" },
  ];


  const stateCityMap = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tirunelveli"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belgaum"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Nellore", "Kurnool"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
    "Haryana": ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Hisar"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Roorkee", "Rishikesh"]
  };

  const states = Object.keys(stateCityMap);


  if (loading) {
    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-green-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl"
      >
        <h3 className='text-center py-4 text-xl text-green-600'>INCIDENT UPDATE FORM</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {inputs.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              value={incident[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          ))}

          {inputFields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              value={incident[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          ))}

          <select
            name="state"
            value={incident.state}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={incident.city}
            onChange={handleChange}
            disabled={!incident.state}
            className="border border-gray-300 p-2 rounded-md w-full"
          >
            <option value="">Select City</option>
            {(stateCityMap[incident.state] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {textAreas.map((text) => (
            <textarea
              key={text.name}
              name={text.name}
              value={incident[text.name]}
              onChange={handleChange}
              placeholder={text.placeholder}
              rows={4}
              className="border border-gray-300 p-2 rounded-md md:col-span-2"
            ></textarea>
          ))}

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Update
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};
