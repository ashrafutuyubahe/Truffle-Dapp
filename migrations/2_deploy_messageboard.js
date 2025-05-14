const MessageBoard = artifacts.require("MessageBoard");

module.exports = function (deployer) {
  deployer.deploy(MessageBoard);
};
