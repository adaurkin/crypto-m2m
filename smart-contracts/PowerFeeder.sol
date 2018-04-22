contract PowerFeeder {

    enum FeedState { Requested, Feeding, Finished }
    // Finished poosibly nax

    struct FeedAutomate {
        FeedState state;
        uint256 requested_amount;
        uint256 feeded_amount;
    }

    address owner;
    mapping(address => FeedAutomate) public feeds;


    event FeedingStarted(address _car, address _feed);

    function PowerFeeder() public {
        owner = msg.sender;
    }

    function init_feeding() public payable returns(bool) {
        // can be fallback function allowing car to start feeding by simply send ether
        feeds[msg.sender] = FeedAutomate({  state: FeedState.Requested,
                                requested_amount: msg.value,
                                feeded_amount: 0});
        return true;
    }

    function feed_car(address _car, uint256 _amount) public returns(bool) {
        require(msg.sender == owner);

        require(feeds[_car].requested_amount != 0);
        require(feeds[_car].state == FeedState.Requested);

        // TODO ADD REQUIRES !!!!!!!!!!!
        feeds[_car].feeded_amount += _amount;
        feeds[_car].state = FeedState.Feeding;
    }

    // TODO make internal
    function finish_feed(address _car) public returns(bool) {
        require(msg.sender == owner || msg.sender == _car);
        require(feeds[msg.sender].state == FeedState.Feeding);
        feeds[_car].state == FeedState.Finished; //replace to free mapping
        // REFACTOR - MANY CHECKS AND BUGS HERE

        uint256 payToOwner = feeds[_car].feeded_amount;
        uint256 payToCar = feeds[_car].requested_amount - feeds[_car].feeded_amount;
        delete(feeds[_car]);
        // FIXME FIXME - SfaeMath and more strict checks
        if (!owner.send(payToOwner) || !_car.send(payToCar)) {
            revert();
        }
        // BE CALLED BEFORE tranfers
    }
}