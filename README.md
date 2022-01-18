## Flo_operation

## FLO Crypto Operations
`floCrypto` operations can be used to perform blockchain-cryptography methods. `floCrypto` operations are synchronized and return a value. Contains the following Operations.

#### Important: FLO Crypto operations are all functions. They have not been promisified 

#### Generate New FLO ID pair
	floCrypto.generateNewID()
 `generateNewID`  generates a new flo ID and returns private-key, public-key and floID 
 * Returns :  Object { privKey , pubKey, floID }

#### 	Calculate Public Key Hex
	floCrypto.getPubKeyHex(privateKey)
`getPubKeyHex` returns public-key from given private-key
1. privateKey - private key in WIF format (Hex) 
 * Returns : pubKey (string)

#### 	Calculate FLO ID
	 floCrypto.getFloID(publickey_or_privateKey)
`getFloID` returns flo-ID from given public-key (or) private-key
1. publickey_or_privateKey - public key or private key hex value 
* Returns : floID (string)

#### 	Verify Private Key
	 floCrypto.verifyPrivKey(privateKey, pubKey_floID, *isfloID)
`verifyPrivKey` verify the private-key for the given public-key or flo-ID
1. privateKey - private key in WIF format (Hex) 
2. pubKey_floID - public Key or flo ID
3. isfloID - boolean value (true: compare as flo ID, false: compare as public key) (optional, default is true)
* Returns : boolen (true or false)

#### 	Validate FLO ID
	 floCrypto.validateAddr(floID)
`validateAddr` check if the given Address is valid or not
1. floID - flo ID to validate 
* Returns : boolen (true or false)

#### 	Data Encryption
	 floCrypto.encryptData(data, publicKey)
`encryptData` encrypts the given data using public-key
1. data - data to encrypt (String)
2. publicKey - public key of the recipient
* Returns : Encrypted data (Object)

#### 	Data Decryption
	 floCrypto.decryptData(data, privateKey)
`decryptData` decrypts the given data using private-key
1. data - encrypted data to decrypt (Object that was returned from encryptData)
2. privateKey - private key of the recipient
* Returns : Decrypted Data (String)

#### 	Sign Data
	 floCrypto.signData(data, privateKey)
`signData` signs the data using the private key
1. data - data to sign
2. privateKey - private key of the signer
* Returns : signature (String)

####  Verify Signature
	 floCrypto.verifySign(data, signature, publicKey)
`verifySign` verifies signatue of the data using public-key
1. data - data of the given signature
2. signature - signature of the data
3. publicKey - public key of the signer
* Returns : boolen (true or false)

####  Generate Random Interger
	 floCrypto.randInt(min, max)
`randInt` returns a randomly generated interger in a given range.
1. min - minimum value of the range
2. max - maximum value of the range
* Returns : randomNum (Interger)

####  Generate Random String
	 floCrypto.randString(length, alphaNumeric)
`randString` returns a randomly generated string of given length.
1. length - length of the string to be generated
2. alphaNumeric - boolean (true: generated string will only contain alphabets and digits, false: generated string will also have symbols) (optional, default value is false)
* Returns : randomString (String)

####  Create Shamir's Secret shares
	 floCrypto.createShamirsSecretShares(str, total_shares, threshold_limit)
`createShamirsSecretShares` splits the str into shares using shamir's secret.
1. str - string to be split
2. total_shares - total number of shares to be split into
3. threshold_limit - minimum number of shares required to reconstruct the secret str
* Returns : Shares (Array of string)

####  Retrieve Shamir's Secret
	 floCrypto.retrieveShamirSecret(sharesArray)
`retrieveShamirSecret` reconstructs the secret from the shares.
1. sharesArray - Array of shares
* Returns : retrivedData (String)

####  Verify Shamir's Secret
	 floCrypto.verifyShamirsSecret(sharesArray, str)
`verifyShamirsSecret` verfies the validity of the created shares.
1. sharesArray - Array of shares
2. str - originalData (string).
* Returns : boolen (true or false)

## FLO Blockchain API Operations
`floBlockchainAPI` object method can be used to send/recieve data to/from blockchain. These functions are asynchronous and return a promise. Contains the following functions.

#### getBalance
	floBlockchainAPI.getBalance(addr)
`getBalance` requests balance for specified FLO address.
1. addr - FLO address for which balance has to be retrieved
* Resolves: balance (Number)

#### writeData
	floBlockchainAPI.writeData(senderAddr, Data, PrivKey, receiverAddr = floGlobals.adminID)
`writeData` writes data into blockchain, resolves transaction id if the transacation was succsessful. 
1. senderAddr - FLO address from which the data and amount has to be sent.
2. Data - FLO data (string, max 1040 characters)
3. receiverAddr - FLO address to which has to be sent. (Default is specified in floGlobals.adminID)
4. PrivKey - Private key of sender
* Resolves: TransactionID (String)

