import { useState } from "react"
import { ethers } from 'ethers';
import ABI from './ABI.json';

const Admin = () => {

    const [AllExperts, setAllExperts] = useState();

    const DeployedContractAddress = "0x8753E48eE23d12fa95F9DA8a41c68D8E40442466";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signers = provider.getSigner();
    const CreatedContract = new ethers.Contract(DeployedContractAddress, ABI.abi, signers);


    return (
        <>
            <div>Admin</div>
            <div>See All Experts</div>

        </>
    )
}

export default Admin