//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract consultVerse {

    uint256 public NoOfRequests = 0;

    struct Admin {
        address WalletAddress;
        string AdminName;
        string Role;
    }

    

    struct Experts {
        address ExpertAddress;
        string name;
        string emailId;
        string phoneNumber;
        string expertise;
        uint256 courseFess;
        address[] Clients;
    }

    struct Clients {
        address ClientAddress;
        string name;
        string emailId;
        string phoneNumber;
        string IntersestedConsulation;
    }

    struct Requestes {
        address whoRequested;
        bool requestStatus;
        uint256 ReqIndex;
    }

    mapping(address => Experts) public OneExpertMap;
    mapping(address => Clients) public OneClientMap;
    mapping(address => Admin) public OneAdminMap;
    mapping(address => Requestes) public AllRequestes;

    // These are all Events which will trigger Subgraphs//

    event AddedExpert(
        address ExpertAddress,
        string ExpertName,
        string EmailId,
        string PhoneNumber,
        string Expertise,
        uint256 ExpertFees
    );

    event AddedClient(
        address ClientAddress,
        string ClientName,
        string ClientEmailId,
        string ClientPhoneNumber,
        string IntersestedConsulation
    );

    event ExpertRequested(
        address ExpertAddress,
        uint256 RequestNumber,
        string ExpertName,
        string ExpertemailAddress,
        string phoneNumber,
        string expertise,
        uint256 coursefees
    );

    // These is the End of the events triggering Subgraphs //

    constructor() {
        Admin storage NewAdmin = OneAdminMap[msg.sender];
        NewAdmin.WalletAddress = msg.sender;
        NewAdmin.AdminName = "yorichi";
        NewAdmin.Role = "Admin";
    }

    modifier OnlyAdmin() {
        require(
            OneAdminMap[msg.sender].WalletAddress == msg.sender,
            "Only Admin Can Modify this Function"
        );
        _;
    }

    modifier OnlyExperts() {
        require(
            OneExpertMap[msg.sender].ExpertAddress == msg.sender,
            "Only Experts Can Modify this Function"
        );
        _;
    }

    modifier OnlyClients() {
        require(
            OneClientMap[msg.sender].ClientAddress == msg.sender,
            "Only Client Can Modify this Function"
        );
        _;
    }

    function FillExpertProfile(
        string memory _ExpertName,
        string memory _EmailId,
        string memory _PhoneNumber,
        string memory _Expertise,
        uint256 _ExpertFees
    ) public {
        Experts storage NewExpert = OneExpertMap[msg.sender];
        NewExpert.ExpertAddress = msg.sender;
        NewExpert.name = _ExpertName;
        NewExpert.emailId = _EmailId;
        NewExpert.phoneNumber = _PhoneNumber;
        NewExpert.expertise = _Expertise;
        NewExpert.courseFess = _ExpertFees;
        emit AddedExpert(
            msg.sender,
            _ExpertName,
            _EmailId,
            _PhoneNumber,
            _Expertise,
            _ExpertFees
        );
    }

    function requestAdmin() public {
        Requestes storage NewRequest = AllRequestes[msg.sender];
        NewRequest.whoRequested = msg.sender;
        NewRequest.requestStatus = false;
        NewRequest.ReqIndex = NoOfRequests;
        NoOfRequests++;
        Experts storage FetchExpert = OneExpertMap[msg.sender];
        emit ExpertRequested(
            msg.sender,
            NewRequest.ReqIndex,
            FetchExpert.name,
            FetchExpert.emailId,
            FetchExpert.phoneNumber,
            FetchExpert.expertise,
            FetchExpert.courseFess
        );
    }

    function checkRequestStatus() public view OnlyExperts returns (bool) {
        return AllRequestes[msg.sender].requestStatus;
    }

    function AcceptParticularExpertRequest(address _ExpertAddress)
        public
        OnlyAdmin
    {
        AllRequestes[_ExpertAddress].requestStatus = true;
    }

    function AddClient(
        string memory _ClientName,
        string memory _ClientEmailID,
        string memory _ClientPhone,
        string memory _InterestedConsulation
    ) public {
        Clients storage NewClient = OneClientMap[msg.sender];
        NewClient.ClientAddress = msg.sender;
        NewClient.name = _ClientName;
        NewClient.emailId = _ClientEmailID;
        NewClient.phoneNumber = _ClientPhone;
        NewClient.IntersestedConsulation = _InterestedConsulation;
        emit AddedClient(
            msg.sender,
            _ClientName,
            _ClientEmailID,
            _ClientPhone,
            _InterestedConsulation
        );
    }

    function EnrollInExpertClass(address _Expert) public payable OnlyClients {
        Experts storage RequiredExpert = OneExpertMap[_Expert];
        RequiredExpert.Clients.push(msg.sender);
        payable(address(this)).transfer(msg.value);
    }

    function getClientsOfExpert(address _expertAddress)
        external
        view
        returns (address[] memory)
    {
        return OneExpertMap[_expertAddress].Clients;
    }

    // Make Payments to Smart Contracts Starts
    receive() external payable {}
    // Make Payments to Smart Contracts Ends
}
