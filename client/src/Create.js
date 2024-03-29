import React, { useState, useEffect } from "react";
import { Button} from 'react-bootstrap';
import work from "./contracts/work.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

const Create = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");
  
  const [name, setname] = useState("");
  const [amount, setamount] = useState(0);
  const [ngos, setngos] = useState([]);
  const [id, setid] = useState();
  const [email, setemail] = useState("");
 



  const add = () => {
    contract.methods.create(amount,name,email).send({from: account}, (error)=>{
      if(!error){
          
          setname("");
          setemail("");
          setamount(0);
      }
    });
  }
  


  const load = async (contract) => {
    const totalSupply = await contract.methods.getcount().call();
    console.log(totalSupply);
    console.log("trying again");
    let results = [];
    for(let i = 0; i < totalSupply; i++){
     // console.log("reached");
     
      let ngos = await contract.methods.getdata(i).call();
      
      results.push(ngos);
      
    }
    setngos(results);
  }
  
  const loadWeb3Account = async (web3) =>{
    const accounts = await web3.eth.getAccounts();
    if(accounts){
      setAccount(accounts[0]);
    }
  }

  const loadWeb3Contract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = work.networks[networkId];
    if(networkData){
      const abi = work.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  }

  useEffect(async ()=>{
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    const contract = await loadWeb3Contract(web3);
    //await load(contract);
  }, [])

  return (
    <body className = "bgimage">

    <div>
         <nav className="navbar navbar-light bg-light px-4" >
            <a className="navbar-brand" >NGO DONATION PLATFORM </a>
            <a> Create Request </a>
            <span> Current Account : {account}</span>
        </nav>



        <div className="container-fluid mt-5">
          
          <div className="row pborder" >
            <div className="col pfont1">
              Create a Request
              <div>
                <input type="text" value={name} onChange={(e)=>setname(e.target.value)} className="form-control mb-2" placeholder="Enter name of NGO" />
                <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} className="form-control mb-2" placeholder="Enter NGO Website" />
                <input type="number" value={amount} onChange={(e)=>setamount(e.target.value)} className="form-control mb-2" placeholder="Enter Donation Amount" />

                <button onClick={add}  className="btn btn-primary"> Create </button>
              </div>
            </div>
          </div>
        </div>
      

        

    </div>
    
    <div>

    </div>

    <div> <br></br></div><div> <br></br></div><div> <br></br></div><div> <br></br></div><div> <br></br></div><div> <br></br></div>
    </body>
  );
};

export default Create;