#### writeDataMultiple
	floBlockchainAPI.writeDataMultiple(senderPrivKeys, data, receivers = [floGlobals.adminID], preserveRatio = true)
`writeDataMultiple` writes data into blockchain from multiple floIDs to multiple floIDs, resolves transaction id if the transacation was succsessful. 
1. senderPrivKeys - Array of Private keys of the senders.
2. Data - FLO data (string, max 1040 characters)
3. receivers - Array of receiver FLO Addresses. (Default is specified in floGlobals.adminID)
4. preserveRatio - boolean (true: preserves the ratio of the balance of senders, false: all senders contribute equal amount to the transaction) (optional, default is true)
* Resolves: TransactionID (String)

#### sendTx 
	floBlockchainAPI.sendTx(senderAddr, receiverAddr, sendAmt, PrivKey, floData = '')
`sendTx` sends a transaction to blockchain, resolves transaction id if the transacation was succsessful. 
1. senderAddr - FLO address from which the data and amount has to be sent.
2. receiverAddr - FLO address to which has to be sent.
3. sendAmt - Amount of FLO coins to be sent to receiver.
4. PrivKey - Private key of sender to verify sender.
5. floData - FLO data (string, max 1040 characters) (optional, default value is empty string)
* Resolves: TransactionID (String)

#### sendTxMultiple
	floBlockchainAPI.sendTxMultiple(senderPrivKeys, receivers, floData = '')
`sendTxMultiple` sends a transaction to blockchain from multiple floIDs to multiple floIDs, resolves transaction id if the transacation was succsessful. 
1. senderPrivKeys - Array of Private keys of the senders (or) Object of private keys with sendAmount for each floID (eg: { privateKey1: sendAmt1, privateKey2: sendAmt2...}) .
Note: If passed as Array, then ratio of the balance of the senders are preserved. If passed as Object uses the amount given.
3. receivers - Object of receiver floIDs with receive amount (eg: {receiverID1: receiveAmt1, receiver2: receiveAmt2...})
4. floData - FLO data (string, max 1040 characters) (optional, default value is empty string)
* Resolves: TransactionID (String)

#### mergeUTXOs
	floBlockchainAPI.mergeUTXOs(floID, privKey, floData = '')
`mergeUTXOs` sends a transaction to blockchain that merges all utxos of the given floID. 
1. floID - FLO address of which the utxos should be merged.
2. privKey - private key of the floID.
3.  floData - FLO data (string, max 1040 characters) (optional, default value is empty string)
* Resolves: TransactionID (String)

#### readTxs 
	floBlockchainAPI.readTxs(addr, from, to)
`readTxs` reads transactions of specified address between from and to.
1. addr - FLO address for which the transactions has to be read.
2. from - Reading transactions starts from 'from'.
3. to - Reading transactions ends on 'to'.
* Resolves: TransactionData (Object)

#### readAllTxs 
	floBlockchainAPI.readTxs(addr)
`readAllTxs` reads all transactions of specified address(newest first).
1. addr - FLO address for which the transactions has to be read.
* Resolves: TransactionData (Object)

#### readData
	floBlockchainAPI.readData(addr, options = {})
`readData` reads FLO data from transactions of specified address
1. addr - FLO address for which the transactions data has to be read.
2. options - Contains options for filter data from transactions.
   - limit       : maximum number of filtered data (default = no limit)
   - ignoreOld   : ignore old transactions (default = 0)
   - sentOnly    : filters only sent data
   - pattern     : filters data that contains pattern as an object key in the JSON string
   - filter      : custom filter funtion for floData (eg . filter: d => {return d[0] == '$'})
* Resolves: Object {totalTxs, floData (Array)}

## FLO Cloud API operations
`floCloudAPI` operations can interact with floSupernode cloud to send and retrieve data for applications. floCloudAPI uses floSupernode module for backend interactions. FLO Cloud API functions are promisified and resolves the data or status.


#### sendApplicationData
	floCloudAPI.sendApplicationData(message, type, options = {})
`sendApplicationData` sends application data to the cloud.
1. message - data to be sent
2. type - type of the data
3. options - (optional, options detailed at end of module)
* Resolves: Sent-Status (string) | Rejects: error

#### requestApplicationData
	floCloudAPI.requestApplicationData(options = {})
`requestApplicationData` requests application data from the cloud.
1. options - (optional, options detailed at end of module)
* Resolves: data (Object) | Rejects: error

#### sendGeneralData
	floCloudAPI.sendGeneralData(message, type, options = {})
`sendGeneralData` sends general data to the cloud.
1. message - data to be sent
2. type - type of the data
3. options - (optional, options detailed at end of module)
* Resolves: Sent-Status (string) | Rejects: error

