import { useState, useEffect } from "react"
import { ethers } from 'ethers';
import ABI from './ABI.json';
import { connectAccount } from 'enchantmask';
import { createClient } from 'urql';


const Admin = () => {

    const [AllExperts, setAllExperts] = useState();

    const GetAllRequest = async () => {

        const QueryURL = "https://api.studio.thegraph.com/query/69106/consultxgrpah/0.0.1";

        const Query = `{expertRequesteds {
            ExpertAddress
            ExpertName
            ExpertemailAddress
            RequestNumber
            coursefees
            expertise
            id
          }}`

        const Client = createClient({
            url: QueryURL
        })

        console.log(Client);

        const data = await Client.query(Query).toPromise();
        console.log(data)
        setAllExperts(data.data.expertRequesteds);

    }

    useEffect(() => {
        GetAllRequest();
    }, []);


    return (
        <>
            <div>Admin</div>
            <br />
            <div>All Requestes</div>
            <hr />
            {AllExperts && AllExperts.map((elem) => {
                return (<>
                    <div>
                        <h3>Request Number : {elem.RequestNumber}</h3>
                        <h3>Address: {elem.ExpertAddress}</h3>
                        <h3>ExpertName: {elem.ExpertName}</h3>
                        <h3>Expert EmailAddress: {elem.ExpertemailAddress}</h3>
                        <button onClick={async (e) => {
                            e.preventDefault();
                            const DeployedContractAddress = "0x8753E48eE23d12fa95F9DA8a41c68D8E40442466";
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            const signers = provider.getSigner();
                            const CreatedContract = new ethers.Contract(DeployedContractAddress, ABI.abi, signers);
                            await CreatedContract.AcceptParticularExpertRequest(elem.ExpertAddress);
                            console.log("Admin Has Accepted Request of Expert");
                        }}>Accept Request</button>

                    </div>
                </>)
            })}


        </>
    )
}

export default Admin