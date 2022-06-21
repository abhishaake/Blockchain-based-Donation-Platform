pragma solidity ^0.8.11;

contract work {

    string public name;
    constructor(){
        name = "abhishek's project";
    }

    uint public pcount = 0;
    
    struct ngo{
        uint id;
        string ngoname;
        address owner;
        uint amount;
        bool donation;
    }

    // event productcreated(
    //     uint id,
    //     string ngoname,
    //     address payable owner,
    //     uint amount,
    //     bool donation
    // );

    mapping(uint=>ngo) public req;

    function create(uint _amount,string memory _name) public {
        
        require(bytes(_name).length > 0,'Enter a name');
        require(_amount >0);
        pcount++;

        req[pcount] = ngo(pcount,_name,msg.sender,_amount,false);
      
    }

    function viewinfo(uint _id) public view returns(string memory nameOfNGO,uint donationRequired,address ownerOfNGO){
        nameOfNGO = req[_id].ngoname;

        donationRequired = req[_id].amount;
        ownerOfNGO = req[_id].owner;
    }

    function donate(uint _id) public payable{
        ngo memory _new = req[_id];

        require(msg.value >= _new.amount);

        address _ngo = _new.owner;

        _new.donation = true;
        
        req[_id] = _new;
        payable(address(_ngo)).transfer(msg.value);


    }

}