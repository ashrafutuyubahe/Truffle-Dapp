// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    string public message;

    constructor() {
        message = "Hello, world!";
    }

    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }

    function clearMessage() public {
        message = "";
    }
}
