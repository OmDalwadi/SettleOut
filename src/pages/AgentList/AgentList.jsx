import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import commonApi from "../../api/common";
import {  useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


const AgentsList = () => {
  const [agentList, setAgentList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const list = async () => {
      await commonApi({
        action: "agentList",
        data: {
         query:{
          accountType:"agent",
         }
        },
      })
        .then(({ DATA = {}, MESSAGE }) => {
         setAgentList(DATA.data)
        })
        .catch((error) => {
          console.error(error);
        });
    };
    list();
  }, []);
  const handleSelectAgent = (id) => {
   navigate("/membership",{state:{agentId:id}})
  };
  
  const handleViewProfile = (id) => {
    navigate("/agprofile",{state:{agentId:id}})
   };

  
  return (
    <>
    <Navbar />
    
    <div className="grid grid-rows pl-9 pr-9 ml-5 mr-5 pt-20">
      {agentList.map((agent) => (
        <div key={agent.id} className="bg-white shadow-md rounded-lg p-6 mb-7">
          <div className="text-4xl text-gray-900 font-medium mb-2">{agent.fullName}</div>
          <p className="text-gray-600 mt-2">{agent.bio}</p>
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <span className="text-2xl text-gray-600">Rating:</span>
              <span className="text-2xl font-bold ml-1 text-yellow-400">{agent.ratings}</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleViewProfile(agent.id)}
                className="bg-blue-500 text-white px-3 py-2 rounded"
                >
                View Profile
              </button>
              <button
                onClick={() => handleSelectAgent(agent._id)}
                className="bg-green-500 text-white px-3 py-2 rounded"
                >
                Select Agent
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
      </>
  );
};

export default AgentsList;