// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RideShare {
    struct Ride {
        address driver;
        string from;
        string to;
        string date;
        uint8 seats;
        uint256 price;
        bool active;
        mapping(address => bool) passengers;
        uint8 bookedSeats;
    }

    mapping(bytes32 => Ride) public rides;
    bytes32[] public rideIds;

    event RideCreated(
        bytes32 indexed rideId,
        address indexed driver,
        string from,
        string to,
        string date,
        uint8 seats,
        uint256 price
    );

    event RideBooked(
        bytes32 indexed rideId,
        address indexed passenger,
        uint256 price
    );

    function createRide(
        string memory _from,
        string memory _to,
        string memory _date,
        uint8 _seats,
        uint256 _price
    ) external returns (bytes32) {
        require(_seats > 0, "Seats must be greater than 0");
        require(_price > 0, "Price must be greater than 0");

        bytes32 rideId = keccak256(
            abi.encodePacked(
                msg.sender,
                _from,
                _to,
                _date,
                block.timestamp
            )
        );

        Ride storage ride = rides[rideId];
        ride.driver = msg.sender;
        ride.from = _from;
        ride.to = _to;
        ride.date = _date;
        ride.seats = _seats;
        ride.price = _price;
        ride.active = true;
        ride.bookedSeats = 0;

        rideIds.push(rideId);

        emit RideCreated(
            rideId,
            msg.sender,
            _from,
            _to,
            _date,
            _seats,
            _price
        );

        return rideId;
    }

    function bookRide(bytes32 _rideId) external payable {
        Ride storage ride = rides[_rideId];
        
        require(ride.active, "Ride is not active");
        require(msg.value == ride.price, "Incorrect payment amount");
        require(ride.bookedSeats < ride.seats, "No seats available");
        require(!ride.passengers[msg.sender], "Already booked");
        
        ride.passengers[msg.sender] = true;
        ride.bookedSeats++;
        
        payable(ride.driver).transfer(msg.value);
        
        emit RideBooked(_rideId, msg.sender, msg.value);
    }

    function getRideDetails(bytes32 _rideId) external view returns (
        address driver,
        string memory from,
        string memory to,
        string memory date,
        uint8 seats,
        uint256 price,
        bool active,
        uint8 bookedSeats
    ) {
        Ride storage ride = rides[_rideId];
        return (
            ride.driver,
            ride.from,
            ride.to,
            ride.date,
            ride.seats,
            ride.price,
            ride.active,
            ride.bookedSeats
        );
    }

    function isPassenger(bytes32 _rideId, address _passenger) external view returns (bool) {
        return rides[_rideId].passengers[_passenger];
    }
}