#### requestGeneralData
	floCloudAPI.requestGeneralData(type, options = {})
`requestGeneralData` requests application data from the cloud.
1. type - type of the data
2. options - (optional, options detailed at end of module)
* Resolves: Status (string) | Rejects: error

#### resetObjectData
	floCloudAPI.resetObjectData("objectName", options = {})
`resetObjectData` resets the objectData to cloud.
1. "objectName" - Name of the objectData to be reset. Quotes are must
2. options - (optional, options detailed at end of module)
* Resolves: Sent-Status (string) | Rejects: error

Note: value of objectData is taken from floGlobals.appObjects["objectName"]
The object data corresponding with Object Name must be defined in floGlobals.appObjects["objectName"] before a reset can be done 

#### updateObjectData
	floCloudAPI.updateObjectData("objectName", options = {})
`updateObjectData` updates the objectData to cloud.
1. "objectName" - Name of the objectData to be updated. Quotes are must.
2. options - (optional, options detailed at end of module)
* Resolves: Sent-Status (string) | Rejects: error

Note: value of objectData is taken from floGlobals.appObjects["objectName"]
The object data corresponding with Object Name must be defined in floGlobals.appObjects["objectName"] before an update can be done 

#### requestObjectData
	floCloudAPI.requestObjectData("objectName", options = {})
`requestObjectData` requests application data from the cloud.
1. "objectName" - Name of the objectData to be requested. Quotes are must.
2. options - (optional, options detailed at end of module)
* Resolves: Status (string) | Rejects: error
#### sendApplicationData
	floCloudAPI.sendApplicationData(message, type, options = {})
`sendApplicationData` sends application data to the cloud.
1. message - data to be sent
2. type - type of the data
3. options - (optional, options detailed at end of module)

#### requestApplicationData
	floCloudAPI.requestApplicationData(options = {})
`requestApplicationData` requests application data from the cloud.
1. options - (optional, options detailed at end of module)

### SEND GENERAL DATA PARAMETERS AND OPTIONS
Parameters while sending

 * `Message`: Actual Message to be sent
 * `Type`: User defined type (anything that user wants to classify as type) 

#### Options
 * `receiverID` - receiver of the data 
 * `application` - name of the application sending the general data
 * `comment` - user comment for the data
 
 ### REQUEST GENERAL DATA PARAMETERS AND OPTIONS

Parameters while requesting

 * `Type`: User defined type (retrieves all data of that type which the sender might have used in SEND DATA phase) 

#### request options
 * `receiverID` - receiver FLO ID of the data. ReceiverID is always a single value in our cloud design
 * `senderIDs` - array of senderIDs. This must be in an array even if a single senderID is requested
 * `application` - name of the application that sent the general data 
 * `comment` - comments for the data
 * `lowerVectorClock` - VC from which the data is to be requested
 * `upperVectorClock` - VC till which the data is to be requested
 * `atVectorClock` - VC at which the data is to requested
 * `mostRecent` - boolean (true: request only the recent data matching the pattern. Just the last one)
 * `callback(){}` - will initialize websocket for automatic updates. 
 * `callback: fnToUseTheData` - will initialize websocket for automatic updates, and will alse execute fnToUseTheData 
 
 ### RESET or UPDATE OBJECT DATA PARAMETERS AND OPTIONS
Parameters while resetting or updating
 * `Object Name`: Name of the object with data populated in floGlobals.appObjects[objectName] 
 
Note: The object data corresponding with Object Name must be defined in floGlobals.appObjects[objectName] before a reset or update can be done 

#### Options
 * `receiverID` - receiver FLO ID of the data.  If this is not specified, the admin ID will be taken as receiverID 
 * `application` - name of the application for sending the object data
 * `comment` - comment for the object data
 
 ### REQUEST OBJECT DATA PARAMETERS AND OPTIONS

#### Mandatory
`Object Name` 

#### request options
 * `receiverID` - receiver FLO ID of the data. ReceiverID is always a single value in our cloud design.  If this is not specified, the admin ID will be taken as receiverID
 * `senderIDs` - array of senderIDs. This must be in an array even if a single senderID is requested
 * `application` - name of the application for which the object data is intended
 * `comment` - comment for the object data
 * `lowerVectorClock` - VC from which the data is to be requested
 * `upperVectorClock` - VC till which the data is to be requested
 * `atVectorClock` - VC at which the data is to requested
 * `mostRecent` - boolean (true: request only the recent data matching the pattern. Just the last one.)
 * `callback(){}` - will initialize websocket for automatic updates. 
 * `callback: fnToUseTheData` - will initialize websocket for automatic updates, and will alse execute fnToUseTheData   
## 6. APPLICATION DATA PARAMETERS, OPTIONS AND EXPLANATIONS
