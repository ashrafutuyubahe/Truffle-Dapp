const MessageBoard = artifacts.require("MessageBoard");

contract("MessageBoard", accounts => {
  it("should initialize with a default message", async () => {
    const instance = await MessageBoard.deployed();
    const message = await instance.message();
    assert.equal(message, "Hello, world!");
  });
});
