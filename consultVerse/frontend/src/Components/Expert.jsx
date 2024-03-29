import { useState } from 'react'
import { ethers } from 'ethers';
import ABI from './ABI.json';
import {connectAccount, connectAccount} from 'enchantmask';



const Expert = () => {

    const [ExpertName, setExpertName] = useState("")
    const [ExpertEmailId, setExpertEmailId] = useState("")
    const [ExpertPhoneNumber, setExpertPhoneNumber] = useState(0);
    const [Expertise, setExpertise] = useState("");
    const [ExpertFees, setExpertFees] = useState(0);

    const addExperts=async () => {
        const connectedAccount=connectAccount();
        console.log(connectedAccount);
        const DeployedContractAddress = "0x8753E48eE23d12fa95F9DA8a41c68D8E40442466";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signers = provider.getSigner();
        const CreatedContract = new ethers.Contract(DeployedContractAddress, ABI.abi, signers);
        const AddedExperts=await CreatedContract.FillExpertProfile(ExpertName,ExpertEmailId,ExpertPhoneNumber,Expertise,ExpertFees);
        console.log(AddedExperts);
    }

    return (
        <>

            <h3>Experts</h3>

            <h3>Fill Details to Add Experts</h3>

            <div style={{ margin: 'auto', display: 'block', width: 'fit-content' }}>

                <h2>Expert Name</h2>
                <input type='text' placeholder='Name' onChange={(e)=>{setExpertName(e.target.value)}} />

                <h2>Expert emailId</h2>
                <input type='email' placeholder='Email' onChange={(e)=>{setExpertEmailId(e.target.value)}} />

                <h2>Expert phoneNumber</h2>
                <input type='number' placeholder='PhoneNumber' onChange={(e)=>{setExpertPhoneNumber(e.target.value)}} />

                <h2>Expert Expertise</h2>
                <input type='text' placeholder='Expertise' onChange={(e)=>{setExpertise(e.target.value)}} />

                <h2>Expert courseFess</h2>
                <input type='text' placeholder='Expertise' onChange={(e)=>{setExpertFees(e.target.value)}} />

                <br />
                <br />


                <button onClick={addExperts}>Submit</button>

            </div>



        </>

    )
}

export default Expert