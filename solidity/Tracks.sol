// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error Playlist__NotTheOwner();
error Playlist__ContractIsPaused();

contract Playlist {

    struct Playlist {
        string name;
        Track[] tracks;
    }

    struct Track {
        string artist;
        string name;
        uint bpm;
    }

    mapping(address => Playlist) playlists;

    address immutable i_owner;
    bool paused;

    constructor() {
        i_owner = msg.sender;
    }

    function setPaused(bool _paused) public {
        if(msg.sender != i_owner) {
            revert Playlist__NotTheOwner();
        }
        paused = _paused;
    }


    function addPlaylist(address _user, string memory _name) public {
        if(i_owner != msg.sender) {
            revert Playlist__NotTheOwner();
        }
        if(paused) {
            revert Playlist__ContractIsPaused();
        }
        playlists[_user].name = _name;
    }

    function addTrack(string memory _artist, string memory _name, uint _bpm, address _user) public {
        if(i_owner != msg.sender) {
            revert Playlist__NotTheOwner();
        }
        if(paused) {
            revert Playlist__ContractIsPaused();
        }
        Track memory thisTrack = Track(_artist, _name, _bpm);
        playlists[_user].tracks.push(thisTrack);
    }

    function getPlaylist(address _user) public view returns(Playlist memory) {
        return playlists[_user];
    }
}