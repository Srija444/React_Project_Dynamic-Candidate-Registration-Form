import React, { useState, useEffect, useRef, useCallback } from "react";
import "./task1.css";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import Webcam from "react-webcam";

function Task1() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [talukas, setTalukas] = useState([]);
  const [selectedTaluka, setSelectedTaluka] = useState("");

  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [addressProofFile, setAddressProofFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);

  const [formData, setFormData] = useState({
    contactnumber: "",
    fathername: "",
    martialstatus: "",
    foodhabits: "",
    country: "",
    addressline1: "",
    city: "",
    firstname: "",
    mothername: "",
    spousename: "",
    otherhabits: "",
    state: "",
    addressline2: "",
    district: "",
    middlename: "",
    gender: "",
    noofchildren: "",
    bloodgroup: "",
    addressline3: "",
    surname: "",
    religion: "",
    anniversarydate: "",
    disability: "",
    taluka: "",
    pincode: "",
    uploadaadhar: "",
    uploadpan: "",
    addressproof: "",
    photoFile:null,
  });

 

  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  useEffect(() => {
    fetchCountries();
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setFormData({
      ...formData,
      photoFile: imageSrc,
    });
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const toggleCamera = () => {
    setIsCameraOpen((prevState) => !prevState);
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryData = response.data.map((country) => ({
        name: country.name.common,
        alpha2Code: country.cca2,
      }));
      setCountries(countryData);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = async (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedTaluka("");
    // Mock fetching states based on country
    fetchStates(countryCode);
  };

  const fetchStates = (countryCode) => {
    // Simulated data for demonstration
    const statesData = {
      IN: [
        { name: "Karnataka", code: "KA" },
        { name: "Maharashtra", code: "MH" },
      ],
      US: [
        { name: "California", code: "CA" },
        { name: "Texas", code: "TX" },
      ],
      CA: [
        { name: "Ontario", code: "ON" },
        { name: "Quebec", code: "QC" },
      ],
      // Add more countries as needed
    };

    setStates(statesData[countryCode] || []);
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedState(stateCode);
    setSelectedDistrict("");
    setSelectedTaluka("");
    fetchDistricts(stateCode);
  };

  const fetchDistricts = async (stateCode) => {
    // Mock data for districts
    const districtsData = {
      KA: [
        { name: "Bangalore", code: "BLR" },
        { name: "Mysore", code: "MYS" },
      ],
      MH: [
        { name: "Mumbai", code: "MUM" },
        { name: "Pune", code: "PUN" },
      ],
      CA: [
        { name: "Los Angeles", code: "LA" },
        { name: "San Francisco", code: "SF" },
      ],
      TX: [
        { name: "Houston", code: "HOU" },
        { name: "Dallas", code: "DAL" },
      ],
      ON: [
        { name: "Toronto", code: "TOR" },
        { name: "Ottawa", code: "OTT" },
      ],
      QC: [
        { name: "Montreal", code: "MTL" },
        { name: "Quebec City", code: "QC" },
      ],
    };
    setDistricts(districtsData[stateCode] || []);
  };

  const handleDistrictChange = (event) => {
    const districtCode = event.target.value;
    setSelectedDistrict(districtCode);
    setSelectedTaluka("");
    // Mock fetching talukas based on district
    fetchTalukas(districtCode);
  };

  const fetchTalukas = async (districtCode) => {
    // Mock data for talukas
    const talukasData = {
      BLR: [
        { name: "Jayanagar", code: "JYN" },
        { name: "Koramangala", code: "KMG" },
      ],
      MYS: [
        { name: "Chamundi Hill", code: "CH" },
        { name: "Siddhartha Layout", code: "SL" },
      ],
      // Add more mock data as needed
    };
    setTalukas(talukasData[districtCode] || []);
  };

  const handleTalukaChange = (event) => {
    const talukaCode = event.target.value;
    setSelectedTaluka(talukaCode);
  };

  const handleAadharFileChange = (event) => {
    const file = event.target.files[0];
    setAadharFile(file);
    setFormData({
      ...formData,
      aadharFile: file,
    });
  };

  const handlePanFileChange = (event) => {
    const file = event.target.files[0];
    setPanFile(file);
    setFormData({
      ...formData,
      panFile: file,
    });
  };

  const handleAddressProofFileChange = (event) => {
    const file = event.target.files[0];
    setAddressProofFile(file);
    setFormData({
      ...formData,
      addressProofFile: file,
    });
  };

  

  const handleSignatureFileChange = (event) => {
    const file = event.target.files[0];
    setSignatureFile(file);
    setFormData({
      ...formData,
      signatureFile: file,
    });
  };

 
 
 
  const handleSubmit = async() => {
    try{
const response=await axios.post("/api/submit-form", formData);
console.log("form submitted successfully: ", response.data);
    }catch(error){
      console.error("error submitting form: ", error);
    }
    
  };
  
  const submit = () => {
       console.log("submittingData", formData);
    };
  
 

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li>
            <img
              src="https://img.icons8.com/?size=48&id=S5D5w5vFLhYp&format=png"
              alt="Dashboard"
            />{" "}
            Dashboard
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=40&id=41727&format=png"
              alt="Candidate Registration"
            />{" "}
            Candidate Registration
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=48&id=13830&format=png"
              alt="Candidate Interaction"
            />{" "}
            Candidate Interaction
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=50&id=ZuFVFwLqCcIZ&format=png"
              alt="Care Giver"
            />{" "}
            Care Giver
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=24&id=Kj3HZZtgNt0L&format=png"
              alt="Care Receiver"
            />{" "}
            Care Receiver
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=80&id=7afIEjuMifQF&format=png"
              alt="Care Receiver Representative"
            />{" "}
            Care Receiver Representative
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=64&id=B6V5B8MGJVAh&format=png"
              alt="Attendance"
            />{" "}
            Attendance
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=80&id=q3ySu0vv9CEg&format=png"
              alt="Report"
            />{" "}
            Report
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=50&id=9JZ2d8m_PeKK&format=png"
              alt="Batch"
            />{" "}
            Batch
          </li>
          <li>
            <img
              src="https://img.icons8.com/?size=64&id=Of3mVxVcK1jc&format=png"
              alt="Users"
            />{" "}
            Users
          </li>
          <li>
            <img src="https://img.icons8.com/?size=24&id=64781&format=png" />{" "}
            Logout
          </li>
        </ul>
      </div>
      <div className="content">
        <h1>Add Candidate Details</h1>
        <form>
          <div className="dashboard">
            <div className="column column-spacing">
              <div>
                <label>Contact Number</label>
                <input
                  type="text"
                  placeholder="Enter Contact Number"
                  name="contactnumber"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Father Name</label>
                <input
                  type="text"
                  placeholder="Enter Father Name"
                  name="fathername"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Martial Status</label>
                <br />
                <select name="martialstatus" onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <br />
              <div>
                <label>Food Habits</label>
                <br />
                <select name="foodhabits" onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="veg">Vegetarian</option>
                  <option value="nonveg">Non Vegetarian</option>
                </select>
              </div>
              <br />
              <div>
                <label>Country</label>
                <select value={selectedCountry} onChange={handleCountryChange}>
                  <option value="">Select</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country.alpha2Code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div>
                <label>Address Line 1</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="addressline"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>City</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  onChange={handleInputChange}
                />
              </div>
              <br />
            </div>

            <div className="column column-spacing">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstname"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Mother Name</label>
                <input
                  type="text"
                  placeholder="Enter Mother Name"
                  name="mothername"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Spouse Name</label>
                <input
                  type="text"
                  placeholder="Enter Spouse Name"
                  name="spousename"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Other Habits</label>
                <br />
                <select name="otherhabits" onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="drawing">Painting</option>
                  <option value="singing">Singing</option>
                  <option value="dancing">Dancing</option>
                </select>
              </div>
              <br />
              <div>
                <label>State</label>
                <br />
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  disabled={!selectedCountry}
                  name="state"
                >
                  <option value="">Select</option>
                  {states.map((state, index) => (
                    <option key={index} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div>
                <label>Address Line 2</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="addressline2"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>District</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter District"
                  name="district"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="column column-spacing">
              <div>
                <label>Middle Name</label>
                <input
                  type="text"
                  placeholder="Enter Middle Name"
                  name="middlename"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label name="gender">Gender</label>
                <br />
                <select name="gender" onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <br />
              <div>
                <label>No of Children</label>
                <input
                  type="text"
                  placeholder="Enter No of Children"
                  name="noofchildren"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Blood Group</label>
                <input
                  type="text"
                  placeholder="Blood Group"
                  name="bloodgroup"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>District</label>
                <br />
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedState}
                  name="district"
                >
                  <option value="">Select</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div>
                <label>Address Line 3</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="addressline3"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>State</label>
                <input
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="column column-spacing">
              <div>
                <label>Surname/Lastname</label>
                <input
                  type="text"
                  placeholder="Enter Surname/Lastname"
                  name="surname"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Religion</label>
                <input
                  type="text"
                  placeholder="Enter Religion"
                  name="religion"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Anniversary Date</label>
                <input type="date" name="date" onChange={handleInputChange} />
              </div>
              <br />
              <div>
                <label>Disability/Health Issue</label>
                <select name="disability" onChange={handleInputChange}>
                  <option value="">Select</option>
                  <option value="mental health needs">
                    Mental Health Needs
                  </option>
                  <option value="neurological impairment">
                    Neurological Impairment
                  </option>
                  <option value="physical impairment">
                    Physical Impairment
                  </option>
                  <option value="no disability">No Disability</option>
                </select>
              </div>
              <br />
              <div>
                <label>Taluka</label>
                <br />
                <select
                  value={selectedTaluka}
                  onChange={handleTalukaChange}
                  disabled={!selectedDistrict}
                  name="taluka"
                >
                  <option value="">Select</option>
                  {talukas.map((taluka, index) => (
                    <option key={index} value={taluka.code}>
                      {taluka.name}
                    </option>
                  ))}
                </select>
              </div>
              <br />
              <div>
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="Enter Pin/Zip code"
                  name="pincode"
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div>
                <label>Country</label>
                <input
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  onChange={handleInputChange}
                />
              </div>
              <br />
            </div>

            <div className="upload-documents">
              <div>
                <label>Upload Aadhar</label>
                <br />
                <input
                  type="file"
                  onChange={handleAadharFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  name="uploadaadhar"
                />
              </div>

              <div>
                <label>Upload PAN</label>
                <br />
                <input
                  type="file"
                  onChange={handlePanFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  name="uploadpan"
                />
              </div>

              <div>
                <label>Address Proof</label>
                <br />
                <input
                  type="file"
                  onChange={handleAddressProofFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  name="addressproof"
                />
              </div>
            </div><br/>

            <Button onClick={() => setIsCameraOpen(true)}>Capture Image</Button>
          {isCameraOpen && (
            <div>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
              <Button onClick={capture}>Capture</Button>
              <Button onClick={() => setIsCameraOpen(false)}>Close</Button>
            </div>
          )}
          {imgSrc && (
            <div>
              <img src={imgSrc} alt="Captured" />
            </div>
          )}
              <div>
                <label>Upload Signature</label>
                <input
                  type="file"
                  onChange={handleSignatureFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  name="signature"
                />
              </div>
            </div>
          <br/>
          {/* <Button onClick={submit}>Submit</Button> */}
          <Button type="submit" className="bg-green-500 text-white rounded px-4 py-2 mt-2">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Task1;