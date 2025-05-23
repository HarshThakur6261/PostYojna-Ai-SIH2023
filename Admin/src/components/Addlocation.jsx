import React, { useState } from "react";
<<<<<<< HEAD
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";
import axios from "axios";
import styles from "./AddLocation.module.css"; // Import the CSS module

const Addlocation = () => {
=======
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OpenAccount = () => {
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    scheme: "",
    accountNumber: "",
    depositAmount: "",
    branch: "",
    contact: "",
    district: "",
    state: "",
  });

  // Constants for schemes and districts
  const schemes = [
    "sukanyaSamriddhiYojana",
    "kisanVikasPatra",
    "seniorCitizenSavingsScheme",
    "postOfficeSavingsAccount",
    "postOfficeMonthlyIncomeScheme",
    "publicProvidentFund",
    "mahilaSammanSavingsCertificate",
    "postOfficeTimeDepositAccount",
    "pmCARESforChildrenScheme",
    "postOfficeRecurringDepositAccount",
    "nationalSavingsCertificate",
    "postalLifeInsurance",
    "ruralPostalLifeInsurance",
    "fixedDeposits",
    "recurringDeposits"
  ];

  const districts = [
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
      const requestData = {
        ...formData,
        population_density: parseInt(formData.population_density, 10),
        Male: parseInt(formData.Male, 10),
        Female: parseInt(formData.Female, 10),
        gender_ratio: parseFloat(formData.gender_ratio),
        education_level: parseFloat(formData.education_level),
        income_level: parseInt(formData.income_level, 10),
      };
      console.log(requestData);
=======
      // Send the form data to the server to register the account
      const response = await axios.post("http://localhost:3000/accounts/add", formData);
      toast.success(response.data.message);
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450

      // Send request to update the total accounts for the selected scheme and district
      await axios.put("http://localhost:3000/updateTotalAccount", {
        schemeName: formData.scheme,
        district: formData.district,
        target: 100, // Example target, adjust as needed
      });

      // Reset the form
      setFormData({
        name: "",
        age: "",
        gender: "",
        scheme: "",
        accountNumber: "",
        depositAmount: "",
        branch: "",
        contact: "",
        district: "",
        state: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
<<<<<<< HEAD
    <div className={styles.addLocationPage}>
      <div className={styles.banner}>
        <img src="/fullbanner.png" alt="Banner" className={styles.bannerImage} />
      </div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Add New Location</h2>

        <label>
          Region Name:
          <input
            type="text"
            name="region_name"
            value={formData.region_name}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </label>

        <label>
          Population Density:
          <input
            type="number"
            name="population_density"
            value={formData.population_density}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </label>

        <label>
          Male Population:
          <input
            type="number"
            name="Male"
            value={formData.Male}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </label>

        <label>
          Female Population:
          <input
            type="number"
            name="Female"
            value={formData.Female}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </label>

        <label>
          Gender Ratio:
          <input
            type="number"
            step="0.000001"
            name="gender_ratio"
            value={formData.gender_ratio}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </label>

        <label>
          Education Level (%):
          <input
            type="number"
            step="0.01"
            name="education_level"
            value={formData.education_level}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </label>

        <label>
          Income Level:
          <input
            type="number"
            name="income_level"
            value={formData.income_level}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </label>

        <label>
          Age Distribution (e.g., "21%, 23%, 39%, 17%"):
          <input
            type="text"
            name="age_distribution"
            value={formData.age_distribution}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <ToastContainer />
      </form>
=======
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Register New Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Scheme Toggle */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Scheme:</label>
          <select
            name="scheme"
            value={formData.scheme}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select Scheme</option>
            {schemes.map((scheme, index) => (
              <option key={index} value={scheme}>
                {scheme}
              </option>
            ))}
          </select>
        </div>
        {/* District Toggle */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>District:</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select District</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Deposit Amount:</label>
          <input
            type="number"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Branch:</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Contact Number:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
      <ToastContainer />
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450
    </div>
  );
};

export default OpenAccount;
