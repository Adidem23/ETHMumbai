import { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import ABI from './ABI.json';
import { connectAccount } from 'enchantmask';
import { createClient } from 'urql';



const Expert = () => {

    const [ExpertName, setExpertName] = useState("")
    const [ExpertEmailId, setExpertEmailId] = useState("")
    const [ExpertPhoneNumber, setExpertPhoneNumber] = useState(0);
    const [Expertise, setExpertise] = useState("");
    const [ExpertFees, setExpertFees] = useState(0);
    const [AllExperts, setAllExperts] = useState();

    const addExperts = async () => {
        const connectedAccount = connectAccount();
        console.log(connectedAccount);

        const DeployedContractAddress = "0x8753E48eE23d12fa95F9DA8a41c68D8E40442466";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signers = provider.getSigner();
        const CreatedContract = new ethers.Contract(DeployedContractAddress, ABI.abi, signers);
        const AddedExperts = await CreatedContract.FillExpertProfile(ExpertName, ExpertEmailId, ExpertPhoneNumber, Expertise, ExpertFees);
        console.log(AddedExperts);
    }


    const FetchAllExperts= async() => {

        const QueryURL = "https://api.studio.thegraph.com/query/69106/consultverseproject/version/latest";


        const Query = `{
            addedExperts(first: 5) {
                id
                ExpertAddress
                ExpertName
                EmailId
                Expertise
              }
          }`



        const Client = createClient({
            url: QueryURL
        })

        const data=await Client.query(Query).toPromise();
       console.log(data.data.addedExperts);
       setAllExperts(data.data.addedExperts);


    }

    const RequestToAdmin=async()=>{
        const DeployedContractAddress = "0x8753E48eE23d12fa95F9DA8a41c68D8E40442466";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signers = provider.getSigner();
        const CreatedContract = new ethers.Contract(DeployedContractAddress, ABI.abi, signers);
        CreatedContract.requestAdmin();
        console.log("The Experts are been Added to the System!!");
    }

    const CheckRequestStatus=async()=>{
        const DeployedContractAddress = "0x8753E48eE23d12fa95F9DA8a41c68D8E40442466";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signers = provider.getSigner();
        const CreatedContract = new ethers.Contract(DeployedContractAddress, ABI.abi, signers);
        const StatusofRequest=await CreatedContract.checkRequestStatus();
        alert(StatusofRequest);
    }


    useEffect(() => {
        FetchAllExperts()
    }, []);

    return (
        <>

            <h3>Experts</h3>

            <h3>Fill Details to Add Experts</h3>

            <div style={{ margin: 'auto', display: 'block', width: 'fit-content' }}>

                <h2>Expert Name</h2>
                <input type='text' placeholder='Name' onChange={(e) => { setExpertName(e.target.value) }} />

                <h2>Expert emailId</h2>
                <input type='email' placeholder='Email' onChange={(e) => { setExpertEmailId(e.target.value) }} />

                <h2>Expert phoneNumber</h2>
                <input type='number' placeholder='PhoneNumber' onChange={(e) => { setExpertPhoneNumber(e.target.value) }} />

                <h2>Expert Expertise</h2>
                <input type='text' placeholder='Expertise' onChange={(e) => { setExpertise(e.target.value) }} />

                <h2>Expert courseFess</h2>
                <input type='text' placeholder='Expertise' onChange={(e) => { setExpertFees(e.target.value) }} />

                <br />
                <br />

                <button onClick={addExperts}>Submit</button>

                <br />
                <br />

                <button onClick={RequestToAdmin}>requestToAdmin</button>

                <br />
                <br />

                <button onClick={CheckRequestStatus}>CheckRequestStatus</button>
            </div>

            <br />
            <br />

            <h3 style={{ margin: 'auto', display: 'block', width: 'fit-content' }}>All Experts Added Till Now!!</h3>
            {AllExperts && AllExperts.map((val)=>{
                return(<> 
                <div style={{border:"3px solid red",display:'block',margin:'auto',width:'fit-content'}}>
                <h2>{val.EmailId}</h2>
                 <h2>{val.ExpertName}</h2>
                 <h2>{val.Expertise}</h2>
                </div>    
                </>)
            })}



        </>

    )
}

export default Expert