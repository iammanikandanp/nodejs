import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const IncidentForm = () => {
  const [incident, setIncident] = useState({
    report: '',
    dateofreport: '',
    title: '',
    incidentno: "1", 
    intype: '',
    dateofindication: '',
    location: '',
    city: '',
    state: '',
    zipcode: '',
    discription: '',
    action: ''
  });

  const [incidentCount, setIncidentCount] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const navigator = useNavigate();

  const fetchIncidentCount = async () => {
    setLoading(true); 
    try {
      const response = await axios.get("http://localhost:5000/api/v1/count");
      if (response.data) {
        setIncidentCount(response.data.data); 
      }
    } catch (error) {
      console.error("Error fetching incident count:", error);
      toast.error("Failed to fetch incident count.");
    } finally {
      setLoading(false); 
    }
  };
  
  
  

  useEffect(() => {
    fetchIncidentCount();
  }, []);

  useEffect(() => {
    if (incidentCount != null) {
      setIncident((prev) => ({
        ...prev,
        incidentno: (incidentCount + 1).toString()
      }));
    }
  }, [incidentCount]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await axios.post("http://localhost:5000/api/v1/register", incident);
      if (response && response.data) {
        toast.success(response.data.message || "Incident submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigator("/"); 
        }, 2000);
      } else {
        toast.error("Failed to register incident.");
      }
    } catch (error) {
      console.error("error", error);
      toast.error("Something went wrong while submitting the incident.");
    } finally {
      setLoading(false); 
    }
  };

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

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-4 relative">
      
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-green-500"></div>
        </div>
      )}

      <form
        className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl "
        onSubmit={handleSubmit}
      >
        <h3 className='text-center py-4 text-xl text-green-600 uppercase'>INCIDENT Register FORM</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="incidentno" value={incident.incidentno} onChange={handleChange} placeholder="Incident No" className="border border-gray-300 p-2 rounded-md" readOnly />
          <input type="date" name="dateofreport" value={incident.dateofreport} onChange={handleChange} placeholder="Date of Report" className="border border-gray-300 p-2 rounded-md" required />
          <input type="text" name="report" value={incident.report} onChange={handleChange} placeholder="Report" className="border border-gray-300 p-2 rounded-md" required />

          <input type="text" name="title" value={incident.title} onChange={handleChange} placeholder="Title" className="border border-gray-300 p-2 rounded-md" required />
        </div>
        <h3 className='text-left py-4 text-xl text-gray-600'>INCIDENT INFORMATION</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="intype" value={incident.intype} onChange={handleChange} placeholder="Incident Type" className="border border-gray-300 p-2 rounded-md" required />
          <input type="date" name="dateofindication" value={incident.dateofindication} onChange={handleChange} placeholder="Date of Indication" className="border border-gray-300 p-2 rounded-md" required />

          <select
            name="state"
            value={incident.state}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md"
            required
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
            className="border border-gray-300 p-2 rounded-md"
            disabled={!incident.state}
            required
          >
            <option value="">Select City</option>
            {(stateCityMap[incident.state] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <input type="text" name="location" value={incident.location} onChange={handleChange} placeholder="Location" className="border border-gray-300 p-2 rounded-md" required />
          <input type="text" name="zipcode" value={incident.zipcode} onChange={handleChange} placeholder="Zipcode" className="border border-gray-300 p-2 rounded-md" required maxLength={6} />

          <textarea name="discription" value={incident.discription} onChange={handleChange} placeholder="Description" className="border border-gray-300 p-2 rounded-md md:col-span-2" rows="3" required></textarea>
          <textarea name="action" value={incident.action} onChange={handleChange} placeholder="Action Taken" className="border border-gray-300 p-2 rounded-md md:col-span-2" rows="3" required></textarea>

          <button
            type="submit"
            className="md:col-span-2 bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default IncidentForm;
