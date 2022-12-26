// SPDX-License-Identifier: MIT 
pragma solidity 0.8.17;

error Spa__AlreadyAdopted();

contract Spa {

    struct Animal {
        string race;
        uint size;
        uint age;
        bool isAdopted;
    }

    Animal[] animals;
    mapping(address => uint) public adoption;

    event animalAdded(uint indexed id);
    event animalAdopted(uint indexed _id, address indexed _addr);

    //CRUD
    function add(string memory _race, uint _size, uint _age) external {
        // Animal memory dog;
        // dog.race = _race;
        // dog.size = _size;
        // dog.age = _age;
        // dog.isAdopted = false;
        // animals.push(dog);
        animals.push(Animal(_race, _size, _age, false));
        emit animalAdded(animals.length);
    }
    function getLisTofAnimals() public view returns(Animal[] memory){
        return animals;
    }

    function get(uint _id) external view returns(Animal memory) {
        require(animals.length > _id, "Dog n'existe pas");
        require(animals[_id].size >0, "Dog already deleted");
        return animals[_id];
    }

    function set(
        uint _id, 
        string memory _race, 
        uint _size, 
        uint _age
        ) external {
            require(animals.length > _id, "Dog n'existe pas");
            require(animals[_id].size >0, "Dog already deleted");
            // animals[_id].race = _race;
            // animals[_id].size = _size;
            // animals[_id].age = _age;
            animals[_id] = Animal(_race, _size, _age, false);
    }

    function remove(uint _id) external {
        require(animals.length > _id, "Dog n'existe pas");
        require(animals[_id].size >0, "Dog already deleted");
        delete animals[_id];
    }

    function adopt(uint _id) external {
        require(animals[_id].isAdopted != true, "Animal already adopted");
        animals[_id].isAdopted = true;
        adoption[msg.sender] = _id;
        emit animalAdopted(_id, msg.sender);
    }

    function getAdoption(address _addr) external view returns(Animal memory) {
        return animals[adoption[_addr]];
    }

    function adoptIfMax(string memory _race, uint _maxSize, uint _maxAge) external returns(bool) {
        for(uint i ; i < animals.length ; i++) {
            if(keccak256(abi.encodePacked(_race)) == keccak256(abi.encodePacked(animals[i].race))) {
                if(animals[i].size <= _maxSize) {
                    if(animals[i].age <= _maxAge) {
                        if(animals[i].isAdopted == false) {
                            animals[i].isAdopted = true;
                            adoption[msg.sender] = i;
                            emit animalAdopted(i, msg.sender);
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
