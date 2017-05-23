"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./firebaseConfig");

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

function getSongs(user) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `${firebase.getFBsettings().databaseURL}/songs.json?orderBy="uid"&equalTo="${user}"`
		}).done(function(songData){
			resolve(songData);
		}).fail(function(error){
			reject(error);
		});
	});
}

function addSong(songFormObj) {
	console.log("add Song", songFormObj);
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `${firebase.getFBsettings().databaseURL}/songs.json`,
			type: 'POST',
			data: JSON.stringify(songFormObj),
			dataType: 'json'
		}).done(function(songID){
			resolve(songID);
		});
	});
}
// POST - Submits data to be processed to a specified resource. Takes one parameter.

function deleteSong(songId) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `${firebase.getFBsettings().databaseURL}/songs/${songId}.json`,
			method: 'DELETE'
		}).done(function(){
			resolve();
		});
	});
}

function getSong(songId) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `${firebase.getFBsettings().databaseURL}/songs/${songId}.json`
		}).done(function(songData){
			resolve(songData);
		}).fail(function(error){
			reject(error);
		});
	});

}

// GET - Requests/read data from a specified resource
// PUT - Update data to a specified resource. Takes two parameters.
// PATCH - Updates only the changes
function editSong(songFormObj, songId) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url: `${firebase.getFBsettings().databaseURL}/songs/${songId}.json`,
			type: `PATCH`,
			data: JSON.stringify(songFormObj)
		}).done(function(data){
			resolve(data);
		});
	});
}

module.exports = {
  getSongs,
  addSong,
  getSong,
  deleteSong,
  editSong
};
