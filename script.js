let contract;

// Connect to MetaMask
        const connectMetaMask = async () => {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                contract = createContractInstance();
                const accounts = await web3.eth.getAccounts();
                const address = accounts[0];
                document.getElementById('walletAddress').innerText = `Connected Wallet Address: ${address}`;
                console.log('Connected to MetaMask!');
            } else if (window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
                contract = createContractInstance();
                console.log('Connected to MetaMask!');
            } else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
        };

// Create an instance of the smart contract
        const createContractInstance = () => {
            const contractAddress = '0x95198021969E696dF1Cf0795188D6796e1Fb77E3';
            const contract = new web3.eth.Contract(contractABI, contractAddress);
            return contract;
        };

// Vote for a candidate
        const voteForCandidate = async () => {
            try {
                const candidate = document.getElementById('candidateInput').value;
                const accounts = await web3.eth.getAccounts();
                await contract.methods.vote(candidate).send({ from: accounts[0] });
                console.log('Vote successful!');
            } catch (error) {
                console.error(error);
            }
        };

// Get the vote count for a candidate
        const getVoteCount = async () => {
            try {
                const candidate = document.getElementById('candidateCountInput').value;
                const count = await contract.methods.getVoteCount(candidate).call();
                document.getElementById('voteCount').innerText = `Vote count for ${candidate}: ${count}`;
                console.log(`Vote count for ${candidate}: ${count}`);
            } catch (error) {
                console.error(error);
            }
        };