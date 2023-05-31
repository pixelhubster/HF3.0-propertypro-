// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@identity.com/gateway-protocol-eth/contracts/Gated.sol";

contract PropertyContract is ERC721, Ownable, Gated {

    struct Property {
        string name;
        string location;
        address owner;
        string[3] image;
        uint256 price;
        string description;
        uint256 timestamp;
        uint256 rate;
        uint256 shares;
    }
    uint256 public nextTokenId;
    mapping(uint256 => Property) public properties;
    uint256[] public property_id;
    mapping(uint256 => uint256) public propertyBalance;

    constructor(address gatewayTokenContract, uint256 gatekeeperNetwork) ERC721("PropertyContract0x1", "RE0x1") Gated(gatewayTokenContract, gatekeeperNetwork) {
        nextTokenId = 1;
    }
    // event PropertyRegistered(uint256 id, string name, string location, address owner, string[3] image, uint256 price, string description, block.timestamp ,uint256 rate, uint256 share);
    function createProperty(string memory _name, string memory _location, string[3] memory _image, uint256 _price, string memory _description, uint256 _rate, uint256 _shares) external gated {
        Property memory newproperty = Property(_name,_location,msg.sender,_image,_price,_description, block.timestamp,_rate,_shares);
        properties[nextTokenId] = newproperty;
        _safeMint(msg.sender, nextTokenId);
        Shares memory newshare = Shares(msg.sender,100 - _shares, 0);
        shares[nextTokenId].push(newshare);
        propertyBalance[nextTokenId] = 0;
        nextTokenId++;
    }

    //function to check if user has share in a property
    function hasShare(uint256 id) public view returns (bool,uint256) {
        bool istrue = false;
        uint256 index = 0;
        for ( uint256 i = 0; i<shares[id].length; i++) {
            if (shares[id][i].owner == msg.sender) {
                istrue = true;
                index = i;
            }
        }
        return (istrue, index);
    }

    //get a property detail by providing the id
    function getProperty(uint256 _id) public view returns (string memory, string memory, address, string[3] memory, uint256, string memory, uint256, uint256, uint256 ) {
        // require(index < properties.length, "Invalid Property index");
        Property memory property = properties[_id];
        return (property.name, property.location, property.owner, property.image, property.price, property.description, property.timestamp, property.rate, property.shares );
    }

    //get the total property count
    function getPropertyCount() public view returns (uint256) {
        return nextTokenId;
    }

    ///Shares section
    
    struct Shares {
        address owner;
        uint256 share;
        uint256 balance;
    }
    struct Openshares {
        uint256 shareid;
        uint256 shareindex;
        address owner;
        uint256 share;
    }
    
    mapping(uint256 => Shares[]) public shares;
    Openshares[] openshares;

    function createShare(uint256 _id,uint256 _share) public {
        Shares memory newshares = Shares(msg.sender,_share, 0);
        shares[_id].push(newshares);
    }

    function getShares(uint256 _id) public view returns(Shares[] memory) {
        return shares[_id];
    }
    function getOpenShares(uint256 _id) public view returns(uint256, uint256, address,uint256) {
        Openshares memory open = openshares[_id];
        return (open.shareid, open.shareindex, open.owner, open.share);
    }
    function getOpenShareCount() public view returns(uint256) {
        return openshares.length;
    }
    function checkShareOwner(uint256 _id) public view returns (bool, uint256) {
        bool istrue = false;
        uint256 index = 0;
        for (uint256 i = 0; i < shares[_id].length;i++) {
            if (shares[_id][i].owner == msg.sender) {
                istrue = true;
                index = i;
            }
        }
        return (istrue, index);
    }

    function sellShare(uint256 _id, uint256 _share) public {
        (bool istrue, uint256 index) = checkShareOwner(_id);
        if (istrue) {
            uint256 share = shares[_id][index].share;
            address owner = shares[_id][index].owner;
            require(_share <= share, "Invalid share to sell");
            Openshares memory anewshare = Openshares(_id,index,owner, _share);
            openshares.push(anewshare);
        }
    }

    event buyshare(uint256 indexed tokenId, address indexed buyer, uint256 amount);
    function buyShare(uint256 index) external payable {
        // openshares[index] = msg.sender;
        Openshares memory open = openshares[index];
        require(open.share > 0, "Share sold");
        uint256 _id = openshares[index].shareid;
        require(_exists(_id), "Token does not exist");
        uint256 _index = openshares[index].shareindex;
        uint256 _share = openshares[index].share;
        (bool hasshare, uint256 hasindex ) = hasShare(_id);
        address _owner = msg.sender;
        // uint256 amount = properties[_id].price * (_share / 100);
        // require(msg.value == amount, "Insufficent balance");
        //pay owner
        payable(shares[_id][_index].owner).transfer(msg.value);
        shares[_id][_index].share -= _share;
   
        emit buyshare(_id, msg.sender,msg.value);
        if (shares[_id][_index].share == 0) {
            shares[_id][_index].owner = msg.sender;
        } else if (hasshare) {
            shares[_id][hasindex].share += _share;
            shares[_id][_index].balance -= (_share / shares[_id][_index].share) * shares[_id][_index].balance;
            shares[_id][hasindex].balance += (_share / shares[_id][_index].share) * shares[_id][_index].balance;
        } else {
            shares[_id][_index].balance -= (_share / shares[_id][_index].share ) * shares[_id][_index].balance;
            uint256 amount = (_share / shares[_id][_index].share) * shares[_id][_index].balance;
            Shares memory newshare = Shares(_owner, _share,amount);
            shares[_id].push(newshare);
        }
        delete openshares[index];
    }

    function invest(uint256 id,uint256 share) external payable {
        require(_exists(id), "Invalid Token Id");
        require(share <= properties[id].shares, "Insufficent shares");
        // uint256 amountFN = properties[id].price * (share / 100) * 1000000000000000000;
        // require(msg.value == amount, "Insufficent Balance" );
        bool istrue = true;
        for (uint256 i = 0; i < shares[id].length; i++) {
            if (shares[id][i].owner == msg.sender) {
                istrue = false;
                shares[id][i].share += share;
                emit buyshare(id,msg.sender,msg.value);
                properties[id].shares -= share;
                shares[id][i].balance += msg.value;
                propertyBalance[id] += msg.value;
            } else {
                istrue = true;
            }
        }
        if (istrue) {
            emit buyshare(id,msg.sender,msg.value);
            Shares memory newshare = Shares(msg.sender,share,msg.value);
            shares[id].push(newshare);
            properties[id].shares -= share;
            propertyBalance[id] += msg.value;
        }
    }
    
    //get participants
    function getParticipants(uint256 id) public view returns (Shares[] memory) {
        return shares[id];
    }
    //get balance
    function getBalance(uint256 id) public view returns (uint256){
        return propertyBalance[id];
    }
    //Decision
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public decisionvote;
    struct Decision {
        string details;
        address by;
        uint256 support;
        uint256 decline;
    }

    mapping(uint256 => Decision[]) public decisions;

    function makeDecision(uint256 _id, string memory _details) public {
        Decision memory newdecision = Decision(_details,msg.sender,0,0);
        decisions[_id].push(newdecision);
    }
    function getDecision(uint256 _id) public view returns (Decision[] memory) {
        Decision[] memory newdec = decisions[_id];
        return newdec;
    }

    function vote(uint256 _id, uint256 index, bool istrue) public {
        //no verifications 
        require(decisionvote[_id][index][msg.sender] == false, "Voted already");
        (bool hasshare, uint256 hasindex ) = hasShare(_id);
        require(hasshare, "Do not have permision to contribute to project");
        uint256 support = decisions[_id][index].support;
        uint256 decline = decisions[_id][index].decline;
        if (support + decline < 100) {
            //you can vote
            if (istrue) {
                decisions[_id][index].support += shares[_id][hasindex].share; 
            } else {
                decisions[_id][index].decline += shares[_id][hasindex].share;
            }
            decisionvote[_id][index][msg.sender] = true;
        }
    }

    function depositFunds(uint256 id,uint256 amount) external payable {
        // require(propertyBalance[id] >= amount, "Insufficent Balance");
        // payable(address(this)).transfer(amount);
        for (uint256 i = 0; i<shares[id].length; i++) {
            uint256 _share = shares[id][i].share;
            shares[id][i].balance += amount * (_share / 100) * 1000000000000000000;
        }
        propertyBalance[id] += amount * 1000000000000000000;
    }

    //withdraw profit
    function redrawProfit(uint256 id,uint256 _amount) external payable {
        (bool istrue, uint256 index) = hasShare(id);
        require(istrue, "Do not have share in this property");
        uint256 amount = shares[id][index].balance;
        uint256 share = shares[id][index].share;
        uint256 pprice = properties[id].price;
        uint256 uramount = (pprice * share / 100) * 1000000000000000000;
        require(amount > uramount, "No profit earned on share");
        uint256 profit = amount - uramount;
        _amount = _amount * 1000000000000000000;
        require(_amount <= profit, "Low on profit");
        payable(msg.sender).transfer(_amount);
        shares[id][index].balance -= _amount;
        propertyBalance[id] -= _amount;
    }
    //request funds

    struct Requestfunds {
        string reason;
        address to;
        uint256 amount;
        uint256 support;
        uint256 decline;
    }
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public requestvote;
    mapping(uint256 => Requestfunds[]) public requestfunds;
    function makeRequest(uint256 _id,string memory _reason,address _to,uint256 _amount) public {
        Requestfunds memory newrequest = Requestfunds(_reason,_to,_amount,0,0);
        requestfunds[_id].push(newrequest);
    }
    
    //vote request funds
    function voteRequest(uint256 _id, uint256 index,bool _i) public {
        (bool hasshare, uint256 hasindex ) = hasShare(_id);
        require(hasshare, "Do not have permision to contribute to project");
        require(requestvote[_id][index][msg.sender] == false, "Already casted vote");
        uint256 _share = shares[_id][hasindex].share;
        uint256 support = requestfunds[_id][index].support;
        uint256 decline = requestfunds[_id][index].decline;
        address to = requestfunds[_id][index].to;
        uint256 amount = requestfunds[_id][index].amount;
        if (support + decline < 100) {
            //you can vote
            if (_i) {
                requestfunds[_id][index].support += _share; 
            } else {
                requestfunds[_id][index].decline += _share;
            }
            requestvote[_id][index][msg.sender] = true;
        }
        if (support > 50) {
            require(propertyBalance[_id] >= amount * 1000000000000000000, "Insufficent Balance");
            payable(to).transfer(amount);
            for (uint256 i = 0; i<shares[_id].length; i++) {
                uint256 _sharer = shares[_id][i].share;
                shares[_id][i].balance -= amount * (_sharer / 100) * 1000000000000000000;
            }
            propertyBalance[_id] -= amount * 1000000000000000000;
        }
    }

    function getRequestFunds(uint256 _id) public view returns (Requestfunds[] memory) {
        Requestfunds[] memory newdec = requestfunds[_id];
        return newdec;
    }
    //Punish

    struct Punish {
        address who;
        string reason;
        string details;
        uint256 support;
        address by;
    }

    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public punishvote;
    mapping(uint256 => Punish[]) public punish;

    function requestPunishment(uint256 _id, address who, string memory reason, string memory details) public {
        if (who != properties[_id].owner) {
            Punish memory newpunish = Punish(who,reason,details , 0 ,msg.sender);
            punish[_id].push(newpunish);
        }
    }

     //terminate a user
    function terminate(uint256 id, uint256 i) external payable {
        //payuser
        uint256 balance = shares[id][i].balance;
        uint256 share = shares[id][i].share;
        uint256 price = properties[id].price;
        require(balance >= price * (share / 100), "Cannot terminate user due to insufficent funds");
        payable(shares[id][i].owner).transfer(balance);
        delete shares[id][i];
    }

    function votePunishment(uint256 id, uint256 index) public {
        uint256 _support = punish[id][index].support;
        address _who = punish[id][index].who;
        require(msg.sender != _who, "You are not allowed to vote");
        require(punishvote[id][index][msg.sender] == false, "Already casted vote");
        (bool hasshare, uint256 hasindex ) = hasShare(id);
        require(hasshare, "Do not have permision to contribute to project");

         for (uint256 i = 0; i < shares[id].length; i++) {  
            if (_who == shares[id][i].owner) {
                uint256 _share = shares[id][i].share;
                uint256 _supportwithout = _support - _share;
                uint256 _sharewithout = 100 - _share;
                if (_supportwithout > _sharewithout * 8/10 ) {
                    // terminate(id, i);
                } else {
                    punish[id][index].support += shares[id][hasindex].share;
                }
                punishvote[id][index][msg.sender] = true;
            }
        }
    }

    //get punishment info
    function getPunishment(uint256 _id) public view returns (Punish[] memory) {
        Punish[] memory newdec = punish[_id];
        return newdec;
    }
    //sell ownership
    function isOwner(uint256 id) public view returns (bool) {
        bool owner = false;
        if (properties[id].owner == msg.sender) {
            owner = true;
        }
        return owner;
    }

    struct Forsale {
        address owner;
        uint256 price;
        uint256 share;
    }
    mapping(uint256 => Forsale) public forsale;


    //get propert which is on sale
    function getOnSaleProperty(uint256 id) public view returns (Forsale memory) {
        return forsale[id];
    }
    //sell property
    function sellProperty(uint256 id, uint256 price,uint256 share) public {
        require(properties[id].owner == msg.sender);
        bool istrue = false;
        require(price > properties[id].price, "Price must be greater than balance");
        for (uint256 i = 0; i<shares[id].length;i++) {
            uint256 balance = shares[id][i].balance;
            require(balance >= (shares[id][i].share / 100) * properties[id].price, "Shareholders do not have enough balance");
            istrue = true;
        }
        if (istrue) {
            Forsale memory sellp = Forsale(msg.sender, price,share);
            forsale[id] = sellp;
        }
    }

    //buy property
    function buyProperty(uint256 id) external payable {
        require(msg.value == forsale[id].price, "Do not have enough balance");
        bool istrue = false;
        for (uint256 i = 0; i<shares[id].length;i++) {
            uint256 balance = shares[id][i].balance;
            require(balance >= (shares[id][i].share / 100) * properties[id].price, "Shareholders do not have enough balance");
            istrue = true;
        }
        if (istrue) {
            payable(address(this)).transfer(forsale[id].share);
            payable(properties[id].owner).transfer(forsale[id].price - forsale[id].share);
            for (uint256 i = 0; i<shares[id].length;i++) {
                // uint256 balance = shares[id][i].balance;
                uint256 profit = forsale[id].share * (shares[id][i].share / 100);
                payable(shares[id][id].owner).transfer(profit);
                shares[id][i].balance += profit;
            }
            transferFrom(ownerOf(id),msg.sender,id);
            properties[id].owner = msg.sender;
        }
    }
    // function withdrawFunds(uint256 id, address to, uint256 amount) external payable {
    //     require(propertyBalance[id] >= amount * 1000000000000000000, "Insufficent Balance");
    //     for (uint256 i = 0; i<shares[id].length; i++) {
    //         uint256 _share = shares[id][i].share;
    //         shares[id][i].balance -= amount * (_share / 100) * 1000000000000000000;
    //     }
    //     propertyBalance[id] -= amount * 1000000000000000000;
    //     payable(to).transfer(amount);
    // }

    // function terminateProperty(uint256 id) public  payable gated {
    //     require(ownerOf(id) == msg.sender, "Must be owner");
    //     bool istrue = false;
    //     for (uint256 i = 0; i < shares[id].length; i++) {
    //         uint256 sbalance = shares[id][id].balance;
    //         if (shares[id][i].owner == msg.sender) {
    //             istrue = true;
    //         } else {
    //             uint256 samount = properties[id].price * (shares[id][i].share / 100);
    //             require(sbalance >= samount, "All shareholder's must have equivalent balance to shares");
    //             istrue = true;
    //         }
    //     }
    //     if (istrue) {
    //         for (uint256 i = 0; i < shares[id].length; i++) {
    //             uint256 sbalance = shares[id][id].balance;
    //             payable(shares[id][i].owner).transfer(sbalance);
    //         }
    //         delete properties[id];
    //         delete shares[id];
    //         delete propertyBalance[id];
    //     }
    // }
}
