import React, { useState, useEffect } from "react";
import "./App.css";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

const url = "https://72ih8opnm2.execute-api.ap-south-1.amazonaws.com/live";

const App = () => {
  const [data, setData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [compniesData, setCompniesData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  const fetchData = async () => {
    const response = await fetch(url);
    const cdata = await response.json();
    setData(cdata);
    setCompniesData(cdata.slice());
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearchText(e.target.value);

    const newCompniesData = compniesData.filter((company) => {
      return company.company_name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    if (e.target.value === "") {
      setCompniesData(data.slice());
    } else {
      setCompniesData(newCompniesData);
    }
  };

  const handleClick = (company) => {
    setSearchText("");
    setCompniesData(data.slice());
    setSelectedData(company);
  };

  const handleClearBtnClick = () => {
    setSearchText("");
    setCompniesData(data.slice());
    setSelectedData({});
  };

  const handleKeyDown = (event) => {
    if (event.code === "Backspace" || event.code === "Delete") {
      setCompniesData(data.slice());
    }
    if (event === "ArrowDown") {
    }
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
            onKeyDown={handleKeyDown}
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
        {searchText !== "" && (
          <div className="data">
            {compniesData.map((company) => {
              const { company_name, location } = company;
              return (
                <div
                  onClick={() => handleClick(company)}
                  className="data-item"
                  key={company._id}
                >
                  {company_name}
                </div>
              );
            })}
          </div>
        )}

        {Object.keys(selectedData).length !== 0 && (
          <div className="card">
            <h2>
              Company Name: <span>{selectedData.company_name}</span>
            </h2>
            <h2>
              Company Address:
              <span>
                {selectedData.location.replace(
                  /[`~!@#$%^&*()_|+\-=?;:'".<>{}[\]\\/]/gi,
                  ""
                )}
              </span>
            </h2>
          </div>
        )}
      </div>
    </>
  );
};
export default App;
