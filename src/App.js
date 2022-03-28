import React, { useState } from "react";
import "./App.css";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import data from "./data";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [compniesData, setCompniesData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  const handleChange = (e) => {
    setSelectedData({});
    setSearchText(e.target.value);
    const newCompniesData = data.filter((company) => {
      return company.company.toLowerCase().includes(searchText);
    });
    if (e.target.value === "") {
      setCompniesData([]);
    } else {
      setCompniesData(newCompniesData);
    }
  };

  const handleClick = (company) => {
    setSearchText("");
    setCompniesData("");
    setSelectedData(company);
  };

  const handleClearBtnClick = () => {
    setSearchText("");
    setCompniesData([]);
    setSelectedData({});
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <input
            type={"text"}
            value={searchText}
            onChange={handleChange}
            placeholder={"Search Company Here..."}
          />
          <div className="icon">
            {searchText ? (
              <CloseOutlined
                onClick={handleClearBtnClick}
                className="clear-icon"
              />
            ) : (
              <SearchOutlined />
            )}
          </div>
        </div>
        {compniesData.length !== 0 && (
          <div className="data">
            {compniesData.map((company) => {
              return (
                <div
                  onClick={() => handleClick(company)}
                  className="data-item"
                  key={company._id}
                >
                  {company.company}
                </div>
              );
            })}
          </div>
        )}

        {Object.keys(selectedData).length !== 0 && (
          <div className="card">
            <h2>
              Company Name: <span>{selectedData.company}</span>
            </h2>
            <h2>
              Company Address: <span>{selectedData.address}</span>
            </h2>
          </div>
        )}
      </div>
    </>
  );
};
export default App;
