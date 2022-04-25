// Imports for the script
const hre = require('hardhat');
// Main function to execute functions on the smart contract

const main = async () => {
    // Access to the SimpleStorage.sol contract
    const simpleStorageFactory = await hre.ethers.getContractFactory(
        'SimpleStorage'
    );

    // Deploy the contract
    const simpleStorageContract = await simpleStorageFactory.deploy();

    // Access to the function 'number' setted on the SimpleStorage.sol contract
    const number = await simpleStorageContract.number(); // returns 0
    console.log('First state of number():', number.toString());

    // Create a transaction, on that case, change the number with the setNumber() on SimpleStorage.sol contract
    const transaction = await simpleStorageContract.setNumber('7');
    // Await for the transaction be done and getting a block for it
    await transaction.wait();

    // Get the updated number and show it on console
    const updatedNumber = await simpleStorageContract.number();
    console.log('Final state of number():', updatedNumber.toString());
};

// Invoke the function taking care of the possible errors that we can face
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
