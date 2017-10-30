import React from 'react';

const clientId = '69912399392e43e3a4ed3806edd90acf';
const clientSecret = '734a66dd1744414eb66463a49875631a';
const siteURL = '';
let accesToken;
let trackArray = [];


export const Spotify = {
    getAccessToken() {
        if(accesToken) {
            return accesToken;
        }
    }
};