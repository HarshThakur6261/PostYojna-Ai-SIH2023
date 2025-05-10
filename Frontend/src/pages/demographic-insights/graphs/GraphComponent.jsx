<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import "./styles.css";
import { useLocation } from "react-router-dom";
import PieActiveArc from "./charts/PieChart";
import data from "./datajson.json";
import BarChart from "./charts/BarChart";
import BarCharts from "./charts/BarChart";
import AgeGroupChart from "./charts/AgeGroup";

const GraphSwiper = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { locationName } = location.state || {};

  const [currlocation, setcurrlocation] = useState("");
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import styles from './GraphComponent.module.css';

const GraphComponent = () => {
  const location = useLocation();
  const { locationName } = location.state || {}; // Destructure locationName from the state passed via Router

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [explanation, setExplanation] = useState(null); 
  const [currlocation, setCurrlocation] = useState(''); 
const [recommendations , Setrecommendations] =useState('');
  const categories = ['gender', 'Age Group', 'Income Level', 'Tax Benefit', 'Risk Level','All' ];
  const options = {
    gender: ['Male', 'Female', 'Both'],
    'Age Group': ['young', 'adult', 'senior'],
    'Income Level': ['low', 'medium', 'high'],
    'Tax Benefit': ['yes', 'no'],
    'Risk Level': ['low', 'medium', 'high'],
  };
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450

  // Function to fetch district and state from the address
  const fetchingDistrict = async (locationName) => {
    const newPrompt = {
      address: locationName,
      myprompt:
<<<<<<< HEAD
        "You have been provided with a full address. Your task is to analyze the address and extract the district and state from it. Return only the following JSON object: { district: <district>, state: <state> }.",
=======
        "You have been provided with a full address. Your task is to analyze the address and extract the district and state from it. Return only the following JSON object: { district: <district>, state: <state> }. Do not include any other data in the response. If the district or state cannot be determined, leave the corresponding field empty (e.g., district:  or state: )",
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450
    };

    try {
      const response = await axios.post(
<<<<<<< HEAD
        "http://localhost:3000/Gemini/get-district",
        { newPrompt }
      );
      setcurrlocation(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (locationName) {
      fetchingDistrict(locationName);
    }
    setLoading(false); // Ensure loading is updated
  }, [locationName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bigCon">
      <div className="innerCon">
        <img src="/assets/fullbanner.png" alt="" />
        <div className="toggleButton">

</div>
        <div className="graphCon">
          <div className="swipper">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              speed={600}
              parallax={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Parallax, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="graphBox1">
                  <p>Population-Based Chart</p>
                  <PieActiveArc data={data} />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="graphBox1">
                  <p>Occupation based chart</p>
                  <BarCharts data={data}/>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="graphBox1">
                  <p>Age Group Based Chart</p>
                  <AgeGroupChart data={data}/>
                </div>
              </SwiperSlide>
              
            </Swiper>
          </div>
        </div>
      </div>
=======
        'http://localhost:3000/Gemini/get-district',
        { newPrompt }
      );
      console.log(response.data); // Log the district and state response
      setCurrlocation(response.data); // Set the state with the response data
    } catch (error) {
      console.log(error); // Log any errors during the fetch
    }
  };

  // Call fetchingDistrict whenever the locationName changes
  useEffect(() => {
    if (locationName) {
      fetchingDistrict(locationName); // Fetch district and state data
    }
  }, [locationName]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedOption(''); // Reset option when category changes
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async () => {
    var payload;
    if(selectedCategory == 'All'){
       payload = {
        userId: '123',
        location: currlocation.district, // Use the fetched location
      };
    }else{
       payload = {
        userId: '123',
        location: currlocation.district, // Use the fetched location
        filterCategory: selectedCategory,
        filterValue: selectedOption,
      };
    }
    try {
      console.log(payload)
      const response = await axios.post("http://127.0.0.1:5000/recommend", payload);
    
      if (response.data.status === 'success') {
        const result = response.data.data;
        console.log('API Response:', result);
        
      
        const recommendations = result.recommendations;
        console.log('Recommended Schemes:', recommendations);
        Setrecommendations(recommendations);
       
    
        if (result.filter_matrix) {
          const filterMatrix = result.filter_matrix;
          console.log('Filter Matrix:', filterMatrix);
      
        }
      } else {
        console.error('API request failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleExplain = async () => {
    try {

      const payload = {
        query:"Hii how are you"// The recommendations text you want to explain
      };
      console.log(payload);
      
 
 
      const response = await axios.post("http://127.0.0.1:5000/explain", payload);
      console.log(response)
      
      // Check if the response contains the expected data
      if (response.data && response.data.status === 'success') {
        setExplanation(response.data.data); // Store the explanation
      } else {
        setExplanation("Sorry, we couldn't get an explanation at this time.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setExplanation("An error occurred while fetching the explanation.");
    }
  };

  return (
    <div className={styles['dropdown-container']}>
      <select className={styles.select} onChange={handleCategoryChange} value={selectedCategory}>
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
     
        {/* Conditionally render the second dropdown */}
        {selectedCategory && selectedCategory !== 'All' && (

        <select className={styles.select} onChange={handleOptionChange} value={selectedOption}>
          <option value="">Select Option</option>
          {options[selectedCategory].map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Display the selected category and option */}
    {selectedCategory && selectedCategory !== 'All' && (
        <p>
          Selected {selectedCategory}: {selectedOption}
        </p>
      )}

      <button className={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>

      {/* Display current location (district and state) */}
      {currlocation && (
        <p>
          Fetched Location: <strong>{currlocation.district}</strong>, <strong>{currlocation.state}</strong>
        </p>
      )}
      <div className="div"><button onClick={handleExplain}>Explain</button></div>
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450
    </div>
  );
}

<<<<<<< HEAD
export default GraphSwiper;
=======
export default GraphComponent;
>>>>>>> ac5611c5ac4991b8a7c40783a236ec5d906a7450
