import './styles/App.css';
import React, { useState, useEffect } from 'react';

import axios from 'axios';  //處理cors問題

function App() {
  const [data, setData] = useState([])

  useEffect(()=> {
    fetchData();
  }, [])

  const fetchData = () => {
    axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_ID}/values/${process.env.REACT_APP_SHEET}?alt=json&key=${process.env.REACT_APP_KEY}`)
      .then((res) => {
        console.log('res',typeof res);
        setData(res.data.values);
        console.log('data: ', data);
      }).catch((res) => {
        console.log(res)
      })
  }

  return (
    <div className="container">
      <header className="card-header text-center py-2">
        <h1>今天吃什麼</h1>
        <p>熱血開抽</p>
      </header>
      <section className="card-body d-flex flex-column justify-content-center align-items-center">
        <div className="lottery d-flex flex-column">
          <div>
            <h2>
              <span>今天吃什麼呢</span>
            </h2>
          </div>
          <p>{data[1]}</p>
          <h1>顯示區</h1>
          <div>
            {data.map((item) => {
              return <li>{item[0]}</li>  //map need return something
            })}
          </div>
          <a href="#" className="btn-container" onClick={fetchData}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Button
          </a>
        </div>
        <div className="select">
          <button className="btn btn-primary">素食</button>
        </div>
        <div className="google-map"></div>
      </section>
      <footer className="card-footer text-center">
        <p>© 2022 Manson. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
